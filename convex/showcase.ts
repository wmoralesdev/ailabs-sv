import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { isAdmin } from "./lib/admin";
import { assertCoverStorageWithinLimit } from "./lib/storage_limits";

const statusValidator = v.union(
  v.literal("shipped"),
  v.literal("in_progress"),
  v.literal("concept")
);

const SHOWCASE_SLUG_MAX_LEN = 120;

/** URL-safe segment: lowercase, hyphens, alphanumerics only. */
function slugSegment(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function slugFromTitle(title: string): string {
  const s = slugSegment(title);
  return s.slice(0, 60).replace(/^-|-$/g, "") || "";
}

/**
 * Stable public URL: `<profile-slug>-<project-slug>` (unique per showcaseEntries.by_slug).
 */
function baseShowcaseSlug(profileSlug: string, title: string): string {
  const userPart = slugSegment(profileSlug) || "builder";
  const titlePart = slugFromTitle(title) || "project";
  const prefix = `${userPart}-`;
  const reserve = 10;
  const maxTitleChars = Math.max(
    12,
    SHOWCASE_SLUG_MAX_LEN - prefix.length - reserve
  );
  const trimmedTitle =
    titlePart.length > maxTitleChars
      ? titlePart.slice(0, maxTitleChars).replace(/-+$/g, "")
      : titlePart;
  let combined = `${prefix}${trimmedTitle}`
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  if (combined.length > SHOWCASE_SLUG_MAX_LEN) {
    combined = combined
      .slice(0, SHOWCASE_SLUG_MAX_LEN)
      .replace(/-+$/g, "");
  }
  return combined || `${userPart}-project`;
}

function randomSuffix(): string {
  return Math.random().toString(36).slice(2, 8);
}

/**
 * List showcase entries with optional filters.
 * Featured entries first, then by createdAt desc.
 */
export const list = query({
  args: {
    event: v.optional(v.string()),
    tool: v.optional(v.string()),
    status: v.optional(statusValidator),
    limit: v.optional(v.number()),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const limit = Math.min(args.limit ?? 24, 50);

    let entries = await ctx.db
      .query("showcaseEntries")
      .order("desc")
      .collect();

    if (args.event) {
      entries = entries.filter((e) => e.event === args.event);
    }
    if (args.tool) {
      entries = entries.filter(
        (e) => e.toolsUsed?.includes(args.tool as string) ?? false
      );
    }
    if (args.status) {
      entries = entries.filter((e) => e.status === args.status);
    }

    const featured = entries.filter((e) => e.featured === true);
    const rest = entries.filter((e) => !e.featured);
    const sorted = [...featured, ...rest];

    const start = args.cursor
      ? sorted.findIndex((e) => e._id === args.cursor) + 1
      : 0;
    const page = sorted.slice(start, start + limit);

    const profiles = await Promise.all(
      page.map((e) =>
        ctx.db
          .query("profiles")
          .withIndex("by_owner", (q) => q.eq("ownerId", e.ownerId))
          .first()
      )
    );

    return {
      items: page.map((entry, i) => ({
        ...entry,
        author: profiles[i]
          ? {
              name: profiles[i].name,
              slug: profiles[i].slug,
              avatarUrl: profiles[i].avatarUrl,
            }
          : null,
      })),
      nextCursor:
        start + page.length < sorted.length
          ? String(page[page.length - 1]?._id)
          : null,
    };
  },
});

/**
 * Get a single showcase entry by slug with author and collaborators.
 */
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const entry = await ctx.db
      .query("showcaseEntries")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (!entry) return null;

    const author = await ctx.db
      .query("profiles")
      .withIndex("by_owner", (q) => q.eq("ownerId", entry.ownerId))
      .first();

    const collaborators = await Promise.all(
      (entry.collaboratorIds ?? []).map((id) =>
        ctx.db
          .query("profiles")
          .withIndex("by_owner", (q) => q.eq("ownerId", id))
          .first()
      )
    );

    return {
      ...entry,
      ownerId: entry.ownerId,
      author: author
        ? { name: author.name, slug: author.slug, avatarUrl: author.avatarUrl }
        : null,
      collaborators: collaborators
        .filter(Boolean)
        .map((p) => ({
          name: p!.name,
          slug: p!.slug,
          avatarUrl: p!.avatarUrl,
        })),
    };
  },
});

/** Minimal fields for SSR meta tags (public, no auth). */
export const getShowcaseSeoBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const entry = await ctx.db
      .query("showcaseEntries")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (!entry) return null;
    const description =
      entry.tagline.trim().slice(0, 160) ||
      entry.description.trim().slice(0, 160);
    return {
      title: entry.title,
      description,
      imageUrl: entry.coverImageUrl,
    };
  },
});

/**
 * List showcase entries for a specific owner (profile page).
 */
export const listByOwner = query({
  args: {
    ownerId: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = Math.min(args.limit ?? 12, 50);
    const entries = await ctx.db
      .query("showcaseEntries")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .order("desc")
      .take(limit);

    const profiles = await Promise.all(
      entries.map((e) =>
        ctx.db
          .query("profiles")
          .withIndex("by_owner", (q) => q.eq("ownerId", e.ownerId))
          .first()
      )
    );

    return entries.map((entry, i) => ({
      ...entry,
      author: profiles[i]
        ? {
            name: profiles[i].name,
            slug: profiles[i].slug,
            avatarUrl: profiles[i].avatarUrl,
          }
        : null,
    }));
  },
});

/**
 * Preview the URL slug for a title (create flow). Uses the same base rule as `create`.
 * Auth + profile required; returns null when not signed in or no profile.
 */
export const previewSlugForTitle = query({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject;
    if (!userId) return null;

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_owner", (q) => q.eq("ownerId", userId))
      .first();
    if (!profile) return null;

    const trimmed = args.title.trim();
    if (!trimmed || trimmed.length > 80) return null;

    const base = baseShowcaseSlug(profile.slug, trimmed);
    const existing = await ctx.db
      .query("showcaseEntries")
      .withIndex("by_slug", (q) => q.eq("slug", base))
      .first();

    return { slug: base, baseIsTaken: !!existing };
  },
});

/**
 * Check if a slug is available for showcase entries.
 */
export const isSlugAvailable = query({
  args: {
    slug: v.string(),
    excludeId: v.optional(v.id("showcaseEntries")),
  },
  handler: async (ctx, args) => {
    const slug = args.slug.trim().toLowerCase();
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slug || !slugRegex.test(slug)) {
      return { available: false, reason: "invalid" as const };
    }
    const existing = await ctx.db
      .query("showcaseEntries")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
    if (!existing) return { available: true };
    if (args.excludeId && existing._id === args.excludeId) return { available: true };
    return { available: false, reason: "taken" as const };
  },
});

/**
 * Create a new showcase entry. Auth required. Requires profile.
 */
export const create = mutation({
  args: {
    title: v.string(),
    tagline: v.string(),
    description: v.string(),
    coverImageId: v.id("_storage"),
    coverImageUrl: v.string(),
    projectUrl: v.optional(v.string()),
    repoUrl: v.optional(v.string()),
    socialPostUrl: v.optional(v.string()),
    event: v.optional(v.string()),
    toolsUsed: v.optional(v.array(v.string())),
    collaboratorIds: v.optional(v.array(v.string())),
    status: statusValidator,
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject;
    if (!userId) {
      throw new Error("Must be signed in to submit a project");
    }

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_owner", (q) => q.eq("ownerId", userId))
      .first();
    if (!profile) {
      throw new Error("Complete your profile before submitting a project");
    }

    if (args.title.length > 80) {
      throw new Error("Title must be 80 characters or less");
    }
    if (args.tagline.length > 120) {
      throw new Error("Tagline must be 120 characters or less");
    }
    if (args.description.length > 1500) {
      throw new Error("Description must be 1500 characters or less");
    }
    await assertCoverStorageWithinLimit(ctx, args.coverImageId);
    const collabIds = args.collaboratorIds?.slice(0, 5) ?? [];

    const baseSlug = baseShowcaseSlug(profile.slug, args.title);
    let slug = baseSlug;
    let attempts = 0;
    let slugAvailable = false;
    while (attempts < 20) {
      const taken = await ctx.db
        .query("showcaseEntries")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .first();
      if (!taken) {
        slugAvailable = true;
        break;
      }
      const suffix = randomSuffix();
      const withSuffix = `${baseSlug}-${suffix}`.replace(/-+/g, "-");
      slug =
        withSuffix.length > SHOWCASE_SLUG_MAX_LEN
          ? `${baseSlug.slice(0, SHOWCASE_SLUG_MAX_LEN - suffix.length - 1)}-${suffix}`
          : withSuffix;
      attempts++;
    }
    if (!slugAvailable) {
      throw new Error("Could not allocate a unique URL. Try a different title.");
    }

    const now = Date.now();
    await ctx.db.insert("showcaseEntries", {
      title: args.title.trim(),
      tagline: args.tagline.trim(),
      description: args.description.trim(),
      coverImageId: args.coverImageId,
      coverImageUrl: args.coverImageUrl,
      slug,
      ownerId: userId,
      projectUrl: args.projectUrl,
      repoUrl: args.repoUrl,
      socialPostUrl: args.socialPostUrl,
      event: args.event,
      toolsUsed: args.toolsUsed,
      collaboratorIds: collabIds.length ? collabIds : undefined,
      status: args.status,
      createdAt: now,
      updatedAt: now,
    });
    return slug;
  },
});

/**
 * Update own showcase entry.
 */
export const update = mutation({
  args: {
    id: v.id("showcaseEntries"),
    title: v.optional(v.string()),
    tagline: v.optional(v.string()),
    description: v.optional(v.string()),
    coverImageId: v.optional(v.id("_storage")),
    coverImageUrl: v.optional(v.string()),
    projectUrl: v.optional(v.string()),
    repoUrl: v.optional(v.string()),
    socialPostUrl: v.optional(v.string()),
    event: v.optional(v.string()),
    toolsUsed: v.optional(v.array(v.string())),
    collaboratorIds: v.optional(v.array(v.string())),
    status: v.optional(statusValidator),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject;
    if (!userId) {
      throw new Error("Must be signed in to update a project");
    }

    const existing = await ctx.db.get(args.id);
    if (!existing) {
      throw new Error("Entry not found");
    }
    if (existing.ownerId !== userId) {
      throw new Error("You can only edit your own projects");
    }

    const updates: Record<string, unknown> = {
      updatedAt: Date.now(),
    };
    if (args.title !== undefined) updates.title = args.title.trim();
    if (args.tagline !== undefined) updates.tagline = args.tagline.trim();
    if (args.description !== undefined) updates.description = args.description.trim();
    if (args.coverImageId !== undefined) updates.coverImageId = args.coverImageId;
    if (args.coverImageUrl !== undefined) updates.coverImageUrl = args.coverImageUrl;
    if (args.projectUrl !== undefined) updates.projectUrl = args.projectUrl;
    if (args.repoUrl !== undefined) updates.repoUrl = args.repoUrl;
    if (args.socialPostUrl !== undefined) updates.socialPostUrl = args.socialPostUrl;
    if (args.event !== undefined) updates.event = args.event;
    if (args.toolsUsed !== undefined) updates.toolsUsed = args.toolsUsed;
    if (args.collaboratorIds !== undefined) {
      updates.collaboratorIds = args.collaboratorIds.slice(0, 5);
    }
    if (args.status !== undefined) updates.status = args.status;

    if (args.title && args.title.length > 80) {
      throw new Error("Title must be 80 characters or less");
    }
    if (args.tagline && args.tagline.length > 120) {
      throw new Error("Tagline must be 120 characters or less");
    }
    if (args.description && args.description.length > 1500) {
      throw new Error("Description must be 1500 characters or less");
    }

    if (args.coverImageId !== undefined) {
      await assertCoverStorageWithinLimit(ctx, args.coverImageId);
    }

    await ctx.db.patch(args.id, updates as Partial<typeof existing>);
    return args.id;
  },
});

/**
 * Delete own showcase entry.
 */
export const remove = mutation({
  args: { id: v.id("showcaseEntries") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject;
    if (!userId) {
      throw new Error("Must be signed in to delete a project");
    }

    const existing = await ctx.db.get(args.id);
    if (!existing) {
      throw new Error("Entry not found");
    }
    if (existing.ownerId !== userId) {
      throw new Error("You can only delete your own projects");
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});

/**
 * Toggle featured status. Admin only.
 */
export const toggleFeatured = mutation({
  args: { id: v.id("showcaseEntries") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject;
    if (!userId) {
      throw new Error("Must be signed in");
    }
    if (!isAdmin(userId)) {
      throw new Error("Admin only");
    }

    const existing = await ctx.db.get(args.id);
    if (!existing) {
      throw new Error("Entry not found");
    }

    const featured = !existing.featured;
    const featuredAt = featured ? Date.now() : undefined;
    await ctx.db.patch(args.id, { featured, featuredAt });
    return args.id;
  },
});

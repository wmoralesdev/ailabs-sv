import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

const profileLinksValidator = v.object({
  linkedin: v.optional(v.string()),
  x: v.optional(v.string()),
});

/**
 * List profiles with optional search by name/title.
 * Public - no auth required.
 */
export const list = query({
  args: {
    search: v.optional(v.string()),
    limit: v.optional(v.number()),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const limit = Math.min(args.limit ?? 20, 50);
    if (args.search && args.search.trim()) {
      const term = args.search.trim().toLowerCase();
      const all = await ctx.db
        .query("profiles")
        .order("desc")
        .collect();
      const filtered = all.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.title.toLowerCase().includes(term) ||
          p.bio.toLowerCase().includes(term)
      );
      const start = args.cursor
        ? filtered.findIndex((p) => p._id === args.cursor) + 1
        : 0;
      const page = filtered.slice(start, start + limit);
      return {
        profiles: page,
        nextCursor:
          start + page.length < filtered.length
            ? String(page[page.length - 1]?._id)
            : null,
      };
    }
    const result = await ctx.db
      .query("profiles")
      .order("desc")
      .paginate({
        numItems: limit,
        cursor: args.cursor ?? null,
      });
    return {
      profiles: result.page,
      nextCursor: result.isDone ? null : result.continueCursor,
    };
  },
});

/**
 * Get a single profile by slug.
 * Returns contact only if the caller is authenticated (members-only).
 */
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (!profile) return null;
    if (!userId) {
      const { contact: _, ...publicProfile } = profile;
      return publicProfile;
    }
    return profile;
  },
});

/**
 * Get the current user's profile.
 * Requires auth.
 */
export const me = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    return await ctx.db
      .query("profiles")
      .withIndex("by_owner", (q) => q.eq("ownerId", userId))
      .first();
  },
});

/**
 * Create or update the current user's profile.
 * Owner-only.
 */
export const upsertMine = mutation({
  args: {
    slug: v.string(),
    name: v.string(),
    title: v.string(),
    bio: v.string(),
    avatarUrl: v.optional(v.string()),
    links: profileLinksValidator,
    contact: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be signed in to create or update a profile");
    }

    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(args.slug)) {
      throw new Error(
        "Slug must be lowercase letters, numbers, and hyphens only"
      );
    }

    const now = Date.now();
    const existing = await ctx.db
      .query("profiles")
      .withIndex("by_owner", (q) => q.eq("ownerId", userId))
      .first();

    const profileData = {
      slug: args.slug,
      name: args.name,
      title: args.title,
      bio: args.bio,
      avatarUrl: args.avatarUrl,
      links: args.links,
      contact: args.contact,
      ownerId: userId,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };

    if (existing) {
      const slugConflict = await ctx.db
        .query("profiles")
        .withIndex("by_slug", (q) => q.eq("slug", args.slug))
        .first();
      if (slugConflict && slugConflict._id !== existing._id) {
        throw new Error("That slug is already taken");
      }
      await ctx.db.patch(existing._id, profileData);
      return existing._id;
    }

    const slugConflict = await ctx.db
      .query("profiles")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (slugConflict) {
      throw new Error("That slug is already taken");
    }

    return await ctx.db.insert("profiles", profileData);
  },
});

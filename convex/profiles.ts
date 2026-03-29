import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { seededShuffle } from "./seeded_shuffle";

const profileLinksValidator = v.object({
  linkedin: v.optional(v.string()),
  x: v.optional(v.string()),
});

const experienceLevelValidator = v.optional(
  v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced"), v.literal("exploring"), v.literal("building"), v.literal("shipping"))
);

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
 * Public profiles for landing “Curious Ones” marquee.
 * Order is a deterministic shuffle of `(seed, current table rows)` — no Math.random in the handler.
 */
export const publicSpotlight = query({
  args: {
    limit: v.number(),
    seed: v.number(),
  },
  handler: async (ctx, args) => {
    const limit = Math.min(Math.max(1, Math.floor(args.limit)), 24);
    const seed = Math.floor(args.seed);
    const all = await ctx.db.query("profiles").collect();
    const mapped = all.map((p) => ({
      slug: p.slug,
      name: p.name,
      title: p.title,
      bio: p.bio,
      tagline: p.tagline,
      avatarUrl: p.avatarUrl,
      links: p.links,
    }));
    const shuffled = seededShuffle(mapped, seed);
    return shuffled.slice(0, limit);
  },
});

/**
 * Get a single profile by slug.
 * Returns contact only if the caller is authenticated (members-only).
 */
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject ?? null;
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

/** Minimal fields for SSR meta tags on community profile pages (public). */
export const getProfileSeoBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (!profile) return null;
    const snippet = `${profile.title}. ${profile.bio}`.trim().slice(0, 160);
    return {
      title: `${profile.name} — Ai /abs`,
      description: snippet,
    };
  },
});

/**
 * Check if a slug is available for use.
 * Returns available=true if: slug is valid, not taken, or belongs to the current user.
 * Public - no auth required (but we use auth to allow owner's existing slug).
 */
export const isSlugAvailable = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const slug = args.slug.trim().toLowerCase();
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slug || !slugRegex.test(slug)) {
      return { available: false, reason: "invalid" as const };
    }
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject ?? null;
    const existing = await ctx.db
      .query("profiles")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
    if (!existing) return { available: true };
    if (userId && existing.ownerId === userId) return { available: true };
    return { available: false, reason: "taken" as const };
  },
});

/**
 * Get the current user's profile.
 * Requires auth.
 */
export const me = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject ?? null;
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
    location: v.optional(v.string()),
    company: v.optional(v.string()),
    experienceLevel: experienceLevelValidator,
    interests: v.optional(v.array(v.string())),
    tools: v.optional(v.array(v.string())),
    lookingFor: v.optional(v.array(v.string())),
    availability: v.optional(v.array(v.string())),
    links: profileLinksValidator,
    contact: v.optional(v.string()),
    tagline: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject;
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
      location: args.location,
      company: args.company,
      experienceLevel: args.experienceLevel,
      interests: args.interests,
      tools: args.tools,
      lookingFor: args.lookingFor,
      availability: args.availability,
      links: args.links,
      contact: args.contact,
      tagline: args.tagline,
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

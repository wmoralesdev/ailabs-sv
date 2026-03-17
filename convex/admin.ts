import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { isAdmin } from "./lib/admin";

const eventTypeValidator = v.union(
  v.literal("Meetup"),
  v.literal("Workshop"),
  v.literal("Social"),
  v.literal("Conference"),
  v.literal("Hackathon")
);

const localizedValidator = v.object({
  es: v.string(),
  en: v.string(),
});

/**
 * Check if the current user is an admin.
 */
export const isCurrentUserAdmin = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject ?? null;
    if (!userId) return false;
    return isAdmin(userId);
  },
});

/**
 * List all events (admin-only). Sorted by startAt desc.
 */
export const listEvents = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject ?? null;
    if (!userId || !isAdmin(userId)) {
      throw new Error("Admin access required");
    }

    const all = await ctx.db.query("events").collect();
    return all.sort((a, b) => b.startAt - a.startAt);
  },
});

/**
 * Create or update an event (admin-only).
 * Provide id to update, omit to create.
 */
export const upsertEvent = mutation({
  args: {
    id: v.optional(v.id("events")),
    slug: v.string(),
    published: v.boolean(),
    type: eventTypeValidator,
    tags: v.array(v.string()),
    isVirtual: v.optional(v.boolean()),
    partner: v.optional(v.string()),
    country: v.optional(localizedValidator),
    startAt: v.number(),
    endAt: v.optional(v.number()),
    timezone: v.optional(v.string()),
    title: localizedValidator,
    description: localizedValidator,
    location: localizedValidator,
    dateLabel: localizedValidator,
    rsvpUrl: v.string(),
    coverImageId: v.optional(v.id("_storage")),
    imageUrl: v.optional(v.string()),
    recapUrl: v.optional(v.string()),
    photoAlbumUrl: v.optional(v.string()),
    galleryDateLabel: v.optional(localizedValidator),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject ?? null;
    if (!userId || !isAdmin(userId)) {
      throw new Error("Admin access required");
    }

    const now = Date.now();
    const eventData = {
      slug: args.slug,
      published: args.published,
      type: args.type,
      tags: args.tags,
      isVirtual: args.isVirtual,
      partner: args.partner,
      country: args.country,
      startAt: args.startAt,
      endAt: args.endAt,
      timezone: args.timezone,
      title: args.title,
      description: args.description,
      location: args.location,
      dateLabel: args.dateLabel,
      rsvpUrl: args.rsvpUrl,
      coverImageId: args.coverImageId,
      imageUrl: args.imageUrl,
      recapUrl: args.recapUrl,
      photoAlbumUrl: args.photoAlbumUrl,
      galleryDateLabel: args.galleryDateLabel,
      createdAt: now,
      updatedAt: now,
    };

    if (args.id) {
      const existing = await ctx.db.get(args.id);
      if (!existing) throw new Error("Event not found");
      eventData.createdAt = existing.createdAt;
      await ctx.db.patch(args.id, eventData);
      return args.id;
    }

    return await ctx.db.insert("events", eventData);
  },
});

/**
 * Toggle published status (admin-only).
 */
export const togglePublished = mutation({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject ?? null;
    if (!userId || !isAdmin(userId)) {
      throw new Error("Admin access required");
    }

    const event = await ctx.db.get(args.id);
    if (!event) throw new Error("Event not found");

    await ctx.db.patch(args.id, {
      published: !event.published,
      updatedAt: Date.now(),
    });
    return args.id;
  },
});

/**
 * Toggle virtual status (admin-only).
 */
export const toggleVirtual = mutation({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject ?? null;
    if (!userId || !isAdmin(userId)) {
      throw new Error("Admin access required");
    }

    const event = await ctx.db.get(args.id);
    if (!event) throw new Error("Event not found");

    const isVirtual = event.isVirtual ?? false;
    await ctx.db.patch(args.id, {
      isVirtual: !isVirtual,
      updatedAt: Date.now(),
    });
    return args.id;
  },
});

/**
 * Delete an event (admin-only).
 */
export const deleteEvent = mutation({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject ?? null;
    if (!userId || !isAdmin(userId)) {
      throw new Error("Admin access required");
    }

    const event = await ctx.db.get(args.id);
    if (!event) throw new Error("Event not found");

    await ctx.db.delete(args.id);
    return args.id;
  },
});

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { isAdmin } from "./lib/admin";
import { upsertEventArgs } from "./lib/event_upsert_args";
import { applyEventUpsert } from "./lib/upsert_event_body";

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
  args: upsertEventArgs,
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject ?? null;
    if (!userId || !isAdmin(userId)) {
      throw new Error("Admin access required");
    }

    return await applyEventUpsert(ctx, args, Date.now());
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

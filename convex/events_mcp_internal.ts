import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";
import { assertLocalizedDescriptionWithinLimit } from "./lib/event_content_limits";
import { patchEventArgs } from "./lib/event_patch_args";
import { listEventsFilters } from "./lib/list_events_filters";
import { upsertEventArgs } from "./lib/event_upsert_args";
import { applyEventUpsert } from "./lib/upsert_event_body";
import type { Doc, Id } from "./_generated/dataModel";

/**
 * Machine-only upsert for MCP HTTP route. Not callable from clients.
 */
export const applyUpsert = internalMutation({
  args: upsertEventArgs,
  handler: async (ctx, args) => {
    return await applyEventUpsert(ctx, args, Date.now());
  },
});

function assertEndAfterStart(startAt: number, endAt: number | undefined): void {
  if (endAt !== undefined && endAt < startAt) {
    throw new Error("endAt must be >= startAt");
  }
}

export const patchEvent = internalMutation({
  args: patchEventArgs,
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) throw new Error("Event not found");

    const patch: Partial<Doc<"events">> = { updatedAt: Date.now() };

    if (args.slug !== undefined) patch.slug = args.slug;
    if (args.published !== undefined) patch.published = args.published;
    if (args.type !== undefined) patch.type = args.type;
    if (args.tags !== undefined) patch.tags = args.tags;
    if (args.isVirtual !== undefined) patch.isVirtual = args.isVirtual;
    if (args.partner !== undefined) patch.partner = args.partner;
    if (args.country !== undefined) patch.country = args.country;
    if (args.startAt !== undefined) patch.startAt = args.startAt;
    if (args.endAt !== undefined) patch.endAt = args.endAt;
    if (args.timezone !== undefined) patch.timezone = args.timezone;
    if (args.title !== undefined) patch.title = args.title;
    if (args.description !== undefined) patch.description = args.description;
    if (args.location !== undefined) patch.location = args.location;
    if (args.dateLabel !== undefined) patch.dateLabel = args.dateLabel;
    if (args.rsvpUrl !== undefined) patch.rsvpUrl = args.rsvpUrl;
    if (args.coverImageId !== undefined) patch.coverImageId = args.coverImageId;
    if (args.imageUrl !== undefined) patch.imageUrl = args.imageUrl;
    if (args.recapUrl !== undefined) patch.recapUrl = args.recapUrl;
    if (args.photoAlbumUrl !== undefined) patch.photoAlbumUrl = args.photoAlbumUrl;
    if (args.galleryDateLabel !== undefined) {
      patch.galleryDateLabel = args.galleryDateLabel;
    }

    if (args.description !== undefined) {
      assertLocalizedDescriptionWithinLimit(args.description);
    }

    const startAt =
      args.startAt !== undefined ? args.startAt : existing.startAt;
    const endAt = args.endAt !== undefined ? args.endAt : existing.endAt;
    assertEndAfterStart(startAt, endAt);

    await ctx.db.patch(args.id, patch);
    return args.id;
  },
});

export const removeEvent = internalMutation({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.id);
    if (!event) throw new Error("Event not found");
    await ctx.db.delete(args.id);
    return args.id;
  },
});

/** List with optional filters; default sort startAt desc. */
export const listEvents = internalQuery({
  args: listEventsFilters,
  handler: async (ctx, args) => {
    let rows = await ctx.db.query("events").collect();

    if (args.published !== undefined) {
      rows = rows.filter((e) => e.published === args.published);
    }
    if (args.type !== undefined) {
      rows = rows.filter((e) => e.type === args.type);
    }
    if (args.partner !== undefined) {
      rows = rows.filter((e) => e.partner === args.partner);
    }
    if (args.startAtFrom !== undefined) {
      rows = rows.filter((e) => e.startAt >= args.startAtFrom!);
    }
    if (args.startAtTo !== undefined) {
      rows = rows.filter((e) => e.startAt <= args.startAtTo!);
    }

    rows.sort((a, b) => b.startAt - a.startAt);

    if (args.limit !== undefined && args.limit > 0) {
      rows = rows.slice(0, args.limit);
    }

    return rows;
  },
});

export const getEvent = internalQuery({
  args: {
    id: v.optional(v.id("events")),
    slug: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const hasId = args.id !== undefined;
    const hasSlug = args.slug !== undefined && args.slug.trim() !== "";
    if (hasId === hasSlug) {
      throw new Error("Provide exactly one of id or slug");
    }
    if (hasId) {
      return await ctx.db.get(args.id as Id<"events">);
    }
    return await ctx.db
      .query("events")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug!.trim()))
      .unique();
  },
});

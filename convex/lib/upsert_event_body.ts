import { assertLocalizedDescriptionWithinLimit } from "./event_content_limits";
import { assertCoverStorageWithinLimit } from "./storage_limits";
import type { MutationCtx } from "../_generated/server";
import type { Id } from "../_generated/dataModel";
import type { UpsertEventArgs } from "./event_upsert_args";

/**
 * Insert or patch an `events` row. Used by admin UI and MCP (internal) paths.
 */
export async function applyEventUpsert(
  ctx: MutationCtx,
  args: UpsertEventArgs,
  now: number
): Promise<Id<"events">> {
  if (args.coverImageId) {
    await assertCoverStorageWithinLimit(ctx, args.coverImageId);
  }

  assertLocalizedDescriptionWithinLimit(args.description);

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
}

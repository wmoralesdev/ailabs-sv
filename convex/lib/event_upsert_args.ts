import { v } from "convex/values";
import type { Id } from "../_generated/dataModel";

export type UpsertEventArgs = {
  id?: Id<"events">;
  slug: string;
  published: boolean;
  type:
    | "Meetup"
    | "Workshop"
    | "Social"
    | "Conference"
    | "Hackathon";
  tags: Array<string>;
  isVirtual?: boolean;
  partner?: string;
  country?: { es: string; en: string };
  startAt: number;
  endAt?: number;
  timezone?: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  location: { es: string; en: string };
  dateLabel: { es: string; en: string };
  rsvpUrl: string;
  coverImageId?: Id<"_storage">;
  imageUrl?: string;
  recapUrl?: string;
  photoAlbumUrl?: string;
  galleryDateLabel?: { es: string; en: string };
};

export const eventTypeValidator = v.union(
  v.literal("Meetup"),
  v.literal("Workshop"),
  v.literal("Social"),
  v.literal("Conference"),
  v.literal("Hackathon")
);

export const localizedValidator = v.object({
  es: v.string(),
  en: v.string(),
});

/** Shared `args` for admin `upsertEvent` and MCP internal `applyUpsert`. */
export const upsertEventArgs = {
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
} as const;

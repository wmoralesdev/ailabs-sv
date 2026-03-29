import { v } from "convex/values";
import { eventTypeValidator, localizedValidator } from "./event_upsert_args";
import type { Id } from "../_generated/dataModel";

/** Input shape for MCP PATCH (matches `patchEventArgs` validators). */
export type PatchEventArgs = {
  id: Id<"events">;
  slug?: string;
  published?: boolean;
  type?:
    | "Meetup"
    | "Workshop"
    | "Social"
    | "Conference"
    | "Hackathon";
  tags?: Array<string>;
  isVirtual?: boolean;
  partner?: string;
  country?: { es: string; en: string };
  startAt?: number;
  endAt?: number;
  timezone?: string;
  title?: { es: string; en: string };
  description?: { es: string; en: string };
  location?: { es: string; en: string };
  dateLabel?: { es: string; en: string };
  rsvpUrl?: string;
  coverImageId?: Id<"_storage">;
  imageUrl?: string;
  recapUrl?: string;
  photoAlbumUrl?: string;
  galleryDateLabel?: { es: string; en: string };
};

/** Partial update for MCP PATCH; `id` required, all other fields optional. */
export const patchEventArgs = {
  id: v.id("events"),
  slug: v.optional(v.string()),
  published: v.optional(v.boolean()),
  type: v.optional(eventTypeValidator),
  tags: v.optional(v.array(v.string())),
  isVirtual: v.optional(v.boolean()),
  partner: v.optional(v.string()),
  country: v.optional(localizedValidator),
  startAt: v.optional(v.number()),
  endAt: v.optional(v.number()),
  timezone: v.optional(v.string()),
  title: v.optional(localizedValidator),
  description: v.optional(localizedValidator),
  location: v.optional(localizedValidator),
  dateLabel: v.optional(localizedValidator),
  rsvpUrl: v.optional(v.string()),
  coverImageId: v.optional(v.id("_storage")),
  imageUrl: v.optional(v.string()),
  recapUrl: v.optional(v.string()),
  photoAlbumUrl: v.optional(v.string()),
  galleryDateLabel: v.optional(localizedValidator),
} as const;

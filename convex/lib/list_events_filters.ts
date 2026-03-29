import { v } from "convex/values";
import { eventTypeValidator } from "./event_upsert_args";

/** Optional filters for MCP list (GET collection). */
export const listEventsFilters = {
  published: v.optional(v.boolean()),
  type: v.optional(eventTypeValidator),
  partner: v.optional(v.string()),
  startAtFrom: v.optional(v.number()),
  startAtTo: v.optional(v.number()),
  limit: v.optional(v.number()),
} as const;

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

/**
 * Community profiles schema.
 * Profiles are created/edited by authenticated users (owner-only).
 */
export default defineSchema({
  ...authTables,
  profiles: defineTable({
    slug: v.string(),
    name: v.string(),
    title: v.string(),
    bio: v.string(),
    avatarUrl: v.optional(v.string()),
    links: v.object({
      linkedin: v.optional(v.string()),
      x: v.optional(v.string()),
    }),
    contact: v.optional(v.string()), // members-only visibility
    ownerId: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_owner", ["ownerId"]),
});

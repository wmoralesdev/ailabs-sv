import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Community profiles schema.
 * Profiles are created/edited by authenticated users (owner-only).
 * ownerId stores the Clerk user id (identity.subject).
 */
export default defineSchema({
  profiles: defineTable({
    slug: v.string(),
    name: v.string(),
    title: v.string(),
    bio: v.string(),
    avatarUrl: v.optional(v.string()),
    location: v.optional(v.string()),
    company: v.optional(v.string()),
    experienceLevel: v.optional(v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced"), v.literal("exploring"), v.literal("building"), v.literal("shipping"))),
    interests: v.optional(v.array(v.string())),
    tools: v.optional(v.array(v.string())),
    lookingFor: v.optional(v.array(v.string())),
    availability: v.optional(v.array(v.string())),
    links: v.object({
      linkedin: v.optional(v.string()),
      x: v.optional(v.string()),
    }),
    contact: v.optional(v.string()), // members-only visibility
    ownerId: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_owner", ["ownerId"]),
});

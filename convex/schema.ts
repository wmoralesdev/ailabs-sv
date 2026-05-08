import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

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
    experienceLevel: v.optional(
      v.union(
        v.literal('beginner'),
        v.literal('intermediate'),
        v.literal('advanced'),
        v.literal('exploring'),
        v.literal('building'),
        v.literal('shipping'),
      ),
    ),
    interests: v.optional(v.array(v.string())),
    tools: v.optional(v.array(v.string())),
    lookingFor: v.optional(v.array(v.string())),
    availability: v.optional(v.array(v.string())),
    links: v.object({
      linkedin: v.optional(v.string()),
      x: v.optional(v.string()),
    }),
    contact: v.optional(v.string()), // members-only visibility
    tagline: v.optional(v.string()),
    ownerId: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_slug', ['slug'])
    .index('by_owner', ['ownerId']),

  showcaseEntries: defineTable({
    title: v.string(),
    tagline: v.string(),
    description: v.string(),
    coverImageId: v.id('_storage'),
    coverImageUrl: v.string(),
    slug: v.string(),
    ownerId: v.string(),
    projectUrl: v.optional(v.string()),
    repoUrl: v.optional(v.string()),
    socialPostUrl: v.optional(v.string()),
    event: v.optional(v.string()),
    toolsUsed: v.optional(v.array(v.string())),
    collaboratorIds: v.optional(v.array(v.string())),
    status: v.union(
      v.literal('shipped'),
      v.literal('in_progress'),
      v.literal('concept'),
    ),
    featured: v.optional(v.boolean()),
    featuredAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_slug', ['slug'])
    .index('by_owner', ['ownerId', 'createdAt'])
    .index('by_created', ['createdAt'])
    .index('by_featured', ['featured', 'createdAt']),

  userFiles: defineTable({
    userId: v.string(),
    storageId: v.id('_storage'),
    path: v.string(),
    createdAt: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_path', ['path']),

  events: defineTable({
    slug: v.string(),
    published: v.boolean(),
    type: v.union(
      v.literal('Meetup'),
      v.literal('Workshop'),
      v.literal('Social'),
      v.literal('Conference'),
      v.literal('Hackathon'),
    ),
    tags: v.array(v.string()),
    isVirtual: v.optional(v.boolean()),
    partner: v.optional(v.string()),
    country: v.optional(
      v.object({
        es: v.string(),
        en: v.string(),
      }),
    ),
    startAt: v.number(),
    endAt: v.optional(v.number()),
    timezone: v.optional(v.string()),
    title: v.object({
      es: v.string(),
      en: v.string(),
    }),
    description: v.object({
      es: v.string(),
      en: v.string(),
    }),
    location: v.object({
      es: v.string(),
      en: v.string(),
    }),
    dateLabel: v.object({
      es: v.string(),
      en: v.string(),
    }),
    rsvpUrl: v.string(),
    coverImageId: v.optional(v.id('_storage')),
    imageUrl: v.optional(v.string()),
    recapUrl: v.optional(v.string()),
    photoAlbumUrl: v.optional(v.string()),
    galleryDateLabel: v.optional(
      v.object({
        es: v.string(),
        en: v.string(),
      }),
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_slug', ['slug'])
    .index('by_published_startAt', ['published', 'startAt'])
    .index('by_published_type_startAt', ['published', 'type', 'startAt']),

  labCards: defineTable({
    order: v.number(),
    published: v.boolean(),
    title: v.object({
      es: v.string(),
      en: v.string(),
    }),
    description: v.object({
      es: v.string(),
      en: v.string(),
    }),
    dateLabel: v.object({
      es: v.string(),
      en: v.string(),
    }),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index('by_order', ['order']),
})

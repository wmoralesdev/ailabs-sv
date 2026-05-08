import { v } from 'convex/values'
import { query } from './_generated/server'
import { MONTH_YEAR_RE, isMonthArchiveSlug } from './lib/event/slug'
import type { Doc } from './_generated/dataModel'
import type { QueryCtx } from './_generated/server'

type Lang = 'es' | 'en'

const MONTH_INDEX_BY_KEY: Partial<Record<string, number>> = {
  jan: 0,
  ene: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  abr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  ago: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
  dic: 11,
}

const MONTH_KEYS = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
]

function getMonthKey(ms: number): string {
  const date = new Date(ms)
  return `${MONTH_KEYS[date.getUTCMonth()]}-${date.getUTCFullYear()}`
}

function parseMonthYear(
  monthYear: string,
): { startMs: number; endMs: number } | null {
  const match = monthYear.trim().toLowerCase().match(MONTH_YEAR_RE)
  if (!match) return null

  const month = MONTH_INDEX_BY_KEY[match[1]]
  const year = Number(match[2])
  if (month === undefined || Number.isNaN(year)) return null

  const startMs = Date.UTC(year, month, 1)
  const endMs = Date.UTC(year, month + 1, 1)
  return { startMs, endMs }
}

function formatMonthLabel(ms: number, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-SV' : 'en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(ms))
}

function formatShortDate(ms: number, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-SV' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(ms))
}

async function toEventSummary(ctx: QueryCtx, e: Doc<'events'>, lang: Lang) {
  return {
    id: e._id,
    slug: e.slug,
    title: e.title[lang],
    description: e.description[lang],
    location: e.location[lang],
    country: e.country ? e.country[lang] : 'El Salvador',
    isVirtual: e.isVirtual ?? false,
    date: formatShortDate(e.startAt, lang),
    dateLabel: e.dateLabel[lang],
    startAtMs: e.startAt,
    endAtMs: e.endAt ?? null,
    monthKey: getMonthKey(e.startAt),
    type: e.type,
    tags: e.tags,
    partner: e.partner,
    rsvpUrl: e.rsvpUrl,
    imageUrl: e.coverImageId
      ? await ctx.storage.getUrl(e.coverImageId)
      : (e.imageUrl ?? null),
    recapUrl: e.recapUrl,
    photoAlbumUrl: e.photoAlbumUrl,
  }
}

/**
 * List upcoming and past events for the homepage.
 * Returns localized strings based on language.
 */
export const listForHomepage = query({
  args: {
    language: v.union(v.literal('es'), v.literal('en')),
    now: v.number(),
    upcomingLimit: v.optional(v.number()),
    pastLimit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const lang = args.language as Lang
    const upcomingLimit = Math.min(args.upcomingLimit ?? 10, 20)
    const pastLimit = Math.min(args.pastLimit ?? 12, 24)
    const now = args.now

    const upcomingDocs = await ctx.db
      .query('events')
      .withIndex('by_published_startAt', (q) =>
        q.eq('published', true).gte('startAt', now),
      )
      .order('asc')
      .take(upcomingLimit)

    const pastFiltered = await ctx.db
      .query('events')
      .withIndex('by_published_startAt', (q) =>
        q.eq('published', true).lt('startAt', now),
      )
      .order('desc')
      .take(pastLimit)

    const upcoming = upcomingDocs.map((e) => ({
      id: e._id,
      slug: e.slug,
      title: e.title[lang],
      description: e.description[lang],
      location: e.location[lang],
      country: e.country
        ? e.country[lang]
        : lang === 'es'
          ? 'El Salvador'
          : 'El Salvador',
      isVirtual: e.isVirtual ?? false,
      date: e.dateLabel[lang],
      type: e.type,
      tags: e.tags,
      partner: e.partner,
      rsvpUrl: e.rsvpUrl,
    }))

    const past = await Promise.all(
      pastFiltered.map(async (e) => ({
        id: e._id,
        slug: e.slug,
        title: e.title[lang],
        date: new Intl.DateTimeFormat(lang === 'es' ? 'es-SV' : 'en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }).format(new Date(e.startAt)),
        imageUrl: e.coverImageId
          ? await ctx.storage.getUrl(e.coverImageId)
          : (e.imageUrl ?? null),
        recapUrl: e.recapUrl,
        photoAlbumUrl: e.photoAlbumUrl,
        isVirtual: e.isVirtual ?? false,
        country: e.country?.[lang],
        type: e.type,
        partner: e.partner,
      })),
    )

    return { upcoming, past }
  },
})

export const getBySlug = query({
  args: {
    slug: v.string(),
    language: v.union(v.literal('es'), v.literal('en')),
  },
  handler: async (ctx, args) => {
    if (isMonthArchiveSlug(args.slug)) return null

    const lang = args.language as Lang
    const event = await ctx.db
      .query('events')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .unique()

    if (!event || !event.published) return null

    return {
      id: event._id,
      slug: event.slug,
      title: event.title[lang],
      description: event.description[lang],
      location: event.location[lang],
      country: event.country?.[lang] ?? 'El Salvador',
      isVirtual: event.isVirtual ?? false,
      date: event.dateLabel[lang],
      startAtMs: event.startAt,
      endAtMs: event.endAt ?? null,
      monthKey: getMonthKey(event.startAt),
      galleryDate:
        event.galleryDateLabel?.[lang] ??
        new Intl.DateTimeFormat(lang === 'es' ? 'es-SV' : 'en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }).format(new Date(event.startAt)),
      type: event.type,
      tags: event.tags,
      partner: event.partner,
      rsvpUrl: event.rsvpUrl,
      imageUrl: event.coverImageId
        ? await ctx.storage.getUrl(event.coverImageId)
        : (event.imageUrl ?? null),
      recapUrl: event.recapUrl,
      photoAlbumUrl: event.photoAlbumUrl,
    }
  },
})

export const listByMonth = query({
  args: {
    monthYear: v.string(),
    language: v.union(v.literal('es'), v.literal('en')),
  },
  handler: async (ctx, args) => {
    const lang = args.language as Lang
    const range = parseMonthYear(args.monthYear)

    if (!range) {
      return {
        monthKey: args.monthYear,
        monthLabel: args.monthYear,
        events: [],
        previousMonth: null,
        nextMonth: null,
      }
    }

    const docs = await ctx.db
      .query('events')
      .withIndex('by_published_startAt', (q) =>
        q
          .eq('published', true)
          .gte('startAt', range.startMs)
          .lt('startAt', range.endMs),
      )
      .order('asc')
      .collect()

    const months = await getPublishedMonths(ctx, lang)
    const currentKey = getMonthKey(range.startMs)
    const currentIndex = months.findIndex((month) => month.key === currentKey)

    return {
      monthKey: currentKey,
      monthLabel: formatMonthLabel(range.startMs, lang),
      events: await Promise.all(
        docs.map((event) => toEventSummary(ctx, event, lang)),
      ),
      previousMonth:
        currentIndex >= 0 ? (months[currentIndex + 1] ?? null) : null,
      nextMonth: currentIndex > 0 ? (months[currentIndex - 1] ?? null) : null,
    }
  },
})

export const getRelated = query({
  args: {
    slug: v.string(),
    language: v.union(v.literal('es'), v.literal('en')),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    if (isMonthArchiveSlug(args.slug)) return []

    const lang = args.language as Lang
    const limit = Math.min(args.limit ?? 3, 6)
    const event = await ctx.db
      .query('events')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .unique()

    if (!event || !event.published) return []

    const relatedDocs = await ctx.db
      .query('events')
      .withIndex('by_published_type_startAt', (q) =>
        q.eq('published', true).eq('type', event.type),
      )
      .collect()

    const related = relatedDocs
      .filter((item) => item._id !== event._id)
      .sort(
        (a, b) =>
          Math.abs(a.startAt - event.startAt) -
          Math.abs(b.startAt - event.startAt),
      )
      .slice(0, limit)

    return await Promise.all(
      related.map((item) => toEventSummary(ctx, item, lang)),
    )
  },
})

export const listMonthsWithEvents = query({
  args: {
    language: v.union(v.literal('es'), v.literal('en')),
  },
  handler: async (ctx, args) => {
    return await getPublishedMonths(ctx, args.language as Lang)
  },
})

async function getPublishedMonths(ctx: QueryCtx, lang: Lang) {
  const docs = await ctx.db
    .query('events')
    .withIndex('by_published_startAt', (q) => q.eq('published', true))
    .order('desc')
    .collect()

  const months = new Map<
    string,
    { key: string; label: string; count: number; startMs: number }
  >()

  for (const event of docs) {
    const key = getMonthKey(event.startAt)
    const existing = months.get(key)
    if (existing) {
      existing.count += 1
      continue
    }

    const date = new Date(event.startAt)
    const startMs = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1)
    months.set(key, {
      key,
      label: formatMonthLabel(startMs, lang),
      count: 1,
      startMs,
    })
  }

  return Array.from(months.values())
    .sort((a, b) => b.startMs - a.startMs)
    .map(({ startMs: _startMs, ...month }) => month)
}

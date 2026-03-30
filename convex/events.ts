import { v } from "convex/values";
import { query } from "./_generated/server";

type Lang = "es" | "en";

/**
 * List upcoming and past events for the homepage.
 * Returns localized strings based on language.
 */
export const listForHomepage = query({
  args: {
    language: v.union(v.literal("es"), v.literal("en")),
    upcomingLimit: v.optional(v.number()),
    pastLimit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const lang = args.language as Lang;
    const upcomingLimit = Math.min(args.upcomingLimit ?? 10, 20);
    const pastLimit = Math.min(args.pastLimit ?? 12, 24);
    const now = Date.now();

    const all = await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("published"), true))
      .collect();

    const upcoming = all
      .filter((e) => e.startAt >= now)
      .sort((a, b) => a.startAt - b.startAt)
      .slice(0, upcomingLimit)
      .map((e) => ({
        id: e._id,
        slug: e.slug,
        title: e.title[lang],
        description: e.description[lang],
        location: e.location[lang],
        country: e.country ? e.country[lang] : (lang === "es" ? "El Salvador" : "El Salvador"),
        isVirtual: e.isVirtual ?? false,
        date: e.dateLabel[lang],
        type: e.type,
        tags: e.tags,
        partner: e.partner,
        rsvpUrl: e.rsvpUrl,
      }));

    const pastFiltered = all
      .filter((e) => e.startAt < now)
      .sort((a, b) => b.startAt - a.startAt)
      .slice(0, pastLimit);

    const past = await Promise.all(
      pastFiltered.map(async (e) => ({
        id: e._id,
        title: e.title[lang],
        date: new Intl.DateTimeFormat(lang === "es" ? "es-SV" : "en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(new Date(e.startAt)),
        imageUrl: e.coverImageId
          ? await ctx.storage.getUrl(e.coverImageId)
          : (e.imageUrl ?? null),
        recapUrl: e.recapUrl,
        photoAlbumUrl: e.photoAlbumUrl,
        isVirtual: e.isVirtual ?? false,
        country: e.country?.[lang],
        partner: e.partner,
      }))
    );

    return { upcoming, past };
  },
});

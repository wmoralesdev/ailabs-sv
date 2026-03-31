import { query } from "./_generated/server";

/** Upper bound per type; split sitemap index later if the site exceeds limits. */
const MAX_SHOWCASE = 40_000;
const MAX_PROFILES = 40_000;

/**
 * Public URLs for sitemap generation (dynamic paths only).
 * Static routes (/, /partners, /showcase, /terms, /links) are added by the HTTP handler.
 */
export const listPublicUrls = query({
  args: {},
  handler: async (ctx) => {
    const showcaseEntries = await ctx.db.query("showcaseEntries").collect();
    const profiles = await ctx.db.query("profiles").collect();

    const showcase = showcaseEntries.slice(0, MAX_SHOWCASE).map((e) => ({
      slug: e.slug,
      lastmod: e.updatedAt,
    }));

    const profilesOut = profiles.slice(0, MAX_PROFILES).map((p) => ({
      slug: p.slug,
      lastmod: p.updatedAt,
    }));

    return { showcase, profiles: profilesOut };
  },
});

import { ConvexHttpClient } from "convex/browser";
import { api } from "convex/_generated/api";

function getConvexUrl(): string {
  const u =
    (typeof process !== "undefined" &&
      (process.env.CONVEX_URL ?? process.env.VITE_CONVEX_URL)) ||
    (import.meta.env.VITE_CONVEX_URL as string | undefined);
  if (!u?.trim()) {
    throw new Error("CONVEX_URL or VITE_CONVEX_URL must be set for sitemap generation");
  }
  return u.trim();
}

function siteOrigin(): string {
  const raw =
    (typeof process !== "undefined" && process.env.VITE_SITE_URL) ||
    (import.meta.env.VITE_SITE_URL as string | undefined);
  if (raw?.trim()) return raw.replace(/\/$/, "");
  return "https://ailabs.sv";
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Builds sitemap XML body (same-origin, for GET /sitemap.xml). */
export async function buildSitemapXmlBody(): Promise<string> {
  const client = new ConvexHttpClient(getConvexUrl());
  const data = await client.query(api.sitemap.listPublicUrls, {});
  const origin = siteOrigin();

  const staticPaths = ["/", "/partners", "/showcase", "/terms", "/links"] as const;
  const rows: Array<{ loc: string; lastmod?: string }> = [];

  for (const p of staticPaths) {
    rows.push({ loc: `${origin}${p}` });
  }

  for (const u of data.showcase) {
    rows.push({
      loc: `${origin}/showcase/${encodeURIComponent(u.slug)}`,
      lastmod: new Date(u.lastmod).toISOString().split("T")[0],
    });
  }

  for (const u of data.profiles) {
    rows.push({
      loc: `${origin}/community/${encodeURIComponent(u.slug)}`,
      lastmod: new Date(u.lastmod).toISOString().split("T")[0],
    });
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rows
  .map((r) => {
    const last = r.lastmod
      ? `
    <lastmod>${escapeXml(r.lastmod)}</lastmod>`
      : "";
    return `  <url>
    <loc>${escapeXml(r.loc)}</loc>${last}
  </url>`;
  })
  .join("\n")}
</urlset>`;
}

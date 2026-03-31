import { getSiteOrigin } from "@/lib/site-url";

export function defaultOgImageUrl(): string {
  return `${getSiteOrigin()}/og.png`;
}

export type SeoMetaOptions = {
  /** Path including leading slash, e.g. `/partners` */
  path: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  ogType?: "website" | "article";
  /** When true, sets robots to noindex,nofollow */
  noIndex?: boolean;
};

/**
 * TanStack Router head meta + canonical link for a public page.
 * Deeper routes override overlapping meta keys from the root.
 */
export function buildSeoMeta(opts: SeoMetaOptions): {
  meta: Array<Record<string, unknown>>;
  links: Array<{ rel: "canonical"; href: string }>;
} {
  const origin = getSiteOrigin();
  const rawPath = opts.path.startsWith("/") ? opts.path : `/${opts.path}`;
  const canonical = `${origin}${rawPath === "" ? "/" : rawPath}`;
  const ogImage = opts.imageUrl ?? defaultOgImageUrl();
  const ogAlt = opts.imageAlt ?? `${opts.title} — Ai /abs`;
  const robots = opts.noIndex ? "noindex, nofollow" : "index, follow";

  const meta: Array<Record<string, unknown>> = [
    { title: opts.title },
    { name: "description", content: opts.description },
    { property: "og:type", content: opts.ogType ?? "website" },
    { property: "og:title", content: opts.title },
    { property: "og:description", content: opts.description },
    { property: "og:url", content: canonical },
    { property: "og:image", content: ogImage },
    { property: "og:image:alt", content: ogAlt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: opts.title },
    { name: "twitter:description", content: opts.description },
    { name: "twitter:image", content: ogImage },
    { name: "robots", content: robots },
  ];

  return {
    meta,
    links: [{ rel: "canonical", href: canonical }],
  };
}

/** `/links` WebPage JSON-LD; `@id`s align with `buildHomeJsonLd` for the same origin. */
export function buildLinksPageJsonLd(
  title: string,
  description: string,
): Record<string, unknown> {
  const origin = getSiteOrigin();
  const pageUrl = `${origin}/links`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        isPartOf: { "@id": `${origin}/#website` },
        publisher: { "@id": `${origin}/#organization` },
      },
    ],
  };
}

/** Homepage Organization + WebSite JSON-LD for `script:ld+json` meta entries. */
export function buildHomeJsonLd(): Record<string, unknown> {
  const origin = getSiteOrigin();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        name: "Ai /abs",
        url: origin,
        logo: `${origin}/og.png`,
        sameAs: [
          "https://www.linkedin.com/company/ai-labs-sv",
          "https://x.com/ailabs_sv",
          "https://www.instagram.com/ailabs_sv/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: origin,
        name: "Ai /abs",
        publisher: { "@id": `${origin}/#organization` },
      },
    ],
  };
}

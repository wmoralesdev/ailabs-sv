import { createMiddleware } from "@tanstack/react-start";
import { buildSitemapXmlBody } from "@/lib/sitemap-xml";

/**
 * Serves /sitemap.xml before Clerk so the sitemap does not require auth or secret keys.
 */
export const sitemapMiddleware = createMiddleware().server(
  async ({ request, next }) => {
    const url = new URL(request.url);
    if (url.pathname === "/sitemap.xml") {
      const body = await buildSitemapXmlBody();
      throw new Response(body, {
        status: 200,
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }
    return next();
  }
);

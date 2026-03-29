import { clerkMiddleware } from "@clerk/tanstack-react-start/server";
import { createStart } from "@tanstack/react-start";
import { sitemapMiddleware } from "@/middleware/sitemap-middleware";

export const startInstance = createStart(() => ({
  requestMiddleware: [sitemapMiddleware, clerkMiddleware()],
}));

import { ConvexHttpClient } from "convex/browser";

/** Server-safe Convex HTTP client for loaders and Nitro (uses VITE_CONVEX_URL). */
export function createConvexHttpClient(): ConvexHttpClient {
  const url = import.meta.env.VITE_CONVEX_URL as string | undefined;
  if (!url?.trim()) {
    throw new Error("VITE_CONVEX_URL is not set");
  }
  return new ConvexHttpClient(url);
}

/**
 * HTTP actions (e.g. `/api/turnstile/verify`) are served from `*.convex.site`,
 * while the WebSocket/API client uses `*.convex.cloud`.
 */
export function getConvexHttpActionsOrigin(): string {
  const url = import.meta.env.VITE_CONVEX_URL as string | undefined;
  if (!url?.trim()) {
    throw new Error("VITE_CONVEX_URL is not set");
  }
  return url.trim().replace(/\.convex\.cloud$/i, ".convex.site");
}

import { createServerFn } from "@tanstack/react-start";
import { getConvexHttpActionsOrigin } from "@/lib/convex-http";

/**
 * Server-only proxy: verifies the Turnstile token against Convex HTTP (`/api/turnstile/verify`).
 * The browser must not call `*.convex.site` directly (cross-origin fetch can fail with "Failed to fetch").
 */
export const verifyTurnstileTokenFn = createServerFn({ method: "POST" })
  .inputValidator((input: { token: string }) => {
    if (typeof input.token !== "string" || input.token.trim().length === 0) {
      throw new Error("Missing token");
    }
    return input;
  })
  .handler(async ({ data }): Promise<boolean> => {
    const origin = getConvexHttpActionsOrigin();
    const res = await fetch(`${origin}/api/turnstile/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: data.token }),
    });
    if (!res.ok) {
      return false;
    }
    const json = (await res.json()) as { success?: boolean };
    return json.success === true;
  });

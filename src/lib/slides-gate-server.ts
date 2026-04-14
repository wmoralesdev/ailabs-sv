import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, setResponseHeader } from "@tanstack/react-start/server";
import {
  SLIDES_AUTH_COOKIE_NAME,
  getSlidesSessionToken,
  hasValidSlidesSessionCookie,
  verifySlidesGatePassword,
} from "@/lib/slides-gate-auth";

function getSlidesPasswordFromEnv(): string | null {
  const raw = process.env.SLIDES_PASSWORD?.trim();
  return raw && raw.length > 0 ? raw : null;
}

export type SlidesGateState =
  | { configured: false; allowed: false }
  | { configured: true; allowed: boolean };

export const getSlidesGateStateFn = createServerFn({ method: "GET" }).handler((): SlidesGateState => {
  const password = getSlidesPasswordFromEnv();
  if (!password) {
    return { configured: false, allowed: false };
  }
  const cookieHeader = getRequestHeader("Cookie");
  const allowed = hasValidSlidesSessionCookie(cookieHeader, password);
  return { configured: true, allowed };
});

export const verifySlidesPasswordFn = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string }) => {
    if (typeof input.password !== "string") {
      throw new Error("Missing password");
    }
    return input;
  })
  .handler(({ data }): { success: boolean } => {
    const password = getSlidesPasswordFromEnv();
    if (!password) {
      return { success: false };
    }
    if (!verifySlidesGatePassword(data.password, password)) {
      return { success: false };
    }
    const token = getSlidesSessionToken(password);
    const secure = process.env.NODE_ENV === "production";
    const maxAge = 60 * 60 * 24 * 30;
    const cookieParts = [
      `${SLIDES_AUTH_COOKIE_NAME}=${token}`,
      // Path must cover TanStack server-fn URLs (not under /slides); scoped by name + HttpOnly.
      "Path=/",
      "HttpOnly",
      "SameSite=Lax",
      `Max-Age=${maxAge}`,
      ...(secure ? ["Secure"] : []),
    ];
    setResponseHeader("Set-Cookie", cookieParts.join("; "));
    return { success: true };
  });

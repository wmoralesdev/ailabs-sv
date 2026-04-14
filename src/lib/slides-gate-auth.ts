import { createHmac, timingSafeEqual } from "node:crypto";

export const SLIDES_AUTH_COOKIE_NAME = "ailabs-slides-auth";

const HMAC_LABEL = "ailabs-slides-auth-v1";

export function getSlidesSessionToken(password: string): string {
  return createHmac("sha256", password).update(HMAC_LABEL).digest("hex");
}

export function hasValidSlidesSessionCookie(
  cookieHeader: string | null,
  password: string,
): boolean {
  if (!cookieHeader) return false;
  const expected = getSlidesSessionToken(password);
  for (const part of cookieHeader.split(";")) {
    const trimmed = part.trim();
    if (!trimmed.startsWith(`${SLIDES_AUTH_COOKIE_NAME}=`)) continue;
    const value = trimmed.slice(SLIDES_AUTH_COOKIE_NAME.length + 1);
    try {
      return timingSafeEqual(Buffer.from(value, "utf8"), Buffer.from(expected, "utf8"));
    } catch {
      return false;
    }
  }
  return false;
}

export function verifySlidesGatePassword(input: string, expected: string): boolean {
  const a = Buffer.from(input, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

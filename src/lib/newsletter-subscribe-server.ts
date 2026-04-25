import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Resend } from "resend";
import { verifyTurnstileTokenFn } from "@/lib/verify-turnstile-server-fn";

const inputSchema = z.object({
  email: z.string().trim().min(1).max(320),
  turnstileToken: z.string().optional(),
});

function turnstileRequiredForServer(): boolean {
  return Boolean(
    typeof process !== "undefined" && process.env.VITE_TURNSTILE_SITE_KEY?.trim()
  );
}

function normalizeEmail(raw: string): string | null {
  const t = z.string().trim().toLowerCase().email().max(320).safeParse(raw);
  return t.success ? t.data : null;
}

function looksLikeDuplicateResendError(
  err: { message: string; name: string; statusCode: number | null }
): boolean {
  const m = err.message.toLowerCase();
  if (m.includes("already") || m.includes("exists") || m.includes("duplicate")) {
    return true;
  }
  if (m.includes("taken") || m.includes("registered") || m.includes("unique")) {
    return true;
  }
  if (err.statusCode === 409) {
    return true;
  }
  return false;
}

export type SubscribeNewsletterResult =
  | { success: true; kind: "subscribed" | "alreadySubscribed" }
  | {
      success: false;
      error:
        | "unconfigured"
        | "invalidEmail"
        | "turnstileRequired"
        | "turnstileFailed"
        | "resendError";
    };

export const subscribeToNewsletterFn = createServerFn({ method: "POST" })
  .inputValidator((input: { email: string; turnstileToken?: string }) => {
    return inputSchema.parse(input);
  })
  .handler(async ({ data }): Promise<SubscribeNewsletterResult> => {
    const email = normalizeEmail(data.email);
    if (!email) {
      return { success: false, error: "invalidEmail" };
    }

    if (turnstileRequiredForServer()) {
      const token = data.turnstileToken?.trim();
      if (!token) {
        return { success: false, error: "turnstileRequired" };
      }
      let ok: boolean;
      try {
        ok = await verifyTurnstileTokenFn({ data: { token } });
      } catch {
        ok = false;
      }
      if (!ok) {
        return { success: false, error: "turnstileFailed" };
      }
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID?.trim();
    if (!apiKey || !segmentId) {
      return { success: false, error: "unconfigured" };
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.contacts.create({
      email,
      segments: [{ id: segmentId }],
    });

    if (error) {
      if (looksLikeDuplicateResendError(error)) {
        return { success: true, kind: "alreadySubscribed" };
      }
      return { success: false, error: "resendError" };
    }

    return { success: true, kind: "subscribed" };
  });

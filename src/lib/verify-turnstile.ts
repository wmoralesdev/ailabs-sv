import { verifyTurnstileTokenFn } from "@/lib/verify-turnstile-server-fn";

export async function verifyTurnstileToken(token: string): Promise<boolean> {
  try {
    return await verifyTurnstileTokenFn({ data: { token } });
  } catch {
    return false;
  }
}

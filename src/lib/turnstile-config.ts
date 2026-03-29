export function isTurnstileConfigured(): boolean {
  return Boolean(
    typeof import.meta.env.VITE_TURNSTILE_SITE_KEY === "string" &&
      import.meta.env.VITE_TURNSTILE_SITE_KEY.trim().length > 0,
  );
}

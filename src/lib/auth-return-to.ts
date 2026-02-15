export function getSafeReturnTo(input: unknown): string | undefined {
  if (typeof input !== "string") return undefined;
  if (!input.startsWith("/")) return undefined;
  if (input.startsWith("//")) return undefined;

  try {
    const parsed = new URL(input, "http://localhost");
    const safe = `${parsed.pathname}${parsed.search}${parsed.hash}`;
    return safe.startsWith("/") ? safe : undefined;
  } catch {
    return undefined;
  }
}

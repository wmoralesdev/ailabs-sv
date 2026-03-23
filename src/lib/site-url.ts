/** Public site origin for absolute URLs (Open Graph, etc.). Override with `VITE_SITE_URL`. */
export function getSiteOrigin(): string {
  const raw = import.meta.env.VITE_SITE_URL as string | undefined;
  if (raw?.trim()) return raw.replace(/\/$/, "");
  return "https://ailabs.sv";
}

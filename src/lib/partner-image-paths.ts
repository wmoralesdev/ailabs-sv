/** Files in `public/partners/`. `-light` / `-dark` refer to background lightness the asset is designed for, not app theme. */
export const CURSOR_PARTNER_IMG = {
  light: "/partners/cursor-logo-light.svg",
  dark: "/partners/cursor-logo-dark.svg",
} as const;

export const V0_PARTNER_IMG = {
  light: "/partners/v0-logo-light.svg",
  dark: "/partners/v0-logo-dark.svg",
} as const;

export const CODEX_PARTNER_IMG = {
  light: "/partners/codex-logo-light.svg",
  dark: "/partners/codex-logo-dark.svg",
} as const;

export const OPENAI_PARTNER_IMG = {
  light: "/partners/openai-mark-light.svg",
  dark: "/partners/openai-mark-dark.svg",
} as const;

export const N8N_PARTNER_IMG = {
  mark: "/partners/n8n-mark.svg",
} as const;

export const VERCEL_PARTNER_IMG = {
  light: "/partners/vercel-mark-light.svg",
  dark: "/partners/vercel-mark-dark.svg",
} as const;

/** Cursor wordmark is scaled up vs v0 so the pair looks balanced. */
export const partnerRasterMarkClasses = {
  base: "object-contain object-center opacity-80 transition-opacity group-hover:opacity-100",
  cursorLight: "h-12 w-auto max-w-[min(100%,12rem)] dark:hidden md:h-14",
  cursorDark:
    "hidden h-12 w-auto max-w-[min(100%,12rem)] dark:block md:h-14",
  v0Light: "h-8 w-auto max-w-[min(100%,6rem)] dark:hidden md:h-10",
  v0Dark: "hidden h-8 w-auto max-w-[min(100%,6rem)] dark:block md:h-10",
  /** Wordmark (255×98); size by height (same band as Cursor) so the type stays legible. */
  codexLight:
    "h-10 w-auto max-w-[min(100%,22rem)] shrink-0 dark:hidden sm:h-11 md:h-12 lg:h-14",
  codexDark:
    "hidden h-10 w-auto max-w-[min(100%,22rem)] shrink-0 dark:block sm:h-11 md:h-12 lg:h-14",
} as const;

/** Larger marks for slide deck partner grid (projector). */
export const slidesPartnerMarkClasses = {
  base: "object-contain object-center opacity-90",
  cursorLight: "h-12 w-auto max-w-[min(100%,12rem)] dark:hidden md:h-14",
  cursorDark:
    "hidden h-12 w-auto max-w-[min(100%,12rem)] dark:block md:h-14",
  v0Light: "h-9 w-auto max-w-[min(100%,7rem)] dark:hidden md:h-11",
  v0Dark: "hidden h-9 w-auto max-w-[min(100%,7rem)] dark:block md:h-11",
  codexLight:
    "h-10 w-auto max-w-[min(100%,22rem)] dark:hidden sm:h-11 md:h-12 lg:h-14",
  codexDark:
    "hidden h-10 w-auto max-w-[min(100%,22rem)] dark:block sm:h-11 md:h-12 lg:h-14",
  n8n: "h-10 w-auto max-w-[min(100%,10rem)] md:h-12",
  openaiLight: "h-12 w-auto max-w-[min(100%,10rem)] dark:hidden md:h-14",
  openaiDark: "hidden h-12 w-auto max-w-[min(100%,10rem)] dark:block md:h-14",
  vercelLight: "h-10 w-auto max-w-[min(100%,5rem)] dark:hidden md:h-12",
  vercelDark: "hidden h-10 w-auto max-w-[min(100%,5rem)] dark:block md:h-12",
} as const;

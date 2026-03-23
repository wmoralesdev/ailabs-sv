/** Files in `public/partners/`. `-light` / `-dark` refer to background lightness the asset is designed for, not app theme. */
export const CURSOR_PARTNER_IMG = {
  light: "/partners/cursor-logo-light.svg",
  dark: "/partners/cursor-logo-dark.svg",
} as const;

export const V0_PARTNER_IMG = {
  light: "/partners/v0-logo-light.svg",
  dark: "/partners/v0-logo-dark.svg",
} as const;

/** Cursor wordmark is scaled up vs v0 so the pair looks balanced. */
export const partnerRasterMarkClasses = {
  base: "object-contain object-center opacity-80 transition-opacity group-hover:opacity-100",
  cursorLight: "h-12 w-auto max-w-[min(100%,12rem)] dark:hidden md:h-14",
  cursorDark:
    "hidden h-12 w-auto max-w-[min(100%,12rem)] dark:block md:h-14",
  v0Light: "h-8 w-auto max-w-[min(100%,6rem)] dark:hidden md:h-10",
  v0Dark: "hidden h-8 w-auto max-w-[min(100%,6rem)] dark:block md:h-10",
} as const;

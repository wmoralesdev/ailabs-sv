import { useEffect } from "react";
import { useI18n } from "@/lib/i18n";

/**
 * Keeps `html[lang]` in sync with UI language. Document title and meta come from
 * TanStack Router route `head()` (SSR); avoid overwriting them here for SEO.
 */
export function LangSync() {
  const { language } = useI18n();

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return null;
}

import { useEffect } from "react";
import { useI18n } from "@/lib/i18n";

export function LangSync() {
  const { language, t } = useI18n();

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.site.pageTitle;
  }, [language, t]);

  return null;
}

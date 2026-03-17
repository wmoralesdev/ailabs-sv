import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { t, language, setLanguage } = useI18n();

  return (
    <Button
      variant="ghost"
      size="lg"
      onClick={() => setLanguage(language === "es" ? "en" : "es")}
      className="min-w-11 px-2 font-mono text-sm font-medium"
      aria-label={language === "es" ? t.ui.a11y.switchToEnglish : t.ui.a11y.switchToSpanish}
    >
      {language.toUpperCase()}
    </Button>
  );
}

import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { useI18n } from "@/lib/i18n";
import { useResolvedDark, useTheme } from "@/components/theme-provider";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ThemeChoice = "dark" | "light" | "system";

/** System mode uses sun/moon from resolved preference; explicit light/dark match ThemeToggle. */
function triggerIcon(theme: ThemeChoice, resolvedDark: boolean) {
  if (theme === "system") {
    return resolvedDark ? Moon02Icon : Sun03Icon;
  }
  return theme === "dark" ? Moon02Icon : Sun03Icon;
}

export function SlidesThemeSelector() {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();
  const resolvedDark = useResolvedDark();

  const onValueChange = (value: string | null) => {
    if (value === "light" || value === "dark" || value === "system") {
      setTheme(value);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        aria-label={t.ui.a11y.selectTheme}
        className={buttonVariants({ variant: "ghost", size: "icon-xl" })}
      >
        <HugeiconsIcon
          icon={triggerIcon(theme, resolvedDark)}
          className="size-6 transition-transform"
          aria-hidden
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom" sideOffset={8}>
        <DropdownMenuRadioGroup value={theme} onValueChange={onValueChange}>
          <DropdownMenuRadioItem value="light">{t.ui.a11y.themeLight}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">{t.ui.a11y.themeDark}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">{t.ui.a11y.themeSystem}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

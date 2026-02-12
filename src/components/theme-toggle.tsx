import { HugeiconsIcon } from "@hugeicons/react"
import { Moon02Icon, Sun03Icon, ComputerIcon } from "@hugeicons/core-free-icons"
import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { useI18n } from "@/lib/i18n"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const { t } = useI18n()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const triggerIcon = !mounted
    ? ComputerIcon
    : theme === "dark"
      ? Moon02Icon
      : theme === "light"
        ? Sun03Icon
        : ComputerIcon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t.ui.a11y.selectTheme}
        className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "w-9 px-0")}
      >
        <HugeiconsIcon icon={triggerIcon} className="size-5 transition-transform" />
        <span className="sr-only">{t.ui.a11y.selectTheme}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <HugeiconsIcon icon={Sun03Icon} className="mr-2 size-4" />
          {t.ui.a11y.themeLight}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <HugeiconsIcon icon={Moon02Icon} className="mr-2 size-4" />
          {t.ui.a11y.themeDark}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <HugeiconsIcon icon={ComputerIcon} className="mr-2 size-4" />
          {t.ui.a11y.themeSystem}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

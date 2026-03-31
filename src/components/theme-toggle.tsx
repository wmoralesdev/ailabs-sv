import { HugeiconsIcon } from "@hugeicons/react"
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons"
import { useEffect, useState } from "react"
import { useResolvedDark, useTheme } from "@/components/theme-provider"
import { useI18n } from "@/lib/i18n"
import { buttonVariants } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme } = useTheme()
  const { t } = useI18n()
  const [mounted, setMounted] = useState(false)
  const isDark = useResolvedDark()

  useEffect(() => {
    setMounted(true)
  }, [])

  const triggerIcon = !mounted ? Sun03Icon : isDark ? Sun03Icon : Moon02Icon
  const ariaLabel = !mounted
    ? t.ui.a11y.selectTheme
    : isDark
      ? t.ui.a11y.toggleToLight
      : t.ui.a11y.toggleToDark

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={buttonVariants({ variant: "ghost", size: "icon-xl" })}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <HugeiconsIcon icon={triggerIcon} className="size-6 transition-transform" aria-hidden />
    </button>
  )
}

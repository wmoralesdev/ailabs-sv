import { Link } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { CodeIcon, Search01Icon } from "@hugeicons/core-free-icons";
import { useI18n } from "@/lib/i18n";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthHeaderActions } from "@/components/auth/auth-header-actions";
import { JoinCtaButton } from "@/components/join-cta-button";

export function SiteHeader() {
  const { t } = useI18n();

  return (
    <header
      className="fixed inset-x-0 top-4 z-50 mx-auto w-[calc(100%-2rem)] max-w-5xl rounded-2xl border border-border/60 bg-background/80 shadow-lg shadow-black/5 backdrop-blur-lg pt-[env(safe-area-inset-top)]"
    >
      <div className="flex h-14 items-center justify-between px-5">
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2"
          aria-label={t.site.name}
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background">
            <HugeiconsIcon icon={CodeIcon} size={18} />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">
            <span className="text-primary">ai</span>
            <span className="text-foreground">labs</span>
            <span className="text-muted-foreground">.sv</span>
          </span>
        </Link>

        {/* Center Menu */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            to="/"
            hash="overview"
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
          >
            {t.ui.nav.overview}
          </Link>
          <Link
            to="/"
            hash="events"
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
          >
            {t.ui.nav.events}
          </Link>
          <Link
            to="/partners"
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
          >
            {t.ui.nav.partners}
          </Link>
          <Link
            to="/blog"
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
          >
            {t.ui.nav.blog}
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-foreground/70 transition-colors hover:text-foreground"
            aria-label={t.ui.a11y.search}
          >
            <HugeiconsIcon icon={Search01Icon} size={18} />
          </button>
          <div className="hidden h-4 w-px bg-border sm:block" />
          <LanguageToggle />
          <ThemeToggle />
          <AuthHeaderActions />
          <JoinCtaButton />
        </div>
      </div>
    </header>
  );
}

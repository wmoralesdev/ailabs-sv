import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRightIcon } from "@hugeicons/core-free-icons";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { AnimatedGrid } from "@/components/ui/animated-grid";

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section
      id="overview"
      className="relative overflow-hidden border-b border-border pb-16 pt-24 md:pb-24 md:pt-32"
    >
      {/* Animated grid background */}
      <AnimatedGrid />

      {/* Top fade overlay (background only) */}
      <div className="hero-top-fade pointer-events-none absolute inset-0 z-2" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        {/* Pill badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 shadow-sm motion-safe:animate-hero-in [animation-delay:80ms]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 motion-safe:animate-ping motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-xs font-medium tracking-wide text-foreground/80">
            {t.ui.hero.badgeLabel}
          </span>
        </div>

        <h1 className="mb-8 text-4xl font-medium leading-[0.95] tracking-tighter motion-safe:animate-hero-in [animation-delay:140ms] md:text-6xl lg:text-7xl">
          <span className="block text-foreground">{t.hero.headlineLine1}</span>
          <span className="block text-primary">{t.hero.headlineLine2}</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-pretty text-base font-light leading-relaxed text-foreground/60 motion-safe:animate-hero-in [animation-delay:220ms] md:text-lg">
          {t.hero.subheadline}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 motion-safe:animate-hero-in [animation-delay:300ms] sm:flex-row">
          <Link
            to={t.site.whatsappLink as any}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary/30 sm:w-auto"
          >
            {t.hero.primaryCta}
            <HugeiconsIcon icon={ArrowRightIcon} size={18} />
          </Link>
          <Link
            to="/"
            hash="community"
            className="flex h-12 w-full items-center justify-center rounded-lg border border-border bg-transparent px-8 font-medium text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-accent/50 sm:w-auto"
          >
            {t.hero.secondaryCta}
          </Link>
        </div>
      </div>
    </section>
  );
}

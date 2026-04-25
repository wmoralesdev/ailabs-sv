import { ArrowRightIcon, SparklesIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import { SocialLinks } from "@/components/social-links";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { Button } from "@/components/ui/button";
import { GlitchText } from "@/components/ui/glitch-text";
import { useGsapHeroIntro } from "@/hooks/use-gsap-hero-intro";
import { useI18n } from "@/lib/i18n";

export function HeroSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  useGsapHeroIntro(sectionRef);

  const proofStats = [
    {
      value: t.stats.members,
      label: t.ui.stats.membersDetail,
    },
    {
      value: t.stats.eventsHeld,
      label: t.ui.stats.eventsDetail,
    },
    {
      value: t.stats.projectsShipped,
      label: t.ui.stats.projectsShippedDetail,
    },
    {
      value: t.stats.partners,
      label: t.ui.stats.partnersDetail,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="overview"
      className="relative flex min-h-dvh items-center overflow-hidden border-b border-border pb-14 pt-28 md:pb-16 md:pt-28"
    >
      <AnimatedGrid className="opacity-70" />
      <div className="hero-radial-field pointer-events-none absolute inset-0 opacity-80" />
      <div className="hero-top-fade pointer-events-none absolute inset-0 z-2" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-background to-transparent" />

      <div className="container relative z-10 mx-auto grid items-center gap-8 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.58fr)] lg:gap-12">
        <div className="max-w-3xl text-left">
          <div
            data-hero-intro
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 shadow-sm backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 motion-safe:animate-ping motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="eyebrow-label text-foreground/80">
              {t.ui.hero.badgeLabel}
            </span>
          </div>

          <h1 data-hero-intro className="text-display-hero mb-7 font-medium">
            <span className="block max-w-4xl text-foreground">
              {t.hero.headlineLine1}
            </span>
            <GlitchText
              phrases={t.hero.headlinePhrases}
              className="block text-primary"
            />
          </h1>

          <p
            data-hero-intro
            className="text-body-lead mb-8 max-w-2xl text-pretty font-light text-foreground/65"
          >
            {t.hero.subheadline}
          </p>

          <div
            data-hero-intro
            className="flex flex-col items-start gap-4 sm:flex-row"
          >
            <Button
              variant="default"
              size="2xl"
              className="w-full rounded-full px-6 sm:w-auto"
              render={
                <Link
                  to={t.site.whatsappLink as any}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              {t.hero.primaryCta}
              <HugeiconsIcon
                icon={ArrowRightIcon}
                size={18}
                data-icon="inline-end"
              />
            </Button>
            <Button
              variant="outline"
              size="2xl"
              className="w-full rounded-full border-border/70 bg-background/65 px-6 backdrop-blur sm:w-auto"
              render={<Link to="/" hash="community" />}
            >
              {t.hero.secondaryCta}
            </Button>
          </div>

          <div data-hero-intro className="mt-10 flex flex-col items-start gap-3">
            <p className="eyebrow-label text-foreground/45">
              {t.ui.hero.followLabel}
            </p>
            <SocialLinks socials={t.site.socials} variant="minimal" />
          </div>
        </div>

        <aside
          data-hero-orbit
          className="interactive-lift hidden rounded-[1.35rem] border border-border/70 bg-background/55 p-4 backdrop-blur md:block"
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow-label mb-2 text-primary">
                {t.ui.hero.proofCardEyebrow}
              </p>
              <h2 className="max-w-xs font-display text-xl font-medium leading-none tracking-[-0.04em] text-foreground md:text-2xl">
                {t.ui.hero.proofCardTitle}
              </h2>
            </div>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
              <HugeiconsIcon icon={SparklesIcon} size={18} />
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {proofStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border/70 bg-card/75 p-3.5"
              >
                <p className="font-mono text-xl font-semibold tabular-nums text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium uppercase leading-snug tracking-[0.12em] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRightIcon,
  FlashIcon,
  Presentation01Icon,
  Tick02Icon,
  Wrench01Icon,
} from "@hugeicons/core-free-icons";
import { seoCopyEs } from "@/content/seo-copy";
import { buildSeoMeta } from "@/lib/seo-meta";
import { useI18n } from "@/lib/i18n";
import {
  CURSOR_PARTNER_IMG,
  V0_PARTNER_IMG,
  partnerRasterMarkClasses,
} from "@/lib/partner-image-paths";
import { cn } from "@/lib/utils";
import { CommunityProofBentoSection } from "@/components/sections/community-proof-bento-section";
import { SectionHeader } from "@/components/section-header";
import { SiteHeader } from "@/components/site-header";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { GlitchText } from "@/components/ui/glitch-text";
import { SiteFooter } from "@/components/site-footer";
import { Convex } from "@/components/ui/svgs/convex";
import { Supabase } from "@/components/ui/svgs/supabase";
import { Vercel } from "@/components/ui/svgs/vercel";

const PARTNER_ICONS: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  Vercel,
  Supabase,
  Convex,
};

const WAYS_TO_HELP_ICONS = [FlashIcon, Wrench01Icon, Presentation01Icon];

export const Route = createFileRoute("/partners")({
  head: () => {
    const { meta, links } = buildSeoMeta({
      path: "/partners",
      title: seoCopyEs.partners.title,
      description: seoCopyEs.partners.description,
    });
    return { meta, links };
  },
  component: PartnersPage,
});

function PartnersPage() {
  const { t } = useI18n();
  const p = t.partnersPage;

  return (
    <>
      <SiteHeader />
      <div className="min-h-dvh bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground motion-safe:animate-page-in">
        <main className="pt-24">
          {/* Hero - matches landing hero-section */}
          <section
            id="overview"
            className="relative overflow-hidden border-b border-border pb-16 pt-24 md:pb-24 md:pt-32"
          >
            <AnimatedGrid />
            <div className="hero-top-fade pointer-events-none absolute inset-0 z-2" />

            <div className="container relative z-10 mx-auto px-6 text-center">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 shadow-sm motion-safe:animate-hero-in [animation-delay:80ms]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 motion-safe:animate-ping motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="text-xs font-medium tracking-wide text-foreground/80">
                  {p.hero.badge}
                </span>
              </div>

              <h1 className="mb-8 text-4xl font-medium leading-[0.95] tracking-tighter motion-safe:animate-hero-in [animation-delay:140ms] md:text-6xl lg:text-7xl">
                <span className="block text-foreground">{p.hero.headlineLine1}</span>
                <GlitchText phrases={p.hero.headlinePhrases} className="block text-primary" />
              </h1>

              <p className="mx-auto mb-10 max-w-2xl text-pretty text-base font-light leading-relaxed text-foreground/60 motion-safe:animate-hero-in [animation-delay:220ms] md:text-lg">
                {p.hero.subheadline}
              </p>

              <div className="flex flex-col items-center justify-center gap-4 motion-safe:animate-hero-in [animation-delay:300ms] sm:flex-row">
                <a
                  href={`mailto:${t.partner.email}`}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary/30 sm:w-auto"
                >
                  {p.hero.primaryCta}
                  <HugeiconsIcon icon={ArrowRightIcon} size={18} />
                </a>
                <a
                  href="#ways-to-help"
                  className="flex h-12 w-full items-center justify-center rounded-lg border border-border bg-transparent px-8 font-medium text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-accent/50 sm:w-auto"
                >
                  {p.hero.secondaryCta}
                </a>
              </div>

              <p className="mt-6 text-sm font-light text-muted-foreground motion-safe:animate-hero-in [animation-delay:380ms]">
                {p.hero.note}
              </p>
            </div>
          </section>

          <CommunityProofBentoSection id="community-proof-partners" />

          {/* What partnering means - matches why-section */}
          <section className="section-spacing border-y border-border/50 bg-muted/10">
            <div className="container mx-auto px-4">
              <SectionHeader
                eyebrow={p.whatMeans.eyebrow}
                title={p.whatMeans.title}
                description={
                  <>
                    {p.whatMeans.body1} {p.whatMeans.body2}
                  </>
                }
                align="center"
              />
              <ul className="mx-auto flex max-w-2xl flex-col gap-3">
                {p.whatMeans.principles.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <HugeiconsIcon
                      icon={Tick02Icon}
                      className="size-5 shrink-0 text-primary"
                    />
                    <span className="font-light text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Past partners - matches highlights-section */}
          <section className="section-spacing relative overflow-hidden border-y border-border/50 bg-muted/25">
            <div className="container mx-auto px-4">
              <SectionHeader
                eyebrow={p.pastPartners.eyebrow}
                title={p.pastPartners.title}
                description={p.pastPartners.body}
                align="left"
              />
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                {t.ecosystem.partners.map((partner) => {
                  const linkClassName =
                    "group flex items-center grayscale text-muted-foreground transition-all duration-300 hover:grayscale-0 hover:text-primary";

                  if (partner.name === "Cursor") {
                    return (
                      <a
                        key={partner.name}
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={partner.name}
                        className={linkClassName}
                      >
                        <img
                          src={CURSOR_PARTNER_IMG.light}
                          alt=""
                          aria-hidden
                          className={cn(
                            partnerRasterMarkClasses.base,
                            partnerRasterMarkClasses.cursorLight,
                          )}
                        />
                        <img
                          src={CURSOR_PARTNER_IMG.dark}
                          alt=""
                          aria-hidden
                          className={cn(
                            partnerRasterMarkClasses.base,
                            partnerRasterMarkClasses.cursorDark,
                          )}
                        />
                      </a>
                    );
                  }

                  if (partner.name === "v0") {
                    return (
                      <a
                        key={partner.name}
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={partner.name}
                        className={linkClassName}
                      >
                        <img
                          src={V0_PARTNER_IMG.light}
                          alt=""
                          aria-hidden
                          className={cn(
                            partnerRasterMarkClasses.base,
                            partnerRasterMarkClasses.v0Light,
                          )}
                        />
                        <img
                          src={V0_PARTNER_IMG.dark}
                          alt=""
                          aria-hidden
                          className={cn(
                            partnerRasterMarkClasses.base,
                            partnerRasterMarkClasses.v0Dark,
                          )}
                        />
                      </a>
                    );
                  }

                  const Icon = PARTNER_ICONS[partner.name];
                  return (
                    <a
                      key={partner.name}
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={partner.name}
                      className={linkClassName}
                    >
                      {
                        // Defensive: text-only partners not in PARTNER_ICONS
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- future partners may omit SVG marks
                        Icon ? (
                        <Icon
                          aria-hidden
                          className="size-10 opacity-80 transition-opacity group-hover:opacity-100 md:size-12"
                        />
                      ) : (
                        <span className="text-lg font-semibold opacity-80 transition-opacity group-hover:opacity-100 md:text-xl">
                          {partner.name}
                        </span>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Ways to help - matches what-happens-here card style */}
          <section
            id="ways-to-help"
            className="section-spacing border-y border-border/50 bg-muted/15"
          >
            <div className="container mx-auto px-4">
              <SectionHeader
                eyebrow={p.waysToHelp.eyebrow}
                title={p.waysToHelp.title}
                description={p.waysToHelp.intro}
                align="left"
              />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {p.waysToHelp.cards.map((card, index) => {
                  const Icon = WAYS_TO_HELP_ICONS[index % WAYS_TO_HELP_ICONS.length];
                  return (
                    <article
                      key={card.title}
                      className="group rounded-2xl border border-border/60 bg-card p-8 shadow-sm transition-[transform,border-color,box-shadow] duration-300 motion-safe:hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
                    >
                      <div className="mb-6 inline-flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                        <HugeiconsIcon icon={Icon} className="size-6" />
                      </div>
                      <h3 className="mb-4 text-xl font-semibold tracking-tight">
                        {card.title}
                      </h3>
                      <p className="text-pretty text-base font-light leading-relaxed text-muted-foreground">
                        {card.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* How it works */}
          <section className="section-spacing border-y border-border/50 bg-muted/10">
            <div className="container mx-auto px-4">
              <SectionHeader
                eyebrow={p.howItWorks.eyebrow}
                title={p.howItWorks.title}
                align="left"
              />
              <ol className="space-y-6 md:max-w-2xl">
                {p.howItWorks.steps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 font-mono text-sm font-medium text-primary">
                      {i + 1}
                    </span>
                    <span className="font-light leading-relaxed text-foreground/80">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* FAQ */}
          <section className="section-spacing border-y border-border/50 bg-muted/20">
            <div className="container mx-auto px-4">
              <SectionHeader
                eyebrow={p.faq.eyebrow}
                title={p.faq.title}
                align="left"
              />
              <dl className="space-y-8 md:max-w-2xl">
                {p.faq.items.map((item) => (
                  <div key={item.q}>
                    <dt className="mb-2 font-medium text-foreground">{item.q}</dt>
                    <dd className="font-light leading-relaxed text-muted-foreground">
                      {item.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* Final CTA - matches join-cta-section */}
          <section className="relative overflow-hidden border-y border-primary/20 bg-muted/30 py-20 md:py-28 dark:bg-muted/20">
            <div
              className="absolute inset-0 -z-10 animate-pulse-slow motion-reduce:animate-none bg-join-cta-gradient"
              aria-hidden
            />
            <div
              className="absolute inset-0 -z-10 bg-foreground/5 dark:bg-transparent"
              aria-hidden
            />

            <div className="container relative z-10 mx-auto px-4 text-center">
              <SectionHeader
                eyebrow={p.finalCta.badge}
                title={p.finalCta.title}
                description={p.finalCta.body}
                align="center"
                size="lg"
              />
              <a
                href={`mailto:${t.partner.email}`}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-10 text-lg font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary/40"
              >
                {p.finalCta.cta}
                <HugeiconsIcon icon={ArrowRightIcon} size={22} />
              </a>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}

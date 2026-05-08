import { createFileRoute } from '@tanstack/react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowUpRightIcon,
  ChampionIcon,
  Megaphone02Icon,
  PresentationOnlineIcon,
  StoreManagement01Icon,
  Tick02Icon,
  ToolsIcon,
  UserMultiple02Icon,
} from '@hugeicons/core-free-icons'
import { seoCopyEs } from '@/content/seo-copy'
import { strategyContent } from '@/content/strategy-content'
import { buildSeoMeta } from '@/lib/seo-meta'
import { useI18n } from '@/lib/i18n'
import { BOOKING_LINK } from '@/lib/links'
import { PartnerLogoStack } from '@/components/blocks/partner-logo-stack'
import { RevealOnScroll } from '@/components/reveal-on-scroll'
import { InnerPageHero } from '@/components/sections/inner-page-hero'
import { EditorialSplit } from '@/components/sections/editorial-split'
import { SectionHeader } from '@/components/section-header'
import { SiteHeader } from '@/components/site-header'
import { StrategyPathCardGrid } from '@/components/strategy-path-card-grid'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SiteFooter } from '@/components/site-footer'

const WAY_ICONS = [
  StoreManagement01Icon,
  ChampionIcon,
  PresentationOnlineIcon,
  ToolsIcon,
  UserMultiple02Icon,
  Megaphone02Icon,
] as const

export const Route = createFileRoute('/partners')({
  head: () => {
    const { meta, links } = buildSeoMeta({
      path: '/partners',
      title: seoCopyEs.partners.title,
      description: seoCopyEs.partners.description,
    })
    return { meta, links }
  },
  component: PartnersPage,
})

function PartnersPage() {
  const { t, language } = useI18n()
  const p = t.partnersPage
  const partnerPaths = strategyContent[language].partners.paths

  return (
    <>
      <SiteHeader />
      <div className="bg-background text-foreground selection:bg-primary selection:text-primary-foreground motion-safe:animate-page-in min-h-dvh overflow-x-hidden font-sans">
        <main>
          <InnerPageHero
            headlineLine1={p.hero.headlineLine1}
            headlinePhrases={p.hero.headlinePhrases}
            subheadline={p.hero.subheadline}
            note={p.hero.note}
            aside={
              <PartnerLogoStack
                partners={t.ecosystem.partners}
                caption={
                  language === 'es'
                    ? 'Equipos que han apoyado'
                    : 'Teams that have helped'
                }
                description={
                  language === 'es'
                    ? 'Herramientas, espacios y equipos que han acercado práctica real al ecosistema.'
                    : 'Tools, spaces, and teams that have brought real practice closer to the ecosystem.'
                }
              />
            }
            primaryAction={{
              label: p.hero.primaryCta,
              render: (
                <a
                  href={BOOKING_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
            }}
            secondaryAction={{
              label: p.hero.secondaryCta,
              render: <a href="#ways-to-help" />,
              variant: 'outline',
              showArrow: false,
            }}
          />

          <RevealOnScroll>
            <section className="section-panel py-20 md:py-28">
              <div className="container mx-auto px-4">
                <SectionHeader
                  eyebrow={partnerPaths.eyebrow}
                  title={partnerPaths.title}
                  description={partnerPaths.description}
                  align="left"
                />
                <StrategyPathCardGrid
                  items={partnerPaths.items}
                  columns="two"
                />
              </div>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section className="section-spacing border-border/50 border-y">
              <div className="container mx-auto max-w-3xl px-4">
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
                <ul className="mx-auto flex max-w-xl flex-col gap-3 text-left">
                  {p.whatMeans.principles.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <HugeiconsIcon
                        icon={Tick02Icon}
                        className="text-primary mt-0.5 size-5 shrink-0"
                      />
                      <span className="text-foreground/80 font-light leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <PartnerCreditsRoll
              partners={t.ecosystem.partners}
              language={language}
            />
          </RevealOnScroll>

          <RevealOnScroll>
            <EditorialSplit
              id="ways-to-help"
              eyebrow={p.waysToHelp.eyebrow}
              title={p.waysToHelp.title}
              body={<p>{p.waysToHelp.intro}</p>}
              surface="editorial"
              aside={
                <ul className="flex flex-col gap-1">
                  {p.waysToHelp.cards.map((card, index) => {
                    const Icon = WAY_ICONS[index % WAY_ICONS.length]
                    return (
                      <li
                        key={card.title}
                        className="border-border/40 group flex gap-4 border-b py-5 last:border-b-0"
                      >
                        <div className="bg-primary/8 text-primary mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-2xl">
                          <HugeiconsIcon icon={Icon} className="size-4" />
                        </div>
                        <div>
                          <h3 className="font-display text-foreground text-lg font-semibold tracking-tight">
                            {card.title}
                          </h3>
                          <p className="text-muted-foreground mt-1 text-sm leading-relaxed font-light">
                            {card.description}
                          </p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              }
            />
          </RevealOnScroll>

          <RevealOnScroll>
            <section className="section-spacing border-border/50 border-y">
              <div className="container mx-auto px-4">
                <SectionHeader
                  eyebrow={p.howItWorks.eyebrow}
                  title={p.howItWorks.title}
                  align="left"
                />
                <ol className="grid gap-3 md:grid-cols-3">
                  {p.howItWorks.steps.map((step, i) => (
                    <li
                      key={step}
                      className="quiet-card flex gap-4 p-6"
                    >
                      <span className="border-primary/20 bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full border font-mono text-sm font-medium">
                        {i + 1}
                      </span>
                      <span className="text-foreground/80 leading-relaxed font-light">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section className="section-panel py-20 md:py-28">
              <div className="container mx-auto px-4">
                <SectionHeader
                  eyebrow={p.faq.eyebrow}
                  title={p.faq.title}
                  align="left"
                />
                <Accordion className="grid gap-3 md:grid-cols-2">
                  {p.faq.items.map((item) => (
                    <AccordionItem
                      key={item.q}
                      className="quiet-card px-6"
                    >
                      <AccordionTrigger className="py-5 text-base">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5 text-sm leading-relaxed">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section className="section-contrast py-20 md:py-28">
              <div
                className="animate-pulse-slow bg-join-cta-gradient absolute inset-0 z-0 opacity-70 motion-reduce:animate-none"
                aria-hidden
              />
              <div
                className="dotted-field absolute inset-0 z-0 opacity-20"
                aria-hidden
              />

              <div className="relative z-10 container mx-auto px-4 text-center">
                <SectionHeader
                  eyebrow={p.finalCta.badge}
                  title={p.finalCta.title}
                  description={p.finalCta.body}
                  align="center"
                  size="lg"
                  className="[&_h2]:text-background [&_p:last-child]:text-background/70"
                />
                <Button
                  size="3xl"
                  className="bg-primary-foreground text-primary px-10 text-lg shadow-lg shadow-black/15 hover:shadow-black/25 dark:bg-primary dark:text-primary-foreground"
                  render={
                    <a
                      href={BOOKING_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  {p.finalCta.cta}
                  <HugeiconsIcon
                    icon={ArrowUpRightIcon}
                    size={22}
                    data-icon="inline-end"
                  />
                </Button>
              </div>
            </section>
          </RevealOnScroll>
        </main>
        <SiteFooter />
      </div>
    </>
  )
}

type Partner = { name: string; url: string }

/**
 * Per-partner role descriptors for the credits roll. Keys match the
 * canonical names in `t.ecosystem.partners`. New partners can be added
 * here; unmatched names render with no role line.
 */
const PARTNER_ROLES: Record<string, { es: string; en: string }> = {
  Cursor: {
    es: 'Cursor Ambassadors · Programa oficial · Desde 2025',
    en: 'Cursor Ambassadors · Official program · Since 2025',
  },
  Codex: {
    es: 'Codex Community Ambassadors · 2026',
    en: 'Codex Community Ambassadors · 2026',
  },
  v0: {
    es: 'v0 / Vercel · Herramientas, créditos, amigos del lab',
    en: 'v0 / Vercel · Tools, credits, friends of the lab',
  },
}

function PartnerCreditsRoll({
  partners,
  language,
}: {
  partners: Array<Partner>
  language: 'es' | 'en'
}) {
  const eyebrow = language === 'es' ? 'Quiénes' : 'Who'
  const headline =
    language === 'es'
      ? 'Detrás de la práctica.'
      : 'Behind the practice.'

  return (
    <section className="border-border/50 relative overflow-hidden border-y bg-muted/10 py-20 md:py-28">
      <div
        aria-hidden
        className="from-primary/15 pointer-events-none absolute -top-32 left-1/2 -z-0 h-96 w-[120%] -translate-x-1/2 rounded-full bg-gradient-to-b to-transparent blur-3xl"
      />
      <div className="relative z-10 container mx-auto max-w-5xl px-4">
        <div className="mb-12 flex items-baseline justify-between gap-6">
          <p className="eyebrow-label text-primary">{eyebrow}</p>
          <h2 className="font-display text-foreground/80 text-base font-medium tracking-[-0.02em] md:text-lg">
            {headline}
          </h2>
        </div>
        <ul className="divide-border/40 divide-y">
          {partners.map((partner) => {
            const roleText =
              partner.name in PARTNER_ROLES
                ? PARTNER_ROLES[partner.name][language]
                : null
            return (
              <li key={partner.name} className="group">
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid grid-cols-1 items-baseline gap-1 py-7 md:grid-cols-[1fr_auto] md:gap-12 md:py-10"
                >
                  <span className="font-display text-foreground/80 group-hover:text-foreground block text-4xl leading-none font-medium tracking-[-0.04em] uppercase transition-all duration-500 ease-out group-hover:translate-x-1 motion-reduce:transform-none md:text-6xl lg:text-7xl">
                    {partner.name}
                  </span>
                  {roleText ? (
                    <span className="text-muted-foreground/70 group-hover:text-muted-foreground text-xs leading-relaxed font-medium tracking-[0.16em] uppercase transition-colors duration-500 md:text-right">
                      {roleText}
                    </span>
                  ) : null}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}


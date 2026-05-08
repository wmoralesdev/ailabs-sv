import { createFileRoute } from '@tanstack/react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  FlashIcon,
  Presentation01Icon,
  Wrench01Icon,
} from '@hugeicons/core-free-icons'
import { seoCopyEs } from '@/content/seo-copy'
import { strategyContent } from '@/content/strategy-content'
import { buildSeoMeta } from '@/lib/seo-meta'
import { useI18n } from '@/lib/i18n'
import { BOOKING_LINK, bookingWithIntent } from '@/lib/links'
import { cn } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { InnerPageHero } from '@/components/sections/inner-page-hero'
import { OfferCard } from '@/components/blocks/offer-card'
import { SectionHeader } from '@/components/section-header'
import { RevealOnScroll } from '@/components/reveal-on-scroll'
import { PartnerLogoRow } from '@/components/partner-logo-row'
import { StrategyLink } from '@/components/strategy-link'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const CARD_ICONS = [FlashIcon, Wrench01Icon, Presentation01Icon]

function WorkPathAside({
  steps,
}: {
  steps: Array<{ title: string; description: string }>
}) {
  return (
    <aside className="motion-safe:animate-hero-in hidden p-5 [animation-delay:220ms] md:block">
      <p className="eyebrow-label text-primary mb-6">Cómo se mueve</p>
      <ol className="border-primary/15 relative ml-4 border-l">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="relative pb-6 pl-6 last:pb-0"
          >
            <span
              aria-hidden
              className="border-primary/30 bg-background absolute -left-[0.55rem] top-0 flex size-[1.1rem] items-center justify-center rounded-full border-2"
            >
              <span className="bg-primary size-1.5 rounded-full" />
            </span>
            <div className="mb-1 flex items-baseline gap-3">
              <span className="text-primary font-mono text-[0.65rem] font-semibold tracking-[0.18em] tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h2 className="font-display text-lg leading-tight font-semibold">
                {step.title}
              </h2>
            </div>
            <p className="text-muted-foreground/85 text-sm leading-relaxed">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </aside>
  )
}

export const Route = createFileRoute('/work-with-us')({
  head: () => {
    const { meta, links } = buildSeoMeta({
      path: '/work-with-us',
      title: seoCopyEs.workWithUs.title,
      description: seoCopyEs.workWithUs.description,
    })
    return { meta, links }
  },
  component: WorkWithUsPage,
})

const FEATURED_OFFER_LIMIT = 2

function WorkWithUsPage() {
  const { t, language } = useI18n()
  const page = strategyContent[language].workWithUs
  const heroBookingHref = bookingWithIntent(page.finalCta.title)
  const featuredOffers = page.offers.items.slice(0, FEATURED_OFFER_LIMIT)
  const moreOffers = page.offers.items.slice(FEATURED_OFFER_LIMIT)
  const moreOffersLabel =
    language === 'es' ? 'Otros formatos' : 'Other formats'
  const featuredEyebrow =
    language === 'es' ? 'Destacados' : 'Featured'

  return (
    <>
      <SiteHeader />
      <div className="bg-background text-foreground selection:bg-primary selection:text-primary-foreground motion-safe:animate-page-in min-h-dvh overflow-x-hidden font-sans">
        <main>
          <InnerPageHero
            badge={page.hero.badge}
            headlineLine1={page.hero.headlineLine1}
            headlinePhrases={page.hero.headlinePhrases}
            subheadline={page.hero.subheadline}
            note={page.hero.note}
            aside={<WorkPathAside steps={page.process.steps} />}
            primaryAction={{
              label: page.hero.primaryCta,
              render: (
                <a
                  href={heroBookingHref}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
            }}
            secondaryAction={{
              label: page.hero.secondaryCta,
              render: <a href="#offers" />,
              variant: 'outline',
              showArrow: false,
            }}
          />

          <RevealOnScroll>
            <section className="section-panel py-20 md:py-28">
              <div className="container mx-auto px-4">
                <SectionHeader
                  eyebrow={page.who.eyebrow}
                  title={page.who.title}
                  description={page.who.description}
                  align="left"
                />
                <div className="grid gap-4 md:grid-cols-3">
                  {page.who.items.map((item, index) => {
                    const Icon = CARD_ICONS[index % CARD_ICONS.length]
                    return (
                      <article
                        key={item.title}
                        className="surface-card group relative overflow-hidden p-7"
                      >
                        <div className="bg-primary/10 pointer-events-none absolute -top-16 -right-12 size-36 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="border-primary/20 bg-primary/10 text-primary relative z-10 mb-6 inline-flex size-12 items-center justify-center rounded-2xl border">
                          <HugeiconsIcon icon={Icon} className="size-6" />
                        </div>
                        <h3 className="font-display relative z-10 mb-4 text-2xl font-semibold tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground relative z-10 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </article>
                    )
                  })}
                </div>
              </div>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section id="offers" className="section-editorial py-20 md:py-28">
              <div className="container mx-auto px-4">
                <SectionHeader
                  eyebrow={page.offers.eyebrow}
                  title={page.offers.title}
                  description={page.offers.description}
                  align="left"
                />
                {featuredOffers.length > 0 ? (
                  <div className="mb-6">
                    <p className="eyebrow-label text-primary mb-4">
                      {featuredEyebrow}
                    </p>
                    <div className="grid auto-rows-fr gap-4 md:grid-cols-2">
                      {featuredOffers.map((offer, index) => (
                        <OfferCard
                          key={offer.title}
                          index={index}
                          title={offer.title}
                          description={offer.description}
                          outcome={offer.outcome}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}

                {moreOffers.length > 0 ? (
                  <div className="mt-10">
                    <p className="eyebrow-label text-foreground/55 mb-4">
                      {moreOffersLabel}
                    </p>
                    <ul className="border-border/60 divide-border/60 quiet-card divide-y">
                      {moreOffers.map((offer, index) => (
                        <li
                          key={offer.title}
                          className="grid gap-2 px-5 py-5 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-6"
                        >
                          <span className="text-primary font-mono text-xs font-semibold tracking-[0.18em] tabular-nums">
                            {String(FEATURED_OFFER_LIMIT + index + 1).padStart(
                              2,
                              '0',
                            )}
                          </span>
                          <div>
                            <h3 className="font-display text-foreground text-lg font-semibold tracking-tight">
                              {offer.title}
                            </h3>
                            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                              {offer.description}
                            </p>
                          </div>
                          <p className="text-foreground/80 text-sm leading-relaxed md:max-w-xs md:text-right">
                            {offer.outcome}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section className="border-border/50 relative overflow-hidden border-y bg-muted/10 py-24 md:py-32">
              <div
                aria-hidden
                className="from-primary/15 pointer-events-none absolute -bottom-32 right-0 -z-0 h-96 w-[60%] rounded-full bg-gradient-to-tr to-transparent blur-3xl"
              />
              <div className="relative z-10 container mx-auto max-w-5xl px-4">
                <p className="eyebrow-label text-primary mb-8">
                  {page.outcomes.eyebrow}
                </p>
                <h2 className="text-display-quote text-foreground">
                  {page.outcomes.title}
                </h2>
                <div
                  aria-hidden
                  className="from-primary/40 my-10 h-px w-24 bg-gradient-to-r to-transparent"
                />
                <ol className="border-border/40 divide-border/40 mx-auto max-w-3xl divide-y border-y">
                  {page.outcomes.items.map((item, index) => (
                    <li
                      key={item}
                      className="grid grid-cols-[auto_1fr] items-baseline gap-5 py-5 md:gap-7 md:py-6"
                    >
                      <span className="text-primary font-mono text-xs font-semibold tracking-[0.18em] tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-foreground/85 text-base leading-relaxed font-light text-pretty md:text-lg">
                        {item}
                      </span>
                    </li>
                  ))}
                </ol>
                <div className="mt-12">
                  <PartnerLogoRow
                    partners={t.ecosystem.partners}
                    showSvgMarks
                  />
                </div>
              </div>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section className="section-panel py-20 md:py-28">
              <div className="container mx-auto px-4">
                <SectionHeader
                  eyebrow={page.faq.eyebrow}
                  title={page.faq.title}
                  align="left"
                />
                <Accordion className="grid gap-3 md:grid-cols-2">
                  {page.faq.items.map((item) => (
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
                className="bg-join-cta-gradient motion-safe:animate-pulse-slow absolute inset-0 z-0 opacity-70 motion-reduce:animate-none"
                aria-hidden
              />
              <div className="relative z-10 container mx-auto px-4 text-center">
                <SectionHeader
                  eyebrow={page.finalCta.eyebrow}
                  title={page.finalCta.title}
                  description={page.finalCta.body}
                  align="center"
                  size="lg"
                  className="[&_h2]:text-background [&_p:last-child]:text-background/70"
                />
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button
                    size="3xl"
                    className="bg-primary-foreground text-primary dark:bg-primary dark:text-primary-foreground"
                    render={
                      <a
                        href={BOOKING_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                  >
                    {page.finalCta.primaryCta}
                    <HugeiconsIcon
                      icon={ArrowUpRightIcon}
                      className="size-5"
                      data-icon="inline-end"
                    />
                  </Button>
                  <StrategyLink
                    href="/events"
                    className={cn(
                      buttonVariants({ variant: 'outline', size: '3xl' }),
                      'border-background/30 bg-background/10 text-background hover:bg-background/20 dark:text-foreground',
                    )}
                  >
                    {page.finalCta.secondaryCta}
                    <HugeiconsIcon
                      icon={ArrowRightIcon}
                      className="size-5"
                      data-icon="inline-end"
                    />
                  </StrategyLink>
                </div>
              </div>
            </section>
          </RevealOnScroll>
        </main>
        <SiteFooter />
      </div>
    </>
  )
}

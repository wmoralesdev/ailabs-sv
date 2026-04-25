import { createFileRoute } from '@tanstack/react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowRightIcon,
  FlashIcon,
  Presentation01Icon,
  Tick02Icon,
  Wrench01Icon,
} from '@hugeicons/core-free-icons'
import { seoCopyEs } from '@/content/seo-copy'
import { buildSeoMeta } from '@/lib/seo-meta'
import { useI18n } from '@/lib/i18n'
import { PartnerLogoRow } from '@/components/partner-logo-row'
import { RevealOnScroll } from '@/components/reveal-on-scroll'
import { CommunityProofBentoSection } from '@/components/sections/community-proof-bento-section'
import { InnerPageHero } from '@/components/sections/inner-page-hero'
import { SectionHeader } from '@/components/section-header'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { SiteFooter } from '@/components/site-footer'

const WAYS_TO_HELP_ICONS = [FlashIcon, Wrench01Icon, Presentation01Icon]

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
  const { t } = useI18n()
  const p = t.partnersPage

  return (
    <>
      <SiteHeader />
      <div className="bg-background text-foreground selection:bg-primary selection:text-primary-foreground motion-safe:animate-page-in min-h-dvh overflow-x-hidden font-sans">
        <main>
          <InnerPageHero
            badge={p.hero.badge}
            headlineLine1={p.hero.headlineLine1}
            headlinePhrases={p.hero.headlinePhrases}
            subheadline={p.hero.subheadline}
            note={p.hero.note}
            proofCard={{
              eyebrow: p.hero.proofCardEyebrow,
              title: p.hero.proofCardTitle,
              items: p.waysToHelp.cards.slice(0, 4).map((card, index) => ({
                value: `0${index + 1}`,
                label: card.title,
              })),
            }}
            primaryAction={{
              label: p.hero.primaryCta,
              render: <a href={`mailto:${t.partner.email}`} />,
            }}
            secondaryAction={{
              label: p.hero.secondaryCta,
              render: <a href="#ways-to-help" />,
              variant: 'outline',
              showArrow: false,
            }}
          />

          <RevealOnScroll>
            <CommunityProofBentoSection id="community-proof-partners" />
          </RevealOnScroll>

          <RevealOnScroll>
            <section className="section-panel py-20 md:py-28">
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
                <ul className="editorial-card mx-auto flex max-w-2xl flex-col gap-3 rounded-[1.75rem] p-6 text-left sm:p-8">
                  {p.whatMeans.principles.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <HugeiconsIcon
                        icon={Tick02Icon}
                        className="text-primary size-5 shrink-0"
                      />
                      <span className="text-foreground/80 font-light">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section className="section-spacing border-border/50 relative overflow-hidden border-y">
              <div className="container mx-auto px-4">
                <div className="flex flex-col items-center gap-8 text-center">
                  <SectionHeader
                    eyebrow={p.pastPartners.eyebrow}
                    title={p.pastPartners.title}
                    description={p.pastPartners.body}
                    align="center"
                    className="mb-0"
                  />
                  <PartnerLogoRow
                    partners={t.ecosystem.partners}
                    showSvgMarks
                  />
                </div>
              </div>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section id="ways-to-help" className="section-panel py-20 md:py-28">
              <div className="container mx-auto px-4">
                <SectionHeader
                  eyebrow={p.waysToHelp.eyebrow}
                  title={p.waysToHelp.title}
                  description={p.waysToHelp.intro}
                  align="left"
                />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {p.waysToHelp.cards.map((card, index) => {
                    const Icon =
                      WAYS_TO_HELP_ICONS[index % WAYS_TO_HELP_ICONS.length]
                    return (
                      <article
                        key={card.title}
                        className="group editorial-card interactive-lift relative overflow-hidden rounded-[1.75rem] p-7"
                      >
                        <div className="bg-primary/10 pointer-events-none absolute -top-12 -right-10 size-36 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="border-primary/20 bg-primary/10 text-primary relative z-10 mb-6 inline-flex size-12 items-center justify-center rounded-2xl border">
                          <HugeiconsIcon icon={Icon} className="size-6" />
                        </div>
                        <h3 className="font-display relative z-10 mb-4 text-2xl font-semibold tracking-tight">
                          {card.title}
                        </h3>
                        <p className="text-muted-foreground relative z-10 text-base leading-relaxed font-light text-pretty">
                          {card.description}
                        </p>
                      </article>
                    )
                  })}
                </div>
              </div>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section className="section-spacing border-border/50 border-y">
              <div className="container mx-auto px-4">
                <SectionHeader
                  eyebrow={p.howItWorks.eyebrow}
                  title={p.howItWorks.title}
                  align="left"
                />
                <ol className="grid gap-4 md:grid-cols-3">
                  {p.howItWorks.steps.map((step, i) => (
                    <li
                      key={step}
                      className="editorial-card interactive-lift flex gap-4 rounded-[1.5rem] p-6"
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
                <dl className="grid gap-4 md:grid-cols-2">
                  {p.faq.items.map((item) => (
                    <div
                      key={item.q}
                      className="editorial-card rounded-[1.5rem] p-6"
                    >
                      <dt className="text-foreground mb-2 font-medium">
                        {item.q}
                      </dt>
                      <dd className="text-muted-foreground leading-relaxed font-light">
                        {item.a}
                      </dd>
                    </div>
                  ))}
                </dl>
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
                  className="bg-primary-foreground text-primary dark:bg-primary dark:text-primary-foreground rounded-full px-10 text-lg shadow-lg shadow-black/15 hover:shadow-black/25"
                  render={<a href={`mailto:${t.partner.email}`} />}
                >
                  {p.finalCta.cta}
                  <HugeiconsIcon
                    icon={ArrowRightIcon}
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

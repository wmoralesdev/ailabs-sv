import { createFileRoute } from '@tanstack/react-router'
import { seoCopyEs } from '@/content/seo-copy'
import { buildHomeJsonLd, buildSeoMeta } from '@/lib/seo-meta'
import { useI18n } from '@/lib/i18n'
import { CloserSection } from '@/components/sections/closer-section'
import { CredibilityBand } from '@/components/sections/credibility-band'
import { EventsSection } from '@/components/sections/events-section'
import { FounderSection } from '@/components/sections/founder-section'
import { HeroSection } from '@/components/sections/hero-section'
import { ShowcaseTeaserSection } from '@/components/sections/showcase-teaser-section'
import { VoicesSection } from '@/components/sections/voices-section'
import { RevealOnScroll } from '@/components/reveal-on-scroll'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { CursorLight } from '@/components/ui/svgs/cursor-light'
import { Openai } from '@/components/ui/svgs/openai'

export const Route = createFileRoute('/')({
  head: () => {
    const { meta, links } = buildSeoMeta({
      path: '/',
      title: seoCopyEs.home.title,
      description: seoCopyEs.home.description,
    })
    return {
      meta: [...meta, { 'script:ld+json': buildHomeJsonLd() }],
      links,
    }
  },
  component: Index,
})

function Index() {
  return (
    <>
      <SiteHeader />
      <div className="bg-background text-foreground selection:bg-primary selection:text-primary-foreground motion-safe:animate-page-in min-h-dvh overflow-x-hidden font-sans">
        <main>
          <HeroSection />
          <CredibilitySection />
          <RevealOnScroll>
            <WhySection />
          </RevealOnScroll>
          <RevealOnScroll>
            <ShowcaseTeaserSection />
          </RevealOnScroll>
          <RevealOnScroll>
            <EventsSection />
          </RevealOnScroll>
          <RevealOnScroll>
            <VoicesSection />
          </RevealOnScroll>
          <RevealOnScroll>
            <FounderSection />
          </RevealOnScroll>
          <RevealOnScroll>
            <CloserSection />
          </RevealOnScroll>
        </main>

        <SiteFooter />
      </div>
    </>
  )
}

function CredibilitySection() {
  const { language } = useI18n()
  return (
    <CredibilityBand
      items={[
        {
          label: 'Cursor Ambassadors',
          mark: <CursorLight className="size-3.5" />,
          href: 'https://cursor.com/community/ambassadors',
        },
        {
          label: 'Codex Community Ambassadors',
          mark: <Openai className="size-4" />,
          href: 'https://openai.com/codex',
        },
        {
          label:
            language === 'es' ? 'Entrenamos equipos' : 'We train teams',
          href: '/work-with-us',
        },
        {
          label:
            language === 'es'
              ? 'Trabajamos con universidades'
              : 'We partner with universities',
          href: '/work-with-us',
        },
      ]}
    />
  )
}

function WhySection() {
  const { t, language } = useI18n()
  return (
    <section className="section-editorial py-24 md:py-32">
      <div className="container mx-auto max-w-5xl px-4">
        <p className="eyebrow-label text-primary mb-8">
          {language === 'es' ? 'Criterio' : 'Judgment'}
        </p>
        <h2 className="text-display-quote text-foreground">
          {t.why.heading}
        </h2>
        <div
          aria-hidden
          className="from-primary/40 my-10 h-px w-24 bg-gradient-to-r to-transparent"
        />
        <p className="text-body-lead text-muted-foreground max-w-2xl font-light">
          {t.why.subtext}
        </p>
      </div>
    </section>
  )
}

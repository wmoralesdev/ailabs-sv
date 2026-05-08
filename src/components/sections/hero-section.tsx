import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CalendarIcon,
  MapPinIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from 'convex/_generated/api'
import { SocialLinks } from '@/components/social-links'
import { AnimatedGrid } from '@/components/ui/animated-grid'
import { Button } from '@/components/ui/button'
import { useGsapHeroIntro } from '@/hooks/use-gsap-hero-intro'
import { useI18n } from '@/lib/i18n'
import { WHATSAPP_LINK } from '@/lib/links'
import { formatWithBrandText } from '@/components/brand-text'

export function HeroSection() {
  const { t, language } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)
  useGsapHeroIntro(sectionRef)
  const [now] = useState(() => Date.now())
  const events = useQuery(api.events.listForHomepage, {
    language,
    now,
    upcomingLimit: 1,
    pastLimit: 0,
  })
  const nextEvent = events?.upcoming[0]

  return (
    <section
      ref={sectionRef}
      id="overview"
      className="border-border relative flex min-h-dvh items-center overflow-hidden border-b pt-28 pb-14 md:pt-28 md:pb-16"
    >
      <AnimatedGrid className="opacity-70" />
      <div className="hero-radial-field pointer-events-none absolute inset-0 opacity-80" />
      <div className="hero-top-fade pointer-events-none absolute inset-0 z-2" />
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t to-transparent" />

      <div className="relative z-10 container mx-auto grid items-center gap-8 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.58fr)] lg:gap-12">
        <div className="max-w-3xl text-left">
          <div
            data-hero-intro
            className="border-primary/25 bg-primary/10 mb-7 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 shadow-sm backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="bg-primary absolute inline-flex h-full w-full rounded-full opacity-75 motion-safe:animate-ping motion-reduce:animate-none" />
              <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
            </span>
            <span className="eyebrow-label text-foreground/80">
              {t.ui.hero.badgeLabel}
            </span>
          </div>

          <h1 data-hero-intro className="text-display-hero mb-7 font-medium">
            <span className="text-foreground block max-w-4xl">
              {t.hero.headlineLine1}
            </span>
            <span className="text-primary block">
              {t.hero.headlinePhrases[0]}
            </span>
          </h1>

          <p
            data-hero-intro
            className="text-body-lead text-foreground/65 mb-8 max-w-2xl font-light text-pretty"
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
              className="w-full px-6 sm:w-auto"
              render={
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              {language === 'es' ? 'Únete al WhatsApp' : 'Join WhatsApp'}
              <HugeiconsIcon
                icon={ArrowRightIcon}
                size={18}
                data-icon="inline-end"
              />
            </Button>
            <Button
              variant="outline"
              size="2xl"
              className="border-border/70 bg-background/65 w-full px-6 backdrop-blur sm:w-auto"
              render={<Link to="/events" />}
            >
              {t.hero.secondaryCta}
            </Button>
          </div>

          <div
            data-hero-intro
            className="mt-10 flex flex-col items-start gap-3"
          >
            <p className="eyebrow-label text-foreground/45">
              {t.ui.hero.followLabel}
            </p>
            <SocialLinks socials={t.site.socials} variant="minimal" />
          </div>
        </div>

        <NextEventAside
          event={nextEvent ?? null}
          loading={events === undefined}
          rsvpLabel={t.events.rsvpButton}
          eyebrow={language === 'es' ? 'Próximo evento' : 'Next event'}
          empty={
            language === 'es'
              ? 'Estamos preparando el próximo lab. Anota la lista de eventos.'
              : 'A new lab is in the works. Check the events page.'
          }
        />
      </div>
    </section>
  )
}

function NextEventAside({
  event,
  loading,
  rsvpLabel,
  eyebrow,
  empty,
}: {
  event:
    | {
        slug: string
        title: string
        date: string
        location: string
        rsvpUrl: string
      }
    | null
  loading: boolean
  rsvpLabel: string
  eyebrow: string
  empty: string
}) {
  return (
    <aside
      data-hero-orbit
      className="surface-card hidden p-6 backdrop-blur md:block"
    >
      <p className="eyebrow-label text-primary mb-3">{eyebrow}</p>

      {loading ? (
        <div className="flex flex-col gap-3">
          <div className="bg-muted/60 h-6 w-3/4 animate-pulse rounded" />
          <div className="bg-muted/40 h-4 w-1/2 animate-pulse rounded" />
          <div className="bg-muted/40 h-4 w-2/3 animate-pulse rounded" />
        </div>
      ) : !event ? (
        <p className="text-muted-foreground text-sm leading-relaxed">{empty}</p>
      ) : (
        <div className="flex flex-col gap-4">
          <Link
            to="/events/$param"
            params={{ param: event.slug }}
            className="group block"
          >
            <h2 className="font-display text-foreground group-hover:text-primary text-2xl leading-tight font-semibold tracking-[-0.03em] transition-colors">
              {formatWithBrandText(event.title)}
            </h2>
          </Link>
          <ul className="text-muted-foreground flex flex-col gap-1.5 text-sm">
            <li className="flex items-center gap-2">
              <HugeiconsIcon
                icon={CalendarIcon}
                className="text-primary size-4 shrink-0"
              />
              <span>{event.date}</span>
            </li>
            {event.location ? (
              <li className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={MapPinIcon}
                  className="text-primary size-4 shrink-0"
                />
                <span className="truncate">{event.location}</span>
              </li>
            ) : null}
          </ul>
          {event.rsvpUrl ? (
            <Button
              size="lg"
              className="mt-2 self-start"
              render={
                <a
                  href={event.rsvpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              {rsvpLabel}
              <HugeiconsIcon
                icon={ArrowUpRightIcon}
                size={16}
                data-icon="inline-end"
              />
            </Button>
          ) : null}
        </div>
      )}
    </aside>
  )
}

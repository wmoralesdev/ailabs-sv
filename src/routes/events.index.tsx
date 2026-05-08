import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useQuery } from 'convex/react'
import { api } from 'convex/_generated/api'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowRightIcon,
  Building03Icon,
  CalendarIcon,
  CodeIcon,
  FlashIcon,
  Image01Icon,
  PencilEdit02Icon,
  Presentation01Icon,
  TaskAdd01Icon,
  Wrench01Icon,
} from '@hugeicons/core-free-icons'
import type { ComponentType } from 'react'
import { seoCopyEs } from '@/content/seo-copy'
import { strategyContent } from '@/content/strategy-content'
import { buildSeoMeta } from '@/lib/seo-meta'
import { useI18n } from '@/lib/i18n'
import { mailtoWithSubject } from '@/lib/links'
import { cn } from '@/lib/utils'
import { formatWithBrandText } from '@/components/brand-text'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { InnerPageHero } from '@/components/sections/inner-page-hero'
import { UpcomingEventsCarousel } from '@/components/sections/upcoming-events-carousel'
import { MonthArchiveChipStrip } from '@/components/blocks/month-archive-chip-strip'
import { SectionHeader } from '@/components/section-header'
import { RevealOnScroll } from '@/components/reveal-on-scroll'
import { StrategyLink } from '@/components/strategy-link'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

/**
 * Explicit icon map for event types. Keys match the `title` strings in
 * strategyContent.eventsPage.types.items in either language. Replaces the
 * old cycling array that put a lightning bolt next to "Workshops".
 */
const EVENT_TYPE_ICON_MAP: Record<
  string,
  ComponentType<{ className?: string }>
> = {
  Workshops: CodeIcon as never,
  Hackathons: Wrench01Icon as never,
  'Demo Days': Presentation01Icon as never,
  'Campus Labs': Building03Icon as never,
}

function eventTypeIcon(title: string) {
  return (EVENT_TYPE_ICON_MAP[title] ?? CalendarIcon) as never
}

// Suppress unused import warnings for icons reserved for future event-type
// additions. These stay imported to avoid churn when new types are added.
void [FlashIcon, PencilEdit02Icon, TaskAdd01Icon]

type PastEvent = {
  id: string
  slug: string
  title: string
  imageUrl: string | null
  date: string
  type: string
  partner?: string | null
  isVirtual: boolean
  recapUrl?: string | null
  photoAlbumUrl?: string | null
}

export const Route = createFileRoute('/events/')({
  head: () => {
    const { meta, links } = buildSeoMeta({
      path: '/events',
      title: seoCopyEs.events.title,
      description: seoCopyEs.events.description,
    })
    return { meta, links }
  },
  component: EventsPage,
})

/**
 * Date-led timeline row for the past events archive. Replaces the previous
 * 3-column card grid: a large mono date anchors the left, a thumb image and
 * title sit in the center, badges + meta + links flow on the right. The
 * archive becomes a vertical reading column instead of a card grid, which
 * fits the editorial typography moment for /events called out in the plan.
 */
function PastEventTimelineRow({
  event,
  labels,
  index = 0,
}: {
  event: PastEvent
  labels: { detail: string; recap: string; album: string }
  index?: number
}) {
  const { day, monthLine, year } = splitEventDate(event.date)
  // Cap stagger so the 24th row doesn't wait 1.4s. After 6 rows the delay
  // freezes and every subsequent row animates with the same offset.
  const delayMs = Math.min(index, 6) * 70

  return (
    <li
      className="border-border/50 group relative grid grid-cols-1 gap-5 border-b py-8 last:border-b-0 motion-safe:animate-reveal-up md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-10 md:py-10"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="md:sticky md:top-28 md:self-start">
        <p className="text-foreground/85 font-display text-3xl leading-none font-medium tracking-[-0.04em] tabular-nums md:text-4xl">
          {day ?? event.date}
        </p>
        {monthLine ? (
          <p className="eyebrow-label text-primary mt-2">{monthLine}</p>
        ) : null}
        {year ? (
          <p className="text-muted-foreground/80 mt-1 text-xs font-medium tracking-[0.14em] tabular-nums">
            {year}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
        <Link
          to="/events/$param"
          params={{ param: event.slug }}
          className="bg-muted relative block aspect-[4/3] w-full overflow-hidden rounded-2xl md:w-48 md:shrink-0"
        >
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="size-full object-cover grayscale transition duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
            />
          ) : (
            <div className="text-muted-foreground flex size-full items-center justify-center">
              <HugeiconsIcon icon={Image01Icon} className="size-8" />
            </div>
          )}
        </Link>

        <div className="flex flex-1 flex-col gap-3">
          <Link
            to="/events/$param"
            params={{ param: event.slug }}
            className="block"
          >
            <h3 className="font-display text-foreground group-hover:text-primary text-2xl leading-tight font-medium tracking-[-0.02em] transition-colors md:text-3xl">
              {formatWithBrandText(event.title)}
            </h3>
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            {event.type ? (
              <Badge variant="outline" className="rounded-full">
                {event.type}
              </Badge>
            ) : null}
            {event.partner ? (
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary rounded-full"
              >
                {event.partner}
              </Badge>
            ) : null}
          </div>
          <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
            <Link
              to="/events/$param"
              params={{ param: event.slug }}
              className="text-primary inline-flex items-center gap-1 font-medium hover:underline"
            >
              {labels.detail}
              <HugeiconsIcon icon={ArrowRightIcon} className="size-3.5" />
            </Link>
            {event.recapUrl ? (
              <a
                href={event.recapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                {labels.recap}
              </a>
            ) : null}
            {event.photoAlbumUrl ? (
              <a
                href={event.photoAlbumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                {labels.album}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  )
}

/**
 * Best-effort split of `event.date` (which is already a humanized string from
 * Convex like "16 feb 2026" or "31 ene 2026") into `day`, `monthLine` (small
 * caps month), and `year`. Falls back to rendering the raw date if the format
 * doesn't match.
 */
function splitEventDate(raw: string): {
  day: string | null
  monthLine: string | null
  year: string | null
} {
  const match = /^(\d{1,2})\s+([\p{L}.]+)\s+(\d{4})/u.exec(raw.trim())
  if (!match) return { day: null, monthLine: null, year: null }
  return {
    day: match[1],
    monthLine: match[2].replace(/\.$/, '').toUpperCase(),
    year: match[3],
  }
}

function EventsPage() {
  const { t, language } = useI18n()
  const [now] = useState(() => Date.now())
  const page = strategyContent[language].eventsPage
  const result = useQuery(api.events.listForHomepage, {
    language,
    now,
    upcomingLimit: 20,
    pastLimit: 24,
  })
  const months = useQuery(api.events.listMonthsWithEvents, { language })
  const heroEvent = result?.upcoming[0] ?? result?.past[0] ?? null

  return (
    <>
      <SiteHeader />
      <div className="bg-background text-foreground selection:bg-primary selection:text-primary-foreground motion-safe:animate-page-in min-h-dvh overflow-x-hidden font-sans">
        <main>
          <InnerPageHero
            headlineLine1={page.hero.headlineLine1}
            headlinePhrases={page.hero.headlinePhrases}
            subheadline={page.hero.subheadline}
            aside={
              heroEvent ? (
                <EventsHeroAside
                  event={heroEvent}
                  label={
                    result?.upcoming[0]
                      ? language === 'es'
                        ? 'Próximo evento'
                        : 'Next event'
                      : language === 'es'
                        ? 'Recap reciente'
                        : 'Recent recap'
                  }
                  cta={
                    result?.upcoming[0]
                      ? t.events.rsvpButton
                      : page.detail.recap
                  }
                />
              ) : undefined
            }
            primaryAction={{
              label: page.hero.primaryCta,
              render: <a href="#upcoming" />,
            }}
            secondaryAction={{
              label: page.hero.secondaryCta,
              render: (
                <a href={mailtoWithSubject('Host an Ai Labs event')} />
              ),
              variant: 'outline',
            }}
          />

          <RevealOnScroll>
            <section id="upcoming" className="section-editorial py-20 md:py-28">
              <div className="container mx-auto px-4">
                <SectionHeader
                  eyebrow={t.events.badge}
                  title={t.events.upcomingTitle}
                  description={t.events.tagline}
                  align="left"
                />
                {result === undefined ? (
                  <div className="flex min-h-[240px] items-center justify-center">
                    <Spinner size="lg" />
                  </div>
                ) : result.upcoming.length > 0 ? (
                  <UpcomingEventsCarousel events={result.upcoming} t={t} />
                ) : (
                  <div className="border-border bg-card/40 text-muted-foreground rounded-2xl border border-dashed p-10 text-center">
                    {t.events.noUpcoming}
                  </div>
                )}
              </div>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section className="section-panel py-20 md:py-28">
              <div className="container mx-auto px-4">
                <SectionHeader
                  eyebrow={page.types.eyebrow}
                  title={page.types.title}
                  description={page.types.description}
                  align="left"
                />
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {page.types.items.map((item) => {
                    const Icon = eventTypeIcon(item.title)
                    return (
                      <article
                        key={item.title}
                        className="surface-card group relative overflow-hidden p-6"
                      >
                        <div className="border-primary/20 bg-primary/10 text-primary relative z-10 mb-6 inline-flex size-12 items-center justify-center rounded-2xl border">
                          <HugeiconsIcon icon={Icon} className="size-6" />
                        </div>
                        <h3 className="font-display relative z-10 mb-4 text-2xl font-semibold">
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
            <section className="border-border/60 relative overflow-hidden border-t bg-muted/10 py-20 md:py-28">
              <div
                aria-hidden
                className="dotted-field pointer-events-none absolute inset-0 -z-0 opacity-30"
              />
              <div
                aria-hidden
                className="from-primary/8 pointer-events-none absolute -top-32 left-[10%] -z-0 h-96 w-96 rounded-full bg-gradient-to-br to-transparent blur-3xl"
              />
              <div className="relative z-10 container mx-auto px-4">
                <SectionHeader
                  eyebrow={page.archive.eyebrow}
                  title={page.archive.title}
                  description={page.archive.description}
                  align="left"
                />
                {months ? (
                  <MonthArchiveChipStrip
                    months={months}
                    limit={6}
                    trailingLabel={
                      language === 'es' ? 'Ver todo el archivo' : 'View archive'
                    }
                    className="mb-10"
                  />
                ) : null}
                {result === undefined ? (
                  <div className="flex min-h-[240px] items-center justify-center">
                    <Spinner size="lg" />
                  </div>
                ) : result.past.length > 0 ? (
                  <ol className="mx-auto max-w-4xl">
                    {result.past.map((event, index) => (
                      <PastEventTimelineRow
                        key={event.id}
                        event={event}
                        index={index}
                        labels={{
                          detail:
                            language === 'es' ? 'Ver detalle' : 'View detail',
                          recap: page.detail.recap,
                          album: page.detail.album,
                        }}
                      />
                    ))}
                  </ol>
                ) : (
                  <div className="border-border bg-card/40 text-muted-foreground rounded-2xl border border-dashed p-10 text-center">
                    {page.archive.empty}
                  </div>
                )}
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
                  eyebrow={page.cta.eyebrow}
                  title={page.cta.title}
                  description={page.cta.body}
                  align="center"
                  size="lg"
                  className="[&_h2]:text-background [&_p:last-child]:text-background/70"
                />
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href={mailtoWithSubject('Host an Ai Labs event')}
                    className={cn(
                      buttonVariants({ size: '3xl' }),
                      'bg-primary-foreground text-primary dark:bg-primary dark:text-primary-foreground rounded-full',
                    )}
                  >
                    {page.cta.hostCta}
                    <HugeiconsIcon icon={ArrowRightIcon} className="size-5" />
                  </a>
                  <StrategyLink
                    href={t.site.whatsappLink}
                    className={cn(
                      buttonVariants({ variant: 'outline', size: '3xl' }),
                      'border-background/30 bg-background/10 text-background hover:bg-background/20 dark:text-foreground rounded-full',
                    )}
                  >
                    {page.cta.joinCta}
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

function EventsHeroAside({
  event,
  label,
  cta,
}: {
  event: {
    slug: string
    title: string
    imageUrl?: string | null
    date: string
    location?: string
    rsvpUrl?: string
    recapUrl?: string | null
  }
  label: string
  cta: string
}) {
  const href = event.recapUrl ?? event.rsvpUrl

  return (
    <aside className="surface-card motion-safe:animate-hero-in hidden overflow-hidden p-0 backdrop-blur [animation-delay:220ms] md:block">
      {event.imageUrl ? (
        <Link
          to="/events/$param"
          params={{ param: event.slug }}
          className="block"
        >
          <div className="bg-muted relative aspect-[4/3]">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="size-full object-cover grayscale transition duration-500 hover:grayscale-0"
            />
          </div>
        </Link>
      ) : null}
      <div className="p-5">
        <p className="eyebrow-label text-primary mb-3">{label}</p>
        <h2 className="font-display text-2xl leading-tight font-semibold">
          {formatWithBrandText(event.title)}
        </h2>
        <p className="text-muted-foreground mt-3 text-sm">{event.date}</p>
        {event.location ? (
          <p className="text-muted-foreground mt-1 text-sm">{event.location}</p>
        ) : null}
        {href ? (
          <Button
            size="xl"
            className="mt-5"
            render={
              <a href={href} target="_blank" rel="noopener noreferrer" />
            }
          >
            {cta}
            <HugeiconsIcon
              icon={ArrowRightIcon}
              className="size-4"
              data-icon="inline-end"
            />
          </Button>
        ) : (
          <Link
            to="/events/$param"
            params={{ param: event.slug }}
            className="text-primary mt-5 inline-flex items-center gap-1 text-sm font-medium hover:underline"
          >
            {cta}
            <HugeiconsIcon icon={ArrowRightIcon} className="size-4" />
          </Link>
        )}
      </div>
    </aside>
  )
}

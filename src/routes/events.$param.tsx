import { Link, createFileRoute } from '@tanstack/react-router'
import { useQuery } from 'convex/react'
import { api } from 'convex/_generated/api'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CalendarIcon,
  Image01Icon,
  MapPinIcon,
} from '@hugeicons/core-free-icons'
import { useState } from 'react'
import { seoCopyEs } from '@/content/seo-copy'
import { strategyContent } from '@/content/strategy-content'
import { buildSeoMeta } from '@/lib/seo-meta'
import { useI18n } from '@/lib/i18n'
import { formatWithBrandText } from '@/components/brand-text'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { AnimatedGrid } from '@/components/ui/animated-grid'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { EventMetaStrip } from '@/components/blocks/event-meta-strip'
import { EventRecapBlock } from '@/components/blocks/event-recap-block'
import { MonthArchiveChipStrip } from '@/components/blocks/month-archive-chip-strip'
import { RelatedEventsStrip } from '@/components/blocks/related-events-strip'
import { cn } from '@/lib/utils'

const MONTH_YEAR_RE =
  /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|ene|abr|ago|dic)-(20\d{2})$/

export const Route = createFileRoute('/events/$param')({
  head: ({ params }) => {
    const isArchive = MONTH_YEAR_RE.test(params.param)
    const { meta, links } = buildSeoMeta({
      path: `/events/${params.param}`,
      title: isArchive ? seoCopyEs.events.title : seoCopyEs.eventDetail.title,
      description: isArchive
        ? seoCopyEs.events.description
        : seoCopyEs.eventDetail.description,
    })
    return { meta, links }
  },
  component: EventParamPage,
})

function EventParamPage() {
  const { param } = Route.useParams()
  return MONTH_YEAR_RE.test(param) ? <EventMonthArchive /> : <EventDetailPage />
}

function EventDetailPage() {
  const { param } = Route.useParams()
  const { language } = useI18n()
  const page = strategyContent[language].eventsPage.detail
  const event = useQuery(api.events.getBySlug, { slug: param, language })
  const related = useQuery(api.events.getRelated, {
    slug: param,
    language,
    limit: 3,
  })

  if (event === undefined) return <CenteredSpinner />

  if (event === null) {
    return (
      <PageShell>
        <main className="flex min-h-[70vh] items-center justify-center px-4 py-32 text-center">
          <div className="editorial-card max-w-xl rounded-[2rem] p-8">
            <p className="eyebrow-label text-primary mb-4">
              {language === 'es' ? 'Evento no encontrado' : 'Event not found'}
            </p>
            <h1 className="font-display text-4xl font-semibold">
              {language === 'es'
                ? 'Ese evento no está publicado.'
                : 'That event is not published.'}
            </h1>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              {language === 'es'
                ? 'Puede que el enlace haya cambiado o que todavía no exista una página pública para este evento.'
                : 'The link may have changed, or this event may not have a public page yet.'}
            </p>
            <Link
              to="/events"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'xl' }),
                'mt-7 rounded-full',
              )}
            >
              {page.back}
            </Link>
          </div>
        </main>
      </PageShell>
    )
  }

  const location = `${event.location}${event.country ? `, ${event.country}` : ''}`

  return (
    <PageShell>
      <main>
        <section className="border-border relative overflow-hidden border-b pt-32 pb-16 md:pt-36">
          <AnimatedGrid className="opacity-70" />
          <div className="hero-radial-field pointer-events-none absolute inset-0 opacity-80" />
          <div className="hero-top-fade pointer-events-none absolute inset-0 z-2" />
          <div className="relative z-10 container mx-auto px-6">
            <div className="text-muted-foreground mb-10 flex flex-wrap items-center gap-2 text-sm">
              <Link to="/events" className="hover:text-primary">
                Eventos
              </Link>
              <span>/</span>
              <Link
                to="/events/$param"
                params={{ param: event.monthKey }}
                className="hover:text-primary capitalize"
              >
                {new Intl.DateTimeFormat(
                  language === 'es' ? 'es-SV' : 'en-US',
                  {
                    month: 'long',
                    year: 'numeric',
                    timeZone: 'UTC',
                  },
                ).format(new Date(event.startAtMs))}
              </Link>
              <span>/</span>
              <span className="text-foreground">{event.title}</span>
            </div>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.72fr)] lg:items-start">
              <div>
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <Badge className="bg-primary/10 text-primary rounded-full">
                    {event.type}
                  </Badge>
                  {event.partner ? (
                    <Badge variant="outline" className="rounded-full">
                      {event.partner}
                    </Badge>
                  ) : null}
                </div>
                <h1 className="text-display-hero max-w-4xl font-medium">
                  {formatWithBrandText(event.title)}
                </h1>
                <p className="text-body-lead text-muted-foreground mt-6 max-w-2xl font-light">
                  {formatWithBrandText(event.description)}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={event.rsvpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ size: '2xl' }),
                      'rounded-full',
                    )}
                  >
                    {page.rsvp}
                    <HugeiconsIcon icon={ArrowUpRightIcon} className="size-4" />
                  </a>
                  {event.recapUrl ? (
                    <a
                      href="#recap"
                      className={cn(
                        buttonVariants({ variant: 'outline', size: '2xl' }),
                        'bg-background/60 rounded-full',
                      )}
                    >
                      {page.recap}
                    </a>
                  ) : null}
                  {event.photoAlbumUrl ? (
                    <a
                      href={event.photoAlbumUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: 'outline', size: '2xl' }),
                        'bg-background/60 rounded-full',
                      )}
                    >
                      {page.album}
                    </a>
                  ) : null}
                </div>
              </div>

              <aside className="surface-card sticky top-24 overflow-hidden p-0">
                <div className="bg-muted relative aspect-[4/3]">
                  {event.imageUrl ? (
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="text-muted-foreground flex size-full items-center justify-center">
                      <HugeiconsIcon icon={Image01Icon} className="size-10" />
                    </div>
                  )}
                </div>
                <div className="space-y-4 p-6">
                  <p className="text-muted-foreground flex items-center gap-2 text-sm">
                    <HugeiconsIcon
                      icon={CalendarIcon}
                      className="text-primary size-4"
                    />
                    <span>{event.date}</span>
                  </p>
                  <p className="text-muted-foreground flex items-center gap-2 text-sm">
                    <HugeiconsIcon
                      icon={MapPinIcon}
                      className="text-primary size-4"
                    />
                    <span>{location}</span>
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="section-editorial py-12">
          <div className="container mx-auto px-4">
            <EventMetaStrip
              date={event.date}
              location={location}
              type={event.type}
              partner={event.partner}
              tags={event.tags}
            />
          </div>
        </section>

        <div id="recap">
          <EventRecapBlock
            recapUrl={event.recapUrl}
            title={
              language === 'es'
                ? 'Mira lo que pasó en la sala.'
                : 'See what happened in the room.'
            }
            description={
              language === 'es'
                ? 'Cuando hay video, lo dejamos aquí para que el aprendizaje no se pierda después del evento.'
                : 'When there is video, it stays here so the learning does not disappear after the event.'
            }
            ctaLabel={page.recap}
          />
        </div>

        {event.photoAlbumUrl ? (
          <section className="section-panel py-16 md:py-20">
            <div className="container mx-auto px-4">
              <a
                href={event.photoAlbumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-card interactive-lift group grid overflow-hidden rounded-[2rem] p-0 md:grid-cols-[0.85fr_1.15fr]"
              >
                <div className="bg-muted relative min-h-[260px] overflow-hidden">
                  {event.imageUrl ? (
                    <img
                      src={event.imageUrl}
                      alt=""
                      className="size-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="text-muted-foreground flex size-full items-center justify-center">
                      <HugeiconsIcon icon={Image01Icon} className="size-10" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-9">
                  <p className="eyebrow-label text-primary mb-4">
                    {page.album}
                  </p>
                  <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                    {language === 'es'
                      ? 'Fotos, momentos y energía del evento.'
                      : 'Photos, moments, and energy from the event.'}
                  </h2>
                  <p className="text-muted-foreground mt-4 leading-relaxed">
                    {event.galleryDate}
                  </p>
                  <span className="text-primary mt-7 inline-flex items-center gap-2 font-medium">
                    {page.album}
                    <HugeiconsIcon icon={ArrowUpRightIcon} className="size-4" />
                  </span>
                </div>
              </a>
            </div>
          </section>
        ) : null}

        <RelatedEventsStrip
          events={related ?? []}
          title={
            language === 'es'
              ? 'Más eventos con una vibra parecida'
              : 'More events with a similar shape'
          }
          emptyLabel={
            language === 'es'
              ? 'Todavía no hay eventos relacionados publicados.'
              : 'No related events are published yet.'
          }
        />
      </main>
    </PageShell>
  )
}

function EventMonthArchive() {
  const { param } = Route.useParams()
  const { language } = useI18n()
  const [now] = useState(() => Date.now())
  const result = useQuery(api.events.listByMonth, {
    monthYear: param,
    language,
  })
  const months = useQuery(api.events.listMonthsWithEvents, { language })

  if (result === undefined) return <CenteredSpinner />

  const upcoming = result.events.filter((event) => event.startAtMs >= now)
  const past = result.events.filter((event) => event.startAtMs < now)

  return (
    <PageShell>
      <main>
        <section className="border-border relative overflow-hidden border-b pt-32 pb-14 md:pt-36">
          <AnimatedGrid className="opacity-60" />
          <div className="hero-radial-field pointer-events-none absolute inset-0 opacity-70" />
          <div className="hero-top-fade pointer-events-none absolute inset-0 z-2" />
          <div className="relative z-10 container mx-auto px-6">
            <Link
              to="/events"
              className="text-muted-foreground hover:text-primary mb-10 inline-flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <HugeiconsIcon icon={ArrowLeftIcon} className="size-4" />
              {language === 'es' ? 'Volver a eventos' : 'Back to events'}
            </Link>
            <p className="eyebrow-label text-primary mb-4">Eventos</p>
            <h1 className="font-display text-5xl font-medium tracking-tight md:text-7xl">
              <span className="text-muted-foreground">Eventos · </span>
              <span className="text-foreground capitalize">
                {result.monthLabel}
              </span>
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
              {language === 'es'
                ? 'Un archivo mensual para seguir la energía del lab: próximos eventos, recaps, álbumes y sesiones que ya pasaron.'
                : 'A monthly archive for following the lab: upcoming events, recaps, albums, and sessions that already happened.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {result.previousMonth ? (
                <Link
                  to="/events/$param"
                  params={{ param: result.previousMonth.key }}
                  className="border-border bg-background/60 text-muted-foreground hover:border-primary/40 hover:text-primary rounded-full border px-4 py-2 text-sm transition-colors"
                >
                  ←{' '}
                  <span className="capitalize">
                    {result.previousMonth.label}
                  </span>
                </Link>
              ) : null}
              {result.nextMonth ? (
                <Link
                  to="/events/$param"
                  params={{ param: result.nextMonth.key }}
                  className="border-border bg-background/60 text-muted-foreground hover:border-primary/40 hover:text-primary rounded-full border px-4 py-2 text-sm transition-colors"
                >
                  <span className="capitalize">{result.nextMonth.label}</span> →
                </Link>
              ) : null}
            </div>
            {months ? (
              <MonthArchiveChipStrip
                months={months}
                currentKey={result.monthKey}
                limit={8}
                className="mt-8"
              />
            ) : null}
          </div>
        </section>

        <section className="section-editorial py-16 md:py-20">
          <div className="container mx-auto px-4">
            {result.events.length > 0 ? (
              <div className="mx-auto max-w-4xl space-y-8">
                <EventArchiveGroup
                  title={language === 'es' ? 'Próximos' : 'Upcoming'}
                  events={upcoming}
                />
                {upcoming.length > 0 && past.length > 0 ? (
                  <div className="border-border border-t" />
                ) : null}
                <EventArchiveGroup
                  title={language === 'es' ? 'Ya pasó' : 'Past'}
                  events={past}
                />
              </div>
            ) : (
              <div className="border-border bg-card/40 text-muted-foreground rounded-2xl border border-dashed p-10 text-center">
                {language === 'es'
                  ? 'No hay eventos publicados para este mes.'
                  : 'No published events for this month.'}
              </div>
            )}
          </div>
        </section>
      </main>
    </PageShell>
  )
}

function EventArchiveGroup({
  title,
  events,
}: {
  title: string
  events: Array<{
    id: string
    slug: string
    title: string
    description: string
    date: string
    location: string
    type: string
    partner?: string | null
  }>
}) {
  if (events.length === 0) return null

  return (
    <div>
      <p className="eyebrow-label text-primary mb-4">{title}</p>
      <div className="space-y-4">
        {events.map((event) => (
          <Link
            key={event.id}
            to="/events/$param"
            params={{ param: event.slug }}
            className="surface-card group block p-6"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="mb-3 flex flex-wrap gap-2">
                  <Badge variant="outline" className="rounded-full">
                    {event.type}
                  </Badge>
                  {event.partner ? (
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary rounded-full"
                    >
                      {event.partner}
                    </Badge>
                  ) : null}
                </div>
                <h3 className="font-display text-2xl font-semibold">
                  {formatWithBrandText(event.title)}
                </h3>
                <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed">
                  {formatWithBrandText(event.description)}
                </p>
              </div>
              <div className="text-muted-foreground shrink-0 text-sm md:text-right">
                <p>{event.date}</p>
                <p>{event.location}</p>
                <span className="text-primary mt-4 inline-flex items-center gap-1 font-medium">
                  Ver detalle
                  <HugeiconsIcon icon={ArrowRightIcon} className="size-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="bg-background text-foreground selection:bg-primary selection:text-primary-foreground motion-safe:animate-page-in min-h-dvh overflow-hidden font-sans">
        {children}
        <SiteFooter />
      </div>
    </>
  )
}

function CenteredSpinner() {
  return (
    <div className="bg-background text-foreground flex min-h-dvh items-center justify-center">
      <Spinner size="lg" />
    </div>
  )
}

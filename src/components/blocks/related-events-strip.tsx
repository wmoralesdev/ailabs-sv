import { Link } from '@tanstack/react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRightIcon, Image01Icon } from '@hugeicons/core-free-icons'
import { formatWithBrandText } from '@/components/brand-text'

type RelatedEvent = {
  id: string
  slug: string
  title: string
  date: string
  type: string
  partner?: string | null
  imageUrl?: string | null
}

type RelatedEventsStripProps = {
  events: Array<RelatedEvent>
  title: string
  emptyLabel: string
}

export function RelatedEventsStrip({
  events,
  title,
  emptyLabel,
}: RelatedEventsStripProps) {
  return (
    <section className="section-editorial py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow-label text-primary mb-3">
              Eventos relacionados
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              {title}
            </h2>
          </div>
          <Link
            to="/events"
            className="text-primary hidden text-sm font-medium hover:underline sm:inline-flex"
          >
            Ver todos
          </Link>
        </div>

        {events.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-3">
            {events.map((event) => (
              <Link
                key={event.id}
                to="/events/$param"
                params={{ param: event.slug }}
                className="surface-card group overflow-hidden p-0"
              >
                <div className="bg-muted relative aspect-[4/3] overflow-hidden">
                  {event.imageUrl ? (
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="size-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="text-muted-foreground flex size-full items-center justify-center">
                      <HugeiconsIcon icon={Image01Icon} className="size-8" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="eyebrow-label text-muted-foreground mb-3">
                    {[event.date, event.partner ?? event.type]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                  <h3 className="font-display text-xl leading-tight font-semibold">
                    {formatWithBrandText(event.title)}
                  </h3>
                  <span className="text-primary mt-4 inline-flex items-center gap-1 text-sm font-medium">
                    Ver detalle
                    <HugeiconsIcon icon={ArrowRightIcon} className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border-border bg-card/40 text-muted-foreground rounded-2xl border border-dashed p-8 text-center">
            {emptyLabel}
          </div>
        )}
      </div>
    </section>
  )
}

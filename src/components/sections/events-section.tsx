import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CalendarIcon,
  Image01Icon,
  MapPinIcon,
} from "@hugeicons/core-free-icons";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { useI18n } from "@/lib/i18n";
import { useDragScroll } from "@/hooks/use-drag-scroll";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { formatWithBrandText } from "@/components/brand-text";

const PAST_IMAGE_PLACEHOLDER =
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop";

export function EventsSection() {
  const { t, language } = useI18n();
  const result = useQuery(api.events.listForHomepage, {
    language,
    upcomingLimit: 10,
    pastLimit: 12,
  });
  const {
    ref: galleryRef,
    isDragging,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  } = useDragScroll<HTMLDivElement>();

  if (result === undefined) {
    return (
      <section id="events" className="section-spacing border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex min-h-[200px] items-center justify-center">
            <Spinner size="lg" />
          </div>
        </div>
      </section>
    );
  }

  const { upcoming, past } = result;

  return (
    <>
      <section id="events" className="section-spacing border-y border-border/50">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow={t.events.badge}
            title={t.events.sectionTitle}
            description={t.events.tagline}
            align="left"
          />

          <div className="mb-8">
            <h3 className="text-lg font-semibold">{t.events.upcomingTitle}</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {upcoming.length > 0 ? (
              upcoming.map((event) => (
                <Card
                  key={event.id}
                  className="rounded-2xl border-border/70 bg-card/70 py-0 shadow-sm backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-300 motion-safe:hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <CardHeader className="space-y-4 px-6 pt-6">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="rounded-full bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
                        >
                          {event.type}
                        </Badge>
                        {event.isVirtual ? (
                          <Badge
                            variant="outline"
                            className="rounded-full border-dashed border-primary/50 px-2.5 py-0.5 text-[11px] font-medium text-primary"
                          >
                            {t.events.virtualLabel}
                          </Badge>
                        ) : null}
                        {event.partner ? (
                          <Badge
                            variant="outline"
                            className="rounded-full border-border/70 px-2.5 py-0.5 text-[11px] font-medium"
                          >
                            {event.partner}
                          </Badge>
                        ) : null}
                      </div>
                      <div className="flex flex-wrap justify-end gap-2">
                        {event.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border/70 bg-background/80 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-tight md:text-2xl">
                      {formatWithBrandText(event.title)}
                    </CardTitle>
                    <div className="space-y-2 pt-1 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <HugeiconsIcon
                          icon={CalendarIcon}
                          className="size-4 text-primary"
                        />
                        <span>{event.date}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <HugeiconsIcon
                          icon={MapPinIcon}
                          className="size-4 text-primary"
                        />
                        <span>
                          {event.location}
                          {event.country ? `, ${event.country}` : ""}
                        </span>
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="px-6">
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                      {formatWithBrandText(event.description)}
                    </p>
                  </CardContent>
                  <CardFooter className="border-border/60 px-6">
                    <a
                      href={event.rsvpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants(),
                        "group h-10 rounded-full px-5 text-sm",
                      )}
                    >
                      {t.events.rsvpButton}
                      <HugeiconsIcon
                        icon={ArrowUpRightIcon}
                        className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                      />
                    </a>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-2 rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center text-muted-foreground">
                {t.events.noUpcoming}
              </div>
            )}
          </div>
        </div>
      </section>

      <section
        id="event-gallery"
        className="section-spacing border-y border-border/50 bg-muted/20"
      >
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow={t.eventsGallery.badge}
            title={t.eventsGallery.title}
            align="left"
          />
        </div>

        <div className="mt-12">
          {past.length > 0 ? (
            <div
              ref={galleryRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
              className={cn(
                "flex gap-4 overflow-x-auto px-6 scrollbar-hide select-none",
                isDragging ? "cursor-grabbing" : "cursor-grab"
              )}
            >
              {[...past, ...past].map((event, i) => (
                <article
                  key={`${event.id}-${i}`}
                  className="group relative aspect-[3/2] w-[420px] shrink-0 overflow-hidden rounded-2xl shadow-sm grayscale transition-[filter,transform,box-shadow] duration-500 hover:grayscale-0 hover:z-10 hover:shadow-lg motion-safe:hover:-translate-y-0.5"
                >
                  <img
                    src={event.imageUrl ?? PAST_IMAGE_PLACEHOLDER}
                    alt={event.title}
                    draggable={false}
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Top gradient for badge readability */}
                  <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-black/60 to-transparent" />
                  {/* Bottom gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
                  {/* Top badges */}
                  <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5">
                    {event.partner && (
                      <span className="rounded-full border border-white/30 bg-black/50 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md">
                        {event.partner}
                      </span>
                    )}
                    {event.isVirtual && (
                      <span className="rounded-full border border-white/30 bg-black/50 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md">
                        {t.events.virtualLabel}
                      </span>
                    )}
                  </div>
                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 z-10 w-full p-4 text-white">
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className="text-[11px] font-medium uppercase tracking-widest text-white/70">
                        {event.date}
                      </span>
                      {event.country && (
                        <span className="rounded-full border border-white/30 bg-black/40 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md">
                          {event.country}
                        </span>
                      )}
                    </div>
                    <h4 className="mb-2 text-base font-semibold leading-snug text-white">
                      {formatWithBrandText(event.title)}
                    </h4>
                    <div className="flex items-center gap-3">
                      {event.recapUrl && (
                        <a
                          href={event.recapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-white/80 transition-colors duration-300 hover:text-white"
                        >
                          {t.events.recapButton}
                          <HugeiconsIcon
                            icon={ArrowRightIcon}
                            className="size-3 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5"
                          />
                        </a>
                      )}
                      {event.recapUrl && event.photoAlbumUrl && (
                        <span className="text-white/30">·</span>
                      )}
                      {event.photoAlbumUrl && (
                        <a
                          href={event.photoAlbumUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-white/80 transition-colors duration-300 hover:text-white"
                        >
                          {t.events.albumButton}
                          <HugeiconsIcon
                            icon={Image01Icon}
                            className="size-3 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-card/40 px-6 py-12 text-center text-muted-foreground">
              {t.events.noPast}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

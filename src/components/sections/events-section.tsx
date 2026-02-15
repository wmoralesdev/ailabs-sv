import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CalendarIcon,
  MapPinIcon,
} from "@hugeicons/core-free-icons";
import { useI18n } from "@/lib/i18n";
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
import { cn } from "@/lib/utils";
import { formatWithBrandText } from "@/components/brand-text";

export function EventsSection() {
  const { t } = useI18n();

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
            {t.events.upcoming.length > 0 ? (
              t.events.upcoming.map((event) => (
                <Card
                  key={event.id}
                  className="rounded-2xl border-border/70 bg-card/70 py-0 shadow-sm backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-300 motion-safe:hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <CardHeader className="space-y-4 px-6 pt-6">
                    <div className="flex items-center justify-between gap-3">
                      <Badge
                        variant="secondary"
                        className="rounded-full bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
                      >
                        {event.type}
                      </Badge>
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
                        <span>{event.location}</span>
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
                      href={event.rsvpLink}
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

        <div className="mt-12 overflow-hidden py-4">
          <div className="flex gap-4 whitespace-nowrap px-6 motion-reduce:overflow-x-auto motion-reduce:animate-none motion-reduce:scrollbar-hide animate-marquee hover:paused">
            {[...t.events.past, ...t.events.past].map((event, index) => (
              <article
                key={`${event.id}-${index}`}
                className="group relative h-[260px] w-[300px] shrink-0 overflow-hidden rounded-2xl border border-border/50 bg-background shadow-sm transition-[transform,border-color,box-shadow] duration-300 motion-safe:hover:-translate-y-0.5 hover:z-10 hover:border-primary/40 hover:shadow-lg"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-95" />
                <div className="absolute bottom-0 left-0 w-full p-5 text-white transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5">
                  <p className="mb-1 text-xs uppercase tracking-wide text-white/80">
                    {event.date}
                  </p>
                  <h4 className="text-lg font-semibold leading-tight md:text-xl">
                    {formatWithBrandText(event.title)}
                  </h4>
                  {event.recapLink ? (
                    <a
                      href={event.recapLink}
                      className="mt-2 inline-flex items-center gap-1 text-sm text-white/90 transition-colors duration-300 hover:text-white"
                    >
                      {t.events.recapButton}
                      <HugeiconsIcon
                        icon={ArrowRightIcon}
                        className="size-3.5 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5"
                      />
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CalendarIcon,
  MapPinIcon,
} from "@hugeicons/core-free-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/content/site-content";
import { formatWithBrandText } from "@/components/brand-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type UpcomingEventHome = {
  id: string;
  title: string;
  description: string;
  location: string;
  country?: string;
  isVirtual: boolean;
  date: string;
  type: string;
  tags: Array<string>;
  partner?: string | null;
  rsvpUrl: string;
};

type Props = {
  events: Array<UpcomingEventHome>;
  t: Pick<SiteContent, "events">;
};

const SCROLL_EPS = 2;

function getScrollStep(track: HTMLElement): number {
  const slides = track.children;
  if (slides.length === 0) return 0;
  if (slides.length === 1) return track.clientWidth;
  const a = slides[0].getBoundingClientRect();
  const b = slides[1].getBoundingClientRect();
  return b.left - a.left;
}

export function UpcomingEventsCarousel({ events, t }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= SCROLL_EPS) {
      setCanScrollPrev(false);
      setCanScrollNext(false);
      return;
    }
    setCanScrollPrev(scrollLeft > SCROLL_EPS);
    setCanScrollNext(scrollLeft < maxScroll - SCROLL_EPS);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateScrollState();

    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(() => {
      updateScrollState();
    });
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [events.length, updateScrollState]);

  const scrollByDirection = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const step = getScrollStep(track);
    if (step <= 0) return;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  return (
    <div
      className="relative px-10 md:px-12"
      role="region"
      aria-roledescription="carousel"
      aria-label={t.events.upcomingTitle}
    >
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-background/90 shadow-sm backdrop-blur-sm"
        aria-label={t.events.carouselPrevAria}
        disabled={!canScrollPrev}
        onClick={() => scrollByDirection(-1)}
      >
        <HugeiconsIcon icon={ArrowLeftIcon} className="size-4" strokeWidth={2} />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-background/90 shadow-sm backdrop-blur-sm"
        aria-label={t.events.carouselNextAria}
        disabled={!canScrollNext}
        onClick={() => scrollByDirection(1)}
      >
        <HugeiconsIcon icon={ArrowRightIcon} className="size-4" strokeWidth={2} />
      </Button>

      <div
        ref={trackRef}
        className={cn(
          // The track has overflow-y-hidden so the surface-card hover
          // (translateY + 0 18px 44px box-shadow) lives inside the track,
          // not the page. Asymmetric padding because the shadow extends
          // ~40px below the card and only ~6px above.
          "scrollbar-hide flex w-full min-w-0 flex-nowrap snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden scroll-smooth pt-4 pb-14 md:pt-6 md:pb-16",
        )}
      >
        {events.map((event) => (
          <div
            key={event.id}
            className="min-w-0 shrink-0 snap-start flex-[0_0_100%] md:flex-[0_0_calc(50%-0.75rem)]"
          >
            <Card className="surface-card overflow-hidden py-0">
              <CardHeader className="space-y-4 px-6 pt-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase"
                  >
                    {event.type}
                  </Badge>
                  {event.isVirtual ? (
                    <Badge
                      variant="outline"
                      className="border-border/70 text-foreground/75 rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                    >
                      {t.events.virtualLabel}
                    </Badge>
                  ) : null}
                  {event.partner ? (
                    <Badge
                      variant="outline"
                      className="border-border/70 text-foreground/75 rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                    >
                      {event.partner}
                    </Badge>
                  ) : null}
                  {event.tags.length > 0 ? (
                    <span
                      aria-hidden
                      className="bg-border/60 mx-1 hidden h-3.5 w-px md:inline-block"
                    />
                  ) : null}
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-muted-foreground/80 font-mono text-[11px] tracking-tight"
                    >
                      #{tag}
                    </span>
                  ))}
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
              <CardFooter className="border-border/60 bg-background/35 px-6">
                <Button
                  size="xl"
                  className="group w-full"
                  render={
                    <a
                      href={event.rsvpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  {t.events.rsvpButton}
                  <HugeiconsIcon
                    icon={ArrowUpRightIcon}
                    className="size-4"
                    data-icon="inline-end"
                  />
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRightIcon, Image01Icon } from "@hugeicons/core-free-icons";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import type { SiteContent } from "@/content/site-content";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/section-header";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { formatWithBrandText } from "@/components/brand-text";
import { UpcomingEventsCarousel } from "@/components/sections/upcoming-events-carousel";

const PAST_IMAGE_PLACEHOLDER =
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop";

type PastEventForGallery = {
  id: string;
  title: string;
  imageUrl: string | null;
  date: string;
  country?: string | null;
  partner?: string | null;
  isVirtual: boolean;
  recapUrl?: string | null;
  photoAlbumUrl?: string | null;
};

function PastEventCard({
  event,
  t,
}: {
  event: PastEventForGallery;
  t: Pick<SiteContent, "events">;
}) {
  return (
    <article
      className="group relative aspect-[3/2] w-[420px] shrink-0 overflow-hidden rounded-2xl shadow-sm grayscale transition-[filter,box-shadow] duration-500 hover:grayscale-0 hover:z-10 hover:shadow-lg"
    >
      <img
        src={event.imageUrl ?? PAST_IMAGE_PLACEHOLDER}
        alt={event.title}
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-black/60 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
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
                className="size-3"
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
                className="size-3"
              />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function EventsSection() {
  const { t, language } = useI18n();
  const result = useQuery(api.events.listForHomepage, {
    language,
    upcomingLimit: 10,
    pastLimit: 12,
  });
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
      <section id="events" className="section-editorial py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <SectionHeader
              eyebrow={t.events.badge}
              title={t.events.sectionTitle}
              description={t.events.tagline}
              align="left"
            />
          </div>

          <div className="mb-8 mt-4">
            <h3 className="text-lg font-semibold">{t.events.upcomingTitle}</h3>
          </div>

          {upcoming.length > 0 ? (
            <UpcomingEventsCarousel events={upcoming} t={t} />
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center text-muted-foreground">
              {t.events.noUpcoming}
            </div>
          )}
        </div>
      </section>

      <section id="event-gallery" className="section-panel py-20 md:py-28">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow={t.eventsGallery.badge}
            title={t.eventsGallery.title}
            align="left"
          />
        </div>

        <div className="mt-12">
          {past.length > 0 ? (
            <div className="overflow-hidden py-4">
              <div
                className={cn(
                  "flex gap-4 whitespace-nowrap px-6 motion-reduce:overflow-x-auto motion-reduce:animate-none motion-reduce:scrollbar-hide animate-marquee hover:paused"
                )}
              >
                {[...past, ...past].map((event, index) => (
                  <PastEventCard
                    key={`${event.id}-${index}`}
                    event={event}
                    t={t}
                  />
                ))}
              </div>
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

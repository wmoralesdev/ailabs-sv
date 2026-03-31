import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowRight01Icon,
  CalendarIcon,
  Home09Icon,
  MapPinIcon,
  QrCodeScanIcon,
} from "@hugeicons/core-free-icons";
import { Link, createFileRoute } from "@tanstack/react-router";
import QRCode from "react-qr-code";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { formatWithBrandText } from "@/components/brand-text";
import { ThemeToggle } from "@/components/theme-toggle";
import { useResolvedDark } from "@/components/theme-provider";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { AilabsLockup } from "@/components/ui/ailabs-lockup";
import { AilabsLogo } from "@/components/ui/ailabs-logo";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Spinner } from "@/components/ui/spinner";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { LinkedinIcon } from "@/components/ui/linkedin-icon";
import { TiktokIcon } from "@/components/ui/tiktok-icon";
import { WhatsappIcon } from "@/components/ui/whatsapp-icon";
import { XIcon } from "@/components/ui/x-icon";
import { seoCopyEs } from "@/content/seo-copy";
import { buildLinksPageJsonLd, buildSeoMeta } from "@/lib/seo-meta";
import { getSiteOrigin } from "@/lib/site-url";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const linkRowBase =
  "relative flex h-14 w-full items-center overflow-hidden rounded-2xl border px-5 text-sm font-medium transition-[transform,box-shadow,border-color,background-color] duration-300 motion-safe:hover:-translate-y-0.5";

/** Share target for QR; use getSiteOrigin() alone for site root only. */
const linksShareUrl = `${getSiteOrigin()}/links`;

function socialHandleFromUrl(url: string | undefined): string | null {
  if (!url) return null;
  try {
    const segment = new URL(url).pathname.replace(/^\//, "").split("/")[0];
    return segment ? `@${segment}` : null;
  } catch {
    return null;
  }
}

const collapsibleTriggerRow = cn(
  linkRowBase,
  "cursor-pointer border-border/70 bg-card/40 text-left text-foreground backdrop-blur-md hover:border-primary/35 hover:bg-card/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

const collapsibleLeadIconWrap =
  "pointer-events-none absolute left-5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-xl bg-muted/80 text-foreground/80";

const halfRowLeadIconWrap =
  "pointer-events-none absolute left-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg bg-primary-foreground/15 text-primary-foreground sm:left-4 sm:size-9 sm:rounded-xl";

const secondarySocialCell = cn(
  linkRowBase,
  "min-h-14 min-w-0 flex-1 basis-0 justify-center border-border/70 bg-card/40 px-2 text-foreground backdrop-blur-md hover:border-primary/35 hover:bg-card/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

export const Route = createFileRoute("/links")({
  head: () => {
    const { meta, links } = buildSeoMeta({
      path: "/links",
      title: seoCopyEs.links.title,
      description: seoCopyEs.links.description,
    });
    return {
      meta: [
        ...meta,
        {
          "script:ld+json": buildLinksPageJsonLd(
            seoCopyEs.links.title,
            seoCopyEs.links.description,
          ),
        },
      ],
      links,
    };
  },
  component: LinksPage,
});

function LinksPage() {
  const { t, language } = useI18n();
  const isDark = useResolvedDark();
  const eventsResult = useQuery(api.events.listForHomepage, {
    language,
    upcomingLimit: 2,
    pastLimit: 0,
  });
  const socialHandle = socialHandleFromUrl(t.site.socials.twitter);
  const instagramUrl = t.site.socials.instagram;
  const secondarySocials = (
    [
      {
        key: "linkedin" as const,
        href: t.site.socials.linkedin,
        label: "LinkedIn",
        Icon: LinkedinIcon,
      },
      {
        key: "tiktok" as const,
        href: t.site.socials.tiktok,
        label: "TikTok",
        Icon: TiktokIcon,
      },
      {
        key: "twitter" as const,
        href: t.site.socials.twitter,
        label: "X",
        Icon: XIcon,
      },
    ] as const
  ).filter((item) => Boolean(item.href));

  const qrFg = isDark ? "#fafafa" : "#0a0a0a";
  const qrBg = isDark ? "#1c1917" : "#fafaf9";

  return (
    <div className="relative min-h-dvh overflow-hidden bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <AnimatedGrid />
      <div className="hero-top-fade pointer-events-none absolute inset-0 z-[1]" />

      <div className="pointer-events-none fixed right-3 top-3 z-30 md:right-5 md:top-4">
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-md flex-col px-4 pb-10 pt-12 md:pt-16">
        <header
          className="mb-10 flex flex-col items-center text-center motion-safe:animate-hero-in [animation-delay:80ms]"
          aria-label={t.site.name}
        >
          <div
            className={cn(
              "mb-5 flex size-20 items-center justify-center rounded-full border shadow-inner backdrop-blur-sm",
              "border-zinc-800 bg-zinc-950 dark:border-zinc-200 dark:bg-white",
            )}
          >
            <AilabsLogo
              className={cn(
                "size-11",
                "[&_g[data-name=large-node]]:fill-primary [&_g[data-name=short-node]]:fill-white [&_g[data-name=dot]]:fill-zinc-400",
                "dark:[&_g[data-name=large-node]]:fill-primary dark:[&_g[data-name=short-node]]:fill-zinc-900 dark:[&_g[data-name=dot]]:fill-zinc-500",
              )}
              aria-hidden
            />
          </div>
          {socialHandle ? (
            <p className="font-mono text-xs font-medium tracking-wide text-muted-foreground">
              {socialHandle}
            </p>
          ) : null}
          <h1 className="mt-2">
            <span className="sr-only">{t.site.name}</span>
            <AilabsLockup
              className="text-4xl md:text-5xl"
              aria-hidden
            />
          </h1>
          <p className="mt-3 max-w-sm text-pretty text-sm font-light leading-relaxed text-muted-foreground motion-safe:animate-hero-in [animation-delay:140ms]">
            {t.site.description}
          </p>
        </header>

        <div className="flex flex-col gap-3">
          <div className="flex gap-3 motion-safe:animate-hero-in [animation-delay:200ms]">
            <a
              href={t.site.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                linkRowBase,
                "border-primary/25 bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:border-primary/40 hover:shadow-primary/35",
                instagramUrl ? "min-w-0 flex-1 basis-0" : "w-full",
              )}
            >
              <span className={halfRowLeadIconWrap}>
                <WhatsappIcon className="size-[16px] sm:size-[18px]" />
              </span>
              <span className="w-full truncate px-2 pl-11 text-center text-sm font-medium sm:pl-12">
                {t.ui.footer.whatsapp}
              </span>
            </a>
            {instagramUrl ? (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  linkRowBase,
                  "min-w-0 flex-1 basis-0 border-border/70 bg-card/40 text-foreground backdrop-blur-md hover:border-primary/35 hover:bg-card/70",
                )}
              >
                <span
                  className="pointer-events-none absolute left-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg bg-muted/80 text-foreground/80 sm:left-4 sm:size-9 sm:rounded-xl"
                  aria-hidden
                >
                  <InstagramIcon className="size-[15px] sm:size-[18px]" />
                </span>
                <span className="w-full truncate px-2 pl-11 text-center text-sm font-medium sm:pl-12">
                  {t.ui.linksPage.instagram}
                </span>
              </a>
            ) : null}
          </div>

          {secondarySocials.length > 0 ? (
            <div className="motion-safe:animate-hero-in [animation-delay:230ms] flex gap-2">
              {secondarySocials.map(({ key, href, label, Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={secondarySocialCell}
                >
                  <span className="sr-only">{label}</span>
                  <Icon className="size-5 text-foreground/85 sm:size-[22px]" />
                </a>
              ))}
            </div>
          ) : null}

          <Collapsible
            defaultOpen
            className="motion-safe:animate-hero-in [animation-delay:270ms]"
          >
            <CollapsibleTrigger className={cn(collapsibleTriggerRow, "group relative w-full")}>
              <span className={collapsibleLeadIconWrap} aria-hidden>
                <HugeiconsIcon icon={CalendarIcon} className="size-4" strokeWidth={2} />
              </span>
              <span className="block w-full px-14 text-center text-sm font-medium">
                {t.ui.linksPage.eventsHeading}
              </span>
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                strokeWidth={2}
                className="pointer-events-none absolute right-5 top-1/2 size-4 -translate-y-1/2 text-foreground/70 transition-transform duration-200 group-data-[panel-open]:rotate-180"
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 flex flex-col gap-3">
              {eventsResult === undefined ? (
                <div className="flex min-h-[140px] items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/30 py-10 backdrop-blur-sm">
                  <Spinner size="lg" />
                </div>
              ) : eventsResult.upcoming.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-border/60 bg-card/30 px-4 py-8 text-center text-sm text-muted-foreground backdrop-blur-sm">
                  {t.events.noUpcoming}
                </p>
              ) : (
                eventsResult.upcoming.map((event) => (
                  <Link
                    key={event.id}
                    to="/events/$slug"
                    params={{ slug: event.slug }}
                    className={cn(
                      "group relative block rounded-2xl border border-border/60 bg-card/50 p-4 text-left shadow-sm backdrop-blur-md transition-[transform,border-color,box-shadow] duration-300",
                      "motion-safe:hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md hover:shadow-primary/5",
                    )}
                  >
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      className="absolute right-3 top-3 size-4 text-muted-foreground opacity-50 transition-opacity duration-300 group-hover:opacity-100"
                      strokeWidth={2}
                    />
                    <div className="flex flex-wrap items-center gap-2 pr-8">
                      <Badge
                        variant="secondary"
                        className="rounded-full bg-muted/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                      >
                        {event.type}
                      </Badge>
                      {event.isVirtual ? (
                        <Badge
                          variant="outline"
                          className="rounded-full border-dashed border-primary/40 px-2 py-0 text-[10px] font-medium text-primary"
                        >
                          {t.events.virtualLabel}
                        </Badge>
                      ) : null}
                      {event.partner ? (
                        <Badge
                          variant="outline"
                          className="rounded-full border-border/70 px-2 py-0 text-[10px] font-medium"
                        >
                          {event.partner}
                        </Badge>
                      ) : null}
                    </div>
                    <h2 className="mt-3 text-base font-semibold leading-snug tracking-tight">
                      {formatWithBrandText(event.title)}
                    </h2>
                    <div className="mt-3 space-y-1.5 text-xs text-muted-foreground md:text-sm">
                      <p className="flex items-start gap-2">
                        <HugeiconsIcon
                          icon={CalendarIcon}
                          className="mt-0.5 size-3.5 shrink-0 text-primary"
                          strokeWidth={2}
                        />
                        <span>{event.date}</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <HugeiconsIcon
                          icon={MapPinIcon}
                          className="mt-0.5 size-3.5 shrink-0 text-primary"
                          strokeWidth={2}
                        />
                        <span>
                          {event.location}
                          {event.country ? `, ${event.country}` : ""}
                        </span>
                      </p>
                    </div>
                    <span
                      className={cn(
                        buttonVariants(),
                        "mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-medium shadow-md shadow-primary/15 transition-[box-shadow,transform] duration-300 group-hover:shadow-lg group-hover:shadow-primary/25",
                      )}
                    >
                      {t.events.rsvpButton}
                      <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        className="size-4 shrink-0 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5"
                        strokeWidth={2}
                      />
                    </span>
                  </Link>
                ))
              )}
            </CollapsibleContent>
          </Collapsible>

          <Link
            to="/"
            className={cn(
              linkRowBase,
              "border-border/70 bg-card/40 text-foreground backdrop-blur-md hover:border-primary/35 hover:bg-card/70",
              "motion-safe:animate-hero-in [animation-delay:310ms]",
            )}
          >
            <span className="pointer-events-none absolute left-5 flex size-9 items-center justify-center rounded-xl bg-muted/80 text-foreground/80">
              <HugeiconsIcon icon={Home09Icon} className="size-4" strokeWidth={2} />
            </span>
            <span className="w-full text-center pr-2">{t.ui.linksPage.home}</span>
          </Link>

          <Collapsible
            defaultOpen={false}
            className="motion-safe:animate-hero-in [animation-delay:350ms]"
          >
            <CollapsibleTrigger className={cn(collapsibleTriggerRow, "group relative w-full")}>
              <span className={collapsibleLeadIconWrap} aria-hidden>
                <HugeiconsIcon icon={QrCodeScanIcon} className="size-4" strokeWidth={2} />
              </span>
              <span className="block w-full px-14 text-center text-sm font-medium">
                {t.ui.linksPage.qrLabel}
              </span>
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                strokeWidth={2}
                className="pointer-events-none absolute right-5 top-1/2 size-4 -translate-y-1/2 text-foreground/70 transition-transform duration-200 group-data-[panel-open]:rotate-180"
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-3">
              <p className="text-center text-xs text-muted-foreground">
                {t.ui.linksPage.qrDescription}
              </p>
              <div className="rounded-2xl border border-border/60 bg-card/50 p-5 shadow-sm backdrop-blur-md">
                <QRCode
                  value={linksShareUrl}
                  size={200}
                  title={t.ui.linksPage.qrAlt}
                  fgColor={qrFg}
                  bgColor={qrBg}
                  className="mx-auto h-auto max-w-full [&_path]:[shape-rendering:crispEdges]"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <footer className="mt-auto pt-12 text-center text-[11px] font-light leading-relaxed text-muted-foreground motion-safe:animate-hero-in [animation-delay:430ms]">
          <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 leading-none">
            <span>© {new Date().getFullYear()}</span>
            <AilabsLockup className="inline-flex -translate-y-[0.14em] text-[11px] [&_svg]:h-[1em] [&_svg]:w-auto" />
            <span>
              . {t.ui.footer.madeWith}{" "}
              <span className="text-primary">♥</span> {t.ui.footer.inSanSalvador}
            </span>
          </p>
          <p className="mt-5 flex justify-center">
            <a
              href="https://www.lem-design.art/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/40 px-3.5 py-2 text-[11px] font-medium text-foreground/75 shadow-sm backdrop-blur-md",
                "transition-[transform,border-color,background-color,box-shadow,color] duration-300",
                "hover:border-primary/35 hover:bg-card/70 hover:text-foreground hover:shadow-md hover:shadow-primary/5",
                "motion-safe:hover:-translate-y-0.5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              <span className="text-primary" aria-hidden>
                ✦
              </span>
              <span>{t.ui.linksPage.logoCredit}</span>
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

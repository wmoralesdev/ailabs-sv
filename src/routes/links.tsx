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
import { SocialLinks } from "@/components/social-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useResolvedDark } from "@/components/theme-provider";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { AilabsLockup } from "@/components/ui/ailabs-lockup";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Spinner } from "@/components/ui/spinner";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { WhatsappIcon } from "@/components/ui/whatsapp-icon";
import { seoCopyEs } from "@/content/seo-copy";
import { buildLinksPageJsonLd, buildSeoMeta } from "@/lib/seo-meta";
import { getSiteOrigin } from "@/lib/site-url";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

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

  const qrFg = isDark ? "#fafafa" : "#0a0a0a";
  const qrBg = isDark ? "#1c1917" : "#fafaf9";

  return (
    <div className="relative min-h-dvh overflow-hidden bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground motion-safe:animate-page-in">
      {/* Background layers — same as landing hero */}
      <AnimatedGrid className="opacity-70" />
      <div className="hero-radial-field pointer-events-none absolute inset-0 opacity-80" />
      <div className="hero-top-fade pointer-events-none absolute inset-0 z-[1]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-background to-transparent" />

      {/* Top controls */}
      <div className="pointer-events-none fixed right-3 top-3 z-30 flex items-center gap-2 md:right-5 md:top-4">
        <div className="pointer-events-auto">
          <LanguageToggle />
        </div>
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-md flex-col px-4 pb-10 pt-12 md:pt-16">
        {/* Header — brand lockup matching landing hero */}
        <header
          className="mb-10 flex flex-col items-center text-center motion-safe:animate-hero-in [animation-delay:80ms]"
          aria-label={t.site.name}
        >
          <h1 className="mb-4">
            <span className="sr-only">{t.site.name}</span>
            <AilabsLockup className="text-5xl md:text-6xl" />
          </h1>
          {socialHandle ? (
            <p className="eyebrow-label text-primary mb-3">
              {socialHandle}
            </p>
          ) : null}
          <p className="text-body-lead max-w-sm text-pretty font-light text-foreground/65 motion-safe:animate-hero-in [animation-delay:140ms]">
            {t.site.description}
          </p>
          <div className="mt-5 motion-safe:animate-hero-in [animation-delay:180ms]">
            <SocialLinks socials={t.site.socials} variant="minimal" />
          </div>
        </header>

        {/* Link rows */}
        <div className="flex flex-col gap-3">
          {/* Primary CTAs */}
          <div className="flex gap-3 motion-safe:animate-hero-in [animation-delay:220ms]">
            <a
              href={t.site.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "3xl" }),
                "interactive-lift relative flex w-full items-center overflow-hidden",
                instagramUrl ? "min-w-0 flex-1 basis-0" : "w-full",
              )}
            >
              <span className="pointer-events-none absolute left-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md bg-primary-foreground/15 text-primary-foreground sm:left-4 sm:size-9">
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
                  buttonVariants({ variant: "outline", size: "3xl" }),
                  "interactive-lift group relative flex min-w-0 flex-1 basis-0 items-center overflow-hidden",
                )}
              >
                <span
                  className="pointer-events-none absolute left-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors group-hover:text-accent-foreground sm:left-4 sm:size-9"
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

          {/* Events collapsible */}
          <Collapsible
            defaultOpen
            className="motion-safe:animate-hero-in [animation-delay:270ms]"
          >
            <CollapsibleTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "3xl" }),
                "interactive-lift group relative flex w-full cursor-pointer items-center overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              <span className="pointer-events-none absolute left-5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors group-hover:text-accent-foreground" aria-hidden>
                <HugeiconsIcon icon={CalendarIcon} className="size-4" strokeWidth={2} />
              </span>
              <span className="block w-full px-14 text-center text-sm font-medium">
                {t.ui.linksPage.eventsHeading}
              </span>
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                strokeWidth={2}
                className="pointer-events-none absolute right-5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-[transform,color] duration-200 group-hover:text-accent-foreground group-data-[panel-open]:rotate-180"
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 flex flex-col gap-3">
              {eventsResult === undefined ? (
                <div className="editorial-card flex min-h-[140px] items-center justify-center rounded-[1.75rem] py-10">
                  <Spinner size="lg" />
                </div>
              ) : eventsResult.upcoming.length === 0 ? (
                <p className="editorial-card rounded-[1.75rem] px-4 py-8 text-center text-sm text-muted-foreground">
                  {t.events.noUpcoming}
                </p>
              ) : (
                eventsResult.upcoming.map((event, index) => (
                  <Link
                    key={event.id}
                    to="/events/$slug"
                    params={{ slug: event.slug }}
                    className={cn(
                      "editorial-card interactive-lift group relative block rounded-[1.75rem] p-4 text-left text-card-foreground",
                      "motion-safe:animate-hero-in",
                    )}
                    style={{
                      animationDelay: `calc(270ms + ${index * 50}ms)`,
                    }}
                  >
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      className="absolute right-3 top-3 size-4 text-muted-foreground opacity-50 transition-[opacity,color] duration-300 group-hover:text-accent-foreground group-hover:opacity-100"
                      strokeWidth={2}
                    />
                    <div className="flex flex-wrap items-center gap-2 pr-8">
                      <Badge
                        variant="secondary"
                        className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary"
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
                    <h2 className="mt-3 font-display text-base font-semibold leading-snug tracking-tight">
                      {formatWithBrandText(event.title)}
                    </h2>
                    <div className="mt-3 space-y-1.5 text-xs text-muted-foreground transition-colors duration-300 group-hover:text-accent-foreground/80 md:text-sm">
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
                        buttonVariants({ size: "2xl" }),
                        "mt-4 w-full gap-2",
                      )}
                    >
                      {t.events.rsvpButton}
                      <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        className="size-4 shrink-0"
                        strokeWidth={2}
                      />
                    </span>
                  </Link>
                ))
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* Home link */}
          <Button
            variant="outline"
            size="3xl"
            className="interactive-lift group motion-safe:animate-hero-in [animation-delay:310ms]"
            render={<Link to="/" />}
          >
            <span className="pointer-events-none absolute left-5 flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors group-hover:text-accent-foreground">
              <HugeiconsIcon icon={Home09Icon} className="size-4" strokeWidth={2} />
            </span>
            <span className="w-full text-center pr-2">{t.ui.linksPage.home}</span>
          </Button>

          {/* QR collapsible */}
          <Collapsible
            defaultOpen={false}
            className="motion-safe:animate-hero-in [animation-delay:350ms]"
          >
            <CollapsibleTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "3xl" }),
                "interactive-lift group relative flex w-full cursor-pointer items-center overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              <span className="pointer-events-none absolute left-5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors group-hover:text-accent-foreground" aria-hidden>
                <HugeiconsIcon icon={QrCodeScanIcon} className="size-4" strokeWidth={2} />
              </span>
              <span className="block w-full px-14 text-center text-sm font-medium">
                {t.ui.linksPage.qrLabel}
              </span>
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                strokeWidth={2}
                className="pointer-events-none absolute right-5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-[transform,color] duration-200 group-hover:text-accent-foreground group-data-[panel-open]:rotate-180"
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-3">
              <p className="text-center text-xs text-muted-foreground">
                {t.ui.linksPage.qrDescription}
              </p>
              <div className="editorial-card rounded-[1.75rem] p-5">
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

        {/* Footer — matches landing page bottom bar */}
        <footer className="mt-auto pt-12 motion-safe:animate-hero-in [animation-delay:430ms]">
          <div className="flex flex-col items-center gap-4 border-t border-border pt-6 text-center">
            <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-xs font-light leading-none text-foreground/40">
              <span>© {new Date().getFullYear()}</span>
              <AilabsLockup className="inline-flex -translate-y-[0.14em] text-xs [&_svg]:h-[1em] [&_svg]:w-auto" />
              <span>
                . {t.ui.footer.madeWith}{" "}
                <span className="text-primary">♥</span> {t.ui.footer.inSanSalvador}
              </span>
            </p>
            <a
              href="https://www.lem-design.art/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-light text-foreground/40 transition-colors hover:text-foreground/70"
            >
              <span className="mr-1 text-primary" aria-hidden>✦</span>
              {t.ui.linksPage.logoCredit}
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

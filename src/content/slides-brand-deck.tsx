import { useState } from "react";
import { Link } from "@tanstack/react-router";
import QRCode from "react-qr-code";
import { COMMUNITY_PROOF_SLOT_IMAGES } from "@/components/community-proof-bento-grid";
import { useResolvedDark } from "@/components/theme-provider";
import { SlidesBrandText } from "@/components/slides/slides-brand-lockup-inline";
import { SlideLayout } from "@/components/slides/slide-layout";
import { AilabsLockup } from "@/components/ui/ailabs-lockup";
import { GlitchText } from "@/components/ui/glitch-text";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useI18n } from "@/lib/i18n";
import { getSiteOrigin } from "@/lib/site-url";
import { cn } from "@/lib/utils";

const linksQrUrl = `${getSiteOrigin()}/links`;

function BrandCoverSlide() {
  const { t } = useI18n();
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const isDark = useResolvedDark();
  const qrFg = isDark ? "#fafafa" : "#0a0a0a";
  const qrBg = isDark ? "#1c1917" : "#fafaf9";

  return (
    <SlideLayout contentClassName="flex flex-col items-center justify-center text-center">
      <div className="motion-safe:animate-slide-deck-in motion-reduce:animate-none">
        <AilabsLockup className="mb-10 text-6xl md:text-7xl lg:text-8xl" />
      </div>
      <p className="mb-6 max-w-2xl text-lg text-muted-foreground md:text-xl">{t.hero.subheadline}</p>
      <div className="font-display text-2xl font-medium text-foreground md:text-3xl">
        <GlitchText phrases={t.hero.headlinePhrases} className="inline-block min-h-[1.25em]" />
      </div>
      <div className="mt-10">
        <button
          type="button"
          className="cursor-pointer rounded-md border-0 bg-transparent p-0 transition-transform hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={t.ui.linksPage.qrAlt}
          aria-expanded={qrDialogOpen}
          onClick={() => setQrDialogOpen(true)}
        >
          <QRCode
            value={linksQrUrl}
            size={168}
            level="M"
            title=""
            fgColor={qrFg}
            bgColor={qrBg}
            className="h-auto max-w-full [&_path]:[shape-rendering:crispEdges]"
          />
        </button>
      </div>
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent
          size="lg"
          className="z-[100] max-w-[min(90vw,24rem)] items-center border-0 bg-transparent p-8 shadow-none ring-0"
        >
          <DialogTitle className="sr-only">{t.ui.linksPage.qrAlt}</DialogTitle>
          <div className="rounded-2xl border border-border/60 bg-card p-5 text-card-foreground shadow-sm">
            <QRCode
              value={linksQrUrl}
              size={320}
              level="M"
              title={t.ui.linksPage.qrAlt}
              fgColor={qrFg}
              bgColor={qrBg}
              className="h-auto w-full max-w-full [&_path]:[shape-rendering:crispEdges]"
            />
          </div>
        </DialogContent>
      </Dialog>
    </SlideLayout>
  );
}

function BrandWhoWeAreSlide() {
  const { t } = useI18n();
  return (
    <SlideLayout eyebrow={t.why.badge} title={t.why.heading} staggerChildren>
      <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">{t.why.subtext}</p>
    </SlideLayout>
  );
}

function BrandOverviewSlide() {
  const { t } = useI18n();
  const overview = t.slidesBrandDeck.overview;

  return (
    <SlideLayout eyebrow={overview.eyebrow} title={overview.title} staggerChildren>
      <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
        <SlidesBrandText text={overview.intro} />
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        {overview.cards.map((card) => (
          <article key={card.title} className="rounded-2xl border border-border/50 bg-card/25 p-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary">{card.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
          </article>
        ))}
      </div>
    </SlideLayout>
  );
}

function BrandFoundersSlide() {
  const { t } = useI18n();
  return (
    <SlideLayout eyebrow={t.founders.sectionTitle} title={t.founders.sectionHeadline}>
      <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
        <SlidesBrandText text={t.founders.bio} />
      </p>
      <div className="slides-stagger-children mt-10 grid gap-8 sm:grid-cols-2">
        {t.founders.people.map((person) => (
          <div
            key={person.name}
            className="flex flex-col items-center gap-4 rounded-2xl border border-border/50 bg-card/30 p-6 text-center"
          >
            <img
              src={person.image}
              alt={person.name}
              className="h-36 w-36 rounded-full object-cover ring-2 ring-primary/20"
            />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary">{person.role}</p>
              <p className="mt-1 font-display text-xl font-semibold">{person.name}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}

function BrandCommunitySlide() {
  const { t } = useI18n();
  const community = t.slidesBrandDeck.community;

  return (
    <SlideLayout eyebrow={community.eyebrow} title={community.title} staggerChildren>
      <p className="max-w-3xl text-lg text-muted-foreground">{community.intro}</p>
      <dl
        className={cn(
          "mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
          "slides-stagger-children",
        )}
      >
        <div className="rounded-xl border border-border/40 bg-card/20 px-5 py-4">
          <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {t.ui.stats.members}
          </dt>
          <dd className="mt-2 font-display text-3xl font-semibold tabular-nums text-foreground">{t.stats.members}</dd>
          <dd className="mt-1 text-xs text-muted-foreground">{t.ui.stats.membersDetail}</dd>
        </div>
        <div className="rounded-xl border border-border/40 bg-card/20 px-5 py-4">
          <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {t.ui.stats.events}
          </dt>
          <dd className="mt-2 font-display text-3xl font-semibold tabular-nums text-foreground">{t.stats.eventsHeld}</dd>
          <dd className="mt-1 text-xs text-muted-foreground">{t.ui.stats.eventsDetail}</dd>
        </div>
        <div className="rounded-xl border border-border/40 bg-card/20 px-5 py-4">
          <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {t.ui.stats.projectsShipped}
          </dt>
          <dd className="mt-2 font-display text-3xl font-semibold tabular-nums text-foreground">
            {t.stats.projectsShipped}
          </dd>
          <dd className="mt-1 text-xs text-muted-foreground">{t.ui.stats.projectsShippedDetail}</dd>
        </div>
        <div className="rounded-xl border border-border/40 bg-card/20 px-5 py-4">
          <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {t.ui.stats.partners}
          </dt>
          <dd className="mt-2 font-display text-3xl font-semibold tabular-nums text-foreground">{t.stats.partners}</dd>
          <dd className="mt-1 text-xs text-muted-foreground">{t.ui.stats.partnersDetail}</dd>
        </div>
      </dl>
      <div className="space-y-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-primary">{t.lab.label}</p>
        <div className="grid gap-4 md:grid-cols-3">
          {t.lab.cards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-border/40 bg-card/20 p-5">
              <p className="font-display text-lg font-semibold text-foreground">{card.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}

function pickMainEventRows(
  slots: ReadonlyArray<{ eventName?: string; attendees?: number }>,
): Array<{ eventName: string; attendees: number }> {
  const withBadge = slots.filter(
    (s): s is { eventName: string; attendees: number } =>
      typeof s.attendees === "number" &&
      typeof s.eventName === "string" &&
      s.eventName.trim().length > 0,
  );
  const cafe = withBadge.find((s) => /café|cafe/i.test(s.eventName));
  const hackSv = withBadge.find(
    (s) => /hackathon/i.test(s.eventName) && /san salvador/i.test(s.eventName),
  );
  const main = [cafe, hackSv].filter(Boolean) as Array<{ eventName: string; attendees: number }>;
  if (main.length > 0) return main;
  return withBadge.slice(0, 2);
}

function BrandPastEventsSlide() {
  const { t } = useI18n();
  const pe = t.slidesBrandDeck.pastEvents;
  const mainRows = pickMainEventRows(t.communityProof.slots);

  return (
    <SlideLayout
      eyebrow={t.eventsGallery.badge}
      title={t.eventsGallery.title}
      staggerChildren
      contentClassName="max-w-7xl"
    >
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        <figure className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-border/50 bg-muted/30">
          <img
            src={COMMUNITY_PROOF_SLOT_IMAGES[3]}
            alt={pe.cafeCursorAlt}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[55%] bg-linear-to-t from-black to-transparent"
            aria-hidden
          />
          <figcaption className="absolute inset-x-0 bottom-0 z-10 p-3 md:p-4">
            <span className="inline-flex rounded-md border border-white/15 bg-black/45 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              {pe.cafeCursorCaption}
            </span>
          </figcaption>
        </figure>
        <figure className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-border/50 bg-muted/30">
          <img
            src={COMMUNITY_PROOF_SLOT_IMAGES[2]}
            alt={pe.hackathonSvAlt}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[55%] bg-linear-to-t from-black to-transparent"
            aria-hidden
          />
          <figcaption className="absolute inset-x-0 bottom-0 z-10 p-3 md:p-4">
            <span className="inline-flex rounded-md border border-white/15 bg-black/45 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              {pe.hackathonSvCaption}
            </span>
          </figcaption>
        </figure>
      </div>
      {mainRows.length > 0 ? (
        <ul className="grid gap-2 sm:grid-cols-2">
          {mainRows.map((slot, i) => (
            <li
              key={`${slot.eventName}-${i}`}
              className="flex items-center justify-between gap-3 rounded-lg border border-border/30 bg-card/15 px-4 py-2.5 text-sm"
            >
              <span className="min-w-0 truncate font-medium text-foreground">{slot.eventName}</span>
              <span className="shrink-0 font-mono tabular-nums text-primary">{slot.attendees}+</span>
            </li>
          ))}
        </ul>
      ) : null}
    </SlideLayout>
  );
}

function BrandCollaborationSlide() {
  const { t } = useI18n();
  const collaboration = t.slidesBrandDeck.collaboration;

  return (
    <SlideLayout eyebrow={collaboration.eyebrow} title={collaboration.title} staggerChildren>
      <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
        <SlidesBrandText text={collaboration.intro} />
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {collaboration.cards.map((card) => (
          <article key={card.title} className="rounded-2xl border border-border/50 bg-card/25 p-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary">{card.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
          </article>
        ))}
      </div>
      <div className="rounded-2xl border border-border/40 bg-card/15 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary">{collaboration.proofLabel}</p>
          <p className="font-display text-2xl font-semibold text-foreground">{t.stats.partners}</p>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {t.ecosystem.partners.map((partner) => (
            <li
              key={partner.name}
              className="rounded-full border border-border/50 bg-background/70 px-3 py-1.5 text-sm text-foreground/90"
            >
              {partner.name}
            </li>
          ))}
        </ul>
      </div>
    </SlideLayout>
  );
}

function BrandEnablementSlide() {
  const { t } = useI18n();
  const enablement = t.slidesBrandDeck.enablement;

  return (
    <SlideLayout eyebrow={enablement.eyebrow} title={enablement.title} staggerChildren>
      <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
        <SlidesBrandText text={enablement.intro} />
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        {enablement.cards.map((card) => (
          <article key={card.title} className="rounded-2xl border border-border/50 bg-card/25 p-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary">{card.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
          </article>
        ))}
      </div>
    </SlideLayout>
  );
}

function BrandContactSlide() {
  const { t } = useI18n();
  const c = t.slidesBrandDeck.contact;
  const collaborationHref = `mailto:${t.partner.email}?subject=${encodeURIComponent(c.collaborationSubject)}`;
  const enablementHref = `mailto:${t.partner.email}?subject=${encodeURIComponent(c.enablementSubject)}`;
  const socials = [
    { label: "LinkedIn", href: t.site.socials.linkedin },
    { label: "Instagram", href: t.site.socials.instagram },
    { label: "X", href: t.site.socials.twitter },
    { label: "TikTok", href: t.site.socials.tiktok },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href));

  return (
    <SlideLayout
      eyebrow={t.ui.footer.contact}
      title={<AilabsLockup className="text-4xl md:text-5xl lg:text-6xl" />}
      staggerChildren
    >
      <p className="max-w-2xl text-muted-foreground">{c.pageIntro}</p>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-border/50 bg-card/25 p-6">
          <h3 className="font-display text-lg font-semibold text-foreground">{c.communityTitle}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{c.communityHint}</p>
          <a
            href={t.site.whatsappLink}
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            target="_blank"
            rel="noreferrer"
          >
            {c.communityCta}
          </a>
          <p className="mt-4 text-sm">
            <Link to="/links" className="font-medium text-primary underline-offset-4 hover:underline">
              {t.ui.footer.links}
            </Link>
            <span className="text-muted-foreground"> — {t.site.description}</span>
          </p>
        </div>
        <div className="rounded-2xl border border-border/50 bg-card/25 p-6">
          <h3 className="font-display text-lg font-semibold text-foreground">{c.collaborationTitle}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{c.collaborationHint}</p>
          <a
            href={collaborationHref}
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
          >
            {c.collaborationCta}
          </a>
          <p className="mt-4 text-sm">
            <Link to="/partners" className="font-medium text-primary underline-offset-4 hover:underline">
              {t.partner.ctaSecondary}
            </Link>
            <span className="text-muted-foreground"> — {t.partner.email}</span>
          </p>
        </div>
        <div className="rounded-2xl border border-border/50 bg-card/25 p-6">
          <h3 className="font-display text-lg font-semibold text-foreground">{c.enablementTitle}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{c.enablementHint}</p>
          <a
            href={enablementHref}
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
          >
            {c.enablementCta}
          </a>
          <p className="mt-4 font-mono text-xs text-muted-foreground">{t.partner.email}</p>
        </div>
      </div>
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </SlideLayout>
  );
}

function BrandThanksSlide() {
  const { language } = useI18n();
  const line =
    language === "es"
      ? "Gracias por construir con curiosidad."
      : "Thanks for building with curiosity.";
  return (
    <SlideLayout contentClassName="flex flex-col items-center justify-center text-center">
      <AilabsLockup className="text-4xl opacity-90 md:text-5xl motion-safe:transition-opacity motion-safe:hover:opacity-100" />
      <h2 className="mt-10 font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">{line}</h2>
      <p className="mt-8 text-lg text-muted-foreground">ailabs.sv · @ailabs_sv</p>
    </SlideLayout>
  );
}

export const brandDeckSlides = [
  BrandCoverSlide,
  BrandWhoWeAreSlide,
  BrandOverviewSlide,
  BrandCommunitySlide,
  BrandPastEventsSlide,
  BrandCollaborationSlide,
  BrandEnablementSlide,
  BrandFoundersSlide,
  BrandContactSlide,
  BrandThanksSlide,
] as const;

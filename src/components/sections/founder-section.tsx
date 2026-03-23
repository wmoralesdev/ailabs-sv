import { useState } from "react";
import { Link } from "@tanstack/react-router";
import type { SiteContent } from "@/content/site-content";
import { formatWithBrandText } from "@/components/brand-text";
import { SectionHeader } from "@/components/section-header";
import { SocialLinks } from "@/components/social-links";
import { useI18n } from "@/lib/i18n";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

type FounderPerson = SiteContent["founders"]["people"][number];

function PartnersCtaChevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function personCtaHref(socials: FounderPerson["socials"]): string {
  return socials.website ?? socials.linkedin ?? "#";
}

function FounderProfile({ person }: { person: FounderPerson }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showPhoto = person.image && !imageFailed;
  const ctaHref = personCtaHref(person.socials);
  const hasSocials = Object.values(person.socials).some(Boolean);

  return (
    <div className="group flex flex-col">
      <div className="relative mb-6 w-full overflow-hidden rounded-2xl border border-border/40 bg-muted/20 aspect-[4/5]">
        {showPhoto ? (
          <img
            src={person.image}
            alt={person.name}
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-muted/40 text-4xl font-light text-muted-foreground">
            {getInitials(person.name)}
          </div>
        )}
        {/* Subtle inner shadow/ring for depth */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/10" />
      </div>

      <div className="flex flex-col px-1">
        <h3 className="text-xl font-medium text-foreground">{person.name}</h3>
        <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          {person.role}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            to={ctaHref as any}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            {formatWithBrandText(person.cta)}
          </Link>
          {hasSocials && (
            <>
              <span className="h-3.5 w-px bg-border/60" aria-hidden="true" />
              <SocialLinks socials={person.socials} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function FounderSection() {
  const { t } = useI18n();
  const { founders } = t;

  return (
    <section className="section-spacing border-y border-border/50 bg-muted/10 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          
          {/* Left Column: Story (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:pt-8">
            <SectionHeader
              eyebrow={founders.sectionTitle}
              title={founders.sectionHeadline}
              align="left"
              className="[&_h2]:mb-6 [&_h2]:text-balance"
            />
            <p className="mb-8 text-pretty text-lg font-light leading-relaxed text-muted-foreground">
              {formatWithBrandText(founders.bio)}
            </p>

            {/* Callout card for purpose items + partners CTA */}
            <div className="group/card relative mt-10 overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8">
              <div className="pointer-events-none absolute -inset-x-20 -top-20 h-[150px] w-[calc(100%+160px)] bg-primary/5 opacity-50 blur-3xl transition-opacity duration-500 group-hover/card:opacity-100" />

              <div className="relative z-10">
                <p className="mb-6 font-display text-lg font-medium text-foreground">
                  {founders.purposeFraming}
                </p>
                <ul className="mb-8 space-y-4 text-sm text-muted-foreground">
                  {founders.purposeItems.slice(0, -1).map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 flex size-1.5 shrink-0 rounded-full bg-primary/50" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {founders.purposeItems.length > 0 && (
                  <Link
                    to="/partners"
                    className="group flex w-full items-center justify-between gap-4 rounded-xl bg-primary/10 px-5 py-4 text-left transition-all duration-300 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="text-sm font-medium leading-snug text-primary group-hover:text-primary-foreground sm:text-base">
                      {founders.purposeItems[founders.purposeItems.length - 1]}
                    </span>
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-background/80 text-primary transition-colors group-hover:bg-primary-foreground/20 group-hover:text-primary-foreground">
                      <PartnersCtaChevron className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Founders (7 cols) */}
          <div className="lg:col-span-7 xl:col-span-6 xl:col-start-7 lg:mt-8">
            <div className="grid gap-12 sm:grid-cols-2 sm:gap-8">
              {founders.people.map((person) => (
                <FounderProfile key={person.name} person={person} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

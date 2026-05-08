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
    <div className="group surface-card flex flex-col p-3">
      <div className="relative mb-5 aspect-[4/5] w-full overflow-hidden rounded-[1.35rem] border border-border/40 bg-muted/20">
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

      <div className="flex flex-col px-3 pb-3">
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
    <section className="section-editorial overflow-hidden py-20 md:py-28">
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

            {/* Editorial callout: purpose framing + items, with a typographic
                cross-link to /partners. Replaces the previous card-in-card
                pseudo-button so the founder column reads as one column of
                connected prose, not two stacked cards. */}
            <div className="border-primary/20 relative mt-10 border-l pl-6 sm:pl-8">
              <p className="mb-6 font-display text-foreground text-lg font-medium">
                {founders.purposeFraming}
              </p>
              <ul className="mb-8 space-y-4 text-muted-foreground text-sm">
                {founders.purposeItems.slice(0, -1).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="bg-primary/50 mt-1.5 flex size-1.5 shrink-0 rounded-full" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {founders.purposeItems.length > 0 && (
                <Link
                  to="/partners"
                  className="group inline-flex items-baseline gap-3 text-base font-medium leading-snug text-primary transition-colors hover:text-primary-foreground/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-lg"
                >
                  <span className="border-b border-primary/30 pb-0.5 transition-colors group-hover:border-primary">
                    {founders.purposeItems[founders.purposeItems.length - 1]}
                  </span>
                  <PartnersCtaChevron className="size-4 shrink-0 self-center text-primary transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
                </Link>
              )}
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

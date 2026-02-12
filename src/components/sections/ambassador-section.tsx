import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/section-header";
import { cn } from "@/lib/utils";
import { SocialLinks } from "@/components/social-links";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function AmbassadorSection() {
  const { t } = useI18n();
  const [imageFailed, setImageFailed] = useState(false);
  const imageSrc = t.ambassador.image;
  const showPhoto = imageSrc && !imageFailed;

  const ctaHref =
    t.ambassador.socials.website ?? t.ambassador.socials.linkedin ?? "#";
  const hasSocials = Object.values(t.ambassador.socials).some(Boolean);

  return (
    <section className="section-spacing border-y border-border/50 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-12 md:items-center lg:gap-12">
          <div className="md:col-span-5 lg:col-span-4">
            <div
              className={cn(
                "mx-auto overflow-hidden rounded-2xl border border-primary/15 bg-muted/40",
                "aspect-square w-full max-w-xs md:max-w-none",
              )}
            >
              {showPhoto ? (
                <img
                  src={imageSrc}
                  alt={t.ambassador.name}
                  className="size-full object-cover"
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-muted/60 text-5xl font-semibold text-muted-foreground">
                  {getInitials(t.ambassador.name)}
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-7 lg:col-span-8">
            <SectionHeader
              eyebrow={t.ambassador.sectionTitle}
              title={t.ambassador.name}
              align="left"
              className="[&_h2]:mb-4"
            />
            <p className="mb-4 text-pretty text-lg font-light leading-relaxed text-muted-foreground">
              {t.ambassador.bio}
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                {t.ambassador.role}
              </span>
              <span className="text-muted-foreground/60" aria-hidden="true">
                ·
              </span>
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                {t.ambassador.cta}
              </a>
              {hasSocials && (
                <>
                  <span className="text-muted-foreground/60" aria-hidden="true">
                    ·
                  </span>
                  <SocialLinks socials={t.ambassador.socials} />
                </>
              )}
            </div>

            <div className="mt-5">
              <p className="mb-3 text-sm font-medium text-foreground/80">
                {t.ambassador.purposeFraming}
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {t.ambassador.purposeItems.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

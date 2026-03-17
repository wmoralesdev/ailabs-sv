import { HugeiconsIcon } from "@hugeicons/react";
import { MapPinIcon, PencilEdit01Icon } from "@hugeicons/core-free-icons";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { Button } from "@/components/ui/button";
import { LinkedinIcon } from "@/components/ui/linkedin-icon";
import { XIcon } from "@/components/ui/x-icon";
import { MarkdownPreview } from "@/components/ui/markdown-editor";
import type { Doc } from "convex/_generated/dataModel";
import { useI18n } from "@/lib/i18n";

type Profile = Doc<"profiles">;

type Props = {
  profile: Profile;
  showEditButton?: boolean;
  onEdit?: () => void;
  showContact?: boolean;
};

function contactHref(contact: string): string | undefined {
  if (contact.includes("@")) return `mailto:${contact}`;
  if (/^\+?[\d\s-]+$/.test(contact)) return `tel:${contact.replace(/\s/g, "")}`;
  if (contact.startsWith("http")) return contact;
  return undefined;
}

export function ProfileHero({
  profile,
  showEditButton,
  onEdit,
  showContact,
}: Props) {
  const { t } = useI18n();
  const { name, title, company, location, tagline, avatarUrl, links, contact, bio } =
    profile;
  const linkedin = links?.linkedin;
  const x = links?.x;
  const contactLink = contact && showContact ? contactHref(contact) : undefined;

  return (
    <section className="relative flex flex-1 items-center overflow-hidden">
      <AnimatedGrid />
      <div className="hero-top-fade pointer-events-none absolute inset-0 z-2" />

      <div className="container relative z-10 mx-auto px-6 py-12 md:py-16">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Left column: Avatar + Bio */}
          <div className="flex flex-col items-center md:items-start">
            {/* Avatar */}
            <div className="mb-6 motion-safe:animate-hero-in [animation-delay:80ms]">
              <div className="size-48 overflow-hidden rounded-full border-4 border-primary/20 shadow-xl shadow-primary/10 ring-4 ring-primary/10 md:size-56 lg:size-64">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt=""
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-muted text-6xl font-medium text-muted-foreground md:text-7xl lg:text-8xl">
                    {name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            {/* Bio below avatar */}
            {bio && (
              <div className="max-w-sm text-center text-sm font-light leading-relaxed text-foreground/70 motion-safe:animate-hero-in [animation-delay:350ms] md:text-left md:text-base">
                <MarkdownPreview content={bio} className="[&_a]:text-primary" />
              </div>
            )}
          </div>

          {/* Right column: Info */}
          <div className="flex flex-col items-center md:items-start">
            {/* Name */}
            <h1 className="mb-3 text-4xl font-medium leading-tight tracking-tighter motion-safe:animate-hero-in [animation-delay:140ms] md:text-5xl lg:text-6xl">
              <span className="text-foreground">{name}</span>
            </h1>

            {/* Tagline */}
            {tagline && (
              <p className="mb-3 line-clamp-2 text-base font-light italic text-muted-foreground motion-safe:animate-hero-in [animation-delay:160ms] md:text-lg">
                {tagline}
              </p>
            )}

            {/* Title @ Company */}
            {(title || company) && (
              <p className="mb-3 text-lg font-light text-muted-foreground motion-safe:animate-hero-in [animation-delay:180ms] md:text-xl">
                {[title, company].filter(Boolean).join(" @ ")}
              </p>
            )}

            {/* Location */}
            {location && (
              <p className="mb-6 flex items-center gap-2 text-sm text-muted-foreground motion-safe:animate-hero-in [animation-delay:200ms] md:text-base">
                <HugeiconsIcon icon={MapPinIcon} className="size-4" />
                <span>{location}</span>
              </p>
            )}

            {/* Social + Contact + Edit */}
            <div className="flex flex-wrap items-center gap-3 motion-safe:animate-hero-in [animation-delay:300ms]">
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex size-11 items-center justify-center rounded-lg border border-border bg-transparent text-foreground/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-accent/50 hover:text-primary hover:shadow-md"
                >
                  <LinkedinIcon className="size-5" />
                </a>
              )}
              {x && (
                <a
                  href={x}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="flex size-11 items-center justify-center rounded-lg border border-border bg-transparent text-foreground/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-accent/50 hover:text-primary hover:shadow-md"
                >
                  <XIcon className="size-5" />
                </a>
              )}
              {contactLink && (
                <a
                  href={contactLink}
                  className="flex h-11 items-center justify-center rounded-lg border border-border bg-transparent px-5 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-accent/50 hover:shadow-md"
                >
                  {t.profile?.contact ?? "Contact"}
                </a>
              )}
              {showEditButton && onEdit && (
                <Button
                  variant="outline"
                  size="default"
                  onClick={onEdit}
                  className="h-11 gap-2 px-5"
                >
                  <HugeiconsIcon icon={PencilEdit01Icon} size={18} />
                  {t.profile?.editProfile ?? "Edit profile"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

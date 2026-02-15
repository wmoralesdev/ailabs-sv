import { HugeiconsIcon } from "@hugeicons/react";
import { MapPinIcon, PencilEdit01Icon } from "@hugeicons/core-free-icons";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { Button } from "@/components/ui/button";
import { LinkedinIcon } from "@/components/ui/linkedin-icon";
import { XIcon } from "@/components/ui/x-icon";
import { DisplayChip } from "@/components/ui/toggle-chip";
import { cn } from "@/lib/utils";
import type { Doc } from "convex/_generated/dataModel";

type Profile = Doc<"profiles">;

type Props = {
  profile: Profile;
  isOwner?: boolean;
  showContact?: boolean;
  onEditProfile?: () => void;
};

const EXPERIENCE_LABELS: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  exploring: "Exploring",
  building: "Building",
  shipping: "Shipping",
};

function contactHref(contact: string): string | undefined {
  if (contact.includes("@")) return `mailto:${contact}`;
  if (/^\+?[\d\s-]+$/.test(contact)) return `tel:${contact.replace(/\s/g, "")}`;
  if (contact.startsWith("http")) return contact;
  return undefined;
}

const CARD_BASE =
  "rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm shadow-lg shadow-black/5 transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5";

function ChipCard({
  label,
  items,
  className,
  delay = 0,
}: {
  label: string;
  items: string[];
  className?: string;
  delay?: number;
}) {
  if (!items?.length) return null;
  return (
    <div
      className={cn(CARD_BASE, "flex flex-col gap-3 p-5", className, "motion-safe:animate-hero-in")}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <DisplayChip key={item} label={item} />
        ))}
      </div>
    </div>
  );
}

export function ProfileView({
  profile,
  isOwner,
  showContact,
  onEditProfile,
}: Props) {
  const {
    name,
    title,
    company,
    location,
    avatarUrl,
    links,
    contact,
    bio,
    experienceLevel,
    interests,
    tools,
    lookingFor,
    availability,
  } = profile;

  const linkedin = links?.linkedin;
  const x = links?.x;
  const contactLink = contact && showContact ? contactHref(contact) : undefined;

  return (
    <section className="relative flex flex-1 items-center overflow-hidden">
      <AnimatedGrid />
      <div className="hero-top-fade pointer-events-none absolute inset-0 z-2" />

      <div className="container relative z-10 mx-auto px-6 py-10 md:py-14 lg:py-16">
        {/* Bento Grid */}
        <div className="grid gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
          {/* Avatar Card - spans 1 col on md, 1 col on lg, tall */}
          <div
            className={cn(
              CARD_BASE,
              "flex flex-col items-center justify-center p-6 md:row-span-2 lg:row-span-2",
              "motion-safe:animate-hero-in [animation-delay:80ms]"
            )}
          >
            <span className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Profile
            </span>
            <div className="mb-4 size-40 overflow-hidden rounded-full border-4 border-primary/20 shadow-xl shadow-primary/10 ring-4 ring-primary/10 md:size-44 lg:size-52">
              {avatarUrl ? (
                <img src={avatarUrl} alt="" className="size-full object-cover" />
              ) : (
                <div className="flex size-full items-center justify-center bg-muted text-5xl font-medium text-muted-foreground md:text-6xl lg:text-7xl">
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            {/* Social links under avatar */}
            {(linkedin || x) && (
              <div className="flex items-center gap-2">
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex size-10 items-center justify-center rounded-full border border-border bg-transparent text-foreground/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-accent/50 hover:text-primary"
                  >
                    <LinkedinIcon className="size-4" />
                  </a>
                )}
                {x && (
                  <a
                    href={x}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                    className="flex size-10 items-center justify-center rounded-full border border-border bg-transparent text-foreground/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-accent/50 hover:text-primary"
                  >
                    <XIcon className="size-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Name + Title + Location Card */}
          <div
            className={cn(
              CARD_BASE,
              "flex flex-col justify-center p-6",
              bio ? "md:col-span-1 lg:col-span-1" : "md:col-span-2 lg:col-span-3",
              "motion-safe:animate-hero-in [animation-delay:140ms]"
            )}
          >
            <span className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Member
            </span>
            <h1 className="mb-2 text-3xl font-medium leading-tight tracking-tighter md:text-4xl">
              <span className="text-foreground">{name}</span>
            </h1>
            {(title || company) && (
              <p className="mb-2 text-base font-light text-muted-foreground md:text-lg">
                {[title, company].filter(Boolean).join(" @ ")}
              </p>
            )}
            {location && (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <HugeiconsIcon icon={MapPinIcon} className="size-4" />
                <span>{location}</span>
              </p>
            )}
            {/* Actions row */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {contactLink && (
                <a
                  href={contactLink}
                  className="flex h-10 items-center justify-center rounded-lg border border-border bg-transparent px-5 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-accent/50 hover:shadow-md"
                >
                  Contact
                </a>
              )}
              {isOwner && onEditProfile && (
                <Button
                  variant="outline"
                  size="default"
                  onClick={onEditProfile}
                  className="h-10 gap-2 px-5"
                >
                  <HugeiconsIcon icon={PencilEdit01Icon} size={16} />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Bio Card - wider, next to name card */}
          {bio && (
            <div
              className={cn(
                CARD_BASE,
                "flex flex-col p-6 md:col-span-1 lg:col-span-2",
                "motion-safe:animate-hero-in [animation-delay:200ms]"
              )}
            >
              <span className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                About
              </span>
              <p className="text-pretty text-sm font-light leading-relaxed text-foreground/80">
                {bio}
              </p>
            </div>
          )}

          {/* Chip Cards - varying spans */}
          {experienceLevel && (
            <ChipCard
              label="Experience"
              items={[EXPERIENCE_LABELS[experienceLevel] ?? experienceLevel]}
              delay={260}
            />
          )}

          {(interests?.length ?? 0) > 0 && (
            <ChipCard
              label="Interests"
              items={interests!}
              className="md:col-span-2 lg:col-span-2"
              delay={320}
            />
          )}

          {(tools?.length ?? 0) > 0 && (
            <ChipCard
              label="Tools"
              items={tools!}
              className="lg:col-span-2"
              delay={380}
            />
          )}

          {(lookingFor?.length ?? 0) > 0 && (
            <ChipCard
              label="Looking For"
              items={lookingFor!}
              className="md:col-span-2 lg:col-span-2"
              delay={440}
            />
          )}

          {(availability?.length ?? 0) > 0 && (
            <ChipCard
              label="Availability"
              items={availability!}
              className="lg:col-span-2"
              delay={500}
            />
          )}
        </div>
      </div>
    </section>
  );
}

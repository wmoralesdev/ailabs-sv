import { HugeiconsIcon } from "@hugeicons/react";
import { MapPinIcon, PencilEdit01Icon } from "@hugeicons/core-free-icons";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { Button } from "@/components/ui/button";
import { LinkedinIcon } from "@/components/ui/linkedin-icon";
import { XIcon } from "@/components/ui/x-icon";
import { DisplayChip } from "@/components/ui/toggle-chip";
import { MarkdownPreview } from "@/components/ui/markdown-editor";
import { BENTO_CARD_CLASS } from "@/lib/bento-card";
import { cn } from "@/lib/utils";
import type { Doc } from "convex/_generated/dataModel";
import { useI18n } from "@/lib/i18n";
import { idsToLabels } from "@/lib/onboarding-interests";
import { ProfileAchievements } from "./profile-achievements";
import { ProfileShowcase } from "./profile-showcase";

type Profile = Doc<"profiles">;

type Props = {
  profile: Profile;
  isOwner?: boolean;
  showContact?: boolean;
  onEditProfile?: () => void;
};

function getExperienceLabel(
  level: string,
  labels?: { beginner: string; intermediate: string; advanced: string; exploring: string; building: string; shipping: string }
): string {
  if (!labels) return level;
  const map: Record<string, keyof typeof labels> = {
    beginner: "beginner",
    intermediate: "intermediate",
    advanced: "advanced",
    exploring: "exploring",
    building: "building",
    shipping: "shipping",
  };
  const key = map[level];
  return key ? labels[key] : level;
}

function contactHref(contact: string): string | undefined {
  if (contact.includes("@")) return `mailto:${contact}`;
  if (/^\+?[\d\s-]+$/.test(contact)) return `tel:${contact.replace(/\s/g, "")}`;
  if (contact.startsWith("http")) return contact;
  return undefined;
}

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
      className={cn(BENTO_CARD_CLASS, "flex flex-col gap-3 p-5", className, "motion-safe:animate-hero-in")}
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
  const { t } = useI18n();
  const {
    name,
    title,
    company,
    location,
    tagline,
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

  const interestsLabels = idsToLabels(interests ?? [], t.onboarding.interests.interests);
  const toolsLabels = idsToLabels(tools ?? [], t.onboarding.interests.tools);
  const lookingForLabels = idsToLabels(lookingFor ?? [], t.onboarding.interests.lookingFor);
  const availabilityLabels = idsToLabels(availability ?? [], t.onboarding.interests.availability);

  const linkedin = links?.linkedin;
  const x = links?.x;
  const contactLink = contact && showContact ? contactHref(contact) : undefined;

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero section with bento grid */}
      <section className="relative overflow-hidden">
        <AnimatedGrid />
        <div className="hero-top-fade pointer-events-none absolute inset-0 z-2" />

        <div className="container relative z-10 mx-auto px-6 py-10 md:py-14 lg:py-16">
          {/* Bento Grid */}
          <div className="grid gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
          {/* Avatar - spans 1 col, square, fills grid placement */}
          <div
            className={cn(
              "w-full aspect-square md:row-span-2 md:min-h-0",
              "motion-safe:animate-hero-in [animation-delay:80ms]"
            )}
          >
            <div className="size-full overflow-hidden rounded-lg border border-border/60 shadow-xl shadow-black/5">
              {avatarUrl ? (
                <img src={avatarUrl} alt="" className="size-full object-cover" />
              ) : (
                <div className="flex size-full items-center justify-center bg-muted text-5xl font-medium text-muted-foreground md:text-6xl lg:text-7xl">
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Name + Title + Location Card */}
          <div
            className={cn(
              BENTO_CARD_CLASS,
              "flex flex-col justify-center p-6",
              bio ? "md:col-span-1 lg:col-span-1" : "md:col-span-2 lg:col-span-3",
              "motion-safe:animate-hero-in [animation-delay:140ms]"
            )}
          >
            <span className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {t.profile?.member ?? "Member"}
            </span>
            <h1 className="mb-2 text-3xl font-medium leading-tight tracking-tighter md:text-4xl">
              <span className="text-foreground">{name}</span>
            </h1>
            {tagline && (
              <p className="mb-2 line-clamp-2 text-sm font-light italic text-muted-foreground">
                {tagline}
              </p>
            )}
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
                  {t.profile?.contact ?? "Contact"}
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
                  {t.profile?.editProfile ?? "Edit profile"}
                </Button>
              )}
            </div>
          </div>

          {/* About Card - bio + socials */}
          {(bio || linkedin || x) && (
            <div
              className={cn(
                BENTO_CARD_CLASS,
                "flex flex-col p-6 md:col-span-1 lg:col-span-2",
                "motion-safe:animate-hero-in [animation-delay:200ms]"
              )}
            >
              <span className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {t.profile?.about ?? "About"}
              </span>
              {bio && (
                <MarkdownPreview
                  content={bio}
                  className="text-pretty text-sm font-light leading-relaxed text-foreground/80 prose-p:my-1.5"
                />
              )}
              {(linkedin || x) && (
                <div className={cn("flex items-center gap-2", bio && "mt-4")}>
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
          )}

          {/* Chip Cards - varying spans */}
          {experienceLevel && (
            <ChipCard
              label={t.profile?.experience ?? "Experience"}
              items={[getExperienceLabel(experienceLevel, t.profile?.experienceLabels)]}
              delay={260}
            />
          )}

          {(interestsLabels.length ?? 0) > 0 && (
            <ChipCard
              label={t.profile?.interests ?? "Interests"}
              items={interestsLabels}
              className="md:col-span-2 lg:col-span-2"
              delay={320}
            />
          )}

          {(toolsLabels.length ?? 0) > 0 && (
            <ChipCard
              label={t.profile?.tools ?? "Tools"}
              items={toolsLabels}
              className="lg:col-span-2"
              delay={380}
            />
          )}

          {(lookingForLabels.length ?? 0) > 0 && (
            <ChipCard
              label={t.profile?.lookingFor ?? "Looking for"}
              items={lookingForLabels}
              className="md:col-span-2 lg:col-span-2"
              delay={440}
            />
          )}

          {(availabilityLabels.length ?? 0) > 0 && (
            <ChipCard
              label={t.profile?.availability ?? "Availability"}
              items={availabilityLabels}
              className="lg:col-span-2"
              delay={500}
            />
          )}

          {/* Achievements Card */}
          <ProfileAchievements
            className="hidden md:col-span-2 lg:col-span-2"
            delay={560}
          />
          </div>
        </div>
      </section>

      {/* Showcase section - outside hero background */}
      <section className="container mx-auto px-6 pb-16" aria-label="Projects">
        <ProfileShowcase ownerId={profile.ownerId} isOwner={!!isOwner} />
      </section>
    </div>
  );
}

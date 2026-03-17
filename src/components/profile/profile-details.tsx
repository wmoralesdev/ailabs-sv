import type { Doc } from "convex/_generated/dataModel";
import { useI18n } from "@/lib/i18n";
import { idsToLabels } from "@/lib/onboarding-interests";
import { DisplayChip } from "@/components/ui/toggle-chip";

type Profile = Doc<"profiles">;

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

type Props = {
  profile: Profile;
};

function ChipGroup({
  label,
  items,
  delay = 400,
}: {
  label: string;
  items: string[];
  delay?: number;
}) {
  if (!items?.length) return null;
  return (
    <div
      className="flex flex-col gap-2 motion-safe:animate-hero-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <DisplayChip key={item} label={item} />
        ))}
      </div>
    </div>
  );
}

export function ProfileDetails({ profile }: Props) {
  const { t } = useI18n();
  const {
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

  const hasAnyDetails =
    experienceLevel ||
    (interests?.length ?? 0) > 0 ||
    (tools?.length ?? 0) > 0 ||
    (lookingFor?.length ?? 0) > 0 ||
    (availability?.length ?? 0) > 0;

  if (!hasAnyDetails) return null;

  return (
    <section className="border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-6 py-8 md:py-10">
        <div className="flex flex-wrap items-start gap-x-10 gap-y-6 md:gap-x-14 lg:gap-x-16">
          {/* Experience */}
          {experienceLevel && (
            <ChipGroup
              label={t.profile?.experience ?? "Experience"}
              items={[getExperienceLabel(experienceLevel, t.profile?.experienceLabels)]}
              delay={400}
            />
          )}

          {(interestsLabels.length ?? 0) > 0 && (
            <ChipGroup label={t.profile?.interests ?? "Interests"} items={interestsLabels} delay={450} />
          )}

          {(toolsLabels.length ?? 0) > 0 && (
            <ChipGroup label={t.profile?.tools ?? "Tools"} items={toolsLabels} delay={500} />
          )}

          {(lookingForLabels.length ?? 0) > 0 && (
            <ChipGroup label={t.profile?.lookingFor ?? "Looking for"} items={lookingForLabels} delay={550} />
          )}

          {(availabilityLabels.length ?? 0) > 0 && (
            <ChipGroup label={t.profile?.availability ?? "Availability"} items={availabilityLabels} delay={600} />
          )}
        </div>
      </div>
    </section>
  );
}

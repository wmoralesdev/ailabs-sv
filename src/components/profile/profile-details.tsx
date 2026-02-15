import type { Doc } from "convex/_generated/dataModel";
import { DisplayChip } from "@/components/ui/toggle-chip";

type Profile = Doc<"profiles">;

const EXPERIENCE_LABELS: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  exploring: "Exploring",
  building: "Building",
  shipping: "Shipping",
};

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
  const {
    experienceLevel,
    interests,
    tools,
    lookingFor,
    availability,
  } = profile;

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
              label="Experience"
              items={[EXPERIENCE_LABELS[experienceLevel] ?? experienceLevel]}
              delay={400}
            />
          )}

          {/* Interests */}
          {(interests?.length ?? 0) > 0 && (
            <ChipGroup label="Interests" items={interests!} delay={450} />
          )}

          {/* Tools */}
          {(tools?.length ?? 0) > 0 && (
            <ChipGroup label="Tools" items={tools!} delay={500} />
          )}

          {/* Looking For */}
          {(lookingFor?.length ?? 0) > 0 && (
            <ChipGroup label="Looking For" items={lookingFor!} delay={550} />
          )}

          {/* Availability */}
          {(availability?.length ?? 0) > 0 && (
            <ChipGroup label="Availability" items={availability!} delay={600} />
          )}
        </div>
      </div>
    </section>
  );
}

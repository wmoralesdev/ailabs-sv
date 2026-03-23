"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Award01Icon, Calendar03Icon } from "@hugeicons/core-free-icons";
import { useI18n } from "@/lib/i18n";
import { BENTO_CARD_CLASS } from "@/lib/bento-card";
import { cn } from "@/lib/utils";

type ProfileAchievementsProps = {
  className?: string;
  delay?: number;
};

export function ProfileAchievements({ className, delay = 0 }: ProfileAchievementsProps) {
  const { t } = useI18n();

  // TODO: In the future, this will receive events data from props or query
  const events: Array<unknown> = [];

  return (
    <div
      className={cn(
        BENTO_CARD_CLASS,
        "flex flex-col p-5",
        className,
        "motion-safe:animate-hero-in"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2 mb-4">
        <HugeiconsIcon icon={Award01Icon} size={18} className="text-primary" />
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          {t.profile?.achievements ?? "Achievements"}
        </span>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
          <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted/50">
            <HugeiconsIcon
              icon={Calendar03Icon}
              size={24}
              className="text-muted-foreground"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {t.profile?.achievementsEmpty ?? "No achievements yet"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            {t.profile?.eventsAttended ?? "Events attended"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Future: Map over events and display achievement badges */}
        </div>
      )}
    </div>
  );
}

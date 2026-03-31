import { HugeiconsIcon } from "@hugeicons/react";
import { UserIcon } from "@hugeicons/core-free-icons";
import type {
  CommunityProofSlot,
  Language,
  SiteContent,
} from "@/content/site-content";
import { cn } from "@/lib/utils";

type CommunityProofSlotKey = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/** Public assets under `/community/`; shared with slides deck for the same event↔photo pairing. */
export const COMMUNITY_PROOF_SLOT_IMAGES: Record<CommunityProofSlotKey, string> = {
  1: "/community/community-proof-slot-1.jpg",
  2: "/community/community-proof-slot-2.jpg",
  3: "/community/community-proof-slot-3.jpg",
  4: "/community/community-proof-slot-4.jpg",
  5: "/community/community-proof-slot-5.jpg",
  6: "/community/community-proof-slot-6.jpeg",
  7: "/community/community-proof-slot-7.jpeg",
};

/** For `<img>` later: `object-cover` + optional crop toward this ratio — does not drive layout. */
export type CommunityProofPhotoHint = "4:3" | "16:9" | "3:4";

type BentoCell = {
  slot: CommunityProofSlotKey;
  /** Grid placement (mobile + md). Cells stretch to fill their area — no fixed aspect-ratio on the frame. */
  className: string;
  photoHint: CommunityProofPhotoHint;
};

/**
 * Shared 7-slot bento: 4×3 grid, equal row heights.
 * md: slot 1 hero (2×2); slots 2 & 7 portrait strips (col 3 rows 1–2, col 4 rows 2–3);
 * slot 3 top-right; slots 4–6 bottom row (cols 1–3). No thin wide “slot 4 bar”.
 * Mobile: 2 columns — hero full width, then pairs 2–3, 4–5, 6–7.
 */
const BENTO_CELLS: Array<BentoCell> = [
  {
    slot: 1,
    className:
      "col-span-2 md:col-span-2 md:row-span-2 md:col-start-1 md:row-start-1 md:row-end-3",
    photoHint: "4:3",
  },
  {
    slot: 2,
    className: "col-span-1 md:col-start-3 md:row-start-1 md:row-end-3",
    photoHint: "3:4",
  },
  {
    slot: 3,
    className: "col-span-1 md:col-start-4 md:row-start-1 md:row-end-2",
    photoHint: "4:3",
  },
  {
    slot: 4,
    className: "col-span-1 md:col-start-1 md:row-start-3 md:row-end-4",
    photoHint: "4:3",
  },
  {
    slot: 5,
    className: "col-span-1 md:col-start-2 md:row-start-3 md:row-end-4",
    photoHint: "4:3",
  },
  {
    slot: 6,
    className: "col-span-1 md:col-start-3 md:row-start-3 md:row-end-4",
    photoHint: "4:3",
  },
  {
    slot: 7,
    className: "col-span-1 md:col-start-4 md:row-start-2 md:row-end-4",
    photoHint: "3:4",
  },
];

export type CommunityProofBentoSlots = SiteContent["communityProof"]["slots"];

export interface CommunityProofBentoGridProps {
  slots: CommunityProofBentoSlots;
  language: Language;
  className?: string;
}

function formatAttendeeCount(n: number, language: Language): string {
  return n.toLocaleString(language === "es" ? "es-SV" : "en-US");
}

function hasApprovedBadge(
  slot: CommunityProofSlot,
): slot is CommunityProofSlot & { eventName: string; attendees: number } {
  return (
    typeof slot.attendees === "number" &&
    typeof slot.eventName === "string" &&
    slot.eventName.trim().length > 0
  );
}

export function CommunityProofBentoGrid({
  slots,
  language,
  className,
}: CommunityProofBentoGridProps) {

  return (
    <div
      className={cn(
        "grid min-w-0 grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4",
        "md:min-h-[min(32rem,70vh)] md:grid-rows-3",
        className,
      )}
    >
      {BENTO_CELLS.map(({ slot, className: cellClass, photoHint }, index) => {
        const slotContent = slots[slot - 1];
        const showBadge = hasApprovedBadge(slotContent);
        const attendeeLabel = showBadge
          ? formatAttendeeCount(slotContent.attendees, language)
          : "";
        return (
          <div key={slot} className={cn("min-h-0 min-w-0", cellClass)}>
            <div
              data-slot={slot}
              data-photo-hint={photoHint}
              style={{
                animationDelay: `${80 + index * 55}ms`,
              }}
              className={cn(
                "group relative h-full w-full overflow-hidden rounded-2xl border border-border/50 bg-muted/40 shadow-inner shadow-black/5 transition-[box-shadow,border-color] duration-300 motion-safe:animate-hero-in motion-reduce:animate-none dark:bg-muted/25",
                "motion-safe:hover:border-primary/25 motion-safe:hover:shadow-md motion-safe:hover:shadow-primary/5",
                "min-h-[7.25rem] md:min-h-0",
              )}
            >
              <img
                src={COMMUNITY_PROOF_SLOT_IMAGES[slot]}
                alt={slotContent.imageAlt}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
                fetchPriority={slot === 1 ? "high" : undefined}
                loading={slot === 1 ? "eager" : "lazy"}
                decoding="async"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[55%] bg-linear-to-t from-black to-transparent"
                aria-hidden
              />
              <span
                className="absolute inset-0 z-[2] bg-linear-to-br from-primary/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
              {showBadge ? (
                <>
                  <span className="sr-only">
                    {slotContent.eventName}, {attendeeLabel}{" "}
                    {language === "es" ? "asistentes" : "attendees"}
                  </span>
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-2 pt-8 sm:p-2.5 sm:pt-10"
                    aria-hidden
                  >
                    <div
                      className="font-display inline-flex max-w-full min-w-0 items-center gap-2 rounded-md border border-white/15 bg-black/45 px-2.5 py-1.5 text-[10px] font-medium leading-tight text-white shadow-sm backdrop-blur-sm sm:gap-3 sm:text-xs"
                    >
                      <span className="min-w-0 flex-1 truncate">
                        {slotContent.eventName}
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1 border-l border-white/20 pl-2 tabular-nums text-white/95">
                        <HugeiconsIcon
                          icon={UserIcon}
                          size={12}
                          className="shrink-0 text-white/90"
                          aria-hidden
                        />
                        {attendeeLabel}
                      </span>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

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

export type CommunityProofBentoSlots = SiteContent["communityProof"]["slots"];

export interface CommunityProofBentoGridProps {
  slots: CommunityProofBentoSlots;
  language: Language;
  className?: string;
}

function formatAttendeeCount(n: number, language: Language): string {
  return n.toLocaleString(language === "es" ? "es-SV" : "en-US");
}

function hasCaption(
  slot: CommunityProofSlot,
): slot is CommunityProofSlot & { eventName: string; attendees: number } {
  return (
    typeof slot.attendees === "number" &&
    typeof slot.eventName === "string" &&
    slot.eventName.trim().length > 0
  );
}

/**
 * Single-hero photo composition that replaces the previous 7-tile bento.
 * Slot 1 anchors the section in color at full bleed; slots 2–7 sit beneath
 * as a thin row of grayscale supports that colorize on hover.
 *
 * Same overlay vocabulary as `ShowcaseTeaserCard`: dark gradient, display
 * caps event name, monospace attendee meta. The bento grid lattice is
 * intentionally gone — we commit to one image and treat the rest as
 * additional proof.
 */
export function CommunityProofBentoGrid({
  slots,
  language,
  className,
}: CommunityProofBentoGridProps) {
  const heroSlot = slots[0];
  const supports = slots.slice(1) as ReadonlyArray<CommunityProofSlot>;
  const heroIndex: CommunityProofSlotKey = 1;

  const builderLabel = language === "es" ? "asistentes" : "attendees";
  const heroEyebrow = language === "es" ? "Momento del lab" : "Lab moment";

  return (
    <div className={cn("flex flex-col gap-3 sm:gap-4", className)}>
      <CommunityProofHero
        slot={heroSlot}
        slotKey={heroIndex}
        eyebrow={heroEyebrow}
        builderLabel={builderLabel}
        language={language}
      />
      <ul className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-6">
        {supports.map((slot, index) => {
          const slotKey = (index + 2) as CommunityProofSlotKey;
          return (
            <li
              key={slotKey}
              className="motion-safe:animate-hero-in min-w-0"
              style={{ animationDelay: `${160 + index * 55}ms` }}
            >
              <CommunityProofSupport slot={slot} slotKey={slotKey} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function CommunityProofHero({
  slot,
  slotKey,
  eyebrow,
  builderLabel,
  language,
}: {
  slot: CommunityProofSlot;
  slotKey: CommunityProofSlotKey;
  eyebrow: string;
  builderLabel: string;
  language: Language;
}) {
  const captionable = hasCaption(slot);

  return (
    <figure
      data-slot={slotKey}
      className="surface-card group relative aspect-[16/9] overflow-hidden p-0 motion-safe:animate-hero-in [animation-delay:80ms] md:aspect-[2.4/1]"
    >
      <img
        src={COMMUNITY_PROOF_SLOT_IMAGES[slotKey]}
        alt={slot.imageAlt}
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        draggable={false}
        fetchPriority="high"
        loading="eager"
        decoding="async"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-linear-to-t from-black via-black/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/55 to-transparent"
      />
      {captionable ? (
        <figcaption className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-3 p-6 text-white sm:p-8 md:p-10">
          <p className="text-[10px] font-medium tracking-[0.22em] text-white/65 uppercase">
            {eyebrow}
          </p>
          <h3 className="font-display text-2xl leading-tight font-medium tracking-[-0.02em] uppercase sm:text-3xl md:text-4xl lg:text-5xl">
            {slot.eventName}
          </h3>
          <div className="flex items-center gap-3 text-white/75">
            <span className="font-mono text-base font-semibold tabular-nums sm:text-lg">
              {formatAttendeeCount(slot.attendees, language)}
            </span>
            <span className="bg-white/30 size-px h-4 w-px" aria-hidden />
            <span className="text-[10px] font-medium tracking-[0.18em] uppercase">
              {builderLabel}
            </span>
          </div>
        </figcaption>
      ) : null}
    </figure>
  );
}

function CommunityProofSupport({
  slot,
  slotKey,
}: {
  slot: CommunityProofSlot;
  slotKey: CommunityProofSlotKey;
}) {
  const captionable = hasCaption(slot);

  return (
    <figure
      data-slot={slotKey}
      className="border-border/50 bg-muted/30 group relative aspect-[4/3] overflow-hidden rounded-2xl border"
    >
      <img
        src={COMMUNITY_PROOF_SLOT_IMAGES[slotKey]}
        alt={slot.imageAlt}
        className="absolute inset-0 size-full object-cover grayscale transition duration-500 group-hover:scale-[1.05] group-hover:grayscale-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        draggable={false}
        loading="lazy"
        decoding="async"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-t from-black/95 via-black/55 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"
      />
      {captionable ? (
        <figcaption className="absolute inset-x-0 bottom-0 z-10 px-3 pb-2.5 text-white sm:px-4 sm:pb-3">
          <span className="font-display text-[11px] leading-tight font-medium tracking-tight text-balance line-clamp-2 sm:text-xs md:text-sm">
            {slot.eventName}
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}

import { useI18n } from "@/lib/i18n";
import { CommunityProofBentoGrid } from "@/components/community-proof-bento-grid";
import { SectionHeader } from "@/components/section-header";

export type { CommunityProofPhotoHint } from "@/components/community-proof-bento-grid";

interface CommunityProofBentoSectionProps {
  /** Section id for anchors / `aria-labelledby`. */
  id?: string;
}

export function CommunityProofBentoSection({
  id = "community-proof",
}: CommunityProofBentoSectionProps) {
  const { t, language } = useI18n();
  const copy = t.communityProof;
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="section-spacing relative overflow-hidden border-y border-border/50 bg-muted/10"
    >
      {/* Subtle grain + mesh atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.22]"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 20% 30%, oklch(0.55 0.12 280 / 0.12), transparent 55%),
            radial-gradient(ellipse 70% 50% at 85% 70%, oklch(0.5 0.1 260 / 0.1), transparent 50%),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 1px,
              oklch(0.5 0 0 / 0.03) 1px,
              oklch(0.5 0 0 / 0.03) 2px
            )
          `,
        }}
      />
      <div className="container relative z-10 mx-auto px-4">
        <SectionHeader
          eyebrow={copy.eyebrow}
          title={<span id={headingId}>{copy.title}</span>}
          align="left"
        />

        <CommunityProofBentoGrid slots={copy.slots} language={language} />
      </div>
    </section>
  );
}

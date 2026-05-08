import { useI18n } from '@/lib/i18n'
import { CommunityProofBentoGrid } from '@/components/community-proof-bento-grid'
import { SectionHeader } from '@/components/section-header'
import testimonialsEs from '@/content/testimonials.es.json'
import testimonialsEn from '@/content/testimonials.en.json'

interface VoicesSectionProps {
  /** Section id for anchors / aria-labelledby. */
  id?: string
}

/**
 * Single homepage social-proof section. Combines the event-photo bento
 * with one featured testimonial rendered as a typographic moment (no card,
 * no marquee). Replaces the previous trio of CommunityProofBentoSection +
 * CommunityMembersSection + TestimonialsSection.
 *
 * One bento, one quote. The brand-spine commitment is "one marquee per
 * page max"; this surface uses none. The homepage stays builder-first
 * with proof rendered as a moment instead of a list of cards.
 */
export function VoicesSection({ id = 'voices' }: VoicesSectionProps) {
  const { t, language } = useI18n()
  const copy = t.communityProof
  const headingId = `${id}-heading`

  const testimonials = language === 'es' ? testimonialsEs : testimonialsEn
  const featured = testimonials[0]

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="section-spacing border-border/50 relative overflow-hidden border-y bg-muted/10"
    >
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

        <FeaturedTestimonial
          quote={featured.testimonial}
          name={featured.name}
          title={featured.title}
          avatar={featured.avatar}
        />
      </div>
    </section>
  )
}

function FeaturedTestimonial({
  quote,
  name,
  title,
  avatar,
}: {
  quote: string
  name: string
  title: string
  avatar?: string
}) {
  return (
    <figure className="mx-auto mt-20 max-w-3xl text-balance">
      <span
        aria-hidden
        className="text-primary/30 font-display block text-7xl leading-none select-none"
      >
        “
      </span>
      <blockquote className="font-display text-foreground -mt-3 text-2xl leading-snug font-medium tracking-[-0.02em] md:text-3xl md:leading-tight">
        {quote}
      </blockquote>
      <figcaption className="text-muted-foreground mt-6 flex items-center gap-3 text-sm">
        {avatar ? (
          <img
            src={avatar}
            alt=""
            className="size-9 rounded-full object-cover"
          />
        ) : null}
        <span>
          <span className="text-foreground font-medium">{name}</span>
          <span className="text-foreground/40 mx-2">·</span>
          <span>{title}</span>
        </span>
      </figcaption>
    </figure>
  )
}

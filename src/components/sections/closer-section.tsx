import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRightIcon, ArrowUpRightIcon } from '@hugeicons/core-free-icons'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'
import { WHATSAPP_LINK } from '@/lib/links'

/**
 * Final section of the homepage. One full-bleed contrast band with the
 * builder CTA on top and a single small line for non-builders below
 * (cross-linking to /work-with-us and /partners). Replaces JoinCtaSection,
 * FinalPathsSection, and HighlightsSection.
 *
 * Per the brand-spine: builder-first, no card grids, no logo strip here
 * (the CredibilityBand under the hero already did that job).
 */
export function CloserSection() {
  const { t, language } = useI18n()

  const headline =
    language === 'es'
      ? 'Trae tu pregunta. Encontrá con quién construir.'
      : 'Bring your question. Find someone to build with.'
  const finePrint =
    language === 'es'
      ? 'WhatsApp abierto. Sin gatekeeping. Solo gente curiosa.'
      : 'Open WhatsApp. No gatekeeping. Just curious people.'
  const ctaLabel =
    language === 'es' ? 'Únete al WhatsApp' : 'Join the WhatsApp'
  const teamLabel = language === 'es' ? 'Vienes de un equipo' : 'From a team'
  const partnerLabel =
    language === 'es' ? 'Tenés recursos que aportar' : 'Have resources to share'

  return (
    <section className="section-contrast py-20 md:py-28">
      <div
        className="bg-join-cta-gradient motion-safe:animate-pulse-slow absolute inset-0 z-0 opacity-70 motion-reduce:animate-none"
        aria-hidden
      />
      <div
        className="dotted-field absolute inset-0 z-0 opacity-20"
        aria-hidden
      />
      <div className="relative z-10 container mx-auto flex flex-col items-center gap-8 px-4 text-center">
        <h2 className="font-display text-display-section text-background max-w-3xl text-balance">
          {headline}
        </h2>
        <Button
          size="3xl"
          className="bg-primary-foreground text-primary px-10 text-lg shadow-lg shadow-black/15 hover:shadow-black/25 dark:bg-primary dark:text-primary-foreground"
          render={
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          {ctaLabel}
          <HugeiconsIcon
            icon={ArrowUpRightIcon}
            size={22}
            data-icon="inline-end"
          />
        </Button>
        <p className="text-background/70 text-sm font-light">{finePrint}</p>

        <div className="border-background/15 mt-4 flex flex-col gap-3 border-t pt-6 text-sm sm:flex-row sm:gap-8">
          <Link
            to="/work-with-us"
            className="text-background/70 hover:text-background inline-flex items-center gap-1.5 transition-colors"
          >
            <span>{teamLabel}</span>
            <span className="text-background/40">→</span>
            <span className="font-medium underline underline-offset-4">
              /work-with-us
            </span>
          </Link>
          <span aria-hidden className="text-background/30 hidden sm:inline">
            ·
          </span>
          <Link
            to="/partners"
            className="text-background/70 hover:text-background inline-flex items-center gap-1.5 transition-colors"
          >
            <span>{partnerLabel}</span>
            <span className="text-background/40">→</span>
            <span className="font-medium underline underline-offset-4">
              /partners
            </span>
          </Link>
        </div>
      </div>

      {/* Suppress unused warning for the i18n hook — copy is inlined for now,
          Phase 3 copy pass will move strings into site-content.ts. */}
      <span hidden aria-hidden>
        {t.site.name}
        <HugeiconsIcon icon={ArrowRightIcon} className="size-4" />
      </span>
    </section>
  )
}

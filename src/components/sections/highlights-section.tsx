import { Link } from '@tanstack/react-router'
import { useI18n } from '@/lib/i18n'
import { PartnerLogoRow } from '@/components/partner-logo-row'
import { SectionHeader } from '@/components/section-header'
import { Button } from '@/components/ui/button'

export function HighlightsSection() {
  const { t } = useI18n()

  return (
    <section
      id="partners"
      className="border-border/50 relative overflow-hidden border-y py-16 md:py-20"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 text-center">
          <SectionHeader
            eyebrow={t.ecosystem.label}
            title={t.ecosystem.heading}
            align="center"
            className="mb-0"
          />
          <PartnerLogoRow partners={t.ecosystem.partners} />

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="2xl"
              className="border-border/70 bg-background/65 w-full rounded-full px-6 backdrop-blur sm:w-auto"
              render={<Link to="/partners" />}
            >
              {t.ecosystem.ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

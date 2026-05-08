import { PartnerLogoRow } from '@/components/partner-logo-row'

type Partner = {
  name: string
  url: string
}

type PartnerLogoStackProps = {
  partners: Array<Partner>
  caption: string
  description: string
}

export function PartnerLogoStack({
  partners,
  caption,
  description,
}: PartnerLogoStackProps) {
  return (
    <aside className="border-border/70 bg-background/55 motion-safe:animate-hero-in hidden rounded-[1.35rem] border p-5 backdrop-blur [animation-delay:220ms] md:block">
      <p className="eyebrow-label text-primary mb-5">{caption}</p>
      <div className="border-border/70 bg-card/65 rounded-[1.1rem] border p-5">
        <PartnerLogoRow
          partners={partners.slice(0, 6)}
          showSvgMarks
          className="mx-auto gap-7 sm:flex-col sm:gap-7"
        />
      </div>
      <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
        {description}
      </p>
    </aside>
  )
}

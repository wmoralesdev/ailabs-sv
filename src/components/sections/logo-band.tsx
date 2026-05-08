import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { PartnerLogoRow } from '@/components/partner-logo-row'
import { SectionHeader } from '@/components/section-header'

interface Partner {
  name: string
  url: string
}

interface LogoBandProps {
  partners: Array<Partner>
  /** Optional small caps eyebrow above the title. */
  eyebrow?: string
  /** Optional section title (kept short — this is a logo strip, not a hero). */
  title?: ReactNode
  /** Optional one-liner under the title. */
  description?: ReactNode
  /** When true, draws a `section-spacing` bordered band. When false, renders
   *  the logo row inline with no surrounding chrome (useful inside a hero
   *  aside or footer). */
  asSection?: boolean
  /** Pass through to PartnerLogoRow. */
  showSvgMarks?: boolean
  className?: string
  id?: string
  align?: 'left' | 'center'
}

/**
 * Canonical place partner logos live. Replaces ad-hoc logo strips that
 * repeat across the site (Highlights, Partners hero, Partners "quiénes han
 * ayudado", etc.). One band per page, no card surrounding.
 */
export function LogoBand({
  partners,
  eyebrow,
  title,
  description,
  asSection = true,
  showSvgMarks = false,
  className,
  id,
  align = 'center',
}: LogoBandProps) {
  const wrapperClass = asSection
    ? 'section-spacing border-border/50 border-y'
    : ''

  return (
    <section id={id} className={cn(wrapperClass, className)}>
      <div className="container mx-auto px-4">
        <div
          className={cn(
            'flex flex-col gap-8',
            align === 'center' && 'items-center text-center',
          )}
        >
          {eyebrow || title || description ? (
            <SectionHeader
              eyebrow={eyebrow}
              title={title ?? ''}
              description={description}
              align={align}
              className="mb-0"
            />
          ) : null}
          <PartnerLogoRow partners={partners} showSvgMarks={showSvgMarks} />
        </div>
      </div>
    </section>
  )
}

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { SectionHeader } from '@/components/section-header'

export interface StatBandItem {
  /** Headline number, e.g. `600+`. */
  value: string
  /** Short label, e.g. `BUILDERS`. Rendered uppercase via `.eyebrow-label`. */
  label: string
  /** Optional sub-line, e.g. attribution or context. */
  caption?: ReactNode
}

interface StatBandProps {
  items: Array<StatBandItem>
  eyebrow?: string
  title?: ReactNode
  description?: ReactNode
  /** When true, the band sits inside `.section-panel` styling instead of a
   *  thin bordered strip. Use for subpages where the band is the section. */
  asSection?: boolean
  className?: string
  id?: string
}

/**
 * Full-bleed stat band: 3–4 KPIs in a row with no surrounding card. Used on
 * subpages and at the top of the homepage hero (when builders / events /
 * aliados counts go inline) instead of a card grid.
 */
export function StatBand({
  items,
  eyebrow,
  title,
  description,
  asSection = false,
  className,
  id,
}: StatBandProps) {
  const wrapperClass = asSection
    ? 'section-panel py-20 md:py-28'
    : 'border-border/60 border-y bg-background/40 py-12 md:py-16'

  return (
    <section id={id} className={cn(wrapperClass, className)}>
      <div className="container mx-auto px-4">
        {title || eyebrow || description ? (
          <SectionHeader
            eyebrow={eyebrow}
            title={title ?? ''}
            description={description}
            align="left"
          />
        ) : null}
        <dl
          className={cn(
            'grid gap-8 sm:grid-cols-2 lg:gap-12',
            items.length === 3 && 'lg:grid-cols-3',
            items.length === 4 && 'lg:grid-cols-4',
          )}
        >
          {items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-start gap-1.5"
            >
              <dt className="font-display text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
                {item.value}
              </dt>
              <dd className="eyebrow-label text-primary">{item.label}</dd>
              {item.caption ? (
                <p className="text-muted-foreground mt-1 text-sm font-light">
                  {item.caption}
                </p>
              ) : null}
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

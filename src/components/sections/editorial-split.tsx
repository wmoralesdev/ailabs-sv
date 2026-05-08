import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { SectionHeader } from '@/components/section-header'

interface EditorialSplitProps {
  /** Optional small caps eyebrow above the title. */
  eyebrow?: string
  /** Section title; rendered through SectionHeader. */
  title: ReactNode
  /** Lead paragraph rendered as body text under the title. */
  body?: ReactNode
  /** Optional row of CTAs rendered under the body. Pass already-styled
   *  Buttons or links so this primitive stays presentational. */
  actions?: ReactNode
  /** Right-column content: image, quote, KPI, or any block. */
  aside?: ReactNode
  /** Visual scale: `lg` upgrades the title to display-section size. */
  size?: 'default' | 'lg'
  /** Override the section width or padding from the outside. */
  className?: string
  /** Anchor id for in-page navigation. */
  id?: string
  /** Reverse the column order: aside on the left, copy on the right. */
  asideFirst?: boolean
  /** Section background treatment. Defaults to `panel`. */
  surface?: 'panel' | 'editorial' | 'plain'
}

/**
 * Two-column editorial section. The left column is a SectionHeader plus
 * optional body and actions; the right column is a single block (image,
 * quote, KPI). Lives in the section primitive set defined in
 * docs/brand-spine.md and the UI consolidation plan.
 *
 * Use this whenever a section's job is to make one argument with one piece
 * of supporting evidence — Why on the homepage, Founder, the Work-with-us
 * value prop. If the section needs more than one piece of evidence, it
 * probably wants a different primitive (a list, a bento, a logo band).
 */
export function EditorialSplit({
  eyebrow,
  title,
  body,
  actions,
  aside,
  size = 'default',
  className,
  id,
  asideFirst = false,
  surface = 'panel',
}: EditorialSplitProps) {
  const surfaceClass =
    surface === 'editorial'
      ? 'section-editorial'
      : surface === 'panel'
        ? 'section-panel'
        : ''

  return (
    <section
      id={id}
      className={cn(surfaceClass, 'py-20 md:py-28', className)}
    >
      <div className="container mx-auto px-4">
        <div
          className={cn(
            'grid items-start gap-10 lg:grid-cols-2 lg:gap-16',
            asideFirst && 'lg:[&>*:first-child]:order-2',
          )}
        >
          <div>
            <SectionHeader
              eyebrow={eyebrow}
              title={title}
              size={size}
              align="left"
              className="mb-0"
            />
            {body ? (
              <div className="text-body-lead text-muted-foreground mt-6 max-w-2xl font-light">
                {body}
              </div>
            ) : null}
            {actions ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {actions}
              </div>
            ) : null}
          </div>
          {aside ? <div className="min-w-0">{aside}</div> : null}
        </div>
      </div>
    </section>
  )
}

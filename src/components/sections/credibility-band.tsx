import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface CredibilityItem {
  label: string
  /** Optional inline mark (logo, icon) rendered before the label. */
  mark?: ReactNode
  /** Optional outbound link wrapping the item. */
  href?: string
}

interface CredibilityBandProps {
  items: Array<CredibilityItem>
  /** Optional eyebrow rendered above the items, e.g. "Lab oficial". */
  eyebrow?: string
  /** Override outer spacing or background. Default is a thin bordered band. */
  className?: string
}

/**
 * Thin full-bleed band used directly under the homepage hero. Does the
 * multi-audience signaling in one row (e.g. "Cursor Ambassadors · Codex
 * Community Ambassadors · entrenamos equipos · trabajamos con universidades")
 * so the homepage can stay builder-first while still telling a B2B / partner
 * visitor that they're in the right place.
 *
 * Earns its keep with proof, not card grids. The brand-spine commitment is
 * that this is the only multi-audience moment on a builder-first homepage.
 */
export function CredibilityBand({
  items,
  eyebrow,
  className,
}: CredibilityBandProps) {
  return (
    <section
      aria-label={eyebrow ?? 'Credenciales y alcance'}
      className={cn(
        'border-border/60 border-y bg-background/40 py-5 backdrop-blur',
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 text-center md:gap-6">
          {eyebrow ? (
            <p className="eyebrow-label text-foreground/60">{eyebrow}</p>
          ) : null}
          <ul className="text-foreground/75 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm font-medium md:gap-x-7">
            {items.map((item, i) => (
              <li
                key={`${item.label}-${i}`}
                className="motion-safe:animate-hero-in flex items-center"
                style={{ animationDelay: `${100 + i * 80}ms` }}
              >
                {i > 0 ? (
                  <span
                    aria-hidden
                    className="text-border mr-5 select-none md:mr-7"
                  >
                    ·
                  </span>
                ) : null}
                <CredibilityItemContent item={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function CredibilityItemContent({ item }: { item: CredibilityItem }) {
  const inner = (
    <span className="inline-flex items-center gap-2">
      {item.mark ? (
        <span aria-hidden className="text-foreground/65 inline-flex shrink-0">
          {item.mark}
        </span>
      ) : null}
      <span>{item.label}</span>
    </span>
  )

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors"
      >
        {inner}
      </a>
    )
  }
  return inner
}

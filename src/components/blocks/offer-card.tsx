import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowDown01Icon } from '@hugeicons/core-free-icons'

type OfferCardProps = {
  title: string
  description: string
  outcome?: string
  index?: number
}

function splitOutcome(raw: string): { label: string; body: string } | null {
  const colon = raw.indexOf(':')
  if (colon <= 0 || colon > 24) return null
  const label = raw.slice(0, colon).trim()
  const body = raw.slice(colon + 1).trim()
  if (!label || !body) return null
  return { label, body }
}

export function OfferCard({
  title,
  description,
  outcome,
  index,
}: OfferCardProps) {
  const parsed = outcome ? splitOutcome(outcome) : null
  const indexLabel =
    typeof index === 'number'
      ? String(index + 1).padStart(2, '0')
      : null

  return (
    <article className="surface-card group relative flex h-full min-h-[280px] flex-col overflow-hidden p-7">
      <div className="bg-primary/10 pointer-events-none absolute -top-14 -right-12 size-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      {indexLabel ? (
        <div className="relative z-10 mb-7 flex items-center gap-3">
          <span className="text-primary font-mono text-xs font-semibold tracking-[0.18em] tabular-nums">
            {indexLabel}
          </span>
          <span className="from-primary/30 h-px flex-1 bg-gradient-to-r to-transparent" />
        </div>
      ) : null}

      <div className="relative z-10 flex flex-col gap-3">
        <h3 className="font-display text-2xl font-semibold tracking-tight">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {outcome ? (
        <div className="relative z-10 mt-auto flex flex-col gap-2 pt-7">
          <div
            aria-hidden
            className="from-primary/25 mb-3 h-px w-full bg-gradient-to-r via-white/10 to-transparent"
          />
          <span className="eyebrow-label text-primary inline-flex items-center gap-1.5">
            <HugeiconsIcon icon={ArrowDown01Icon} className="size-3.5" />
            {parsed?.label ?? 'Outcome'}
          </span>
          <p className="text-foreground/90 text-sm leading-relaxed">
            {parsed?.body ?? outcome}
          </p>
        </div>
      ) : null}
    </article>
  )
}

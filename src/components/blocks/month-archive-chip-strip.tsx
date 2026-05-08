import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

type MonthArchive = {
  key: string
  label: string
  count: number
}

type MonthArchiveChipStripProps = {
  months: Array<MonthArchive>
  currentKey?: string
  limit?: number
  trailingLabel?: string
  className?: string
}

export function MonthArchiveChipStrip({
  months,
  currentKey,
  limit,
  trailingLabel,
  className,
}: MonthArchiveChipStripProps) {
  const visibleMonths = limit ? months.slice(0, limit) : months

  if (visibleMonths.length === 0) return null

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {visibleMonths.map((month) => (
        <Link
          key={month.key}
          to="/events/$param"
          params={{ param: month.key }}
          className={cn(
            'border-border bg-background/60 text-muted-foreground hover:border-primary/40 hover:text-primary inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-colors',
            currentKey === month.key &&
              'border-primary/35 bg-primary/10 text-primary',
          )}
        >
          <span className="capitalize">{month.label}</span>
          <span className="bg-muted text-muted-foreground rounded-full px-1.5 py-0.5 text-[0.68rem]">
            {month.count}
          </span>
        </Link>
      ))}
      {trailingLabel && limit && months.length > limit ? (
        <Link
          to="/events/$param"
          params={{ param: months[limit].key }}
          className="text-primary px-2 text-sm font-medium hover:underline"
        >
          {trailingLabel}
        </Link>
      ) : null}
    </div>
  )
}

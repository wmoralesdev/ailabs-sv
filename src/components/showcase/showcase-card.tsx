import { Link } from '@tanstack/react-router'
import { DisplayChip } from '@/components/ui/toggle-chip'
import { toolIcons } from '@/components/onboarding/tool-icons'
import { idsToLabels } from '@/lib/onboarding-interests'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const CARD_BASE =
  'group editorial-card interactive-lift block overflow-hidden rounded-[1.75rem]'

const STATUS_LABELS: Record<string, string> = {
  shipped: 'Shipped',
  in_progress: 'In progress',
  concept: 'Concept',
}

export type ShowcaseCardEntry = {
  _id: string
  slug: string
  title: string
  tagline: string
  coverImageUrl: string
  event?: string
  toolsUsed?: Array<string>
  status: 'shipped' | 'in_progress' | 'concept'
  author: {
    name: string
    slug: string
    avatarUrl?: string
  } | null
}

interface ShowcaseCardProps {
  entry: ShowcaseCardEntry
  featured?: boolean
}

export function ShowcaseCard({ entry, featured }: ShowcaseCardProps) {
  const { t } = useI18n()
  const toolsLabels = idsToLabels(
    entry.toolsUsed ?? [],
    t.onboarding.interests.tools,
  )

  return (
    <Link
      to="/showcase/$slug"
      params={{ slug: entry.slug }}
      className={cn(CARD_BASE, featured && 'ring-primary/30 ring-2')}
    >
      <div className="bg-muted aspect-[16/10] w-full overflow-hidden">
        <img
          src={entry.coverImageUrl}
          alt=""
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
        />
      </div>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display line-clamp-2 text-xl leading-tight font-semibold tracking-tight">
            {entry.title}
          </h3>
          <span
            className={cn(
              'shrink-0 rounded-full px-2 py-0.5 text-xs font-medium',
              entry.status === 'shipped' &&
                'bg-green-500/10 text-green-600 dark:text-green-400',
              entry.status === 'in_progress' &&
                'bg-amber-500/10 text-amber-600 dark:text-amber-400',
              entry.status === 'concept' && 'bg-muted text-muted-foreground',
            )}
          >
            {STATUS_LABELS[entry.status] ?? entry.status}
          </span>
        </div>
        <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed font-light">
          {entry.tagline}
        </p>
        <div className="flex flex-wrap gap-2">
          {toolsLabels.slice(0, 4).map((label, i) => {
            const toolId = entry.toolsUsed?.[i]
            const icon = toolId ? toolIcons[toolId] : undefined
            return <DisplayChip key={label} label={label} icon={icon} />
          })}
          {entry.toolsUsed && entry.toolsUsed.length > 4 && (
            <DisplayChip label={`+${entry.toolsUsed.length - 4}`} />
          )}
        </div>
        {entry.event && (
          <span className="eyebrow-label text-muted-foreground">
            {entry.event}
          </span>
        )}
        {entry.author && (
          <div className="flex items-center gap-2 pt-1">
            <div className="bg-muted flex size-7 shrink-0 overflow-hidden rounded-full">
              {entry.author.avatarUrl ? (
                <img
                  src={entry.author.avatarUrl}
                  alt=""
                  className="size-full object-cover"
                />
              ) : (
                <span className="text-muted-foreground flex size-full items-center justify-center text-xs font-medium">
                  {entry.author.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <span className="text-foreground text-sm font-medium">
              {entry.author.name}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}

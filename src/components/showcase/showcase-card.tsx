import { Link } from '@tanstack/react-router'
import { DisplayChip } from '@/components/ui/toggle-chip'
import { toolIcons } from '@/components/onboarding/tool-icons'
import { idsToLabels } from '@/lib/onboarding-interests'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { formatWithBrandText } from '@/components/brand-text'

const CARD_BASE = 'group surface-card block overflow-hidden'

const STATUS_LABELS: Record<string, string> = {
  shipped: 'Shipped',
  in_progress: 'In progress',
  concept: 'Concept',
}

const STATUS_DOT_TONES: Record<string, string> = {
  shipped: 'bg-emerald-400',
  in_progress: 'bg-amber-400',
  concept: 'bg-foreground/40',
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

/**
 * Compact, image-led card for the homepage showcase teaser. Single
 * full-bleed cover with a status pill, a typographic overlay (event eyebrow
 * + title + author byline), and a grayscale -> color hover. Tagline and tool
 * list are intentionally omitted: this card is signal that projects ship,
 * not the full detail page. Use `ShowcaseCard` on `/showcase` for the full
 * info card.
 */
export function ShowcaseTeaserCard({ entry }: { entry: ShowcaseCardEntry }) {
  const statusLabel = STATUS_LABELS[entry.status] ?? entry.status
  const statusDot = STATUS_DOT_TONES[entry.status] ?? 'bg-foreground/40'

  return (
    <Link
      to="/showcase/$slug"
      params={{ slug: entry.slug }}
      className="group surface-card relative block aspect-[4/3] overflow-hidden p-0"
    >
      <img
        src={entry.coverImageUrl}
        alt=""
        className="absolute inset-0 size-full object-cover grayscale transition duration-500 group-hover:scale-[1.04] group-hover:grayscale-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-black/85 via-black/45 to-black/10"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-black/55 to-transparent"
      />

      <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/95 backdrop-blur-md">
        <span className={cn('size-1.5 rounded-full', statusDot)} aria-hidden />
        {statusLabel}
      </span>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 text-white">
        {entry.event ? (
          <p className="text-[10px] font-medium tracking-[0.2em] text-white/65 uppercase">
            {entry.event}
          </p>
        ) : null}
        <h3 className="font-display text-2xl leading-tight font-medium tracking-[-0.02em] text-balance md:text-3xl">
          {formatWithBrandText(entry.title)}
        </h3>
        {entry.author ? (
          <div className="flex items-center gap-2 text-xs text-white/75">
            <span className="bg-muted flex size-5 shrink-0 overflow-hidden rounded-full">
              {entry.author.avatarUrl ? (
                <img
                  src={entry.author.avatarUrl}
                  alt=""
                  className="size-full object-cover"
                />
              ) : (
                <span className="text-foreground/80 flex size-full items-center justify-center text-[10px] font-medium">
                  {entry.author.name.charAt(0).toUpperCase()}
                </span>
              )}
            </span>
            <span className="font-medium">{entry.author.name}</span>
          </div>
        ) : null}
      </div>
    </Link>
  )
}

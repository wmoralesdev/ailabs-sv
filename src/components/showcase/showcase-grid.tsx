import { useQuery } from 'convex/react'
import { Link } from '@tanstack/react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRightIcon, RocketIcon } from '@hugeicons/core-free-icons'
import { api } from 'convex/_generated/api'
import { ShowcaseCard } from './showcase-card'
import { ShowcaseFilters } from './showcase-filters'
import type { ShowcaseCardEntry } from './showcase-card'
import { useAuthState } from '@/components/auth/auth-context'
import { Spinner } from '@/components/ui/spinner'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type ShowcaseSearch = {
  event?: string
  tool?: string
  status?: string
}

interface ShowcaseGridProps {
  search: ShowcaseSearch
  className?: string
}

export function ShowcaseGrid({ search, className }: ShowcaseGridProps) {
  const { t } = useI18n()
  const { isAuthenticated } = useAuthState()
  const L = t.showcaseList
  const result = useQuery(api.showcase.list, {
    event: search.event,
    tool: search.tool,
    status: search.status as 'shipped' | 'in_progress' | 'concept' | undefined,
    limit: 24,
  })

  if (result === undefined) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  const items = result.items
  const featured = items.filter((i) => i.featured)
  const rest = items.filter((i) => !i.featured)

  const eventOptions = [
    ...new Set(items.map((i) => i.event).filter(Boolean)),
  ] as Array<string>

  return (
    <div className={cn('flex flex-col gap-10', className)}>
      <div className="border-border/60 -mx-4 border-y px-4 py-4 sm:mx-0 sm:rounded-2xl sm:border sm:bg-card/30 sm:px-5">
        <ShowcaseFilters search={search} eventOptions={eventOptions} />
      </div>

      {items.length === 0 ? (
        <div className="surface-card flex flex-col items-center justify-center px-6 py-20 text-center md:px-12">
          <div className="border-primary/20 bg-primary/10 mb-6 flex size-16 items-center justify-center rounded-2xl border">
            <HugeiconsIcon
              icon={RocketIcon}
              size={32}
              className="text-primary"
            />
          </div>
          <h2 className="font-display text-foreground mb-3 text-2xl font-semibold tracking-tight md:text-3xl">
            {L.emptyTitle}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md text-base leading-relaxed font-light text-pretty">
            {L.emptyBody}
          </p>
          <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
            {isAuthenticated ? (
              <Link
                to="/showcase/submit"
                search={{ edit: undefined }}
                className="bg-primary text-primary-foreground shadow-primary/15 hover:shadow-primary/25 inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-6 font-medium shadow-lg transition-all sm:min-w-[200px] sm:flex-initial"
              >
                {L.emptySubmitCta}
                <HugeiconsIcon icon={ArrowRightIcon} size={18} />
              </Link>
            ) : (
              <Link
                to="/sign-in"
                search={{ returnTo: '/showcase' }}
                className="bg-primary text-primary-foreground shadow-primary/15 hover:shadow-primary/25 inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-6 font-medium shadow-lg transition-all sm:min-w-[200px] sm:flex-initial"
              >
                {t.feed.joinCta}
                <HugeiconsIcon icon={ArrowRightIcon} size={18} />
              </Link>
            )}
            <Link
              to="/partners"
              className="border-border/70 bg-background/65 text-foreground hover:border-primary/30 hover:bg-muted inline-flex h-12 flex-1 items-center justify-center rounded-full border px-6 font-medium backdrop-blur transition-colors sm:min-w-[180px] sm:flex-initial"
            >
              {L.emptyPartnersCta}
            </Link>
          </div>
        </div>
      ) : (
        <>
          {featured.length > 0 && (
            <section>
              <h2 className="eyebrow-label text-primary mb-4">{L.featured}</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((entry) => (
                  <ShowcaseCard
                    key={entry._id}
                    entry={toCardEntry(entry)}
                    featured
                  />
                ))}
              </div>
            </section>
          )}
          <section>
            {featured.length > 0 && (
              <h2 className="eyebrow-label text-muted-foreground mb-4">
                {L.allProjects}
              </h2>
            )}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((entry) => (
                <ShowcaseCard key={entry._id} entry={toCardEntry(entry)} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}

function toCardEntry(item: {
  _id: string
  slug: string
  title: string
  tagline: string
  coverImageUrl: string
  event?: string
  toolsUsed?: Array<string>
  status: 'shipped' | 'in_progress' | 'concept'
  author: { name: string; slug: string; avatarUrl?: string } | null
}): ShowcaseCardEntry {
  return {
    _id: item._id,
    slug: item.slug,
    title: item.title,
    tagline: item.tagline,
    coverImageUrl: item.coverImageUrl,
    event: item.event,
    toolsUsed: item.toolsUsed,
    status: item.status,
    author: item.author,
  }
}

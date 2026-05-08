import { Link } from '@tanstack/react-router'
import { useQuery } from 'convex/react'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRightIcon } from '@hugeicons/core-free-icons'
import { api } from 'convex/_generated/api'
import { useI18n } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { SectionHeader } from '@/components/section-header'
import { ShowcaseTeaserCard } from '@/components/showcase/showcase-card'
import { Spinner } from '@/components/ui/spinner'

const TEASER_LIMIT = 3

/**
 * Homepage anchor for the lab's strongest social proof: real projects
 * built by the community. Pulls 3 featured (or most recent) entries
 * straight from the Convex showcase query so the homepage always reflects
 * what's actually shipping.
 *
 * Replaces the AudiencePathsSection / FinalPathsSection pattern as the
 * "where do I go next" moment on the homepage. Builders see proof, not
 * a router.
 */
export function ShowcaseTeaserSection() {
  const { language } = useI18n()
  const result = useQuery(api.showcase.list, { limit: TEASER_LIMIT })

  const eyebrow = language === 'es' ? 'Proyectos' : 'Projects'
  const title =
    language === 'es'
      ? 'Lo que la comunidad está construyendo.'
      : 'What the community is building.'
  const description =
    language === 'es'
      ? 'Demos, prototipos y proyectos reales de builders en El Salvador. Cada uno empezó con una pregunta y terminó en código.'
      : 'Demos, prototypes, and real projects from builders in El Salvador. Each one started with a question and ended in code.'
  const ctaLabel =
    language === 'es' ? 'Ver todos los proyectos' : 'View every project'

  return (
    <section className="section-editorial py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="left"
            className="mb-0 max-w-3xl"
          />
          <Button
            variant="outline"
            size="xl"
            className="bg-background/60 w-fit shrink-0"
            render={
              <Link
                to="/showcase"
                search={{ event: undefined, tool: undefined, status: undefined }}
              />
            }
          >
            {ctaLabel}
            <HugeiconsIcon
              icon={ArrowRightIcon}
              className="size-4"
              data-icon="inline-end"
            />
          </Button>
        </div>

        {result === undefined ? (
          <div className="flex min-h-[260px] items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : result.items.length === 0 ? (
          <ShowcaseTeaserEmpty language={language} />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {result.items.slice(0, TEASER_LIMIT).map((entry) => (
              <ShowcaseTeaserCard
                key={entry._id}
                entry={{
                  _id: entry._id,
                  slug: entry.slug,
                  title: entry.title,
                  tagline: entry.tagline,
                  coverImageUrl: entry.coverImageUrl,
                  event: entry.event,
                  toolsUsed: entry.toolsUsed,
                  status: entry.status,
                  author: entry.author,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ShowcaseTeaserEmpty({ language }: { language: 'es' | 'en' }) {
  return (
    <div className="quiet-card p-10 text-center">
      <p className="text-muted-foreground text-sm">
        {language === 'es'
          ? 'Pronto vas a ver los primeros proyectos aquí.'
          : 'The first projects will land here soon.'}
      </p>
    </div>
  )
}

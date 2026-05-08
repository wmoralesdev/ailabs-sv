import { Link, createFileRoute } from '@tanstack/react-router'
import { seoCopyEs } from '@/content/seo-copy'
import { buildSeoMeta } from '@/lib/seo-meta'
import { ShowcaseGrid } from '@/components/showcase/showcase-grid'
import { InnerPageHero } from '@/components/sections/inner-page-hero'
import { RevealOnScroll } from '@/components/reveal-on-scroll'
import { useAuthState } from '@/components/auth/auth-context'
import { useI18n } from '@/lib/i18n'

export const Route = createFileRoute('/showcase/')({
  validateSearch: (search: Record<string, unknown>) => ({
    event: (search.event as string) || undefined,
    tool: (search.tool as string) || undefined,
    status: (search.status as string) || undefined,
  }),
  head: () => {
    const { meta, links } = buildSeoMeta({
      path: '/showcase',
      title: seoCopyEs.showcaseIndex.title,
      description: seoCopyEs.showcaseIndex.description,
    })
    return { meta, links }
  },
  component: ShowcaseIndexPage,
})

function ShowcaseIndexPage() {
  const { t } = useI18n()
  const search = Route.useSearch()
  const { isAuthenticated } = useAuthState()
  const h = t.showcasePage.hero

  return (
    <div className="motion-safe:animate-page-in">
      <InnerPageHero
        variant="compact"
        badge={h.badge}
        headlineLine1={h.headlineLine1}
        headlinePhrases={h.headlinePhrases}
        subheadline={h.subheadline}
        primaryAction={
          isAuthenticated
            ? {
                label: h.primaryCta,
                render: (
                  <Link to="/showcase/submit" search={{ edit: undefined }} />
                ),
              }
            : {
                label: t.feed.joinCta,
                render: (
                  <Link to="/sign-in" search={{ returnTo: '/showcase' }} />
                ),
              }
        }
        secondaryAction={{
          label: h.secondaryCta,
          render: <Link to="/events" />,
          variant: 'outline',
          showArrow: false,
        }}
      />

      <ShowcaseStatusRail
        eyebrow={h.proofCardEyebrow}
        title={h.proofCardTitle}
        items={h.proofCardItems}
      />

      <RevealOnScroll>
        <section className="section-panel py-12 md:py-16">
          <div className="container mx-auto px-6">
            <ShowcaseGrid search={search} />
          </div>
        </section>
      </RevealOnScroll>
    </div>
  )
}

function ShowcaseStatusRail({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string
  title: string
  items: ReadonlyArray<{ value: string; label: string }>
}) {
  return (
    <section
      aria-labelledby="showcase-rail-heading"
      title={title}
      className="border-border/60 motion-safe:animate-hero-in -mt-1 border-y bg-background/60 backdrop-blur-sm [animation-delay:200ms]"
    >
      <div className="container mx-auto flex items-center gap-4 overflow-x-auto px-6 py-3 md:gap-8 md:py-4">
        <p
          id="showcase-rail-heading"
          className="eyebrow-label text-primary shrink-0"
        >
          {eyebrow}
        </p>
        <span aria-hidden className="text-border/60 hidden md:inline">
          /
        </span>
        <ol className="flex flex-1 items-baseline gap-x-5 md:gap-x-7">
          {items.map((item, index) => (
            <li
              key={`${item.value}-${item.label}`}
              className="flex items-baseline gap-2 whitespace-nowrap"
            >
              <span className="text-primary font-mono text-sm font-semibold tabular-nums md:text-base">
                {item.value}
              </span>
              <span className="text-foreground/75 text-[0.7rem] font-medium tracking-[0.14em] uppercase md:text-xs">
                {item.label}
              </span>
              {index < items.length - 1 ? (
                <span
                  aria-hidden
                  className="text-border/40 ml-3 hidden select-none md:inline"
                >
                  ·
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

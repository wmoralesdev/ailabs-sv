import { Link, createFileRoute } from '@tanstack/react-router'
import { seoCopyEs } from '@/content/seo-copy'
import { buildSeoMeta } from '@/lib/seo-meta'
import { ShowcaseGrid } from '@/components/showcase/showcase-grid'
import { InnerPageHero } from '@/components/sections/inner-page-hero'
import { RevealOnScroll } from '@/components/reveal-on-scroll'
import { useAuthState } from '@/components/auth/auth-context'
import { useI18n } from '@/lib/i18n'

export const Route = createFileRoute('/showcase/')({
  head: () => {
    const { meta, links } = buildSeoMeta({
      path: '/showcase',
      title: seoCopyEs.showcaseIndex.title,
      description: seoCopyEs.showcaseIndex.description,
    })
    return { meta, links }
  },
  validateSearch: (search: Record<string, unknown>) => ({
    event: (search.event as string) || undefined,
    tool: (search.tool as string) || undefined,
    status: (search.status as string) || undefined,
  }),
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
        className="-mt-24"
        badge={h.badge}
        headlineLine1={h.headlineLine1}
        headlinePhrases={h.headlinePhrases}
        subheadline={h.subheadline}
        proofCard={{
          eyebrow: h.proofCardEyebrow,
          title: h.proofCardTitle,
          items: h.proofCardItems,
        }}
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
          render: <Link to="/partners" />,
          variant: 'outline',
          showArrow: false,
        }}
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

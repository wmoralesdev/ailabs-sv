import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRightIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { Language } from '@/content/site-content'
import { seoCopyEs } from '@/content/seo-copy'
import { buildSeoMeta } from '@/lib/seo-meta'
import { useI18n } from '@/lib/i18n'
import { listSlideDecks } from '@/lib/slides-decks'

export const Route = createFileRoute('/slides/')({
  head: () => {
    const { meta, links } = buildSeoMeta({
      path: '/slides',
      title: seoCopyEs.slidesIndex.title,
      description: seoCopyEs.slidesIndex.description,
      noIndex: true,
    })
    return { meta, links }
  },
  component: SlidesIndexPage,
})

function deckTitle(deckId: string, baseLabel: string, language: Language): string {
  if (deckId === 'test') {
    return language === 'es' ? 'Prueba' : 'Test'
  }
  return baseLabel
}

function SlidesIndexPage() {
  const { language } = useI18n()
  const decks = listSlideDecks()

  return (
    <div className="bg-background text-foreground flex min-h-dvh flex-col px-6 py-16">
      <div className="mx-auto w-full max-w-lg">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Presentaciones
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Elige un deck. Navegación con flechas o espacio dentro de cada presentación.
        </p>
        <ul className="mt-10 flex flex-col gap-3">
          {decks.map((d) => (
            <li key={d.id}>
              <Link
                to="/slides/$deckId"
                params={{ deckId: d.id }}
                className="border-border bg-card hover:border-primary/30 hover:bg-accent/50 flex items-center justify-between gap-4 rounded-lg border px-4 py-4 text-left transition-colors"
              >
                <div>
                  <p className="font-medium">{deckTitle(d.id, d.label, language)}</p>
                  <p className="text-muted-foreground text-xs">
                    {d.slideCount} {d.slideCount === 1 ? 'diapositiva' : 'diapositivas'}
                  </p>
                </div>
                <HugeiconsIcon
                  icon={ArrowRightIcon}
                  size={20}
                  className="text-muted-foreground shrink-0"
                />
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground mt-10 text-center text-xs">
          <Link
            to="/"
            className="text-primary font-medium underline-offset-4 hover:underline"
          >
            Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  )
}

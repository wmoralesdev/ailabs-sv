import { Link, createFileRoute } from '@tanstack/react-router'
import type { Language } from '@/content/site-content'
import { SlidesShell } from '@/components/slides/slides-shell'
import { seoCopyEs } from '@/content/seo-copy'
import { useI18n } from '@/lib/i18n'
import { buildSeoMeta } from '@/lib/seo-meta'
import { getSlideDeck } from '@/lib/slides-decks'

export const Route = createFileRoute('/slides/$deckId')({
  head: ({ params }) => {
    const copy = seoCopyEs.slidesDeck(params.deckId)
    const { meta, links } = buildSeoMeta({
      path: `/slides/${params.deckId}`,
      title: copy.title,
      description: copy.description,
      noIndex: true,
    })
    return { meta, links }
  },
  component: SlidesDeckPage,
})

function deckLabelFor(
  deckId: string,
  baseLabel: string,
  language: Language,
): string {
  if (deckId === 'test') {
    return language === 'es' ? 'Prueba' : 'Test'
  }
  return baseLabel
}

function SlidesDeckPage() {
  const { deckId } = Route.useParams()
  const { language } = useI18n()

  const deck = getSlideDeck(deckId)

  if (!deck) {
    return (
      <div className="bg-background text-foreground flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-xl font-semibold">Deck no encontrado</p>
        <p className="text-muted-foreground mt-2 max-w-sm text-sm">
          No hay una presentación con este identificador.
        </p>
        <Link
          to="/"
          className="text-primary mt-8 text-sm font-medium underline-offset-4 hover:underline"
        >
          Volver al inicio
        </Link>
      </div>
    )
  }

  const deckLabel = deckLabelFor(deck.id, deck.label, language)

  return <SlidesShell deck={deck} deckLabel={deckLabel} />
}

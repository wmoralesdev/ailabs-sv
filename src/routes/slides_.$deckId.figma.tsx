import { Link, createFileRoute } from '@tanstack/react-router'
import type { Language } from '@/content/site-content'
import { SlidesFigmaCapture } from '@/components/slides/slides-figma-capture'
import { seoCopyEs } from '@/content/seo-copy'
import { useI18n } from '@/lib/i18n'
import { buildSeoMeta } from '@/lib/seo-meta'
import { getSlideDeck } from '@/lib/slides-decks'

export const Route = createFileRoute('/slides_/$deckId/figma')({
  head: ({ params }) => {
    const copy = seoCopyEs.slidesDeckFigma(params.deckId)
    const { meta, links } = buildSeoMeta({
      path: `/slides/${params.deckId}/figma`,
      title: copy.title,
      description: copy.description,
      noIndex: true,
    })
    return { meta, links }
  },
  component: SlidesDeckFigmaCapturePage,
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

function SlidesDeckFigmaCapturePage() {
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
          to="/slides"
          className="text-primary mt-8 text-sm font-medium underline-offset-4 hover:underline"
        >
          Volver a presentaciones
        </Link>
      </div>
    )
  }

  const deckLabel = deckLabelFor(deck.id, deck.label, language)

  return <SlidesFigmaCapture deck={{ ...deck, label: deckLabel }} />
}

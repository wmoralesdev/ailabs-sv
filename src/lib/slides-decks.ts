import type { SlideDeckDefinition } from '@/lib/slides/deck-types'
import { netlifyKpDeck } from '@/content/slides/netlify-kp'
import { testDeck } from '@/content/slides/test-deck'

export type { SlideDeckDefinition } from '@/lib/slides/deck-types'

const DECKS: Record<string, SlideDeckDefinition> = {
  test: testDeck,
  'netlify-kp': netlifyKpDeck,
}

export function getSlideDeck(deckId: string): SlideDeckDefinition | null {
  return Object.hasOwn(DECKS, deckId) ? DECKS[deckId] : null
}

export type SlideDeckListItem = {
  id: string
  label: string
  slideCount: number
}

export function listSlideDecks(): ReadonlyArray<SlideDeckListItem> {
  return Object.values(DECKS).map((d) => ({
    id: d.id,
    label: d.label,
    slideCount: d.slides.length,
  }))
}

import type { SlideDeckDefinition } from '@/lib/slides/deck-types'
import { buildTestDeckFigmaExport } from '@/content/slides/test-deck/deck-figma-export'
import { TestSlide01Cover } from '@/content/slides/test-deck/slide-01-cover'
import { TestSlide02Cards } from '@/content/slides/test-deck/slide-02-cards'

export const testDeck: SlideDeckDefinition = {
  id: 'test',
  label: 'Test deck',
  slides: [TestSlide01Cover, TestSlide02Cards],
  buildFigmaExport: buildTestDeckFigmaExport,
}

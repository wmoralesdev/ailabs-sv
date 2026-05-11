import type { SlideDeckDefinition } from '@/lib/slides/deck-types'

type SlidesFigmaCaptureProps = {
  deck: SlideDeckDefinition
}

export function SlidesFigmaCapture({ deck }: SlidesFigmaCaptureProps) {
  return (
    <main
      className="slides-figma-capture-root bg-background text-foreground"
      data-figma-deck={deck.id}
      aria-label={`${deck.label} Figma capture`}
    >
      {deck.slides.map((Slide, index) => {
        const slideNumber = String(index + 1).padStart(2, '0')

        return (
          <section
            key={slideNumber}
            id={`${deck.id}-slide-${slideNumber}`}
            className="slides-output-page slides-figma-capture-slide"
            data-figma-slide={slideNumber}
            data-figma-name={`${slideNumber} · ${deck.label}`}
            aria-label={`Slide ${index + 1}`}
          >
            <Slide />
          </section>
        )
      })}
    </main>
  )
}

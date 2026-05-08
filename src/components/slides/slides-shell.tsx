import { useCallback, useEffect, useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import type { TouchEvent } from 'react'
import type { SlideDeckDefinition } from '@/lib/slides/deck-types'
import { LanguageToggle } from '@/components/language-toggle'
import { SlidesExportToolbar } from '@/components/slides/slides-export-toolbar'
import { SlidesThemeSelector } from '@/components/slides/slides-theme-selector'
import { cn } from '@/lib/utils'

const SLIDE_EXPORT_WIDTH = 1920
const SLIDE_EXPORT_HEIGHT = 1080
const IMAGE_LOAD_TIMEOUT_MS = 10000

type SlidesShellProps = {
  deck: SlideDeckDefinition
  deckLabel?: string
}

function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
}

function nextFrame() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve())
  })
}

async function waitForFonts() {
  if ('fonts' in document) {
    await document.fonts.ready
  }
}

async function waitForImages(root: HTMLElement) {
  const images = Array.from(root.querySelectorAll('img'))
  await Promise.all(
    images.map(async (image) => {
      image.loading = 'eager'

      if (!image.complete) {
        await new Promise<void>((resolve) => {
          const done = () => {
            window.clearTimeout(timeout)
            image.removeEventListener('load', done)
            image.removeEventListener('error', done)
            resolve()
          }
          const timeout = window.setTimeout(done, IMAGE_LOAD_TIMEOUT_MS)

          image.addEventListener('load', done, { once: true })
          image.addEventListener('error', done, { once: true })
        })
      }
      if (typeof image.decode === 'function') {
        await image.decode().catch(() => undefined)
      }
    }),
  )
}

export function SlidesShell({ deck, deckLabel }: SlidesShellProps) {
  const slides = deck.slides
  const [index, setIndex] = useState(0)
  const [exportingPng, setExportingPng] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)
  const touchStartX = useRef<number | null>(null)
  const exportPageRefs = useRef<Array<HTMLDivElement | null>>([])

  const count = slides.length
  const safeIndex = count === 0 ? 0 : Math.min(index, count - 1)
  const Current = slides[safeIndex]

  useEffect(() => {
    setIndex((i) => (count === 0 ? 0 : Math.min(i, count - 1)))
  }, [count])

  useEffect(() => {
    exportPageRefs.current = exportPageRefs.current.slice(0, count)
  }, [count])

  const go = useCallback(
    (next: number) => {
      if (count === 0) return
      const clamped = Math.max(0, Math.min(count - 1, next))
      setIndex(clamped)
    },
    [count],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          e.preventDefault()
          go(safeIndex + 1)
          break
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          go(safeIndex - 1)
          break
        case 'Home':
          e.preventDefault()
          go(0)
          break
        case 'End':
          e.preventDefault()
          go(count - 1)
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [count, go, safeIndex])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX
  }

  const onTouchEnd = (e: TouchEvent) => {
    const start = touchStartX.current
    touchStartX.current = null
    if (start == null) return
    const end = e.changedTouches[0].clientX
    const dx = end - start
    if (Math.abs(dx) < 48) return
    if (dx < 0) go(safeIndex + 1)
    else go(safeIndex - 1)
  }

  const exportSlidesAsPng = useCallback(async () => {
    if (exportingPng) return

    setExportingPng(true)
    setExportError(null)

    try {
      await waitForFonts()
      await nextFrame()
      await nextFrame()

      for (let i = 0; i < count; i += 1) {
        const page = exportPageRefs.current[i]
        if (!page) {
          throw new Error(`Slide ${i + 1} is not ready for export.`)
        }

        await waitForImages(page)

        const dataUrl = await toPng(page, {
          width: SLIDE_EXPORT_WIDTH,
          height: SLIDE_EXPORT_HEIGHT,
          pixelRatio: 1,
          cacheBust: true,
          style: {
            width: `${SLIDE_EXPORT_WIDTH}px`,
            height: `${SLIDE_EXPORT_HEIGHT}px`,
          },
        })

        const slideNumber = String(i + 1).padStart(2, '0')
        downloadDataUrl(dataUrl, `${deck.id}-${slideNumber}.png`)
      }
    } catch (error) {
      setExportError(
        error instanceof Error ? error.message : 'Could not export slide PNGs.',
      )
    } finally {
      setExportingPng(false)
    }
  }, [count, deck.id, exportingPng])

  if (count === 0) {
    return (
      <div className="bg-background text-foreground flex min-h-dvh items-center justify-center px-6">
        <p className="text-muted-foreground text-sm">
          No slides in this deck.
        </p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'bg-background text-foreground relative flex min-h-dvh flex-col',
        'selection:bg-primary selection:text-primary-foreground',
      )}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="slides-chrome print:hidden pointer-events-none absolute right-0 top-0 z-50 flex max-w-[100vw] flex-col items-end gap-2 pt-[max(0.75rem,env(safe-area-inset-top))] pr-[max(0.75rem,env(safe-area-inset-right))]">
        <div className="pointer-events-auto flex flex-wrap items-center justify-end gap-2">
          <SlidesExportToolbar
            exportingPng={exportingPng}
            onExportPng={() => void exportSlidesAsPng()}
          />
          <div className="border-border/50 bg-background/80 flex items-center rounded-full border shadow-sm backdrop-blur-md">
            {deck.id === 'netlify-kp' ? null : <LanguageToggle />}
            <SlidesThemeSelector />
          </div>
        </div>
        {exportError ? (
          <p
            className="border-destructive/30 bg-background/95 text-destructive pointer-events-auto max-w-sm rounded-full border px-3 py-1 text-right text-xs shadow-sm"
            role="alert"
          >
            {exportError}
          </p>
        ) : null}
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden px-4 pb-24 pt-14 print:hidden md:px-8 md:pb-28 md:pt-16">
        <div
          key={safeIndex}
          className="motion-safe:animate-slide-deck-in motion-reduce:animate-none mx-auto flex h-full min-h-0 w-full max-w-[min(100%,calc((100dvh-8rem)*16/9))] flex-1 flex-col"
        >
          <Current />
        </div>
      </div>

      <div className="slides-print-only hidden print:block">
        {slides.map((Slide, i) => (
          <div key={i} className="slides-output-page slides-print-page">
            <Slide />
          </div>
        ))}
      </div>

      <div
        className="slides-export-stage print:hidden"
        aria-hidden="true"
      >
        {slides.map((Slide, i) => (
          <div
            key={i}
            ref={(node) => {
              exportPageRefs.current[i] = node
            }}
            className="slides-output-page slides-export-page"
          >
            <Slide />
          </div>
        ))}
      </div>

      <footer
        className="slides-chrome print:hidden border-border/40 flex shrink-0 items-center justify-between gap-4 border-t px-4 py-3 md:px-6"
        aria-label="Slide navigation"
      >
        <p className="text-muted-foreground truncate font-mono text-[10px] uppercase tracking-widest md:text-xs">
          {deckLabel ? `${deckLabel} · ` : null}
          {safeIndex + 1} / {count}
        </p>
        <div className="flex max-w-[min(60vw,20rem)] flex-wrap items-center justify-end gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === safeIndex ? 'true' : undefined}
              className={cn(
                'h-2 w-2 rounded-full transition-[transform,colors] duration-200 ease-out',
                'hover:scale-125 focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                i === safeIndex
                  ? 'bg-primary'
                  : 'bg-muted-foreground/35 hover:bg-muted-foreground/60',
              )}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </footer>
    </div>
  )
}

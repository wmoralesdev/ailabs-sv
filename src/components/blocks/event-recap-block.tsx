import { HugeiconsIcon } from '@hugeicons/react'
import { PlayIcon } from '@hugeicons/core-free-icons'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type EventRecapBlockProps = {
  recapUrl?: string | null
  title: string
  description: string
  ctaLabel: string
}

export function EventRecapBlock({
  recapUrl,
  title,
  description,
  ctaLabel,
}: EventRecapBlockProps) {
  const embedUrl = recapUrl ? getVideoEmbedUrl(recapUrl) : null

  return (
    <section className="section-panel py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="editorial-card overflow-hidden rounded-[2rem] p-0">
          <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="p-7 sm:p-9">
              <p className="eyebrow-label text-primary mb-4">Recap</p>
              <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {title}
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl leading-relaxed">
                {description}
              </p>
              {recapUrl ? (
                <a
                  href={recapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'xl' }),
                    'bg-background/60 mt-7 rounded-full',
                  )}
                >
                  {ctaLabel}
                </a>
              ) : null}
            </div>
            <div className="bg-muted/40 relative min-h-[260px] overflow-hidden">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 size-full"
                />
              ) : (
                <div className="text-muted-foreground flex size-full min-h-[260px] items-center justify-center">
                  <div className="text-center">
                    <span className="border-border bg-background/70 mx-auto mb-4 flex size-14 items-center justify-center rounded-full border">
                      <HugeiconsIcon icon={PlayIcon} className="size-6" />
                    </span>
                    <p className="text-sm">Recap pendiente</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function getVideoEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url)

    if (parsed.hostname.includes('youtube.com')) {
      const id = parsed.searchParams.get('v')
      return id ? `https://www.youtube.com/embed/${id}` : null
    }

    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.replace('/', '')
      return id ? `https://www.youtube.com/embed/${id}` : null
    }

    if (parsed.hostname.includes('vimeo.com')) {
      const id = parsed.pathname.split('/').filter(Boolean).at(-1)
      return id ? `https://player.vimeo.com/video/${id}` : null
    }
  } catch {
    return null
  }

  return null
}

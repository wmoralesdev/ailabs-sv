import { SlideCanvas } from '@/components/slides/slide-canvas'
import { SlideLayout } from '@/components/slides/slide-layout'
import { cn } from '@/lib/utils'

type BentoTile = {
  src: string
  alt: string
  event: string
  n: number
}

function BentoTileFigure({
  tile,
  className,
}: {
  tile: BentoTile
  className?: string
}) {
  return (
    <figure
      className={cn(
        'relative min-h-0 overflow-hidden rounded-xl md:rounded-2xl',
        className,
      )}
    >
      <img
        src={tile.src}
        alt={tile.alt}
        className="absolute inset-0 size-full object-cover"
        draggable={false}
        loading="lazy"
        decoding="async"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-t from-black/90 via-black/55 to-transparent"
      />
      <figcaption className="absolute inset-x-0 bottom-0 z-10 p-2.5 text-white md:p-3">
        <p className="font-display text-[11px] font-medium leading-snug tracking-tight uppercase md:text-xs">
          {tile.event}
        </p>
        <p className="font-mono text-[10px] text-white/75 tabular-nums">{tile.n} attendees</p>
      </figcaption>
    </figure>
  )
}

const supabase: BentoTile = {
  src: '/community/community-proof-slot-5.jpg',
  alt: 'Supabase Meetup with Ai Labs community.',
  event: 'Supabase Meetup',
  n: 43,
}

const meetup: BentoTile = {
  src: '/community/community-proof-slot-6.jpeg',
  alt: 'Cursor Meetup crowd.',
  event: 'Cursor Meetup',
  n: 97,
}

const v0gt: BentoTile = {
  src: '/community/community-proof-slot-7.jpeg',
  alt: 'v0 Prompt to Production Guatemala.',
  event: 'v0 Prompt to Production · GT',
  n: 37,
}

/**
 * Layout 2/2: tall left panel + stacked pair on the right (different silhouette from slide 1).
 */
export function NetlifyKpSlide04CommunityProofContinued() {
  return (
    <SlideCanvas>
      <SlideLayout
        eyebrow="Proof · 2/2"
        title="Same format, different rooms"
        contentClassName="flex min-h-0 flex-1 flex-col gap-4"
      >
        <p className="text-muted-foreground shrink-0 text-xs leading-relaxed md:text-sm">
          Meetups, partner labs, and cross-border sessions with laptops open and demos live.
        </p>
        <div className="aspect-[16/9] w-full shrink-0">
          <div className="grid size-full grid-cols-12 grid-rows-2 gap-2 md:gap-3">
            <BentoTileFigure
              tile={meetup}
              className="col-span-7 col-start-1 row-span-2 row-start-1"
            />
            <BentoTileFigure
              tile={supabase}
              className="col-span-5 col-start-8 row-span-1 row-start-1"
            />
            <BentoTileFigure
              tile={v0gt}
              className="col-span-5 col-start-8 row-span-1 row-start-2"
            />
          </div>
        </div>
      </SlideLayout>
    </SlideCanvas>
  )
}

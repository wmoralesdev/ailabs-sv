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
  imgClassName,
}: {
  tile: BentoTile
  className?: string
  /** e.g. object-center for portrait cells */
  imgClassName?: string
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
        className={cn(
          'absolute inset-0 size-full object-cover',
          imgClassName,
        )}
        draggable={false}
        loading="eager"
        decoding="async"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/90 via-black/50 to-transparent"
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

/**
 * Layout 1/2: portrait SV column (2 rows) + GT/Cafe on top, UFG wide below.
 */
export function NetlifyKpSlide03CommunityProof() {
  const gt: BentoTile = {
    src: '/community/community-proof-slot-1.jpg',
    alt: 'Ai Labs members at Cursor Hackathon Guatemala.',
    event: 'Cursor Hackathon · GT',
    n: 140,
  }
  const cafe: BentoTile = {
    src: '/community/community-proof-slot-3.jpg',
    alt: 'Attendees at Cafe Cursor.',
    event: 'Cafe Cursor',
    n: 86,
  }
  const ufg: BentoTile = {
    src: '/community/community-proof-slot-4.jpg',
    alt: 'Cursor Lab at UFG.',
    event: 'Cursor Lab · UFG',
    n: 75,
  }
  const sv: BentoTile = {
    src: '/community/community-proof-slot-2.jpg',
    alt: 'Ai Labs community at Cursor Hackathon San Salvador.',
    event: 'Cursor Hackathon · SV',
    n: 145,
  }

  return (
    <SlideCanvas>
      <SlideLayout
        eyebrow="Proof · 1/2"
        title="We gather builders in rooms, not webinars"
        contentClassName="flex min-h-0 flex-1 flex-col gap-4"
      >
        <p className="text-muted-foreground shrink-0 text-xs leading-relaxed md:text-sm">
          Recent Ai /abs-led sessions with the kind of room Netlify can plug into.
        </p>
        <div className="aspect-[16/9] w-full shrink-0">
          <div className="grid size-full grid-cols-12 grid-rows-[1fr_1fr] gap-2 md:gap-3">
            <BentoTileFigure
              tile={sv}
              className="col-span-4 col-start-1 row-span-2 row-start-1"
              imgClassName="object-center"
            />
            <BentoTileFigure
              tile={gt}
              className="col-span-4 col-start-5 row-start-1 row-span-1"
            />
            <BentoTileFigure
              tile={cafe}
              className="col-span-4 col-start-9 row-start-1 row-span-1"
            />
            <BentoTileFigure
              tile={ufg}
              className="col-span-8 col-start-5 row-start-2 row-span-1"
            />
          </div>
        </div>
      </SlideLayout>
    </SlideCanvas>
  )
}

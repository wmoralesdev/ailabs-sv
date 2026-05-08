import { SlideCanvas } from '@/components/slides/slide-canvas'
import { AilabsLockup } from '@/components/ui/ailabs-lockup'

/** English-only partner deck: Build with Netlify city-hub pilot, led by Ai /abs. */
export function NetlifyKpSlide01Cover() {
  return (
    <SlideCanvas>
      <div className="flex flex-1 flex-col items-center justify-center px-8 py-10 text-center md:py-12">
        <AilabsLockup className="mb-10 w-auto text-5xl md:text-6xl lg:text-7xl" />
        <p className="text-muted-foreground mb-6 font-display text-xl font-semibold tracking-tight md:text-2xl lg:text-[1.85rem]">
          Build with Netlify · San Salvador
        </p>
        <p className="font-display text-foreground mb-6 max-w-3xl text-2xl font-medium tracking-tight text-pretty md:text-[1.95rem] lg:text-[2.2rem]">
          A San Salvador pilot for turning Netlify’s platform story into shipped projects.
        </p>
        <p className="text-body-lead text-muted-foreground mb-12 max-w-lg font-light text-pretty">
          Prepared by Ai /abs for the Netlify team.
        </p>
        <p className="text-muted-foreground font-mono text-[10px] tracking-[0.35em] uppercase">
          May 2026
        </p>
      </div>
    </SlideCanvas>
  )
}

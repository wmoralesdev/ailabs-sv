import { SlideCanvas } from '@/components/slides/slide-canvas'
import { SlideLayout } from '@/components/slides/slide-layout'

const NEXT = [
  'Review the June hub and July buildathon linkage.',
  'Lock dates and Netlify’s remote or onsite presence.',
  'Align the AI Gateway + Database story before Ai /abs markets the pilot.',
]

export function NetlifyKpSlide11Close() {
  return (
    <SlideCanvas>
      <SlideLayout eyebrow="Next conversation" title="Let’s align on the pilot in 30 minutes">
        <ul className="text-muted-foreground list-inside list-disc space-y-3 text-sm leading-relaxed marker:text-primary md:text-base">
          {NEXT.map((item) => (
            <li key={item} className="pl-1">
              {item}
            </li>
          ))}
        </ul>
        <p className="text-foreground max-w-3xl border-border/60 border-l-2 pl-5 text-sm leading-relaxed md:text-base lg:text-[1.05rem]">
          Let’s use San Salvador to prove the format, then turn it into a city-hub playbook
          Netlify can repeat.
        </p>
      </SlideLayout>
    </SlideCanvas>
  )
}

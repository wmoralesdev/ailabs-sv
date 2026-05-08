import { SlideCanvas } from '@/components/slides/slide-canvas'
import { SlideLayout } from '@/components/slides/slide-layout'

const ASKS = [
  'A quick intro video personalized for San Salvador.',
  'Credits sized for demos and hackathon finalist teams.',
  'Swag for attendees and builders who ship.',
  'DevRel or community contact for pacing and AMA prep.',
  'Naming approval for “Build with Netlify · San Salvador” or preferred phrasing.',
]

export function NetlifyKpSlide10Needs() {
  return (
    <SlideCanvas>
      <SlideLayout
        eyebrow="Light collaboration"
        title="What we need from Netlify"
      >
        <p className="text-muted-foreground -mt-2 max-w-3xl pb-3 text-sm leading-relaxed md:text-base">
          Ai /abs handles logistics, registration, the room, visuals, and recap.
          Netlify brings product alignment, lightweight resources, and a few moments of direct presence.
        </p>
        <ul className="text-muted-foreground list-inside list-disc space-y-3 text-sm leading-relaxed marker:text-primary md:text-base">
          {ASKS.map((item) => (
            <li key={item} className="pl-1">
              {item}
            </li>
          ))}
        </ul>
      </SlideLayout>
    </SlideCanvas>
  )
}

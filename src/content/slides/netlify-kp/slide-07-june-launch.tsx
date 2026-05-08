import { SlideCanvas } from '@/components/slides/slide-canvas'
import { SlideLayout } from '@/components/slides/slide-layout'

const BULLETS = [
  '3-hour workshop with 50–80 builders on site in San Salvador.',
  'Theme: Netlify beyond hosting, from deploys to AI app infrastructure.',
  'Guided build with AI Gateway, Netlify Database, and deploy.',
  'Optional Netlify cameo live or remote: DevRel, community, or product.',
  'Networking time, swag, credits, photography, recap post, and Ai /abs social cadence.',
]

export function NetlifyKpSlide07JuneLaunch() {
  return (
    <SlideCanvas>
      <SlideLayout
        eyebrow="June · Launch"
        title="Build with Netlify kicks off San Salvador"
      >
        <p className="text-muted-foreground -mt-2 max-w-3xl pb-3 text-sm leading-relaxed md:text-base">
          June tests the playbook: audience quality, pacing, product fit, and recap assets.
          It also warms up builders ahead of the July Cursor Buildathon sprint.
        </p>
        <ul className="text-muted-foreground list-inside list-disc space-y-3 text-sm leading-relaxed marker:text-primary md:text-base">
          {BULLETS.map((item) => (
            <li key={item} className="pl-1">
              {item}
            </li>
          ))}
        </ul>
      </SlideLayout>
    </SlideCanvas>
  )
}

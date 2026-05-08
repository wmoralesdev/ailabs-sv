import { SlideCanvas } from '@/components/slides/slide-canvas'
import { SlideLayout } from '@/components/slides/slide-layout'

const PILLARS = [
  'City meetups as repeatable hubs.',
  'Credits and swag as activation fuel.',
  'Local builders and experts mentoring live.',
  'Project recognition and recaps Ai /abs can publish.',
  'San Salvador first, then a playbook for more cities.',
] as const

/** Campaign framing: naming is a pilot with Netlify, not claiming an official Netlify program. */
export function NetlifyKpSlide05Campaign() {
  return (
    <SlideCanvas>
      <SlideLayout eyebrow="Proposal" title="Build with Netlify · city hubs">
        <div className="grid gap-6 lg:grid-cols-[1fr,minmax(0,1fr)] lg:gap-10">
          <div>
            <p className="text-foreground font-display text-xl font-semibold tracking-tight md:text-2xl">
              Ai /abs can launch the first hub in San Salvador.
            </p>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed md:text-base">
              Ai /abs fills and runs the room. Netlify anchors the product story.
              Builders leave with deployed URLs, project stories, and work worth amplifying.
            </p>
          </div>
          <div className="surface-card rounded-2xl border border-primary/15 bg-primary/[0.04] p-5 md:p-6">
            <p className="text-primary mb-4 font-mono text-[10px] tracking-[0.2em] uppercase">
              What hubs do for Netlify
            </p>
            <ul className="text-muted-foreground list-inside list-disc space-y-3 text-sm leading-relaxed marker:text-primary">
              {PILLARS.map((line) => (
                <li key={line} className="pl-1">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SlideLayout>
    </SlideCanvas>
  )
}

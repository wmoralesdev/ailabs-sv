import { SlideCanvas } from '@/components/slides/slide-canvas'
import { SlideLayout } from '@/components/slides/slide-layout'

const STAT_CARDS = [
  {
    value: '700+',
    label: 'Builders in community',
    note: 'Developers, students, founders, and operators who show up to build.',
  },
  {
    value: '30+',
    label: 'IRL events · past year',
    note: 'Hackathons, meetups, campus labs, and partner sessions with live demos.',
  },
  {
    value: '8',
    label: 'Active partners',
    note: 'Cursor, v0, Codex, and allied teams already trust Ai /abs with the room.',
  },
] as const

export function NetlifyKpSlide02AiLabs() {
  return (
    <SlideCanvas>
      <SlideLayout
        eyebrow="Who runs this pilot"
        title="Ai /abs is El Salvador’s practical AI lab"
      >
        <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed md:text-base">
          Ai /abs brings builders into practical rooms: community labs, campus sessions,
          company trainings, and partner events where people leave with working projects.
          With Netlify, the next step is clear: help builders experience Netlify as more
          than hosting.
        </p>
        <div className="grid gap-4 pt-2 sm:grid-cols-3">
          {STAT_CARDS.map((s) => (
            <article
              key={s.label}
              className="surface-card flex flex-col rounded-2xl p-5 text-left"
            >
              <p className="text-foreground font-mono text-2xl font-semibold tracking-[-0.04em] tabular-nums md:text-3xl">
                {s.value}
              </p>
              <p className="text-primary mt-3 font-mono text-[10px] tracking-[0.2em] uppercase">
                {s.label}
              </p>
              <p className="text-muted-foreground mt-3 text-xs leading-relaxed md:text-sm">
                {s.note}
              </p>
            </article>
          ))}
        </div>
      </SlideLayout>
    </SlideCanvas>
  )
}

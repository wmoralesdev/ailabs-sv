import { SlideCanvas } from '@/components/slides/slide-canvas'
import { SlideLayout } from '@/components/slides/slide-layout'

const STEPS = [
  {
    step: '01',
    title: 'Gather',
    body:
      'Use the Ai /abs community, campuses, partners, and calendar to fill a credible room.',
  },
  {
    step: '02',
    title: 'Activate',
    body:
      'Pair a live demo with guided build time: Database, AI Gateway, and deploy.',
  },
  {
    step: '03',
    title: 'Recognize',
    body:
      'Publish a roster, project board, and recap media Netlify can share.',
  },
] as const

export function NetlifyKpSlide06CityHub() {
  return (
    <SlideCanvas>
      <SlideLayout eyebrow="Model" title="Gather → Activate → Recognize">
        <div className="grid gap-4 md:grid-cols-3">
          {STEPS.map((s) => (
            <article
              key={s.step}
              className="surface-card relative flex flex-col rounded-2xl p-6 text-left"
            >
              <span className="text-primary font-mono text-xs tracking-widest">{s.step}</span>
              <h3 className="text-foreground mt-4 font-display text-lg font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </SlideLayout>
    </SlideCanvas>
  )
}

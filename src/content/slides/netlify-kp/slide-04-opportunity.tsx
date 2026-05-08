import { SlideCanvas } from '@/components/slides/slide-canvas'
import { SlideLayout } from '@/components/slides/slide-layout'

const POINTS = [
  {
    title: 'The hosting label is sticky',
    body:
      'Builders still reduce Netlify to “where I deploy.” That makes the newer platform story harder to see.',
  },
  {
    title: 'The platform expanded',
    body:
      'Database and AI Gateway make Netlify feel like a fuller default for AI apps.',
  },
  {
    title: 'Builders trust live builds',
    body:
      'The fastest way to shift perception is to help people ship something in the room.',
  },
] as const

export function NetlifyKpSlide04Opportunity() {
  return (
    <SlideCanvas>
      <SlideLayout
        eyebrow="Opportunity"
        title="Netlify’s bigger story needs a room"
      >
        <p className="text-muted-foreground -mt-2 max-w-3xl text-sm md:text-base">
          Many builders still think “Netlify = deploy.” A local pilot can change that by helping
          them build with Database, AI Gateway, Functions, and Blobs in one guided session.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {POINTS.map((p) => (
            <article
              key={p.title}
              className="surface-card rounded-2xl p-5 text-left md:p-6"
            >
              <p className="text-primary font-mono text-[10px] tracking-widest uppercase">
                {p.title}
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{p.body}</p>
            </article>
          ))}
        </div>
      </SlideLayout>
    </SlideCanvas>
  )
}

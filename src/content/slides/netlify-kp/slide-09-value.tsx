import { SlideCanvas } from '@/components/slides/slide-canvas'
import { SlideLayout } from '@/components/slides/slide-layout'

const WINS = [
  {
    title: 'Perception shifts',
    body:
      'Builders see Netlify as an AI app stack: deploy, Database, AI Gateway, and supporting primitives.',
  },
  {
    title: 'Builder visibility',
    body:
      'A named roster and project board showing who shipped, what they built, and which Netlify products they used.',
  },
  {
    title: 'Repeatable playbook',
    body:
      'A city-hub format Netlify can reuse after the San Salvador pilot proves the pacing.',
  },
  {
    title: 'Trusted local operator',
    body:
      'Cursor, v0, and Codex already trust Ai /abs to gather this builder audience.',
  },
] as const

export function NetlifyKpSlide09Value() {
  return (
    <SlideCanvas>
      <SlideLayout eyebrow="For Netlify" title="What Netlify gets from the pilot">
        <div className="grid gap-4 sm:grid-cols-2">
          {WINS.map((card) => (
            <article
              key={card.title}
              className="surface-card rounded-2xl p-5 text-left md:p-6"
            >
              <p className="text-primary font-mono text-[10px] tracking-widest uppercase">
                {card.title}
              </p>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{card.body}</p>
            </article>
          ))}
        </div>
      </SlideLayout>
    </SlideCanvas>
  )
}

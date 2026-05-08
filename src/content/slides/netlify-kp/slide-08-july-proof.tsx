import { SlideCanvas } from '@/components/slides/slide-canvas'
import { SlideLayout } from '@/components/slides/slide-layout'

const BULLETS = [
  'Netlify track plus prize slot for Cursor Buildathon (Jul 4–5, Universidad Francisco Gavidia).',
  'Teams qualify by deploying on Netlify and using one product beyond hosting.',
  'Optional 10-minute kickoff cameo plus two short office-hour windows.',
  'Within seven days, Ai /abs shares handles, Netlify URLs, products used, and recap notes.',
  'Public showcase board on ailabs.sv showing who shipped what.',
]

export function NetlifyKpSlide08JulyProof() {
  return (
    <SlideCanvas>
      <SlideLayout
        eyebrow="July · Proof"
        title="Hackathon turns interest into shipped Netlify projects"
      >
        <p className="text-muted-foreground -mt-2 max-w-3xl pb-3 text-sm leading-relaxed md:text-base">
          June introduces the story. July proves adoption: teams, Netlify URLs,
          products used, demos, and recap content.
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

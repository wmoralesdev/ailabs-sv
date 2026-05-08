import { SlideCanvas } from '@/components/slides/slide-canvas'
import { useI18n } from '@/lib/i18n'

const CARDS_ES = [
  {
    title: 'Tipografía',
    body:
      'Display y cuerpo alineados con la landing: jerarquía clara sin abandonar calidez.',
  },
  {
    title: 'Superficies',
    body:
      'Tokens semánticos, bordes suaves y tarjetas que ya usás en el sitio.',
  },
  {
    title: 'Export',
    body:
      'PDF con impresión del navegador y payload Figma para sincronizar vía MCP.',
  },
] as const

const CARDS_EN = [
  {
    title: 'Typography',
    body:
      'Display and body type aligned with the landing: clear hierarchy, same warmth.',
  },
  {
    title: 'Surfaces',
    body:
      'Semantic tokens, soft borders, and cards that match ailabs.sv.',
  },
  {
    title: 'Export',
    body:
      'PDF via browser print and a Figma JSON payload for MCP workflows.',
  },
] as const

export function TestSlide02Cards() {
  const { language } = useI18n()
  const cards = language === 'es' ? CARDS_ES : CARDS_EN
  const eyebrow =
    language === 'es' ? 'Este deck valida' : 'This deck validates'
  const title =
    language === 'es'
      ? 'Layout creativo en TSX, estética del sitio.'
      : 'Creative TSX layout, site-native look.'

  return (
    <SlideCanvas>
      <div className="flex flex-1 flex-col justify-center px-8 py-10 md:px-14 md:py-14">
        <p className="eyebrow-label text-primary mb-3">{eyebrow}</p>
        <h2 className="text-display-section font-display text-foreground mb-10 max-w-4xl font-medium tracking-tight">
          {title}
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="surface-card rounded-2xl p-6 text-left"
            >
              <p className="text-primary font-mono text-[10px] tracking-widest uppercase">
                {card.title}
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SlideCanvas>
  )
}

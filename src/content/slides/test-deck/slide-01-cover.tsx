import { SlideCanvas } from '@/components/slides/slide-canvas'
import { AilabsLockup } from '@/components/ui/ailabs-lockup'
import { useI18n } from '@/lib/i18n'

export function TestSlide01Cover() {
  const { t } = useI18n()
  return (
    <SlideCanvas>
      <div className="flex flex-1 flex-col items-center justify-center px-8 py-12 text-center">
        <AilabsLockup className="mb-10 w-auto text-5xl md:text-6xl lg:text-7xl" />
        <p className="text-display-section font-display text-foreground mb-5 max-w-4xl font-medium tracking-tight">
          Deck de prueba
        </p>
        <p className="text-body-lead text-muted-foreground max-w-2xl font-light text-pretty">
          {t.hero.subheadline}
        </p>
      </div>
    </SlideCanvas>
  )
}

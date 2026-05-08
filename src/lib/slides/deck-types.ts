import type { ComponentType } from 'react'
import type { FigmaDeckExportPayload } from '@/lib/slides/figma-export'

export type SlideDeckDefinition = {
  id: string
  label: string
  slides: ReadonlyArray<ComponentType>
  buildFigmaExport?: () => FigmaDeckExportPayload
}

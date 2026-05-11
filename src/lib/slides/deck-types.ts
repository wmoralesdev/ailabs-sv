import type { ComponentType } from 'react'

export type SlideDeckDefinition = {
  id: string
  label: string
  slides: ReadonlyArray<ComponentType>
}

/**
 * Deck-level Figma sync payload for MCP or manual import.
 * Intended as a portable description, not a full Figma file binary.
 */
export type FigmaDeckExportPayload = {
  version: 1
  deckId: string
  label: string
  frames: Array<FigmaExportFrame>
}

export type FigmaExportFrame = {
  name: string
  width: number
  height: number
  children: Array<FigmaExportNode>
}

export type FigmaExportNode =
  | FigmaTextNode
  | FigmaRectNode
  | FigmaFrameNode

export type FigmaTextNode = {
  type: 'TEXT'
  name: string
  x: number
  y: number
  width?: number
  characters: string
  fontSize?: number
  /** CSS var name or semantic role for MCP mapping */
  fill?: 'primary' | 'foreground' | 'muted-foreground'
  fontFamily?: 'display' | 'sans'
}

export type FigmaRectNode = {
  type: 'RECTANGLE'
  name: string
  x: number
  y: number
  width: number
  height: number
  /** Semantic fill hint */
  fill?: 'card' | 'primary' | 'muted'
  cornerRadius?: number
}

export type FigmaFrameNode = {
  type: 'FRAME'
  name: string
  x: number
  y: number
  width: number
  height: number
  fills?: 'background' | 'transparent'
  children?: Array<FigmaExportNode>
}

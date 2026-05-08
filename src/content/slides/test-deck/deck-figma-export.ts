import type { FigmaDeckExportPayload } from '@/lib/slides/figma-export'

const W = 1920
const H = 1080

/** Static Figma-oriented tree matching the 2-slide test deck intent (MCP sync). */
export function buildTestDeckFigmaExport(): FigmaDeckExportPayload {
  return {
    version: 1,
    deckId: 'test',
    label: 'Test deck',
    frames: [
      {
        name: '01 · Cover',
        width: W,
        height: H,
        children: [
          {
            type: 'TEXT',
            name: 'Lockup label',
            x: 120,
            y: 420,
            width: 1680,
            characters: 'Ai /abs — deck de prueba',
            fontSize: 72,
            fill: 'foreground',
            fontFamily: 'display',
          },
          {
            type: 'TEXT',
            name: 'Subhead',
            x: 120,
            y: 540,
            width: 1200,
            characters:
              'Comunidad, training y práctica con IA para builders que quieren criterio.',
            fontSize: 28,
            fill: 'muted-foreground',
            fontFamily: 'sans',
          },
        ],
      },
      {
        name: '02 · Tres pilares',
        width: W,
        height: H,
        children: [
          {
            type: 'TEXT',
            name: 'Eyebrow',
            x: 120,
            y: 120,
            characters: 'ENFOQUE',
            fontSize: 12,
            fill: 'primary',
            fontFamily: 'sans',
          },
          {
            type: 'TEXT',
            name: 'Title',
            x: 120,
            y: 160,
            width: 1600,
            characters: 'Qué valida este deck de prueba',
            fontSize: 56,
            fill: 'foreground',
            fontFamily: 'display',
          },
          {
            type: 'FRAME',
            name: 'Card 1',
            x: 120,
            y: 360,
            width: 520,
            height: 280,
            fills: 'background',
            children: [
              {
                type: 'TEXT',
                name: 'Title',
                x: 32,
                y: 32,
                characters: 'Tipografía',
                fontSize: 22,
                fill: 'foreground',
                fontFamily: 'display',
              },
              {
                type: 'TEXT',
                name: 'Body',
                x: 32,
                y: 80,
                width: 440,
                characters:
                  'Display y body alineados con la landing (Space Grotesk + Inter).',
                fontSize: 18,
                fill: 'muted-foreground',
                fontFamily: 'sans',
              },
            ],
          },
          {
            type: 'FRAME',
            name: 'Card 2',
            x: 680,
            y: 360,
            width: 520,
            height: 280,
            fills: 'background',
            children: [
              {
                type: 'TEXT',
                name: 'Title',
                x: 32,
                y: 32,
                characters: 'Superficies',
                fontSize: 22,
                fill: 'foreground',
                fontFamily: 'display',
              },
              {
                type: 'TEXT',
                name: 'Body',
                x: 32,
                y: 80,
                width: 440,
                characters:
                  'Tokens semánticos y tarjetas con el mismo lenguaje que ailabs.sv.',
                fontSize: 18,
                fill: 'muted-foreground',
                fontFamily: 'sans',
              },
            ],
          },
          {
            type: 'FRAME',
            name: 'Card 3',
            x: 1240,
            y: 360,
            width: 520,
            height: 280,
            fills: 'background',
            children: [
              {
                type: 'TEXT',
                name: 'Title',
                x: 32,
                y: 32,
                characters: 'Export',
                fontSize: 22,
                fill: 'foreground',
                fontFamily: 'display',
              },
              {
                type: 'TEXT',
                name: 'Body',
                x: 32,
                y: 80,
                width: 440,
                characters:
                  'PDF vía impresión del navegador y JSON Figma para MCP.',
                fontSize: 18,
                fill: 'muted-foreground',
                fontFamily: 'sans',
              },
            ],
          },
        ],
      },
    ],
  }
}

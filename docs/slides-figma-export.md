# Slide decks: Figma-native export

Slide decks under `/slides/*` export to Figma through a slide-only capture view. The source of truth is the same React DOM used by the live deck, rendered as clean 1920×1080 slide frames without presentation chrome.

## Workflow

1. Run the web app locally.
2. Open a deck route such as `/slides/netlify-kp`.
3. Click **Open Figma capture** in the deck toolbar.
4. Use [Figma Code to canvas](https://developers.figma.com/docs/figma-mcp-server/code-to-canvas/) through the Figma MCP server (`generate_figma_design`) and capture the slide-only route.
5. Prefer **Select element** in the capture toolbar and choose each `1920×1080` slide frame. The route also marks slides with `data-figma-slide` and `data-figma-name` for easier targeting.

In development, `capture.js` is loaded from `mcp.figma.com` in [`src/routes/__root.tsx`](../src/routes/__root.tsx), and `react-grab` is imported to help Code to Canvas understand the React tree.

## Relevant files

- [`src/components/slides/slides-figma-capture.tsx`](../src/components/slides/slides-figma-capture.tsx) renders all deck slides as capture-ready frames.
- [`src/routes/slides_.$deckId.figma.tsx`](../src/routes/slides_.$deckId.figma.tsx) serves the capture view at `/slides/:deckId/figma`.
- [`src/components/slides/slides-export-toolbar.tsx`](../src/components/slides/slides-export-toolbar.tsx) links from the presentation view to the capture route.

## Legacy JSON importer

The old structured JSON path remains in [`figma-deck-import`](../figma-deck-import/README.md) and the `deck-figma-export.ts` files for historical reference only. It is an approximate text/shape reconstruction and is no longer the supported export workflow for slide fidelity.

# Ai Labs deck import (Figma plugin)

Legacy importer. The supported slide workflow now uses the slide-only Figma capture view at `/slides/:deckId/figma` with Figma Code to Canvas.

Imports `FigmaDeckExportPayload` version 1 JSON from the legacy slide export builders.

## Install (development)

1. Open Figma Desktop → **Plugins** → **Development** → **Import plugin from manifest…**
2. Choose [`manifest.json`](./manifest.json) in this folder.
3. Run **Plugins → Development → Ai Labs deck import**.

## Legacy usage

1. Generate or copy a legacy `FigmaDeckExportPayload` JSON object from a `deck-figma-export.ts` file.
2. In Figma, run the plugin and paste into the textarea, then **Import frames**.
3. The plugin creates one approximate Figma frame per slide, laid out in a row (1920×1080). Photo-heavy slides use placeholder rectangles.

Fonts: **Inter Regular** and **Space Grotesk Medium**. If a font fails to load, text falls back to Inter.

## manifest `id`

Before publishing to the Community, replace `com.ailabs.sv.deck-import` with the id from Figma’s plugin admin. For local development the bundled id is enough.

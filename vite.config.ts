import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config = defineConfig({
  resolve: {
    alias: {
      // React 19 shims for use-sync-external-store CJS/ESM interop
      'use-sync-external-store/shim/with-selector.js': resolve(__dirname, 'src/lib/use-sync-external-store-with-selector-shim.ts'),
      'use-sync-external-store/shim/with-selector': resolve(__dirname, 'src/lib/use-sync-external-store-with-selector-shim.ts'),
      'use-sync-external-store/shim/index.js': resolve(__dirname, 'src/lib/use-sync-external-store-shim.ts'),
      'use-sync-external-store/shim': resolve(__dirname, 'src/lib/use-sync-external-store-shim.ts'),
    },
  },
  plugins: [
    devtools(),
    nitro(),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})

export default config

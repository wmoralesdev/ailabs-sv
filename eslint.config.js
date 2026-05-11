//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  {
    ignores: [
      '.output/**',
      'convex/_generated/**',
      'eslint.config.js',
      'figma-deck-import/**',
      'prettier.config.js',
    ],
  },
  ...tanstackConfig,
]

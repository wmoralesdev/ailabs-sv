// ESM re-export for use-sync-external-store/shim/with-selector
// Fixes Vite CJS→ESM named export detection for React 19 projects
// The getServerSnapshot caching warning is a known React 19 dev-only issue
// triggered by TanStack Router's <HeadContent> — not caused by this shim.
// @ts-expect-error - CJS default import
import withSelector from '../../node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js'

export const useSyncExternalStoreWithSelector = withSelector.useSyncExternalStoreWithSelector

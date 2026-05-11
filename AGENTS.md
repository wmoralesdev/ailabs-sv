# AGENTS.md

## Cursor Cloud specific instructions

### Architecture

Single-package TypeScript app: TanStack Start (SSR via Nitro) + Convex (serverless BaaS) + Clerk (auth). See `README.md` for full setup steps.

### Required secrets (`.env.local`)

The dev server **will not start** without valid values for `VITE_CONVEX_URL` and `VITE_CLERK_PUBLISHABLE_KEY`. Clerk middleware validates the publishable key format on every SSR request — placeholder values cause HTTP 500. Generate `.env.local` from injected env vars:

```bash
printf "VITE_CONVEX_URL=%s\nCONVEX_URL=%s\nVITE_CLERK_PUBLISHABLE_KEY=%s\nCLERK_SECRET_KEY=%s\nVITE_TURNSTILE_SITE_KEY=%s\nTURNSTILE_SECRET=%s\n" \
  "$VITE_CONVEX_URL" "$VITE_CONVEX_URL" "$VITE_CLERK_PUBLISHABLE_KEY" "$CLERK_SECRET_KEY" \
  "$VITE_TURNSTILE_SITE_KEY" "$TURNSTILE_SECRET" > .env.local
```

### Running services

| Service | Command | Port | Notes |
|---------|---------|------|-------|
| Vite dev server | `pnpm dev` | 3000 | Requires `.env.local` with valid Convex + Clerk keys |
| Convex dev | `pnpm convex` | — | Syncs schema/functions to Convex cloud; needs `CONVEX_DEPLOYMENT` env var |
| Email preview | `pnpm email` | 3001 | Optional — React Email template viewer |

### Key commands

- **Lint:** `pnpm lint` (ESLint 9 via `@tanstack/eslint-config`)
- **Format:** `pnpm format` (Prettier with Tailwind plugin)
- **Test:** `pnpm test` (Vitest — currently no test files in repo)
- **Build:** `pnpm build` (outputs to `.output/`)

### Gotchas

- `eslint` must be a direct devDependency (it's a peer dep of `@tanstack/eslint-config`, not hoisted by pnpm's strict mode).
- pnpm 10 requires `pnpm.onlyBuiltDependencies` in `package.json` to allow native build scripts (`esbuild`, `sharp`, `unrs-resolver`, `@clerk/shared`, `msw`). Without it, `pnpm install` skips build scripts and tools may fail at runtime.
- The Convex backend runs in the cloud (not locally). `pnpm convex` (`convex dev`) pushes functions/schema and watches for changes — it's not a local database.

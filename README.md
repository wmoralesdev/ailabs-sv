# ailabs.sv

El Salvador's tech and AI community hub. Built with TanStack Start, Convex, and shadcn/ui.

## Setup

1. Install dependencies: `pnpm install`
2. Start Convex (requires [Convex account](https://convex.dev)): `pnpm convex` — run in a separate terminal. This generates types and deploys functions.
3. Copy `.env.example` to `.env.local` and add your `VITE_CONVEX_URL` from the Convex dashboard.
4. Configure auth (in Convex dashboard env vars):
   - OTP: `AUTH_RESEND_KEY`, `AUTH_EMAIL` (use `Walter Morales <walter@ailabs.sv>`)
   - OAuth: `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`
   - `SITE_URL` (e.g. `http://localhost:3000` for dev)
5. Start dev: `pnpm dev`

## Scripts

- `pnpm dev` — Vite dev server (port 3000)
- `pnpm convex` — Convex dev (types + deploy)
- `pnpm build` — Production build

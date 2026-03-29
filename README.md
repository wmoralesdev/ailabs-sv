# ailabs.sv

El Salvador's tech and AI community hub. Built with TanStack Start, Convex, and shadcn/ui.

## Setup

1. Install dependencies: `pnpm install`
2. Start Convex (requires [Convex account](https://convex.dev)): `pnpm convex` — run in a separate terminal. This generates types and deploys functions.
3. Copy `.env.example` to `.env.local` and add your `VITE_CONVEX_URL` from the Convex dashboard. For production (sitemap route), set the same URL as `CONVEX_URL` or `VITE_CONVEX_URL` on the host (e.g. Vercel).
4. Configure auth (in Convex dashboard env vars):
   - OTP: `AUTH_RESEND_KEY`, `AUTH_EMAIL` (use `Walter Morales <walter@ailabs.sv>`)
   - OAuth: `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`
   - `SITE_URL` (e.g. `http://localhost:3000` for dev)
5. Start dev: `pnpm dev`

## Scripts

- `pnpm dev` — Vite dev server (port 3000)
- `pnpm convex` — Convex dev (types + deploy)
- `pnpm build` — Production build
- `pnpm mcp:events` — stdio MCP server to create/update events from Cursor (see below)

## MCP (Cursor): conversational events

1. Generate a secret (e.g. `openssl rand -hex 32`) and set **`ADMIN_MCP_SECRET`** in the Convex dashboard (same value everywhere you use this MCP).
2. Set **`CONVEX_HTTP_URL`** to your deployment HTTP base (same host as `VITE_CONVEX_URL`, typically `https://<deployment>.convex.site`, no trailing slash).
3. In Cursor, enable the **`ailabs-events`** MCP and set **`CONVEX_HTTP_URL`** and **`ADMIN_MCP_SECRET`** in that server’s environment (Cursor Settings → MCP). Use the deployment’s **`https://<name>.convex.site`** base URL (HTTP actions), not the `.convex.cloud` WebSocket/API host.

**HTTP API (Bearer `ADMIN_MCP_SECRET` on every request)**

| Method | Purpose |
|--------|---------|
| `GET /api/mcp/events` | List events (optional query: `published`, `type`, `partner`, `startAtFrom`, `startAtTo`, `limit`) |
| `GET /api/mcp/events?id=…` or `?slug=…` | One event (not both) |
| `POST /api/mcp/events` | Full upsert (same JSON as `admin.upsertEvent`) |
| `PATCH /api/mcp/events` | Partial update: JSON `{ "id": "…", …optional fields }` |
| `DELETE /api/mcp/events?id=…` | Delete by id |

**MCP tools:** `events_list` (optional filters), `events_get` (id or slug), `events_upsert` (full JSON string), `events_patch` (partial JSON string), `events_delete` (id).

**Quick tests (replace URL and secret):**

```bash
# List all
curl -sS -H "Authorization: Bearer YOUR_ADMIN_MCP_SECRET" \
  "https://YOUR_DEPLOYMENT.convex.site/api/mcp/events"

# List with filters
curl -sS -H "Authorization: Bearer YOUR_ADMIN_MCP_SECRET" \
  "https://YOUR_DEPLOYMENT.convex.site/api/mcp/events?published=true&limit=10"

# One event by slug
curl -sS -H "Authorization: Bearer YOUR_ADMIN_MCP_SECRET" \
  "https://YOUR_DEPLOYMENT.convex.site/api/mcp/events?slug=my-event-slug"

# Patch (partial)
curl -sS -X PATCH \
  -H "Authorization: Bearer YOUR_ADMIN_MCP_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"id":"YOUR_EVENT_ID","published":true}' \
  "https://YOUR_DEPLOYMENT.convex.site/api/mcp/events"

# Delete
curl -sS -X DELETE \
  -H "Authorization: Bearer YOUR_ADMIN_MCP_SECRET" \
  "https://YOUR_DEPLOYMENT.convex.site/api/mcp/events?id=YOUR_EVENT_ID"
```

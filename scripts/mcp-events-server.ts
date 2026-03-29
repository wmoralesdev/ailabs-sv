/**
 * Stdio MCP server: CRUD events via Convex HTTP (Bearer ADMIN_MCP_SECRET).
 * Run: pnpm exec tsx scripts/mcp-events-server.ts
 * Log only to stderr — stdout is reserved for MCP JSON-RPC.
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as z from "zod/v4";

const EVENT_TYPES = [
  "Meetup",
  "Workshop",
  "Social",
  "Conference",
  "Hackathon",
] as const;

const eventTypeEnum = z.enum(EVENT_TYPES);

const EVENTS_UPSERT_DESCRIPTION = `Full create or replace (POST). Same as admin upsert: pass JSON in \`payload\`. Omit \`id\` to create; include \`id\` to replace the whole document.

Required for create: slug, published, type, tags, startAt (ms UTC), title/description/location/dateLabel ({ es, en }), rsvpUrl.

Optional: id, endAt, timezone, isVirtual, partner, country, coverImageId, imageUrl, recapUrl, photoAlbumUrl, galleryDateLabel.

El Salvador local times: convert to UTC ms (America/El_Salvador = UTC-6).`;

const PATCH_DESCRIPTION = `Partial update (PATCH). \`payload\` must be JSON with \`id\` (required) and any optional fields to change (same names as upsert). Nested objects like title replace entirely when provided.`;

function requireEnv(name: string): string {
  const v = process.env[name]?.trim();
  if (!v) {
    throw new Error(`${name} is required for the events MCP server`);
  }
  return v;
}

function eventsUrl(): string {
  const base = requireEnv("CONVEX_HTTP_URL").replace(/\/$/, "");
  return `${base}/api/mcp/events`;
}

async function mcpFetch(
  url: string,
  init: RequestInit
): Promise<{ ok: boolean; status: number; text: string }> {
  const secret = requireEnv("ADMIN_MCP_SECRET");
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${secret}`,
      ...init.headers,
    },
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, text };
}

const listFiltersSchema = z.object({
  published: z.boolean().optional(),
  type: eventTypeEnum.optional(),
  partner: z.string().optional(),
  startAtFrom: z.number().optional(),
  startAtTo: z.number().optional(),
  limit: z.number().int().positive().optional(),
});

function buildListUrl(
  filters: z.infer<typeof listFiltersSchema>
): string {
  const base = eventsUrl();
  const params = new URLSearchParams();
  if (filters.published !== undefined) {
    params.set("published", String(filters.published));
  }
  if (filters.type !== undefined) {
    params.set("type", filters.type);
  }
  if (filters.partner !== undefined) {
    params.set("partner", filters.partner);
  }
  if (filters.startAtFrom !== undefined) {
    params.set("startAtFrom", String(filters.startAtFrom));
  }
  if (filters.startAtTo !== undefined) {
    params.set("startAtTo", String(filters.startAtTo));
  }
  if (filters.limit !== undefined) {
    params.set("limit", String(filters.limit));
  }
  const q = params.toString();
  return q ? `${base}?${q}` : base;
}

const server = new McpServer(
  { name: "ailabs-events", version: "1.0.0" },
  {
    instructions:
      "CRUD for ailabs.sv events over HTTPS. events_list (optional filters), events_get (id or slug), events_upsert (full JSON), events_patch (partial JSON with id), events_delete (id). POST = full upsert. CONVEX_HTTP_URL must be https://<deployment>.convex.site. Set ADMIN_MCP_SECRET in Cursor MCP env.",
  }
);

server.registerTool(
  "events_list",
  {
    description:
      "List events (newest startAt first). Optional filters: published, type, partner, startAtFrom/startAtTo (ms UTC), limit.",
    inputSchema: listFiltersSchema,
  },
  async (filters) => {
    const url = buildListUrl(filters);
    const { ok, status, text } = await mcpFetch(url, { method: "GET" });
    if (!ok) {
      return {
        content: [{ type: "text" as const, text: `HTTP ${status}: ${text}` }],
        isError: true,
      };
    }
    return { content: [{ type: "text" as const, text }] };
  }
);

server.registerTool(
  "events_get",
  {
    description: "Get one event by Convex id or by slug (exactly one required).",
    inputSchema: z
      .object({
        id: z.string().optional(),
        slug: z.string().optional(),
      })
      .refine(
        (x) => {
          const hasId = x.id !== undefined && x.id !== "";
          const hasSlug = x.slug !== undefined && x.slug !== "";
          return hasId !== hasSlug;
        },
        { message: "Provide exactly one of id or slug" }
      ),
  },
  async ({ id, slug }) => {
    const base = eventsUrl();
    const params = new URLSearchParams();
    if (id !== undefined && id !== "") {
      params.set("id", id);
    } else if (slug !== undefined && slug !== "") {
      params.set("slug", slug);
    }
    const url = `${base}?${params.toString()}`;
    const { ok, status, text } = await mcpFetch(url, { method: "GET" });
    if (status === 404) {
      return {
        content: [{ type: "text" as const, text: "Not found" }],
        isError: true,
      };
    }
    if (!ok) {
      return {
        content: [{ type: "text" as const, text: `HTTP ${status}: ${text}` }],
        isError: true,
      };
    }
    return { content: [{ type: "text" as const, text }] };
  }
);

server.registerTool(
  "events_upsert",
  {
    description: EVENTS_UPSERT_DESCRIPTION,
    inputSchema: {
      payload: z
        .string()
        .describe(
          "Stringified JSON object matching Convex upsertEvent args (omit id to create)."
        ),
    },
  },
  async ({ payload }) => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(payload);
    } catch {
      return {
        content: [
          {
            type: "text" as const,
            text: "Invalid JSON in payload. Provide a stringified JSON object.",
          },
        ],
        isError: true,
      };
    }

    const { ok, status, text } = await mcpFetch(eventsUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    });

    if (!ok) {
      return {
        content: [
          { type: "text" as const, text: `HTTP ${status}: ${text}` },
        ],
        isError: true,
      };
    }

    return { content: [{ type: "text" as const, text }] };
  }
);

server.registerTool(
  "events_patch",
  {
    description: PATCH_DESCRIPTION,
    inputSchema: {
      payload: z
        .string()
        .describe(
          "JSON string: { id (required), plus optional fields to patch }."
        ),
    },
  },
  async ({ payload }) => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(payload);
    } catch {
      return {
        content: [
          {
            type: "text" as const,
            text: "Invalid JSON in payload.",
          },
        ],
        isError: true,
      };
    }

    const { ok, status, text } = await mcpFetch(eventsUrl(), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    });

    if (!ok) {
      return {
        content: [
          { type: "text" as const, text: `HTTP ${status}: ${text}` },
        ],
        isError: true,
      };
    }

    return { content: [{ type: "text" as const, text }] };
  }
);

server.registerTool(
  "events_delete",
  {
    description: "Delete an event by Convex id.",
    inputSchema: {
      id: z.string().describe("Convex events document id"),
    },
  },
  async ({ id }) => {
    const url = `${eventsUrl()}?${new URLSearchParams({ id }).toString()}`;
    const { ok, status, text } = await mcpFetch(url, { method: "DELETE" });
    if (status === 204) {
      return { content: [{ type: "text" as const, text: "Deleted." }] };
    }
    if (!ok) {
      return {
        content: [
          { type: "text" as const, text: `HTTP ${status}: ${text}` },
        ],
        isError: true,
      };
    }
    return { content: [{ type: "text" as const, text }] };
  }
);

async function main(): Promise<void> {
  requireEnv("CONVEX_HTTP_URL");
  requireEnv("ADMIN_MCP_SECRET");
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});

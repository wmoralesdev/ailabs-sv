import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import type { UpsertEventArgs } from "./lib/event_upsert_args";
import type { PatchEventArgs } from "./lib/event_patch_args";
import type { Id } from "./_generated/dataModel";

const http = httpRouter();

function mcpUnauthorized(): Response {
  return new Response("Unauthorized", { status: 401 });
}

function mcpNotConfigured(): Response {
  return new Response("MCP events not configured", { status: 503 });
}

function readBearerSecret(request: Request): "ok" | "unauthorized" | "missing" {
  const secret = process.env.ADMIN_MCP_SECRET;
  if (!secret?.trim()) {
    return "missing";
  }
  const auth = request.headers.get("Authorization");
  const token =
    auth?.startsWith("Bearer ") ? auth.slice("Bearer ".length).trim() : null;
  if (!token || token !== secret) {
    return "unauthorized";
  }
  return "ok";
}

const EVENT_TYPES = [
  "Meetup",
  "Workshop",
  "Social",
  "Conference",
  "Hackathon",
] as const;

function parsePublished(
  raw: string | null
): boolean | undefined | "invalid" {
  if (raw === null) return undefined;
  if (raw === "true") return true;
  if (raw === "false") return false;
  return "invalid";
}

function parseOptionalNumber(raw: string | null): number | undefined {
  if (raw === null || raw === "") return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

function parseType(
  raw: string | null
): (typeof EVENT_TYPES)[number] | undefined | "invalid" {
  if (raw === null || raw === "") return undefined;
  if ((EVENT_TYPES as ReadonlyArray<string>).includes(raw)) {
    return raw as (typeof EVENT_TYPES)[number];
  }
  return "invalid";
}

http.route({
  path: "/api/mcp/events",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const auth = readBearerSecret(request);
    if (auth === "missing") return mcpNotConfigured();
    if (auth === "unauthorized") return mcpUnauthorized();

    const url = new URL(request.url);
    const idTrim = (url.searchParams.get("id") ?? "").trim();
    const slugTrim = (url.searchParams.get("slug") ?? "").trim();

    if (idTrim !== "" && slugTrim !== "") {
      return new Response(JSON.stringify({ error: "Use only one of id or slug" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      if (idTrim !== "" || slugTrim !== "") {
        const doc = await ctx.runQuery(internal.events_mcp_internal.getEvent, {
          id: idTrim !== "" ? (idTrim as Id<"events">) : undefined,
          slug: slugTrim !== "" ? slugTrim : undefined,
        });
        if (doc === null) {
          return new Response(JSON.stringify({ error: "Not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify(doc), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      const published = parsePublished(url.searchParams.get("published"));
      if (published === "invalid") {
        return new Response(
          JSON.stringify({ error: "published must be true or false" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const type = parseType(url.searchParams.get("type"));
      if (type === "invalid") {
        return new Response(
          JSON.stringify({
            error: `type must be one of: ${EVENT_TYPES.join(", ")}`,
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const partner = url.searchParams.get("partner");
      const startAtFrom = parseOptionalNumber(
        url.searchParams.get("startAtFrom")
      );
      const startAtTo = parseOptionalNumber(url.searchParams.get("startAtTo"));
      const limit = parseOptionalNumber(url.searchParams.get("limit"));

      const events = await ctx.runQuery(
        internal.events_mcp_internal.listEvents,
        {
          published,
          type,
          partner: partner === null || partner === "" ? undefined : partner,
          startAtFrom,
          startAtTo,
          limit,
        }
      );

      return new Response(JSON.stringify(events), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Request failed";
      return new Response(JSON.stringify({ error: message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }),
});

http.route({
  path: "/api/mcp/events",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const auth = readBearerSecret(request);
    if (auth === "missing") return mcpNotConfigured();
    if (auth === "unauthorized") return mcpUnauthorized();

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    if (body === null || typeof body !== "object") {
      return new Response("Expected JSON object", { status: 400 });
    }

    try {
      const id = await ctx.runMutation(
        internal.events_mcp_internal.applyUpsert,
        body as UpsertEventArgs
      );
      return new Response(JSON.stringify({ id: String(id) }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Upsert failed";
      return new Response(JSON.stringify({ error: message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }),
});

http.route({
  path: "/api/mcp/events",
  method: "PATCH",
  handler: httpAction(async (ctx, request) => {
    const auth = readBearerSecret(request);
    if (auth === "missing") return mcpNotConfigured();
    if (auth === "unauthorized") return mcpUnauthorized();

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    if (body === null || typeof body !== "object") {
      return new Response("Expected JSON object", { status: 400 });
    }

    try {
      const id = await ctx.runMutation(
        internal.events_mcp_internal.patchEvent,
        body as PatchEventArgs
      );
      return new Response(JSON.stringify({ id: String(id) }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Patch failed";
      const status = message === "Event not found" ? 404 : 500;
      return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { "Content-Type": "application/json" },
      });
    }
  }),
});

http.route({
  path: "/api/mcp/events",
  method: "DELETE",
  handler: httpAction(async (ctx, request) => {
    const auth = readBearerSecret(request);
    if (auth === "missing") return mcpNotConfigured();
    if (auth === "unauthorized") return mcpUnauthorized();

    const url = new URL(request.url);
    const idParam = url.searchParams.get("id");
    if (idParam === null || idParam === "") {
      return new Response(JSON.stringify({ error: "Missing id query param" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      await ctx.runMutation(internal.events_mcp_internal.removeEvent, {
        id: idParam as Id<"events">,
      });
      return new Response(null, { status: 204 });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Delete failed";
      const status = message === "Event not found" ? 404 : 500;
      return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { "Content-Type": "application/json" },
      });
    }
  }),
});

const turnstileCorsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

http.route({
  path: "/api/turnstile/verify",
  method: "OPTIONS",
  handler: httpAction(() => {
    return new Response(null, { status: 204, headers: turnstileCorsHeaders });
  }),
});

http.route({
  path: "/api/turnstile/verify",
  method: "POST",
  handler: httpAction(async (_ctx, request) => {
    const secret = process.env.TURNSTILE_SECRET;
    if (!secret?.trim()) {
      return new Response(
        JSON.stringify({ error: "Turnstile not configured", success: false }),
        {
          status: 503,
          headers: { "Content-Type": "application/json", ...turnstileCorsHeaders },
        },
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON", success: false }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...turnstileCorsHeaders },
      });
    }

    const token =
      typeof body === "object" &&
      body !== null &&
      "token" in body &&
      typeof (body as { token: unknown }).token === "string"
        ? (body as { token: string }).token
        : null;

    if (!token?.trim()) {
      return new Response(JSON.stringify({ error: "Missing token", success: false }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...turnstileCorsHeaders },
      });
    }

    const forwarded = request.headers.get("x-forwarded-for");
    const remoteip =
      request.headers.get("cf-connecting-ip") ??
      (forwarded ? forwarded.split(",")[0]?.trim() : null);

    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret,
          response: token,
          ...(remoteip ? { remoteip } : {}),
        }),
      },
    );

    const result = (await verifyRes.json()) as { success?: boolean };
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json", ...turnstileCorsHeaders },
    });
  }),
});

export default http;

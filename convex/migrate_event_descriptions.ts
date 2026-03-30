import { internalMutation } from "./_generated/server";
import {
  MAX_EVENT_DESCRIPTION_LENGTH,
  assertLocalizedDescriptionWithinLimit,
} from "./lib/event_content_limits";

/**
 * Curated rewrites (not truncation) for events that exceeded the description cap.
 * Add entries here when you need a one-off sync; then run:
 * `npx convex run internal/migrate_event_descriptions:applyCuratedRewrites`
 */
const DESCRIPTION_REWRITES_BY_SLUG: Record<
  string,
  { es: string; en: string }
> = {
  "hack-latam": {
    es: "Hackathon social LATAM (15–17 may): equipos 1–4, remoto por Discord en español. Abierto a todos; problemas regionales en foco.",
    en: "LATAM social hackathon May 15–17: teams of 1–4, remote on Discord (Spanish). Open to all; regional challenges in focus.",
  },
  "2026-04-14-cursor-lab-uca": {
    es: "Tarde práctica en la UCA con Cursor: proyecto real, diffs y flujo con Ai Labs. Prioridad estudiantes UCA; cupo limitado. Powered by Ai /abs.",
    en: "Hands-on afternoon at UCA with Cursor: real build, diffs, and workflow with Ai Labs mentors. UCA students first; limited seats. Powered by Ai /abs.",
  },
  "2026-04-25-zero-to-agent-san-salvador": {
    es: "Meetup Ai Labs en Zero to Agent (24 abr–3 may): de idea a agente con v0 y Vercel. Perfiles mixtos; ruta a la competición global. Horario en Luma. Co-organiza The AI Collective SV. Powered by Ai /abs.",
    en: "Ai Labs meetup during Zero to Agent (Apr 24–May 3): ship a real agent with v0 and Vercel. Mixed backgrounds; path to Vercel Community. Time on Luma. Co-hosted by The AI Collective SV. Powered by Ai /abs.",
  },
};

export const applyCuratedRewrites = internalMutation({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("events").collect();
    let updated = 0;
    const skipped: Array<string> = [];

    for (const [slug, next] of Object.entries(DESCRIPTION_REWRITES_BY_SLUG)) {
      const e = rows.find((r) => r.slug === slug);
      if (!e) {
        skipped.push(`${slug} (no matching event)`);
        continue;
      }

      if (
        next.es.length > MAX_EVENT_DESCRIPTION_LENGTH ||
        next.en.length > MAX_EVENT_DESCRIPTION_LENGTH
      ) {
        skipped.push(`${slug} (curated copy over limit)`);
        continue;
      }
      assertLocalizedDescriptionWithinLimit(next);

      const same =
        e.description.es === next.es && e.description.en === next.en;
      if (same) continue;

      await ctx.db.patch(e._id, {
        description: next,
        updatedAt: Date.now(),
      });
      updated += 1;
    }

    return { scanned: rows.length, updated, skipped };
  },
});

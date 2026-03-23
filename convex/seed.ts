import { internalMutation } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

const IMAGE_PLACEHOLDER =
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop";

function isoToMs(iso: string): number {
  return new Date(iso).getTime();
}

type SeedEvent = {
  slug: string;
  rsvpUrl: string;
  type: "Meetup" | "Workshop" | "Social" | "Conference" | "Hackathon";
  partner?: string;
  country?: { es: string; en: string };
  isVirtual?: boolean;
  timezone: string;
  startAt: number;
  endAt?: number;
  title: { es: string; en: string };
  description: { es: string; en: string };
  location: { es: string; en: string };
  tags: string[];
  photoAlbumUrl?: string;
  coverImageId?: Id<"_storage">;
};

function formatDateLabel(ms: number, tz: string, locale: "es" | "en"): string {
  return new Intl.DateTimeFormat(locale === "es" ? "es-SV" : "en-US", {
    timeZone: tz,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(ms));
}

const EVENTS: SeedEvent[] = [
  {
    slug: "cursor-meetup-san-salvador-1st-ed",
    rsvpUrl: "https://lu.ma/t9n17knq",
    type: "Meetup" as const,
    partner: "Cursor",
    coverImageId: "db2a70fd-f6d1-4c54-b8ce-418b2bbde7fe" as Id<"_storage">,
    timezone: "America/El_Salvador",
    startAt: isoToMs("2024-09-21T22:30:00Z"),
    endAt: isoToMs("2024-09-22T00:30:00Z"),
    title: {
      es: "Cursor Meetup San Salvador (1st ed.)",
      en: "Cursor Meetup San Salvador (1st ed.)",
    },
    description: {
      es: "Una tarde de showcase y networking con Cursor: demos en vivo, bebidas y espacio para conectar con la comunidad local.",
      en: "An afternoon of Cursor demos and networking: live showcase, drinks, and time to connect with the local builder community.",
    },
    location: {
      es: "Universidad Centroamericana (UCA), San Salvador",
      en: "Central American University (UCA), San Salvador",
    },
    tags: ["Cursor", "AI", "Networking"],
    photoAlbumUrl: "https://photos.app.goo.gl/hVpWW3GdN2wsqdhN7",
  },
  {
    slug: "cursor-workshop-el-salvador-zoom",
    rsvpUrl: "https://lu.ma/uf2mpfis",
    type: "Workshop" as const,
    partner: "Cursor",
    isVirtual: true,
    timezone: "America/El_Salvador",
    startAt: isoToMs("2024-10-19T16:00:00Z"),
    endAt: isoToMs("2024-10-19T18:00:00Z"),
    title: {
      es: "Cursor Workshop El Salvador",
      en: "Cursor Workshop El Salvador",
    },
    description: {
      es: "Taller introductorio para descubrir Cursor: autocompletado, chat con agentes, ediciones inline y flujos de trabajo para construir más rápido.",
      en: "Intro workshop to Cursor: autocompletion, agent chat, inline edits, and practical workflows to build faster.",
    },
    location: { es: "Virtual (Zoom)", en: "Virtual (Zoom)" },
    tags: ["Cursor", "Workshop", "AI"],
    photoAlbumUrl: "https://photos.app.goo.gl/DYiKX3hxjghCak349",
  },
  {
    slug: "cursor-hackathon-san-salvador-brunch-edition",
    rsvpUrl: "https://lu.ma/2s140tf2",
    type: "Hackathon" as const,
    partner: "Cursor",
    coverImageId: "fb738a4d-6756-4ee3-9ee5-04b6840a69a4" as Id<"_storage">,
    timezone: "America/El_Salvador",
    startAt: isoToMs("2024-11-09T16:45:00Z"),
    endAt: isoToMs("2024-11-09T20:30:00Z"),
    title: {
      es: "Cursor Hackathon San Salvador (brunch edition)",
      en: "Cursor Hackathon San Salvador (brunch edition)",
    },
    description: {
      es: "Hackathon grupal de 2 horas con brunch: forma equipo, construye una solución rápida y presenta demos al final.",
      en: "A fast-paced, team hackathon with brunch: form a group, build in 2 hours, and demo at the end.",
    },
    location: {
      es: "Café Luz Negra (Millenium Plaza), San Salvador",
      en: "Café Luz Negra (Millenium Plaza), San Salvador",
    },
    tags: ["Cursor", "Hackathon", "Brunch"],
    photoAlbumUrl: "https://photos.app.goo.gl/do6sTx3BsPEaNcLQ7",
  },
  {
    slug: "cafe-cursor-san-salvador-1st-ed",
    rsvpUrl: "https://lu.ma/4fg35sfb",
    type: "Social" as const,
    partner: "Cursor",
    coverImageId: "0d769ccc-7306-4cd6-8fd6-a6c6a1697f91" as Id<"_storage">,
    timezone: "America/El_Salvador",
    startAt: isoToMs("2025-07-19T20:00:00Z"),
    endAt: isoToMs("2025-07-20T00:30:00Z"),
    title: {
      es: "Café Cursor San Salvador (1st ed.)",
      en: "Café Cursor San Salvador (1st ed.)",
    },
    description: {
      es: "Sesión abierta para trabajar con tu laptop, aprender con demos y conversar con la comunidad. Incluye café, snacks y créditos de Cursor.",
      en: "Bring your laptop to work, learn from hourly demos, and meet the community. Includes coffee, snacks, and Cursor credits.",
    },
    location: {
      es: "La Biblioteca Café SV, San Salvador",
      en: "La Biblioteca Café SV, San Salvador",
    },
    tags: ["Cursor", "Community", "Coworking"],
    photoAlbumUrl: "https://photos.app.goo.gl/WHd8v7hVQ9vBGTvFA",
  },
  {
    slug: "cursor-workshop-san-salvador-ues",
    rsvpUrl: "https://lu.ma/lpif187z",
    type: "Workshop" as const,
    partner: "Cursor",
    coverImageId: "f5c61583-8913-495f-a7a0-c20a3b9b360f" as Id<"_storage">,
    timezone: "America/El_Salvador",
    startAt: isoToMs("2025-04-12T16:00:00Z"),
    endAt: isoToMs("2025-04-12T19:00:00Z"),
    title: {
      es: "Cursor + Supabase Workshop (UES)",
      en: "Cursor + Supabase Workshop (UES)",
    },
    description: {
      es: "Taller en vivo: desarrollo web acelerado con Cursor mientras construimos una app completa con autenticación y features en tiempo real usando Supabase.",
      en: "Live workshop: build a full web app faster with Cursor, including auth and realtime features powered by Supabase.",
    },
    location: {
      es: "Universidad de El Salvador (Auditorio El Espino), San Salvador",
      en: "University of El Salvador (El Espino Auditorium), San Salvador",
    },
    tags: ["Cursor", "Supabase", "Workshop"],
  },
  {
    slug: "cafe-cursor-san-salvador-2nd-ed",
    rsvpUrl: "https://lu.ma/j7w847xv",
    type: "Social" as const,
    partner: "Cursor",
    coverImageId: "7e3654d7-0960-4254-bf40-476f2f3cd3c4" as Id<"_storage">,
    timezone: "America/El_Salvador",
    startAt: isoToMs("2025-09-27T21:00:00Z"),
    endAt: isoToMs("2025-09-28T01:30:00Z"),
    title: {
      es: "Café Cursor San Salvador (2nd ed.)",
      en: "Café Cursor San Salvador (2nd ed.)",
    },
    description: {
      es: "Edición enfocada en trabajo colaborativo, mentorías, charlas cortas y networking para builders. Cupo limitado.",
      en: "A builder-focused edition with collaborative work time, mentoring, lightning talks, and networking. Limited capacity.",
    },
    location: {
      es: "La Biblioteca Café SV, San Salvador",
      en: "La Biblioteca Café SV, San Salvador",
    },
    tags: ["Cursor", "Networking", "Community"],
    photoAlbumUrl: "https://photos.app.goo.gl/AFHgh6CAZzCq6jm79",
  },
  {
    slug: "v0-prompt-to-production-san-salvador",
    rsvpUrl: "https://lu.ma/v7ymd62b",
    type: "Social" as const,
    partner: "v0",
    timezone: "America/El_Salvador",
    startAt: isoToMs("2025-11-08T22:00:00Z"),
    endAt: isoToMs("2025-11-09T02:00:00Z"),
    title: {
      es: "v0 Prompt to Production — San Salvador",
      en: "v0 Prompt to Production — San Salvador",
    },
    description: {
      es: "Tarde de building con v0: explora la nueva actualización, crea proyectos en comunidad y participa en el showcase global.",
      en: "An afternoon of building with v0: explore the latest update, build together, and join the global community showcase.",
    },
    location: { es: "San Salvador", en: "San Salvador" },
    tags: ["v0", "Vercel", "Builders"],
  },
  {
    slug: "v0-prompt-to-production-guatemala-city",
    rsvpUrl: "https://lu.ma/xoc8bw50",
    type: "Social" as const,
    partner: "v0",
    country: { es: "Guatemala", en: "Guatemala" },
    timezone: "America/Guatemala",
    startAt: isoToMs("2025-11-15T22:00:00Z"),
    endAt: isoToMs("2025-11-16T02:00:00Z"),
    title: {
      es: "v0 Prompt to Production — Guatemala City",
      en: "v0 Prompt to Production — Guatemala City",
    },
    description: {
      es: "Edición Guatemala: tarde de building con v0 y comunidad local para crear proyectos y sumarlos al showcase global.",
      en: "Guatemala edition: build with v0 alongside the local community and ship projects for the global showcase.",
    },
    location: {
      es: "Campus Tec II, Ciudad de Guatemala",
      en: "Campus Tec II, Guatemala City",
    },
    tags: ["v0", "Community", "AI"],
  },
  {
    slug: "cafe-cursor-san-salvador-3rd-ed",
    rsvpUrl: "https://lu.ma/avhefx6z",
    type: "Social" as const,
    partner: "Cursor",
    coverImageId: "1f455157-6ac7-4428-b6af-728e11c7b778" as Id<"_storage">,
    country: { es: "El Salvador", en: "El Salvador" },
    timezone: "America/El_Salvador",
    startAt: isoToMs("2025-12-13T21:00:00Z"),
    endAt: isoToMs("2025-12-14T02:00:00Z"),
    title: {
      es: "Café Cursor San Salvador (3rd ed.)",
      en: "Café Cursor San Salvador (3rd ed.)",
    },
    description: {
      es: "Edición enfocada en desarrollo móvil: workflows iOS/Android, Q&A, lightning pitches y trading cards para networking.",
      en: "Mobile-focused edition: iOS/Android workflows, Q&A, lightning pitches, and networking with developer trading cards.",
    },
    location: {
      es: "La Biblioteca Café SV, San Salvador",
      en: "La Biblioteca Café SV, San Salvador",
    },
    tags: ["Cursor", "Mobile", "Community"],
    photoAlbumUrl: "https://photos.app.goo.gl/X4gF3SAVKAG665gb9",
  },
  {
    slug: "cursor-lab-road-to-hackathon-virtual",
    rsvpUrl: "https://lu.ma/tiie4z63",
    type: "Workshop" as const,
    partner: "Cursor",
    isVirtual: true,
    timezone: "America/El_Salvador",
    startAt: isoToMs("2026-01-17T21:00:00Z"),
    endAt: isoToMs("2026-01-17T23:00:00Z"),
    title: {
      es: "Cursor Lab: Road to Hackathon",
      en: "Cursor Lab: Road to Hackathon",
    },
    description: {
      es: "Sesión práctica para llegar listo al hackathon: setup, flujos de trabajo, modelos y técnicas para dar mejor contexto a Cursor.",
      en: "Hands-on prep session for the hackathon: setup, workflows, models, and techniques to give Cursor better context.",
    },
    location: { es: "Virtual", en: "Virtual" },
    tags: ["Cursor", "Workshop", "Hackathon"],
  },
  {
    slug: "cursor-pre-hackathon-san-salvador-qa",
    rsvpUrl: "https://lu.ma/0bbxr2lz",
    type: "Workshop" as const,
    partner: "Cursor",
    isVirtual: true,
    timezone: "America/El_Salvador",
    startAt: isoToMs("2026-01-27T21:00:00Z"),
    endAt: isoToMs("2026-01-27T21:45:00Z"),
    title: {
      es: "Cursor Pre-Hackathon San Salvador (Q&A)",
      en: "Cursor Pre-Hackathon San Salvador (Q&A)",
    },
    description: {
      es: "Sesión de calentamiento con Q&A para resolver dudas técnicas y logísticas antes del hackathon.",
      en: "Warm-up Q&A session to resolve technical and logistical questions before the hackathon.",
    },
    location: { es: "Virtual", en: "Virtual" },
    tags: ["Cursor", "Q&A", "Hackathon"],
  },
  {
    slug: "cursor-hackathon-san-salvador-full-day",
    rsvpUrl: "https://lu.ma/9v6p0gz6",
    type: "Hackathon" as const,
    partner: "Cursor",
    coverImageId: "683e03cb-eb01-495d-b6d1-45c7fb41132e" as Id<"_storage">,
    timezone: "America/El_Salvador",
    startAt: isoToMs("2026-01-31T16:00:00Z"),
    endAt: isoToMs("2026-01-31T23:00:00Z"),
    title: {
      es: "Cursor Hackathon San Salvador (full-day)",
      en: "Cursor Hackathon San Salvador (full-day)",
    },
    description: {
      es: "Hackathon presencial de día completo en colaboración con Vudy y The AI Collective: equipos 2–4, mentorías, demos y premios.",
      en: "A full-day in-person hackathon with Vudy and The AI Collective: teams of 2–4, mentors, demos, and prizes.",
    },
    location: {
      es: "La Libertad (ubicación detallada en Luma)",
      en: "La Libertad (exact location on Luma)",
    },
    tags: ["Cursor", "Hackathon", "Vudy"],
    photoAlbumUrl: "https://photos.app.goo.gl/qNSHWVYZwThjrUuY9",
  },
  {
    slug: "cursor-lab-san-salvador-ufg-web-mobile",
    rsvpUrl: "https://lu.ma/33bff8cb",
    type: "Workshop" as const,
    partner: "Cursor",
    coverImageId: "bdd296e6-0a7e-41f4-8174-ed258f75147a" as Id<"_storage">,
    timezone: "America/El_Salvador",
    startAt: isoToMs("2026-02-16T19:00:00Z"),
    endAt: isoToMs("2026-02-16T22:00:00Z"),
    title: {
      es: "Cursor Lab San Salvador (UFG) — Web + Mobile",
      en: "Cursor Lab San Salvador (UFG) — Web + Mobile",
    },
    description: {
      es: "Lab práctico de dos días: construye apps completas con Cursor, React y Supabase (web el día 1, mobile con Expo el día 2).",
      en: "Two-day hands-on lab: build complete apps with Cursor, React, and Supabase (web day 1, mobile with Expo day 2).",
    },
    location: {
      es: "UFG (Edificio de Bibliotecas y Laboratorios Especializados), San Salvador",
      en: "UFG (Libraries and Specialized Labs Building), San Salvador",
    },
    tags: ["Cursor", "React", "Supabase"],
    photoAlbumUrl: "https://photos.app.goo.gl/jcCUXXhsBt41kUZW9",
  },
];

export const seedEvents = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    const existing = await ctx.db.query("events").collect();
    for (const event of existing) {
      await ctx.db.delete(event._id);
    }

    let inserted = 0;
    for (const e of EVENTS) {
      const dateLabel = {
        es: formatDateLabel(e.startAt, e.timezone, "es"),
        en: formatDateLabel(e.startAt, e.timezone, "en"),
      };

      await ctx.db.insert("events", {
        slug: e.slug,
        published: true,
        type: e.type,
        tags: e.tags,
        isVirtual: e.isVirtual,
        partner: e.partner,
        country: e.country,
        startAt: e.startAt,
        endAt: e.endAt,
        timezone: e.timezone,
        title: e.title,
        description: e.description,
        location: e.location,
        dateLabel,
        rsvpUrl: e.rsvpUrl,
        coverImageId: e.coverImageId,
        imageUrl: e.coverImageId ? undefined : IMAGE_PLACEHOLDER,
        recapUrl: e.rsvpUrl,
        photoAlbumUrl: e.photoAlbumUrl,
        galleryDateLabel: dateLabel,
        createdAt: now,
        updatedAt: now,
      });
      inserted++;
    }

    return { inserted, deleted: existing.length };
  },
});

const LAB_CARDS_SEED: Array<{
  title: { es: string; en: string };
  description: { es: string; en: string };
  dateLabel: { es: string; en: string };
}> = [
  {
    title: {
      es: "Construyendo con agentes de IA",
      en: "Building with AI agents",
    },
    description: {
      es: "Cómo pasamos de prototipos de LLM a agentes que realmente funcionan en producción.",
      en: "How we went from LLM prototypes to agents that actually work in production.",
    },
    dateLabel: { es: "Febrero 2026", en: "February 2026" },
  },
  {
    title: {
      es: "Cursor + v0: el stack de los curiosos",
      en: "Cursor + v0: the curious builder's stack",
    },
    description: {
      es: "Por qué estas herramientas cambiaron la forma en que prototipeamos — y qué aprendimos en el camino.",
      en: "Why these tools changed how we prototype — and what we learned along the way.",
    },
    dateLabel: { es: "Enero 2026", en: "January 2026" },
  },
  {
    title: {
      es: "Las preguntas que nadie hace",
      en: "The questions nobody asks",
    },
    description: {
      es: "Tres experimentos que fallaron, y por qué importan más que los que funcionaron.",
      en: "Three experiments that failed, and why they matter more than the ones that worked.",
    },
    dateLabel: { es: "Diciembre 2025", en: "December 2025" },
  },
];

/**
 * Inserts default lab cards only when `labCards` is empty (safe for existing deployments).
 */
export const seedLabCardsIfEmpty = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("labCards").collect();
    if (existing.length > 0) {
      return { skipped: true as const, count: existing.length };
    }
    const now = Date.now();
    let order = 0;
    for (const c of LAB_CARDS_SEED) {
      await ctx.db.insert("labCards", {
        order: order++,
        published: true,
        title: c.title,
        description: c.description,
        dateLabel: c.dateLabel,
        createdAt: now,
        updatedAt: now,
      });
    }
    return { skipped: false as const, inserted: LAB_CARDS_SEED.length };
  },
});

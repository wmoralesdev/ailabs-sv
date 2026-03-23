import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { isAdmin } from "./lib/admin";

const localizedValidator = v.object({
  es: v.string(),
  en: v.string(),
});

const MAX_TITLE = 200;
const MAX_DESC = 2000;
const MAX_DATE = 120;

function trimLocalized(
  x: { es: string; en: string },
  maxLen: number
): { es: string; en: string } {
  const es = x.es.trim();
  const en = x.en.trim();
  if (!es || !en) {
    throw new Error("All localized fields are required");
  }
  if (es.length > maxLen || en.length > maxLen) {
    throw new Error(`Text exceeds ${maxLen} characters`);
  }
  return { es, en };
}

/**
 * Public lab cards for landing ("From the Lab" grid).
 */
export const listPublic = query({
  args: {
    language: v.union(v.literal("es"), v.literal("en")),
  },
  handler: async (ctx, args) => {
    const lang = args.language;
    const all = await ctx.db.query("labCards").collect();
    const published = all
      .filter((c) => c.published)
      .sort((a, b) => a.order - b.order);
    return published.map((c) => ({
      id: c._id,
      title: c.title[lang],
      description: c.description[lang],
      date: c.dateLabel[lang],
    }));
  },
});

/**
 * All lab cards for admin (includes unpublished).
 */
export const listForAdmin = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject ?? null;
    if (!userId || !isAdmin(userId)) {
      throw new Error("Admin access required");
    }
    const all = await ctx.db.query("labCards").collect();
    return all.sort((a, b) => a.order - b.order);
  },
});

export const upsertCard = mutation({
  args: {
    id: v.optional(v.id("labCards")),
    published: v.boolean(),
    title: localizedValidator,
    description: localizedValidator,
    dateLabel: localizedValidator,
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject ?? null;
    if (!userId || !isAdmin(userId)) {
      throw new Error("Admin access required");
    }

    const title = trimLocalized(args.title, MAX_TITLE);
    const description = trimLocalized(args.description, MAX_DESC);
    const dateLabel = trimLocalized(args.dateLabel, MAX_DATE);

    const now = Date.now();

    if (args.id) {
      const existing = await ctx.db.get(args.id);
      if (!existing) throw new Error("Card not found");
      await ctx.db.patch(args.id, {
        published: args.published,
        title,
        description,
        dateLabel,
        updatedAt: now,
      });
      return args.id;
    }

    const all = await ctx.db.query("labCards").collect();
    const maxOrder = all.reduce((m, c) => Math.max(m, c.order), -1);
    const order = maxOrder + 1;

    return await ctx.db.insert("labCards", {
      order,
      published: args.published,
      title,
      description,
      dateLabel,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const deleteCard = mutation({
  args: { id: v.id("labCards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject ?? null;
    if (!userId || !isAdmin(userId)) {
      throw new Error("Admin access required");
    }
    await ctx.db.delete(args.id);
  },
});

export const reorderCards = mutation({
  args: {
    orderedIds: v.array(v.id("labCards")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject ?? null;
    if (!userId || !isAdmin(userId)) {
      throw new Error("Admin access required");
    }

    const all = await ctx.db.query("labCards").collect();
    const idSet = new Set(all.map((c) => c._id));
    if (args.orderedIds.length !== idSet.size) {
      throw new Error("orderedIds must include every card exactly once");
    }
    for (const id of args.orderedIds) {
      if (!idSet.has(id)) throw new Error("Invalid card id in orderedIds");
    }

    const now = Date.now();
    for (let i = 0; i < args.orderedIds.length; i++) {
      await ctx.db.patch(args.orderedIds[i], {
        order: i,
        updatedAt: now,
      });
    }
  },
});

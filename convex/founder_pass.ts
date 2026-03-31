import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { isAdmin } from "./lib/admin";

/**
 * Admin-only: build a signed founder ticket `.pkpass` (base64).
 * Variant: `links` → PASS_LINKS_QR_URL; `walter` | `daniela` → WhatsApp wa.me + Spanish prefill.
 */
export type FounderPassPkpassResult = { base64: string; filename: string };

export const generateFounderPassPkpass = action({
  args: {
    variant: v.union(v.literal("links"), v.literal("walter"), v.literal("daniela")),
  },
  handler: async (ctx, { variant }): Promise<FounderPassPkpassResult> => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject ?? null;
    if (!userId || !isAdmin(userId)) {
      throw new Error("Admin access required");
    }
    return await ctx.runAction(internal.founder_pass_sign_node.buildFounderPassBuffer, {
      variant,
    });
  },
});

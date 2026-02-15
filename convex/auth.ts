import { query } from "./_generated/server";

/**
 * Compatibility helper.
 * Old clients may still call `auth:isAuthenticated`. Keep this lightweight
 * query to avoid "function not found" noise during/after the Clerk migration.
 */
export const isAuthenticated = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    return Boolean(identity?.subject);
  },
});


import { v } from "convex/values";
import { mutation } from "./_generated/server";

/**
 * Generate a short-lived upload URL for client-side file uploads.
 * Requires auth.
 */
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Must be signed in to upload files");
    }
    return await ctx.storage.generateUploadUrl();
  },
});

/**
 * Get the public URL for a stored file.
 * Requires auth.
 */
export const getStorageUrl = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Must be signed in to get storage URL");
    }
    return await ctx.storage.getUrl(args.storageId);
  },
});

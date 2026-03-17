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

/**
 * Register a user file with path for organization.
 * Path must be users/{userId}/... and caller must match userId.
 */
export const registerUserFile = mutation({
  args: {
    storageId: v.id("_storage"),
    path: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Must be signed in to register files");
    }
    const userId = identity.subject;
    const expectedPrefix = `users/${userId}/`;
    if (!args.path.startsWith(expectedPrefix)) {
      throw new Error(`Path must start with ${expectedPrefix}`);
    }
    await ctx.db.insert("userFiles", {
      userId,
      storageId: args.storageId,
      path: args.path,
      createdAt: Date.now(),
    });
  },
});

import type { Id } from "../_generated/dataModel";
import type { MutationCtx } from "../_generated/server";

/** Keep in sync with `src/lib/cover-upload-limits.ts` (showcase-cover-upload). */
export const MAX_COVER_STORAGE_BYTES = 3 * 1024 * 1024;

/**
 * Enforce max size for Convex `_storage` cover images (events + showcase).
 */
export async function assertCoverStorageWithinLimit(
  ctx: Pick<MutationCtx, "storage">,
  storageId: Id<"_storage">,
  maxBytes: number = MAX_COVER_STORAGE_BYTES,
): Promise<void> {
  const meta = await ctx.storage.getMetadata(storageId);
  if (!meta) {
    throw new Error("Cover file not found");
  }
  if (meta.size > maxBytes) {
    const mb = maxBytes / (1024 * 1024);
    throw new Error(`Cover image must be ${mb}MB or smaller`);
  }
}

"use node";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v } from "convex/values";
import { action } from "./_generated/server";

/**
 * Presigned PUT for direct browser uploads to R2. Returns null when env is not configured.
 * Wire into the app after bucket + keys exist in the Convex dashboard.
 */
export const getPresignedPutUrl = action({
  args: {
    key: v.string(),
    contentType: v.string(),
  },
  handler: async (_ctx, args) => {
    const endpoint = process.env.R2_ENDPOINT?.trim();
    const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim();
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim();
    const bucket = process.env.R2_BUCKET_NAME?.trim();
    if (!endpoint || !accessKeyId || !secretAccessKey || !bucket) {
      return null;
    }

    const client = new S3Client({
      region: "auto",
      endpoint,
      credentials: { accessKeyId, secretAccessKey },
    });

    const cmd = new PutObjectCommand({
      Bucket: bucket,
      Key: args.key,
      ContentType: args.contentType,
    });

    const uploadUrl = await getSignedUrl(client, cmd, { expiresIn: 3600 });
    const publicBase = process.env.R2_PUBLIC_BASE_URL?.replace(/\/$/, "") ?? "";
    const publicUrl = publicBase ? `${publicBase}/${args.key}` : null;

    return { uploadUrl, publicUrl };
  },
});

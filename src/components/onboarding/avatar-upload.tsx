"use client";

import { useCallback, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { HugeiconsIcon } from "@hugeicons/react";
import { Upload04Icon, UserCircleIcon } from "@hugeicons/core-free-icons";
import type { Id } from "convex/_generated/dataModel";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_SIZE_MB = 2;
const ACCEPT = "image/jpeg,image/png,image/webp";
const ACCEPT_EXTENSIONS = ["JPG", "PNG", "WebP"];

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function getExtension(file: File): string {
  const fromName = file.name.split(".").pop()?.toLowerCase();
  if (fromName && ["jpg", "jpeg", "png", "webp"].includes(fromName)) {
    return fromName === "jpeg" ? "jpg" : fromName;
  }
  return MIME_TO_EXT[file.type] ?? "webp";
}

interface AvatarUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  uploadCta: string;
  uploading: string;
  userId: string;
  dragDropHint?: string;
  fileSizeHint?: string;
  required?: boolean;
}

export function AvatarUpload({
  value,
  onChange,
  label,
  uploadCta,
  uploading,
  userId,
  dragDropHint = "Drag & drop or click to upload",
  fileSizeHint = `${ACCEPT_EXTENSIONS.join(", ")} — max ${MAX_SIZE_MB}MB`,
  required = false,
}: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
  const getStorageUrl = useMutation(api.storage.getStorageUrl);
  const registerUserFile = useMutation(api.storage.registerUserFile);

  const processFile = useCallback(
    async (file: File) => {
      setError(null);
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`Max size ${MAX_SIZE_MB}MB`);
        return;
      }
      if (!ACCEPT.split(",").some((t) => file.type === t.trim())) {
        setError("Use JPG, PNG or WebP");
        return;
      }

      setIsUploading(true);
      try {
        const postUrl = await generateUploadUrl();
        const res = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        if (!res.ok) throw new Error("Upload failed");
        const { storageId } = (await res.json()) as { storageId: Id<"_storage"> };
        const ext = getExtension(file);
        const path = `users/${userId}/avatar.${ext}`;
        await registerUserFile({ storageId, path });
        const url = await getStorageUrl({ storageId });
        if (url) onChange(url);
      } catch {
        setError("Upload failed. Try again.");
      } finally {
        setIsUploading(false);
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    [generateUploadUrl, getStorageUrl, registerUserFile, onChange, userId]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const { files } = e.dataTransfer;
      if (files.length > 0) processFile(files[0]);
    },
    [processFile]
  );

  return (
    <Field>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="flex items-start gap-4">
        {/* Left: Circular preview */}
        <div className="flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted size-20">
          {value ? (
            <img src={value} alt="" className="size-full object-cover" />
          ) : (
            <HugeiconsIcon
              icon={UserCircleIcon}
              className="size-10 text-muted-foreground/50"
              aria-hidden
            />
          )}
        </div>

        {/* Right: Dropzone area */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-5 text-center transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
            isUploading && "pointer-events-none opacity-60"
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            onChange={handleFileSelect}
            className="hidden"
            aria-label={uploadCta}
          />

          <HugeiconsIcon
            icon={Upload04Icon}
            className={cn(
              "size-6",
              isDragging ? "text-primary" : "text-muted-foreground"
            )}
            aria-hidden
          />

          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              {isUploading ? uploading : dragDropHint}
            </p>
            <p className="text-xs text-muted-foreground">{fileSizeHint}</p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isUploading}
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
            className="mt-1"
          >
            {uploadCta}
          </Button>

          {error && (
            <p className="text-xs text-destructive mt-1">{error}</p>
          )}
        </div>
      </div>
    </Field>
  );
}

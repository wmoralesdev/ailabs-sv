"use client";

import { useRef, useState, useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Upload04Icon, Image01Icon } from "@hugeicons/core-free-icons";

const MAX_SIZE_MB = 3;
const ACCEPT = "image/jpeg,image/png,image/webp";
const ACCEPT_EXTENSIONS = ["JPG", "PNG", "WebP"];
const RECOMMENDED_ASPECT = "1200×630";

export type CoverImageValue = {
  storageId: Id<"_storage">;
  url: string;
};

interface ShowcaseCoverUploadProps {
  value: CoverImageValue | null;
  onChange: (value: CoverImageValue | null) => void;
  label: string;
  uploadCta: string;
  uploading: string;
  dragDropHint?: string;
  fileSizeHint?: string;
  required?: boolean;
  noMaxSize?: boolean;
}

export function ShowcaseCoverUpload({
  value,
  onChange,
  label,
  uploadCta,
  uploading,
  dragDropHint = "Drag & drop or click to upload",
  fileSizeHint = `${ACCEPT_EXTENSIONS.join(", ")} — max ${MAX_SIZE_MB}MB. ${RECOMMENDED_ASPECT} recommended for social previews.`,
  required = false,
  noMaxSize = false,
}: ShowcaseCoverUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
  const getStorageUrl = useMutation(api.storage.getStorageUrl);

  const processFile = useCallback(
    async (file: File) => {
      setError(null);
      if (!noMaxSize && file.size > MAX_SIZE_MB * 1024 * 1024) {
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
        const url = await getStorageUrl({ storageId });
        if (url) onChange({ storageId, url });
      } catch {
        setError("Upload failed. Try again.");
      } finally {
        setIsUploading(false);
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    [generateUploadUrl, getStorageUrl, onChange, noMaxSize]
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
      const file = e.dataTransfer.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  return (
    <Field>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="flex flex-col gap-4">
        {/* Preview: 1200x630 aspect ratio */}
        <div
          className={cn(
            "overflow-hidden rounded-lg border border-border/60 bg-muted",
            "aspect-[1200/630] max-h-48 w-full"
          )}
        >
          {value?.url ? (
            <img
              src={value.url}
              alt=""
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <HugeiconsIcon
                icon={Image01Icon}
                className="size-12 text-muted-foreground/40"
                aria-hidden
              />
            </div>
          )}
        </div>

        {/* Dropzone */}
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
            "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-5 text-center transition-colors",
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
            <p className="mt-1 text-xs text-destructive">{error}</p>
          )}
        </div>
      </div>
    </Field>
  );
}

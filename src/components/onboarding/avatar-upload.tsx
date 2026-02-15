"use client";

import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_SIZE_MB = 2;
const ACCEPT = "image/jpeg,image/png,image/webp";

interface AvatarUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  uploadCta: string;
  uploading: string;
}

export function AvatarUpload({
  value,
  onChange,
  label,
  uploadCta,
  uploading,
}: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
  const getStorageUrl = useMutation(api.storage.getStorageUrl);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
      const url = await getStorageUrl({ storageId });
      if (url) onChange(url);
    } catch {
      setError("Upload failed. Try again.");
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted ring-2 ring-border",
            value && "ring-primary/30"
          )}
        >
          {value ? (
            <img
              src={value}
              alt=""
              className="size-full object-cover"
            />
          ) : (
            <span className="text-2xl text-muted-foreground">?</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isUploading}
            onClick={() => inputRef.current?.click()}
          >
            {isUploading ? uploading : uploadCta}
          </Button>
          {error && (
            <span className="text-xs text-destructive">{error}</span>
          )}
        </div>
      </div>
    </Field>
  );
}

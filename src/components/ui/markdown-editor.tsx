"use client";

import { useState } from "react";
import Markdown from "react-markdown";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  writeLabel?: string;
  previewLabel?: string;
  emptyPreviewText?: string;
  className?: string;
  disabled?: boolean;
};

export function MarkdownEditor({
  value,
  onChange,
  placeholder,
  maxLength,
  rows = 4,
  writeLabel = "Write",
  previewLabel = "Preview",
  emptyPreviewText = "Nothing to preview",
  className,
  disabled,
}: MarkdownEditorProps) {
  const [mode, setMode] = useState<"write" | "preview">("write");

  return (
    <div className={cn("space-y-2", className)}>
      {/* Toggle tabs using line variant */}
      <Tabs
        value={mode}
        onValueChange={(v) => setMode(v as "write" | "preview")}
      >
        <TabsList variant="line">
          <TabsTrigger value="write">{writeLabel}</TabsTrigger>
          <TabsTrigger value="preview">{previewLabel}</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Content */}
      {mode === "write" ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows}
          disabled={disabled}
          className="resize-none"
        />
      ) : (
        <div className="min-h-[100px] rounded-lg border border-border bg-muted/30 p-3">
          {value.trim() ? (
            <MarkdownPreview content={value} />
          ) : (
            <p className="text-sm text-muted-foreground">{emptyPreviewText}</p>
          )}
        </div>
      )}

      {/* Character count (write mode only) */}
      {mode === "write" && maxLength && (
        <div className="text-right text-xs text-muted-foreground">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
}

type MarkdownPreviewProps = {
  content: string;
  className?: string;
};

export function MarkdownPreview({ content, className }: MarkdownPreviewProps) {
  return (
    <div
      className={cn(
        "prose prose-sm dark:prose-invert max-w-none",
        // Tighten up spacing
        "prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5",
        "prose-headings:my-3 prose-pre:my-2 prose-blockquote:my-2",
        // Code styling
        "prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:bg-neutral-900 prose-pre:text-neutral-100 dark:prose-pre:bg-neutral-950",
        // Link styling
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        className
      )}
    >
      <Markdown>{content}</Markdown>
    </div>
  );
}

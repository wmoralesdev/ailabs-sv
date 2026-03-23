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
  /** Use monospace in Write mode (e.g. Markdown source). */
  monospaceWrite?: boolean;
  /** Grow Write/Preview area to fill a flex parent (e.g. bento tile). */
  fillHeight?: boolean;
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
  monospaceWrite = false,
  fillHeight = false,
}: MarkdownEditorProps) {
  const [mode, setMode] = useState<"write" | "preview">("write");

  return (
    <div
      className={cn(
        fillHeight ? "flex min-h-0 flex-1 flex-col gap-2" : "space-y-2",
        className
      )}
    >
      {/* Toggle tabs using line variant */}
      <div className={cn(fillHeight && "shrink-0")}>
        <Tabs
          value={mode}
          onValueChange={(v) => setMode(v as "write" | "preview")}
        >
          <TabsList variant="line">
            <TabsTrigger value="write">{writeLabel}</TabsTrigger>
            <TabsTrigger value="preview">{previewLabel}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      {mode === "write" ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={fillHeight ? 1 : rows}
          disabled={disabled}
          className={cn(
            "resize-none",
            fillHeight && "min-h-[10rem] flex-1",
            monospaceWrite && "font-mono text-sm leading-relaxed"
          )}
        />
      ) : (
        <div
          className={cn(
            "rounded-lg border border-border bg-muted/30 p-3",
            fillHeight
              ? "min-h-0 flex-1 overflow-y-auto"
              : "min-h-[100px]"
          )}
        >
          {value.trim() ? (
            <MarkdownPreview content={value} />
          ) : (
            <p className="text-sm text-muted-foreground">{emptyPreviewText}</p>
          )}
        </div>
      )}

      {/* Character count (write mode only) */}
      {mode === "write" && maxLength && (
        <div
          className={cn(
            "text-right text-xs text-muted-foreground",
            fillHeight && "shrink-0"
          )}
        >
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

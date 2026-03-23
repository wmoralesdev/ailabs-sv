"use client";

import { Component  } from "react";
import type {ReactNode} from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description?: string;
  usage?: string;
  children: ReactNode;
  className?: string;
};

export function ComponentPreview({
  title,
  description,
  usage,
  children,
  className,
}: Props) {
  const handleCopy = () => {
    if (usage && typeof navigator.clipboard.writeText === "function") {
      navigator.clipboard.writeText(usage).catch(() => {});
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 bg-card p-6 shadow-lg shadow-black/10",
        className
      )}
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
          {description && (
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        {usage && (
          <Button
            variant="ghost"
            size="xs"
            onClick={handleCopy}
            className="shrink-0"
          >
            Copy usage
          </Button>
        )}
      </div>
      <PreviewErrorBoundary fallbackTitle={title}>
        <div className="rounded-lg border border-border/40 bg-background/50 p-4">
          {children}
        </div>
      </PreviewErrorBoundary>
    </div>
  );
}

type ErrorBoundaryProps = {
  children: ReactNode;
  fallbackTitle: string;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

class PreviewErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <p className="font-medium">Preview failed: {this.props.fallbackTitle}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {this.state.error?.message ?? "Unknown error"}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

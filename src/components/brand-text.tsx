import type { ReactElement } from "react";
import { cn } from "@/lib/utils";

/** Renders "Ai /abs" (slash = L, pronounced "ai labs") with navbar/footer styling */
export function BrandText({ className }: { className?: string }) {
  return (
    <span className={cn("font-display font-bold", className)}>
      <span className="text-primary">Ai</span>
      <span className="text-muted-foreground"> /</span>
      <span className="text-foreground">abs</span>
    </span>
  );
}

/** Splits text by "Ai /abs" or "ailabs.sv" and intersperses BrandText. Use when rendering i18n strings that may contain the brand. */
export function formatWithBrandText(
  text: string,
  className?: string
): (string | ReactElement)[] {
  const parts = text.split(/(Ai \/abs|ailabs\.sv)/);
  return parts.flatMap((part, i) =>
    part === "Ai /abs" || part === "ailabs.sv"
      ? [<BrandText key={`brand-${i}`} className={className} />]
      : [part]
  );
}

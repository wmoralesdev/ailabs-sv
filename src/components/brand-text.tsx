import type { ReactElement } from "react";
import { cn } from "@/lib/utils";

/** Renders "ailabs.sv" with navbar/footer styling: Space Grotesk, ai=primary, labs=foreground, .sv=muted */
export function BrandText({ className }: { className?: string }) {
  return (
    <span className={cn("font-display font-bold", className)}>
      <span className="text-primary">ai</span>
      <span className="text-foreground">labs</span>
      <span className="text-muted-foreground">.sv</span>
    </span>
  );
}

/** Splits text by "ailabs.sv" and intersperses BrandText. Use when rendering i18n strings that may contain the brand. */
export function formatWithBrandText(
  text: string,
  className?: string
): (string | ReactElement)[] {
  const parts = text.split("ailabs.sv");
  return parts.flatMap((part, i) =>
    i < parts.length - 1
      ? [part, <BrandText key={`brand-${i}`} className={className} />]
      : [part]
  );
}

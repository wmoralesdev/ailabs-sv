import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DisplayChip({ label, icon }: { label: string; icon?: ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/10">
      {icon && <span className="size-4 shrink-0 [&_svg]:size-full">{icon}</span>}
      {label}
    </span>
  );
}

export function ToggleChip({
  label,
  selected,
  onToggle,
  icon,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
  icon?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex h-full items-center justify-center gap-1.5 rounded-full border px-3 py-1.5 text-center text-sm font-medium transition-all shadow-sm",
        selected
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-transparent text-muted-foreground hover:border-primary/30 hover:bg-muted/50"
      )}
    >
      {icon && <span className="size-4 shrink-0 [&_svg]:size-full">{icon}</span>}
      {label}
    </button>
  );
}

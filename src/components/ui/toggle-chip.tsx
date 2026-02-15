import { cn } from "@/lib/utils";

export function DisplayChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/10">
      {label}
    </span>
  );
}

export function ToggleChip({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex h-full items-center justify-center rounded-full border px-3 py-1 text-center text-sm font-medium transition-all shadow-sm",
        selected
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-transparent text-muted-foreground hover:border-primary/30 hover:bg-muted/50"
      )}
    >
      {label}
    </button>
  );
}

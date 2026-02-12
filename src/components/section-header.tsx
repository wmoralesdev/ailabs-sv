import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  size?: "default" | "lg";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  size = "default",
  className,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center" : "";
  const descriptionAlignClass =
    align === "center" ? "mx-auto" : "";

  return (
    <div className={cn(alignClass, className)}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        {eyebrow}
      </p>
      <h2
        className={cn(
          "text-balance font-medium leading-tight",
          size === "default" && "text-3xl md:text-4xl",
          size === "lg" && "text-4xl md:text-5xl lg:text-6xl tracking-tight",
          !description && "mb-8",
          description && "mb-4",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mb-8 font-light text-muted-foreground",
            size === "default" && "text-pretty text-base md:text-lg",
            size === "lg" && "text-lg",
            descriptionAlignClass,
            align === "center" && "max-w-3xl",
            align === "left" && "max-w-2xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

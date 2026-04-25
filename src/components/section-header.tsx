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
      <p className="eyebrow-label mb-3 text-primary">
        {eyebrow}
      </p>
      <h2
        className={cn(
          "text-balance font-medium",
          size === "default" && "text-heading-section",
          size === "lg" && "text-display-section",
          !description && "mb-8",
          description && "mb-4",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-body-lead mb-8 font-light text-muted-foreground",
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

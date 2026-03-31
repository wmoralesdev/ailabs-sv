import { Fragment } from "react";
import { AilabsLockup } from "@/components/ui/ailabs-lockup";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type SlidesBrandTextProps = {
  text: string;
  className?: string;
  lockupClassName?: string;
};

/** Renders copy with each literal `t.site.name` ("Ai /abs") replaced by the horizontal lockup for projector slides. */
export function SlidesBrandText({ text, className, lockupClassName }: SlidesBrandTextProps) {
  const { t } = useI18n();
  const brand = t.site.name;
  const parts = text.split(brand);
  if (parts.length === 1) {
    return <span className={className}>{text}</span>;
  }
  return (
    <span className={className}>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 ? (
            <AilabsLockup
              className={cn(
                "inline-flex max-w-[min(100%,16rem)] align-[-0.1em] text-[1em] leading-none [&_svg]:h-[1.12em]",
                lockupClassName,
              )}
            />
          ) : null}
        </Fragment>
      ))}
    </span>
  );
}

import type { SVGProps } from "react";
import { Linkedin } from "@/components/ui/svgs/linkedin";
import { cn } from "@/lib/utils";

type Props = SVGProps<SVGSVGElement>;

export function LinkedinIcon({ className, ...props }: Props) {
  return (
    <Linkedin
      aria-hidden
      className={cn("[&_path]:fill-current", className)}
      {...props}
    />
  );
}

import type { SVGProps } from "react";
import { GithubDark } from "@/components/ui/svgs/github-dark";
import { GithubLight } from "@/components/ui/svgs/github-light";
import { cn } from "@/lib/utils";

type Props = SVGProps<SVGSVGElement>;

export function GithubIcon({ className, ...props }: Props) {
  const svgClass = cn("dark:hidden", className);
  const darkClass = cn("hidden dark:block", className);
  return (
    <span className="inline-flex shrink-0">
      <GithubLight aria-hidden className={svgClass} {...props} />
      <GithubDark aria-hidden className={darkClass} {...props} />
    </span>
  );
}

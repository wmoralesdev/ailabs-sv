import type { ComponentType, SVGProps } from "react";

export type DarkLightSvgProps = SVGProps<SVGSVGElement> & {
  Light: ComponentType<SVGProps<SVGSVGElement>>;
  Dark: ComponentType<SVGProps<SVGSVGElement>>;
};

export function DarkLightSvg({ Light, Dark, ...props }: DarkLightSvgProps) {
  return (
    <>
      <span className="inline-flex dark:hidden">
        <Light {...props} />
      </span>
      <span className="hidden dark:inline-flex">
        <Dark {...props} />
      </span>
    </>
  );
}

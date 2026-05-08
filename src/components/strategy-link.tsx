import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

type StrategyLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export function StrategyLink({ href, className, children }: StrategyLinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link to={href as any} className={className}>
        {children}
      </Link>
    );
  }

  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      className={className}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

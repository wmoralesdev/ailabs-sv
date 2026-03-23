import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { GithubIcon } from "@/components/ui/github-icon";
import { LinkedinIcon } from "@/components/ui/linkedin-icon";
import { XIcon } from "@/components/ui/x-icon";
import { cn } from "@/lib/utils";

type Socials = {
  twitter?: string;
  linkedin?: string;
  github?: string;
  website?: string;
};

type LinkVariant = "default" | "minimal";

type Props = {
  socials: Socials;
  className?: string;
  iconClassName?: string;
  /** Flat circles, muted gray icons — for Curious Ones and similar. */
  variant?: LinkVariant;
};

const iconLinkVariants: Record<
  LinkVariant,
  string
> = {
  default:
    "inline-flex size-9 items-center justify-center rounded-full border border-border bg-background/60 text-foreground/70 shadow-sm transition-[border-color,background-color,color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent hover:text-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  minimal:
    "inline-flex size-9 items-center justify-center rounded-full border border-border/60 bg-transparent text-muted-foreground shadow-none transition-colors duration-200 hover:border-border hover:bg-transparent hover:text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
};

function IconLink({
  href,
  label,
  children,
  variant,
  className,
}: {
  href: string;
  label: string;
  children: ReactNode;
  variant: LinkVariant;
  className?: string;
}) {
  return (
    <Link
      to={href as any}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(iconLinkVariants[variant], className)}
    >
      <span className="sr-only">{label}</span>
      {children}
    </Link>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-4", className)}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2c2.5 2.7 4 6.2 4 10s-1.5 7.3-4 10c-2.5-2.7-4-6.2-4-10s1.5-7.3 4-10z" />
    </svg>
  );
}

const minimalKeyOrder: Partial<Record<keyof Socials, number>> = {
  twitter: 0,
  linkedin: 1,
  github: 2,
  website: 3,
};

export function SocialLinks({
  socials,
  className,
  iconClassName,
  variant = "default",
}: Props) {
  const items: Array<{
    key: keyof Socials;
    href?: string;
    label: string;
    icon: ReactNode;
  }> = [
    {
      key: "linkedin",
      href: socials.linkedin,
      label: "LinkedIn",
      icon: <LinkedinIcon className={cn("size-4", iconClassName)} />,
    },
    {
      key: "github",
      href: socials.github,
      label: "GitHub",
      icon: <GithubIcon className={cn("size-4", iconClassName)} />,
    },
    {
      key: "twitter",
      href: socials.twitter,
      label: "X",
      icon: <XIcon className={iconClassName} />,
    },
    {
      key: "website",
      href: socials.website,
      label: "Website",
      icon: <GlobeIcon className={iconClassName} />,
    },
  ];

  let visible = items.filter((item) => Boolean(item.href));
  if (variant === "minimal" && visible.length > 1) {
    visible = [...visible].sort(
      (a, b) =>
        (minimalKeyOrder[a.key] ?? 99) - (minimalKeyOrder[b.key] ?? 99),
    );
  }
  if (visible.length === 0) return null;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {visible.map((item) =>
        item.href ? (
          <IconLink
            key={item.key}
            href={item.href}
            label={item.label}
            variant={variant}
          >
            {item.icon}
          </IconLink>
        ) : null
      )}
    </div>
  );
}


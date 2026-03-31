import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { GithubIcon } from "@/components/ui/github-icon";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { LinkedinIcon } from "@/components/ui/linkedin-icon";
import { TiktokIcon } from "@/components/ui/tiktok-icon";
import { XIcon } from "@/components/ui/x-icon";
import { cn } from "@/lib/utils";

export type Socials = {
  twitter?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  instagram?: string;
  tiktok?: string;
};

type LinkVariant = "default" | "minimal";

type Props = {
  socials: Socials;
  className?: string;
  iconClassName?: string;
  /** Flat circles, muted gray icons — for Curious Ones and similar. */
  variant?: LinkVariant;
  /** Smaller hit target (e.g. footer bar). */
  compact?: boolean;
};

const iconLinkVariants: Record<
  LinkVariant,
  string
> = {
  default:
    "inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-card-foreground/80 shadow-sm transition-[border-color,background-color,color,box-shadow] duration-300 hover:border-primary/40 hover:bg-accent hover:text-accent-foreground hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  minimal:
    "inline-flex size-9 items-center justify-center rounded-full border border-border/60 bg-muted text-muted-foreground shadow-none transition-colors duration-200 hover:border-border hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
};

function IconLink({
  href,
  label,
  children,
  variant,
  className,
  compact,
}: {
  href: string;
  label: string;
  children: ReactNode;
  variant: LinkVariant;
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      to={href as any}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        iconLinkVariants[variant],
        compact && "size-7 min-h-0 min-w-0 p-0",
        className,
      )}
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
  linkedin: 0,
  instagram: 1,
  tiktok: 2,
  twitter: 3,
  github: 4,
  website: 5,
};

export function SocialLinks({
  socials,
  className,
  iconClassName,
  variant = "default",
  compact = false,
}: Props) {
  const iconSz = compact ? "size-3.5" : "size-4";
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
      icon: <LinkedinIcon className={cn(iconSz, iconClassName)} />,
    },
    {
      key: "instagram",
      href: socials.instagram,
      label: "Instagram",
      icon: <InstagramIcon className={cn(iconSz, iconClassName)} />,
    },
    {
      key: "tiktok",
      href: socials.tiktok,
      label: "TikTok",
      icon: <TiktokIcon className={cn(iconSz, iconClassName)} />,
    },
    {
      key: "twitter",
      href: socials.twitter,
      label: "X",
      icon: <XIcon className={cn(iconSz, iconClassName)} />,
    },
    {
      key: "github",
      href: socials.github,
      label: "GitHub",
      icon: <GithubIcon className={cn(iconSz, iconClassName)} />,
    },
    {
      key: "website",
      href: socials.website,
      label: "Website",
      icon: <GlobeIcon className={cn(iconSz, iconClassName)} />,
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
            compact={compact}
          >
            {item.icon}
          </IconLink>
        ) : null,
      )}
    </div>
  );
}

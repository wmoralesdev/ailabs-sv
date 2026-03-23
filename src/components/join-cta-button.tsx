"use client";

import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { useAuthState } from "@/components/auth/auth-context";

interface JoinCtaButtonProps {
  inverted?: boolean;
  compact?: boolean;
}

export function JoinCtaButton({ inverted, compact }: JoinCtaButtonProps) {
  const { t } = useI18n();
  const { status } = useAuthState();

  if (status !== "signed_out") {
    return null;
  }

  return (
    <Link
      to="/sign-in"
      className={cn(
        "hidden items-center justify-center whitespace-nowrap rounded-full font-medium transition-opacity sm:flex",
        compact ? "h-8 px-4 text-xs" : "h-9 px-5 text-sm",
        inverted
          ? "bg-background text-foreground hover:opacity-90"
          : "bg-foreground text-background hover:opacity-90",
      )}
    >
      {t.signIn.title}
    </Link>
  );
}

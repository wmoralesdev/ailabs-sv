"use client";

import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
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

  if (status === "signed_in") {
    return null;
  }

  return (
    <Button
      variant={inverted ? "signInBarInverted" : "signInBar"}
      size={compact ? "sm" : "lg"}
      className={cn("hidden sm:inline-flex", compact ? "px-4" : "px-5")}
      render={<Link to="/sign-in" />}
    >
      {t.signIn.title}
    </Button>
  );
}

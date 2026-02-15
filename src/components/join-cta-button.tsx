"use client";

import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { useAuthState } from "@/components/auth/auth-context";

export function JoinCtaButton() {
  const { t } = useI18n();
  const { status } = useAuthState();

  if (status !== "signed_out") {
    return null;
  }

  return (
    <Link
      to="/sign-in"
      className="hidden h-8 items-center justify-center rounded-full bg-foreground px-4 text-xs font-medium text-background transition-opacity hover:opacity-90 sm:flex"
    >
      {t.ui.nav.join}
    </Link>
  );
}

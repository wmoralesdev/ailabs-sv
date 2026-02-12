"use client";

import { Link } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { useI18n } from "@/lib/i18n";

export function JoinCtaButton() {
  const { t } = useI18n();
  const isAuthenticated = useQuery(api.auth.isAuthenticated);

  if (isAuthenticated) {
    return (
      <Link
        to="/community"
        className="hidden h-8 items-center justify-center rounded-full bg-foreground px-4 text-xs font-medium text-background transition-opacity hover:opacity-90 sm:flex"
      >
        {t.ui.nav.join}
      </Link>
    );
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

"use client";

import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { useAuthState } from "@/components/auth/auth-context";

function getCurrentReturnTo() {
  if (typeof window === "undefined") return "/";
  const { pathname, search, hash } = window.location;
  return `${pathname}${search}${hash}`;
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { status } = useAuthState();

  useEffect(() => {
    if (status !== "signed_out") return;

    const returnTo = getCurrentReturnTo();
    router
      .navigate({
        to: "/sign-in",
        search: { returnTo },
      })
      .catch(() => {});
  }, [router, status]);

  if (status === "loading") {
    return null;
  }

  if (status !== "signed_in") {
    return null;
  }

  return <>{children}</>;
}

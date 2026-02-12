"use client";

import { Link } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "convex/_generated/api";
import { Button } from "@/components/ui/button";

export function AuthHeaderActions() {
  const isAuthenticated = useQuery(api.auth.isAuthenticated);
  const { signOut } = useAuthActions();

  if (isAuthenticated === undefined) {
    return null;
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/me">
          <Button variant="ghost" size="sm">
            My profile
          </Button>
        </Link>
        <Button variant="outline" size="sm" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    );
  }

  return null;
}

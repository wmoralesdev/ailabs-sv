"use client";

import { useRouter } from "@tanstack/react-router";
import { useClerk } from "@clerk/tanstack-react-start";
import { useAuthState } from "@/components/auth/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function getUserInitials(nameOrEmail: string | null | undefined) {
  if (!nameOrEmail) return "U";

  const parts = nameOrEmail
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function AuthHeaderActions() {
  const router = useRouter();
  const { signOut } = useClerk();
  const { status, user } = useAuthState();

  if (status === "loading") {
    return (
      <div
        className="size-9 shrink-0 animate-pulse rounded-full bg-muted"
        aria-hidden
      />
    );
  }

  if (status !== "signed_in") return null;

  const userName =
    user?.fullName ??
    user?.firstName ??
    user?.primaryEmailAddress?.emailAddress ??
    null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open account menu"
        className="inline-flex size-9 items-center justify-center overflow-hidden rounded-full border border-border bg-muted text-xs font-semibold text-foreground transition-colors hover:bg-accent"
      >
        {user?.imageUrl ? (
          <img
            src={user.imageUrl}
            alt={userName ?? "User avatar"}
            className="size-full object-cover"
          />
        ) : (
          <span>{getUserInitials(userName)}</span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            router.navigate({ to: "/me" }).catch(() => {});
          }}
        >
          Mi perfil
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


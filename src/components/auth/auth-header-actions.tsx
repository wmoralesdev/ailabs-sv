"use client";

import { useRouter } from "@tanstack/react-router";
import { useClerk } from "@clerk/tanstack-react-start";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { useAuthState } from "@/components/auth/auth-context";
import { useI18n } from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
  const { t } = useI18n();
  const myProfile = useQuery(api.profiles.me);
  const isAdmin = useQuery(api.admin.isCurrentUserAdmin);

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

  const providerAvatarUrl =
    (user as unknown as { externalAccounts?: Array<{ provider?: string; imageUrl?: string }> })
      .externalAccounts?.find(
        (a) => (a.provider === "google" || a.provider === "github") && !!a.imageUrl
      )?.imageUrl ?? null;

  const clerkHasImage = (user as unknown as { hasImage?: boolean }).hasImage ?? false;
  const clerkRealAvatarUrl = clerkHasImage ? user?.imageUrl ?? null : null;
  const oauthAvatarUrl =
    providerAvatarUrl && (!user?.imageUrl || providerAvatarUrl !== user.imageUrl || clerkHasImage)
      ? providerAvatarUrl
      : null;
  const convexAvatarUrl = myProfile?.avatarUrl ?? null;

  const selectedAvatarUrl = oauthAvatarUrl ?? convexAvatarUrl ?? clerkRealAvatarUrl;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open account menu"
        className="inline-flex size-9 items-center justify-center overflow-hidden rounded-full border border-border bg-muted text-xs font-semibold text-foreground transition-colors hover:bg-accent"
      >
        {selectedAvatarUrl ? (
          <img
            src={selectedAvatarUrl}
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
            router.navigate({ to: "/showcase/submit", search: { edit: undefined } }).catch(() => {});
          }}
        >
          {t.ui.header?.submitProject ?? "Submit project"}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            router.navigate({
              to: "/hackathon-groups/submit",
              search: { edit: undefined },
            }).catch(() => {});
          }}
        >
          {t.ui.header?.submitHackathonProject ?? "Submit hackathon project"}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            router.navigate({ to: "/me" }).catch(() => {});
          }}
        >
          {t.ui.header?.myProfile ?? "My profile"}
        </DropdownMenuItem>
        {isAdmin === true && (
          <DropdownMenuItem
            onClick={() => {
              router.navigate({ to: "/admin/events" }).catch(() => {});
            }}
          >
            Admin
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          {t.ui.header?.signOut ?? "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { authStateFn } from "@/lib/auth-server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProfileView } from "@/components/profile/profile-view";
import { RequireAuth } from "@/components/auth/require-auth";
import { Spinner } from "@/components/ui/spinner";

export const Route = createFileRoute("/me")({
  beforeLoad: async () => {
    const { isAuthenticated } = await authStateFn();
    if (!isAuthenticated) {
      throw redirect({ to: "/sign-in", search: { returnTo: "/me" } });
    }
  },
  component: MePage,
});

function MePage() {
  const navigate = useNavigate();
  const profile = useQuery(api.profiles.me);

  return (
    <RequireAuth>
      <div className="flex min-h-dvh flex-col bg-background text-foreground font-sans">
        <SiteHeader />
        <main className="flex flex-1 flex-col pt-16">
          {profile === undefined ? (
            <div className="flex flex-1 items-center justify-center">
              <Spinner size="lg" />
            </div>
          ) : profile === null ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
              <p className="text-muted-foreground">
                Complete onboarding to create your profile.
              </p>
              <button
                type="button"
                onClick={() => navigate({ to: "/onboarding" })}
                className="rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground"
              >
                Start onboarding
              </button>
            </div>
          ) : (
            <ProfileView
              profile={profile}
              isOwner
              showContact
              onEditProfile={() =>
                navigate({ to: "/onboarding", search: { mode: "edit" } })
              }
            />
          )}
        </main>
        <SiteFooter />
      </div>
    </RequireAuth>
  );
}

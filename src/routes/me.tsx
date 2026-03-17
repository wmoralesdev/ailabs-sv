import { createFileRoute, redirect, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
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
  const router = useRouter();
  const profile = useQuery(api.profiles.me);

  useEffect(() => {
    if (profile === null) {
      router.navigate({ to: "/onboarding", replace: true });
    }
  }, [profile, router]);

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
            <div className="flex flex-1 items-center justify-center">
              <Spinner size="lg" />
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

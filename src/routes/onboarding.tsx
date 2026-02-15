import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { authStateFn } from "@/lib/auth-server";
import { RequireAuth } from "@/components/auth/require-auth";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";

export const Route = createFileRoute("/onboarding")({
  validateSearch: (search: Record<string, unknown>) => ({
    mode: (search.mode as string) ?? undefined,
  }),
  beforeLoad: async () => {
    const { isAuthenticated } = await authStateFn();
    if (!isAuthenticated) {
      throw redirect({ to: "/sign-in", search: { returnTo: "/onboarding" } });
    }
  },
  component: OnboardingPage,
});

function OnboardingPage() {
  const router = useRouter();
  const { mode } = Route.useSearch();
  const isEditMode = mode === "edit";
  const myProfile = useQuery(api.profiles.me);

  useEffect(() => {
    if (myProfile === undefined) return;
    if (myProfile && !isEditMode) {
      router.navigate({ to: "/" });
    }
  }, [myProfile, isEditMode, router]);

  if (myProfile === undefined) {
    return (
      <RequireAuth>
        <>
          <SiteHeader />
          <div className="flex min-h-dvh flex-col bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden motion-safe:animate-page-in">
            <main className="flex flex-1 items-center justify-center pt-20 md:pt-24">
              <div className="text-sm text-muted-foreground">Loading…</div>
            </main>
            <SiteFooter />
          </div>
        </>
      </RequireAuth>
    );
  }

  if (myProfile && !isEditMode) {
    return null;
  }

  return (
    <RequireAuth>
      <>
        <SiteHeader />
        <div className="flex min-h-dvh flex-col bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden motion-safe:animate-page-in">
          <main className="flex flex-1 flex-col items-center justify-center pt-20 md:pt-24">
            <section className="relative flex w-full flex-1 items-center justify-center overflow-hidden border-b border-border py-10 md:py-12">
              <AnimatedGrid />
              <div className="hero-top-fade pointer-events-none absolute inset-0 z-2" />
              <div className="container relative z-10 mx-auto px-6">
                <OnboardingWizard
                  existingProfile={isEditMode ? myProfile ?? undefined : undefined}
                  onCompleteRedirectTo={isEditMode ? "/me" : "/"}
                />
              </div>
            </section>
          </main>
          <SiteFooter />
        </div>
      </>
    </RequireAuth>
  );
}


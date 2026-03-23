import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ClerkLoaded, ClerkLoading } from "@clerk/tanstack-react-start";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { z } from "zod";
import type {SignInStep} from "@/components/auth/custom-sign-in";
import { authStateFn } from "@/lib/auth-server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useI18n } from "@/lib/i18n";
import { CustomSignIn  } from "@/components/auth/custom-sign-in";
import { getSafeReturnTo } from "@/lib/auth-return-to";
import { useAuthState } from "@/components/auth/auth-context";
import { AnimatedGrid } from "@/components/ui/animated-grid";

const outerCardClass =
  "!bg-card !text-card-foreground rounded-2xl border border-border/60 shadow-lg shadow-black/10";

export const Route = createFileRoute("/sign-in")({
  validateSearch: z.object({
    returnTo: z.string().optional(),
  }),
  beforeLoad: async ({ search }) => {
    const { isAuthenticated } = await authStateFn();
    if (isAuthenticated) {
      const returnTo = getSafeReturnTo(search.returnTo) ?? "/";
      throw redirect({ to: returnTo as "/" });
    }
  },
  component: SignInPage,
});

function SignInPage() {
  const { t } = useI18n();
  const router = useRouter();
  const { status } = useAuthState();
  const { returnTo } = Route.useSearch();
  const safeReturnTo = getSafeReturnTo(returnTo);
  const myProfile = useQuery(api.profiles.me);
  const [signInStep, setSignInStep] = useState<SignInStep>("initial");

  useEffect(() => {
    if (status !== "signed_in" || myProfile === undefined) return;

    if (safeReturnTo) {
      router.navigate({ to: safeReturnTo as "/" }).catch(() => {});
      return;
    }

    const to = myProfile ? "/" : "/onboarding";
    router.navigate({ to }).catch(() => {});
  }, [status, myProfile, router, safeReturnTo]);

  const title = signInStep === "otp" ? t.signIn.checkEmailTitle : t.signIn.title;
  const subtitle = signInStep === "otp" ? undefined : t.signIn.subtitle;

  return (
    <>
      <SiteHeader />
      <div className="flex min-h-dvh flex-col bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden motion-safe:animate-page-in">
        <main className="flex flex-1 pt-20 md:pt-24">
          <section className="relative flex w-full flex-1 items-center justify-center overflow-hidden border-b border-border py-10 md:py-12">
            <AnimatedGrid />
            <div className="hero-top-fade pointer-events-none absolute inset-0 z-2" />

            <div className="container relative z-10 mx-auto flex justify-center px-6">
              <div className="mx-auto w-full max-w-md">
                <ClerkLoading>
                  <div
                    className={`${outerCardClass} flex min-h-104 flex-col p-6 md:p-8`}
                  >
                    <div className="mb-6 text-center">
                      <h1 className="mb-2 text-2xl font-medium tracking-tight md:text-3xl">
                        {t.signIn.title}
                      </h1>
                      <p className="text-sm text-muted-foreground">
                        {t.signIn.subtitle}
                      </p>
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="size-5 animate-spin text-muted-foreground"
                        aria-hidden
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          opacity="0.25"
                        />
                        <path
                          d="M22 12a10 10 0 0 0-10-10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="sr-only">Loading sign in form</span>
                    </div>
                  </div>
                </ClerkLoading>

                <ClerkLoaded>
                  <div className={`${outerCardClass} p-6 md:p-8`}>
                    <div className="mb-6 text-center">
                      <h1 className="mb-2 text-2xl font-medium tracking-tight md:text-3xl">
                        {title}
                      </h1>
                      {subtitle && (
                        <p className="text-sm text-muted-foreground">
                          {subtitle}
                        </p>
                      )}
                    </div>

                    <CustomSignIn
                      onStepChange={setSignInStep}
                      returnTo={safeReturnTo}
                    />
                  </div>
                </ClerkLoaded>
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}

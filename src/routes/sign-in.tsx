import { createFileRoute } from "@tanstack/react-router";
import { SignInForm } from "@/components/auth/sign-in-form";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  return (
    <>
      <SiteHeader />
      <div className="min-h-dvh bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden motion-safe:animate-page-in">
        <main className="pt-24">
          <section className="relative overflow-hidden border-b border-border pb-16 pt-24 md:pb-24 md:pt-32">
            <div className="bg-grid-pattern pointer-events-none absolute inset-0 opacity-[0.4] motion-safe:animate-grid-drift mask-[radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

            <div className="container relative z-10 mx-auto px-6">
              <div className="mx-auto max-w-md">
                <div className="glass rounded-2xl border border-border/60 p-6 shadow-lg shadow-black/5 md:p-8">
                  <div className="mb-6 text-center">
                    <h1 className="mb-2 text-2xl font-medium tracking-tight md:text-3xl">
                      Sign in
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Sign in to edit your community profile
                    </p>
                  </div>

                  <SignInForm />
                </div>
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}

import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { authStateFn } from "@/lib/auth-server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RequireAuth } from "@/components/auth/require-auth";
import { AdminEventsPage } from "@/components/admin/admin-events-page";
import { Spinner } from "@/components/ui/spinner";
import { buttonVariants } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    const { isAuthenticated } = await authStateFn();
    if (!isAuthenticated) {
      throw redirect({ to: "/sign-in", search: { returnTo: "/admin" } });
    }
  },
  component: AdminPage,
});

function AdminPage() {
  const isAdmin = useQuery(api.admin.isCurrentUserAdmin);

  return (
    <RequireAuth>
      <div className="flex min-h-dvh flex-col bg-background text-foreground font-sans">
        <SiteHeader />
        <main className="flex flex-1 flex-col pt-16">
          {isAdmin === undefined ? (
            <div className="flex flex-1 items-center justify-center">
              <Spinner size="lg" />
            </div>
          ) : !isAdmin ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4">
              <p className="text-muted-foreground">Access denied.</p>
              <Link to="/" className={buttonVariants({ variant: "outline" })}>
                Back to home
              </Link>
            </div>
          ) : (
            <AdminEventsPage />
          )}
        </main>
        <SiteFooter />
      </div>
    </RequireAuth>
  );
}

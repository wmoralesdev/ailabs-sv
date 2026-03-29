import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { authStateFn } from "@/lib/auth-server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RequireAuth } from "@/components/auth/require-auth";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Spinner } from "@/components/ui/spinner";
import { buttonVariants } from "@/components/ui/button";
import { seoCopyEs } from "@/content/seo-copy";
import { buildSeoMeta } from "@/lib/seo-meta";

export const Route = createFileRoute("/admin")({
  head: () => {
    const { meta, links } = buildSeoMeta({
      path: "/admin",
      title: seoCopyEs.admin.title,
      description: seoCopyEs.admin.description,
      noIndex: true,
    });
    return { meta, links };
  },
  beforeLoad: async () => {
    const { isAuthenticated } = await authStateFn();
    if (!isAuthenticated) {
      throw redirect({ to: "/sign-in", search: { returnTo: "/admin/events" } });
    }
  },
  component: AdminShell,
});

function AdminShell() {
  const isAdmin = useQuery(api.admin.isCurrentUserAdmin);

  return (
    <RequireAuth>
      <div className="flex min-h-dvh flex-col bg-background text-foreground font-sans">
        <SiteHeader />
        <main className="flex flex-1 flex-col pt-20 pb-12">
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
            <AdminLayout />
          )}
        </main>
        <SiteFooter />
      </div>
    </RequireAuth>
  );
}

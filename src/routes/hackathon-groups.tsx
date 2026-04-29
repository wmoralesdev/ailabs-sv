import { Outlet, createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/hackathon-groups")({
  component: HackathonGroupsLayout,
});

function HackathonGroupsLayout() {
  return (
    <div className="min-h-dvh bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="pb-16 pt-24">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

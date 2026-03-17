import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/showcase")({
  component: ShowcaseLayout,
});

function ShowcaseLayout() {
  return (
    <div className="min-h-dvh bg-background text-foreground font-sans">
      <SiteHeader />
      <main className="pt-24 pb-16">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

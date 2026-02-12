import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProfileEditor } from "@/components/profile/profile-editor";

export const Route = createFileRoute("/me")({
  component: MePage,
});

function MePage() {
  return (
    <div className="min-h-dvh bg-background text-foreground font-sans">
      <SiteHeader />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <ProfileEditor />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

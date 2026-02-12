import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeftIcon,
  Link01Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";
import { SocialLinks } from "@/components/social-links";

export const Route = createFileRoute("/community/$slug")({
  component: ProfilePage,
});

function ProfilePage() {
  const { slug } = Route.useParams();
  const profile = useQuery(api.profiles.getBySlug, { slug });

  if (profile === undefined) {
    return (
      <div className="min-h-dvh bg-background">
        <SiteHeader />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 flex justify-center">
            <div className="animate-pulse h-64 w-full max-w-2xl rounded-2xl bg-muted" />
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (profile === null) {
    return (
      <div className="min-h-dvh bg-background">
        <SiteHeader />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-semibold">Profile not found</h2>
            <p className="mt-2 text-muted-foreground">
              This profile may have been removed or the link is incorrect.
            </p>
            <Link to="/community" className="mt-6 inline-block">
              <Button variant="outline">
                <HugeiconsIcon icon={ArrowLeftIcon} className="mr-2 size-4" />
                Back to community
              </Button>
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const hasLinks =
    profile.links?.linkedin || profile.links?.x;
  const socials = {
    linkedin: profile.links?.linkedin,
    twitter: profile.links?.x,
  };

  return (
    <div className="min-h-dvh bg-background text-foreground font-sans">
      <SiteHeader />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Link
            to="/community"
            className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <HugeiconsIcon icon={ArrowLeftIcon} className="mr-2 size-4" />
            Back to community
          </Link>

          <div className="rounded-2xl border border-border bg-card p-8 md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="size-24 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="flex size-24 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-3xl font-bold text-primary">
                  {profile.name.charAt(0)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                  {profile.name}
                </h1>
                <p className="mt-1 text-lg text-muted-foreground">
                  {profile.title}
                </p>
                {hasLinks && (
                  <div className="mt-4">
                    <SocialLinks socials={socials} />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-sm font-medium text-muted-foreground">
                About
              </h2>
              <p className="mt-2 whitespace-pre-wrap text-foreground">
                {profile.bio}
              </p>
            </div>

            {"contact" in profile && profile.contact && (
              <div className="mt-8 flex items-center gap-2 text-muted-foreground">
                <HugeiconsIcon icon={Mail01Icon} className="size-4" />
                <span>Contact: {profile.contact}</span>
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProfileView } from "@/components/profile/profile-view";
import { Spinner } from "@/components/ui/spinner";
import { useAuthState } from "@/components/auth/auth-context";
import { createConvexHttpClient } from "@/lib/convex-http";
import { buildSeoMeta } from "@/lib/seo-meta";

export const Route = createFileRoute("/community/$slug")({
  loader: async ({ params }) => {
    const client = createConvexHttpClient();
    const seo = await client.query(api.profiles.getProfileSeoBySlug, {
      slug: params.slug,
    });
    return { seo };
  },
  head: ({ loaderData, params }) => {
    const seo = loaderData?.seo;
    const path = `/community/${params.slug}`;
    const title =
      seo?.title ?? `Perfil | Ai /abs`;
    const description =
      seo?.description ??
      "Perfil de la comunidad Ai /abs en El Salvador.";
    const { meta, links } = buildSeoMeta({
      path,
      title,
      description,
      imageAlt: title,
    });
    return { meta, links };
  },
  component: CommunityProfilePage,
});

function CommunityProfilePage() {
  const { slug } = Route.useParams();
  const profile = useQuery(api.profiles.getBySlug, { slug });
  const { isAuthenticated, user } = useAuthState();
  const isOwner = !!profile && !!user && user.id === profile.ownerId;

  return (
    <div className="min-h-dvh bg-background text-foreground font-sans">
      <SiteHeader />
      <main className="pt-24 pb-16">
        {profile === undefined ? (
          <div className="flex min-h-[50vh] items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : profile === null ? (
          <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
            <h1 className="text-2xl font-medium text-foreground">
              Profile not found
            </h1>
            <p className="max-w-md text-muted-foreground">
              No community member with that profile exists.
            </p>
            <Link
              to="/"
              className="rounded-lg border border-border bg-transparent px-6 py-2 font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-accent/50"
            >
              Go home
            </Link>
          </div>
        ) : (
          <ProfileView
            profile={profile}
            isOwner={isOwner}
            showContact={isAuthenticated}
          />
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

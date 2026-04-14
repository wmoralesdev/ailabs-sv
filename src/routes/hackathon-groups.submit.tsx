import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { useMutation, useQuery } from "convex/react";
import { z } from "zod";
import { api } from "convex/_generated/api";
import { HackathonGroupsForm } from "@/components/hackathon-groups/hackathon-groups-form";
import { authStateFn } from "@/lib/auth-server";
import { getSafeReturnTo } from "@/lib/auth-return-to";
import { RequireAuth } from "@/components/auth/require-auth";
import { Spinner } from "@/components/ui/spinner";
import { seoCopyEs } from "@/content/seo-copy";
import { buildSeoMeta } from "@/lib/seo-meta";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/hackathon-groups/submit")({
  head: () => {
    const { meta, links } = buildSeoMeta({
      path: "/hackathon-groups/submit",
      title: seoCopyEs.hackathonGroupsSubmit.title,
      description: seoCopyEs.hackathonGroupsSubmit.description,
      noIndex: true,
    });
    return { meta, links };
  },
  validateSearch: z.object({
    edit: z.string().optional(),
  }),
  beforeLoad: async ({ search }) => {
    const { isAuthenticated } = await authStateFn();
    if (!isAuthenticated) {
      const raw = search.edit
        ? `/hackathon-groups/submit?edit=${encodeURIComponent(search.edit)}`
        : "/hackathon-groups/submit";
      const returnTo = getSafeReturnTo(raw) ?? "/hackathon-groups/submit";
      throw redirect({ to: "/sign-in", search: { returnTo } });
    }
  },
  component: HackathonGroupsSubmitPage,
});

function HackathonGroupsSubmitPage() {
  const { edit } = Route.useSearch();
  const router = useRouter();
  const myProfile = useQuery(api.profiles.me);
  const hasSessionStarted = useQuery(api.hackathon_groups.isSessionStarted);
  const startSession = useMutation(api.hackathon_groups.startSession);

  const returnToPath = useMemo(() => {
    const raw = edit
      ? `/hackathon-groups/submit?edit=${encodeURIComponent(edit)}`
      : "/hackathon-groups/submit";
    return getSafeReturnTo(raw) ?? "/hackathon-groups/submit";
  }, [edit]);

  useEffect(() => {
    if (myProfile === undefined || hasSessionStarted === undefined) return;
    if (myProfile === null) {
      router.navigate({
        to: "/onboarding",
        search: { returnTo: returnToPath },
      });
    }
  }, [myProfile, hasSessionStarted, router, returnToPath, edit]);

  return (
    <RequireAuth>
      {myProfile === undefined || hasSessionStarted === undefined || myProfile === null ? (
        <div className="container mx-auto flex justify-center px-6 py-16">
          <Spinner size="lg" />
        </div>
      ) : !hasSessionStarted && !edit ? (
        <div className="container mx-auto px-6 py-12">
          <div className="mx-auto max-w-2xl rounded-2xl border border-border/60 bg-card/70 p-8 text-center">
            <h1 className="mb-2 text-balance text-2xl font-medium">
              Start a hackathon session first
            </h1>
            <p className="mx-auto mb-6 max-w-lg text-pretty text-muted-foreground">
              To upload group projects at any time, you need to start your session once.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button
                onClick={async () => {
                  await startSession({});
                }}
              >
                Start session now
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  router.navigate({ to: "/hackathon-groups", search: { status: undefined } })
                }
              >
                Go to hackathon groups
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <HackathonGroupsForm editSlug={edit} />
      )}
    </RequireAuth>
  );
}

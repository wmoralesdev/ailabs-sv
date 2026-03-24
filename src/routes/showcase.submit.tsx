import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { useQuery } from "convex/react";
import { z } from "zod";
import { api } from "convex/_generated/api";
import { ShowcaseForm } from "@/components/showcase/showcase-form";
import { authStateFn } from "@/lib/auth-server";
import { getSafeReturnTo } from "@/lib/auth-return-to";
import { RequireAuth } from "@/components/auth/require-auth";
import { Spinner } from "@/components/ui/spinner";

export const Route = createFileRoute("/showcase/submit")({
  validateSearch: z.object({
    edit: z.string().optional(),
  }),
  beforeLoad: async ({ search }) => {
    const { isAuthenticated } = await authStateFn();
    if (!isAuthenticated) {
      const raw = search.edit
        ? `/showcase/submit?edit=${encodeURIComponent(search.edit)}`
        : "/showcase/submit";
      const returnTo = getSafeReturnTo(raw) ?? "/showcase/submit";
      throw redirect({ to: "/sign-in", search: { returnTo } });
    }
  },
  component: ShowcaseSubmitPage,
});

function ShowcaseSubmitPage() {
  const { edit } = Route.useSearch();
  const router = useRouter();
  const myProfile = useQuery(api.profiles.me);

  const returnToPath = useMemo(() => {
    const raw = edit
      ? `/showcase/submit?edit=${encodeURIComponent(edit)}`
      : "/showcase/submit";
    return getSafeReturnTo(raw) ?? "/showcase/submit";
  }, [edit]);

  useEffect(() => {
    if (myProfile === undefined) return;
    if (myProfile === null) {
      router.navigate({
        to: "/onboarding",
        search: { returnTo: returnToPath },
      });
    }
  }, [myProfile, router, returnToPath]);

  return (
    <RequireAuth>
      {myProfile === undefined || myProfile === null ? (
        <div className="container mx-auto flex justify-center px-6 py-16">
          <Spinner size="lg" />
        </div>
      ) : (
        <ShowcaseForm editSlug={edit} />
      )}
    </RequireAuth>
  );
}

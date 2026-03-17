import { createFileRoute, redirect } from "@tanstack/react-router";
import { ShowcaseForm } from "@/components/showcase/showcase-form";
import { authStateFn } from "@/lib/auth-server";

export const Route = createFileRoute("/showcase/submit")({
  validateSearch: (search: Record<string, unknown>) => ({
    edit: (search.edit as string) || undefined,
  }),
  beforeLoad: async () => {
    const { isAuthenticated } = await authStateFn();
    if (!isAuthenticated) {
      throw redirect({ to: "/sign-in", search: { returnTo: "/showcase/submit" } });
    }
  },
  component: ShowcaseSubmitPage,
});

function ShowcaseSubmitPage() {
  const { edit } = Route.useSearch();
  return (
    <div className="container mx-auto px-6">
      <ShowcaseForm editSlug={edit} />
    </div>
  );
}

import { Navigate, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/feed")({
  validateSearch: (search: Record<string, unknown>) => ({
    event: (search.event as string) || undefined,
    tool: (search.tool as string) || undefined,
    status: (search.status as string) || undefined,
  }),
  component: FeedRedirect,
});

function FeedRedirect() {
  const search = Route.useSearch();
  return <Navigate to="/showcase" search={search} replace />;
}

import { createFileRoute } from "@tanstack/react-router";
import { AdminEventsPage } from "@/components/admin/admin-events-page";

export const Route = createFileRoute("/admin/events")({
  component: AdminEventsPage,
});

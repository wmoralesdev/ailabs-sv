import { createFileRoute } from "@tanstack/react-router";
import { AdminLabCardsPage } from "@/components/admin/admin-lab-cards-page";

export const Route = createFileRoute("/admin/lab")({
  component: AdminLabCardsPage,
});

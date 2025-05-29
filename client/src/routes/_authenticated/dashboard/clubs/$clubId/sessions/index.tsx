import { createFileRoute } from "@tanstack/react-router"
import { AllClubSessionsPage } from "@/features/clubs/pages/clubs/AllClubSessionsPage"

export const Route = createFileRoute(
  "/_authenticated/dashboard/clubs/$clubId/sessions/",
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <AllClubSessionsPage />
}

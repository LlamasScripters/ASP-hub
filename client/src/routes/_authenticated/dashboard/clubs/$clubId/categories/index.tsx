import { createFileRoute } from "@tanstack/react-router"
import { AllCategoriesPage } from "@/features/clubs/pages/categories/AllCategoriesPage"

export const Route = createFileRoute(
  "/_authenticated/dashboard/clubs/$clubId/categories/",
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <AllCategoriesPage />
}

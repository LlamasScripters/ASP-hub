import { ComplexCreatePage } from "@room-booking/page/ComplexCreatePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/facilities/complexes/create",
)({
	component: ComplexCreatePage,
});

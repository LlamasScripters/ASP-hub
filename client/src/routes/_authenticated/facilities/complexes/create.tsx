import { ComplexCreatePage } from "@room-booking/page/ComplexCreatePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/facilities/complexes/create",
)({
	component: ComplexCreatePage,
});

import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/features/home/HomePage";

export const Route = createFileRoute("/_authenticated/")({
	component: HomeRoute,
});

function HomeRoute() {
	return (
		<HomePage />
	);
}

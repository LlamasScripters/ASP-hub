import HomePage from "@/features/home/HomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomeRoute,
});

function HomeRoute() {
	return <HomePage />;
}

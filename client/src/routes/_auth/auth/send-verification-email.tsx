import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/auth/send-verification-email")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/auth/send-verification-email"!</div>;
}

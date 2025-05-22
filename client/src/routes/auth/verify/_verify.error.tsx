import VerifyEmailErrorPage from "@/features/auth/verify-email/VerifyEmailErrorPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/verify/_verify/error")({
	component: RouteComponent,
});

function RouteComponent() {
	return <VerifyEmailErrorPage />;
}

import VerifyEmailErrorPage from "@/features/auth/verify-email/VerifyEmailErrorPage";
import { createFileRoute } from "@tanstack/react-router";

//TODO: implement /auth/verify/error?code=...
export const Route = createFileRoute("/_auth/auth/verify/_verify/error")({
	component: RouteComponent,
});

function RouteComponent() {
	return <VerifyEmailErrorPage />;
}

import VerifyEmailSuccessPage from "@/features/auth/verify-email/VerifyEmailSuccessPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/verify/_verify/success")({
	component: VerifyEmailSuccessRoute,
});

function VerifyEmailSuccessRoute() {
	return <VerifyEmailSuccessPage />;
}

import VerifyEmailLayout from "@/features/auth/verify-email/VerifyEmailLayout";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/auth/verify/_verify")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<VerifyEmailLayout>
			<Outlet />
		</VerifyEmailLayout>
	);
}

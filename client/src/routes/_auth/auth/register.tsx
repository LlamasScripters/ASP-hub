import RegisterPage from "@/features/auth/RegisterPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/auth/register")({
	component: RegisterRoute,
});

function RegisterRoute() {
	return <RegisterPage />;
}

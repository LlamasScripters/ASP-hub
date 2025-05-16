import RegisterPage from "@/features/auth/RegisterPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_auth/register")({
	component: RegisterRoute,
});

function RegisterRoute() {
	return <RegisterPage />;
}

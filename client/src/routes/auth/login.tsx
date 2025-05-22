import LoginPage from "@/features/auth/LoginPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
	component: LoginRoute,
});

function LoginRoute() {
	return <LoginPage />;
}

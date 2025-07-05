import { useFirstLogin } from "@/hooks/use-first-login";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/first-login/")({
	component: FirstLoginIndexPage,
});

function FirstLoginIndexPage() {
	const navigate = useNavigate();
	const { status, isLoadingStatus } = useFirstLogin();

	useEffect(() => {
		if (!isLoadingStatus && status) {
			// Rediriger automatiquement vers l'étape appropriée
			switch (status.step) {
				case "profile":
					navigate({ to: "/first-login/profile" });
					break;
				case "application":
					navigate({ to: "/first-login/application" });
					break;
				case "validation":
					navigate({ to: "/first-login/validation" });
					break;
				case "complete":
					// L'utilisateur a terminé le processus, rediriger vers le tableau de bord
					navigate({ to: "/" });
					break;
				default:
					// Par défaut, aller au profil
					navigate({ to: "/first-login/profile" });
					break;
			}
		}
	}, [status, isLoadingStatus, navigate]);

	// Afficher un loader pendant le chargement
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-center">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
				<p className="text-gray-600 dark:text-gray-400">
					Chargement de votre parcours d'adhésion...
				</p>
			</div>
		</div>
	);
}

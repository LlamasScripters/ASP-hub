import { useRequiresFirstLogin } from "@/hooks/use-first-login";
import { usePermissions } from "@/hooks/use-permissions";
import { Navigate } from "@tanstack/react-router";

interface FirstLoginGuardProps {
	children: React.ReactNode;
	fallback?: React.ReactNode;
}

/**
 * Guard qui vérifie si l'utilisateur doit passer par le first login flow
 * et le redirige automatiquement si nécessaire
 */
export function FirstLoginGuard({ children, fallback }: FirstLoginGuardProps) {
	const { isAuthenticated, isLoading: isAuthLoading } = usePermissions();
	const {
		requiresFirstLogin,
		isLoading: isFirstLoginLoading,
		currentStep,
	} = useRequiresFirstLogin();

	// Loading state
	if (isAuthLoading || isFirstLoginLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
			</div>
		);
	}

	// Si pas authentifié, laisser passer (la route authentifiée s'occupera de ça)
	if (!isAuthenticated) {
		return <>{children}</>;
	}

	// Si l'utilisateur doit passer par le first login flow, rediriger
	if (requiresFirstLogin) {
		if (fallback) {
			return <>{fallback}</>;
		}

		// Redirection basée sur l'étape actuelle
		let redirectPath = "/first-login";
		if (currentStep) {
			redirectPath = `/first-login/${currentStep}`;
		}

		return <Navigate to={redirectPath} replace />;
	}

	// Sinon, afficher le contenu normal
	return <>{children}</>;
}

/**
 * Guard inverse - empêche l'accès si l'utilisateur a déjà terminé le first login
 */
export function FirstLoginOnlyGuard({
	children,
}: { children: React.ReactNode }) {
	const { isAuthenticated, isLoading: isAuthLoading } = usePermissions();
	const { requiresFirstLogin, isLoading: isFirstLoginLoading } =
		useRequiresFirstLogin();

	// Loading state
	if (isAuthLoading || isFirstLoginLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
			</div>
		);
	}

	// Si pas authentifié, rediriger vers login
	if (!isAuthenticated) {
		return <Navigate to="/auth/login" replace />;
	}

	// Si l'utilisateur n'a plus besoin du first login, rediriger vers dashboard
	if (!requiresFirstLogin) {
		return <Navigate to="/dashboard" replace />;
	}

	// Sinon, afficher le contenu du first login
	return <>{children}</>;
}

/**
 * HOC pour protéger des routes contre les utilisateurs non initialisés
 */
export function withFirstLoginGuard<P extends object>(
	Component: React.ComponentType<P>,
	options?: {
		fallback?: React.ReactNode;
	},
) {
	return function GuardedComponent(props: P) {
		return (
			<FirstLoginGuard fallback={options?.fallback}>
				<Component {...props} />
			</FirstLoginGuard>
		);
	};
}

/**
 * Composant pour afficher un message d'attente pendant le first login
 */
export function FirstLoginRequired() {
	const { currentStep } = useRequiresFirstLogin();

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
			<div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center">
				<div className="w-16 h-16 mx-auto mb-6 text-blue-500">
					<svg
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-label="Initialisation requise"
					>
						<title>Initialisation requise</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
						/>
					</svg>
				</div>

				<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
					Initialisation de votre compte
				</h2>

				<p className="text-gray-600 dark:text-gray-400 mb-6">
					Vous devez compléter votre profil et soumettre votre candidature avant
					d'accéder à cette section.
				</p>

				<div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
					Étape actuelle : <strong>{currentStep}</strong>
				</div>

				<button
					type="button"
					onClick={() => {
						window.location.href = "/first-login";
					}}
					className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
				>
					Continuer l'initialisation
				</button>
			</div>
		</div>
	);
}

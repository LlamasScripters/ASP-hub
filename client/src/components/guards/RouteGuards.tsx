import {
	type Permission,
	type UserRole,
	usePermissions,
} from "@/hooks/use-permissions";

/**
 * Composant wrapper pour protéger une route entière
 */
interface RouteGuardProps {
	children: React.ReactNode;
	permissions?: Permission | Permission[];
	roles?: UserRole | UserRole[];
	minRole?: UserRole;
	requireAll?: boolean;
	fallback?: React.ReactNode;
	redirectTo?: string;
}

export function RouteGuard({
	children,
	permissions,
	roles,
	minRole,
	requireAll = false,
	fallback,
	redirectTo = "/403",
}: RouteGuardProps) {
	const {
		hasAnyPermission,
		hasAllPermissions,
		hasRole,
		role,
		isLoading,
		isAuthenticated,
	} = usePermissions();

	// Si pas authentifié, rediriger vers login
	if (!isAuthenticated) {
		if (typeof window !== "undefined") {
			window.location.href = "/auth/login";
		}
		return null;
	}

	// Loading state
	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
			</div>
		);
	}

	// Vérification des permissions
	if (permissions) {
		const permissionArray = Array.isArray(permissions)
			? permissions
			: [permissions];
		const hasAccess = requireAll
			? hasAllPermissions(permissionArray)
			: hasAnyPermission(permissionArray);

		if (!hasAccess) {
			if (redirectTo && typeof window !== "undefined") {
				window.location.href = redirectTo;
				return null;
			}
			return <>{fallback || <AccessDenied />}</>;
		}
	}

	// Vérification des rôles
	if (minRole) {
		if (!hasRole(minRole)) {
			if (redirectTo && typeof window !== "undefined") {
				window.location.href = redirectTo;
				return null;
			}
			return <>{fallback || <AccessDenied />}</>;
		}
	} else if (roles) {
		const roleArray = Array.isArray(roles) ? roles : [roles];
		if (!roleArray.includes(role as UserRole)) {
			if (redirectTo && typeof window !== "undefined") {
				window.location.href = redirectTo;
				return null;
			}
			return <>{fallback || <AccessDenied />}</>;
		}
	}

	return <>{children}</>;
}

/**
 * Composant d'accès refusé par défaut
 */
function AccessDenied() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
			<div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center">
				<div className="w-16 h-16 mx-auto mb-4 text-red-500">
					<svg
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-label="Accès refusé"
					>
						<title>Accès refusé</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
						/>
					</svg>
				</div>
				<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
					Accès refusé
				</h2>
				<p className="text-gray-600 dark:text-gray-400 mb-4">
					Vous n'avez pas les permissions nécessaires pour accéder à cette page.
				</p>
				<button
					type="button"
					onClick={() => window.history.back()}
					className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
				>
					Retour
				</button>
			</div>
		</div>
	);
}

/**
 * Higher-Order Component pour protéger des composants de routes
 */
export function withRouteGuard<P extends object>(
	Component: React.ComponentType<P>,
	guardOptions: Omit<RouteGuardProps, "children">,
) {
	return function GuardedRoute(props: P) {
		return (
			<RouteGuard {...guardOptions}>
				<Component {...props} />
			</RouteGuard>
		);
	};
}

/**
 * Guards spécifiques pour des cas d'usage communs
 */

// Guard pour les pages admin
export function AdminRoute({ children }: { children: React.ReactNode }) {
	return (
		<RouteGuard permissions="admin:access" redirectTo="/403">
			{children}
		</RouteGuard>
	);
}

// Guard pour les managers et plus
export function ManagerRoute({ children }: { children: React.ReactNode }) {
	return (
		<RouteGuard minRole="section_manager" redirectTo="/403">
			{children}
		</RouteGuard>
	);
}

// Guard pour les membres et plus
export function MemberRoute({ children }: { children: React.ReactNode }) {
	return (
		<RouteGuard minRole="member" redirectTo="/403">
			{children}
		</RouteGuard>
	);
}

// Guard pour la gestion des candidatures
export function ApplicationReviewRoute({
	children,
}: { children: React.ReactNode }) {
	return (
		<RouteGuard permissions="applications:review" redirectTo="/403">
			{children}
		</RouteGuard>
	);
}

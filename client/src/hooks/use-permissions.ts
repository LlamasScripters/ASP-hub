import { authClient } from "@/lib/auth/auth-client";
import { useQuery } from "@tanstack/react-query";

// Types pour les permissions
export type UserRole =
	| "user"
	| "member"
	| "coach"
	| "section_manager"
	| "admin";

export type Permission =
	| "users:read"
	| "users:write"
	| "users:delete"
	| "users:assign-roles"
	| "sections:read"
	| "sections:write"
	| "sections:delete"
	| "sections:manage-members"
	| "categories:read"
	| "categories:write"
	| "categories:delete"
	| "categories:manage-members"
	| "clubs:read"
	| "clubs:write"
	| "clubs:delete"
	| "clubs:manage"
	| "rooms:read"
	| "rooms:write"
	| "rooms:delete"
	| "rooms:book"
	| "minibus:read"
	| "minibus:write"
	| "minibus:delete"
	| "minibus:book"
	| "applications:read"
	| "applications:review"
	| "applications:submit"
	| "admin:access"
	| "content:read"
	| "content:write"
	| "content:delete";

// Matrice des permissions par rôle (côté client pour optimisation)
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
	user: ["content:read", "applications:submit"],
	member: [
		"content:read",
		"applications:read",
		"rooms:book",
		"minibus:book",
		"clubs:read",
	],
	coach: [
		"content:read",
		"content:write",
		"applications:read",
		"applications:review",
		"rooms:read",
		"rooms:book",
		"minibus:read",
		"minibus:book",
		"clubs:read",
		"clubs:write",
		"sections:read",
		"categories:read",
		"categories:manage-members",
	],
	section_manager: [
		"content:read",
		"content:write",
		"users:read",
		"applications:read",
		"applications:review",
		"rooms:read",
		"rooms:write",
		"rooms:book",
		"minibus:read",
		"minibus:write",
		"minibus:book",
		"clubs:read",
		"clubs:write",
		"clubs:manage",
		"sections:read",
		"sections:write",
		"sections:manage-members",
		"categories:read",
		"categories:write",
		"categories:manage-members",
	],
	admin: [
		"users:read",
		"users:write",
		"users:delete",
		"users:assign-roles",
		"sections:read",
		"sections:write",
		"sections:delete",
		"sections:manage-members",
		"categories:read",
		"categories:write",
		"categories:delete",
		"categories:manage-members",
		"clubs:read",
		"clubs:write",
		"clubs:delete",
		"clubs:manage",
		"rooms:read",
		"rooms:write",
		"rooms:delete",
		"rooms:book",
		"minibus:read",
		"minibus:write",
		"minibus:delete",
		"minibus:book",
		"applications:read",
		"applications:review",
		"applications:submit",
		"admin:access",
		"content:read",
		"content:write",
		"content:delete",
	],
};

interface PermissionResponse {
	permissions: Permission[];
	role: UserRole;
	userId: string;
}

/**
 * Hook pour récupérer et vérifier les permissions de l'utilisateur connecté
 */
export function usePermissions() {
	const { data: session } = authClient.useSession();

	// Query pour récupérer les permissions depuis le serveur
	const {
		data: permissionData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["permissions", session?.user.id],
		queryFn: async (): Promise<PermissionResponse> => {
			if (!session?.user) {
				throw new Error("User not authenticated");
			}

			// Pour l'instant, utiliser les permissions basées sur le rôle
			// Plus tard, on pourra faire un appel API pour des permissions plus granulaires
			const role = session.user.role as UserRole;
			const permissions = ROLE_PERMISSIONS[role] || [];

			return {
				permissions,
				role,
				userId: session.user.id,
			};
		},
		enabled: !!session?.user,
		staleTime: 5 * 60 * 1000, // 5 minutes
		refetchOnWindowFocus: false,
	});

	/**
	 * Vérifie si l'utilisateur a une permission spécifique
	 */
	const hasPermission = (permission: Permission): boolean => {
		if (!permissionData) return false;
		return permissionData.permissions.includes(permission);
	};

	/**
	 * Vérifie si l'utilisateur a au moins une des permissions spécifiées
	 */
	const hasAnyPermission = (permissions: Permission[]): boolean => {
		if (!permissionData) return false;
		return permissions.some((permission) =>
			permissionData.permissions.includes(permission),
		);
	};

	/**
	 * Vérifie si l'utilisateur a toutes les permissions spécifiées
	 */
	const hasAllPermissions = (permissions: Permission[]): boolean => {
		if (!permissionData) return false;
		return permissions.every((permission) =>
			permissionData.permissions.includes(permission),
		);
	};

	/**
	 * Vérifie si l'utilisateur a un rôle spécifique ou supérieur
	 */
	const hasRole = (role: UserRole): boolean => {
		if (!permissionData) return false;

		const roleHierarchy: Record<UserRole, number> = {
			user: 1,
			member: 2,
			coach: 3,
			section_manager: 4,
			admin: 5,
		};

		const userLevel = roleHierarchy[permissionData.role];
		const requiredLevel = roleHierarchy[role];

		return userLevel >= requiredLevel;
	};

	/**
	 * Vérifie si l'utilisateur a accès à l'administration
	 */
	const canAccessAdmin = (): boolean => {
		return hasPermission("admin:access");
	};

	/**
	 * Vérifie si l'utilisateur peut gérer d'autres utilisateurs
	 */
	const canManageUsers = (): boolean => {
		return hasAnyPermission(["users:write", "users:assign-roles"]);
	};

	/**
	 * Vérifie si l'utilisateur peut reviewer des candidatures
	 */
	const canReviewApplications = (): boolean => {
		return hasPermission("applications:review");
	};

	return {
		// Données
		permissions: permissionData?.permissions || [],
		role: permissionData?.role,
		userId: permissionData?.userId,

		// États
		isLoading,
		error,
		isAuthenticated: !!session?.user,

		// Méthodes de vérification
		hasPermission,
		hasAnyPermission,
		hasAllPermissions,
		hasRole,

		// Helpers spécifiques
		canAccessAdmin,
		canManageUsers,
		canReviewApplications,
	};
}

/**
 * Hook pour les permissions avec fallback local (sans API)
 * Utile pour des vérifications rapides côté client
 */
export function useLocalPermissions() {
	const { data: session } = authClient.useSession();

	const role = session?.user?.role as UserRole;
	const permissions = role ? ROLE_PERMISSIONS[role] : [];

	const hasPermission = (permission: Permission): boolean => {
		return permissions.includes(permission);
	};

	const hasAnyPermission = (perms: Permission[]): boolean => {
		return perms.some((permission) => permissions.includes(permission));
	};

	const hasRole = (requiredRole: UserRole): boolean => {
		if (!role) return false;

		const roleHierarchy: Record<UserRole, number> = {
			user: 1,
			member: 2,
			coach: 3,
			section_manager: 4,
			admin: 5,
		};

		const userLevel = roleHierarchy[role];
		const requiredLevel = roleHierarchy[requiredRole];

		return userLevel >= requiredLevel;
	};

	return {
		permissions,
		role,
		isAuthenticated: !!session?.user,
		hasPermission,
		hasAnyPermission,
		hasRole,
		canAccessAdmin: () => hasPermission("admin:access"),
		canManageUsers: () =>
			hasAnyPermission(["users:write", "users:assign-roles"]),
		canReviewApplications: () => hasPermission("applications:review"),
	};
}

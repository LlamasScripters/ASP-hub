import {
	type Permission,
	type UserRole,
	usePermissions,
} from "@/hooks/use-permissions";
import type React from "react";

interface ProtectedComponentProps {
	children: React.ReactNode;
	fallback?: React.ReactNode;
	loading?: React.ReactNode;
}

interface PermissionGuardProps extends ProtectedComponentProps {
	permissions: Permission | Permission[];
	requireAll?: boolean; // Si true, nécessite toutes les permissions, sinon au moins une
}

interface RoleGuardProps extends ProtectedComponentProps {
	roles?: UserRole | UserRole[];
	minRole?: UserRole; // Alternative : rôle minimum requis
}

interface AuthGuardProps extends ProtectedComponentProps {
	requireAuth?: boolean;
}

/**
 * Composant pour protéger l'accès basé sur les permissions
 */
export function PermissionGuard({
	children,
	permissions,
	requireAll = false,
	fallback = null,
	loading = null,
}: PermissionGuardProps) {
	const { hasAnyPermission, hasAllPermissions, isLoading } = usePermissions();

	if (isLoading && loading) {
		return <>{loading}</>;
	}

	const permissionArray = Array.isArray(permissions)
		? permissions
		: [permissions];

	let hasAccess = false;
	if (requireAll) {
		hasAccess = hasAllPermissions(permissionArray);
	} else {
		hasAccess = hasAnyPermission(permissionArray);
	}

	if (!hasAccess) {
		return <>{fallback}</>;
	}

	return <>{children}</>;
}

/**
 * Composant pour protéger l'accès basé sur les rôles
 */
export function RoleGuard({
	children,
	roles,
	minRole,
	fallback = null,
	loading = null,
}: RoleGuardProps) {
	const { hasRole, role, isLoading } = usePermissions();

	if (isLoading && loading) {
		return <>{loading}</>;
	}

	let hasAccess = false;

	if (minRole) {
		hasAccess = hasRole(minRole);
	} else if (roles) {
		const roleArray = Array.isArray(roles) ? roles : [roles];
		hasAccess = roleArray.includes(role as UserRole);
	}

	if (!hasAccess) {
		return <>{fallback}</>;
	}

	return <>{children}</>;
}

/**
 * Composant pour protéger l'accès basé sur l'authentification
 */
export function AuthGuard({
	children,
	requireAuth = true,
	fallback = null,
	loading = null,
}: AuthGuardProps) {
	const { isAuthenticated, isLoading } = usePermissions();

	if (isLoading && loading) {
		return <>{loading}</>;
	}

	if (requireAuth && !isAuthenticated) {
		return <>{fallback}</>;
	}

	if (!requireAuth && isAuthenticated) {
		return <>{fallback}</>;
	}

	return <>{children}</>;
}

/**
 * Composant combiné pour une protection plus complexe
 */
interface ConditionalRenderProps extends ProtectedComponentProps {
	condition: () => boolean;
}

export function ConditionalRender({
	children,
	condition,
	fallback = null,
	loading = null,
}: ConditionalRenderProps) {
	const { isLoading } = usePermissions();

	if (isLoading && loading) {
		return <>{loading}</>;
	}

	if (!condition()) {
		return <>{fallback}</>;
	}

	return <>{children}</>;
}

/**
 * Composant pour l'accès admin seulement
 */
export function AdminOnly({
	children,
	fallback = null,
	loading = null,
}: ProtectedComponentProps) {
	return (
		<PermissionGuard
			permissions="admin:access"
			fallback={fallback}
			loading={loading}
		>
			{children}
		</PermissionGuard>
	);
}

/**
 * Composant pour les managers et admins seulement
 */
export function ManagerOnly({
	children,
	fallback = null,
	loading = null,
}: ProtectedComponentProps) {
	return (
		<RoleGuard minRole="section_manager" fallback={fallback} loading={loading}>
			{children}
		</RoleGuard>
	);
}

/**
 * Composant pour les membres et plus seulement
 */
export function MemberOnly({
	children,
	fallback = null,
	loading = null,
}: ProtectedComponentProps) {
	return (
		<RoleGuard minRole="member" fallback={fallback} loading={loading}>
			{children}
		</RoleGuard>
	);
}

/**
 * HOC pour protéger un composant entier
 */
export function withPermissions<P extends object>(
	Component: React.ComponentType<P>,
	permissions: Permission | Permission[],
	options?: {
		requireAll?: boolean;
		fallback?: React.ReactNode;
		loading?: React.ReactNode;
	},
) {
	return function ProtectedComponent(props: P) {
		return (
			<PermissionGuard
				permissions={permissions}
				requireAll={options?.requireAll}
				fallback={options?.fallback}
				loading={options?.loading}
			>
				<Component {...props} />
			</PermissionGuard>
		);
	};
}

/**
 * HOC pour protéger un composant avec des rôles
 */
export function withRoles<P extends object>(
	Component: React.ComponentType<P>,
	roles?: UserRole | UserRole[],
	options?: {
		minRole?: UserRole;
		fallback?: React.ReactNode;
		loading?: React.ReactNode;
	},
) {
	return function ProtectedComponent(props: P) {
		return (
			<RoleGuard
				roles={roles}
				minRole={options?.minRole}
				fallback={options?.fallback}
				loading={options?.loading}
			>
				<Component {...props} />
			</RoleGuard>
		);
	};
}

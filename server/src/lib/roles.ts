/**
 * User roles hierarchy - Pyramidal system
 * Each role inherits permissions from lower roles
 */
export enum UserRole {
	ADMIN = "admin",
	SECTION_MANAGER = "section_manager",
	COACH = "coach",
	MEMBER = "member",
	USER = "user",
}

/**
 * Role hierarchy levels (higher number = higher privileges)
 */
export const ROLE_HIERARCHY: Record<UserRole, number> = {
	[UserRole.ADMIN]: 5,
	[UserRole.SECTION_MANAGER]: 4,
	[UserRole.COACH]: 3,
	[UserRole.MEMBER]: 2,
	[UserRole.USER]: 1,
};

/**
 * Check if a user role has sufficient privileges
 */
export function hasRoleHierarchy(
	userRole: string,
	requiredRole: UserRole,
): boolean {
	const userLevel = ROLE_HIERARCHY[userRole as UserRole] || 0;
	const requiredLevel = ROLE_HIERARCHY[requiredRole];
	return userLevel >= requiredLevel;
}

/**
 * Get all roles that have equal or higher privileges than the given role
 */
export function getRolesWithAccess(minimumRole: UserRole): UserRole[] {
	const minimumLevel = ROLE_HIERARCHY[minimumRole];
	return Object.entries(ROLE_HIERARCHY)
		.filter(([_, level]) => level >= minimumLevel)
		.map(([role, _]) => role as UserRole);
}

import { UserRole } from "./roles.js";

/**
 * Resource types in the application
 */
export enum Resource {
	USER = "user",
	SECTION = "section",
	CATEGORY = "category",
	SESSION = "session",
	ROOM_BOOKING = "room_booking",
	MINIBUS_BOOKING = "minibus_booking",
	BLOG = "blog",
}

/**
 * Actions that can be performed on resources
 */
export enum Action {
	CREATE = "create",
	READ = "read",
	UPDATE = "update",
	DELETE = "delete",
	MANAGE = "manage", // Full control
	APPROVE = "approve",
	ASSIGN = "assign",
}

/**
 * Permission mapping for each role
 * Higher roles inherit all permissions from lower roles
 */
export const ROLE_PERMISSIONS: Record<UserRole, Record<Resource, Action[]>> = {
	[UserRole.USER]: {
		[Resource.USER]: [Action.READ], // Can only read own profile
		[Resource.SECTION]: [Action.READ],
		[Resource.CATEGORY]: [Action.READ],
		[Resource.SESSION]: [],
		[Resource.ROOM_BOOKING]: [],
		[Resource.MINIBUS_BOOKING]: [],
		[Resource.BLOG]: [],
	},
	[UserRole.MEMBER]: {
		[Resource.USER]: [Action.READ, Action.UPDATE], // Can update own profile
		[Resource.SECTION]: [Action.READ],
		[Resource.CATEGORY]: [Action.READ],
		[Resource.SESSION]: [Action.READ], // Can register to sessions
		[Resource.ROOM_BOOKING]: [Action.READ],
		[Resource.MINIBUS_BOOKING]: [Action.READ],
		[Resource.BLOG]: [Action.READ],
	},
	[UserRole.COACH]: {
		[Resource.USER]: [Action.READ, Action.UPDATE], // Can manage assigned members
		[Resource.SECTION]: [Action.READ],
		[Resource.CATEGORY]: [Action.READ, Action.UPDATE], // Can manage assigned categories
		[Resource.SESSION]: [
			Action.READ,
			Action.CREATE,
			Action.UPDATE,
			Action.DELETE,
		],
		[Resource.ROOM_BOOKING]: [Action.READ, Action.CREATE, Action.UPDATE],
		[Resource.MINIBUS_BOOKING]: [Action.READ, Action.CREATE],
		[Resource.BLOG]: [Action.READ, Action.CREATE],
	},
	[UserRole.SECTION_MANAGER]: {
		[Resource.USER]: [Action.READ, Action.UPDATE, Action.APPROVE],
		[Resource.SECTION]: [Action.READ, Action.UPDATE, Action.MANAGE],
		[Resource.CATEGORY]: [
			Action.READ,
			Action.CREATE,
			Action.UPDATE,
			Action.DELETE,
		],
		[Resource.SESSION]: [
			Action.READ,
			Action.CREATE,
			Action.UPDATE,
			Action.DELETE,
		],
		[Resource.ROOM_BOOKING]: [
			Action.READ,
			Action.CREATE,
			Action.UPDATE,
			Action.DELETE,
		],
		[Resource.MINIBUS_BOOKING]: [Action.READ, Action.CREATE, Action.UPDATE],
		[Resource.BLOG]: [Action.READ, Action.CREATE, Action.UPDATE],
	},
	[UserRole.ADMIN]: {
		[Resource.USER]: [
			Action.MANAGE,
			Action.CREATE,
			Action.READ,
			Action.UPDATE,
			Action.DELETE,
			Action.APPROVE,
			Action.ASSIGN,
		],
		[Resource.SECTION]: [
			Action.MANAGE,
			Action.CREATE,
			Action.READ,
			Action.UPDATE,
			Action.DELETE,
		],
		[Resource.CATEGORY]: [
			Action.MANAGE,
			Action.CREATE,
			Action.READ,
			Action.UPDATE,
			Action.DELETE,
		],
		[Resource.SESSION]: [
			Action.MANAGE,
			Action.CREATE,
			Action.READ,
			Action.UPDATE,
			Action.DELETE,
		],
		[Resource.ROOM_BOOKING]: [
			Action.MANAGE,
			Action.CREATE,
			Action.READ,
			Action.UPDATE,
			Action.DELETE,
		],
		[Resource.MINIBUS_BOOKING]: [
			Action.MANAGE,
			Action.CREATE,
			Action.READ,
			Action.UPDATE,
			Action.DELETE,
		],
		[Resource.BLOG]: [
			Action.MANAGE,
			Action.CREATE,
			Action.READ,
			Action.UPDATE,
			Action.DELETE,
		],
	},
};

/**
 * Check if a role has permission for a specific action on a resource
 */
export function hasPermission(
	role: UserRole,
	resource: Resource,
	action: Action,
): boolean {
	const permissions = ROLE_PERMISSIONS[role];
	if (!permissions || !permissions[resource]) {
		return false;
	}
	return (
		permissions[resource].includes(action) ||
		permissions[resource].includes(Action.MANAGE)
	);
}

/**
 * Get all permissions for a role on a specific resource
 */
export function getResourcePermissions(
	role: UserRole,
	resource: Resource,
): Action[] {
	const permissions = ROLE_PERMISSIONS[role];
	return permissions?.[resource] || [];
}

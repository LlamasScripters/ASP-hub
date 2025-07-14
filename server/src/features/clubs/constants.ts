/**
 * Constants for club management roles and validation
 */

export const USER_ROLES = {
	ADMIN: "admin",
	SECTION_MANAGER: "section_manager",
	COACH: "coach",
	MEMBER: "member",
	USER: "user",
} as const;

export const RESPONSIBILITY_ROLES = {
	SECTION_MANAGER: "section_manager",
	COACH: "coach",
} as const;

export const MEMBERSHIP_STATUSES = {
	PENDING: "pending",
	APPROVED: "approved",
	REJECTED: "rejected",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type ResponsibilityRole =
	(typeof RESPONSIBILITY_ROLES)[keyof typeof RESPONSIBILITY_ROLES];
export type MembershipStatus =
	(typeof MEMBERSHIP_STATUSES)[keyof typeof MEMBERSHIP_STATUSES];

/**
 * Role hierarchy for privilege checking
 * Higher number = higher privilege
 */
export const ROLE_HIERARCHY = {
	[USER_ROLES.USER]: 1,
	[USER_ROLES.MEMBER]: 2,
	[USER_ROLES.COACH]: 3,
	[USER_ROLES.SECTION_MANAGER]: 4,
	[USER_ROLES.ADMIN]: 5,
} as const;

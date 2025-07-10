/**
 * Utility functions for club management operations
 */

import { and, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import {
	membershipApplications,
	sectionResponsibilities,
	users,
} from "../../db/schema.js";
import {
	MEMBERSHIP_STATUSES,
	RESPONSIBILITY_ROLES,
	type ResponsibilityRole,
	USER_ROLES,
	type UserRole,
} from "./constants.js";

/**
 * Validates if a user ID is a valid UUID format
 */
export function isValidUuid(id: string): boolean {
	const uuidRegex =
		/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	return uuidRegex.test(id);
}

/**
 * Validates multiple UUIDs at once
 */
export function validateUuids(...ids: string[]): void {
	for (const id of ids) {
		if (!isValidUuid(id)) {
			throw new Error(`Invalid ID format: ${id}`);
		}
	}
}

/**
 * Safely determines the base role for a user based on their membership status
 */
export async function getUserBaseRole(
	userId: string,
): Promise<"member" | "user"> {
	if (!isValidUuid(userId)) {
		throw new Error("Invalid user ID format");
	}

	const [approvedApplication] = await db
		.select()
		.from(membershipApplications)
		.where(
			and(
				eq(membershipApplications.userId, userId),
				eq(membershipApplications.status, MEMBERSHIP_STATUSES.APPROVED),
			),
		)
		.limit(1);

	return approvedApplication ? USER_ROLES.MEMBER : USER_ROLES.USER;
}

/**
 * Updates user role based on their current responsibilities with proper validation
 */
export async function updateUserRole(userId: string): Promise<UserRole> {
	if (!isValidUuid(userId)) {
		throw new Error("Invalid user ID format");
	}

	// Check active responsibilities
	const responsibilities = await db
		.select()
		.from(sectionResponsibilities)
		.where(
			and(
				eq(sectionResponsibilities.userId, userId),
				eq(sectionResponsibilities.isActive, true),
			),
		);

	let newRole: UserRole = USER_ROLES.USER;

	// Determine role based on responsibilities (priority order)
	if (
		responsibilities.some(
			(r: any) => r.role === RESPONSIBILITY_ROLES.SECTION_MANAGER,
		)
	) {
		newRole = USER_ROLES.SECTION_MANAGER;
	} else if (
		responsibilities.some((r: any) => r.role === RESPONSIBILITY_ROLES.COACH)
	) {
		newRole = USER_ROLES.COACH;
	} else {
		// If no active responsibilities, determine base role
		newRole = await getUserBaseRole(userId);
	}

	// Update role in users table
	await db.update(users).set({ role: newRole }).where(eq(users.id, userId));

	return newRole;
}

/**
 * Validates that all required fields are present for responsibility assignment
 */
export function validateResponsibilityAssignment(data: {
	userId: string;
	sectionId?: string;
	categoryId?: string;
	role: string;
}): void {
	const { userId, sectionId, categoryId, role } = data;

	// Validate UUIDs
	validateUuids(userId);
	if (sectionId) validateUuids(sectionId);
	if (categoryId) validateUuids(categoryId);

	// Validate role
	if (
		!Object.values(RESPONSIBILITY_ROLES).includes(role as ResponsibilityRole)
	) {
		throw new Error(`Invalid responsibility role: ${role}`);
	}

	// Role-specific validations
	if (role === RESPONSIBILITY_ROLES.SECTION_MANAGER && !sectionId) {
		throw new Error("Section ID is required for section manager role");
	}

	if (role === RESPONSIBILITY_ROLES.COACH && !categoryId) {
		throw new Error("Category ID is required for coach role");
	}
}

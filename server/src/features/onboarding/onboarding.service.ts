import { db } from "@/db/index.js";
import * as schema from "@/db/schema.js";
import { UserRole } from "@/lib/roles.js";
import { and, eq, isNull } from "drizzle-orm";
import type { z } from "zod/v4";
import { NotificationService } from "../notifications/notification.service.js";

// Import types directly to avoid module resolution issues
import type {
	CompleteProfileSchema,
	MembershipApplicationSchema,
} from "./onboarding.types.js";

export class OnboardingService {
	private notificationService: NotificationService;

	constructor() {
		this.notificationService = new NotificationService();
	}
	/**
	 * Check if a user needs to complete their profile
	 */
	async checkProfileCompletion(userId: string) {
		const user = await db
			.select({
				id: schema.users.id,
				firstName: schema.users.firstName,
				lastName: schema.users.lastName,
				dateOfBirth: schema.users.dateOfBirth,
				civility: schema.users.civility,
				phone: schema.users.phone,
				role: schema.users.role,
				emailVerified: schema.users.emailVerified,
			})
			.from(schema.users)
			.where(eq(schema.users.id, userId))
			.limit(1);

		if (!user[0]) {
			throw new Error("User not found");
		}

		const requiredFields = {
			firstName: !!user[0].firstName,
			lastName: !!user[0].lastName,
			dateOfBirth: !!user[0].dateOfBirth,
			civility: !!user[0].civility,
			phone: !!user[0].phone,
			emailVerified: user[0].emailVerified,
		};

		const isProfileComplete = Object.values(requiredFields).every(Boolean);
		const canApplyForMembership = isProfileComplete && user[0].role === "user";

		return {
			user: user[0],
			isProfileComplete,
			canApplyForMembership,
			requiredFields,
			missingFields: Object.entries(requiredFields)
				.filter(([_, completed]) => !completed)
				.map(([field]) => field),
		};
	}

	/**
	 * Complete user profile with required information
	 */
	async completeProfile(
		userId: string,
		profileData: z.infer<typeof CompleteProfileSchema>,
	) {
		const [updatedUser] = await db
			.update(schema.users)
			.set({
				firstName: profileData.firstName,
				lastName: profileData.lastName,
				dateOfBirth: profileData.dateOfBirth,
				civility: profileData.civility,
				phone: profileData.phone,
				height: profileData.height,
				weight: profileData.weight,
				updatedAt: new Date(),
			})
			.where(eq(schema.users.id, userId))
			.returning();

		if (!updatedUser) {
			throw new Error("Failed to update user profile");
		}

		return updatedUser;
	}

	/**
	 * Submit a membership application
	 */
	async submitMembershipApplication(
		userId: string,
		applicationData: z.infer<typeof MembershipApplicationSchema>,
	) {
		// First, verify the user can apply for membership
		const profileCheck = await this.checkProfileCompletion(userId);
		if (!profileCheck.canApplyForMembership) {
			throw new Error(
				"User profile must be complete and email verified to apply for membership",
			);
		}

		// Check if user already has a pending or approved application
		const existingApplication = await db
			.select()
			.from(schema.membershipApplications)
			.where(
				and(
					eq(schema.membershipApplications.userId, userId),
					isNull(schema.membershipApplications.deletedAt),
				),
			)
			.limit(1);

		if (existingApplication.length > 0) {
			const status = existingApplication[0].status;
			if (status === "pending") {
				throw new Error("You already have a pending membership application");
			}
			if (status === "approved") {
				throw new Error("You already have an approved membership");
			}
			if (status === "rejected") {
				// Allow reapplication after rejection
				await db
					.update(schema.membershipApplications)
					.set({ deletedAt: new Date() })
					.where(
						eq(schema.membershipApplications.id, existingApplication[0].id),
					);
			}
		}

		// Verify sections and categories exist
		if (applicationData.sectionIds && applicationData.sectionIds.length > 0) {
			const sections = await db
				.select({ id: schema.sections.id })
				.from(schema.sections)
				.where(eq(schema.sections.id, applicationData.sectionIds[0])); // For now, support single section

			if (sections.length === 0) {
				throw new Error("Invalid section selected");
			}
		}

		if (applicationData.categoryIds && applicationData.categoryIds.length > 0) {
			const categories = await db
				.select({ id: schema.categories.id })
				.from(schema.categories)
				.where(eq(schema.categories.id, applicationData.categoryIds[0])); // For now, support single category

			if (categories.length === 0) {
				throw new Error("Invalid category selected");
			}
		}

		// Create the membership application
		const [application] = await db
			.insert(schema.membershipApplications)
			.values({
				userId,
				sectionId: applicationData.sectionIds?.[0] || null,
				categoryId: applicationData.categoryIds?.[0] || null,
				motivation: applicationData.motivation,
				medicalCertificateUrl: applicationData.medicalCertificateUrl,
				emergencyContactName: applicationData.emergencyContactName,
				emergencyContactPhone: applicationData.emergencyContactPhone,
				status: "pending",
			})
			.returning();

		if (!application) {
			throw new Error("Failed to create membership application");
		}

		// Send notifications
		try {
			// Send confirmation email to applicant
			await this.notificationService.sendApplicationSubmittedEmail(
				application.id,
			);

			// Notify section managers
			await this.notificationService.notifyManagersOfNewApplication(
				application.id,
			);
		} catch (error) {
			console.error("Failed to send application notifications:", error);
			// Don't throw - application creation should succeed even if notifications fail
		}

		return application;
	}

	/**
	 * Get user's membership application status
	 */
	async getMembershipApplicationStatus(userId: string) {
		const application = await db
			.select({
				id: schema.membershipApplications.id,
				status: schema.membershipApplications.status,
				motivation: schema.membershipApplications.motivation,
				reviewComments: schema.membershipApplications.reviewComments,
				reviewedAt: schema.membershipApplications.reviewedAt,
				reviewedBy: schema.membershipApplications.reviewedBy,
				createdAt: schema.membershipApplications.createdAt,
				section: {
					id: schema.sections.id,
					name: schema.sections.name,
					description: schema.sections.description,
				},
				category: {
					id: schema.categories.id,
					name: schema.categories.name,
					description: schema.categories.description,
				},
			})
			.from(schema.membershipApplications)
			.leftJoin(
				schema.sections,
				eq(schema.membershipApplications.sectionId, schema.sections.id),
			)
			.leftJoin(
				schema.categories,
				eq(schema.membershipApplications.categoryId, schema.categories.id),
			)
			.where(
				and(
					eq(schema.membershipApplications.userId, userId),
					isNull(schema.membershipApplications.deletedAt),
				),
			)
			.orderBy(schema.membershipApplications.createdAt)
			.limit(1);

		return application[0] || null;
	}

	/**
	 * Review a membership application (admin/section_manager only)
	 */
	async reviewMembershipApplication(
		applicationId: string,
		reviewerId: string,
		decision: "approved" | "rejected",
		comments?: string,
	) {
		const [application] = await db
			.select({
				id: schema.membershipApplications.id,
				userId: schema.membershipApplications.userId,
				status: schema.membershipApplications.status,
				sectionId: schema.membershipApplications.sectionId,
				categoryId: schema.membershipApplications.categoryId,
			})
			.from(schema.membershipApplications)
			.where(eq(schema.membershipApplications.id, applicationId))
			.limit(1);

		if (!application) {
			throw new Error("Membership application not found");
		}

		if (application.status !== "pending") {
			throw new Error("Application has already been reviewed");
		}

		// Update the application
		const [updatedApplication] = await db
			.update(schema.membershipApplications)
			.set({
				status: decision,
				reviewComments: comments,
				reviewedAt: new Date(),
				reviewedBy: reviewerId,
			})
			.where(eq(schema.membershipApplications.id, applicationId))
			.returning();

		// If approved, update user role and add memberships
		if (decision === "approved") {
			// Update user role to member
			await db
				.update(schema.users)
				.set({
					role: UserRole.MEMBER,
					updatedAt: new Date(),
				})
				.where(eq(schema.users.id, application.userId));

			// Add section membership if applicable
			if (application.sectionId) {
				await db.insert(schema.sectionMembers).values({
					userId: application.userId,
					sectionId: application.sectionId,
				});
			}

			// Add category membership if applicable
			if (application.categoryId) {
				await db.insert(schema.categoryMembers).values({
					userId: application.userId,
					categoryId: application.categoryId,
				});
			}
		}

		// Send notification about the decision
		try {
			await this.notificationService.sendApplicationDecisionEmail(
				applicationId,
				decision,
				comments,
			);
			
		} catch (error) {
			console.error("Failed to send decision notifications:", error);
			// Don't throw - review should succeed even if notifications fail
		}

		return updatedApplication;
	}

	/**
	 * Get pending membership applications for review (admin/section_manager)
	 */
	async getPendingApplications(reviewerId: string, sectionId?: string) {
		const query = db
			.select({
				id: schema.membershipApplications.id,
				motivation: schema.membershipApplications.motivation,
				createdAt: schema.membershipApplications.createdAt,
				emergencyContactName:
					schema.membershipApplications.emergencyContactName,
				emergencyContactPhone:
					schema.membershipApplications.emergencyContactPhone,
				user: {
					id: schema.users.id,
					firstName: schema.users.firstName,
					lastName: schema.users.lastName,
					email: schema.users.email,
					dateOfBirth: schema.users.dateOfBirth,
					phone: schema.users.phone,
				},
				section: {
					id: schema.sections.id,
					name: schema.sections.name,
				},
				category: {
					id: schema.categories.id,
					name: schema.categories.name,
				},
			})
			.from(schema.membershipApplications)
			.innerJoin(
				schema.users,
				eq(schema.membershipApplications.userId, schema.users.id),
			)
			.leftJoin(
				schema.sections,
				eq(schema.membershipApplications.sectionId, schema.sections.id),
			)
			.leftJoin(
				schema.categories,
				eq(schema.membershipApplications.categoryId, schema.categories.id),
			)
			.where(
				and(
					eq(schema.membershipApplications.status, "pending"),
					isNull(schema.membershipApplications.deletedAt),
				),
			);

		// If section manager, filter by their section
		if (sectionId) {
			const filteredQuery = db
				.select({
					id: schema.membershipApplications.id,
					motivation: schema.membershipApplications.motivation,
					createdAt: schema.membershipApplications.createdAt,
					emergencyContactName:
						schema.membershipApplications.emergencyContactName,
					emergencyContactPhone:
						schema.membershipApplications.emergencyContactPhone,
					user: {
						id: schema.users.id,
						firstName: schema.users.firstName,
						lastName: schema.users.lastName,
						email: schema.users.email,
						dateOfBirth: schema.users.dateOfBirth,
						phone: schema.users.phone,
					},
					section: {
						id: schema.sections.id,
						name: schema.sections.name,
					},
					category: {
						id: schema.categories.id,
						name: schema.categories.name,
					},
				})
				.from(schema.membershipApplications)
				.innerJoin(
					schema.users,
					eq(schema.membershipApplications.userId, schema.users.id),
				)
				.leftJoin(
					schema.sections,
					eq(schema.membershipApplications.sectionId, schema.sections.id),
				)
				.leftJoin(
					schema.categories,
					eq(schema.membershipApplications.categoryId, schema.categories.id),
				)
				.where(
					and(
						eq(schema.membershipApplications.status, "pending"),
						isNull(schema.membershipApplications.deletedAt),
						eq(schema.membershipApplications.sectionId, sectionId),
					),
				);

			return await filteredQuery.orderBy(
				schema.membershipApplications.createdAt,
			);
		}

		return await query.orderBy(schema.membershipApplications.createdAt);
	}

	/**
	 * Get available sections and categories for membership application
	 */
	async getAvailableOptions() {
		const [sections, categories] = await Promise.all([
			db
				.select({
					id: schema.sections.id,
					name: schema.sections.name,
					description: schema.sections.description,
				})
				.from(schema.sections)
				.where(eq(schema.sections.isActive, true))
				.orderBy(schema.sections.name),

			db
				.select({
					id: schema.categories.id,
					name: schema.categories.name,
					description: schema.categories.description,
					sectionId: schema.categories.sectionId,
				})
				.from(schema.categories)
				.where(eq(schema.categories.isActive, true))
				.orderBy(schema.categories.name),
		]);

		return { sections, categories };
	}

	/**
	 * Update an existing membership application (only if pending)
	 */
	async updateMembershipApplication(
		applicationId: string,
		userId: string,
		applicationData: z.infer<typeof MembershipApplicationSchema>,
	) {
		// Find the application
		const [application] = await db
			.select()
			.from(schema.membershipApplications)
			.where(
				and(
					eq(schema.membershipApplications.id, applicationId),
					eq(schema.membershipApplications.userId, userId),
					isNull(schema.membershipApplications.deletedAt),
				),
			)
			.limit(1);

		if (!application) {
			throw new Error("Application not found or not authorized");
		}

		// Only allow updates if the application is still pending
		if (application.status !== "pending") {
			throw new Error("Only pending applications can be updated");
		}

		// Verify sections and categories exist
		if (applicationData.sectionIds && applicationData.sectionIds.length > 0) {
			const sections = await db
				.select({ id: schema.sections.id })
				.from(schema.sections)
				.where(eq(schema.sections.id, applicationData.sectionIds[0])); // For now, support single section

			if (sections.length === 0) {
				throw new Error("Invalid section selected");
			}
		}

		if (applicationData.categoryIds && applicationData.categoryIds.length > 0) {
			const categories = await db
				.select({ id: schema.categories.id })
				.from(schema.categories)
				.where(eq(schema.categories.id, applicationData.categoryIds[0])); // For now, support single category

			if (categories.length === 0) {
				throw new Error("Invalid category selected");
			}
		}

		// Update the application
		const [updatedApplication] = await db
			.update(schema.membershipApplications)
			.set({
				sectionId: applicationData.sectionIds?.[0] || null,
				categoryId: applicationData.categoryIds?.[0] || null,
				motivation: applicationData.motivation,
				medicalCertificateUrl: applicationData.medicalCertificateUrl,
				emergencyContactName: applicationData.emergencyContactName,
				emergencyContactPhone: applicationData.emergencyContactPhone,
				updatedAt: new Date(),
			})
			.where(eq(schema.membershipApplications.id, applicationId))
			.returning();

		if (!updatedApplication) {
			throw new Error("Failed to update membership application");
		}

		return updatedApplication;
	}
}

// Export singleton instance
export const onboardingService = new OnboardingService();

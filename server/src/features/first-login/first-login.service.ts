import { db } from "@/db/index.js";
import * as schema from "@/db/schema.js";
import { eq } from "drizzle-orm";
import type { z } from "zod/v4";
import { OnboardingService } from "../onboarding/onboarding.service.js";
import type {
	CompleteProfileSchema,
	MembershipApplicationSchema,
} from "../onboarding/onboarding.types.js";

export interface FirstLoginStatus {
	step: "profile" | "application" | "validation" | "complete";
	isProfileComplete: boolean;
	hasActiveApplication: boolean;
	applicationStatus?: "pending" | "approved" | "rejected";
	canProceed: boolean;
	nextAction: string;
}

export interface ApplicationFilters {
	status?: string;
	sectionId?: string;
	categoryId?: string;
	search?: string;
	dateRange?: string;
	page: number;
	limit: number;
}

export class FirstLoginService {
	private onboardingService: OnboardingService;

	constructor() {
		this.onboardingService = new OnboardingService();
	}

	/**
	 * Get the current first login status for a user
	 */
	async getFirstLoginStatus(userId: string): Promise<FirstLoginStatus> {
		// Check profile completion
		const profileStatus =
			await this.onboardingService.checkProfileCompletion(userId);

		// Check if user has any membership applications
		const applications = await db
			.select({
				id: schema.membershipApplications.id,
				status: schema.membershipApplications.status,
				createdAt: schema.membershipApplications.createdAt,
			})
			.from(schema.membershipApplications)
			.where(eq(schema.membershipApplications.userId, userId))
			.orderBy(schema.membershipApplications.createdAt);

		const hasActiveApplication = applications.length > 0;
		const latestApplication = applications[applications.length - 1];

		// Determine current step
		let step: FirstLoginStatus["step"];
		let canProceed = true;
		let nextAction = "";

		if (!profileStatus.isProfileComplete) {
			step = "profile";
			nextAction = "Complétez votre profil pour continuer";
		} else if (!hasActiveApplication) {
			step = "application";
			nextAction = "Soumettez votre candidature d'adhésion";
		} else if (latestApplication.status === "pending") {
			step = "validation";
			canProceed = false;
			nextAction = "Votre candidature est en cours de validation";
		} else if (latestApplication.status === "approved") {
			step = "complete";
			nextAction = "Bienvenue ! Votre adhésion est validée";
		} else {
			step = "application";
			nextAction =
				"Votre candidature a été refusée. Vous pouvez en soumettre une nouvelle";
		}

		return {
			step,
			isProfileComplete: profileStatus.isProfileComplete,
			hasActiveApplication,
			applicationStatus: latestApplication?.status,
			canProceed,
			nextAction,
		};
	}

	/**
	 * Complete user profile and send welcome email
	 */
	async completeProfile(
		userId: string,
		profileData: z.infer<typeof CompleteProfileSchema>,
	) {
		// Complete profile through onboarding service
		const updatedUser = await this.onboardingService.completeProfile(
			userId,
			profileData,
		);

		return updatedUser;
	}

	/**
	 * Submit membership application and trigger notifications
	 */
	async submitMembershipApplication(
		userId: string,
		applicationData: z.infer<typeof MembershipApplicationSchema>,
	) {
		// Submit application through onboarding service
		const application =
			await this.onboardingService.submitMembershipApplication(
				userId,
				applicationData,
			);

		// Notifications are handled by the onboarding service
		return application;
	}

	/**
	 * Review a membership application and send notification
	 */
	async reviewApplication(
		applicationId: string,
		reviewerId: string,
		decision: "approved" | "rejected",
		comments?: string,
	) {
		// Review application through onboarding service
		const updatedApplication =
			await this.onboardingService.reviewMembershipApplication(
				applicationId,
				reviewerId,
				decision,
				comments,
			);

		// Notifications and role updates are handled by the onboarding service
		return updatedApplication;
	}

	/**
	 * Update an existing membership application (only if pending)
	 */
	async updateMembershipApplication(
		applicationId: string,
		userId: string,
		applicationData: z.infer<typeof MembershipApplicationSchema>,
	) {
		// Update application through onboarding service
		const updatedApplication =
			await this.onboardingService.updateMembershipApplication(
				applicationId,
				userId,
				applicationData,
			);

		return updatedApplication;
	}

	/**
	 * Get all pending applications for review (admin/managers)
	 */
	async getPendingApplications(
		reviewerId: string,
		filters: ApplicationFilters,
	) {
		return this.onboardingService.getPendingApplications(reviewerId, filters);
	}

	/**
	 * Get user's application history
	 */
	async getUserApplications(userId: string) {
		return db
			.select({
				id: schema.membershipApplications.id,
				motivation: schema.membershipApplications.motivation,
				status: schema.membershipApplications.status,
				reviewComments: schema.membershipApplications.reviewComments,
				createdAt: schema.membershipApplications.createdAt,
				reviewedAt: schema.membershipApplications.reviewedAt,
				// Include all fields needed for editing
				sectionId: schema.membershipApplications.sectionId,
				categoryId: schema.membershipApplications.categoryId,
				emergencyContactName:
					schema.membershipApplications.emergencyContactName,
				emergencyContactPhone:
					schema.membershipApplications.emergencyContactPhone,
				medicalCertificateUrl:
					schema.membershipApplications.medicalCertificateUrl,
				// Keep the names for display
				sectionName: schema.sections.name,
				categoryName: schema.categories.name,
				reviewerName: schema.users.firstName,
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
			.leftJoin(
				schema.users,
				eq(schema.membershipApplications.reviewedBy, schema.users.id),
			)
			.where(eq(schema.membershipApplications.userId, userId))
			.orderBy(schema.membershipApplications.createdAt);
	}

	/**
	 * Check if user is eligible for a new application (after rejection)
	 */
	async canSubmitNewApplication(userId: string): Promise<boolean> {
		const status = await this.getFirstLoginStatus(userId);

		// Can submit if:
		// 1. Profile is complete
		// 2. No active application OR latest application was rejected
		return (
			status.isProfileComplete &&
			(!status.hasActiveApplication || status.applicationStatus === "rejected")
		);
	}
}

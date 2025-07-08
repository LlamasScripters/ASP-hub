import { auth } from "@/lib/auth.js";
import { formatZodError } from "@/lib/zod.js";
import {
	requireAuth,
	requirePermissions,
} from "@/middleware/auth.middleware.js";
import { fromNodeHeaders } from "better-auth/node";
import { Router } from "express";
import { onboardingService } from "./onboarding.service.js";
import {
	CompleteProfileSchema,
	MembershipApplicationSchema,
	ReviewApplicationSchema,
} from "./onboarding.types.js";

const onboardingRouter = Router();

/**
 * Get current user's onboarding status and profile completion
 * GET /api/onboarding/status
 */
onboardingRouter.get("/status", requireAuth, async (req, res) => {
	try {
		if (!req.session) {
			res.status(401).json({ error: "Authentication required" });
			return;
		}

		const userId = req.session.user.id;
		const status = await onboardingService.checkProfileCompletion(userId);

		res.json({
			...status,
			nextStep: determineNextStep(status),
		});
	} catch (error) {
		console.error("Error fetching onboarding status:", error);
		res.status(500).json({
			error: "Failed to fetch onboarding status",
		});
	}
});

/**
 * Complete user profile after registration
 * POST /api/onboarding/complete-profile
 */
onboardingRouter.post("/complete-profile", requireAuth, async (req, res) => {
	try {
		if (!req.session) {
			res.status(401).json({ error: "Authentication required" });
			return;
		}

		const userId = req.session.user.id;
		const { data: profileData, error } = CompleteProfileSchema.safeParse(
			req.body,
		);

		if (error) {
			res.status(422).json(formatZodError(error));
			return;
		}

		const updatedUser = await onboardingService.completeProfile(
			userId,
			profileData,
		);

		res.json({
			message: "Profile completed successfully",
			user: {
				id: updatedUser.id,
				firstName: updatedUser.firstName,
				lastName: updatedUser.lastName,
				email: updatedUser.email,
				role: updatedUser.role,
			},
		});
	} catch (error) {
		console.error("Error completing profile:", error);
		res.status(400).json({
			error:
				error instanceof Error ? error.message : "Failed to complete profile",
		});
	}
});

/**
 * Get available sections and categories for membership application
 * GET /api/onboarding/membership-options
 */
onboardingRouter.get("/membership-options", requireAuth, async (req, res) => {
	try {
		const options = await onboardingService.getAvailableOptions();
		res.json(options);
	} catch (error) {
		console.error("Error fetching membership options:", error);
		res.status(500).json({
			error: "Failed to fetch membership options",
		});
	}
});

/**
 * Submit membership application
 * POST /api/onboarding/apply-membership
 */
onboardingRouter.post("/apply-membership", requireAuth, async (req, res) => {
	try {
		if (!req.session) {
			res.status(401).json({ error: "Authentication required" });
			return;
		}

		const userId = req.session.user.id;
		const { data: applicationData, error } =
			MembershipApplicationSchema.safeParse(req.body);

		if (error) {
			res.status(422).json(formatZodError(error));
			return;
		}

		const application = await onboardingService.submitMembershipApplication(
			userId,
			applicationData,
		);

		res.status(201).json({
			message: "Membership application submitted successfully",
			application: {
				id: application.id,
				status: application.status,
				createdAt: application.createdAt,
			},
		});
	} catch (error) {
		console.error("Error submitting membership application:", error);
		res.status(400).json({
			error:
				error instanceof Error
					? error.message
					: "Failed to submit membership application",
		});
	}
});

/**
 * Get current user's membership application status
 * GET /api/onboarding/application-status
 */
onboardingRouter.get("/application-status", requireAuth, async (req, res) => {
	try {
		if (!req.session) {
			res.status(401).json({ error: "Authentication required" });
			return;
		}

		const userId = req.session.user.id;
		const application =
			await onboardingService.getMembershipApplicationStatus(userId);

		if (!application) {
			res.json({ application: null });
			return;
		}

		res.json({ application });
	} catch (error) {
		console.error("Error fetching application status:", error);
		res.status(500).json({
			error: "Failed to fetch application status",
		});
	}
});

/**
 * Get pending membership applications for review (admin/section_manager only)
 * GET /api/onboarding/pending-applications
 */
onboardingRouter.get(
	"/pending-applications",
	requirePermissions("admin", { membership_application: ["read"] }),
	async (req, res) => {
		try {
			if (!req.session) {
				res.status(401).json({ error: "Authentication required" });
				return;
			}

			const reviewerId = req.session.user.id;
			const userRole = req.session.user.role;

			// Parse query parameters
			const filters = {
				status: req.query.status as string | undefined,
				sectionId:
					userRole === "section_manager"
						? (req.query.sectionId as string)
						: (req.query.sectionId as string | undefined),
				categoryId: req.query.categoryId as string | undefined,
				search: req.query.search as string | undefined,
				dateRange: req.query.dateRange as string | undefined,
				page: Number.parseInt(req.query.page as string) || 1,
				limit: Math.min(Number.parseInt(req.query.limit as string) || 20, 100),
			};

			const result = await onboardingService.getPendingApplications(
				reviewerId,
				filters,
			);

			res.json(result);
		} catch (error) {
			console.error("Error fetching pending applications:", error);
			res.status(500).json({
				error: "Failed to fetch pending applications",
			});
		}
	},
);

/**
 * Review a membership application (admin/section_manager only)
 * POST /api/onboarding/review-application/:applicationId
 */
onboardingRouter.post(
	"/review-application/:applicationId",
	requirePermissions("admin", { membership_application: ["review"] }),
	async (req, res) => {
		try {
			if (!req.session) {
				res.status(401).json({ error: "Authentication required" });
				return;
			}

			const { applicationId } = req.params;
			const reviewerId = req.session.user.id;
			const { data: reviewData, error } = ReviewApplicationSchema.safeParse(
				req.body,
			);

			if (error) {
				res.status(422).json(formatZodError(error));
				return;
			}

			const application = await onboardingService.reviewMembershipApplication(
				applicationId,
				reviewerId,
				reviewData.decision,
				reviewData.comments,
			);

			res.json({
				message: `Application ${reviewData.decision} successfully`,
				application: {
					id: application.id,
					status: application.status,
					reviewedAt: application.reviewedAt,
				},
			});
		} catch (error) {
			console.error("Error reviewing application:", error);
			res.status(400).json({
				error:
					error instanceof Error
						? error.message
						: "Failed to review application",
			});
		}
	},
);

/**
 * Resend email verification (if needed)
 * POST /api/onboarding/resend-verification
 */
onboardingRouter.post("/resend-verification", requireAuth, async (req, res) => {
	try {
		if (!req.session) {
			res.status(401).json({ error: "Authentication required" });
			return;
		}

		const authHeaders = fromNodeHeaders(req.headers);
		const result = await auth.api.sendVerificationEmail({
			headers: authHeaders,
			body: {
				email: req.session.user.email as string,
			},
		});

		if (result.status) {
			res.json({ message: "Verification email sent successfully" });
		} else {
			res.status(400).json({ error: "Failed to send verification email" });
		}
	} catch (error) {
		console.error("Error sending verification email:", error);
		res.status(500).json({
			error: "Failed to send verification email",
		});
	}
});

/**
 * Helper function to determine the next onboarding step
 */
function determineNextStep(status: {
	isProfileComplete: boolean;
	canApplyForMembership: boolean;
	user: { emailVerified: boolean; role: string };
}) {
	if (!status.user.emailVerified) {
		return "email_verification";
	}
	if (!status.isProfileComplete) {
		return "profile_completion";
	}
	if (status.canApplyForMembership) {
		return "membership_application";
	}
	if (status.user.role === "user") {
		return "application_review";
	}
	return "completed";
}

export default onboardingRouter;

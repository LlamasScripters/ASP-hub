import { formatZodError } from "@/lib/zod.js";
import { requireMembershipApplicationAccess } from "@/middleware/app-permissions.middleware.js";
import { requireAuth } from "@/middleware/auth.middleware.js";
import { Router } from "express";
import { z } from "zod/v4";
import {
	CompleteProfileSchema,
	MembershipApplicationSchema,
} from "../onboarding/onboarding.types.js";
import { FirstLoginService } from "./first-login.service.js";

const firstLoginRouter = Router();
const firstLoginService = new FirstLoginService();

/**
 * GET /api/first-login/status
 * Get current first login status for authenticated user
 */
firstLoginRouter.get("/status", requireAuth, async (req, res) => {
	try {
		if (!req.session) {
			res.status(401).json({ error: "Authentication required" });
			return;
		}

		const userId = req.session.user.id;
		const status = await firstLoginService.getFirstLoginStatus(userId);

		res.json({
			success: true,
			data: status,
		});
	} catch (error) {
		console.error("Error getting first login status:", error);
		res.status(500).json({
			error: "Failed to get first login status",
		});
	}
});

/**
 * POST /api/first-login/complete-profile
 * Complete user profile during first login flow
 */
firstLoginRouter.post("/complete-profile", requireAuth, async (req, res) => {
	try {
		if (!req.session) {
			res.status(401).json({ error: "Authentication required" });
			return;
		}

		const userId = req.session.user.id;

		// Validate request body
		const result = CompleteProfileSchema.safeParse(req.body);
		if (!result.success) {
			res.status(400).json({
				error: "Validation failed",
				details: formatZodError(result.error),
			});
			return;
		}

		// Complete profile and send welcome email
		const updatedUser = await firstLoginService.completeProfile(
			userId,
			result.data,
		);

		res.json({
			success: true,
			message: "Profile completed successfully. Welcome email sent!",
			data: {
				user: {
					id: updatedUser.id,
					firstName: updatedUser.firstName,
					lastName: updatedUser.lastName,
					email: updatedUser.email,
					role: updatedUser.role,
				},
			},
		});
	} catch (error) {
		console.error("Error completing profile:", error);
		res.status(500).json({
			error: "Failed to complete profile",
		});
	}
});

/**
 * POST /api/first-login/submit-application
 * Submit membership application during first login flow
 */
firstLoginRouter.post("/submit-application", requireAuth, async (req, res) => {
	try {
		if (!req.session) {
			res.status(401).json({ error: "Authentication required" });
			return;
		}

		const userId = req.session.user.id;

		// Validate request body
		const result = MembershipApplicationSchema.safeParse(req.body);
		if (!result.success) {
			res.status(400).json({
				error: "Validation failed",
				details: formatZodError(result.error),
			});
			return;
		}

		// Check if user can submit a new application
		const canSubmit = await firstLoginService.canSubmitNewApplication(userId);
		if (!canSubmit) {
			res.status(400).json({
				error: "You cannot submit a new application at this time",
			});
			return;
		}

		// Submit application and send notifications
		const application = await firstLoginService.submitMembershipApplication(
			userId,
			result.data,
		);

		res.json({
			success: true,
			message: "Application submitted successfully. Confirmation email sent!",
			data: {
				application: {
					id: application.id,
					status: application.status,
					createdAt: application.createdAt,
				},
			},
		});
	} catch (error) {
		console.error("Error submitting application:", error);
		res.status(500).json({
			error: "Failed to submit application",
		});
	}
});

/**
 * GET /api/first-login/applications
 * Get user's application history
 */
firstLoginRouter.get("/applications", requireAuth, async (req, res) => {
	try {
		if (!req.session) {
			res.status(401).json({ error: "Authentication required" });
			return;
		}

		const userId = req.session.user.id;
		const applications = await firstLoginService.getUserApplications(userId);

		res.json({
			success: true,
			data: applications,
		});
	} catch (error) {
		console.error("Error getting user applications:", error);
		res.status(500).json({
			error: "Failed to get applications",
		});
	}
});

/**
 * GET /api/first-login/applications/pending
 * Get pending applications for review (admin/managers only)
 */
firstLoginRouter.get(
	"/applications/pending",
	requireAuth,
	requireMembershipApplicationAccess(),
	async (req, res) => {
		try {
			if (!req.session) {
				res.status(401).json({ error: "Authentication required" });
				return;
			}

			// Parse query parameters
			const filters = {
				status: req.query.status as string | undefined,
				sectionId: req.query.sectionId as string | undefined,
				categoryId: req.query.categoryId as string | undefined,
				search: req.query.search as string | undefined,
				dateRange: req.query.dateRange as string | undefined,
				page: Number.parseInt(req.query.page as string) || 1,
				limit: Math.min(Number.parseInt(req.query.limit as string) || 20, 100), // Max 100 items per page
			};

			const userId = req.session.user.id;
			const result = await firstLoginService.getPendingApplications(
				userId,
				filters,
			);

			res.json({
				success: true,
				...result,
			});
		} catch (error) {
			console.error("Error getting pending applications:", error);
			res.status(500).json({
				error: "Failed to get pending applications",
			});
		}
	},
);

/**
 * POST /api/first-login/applications/:id/review
 * Review a membership application (admin/managers only)
 */
firstLoginRouter.post(
	"/applications/:id/review",
	requireAuth,
	requireMembershipApplicationAccess(),
	async (req, res) => {
		try {
			if (!req.session) {
				res.status(401).json({ error: "Authentication required" });
				return;
			}

			const userId = req.session.user.id;
			const applicationId = req.params.id;

			// Validate request body
			const reviewSchema = z.object({
				decision: z.enum(["approved", "rejected"]),
				comments: z.string().optional(),
			});

			const result = reviewSchema.safeParse(req.body);
			if (!result.success) {
				res.status(400).json({
					error: "Validation failed",
					details: formatZodError(result.error),
				});
				return;
			}

			const { decision, comments } = result.data;

			// Review application and send notifications
			const updatedApplication = await firstLoginService.reviewApplication(
				applicationId,
				userId,
				decision,
				comments,
			);

			res.json({
				success: true,
				message: `Application ${decision}. Notification sent to applicant.`,
				data: {
					application: {
						id: updatedApplication.id,
						status: updatedApplication.status,
						reviewedAt: updatedApplication.reviewedAt,
						reviewComments: updatedApplication.reviewComments,
					},
				},
			});
		} catch (error) {
			console.error("Error reviewing application:", error);

			if (
				error instanceof Error &&
				(error.message.includes("not found") ||
					error.message.includes("already been reviewed"))
			) {
				res.status(400).json({ error: error.message });
				return;
			}

			res.status(500).json({
				error: "Failed to review application",
			});
		}
	},
);

/**
 * PUT /api/first-login/applications/:id
 * Update an existing membership application (only if pending)
 */
firstLoginRouter.put("/applications/:id", requireAuth, async (req, res) => {
	try {
		if (!req.session) {
			res.status(401).json({ error: "Authentication required" });
			return;
		}

		const userId = req.session.user.id;
		const applicationId = req.params.id;

		// Validate request body
		const result = MembershipApplicationSchema.safeParse(req.body);
		if (!result.success) {
			res.status(400).json({
				error: "Validation failed",
				details: formatZodError(result.error),
			});
			return;
		}

		// Update application
		const updatedApplication =
			await firstLoginService.updateMembershipApplication(
				applicationId,
				userId,
				result.data,
			);

		res.json({
			success: true,
			message: "Application updated successfully!",
			data: {
				application: {
					id: updatedApplication.id,
					status: updatedApplication.status,
					updatedAt: updatedApplication.updatedAt,
				},
			},
		});
	} catch (error) {
		console.error("Error updating application:", error);

		if (
			error instanceof Error &&
			(error.message.includes("not found") ||
				error.message.includes("cannot be updated") ||
				error.message.includes("not authorized"))
		) {
			res.status(400).json({ error: error.message });
			return;
		}

		res.status(500).json({
			error: "Failed to update application",
		});
	}
});

export default firstLoginRouter;

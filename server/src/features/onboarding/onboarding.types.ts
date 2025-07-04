import { z } from "zod/v4";

// Schema for completing user profile after registration
export const CompleteProfileSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	dateOfBirth: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
	civility: z.enum(["monsieur", "madame", "mademoiselle", "autre"]),
	phone: z.string().min(10, "Valid phone number is required"),
	height: z.number().int().min(100).max(250).optional(),
	weight: z.number().int().min(30).max(200).optional(),
});

// Schema for membership application
export const MembershipApplicationSchema = z.object({
	sectionIds: z
		.array(z.string().uuid())
		.min(1, "At least one section must be selected")
		.optional(),
	categoryIds: z.array(z.string().uuid()).optional(),
	motivation: z
		.string()
		.min(50, "Please provide a detailed motivation (minimum 50 characters)"),
	medicalCertificateUrl: z.string().url().optional(),
	emergencyContactName: z.string().min(1, "Emergency contact name is required"),
	emergencyContactPhone: z
		.string()
		.min(10, "Valid emergency contact phone is required"),
});

// Schema for reviewing membership applications
export const ReviewApplicationSchema = z.object({
	decision: z.enum(["approved", "rejected"]),
	comments: z.string().optional(),
});

// Types
export type CompleteProfile = z.infer<typeof CompleteProfileSchema>;
export type MembershipApplication = z.infer<typeof MembershipApplicationSchema>;
export type ReviewApplication = z.infer<typeof ReviewApplicationSchema>;

// Application status enum
export const APPLICATION_STATUS = {
	PENDING: "pending",
	APPROVED: "approved",
	REJECTED: "rejected",
} as const;

export type ApplicationStatus =
	(typeof APPLICATION_STATUS)[keyof typeof APPLICATION_STATUS];

// Onboarding step enum
export const ONBOARDING_STEP = {
	EMAIL_VERIFICATION: "email_verification",
	PROFILE_COMPLETION: "profile_completion",
	MEMBERSHIP_APPLICATION: "membership_application",
	APPLICATION_REVIEW: "application_review",
	COMPLETED: "completed",
} as const;

export type OnboardingStep =
	(typeof ONBOARDING_STEP)[keyof typeof ONBOARDING_STEP];

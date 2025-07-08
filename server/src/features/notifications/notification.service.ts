import { db } from "@/db/index.js";
import * as schema from "@/db/schema.js";
import { sendEmail } from "@/lib/email.js";
import { and, eq, or } from "drizzle-orm";

export interface NotificationData {
	to: { email: string; name: string };
	templateId: number;
	params: Record<string, string>;
}

// Template IDs for different notification types
const TEMPLATE_IDS = {
	applicationSubmitted: 9,
	newApplicationManager: 10,
	applicationApproved: 11,
	applicationRejected: 12,
} as const;

export class NotificationService {
	/**
	 * Send notification when membership application is submitted
	 */
	async sendApplicationSubmittedEmail(applicationId: string) {
		const application = await db
			.select({
				userEmail: schema.users.email,
				userName: schema.users.firstName,
				userLastName: schema.users.lastName,
				sectionName: schema.sections.name,
				categoryName: schema.categories.name,
			})
			.from(schema.membershipApplications)
			.leftJoin(
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
			.where(eq(schema.membershipApplications.id, applicationId))
			.limit(1);

		if (!application[0] || !application[0].userEmail) {
			throw new Error("Application or user not found");
		}

		const emailData = {
			to: {
				email: application[0].userEmail,
				name: `${application[0].userName || ""} ${application[0].userLastName || ""}`,
			},
			templateId: TEMPLATE_IDS.applicationSubmitted,
			params: {
				USER_NAME: application[0].userName || "",
				SECTION_NAME: application[0].sectionName || "",
				CATEGORY_NAME: application[0].categoryName || "",
				STATUS_URL: `${process.env.HOST}/dashboard/applications`,
			},
		};

		return this.sendNotification(emailData);
	}

	/**
	 * Notify section managers of new membership applications
	 */
	async notifyManagersOfNewApplication(applicationId: string) {
		const application = await db
			.select({
				sectionId: schema.membershipApplications.sectionId,
				categoryId: schema.membershipApplications.categoryId,
				applicantName: schema.users.firstName,
				applicantLastName: schema.users.lastName,
				sectionName: schema.sections.name,
				categoryName: schema.categories.name,
			})
			.from(schema.membershipApplications)
			.leftJoin(
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
			.where(eq(schema.membershipApplications.id, applicationId))
			.limit(1);

		if (!application[0]) {
			throw new Error("Application not found");
		}

		// Find section managers and coaches responsible for this section/category
		const managers = await db
			.select({
				email: schema.users.email,
				firstName: schema.users.firstName,
				lastName: schema.users.lastName,
			})
			.from(schema.users)
			.where(
				and(
					or(
						eq(schema.users.role, "section_manager"),
						eq(schema.users.role, "coach"),
						eq(schema.users.role, "admin"),
					),
				),
			);

		// TODO: Filter managers by actual section/category responsibilities
		// This requires the section_responsibilities table to be properly linked

		const notifications = managers.map((manager) => ({
			to: {
				email: manager.email,
				name: `${manager.firstName || ""} ${manager.lastName || ""}`,
			},
			templateId: TEMPLATE_IDS.newApplicationManager,
			params: {
				MANAGER_NAME: manager.firstName || "",
				APPLICANT_NAME: `${application[0].applicantName || ""} ${application[0].applicantLastName || ""}`,
				SECTION_NAME: application[0].sectionName || "",
				CATEGORY_NAME: application[0].categoryName || "",
				REVIEW_URL: `${process.env.HOST}/admin/applications/${applicationId}`,
			},
		}));

		return Promise.all(
			notifications.map((notif) => this.sendNotification(notif)),
		);
	}

	/**
	 * Send notification when application is approved/rejected
	 */
	async sendApplicationDecisionEmail(
		applicationId: string,
		decision: "approved" | "rejected",
		comments = "",
	) {
		const application = await db
			.select({
				userEmail: schema.users.email,
				userName: schema.users.firstName,
				userLastName: schema.users.lastName,
				sectionName: schema.sections.name,
				categoryName: schema.categories.name,
			})
			.from(schema.membershipApplications)
			.leftJoin(
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
			.where(eq(schema.membershipApplications.id, applicationId))
			.limit(1);

		if (!application[0] || !application[0].userEmail) {
			throw new Error("Application or user not found");
		}

		const templateId =
			decision === "approved"
				? TEMPLATE_IDS.applicationApproved
				: TEMPLATE_IDS.applicationRejected;

		const emailData = {
			to: {
				email: application[0].userEmail,
				name: `${application[0].userName || ""} ${application[0].userLastName || ""}`,
			},
			templateId,
			params: {
				USER_NAME: application[0].userName || "",
				SECTION_NAME: application[0].sectionName || "",
				CATEGORY_NAME: application[0].categoryName || "",
				COMMENTS: comments,
				DASHBOARD_URL: `${process.env.HOST}/dashboard`,
			},
		};

		return this.sendNotification(emailData);
	}

	/**
	 * Generic method to send notifications
	 */
	private async sendNotification(notificationData: NotificationData) {
		try {
			await sendEmail(
				notificationData.to,
				notificationData.templateId,
				notificationData.params,
			);
			console.log(`Email sent successfully to ${notificationData.to.email}`);
		} catch (error) {
			console.error(
				`Failed to send email to ${notificationData.to.email}:`,
				error,
			);
			throw error;
		}
	}
}

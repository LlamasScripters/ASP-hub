import { sendEmail } from "@/lib/email.js";

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

// Interfaces for notification data
export interface ApplicationNotificationData {
	userEmail: string;
	userName: string;
	userLastName: string;
	sectionName?: string;
	categoryName?: string;
}

export interface ManagerNotificationData {
	managers: Array<{
		email: string;
		firstName: string;
		lastName: string;
	}>;
	applicantName: string;
	applicantLastName: string;
	sectionName?: string;
	categoryName?: string;
	applicationId: string;
}

export class NotificationService {
	/**
	 * Send notification when membership application is submitted
	 */
	async sendApplicationSubmittedEmail(data: ApplicationNotificationData) {
		const emailData = {
			to: {
				email: data.userEmail,
				name: `${data.userName} ${data.userLastName}`,
			},
			templateId: TEMPLATE_IDS.applicationSubmitted,
			params: {
				USER_NAME: data.userName,
				SECTION_NAME: data.sectionName || "",
				CATEGORY_NAME: data.categoryName || "",
				STATUS_URL: `${process.env.HOST}/first-login/setup`,
			},
		};

		return this.sendNotification(emailData);
	}

	/**
	 * Notify section managers of new membership applications
	 */
	async notifyManagersOfNewApplication(data: ManagerNotificationData) {
		const notifications = data.managers.map((manager) => ({
			to: {
				email: manager.email,
				name: `${manager.firstName} ${manager.lastName}`,
			},
			templateId: TEMPLATE_IDS.newApplicationManager,
			params: {
				MANAGER_NAME: manager.firstName,
				APPLICANT_NAME: `${data.applicantName} ${data.applicantLastName}`,
				SECTION_NAME: data.sectionName || "",
				CATEGORY_NAME: data.categoryName || "",
				REVIEW_URL: `${process.env.HOST}/admin/applications/${data.applicationId}`,
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
		data: ApplicationNotificationData,
		decision: "approved" | "rejected",
		comments = "",
	) {
		const templateId =
			decision === "approved"
				? TEMPLATE_IDS.applicationApproved
				: TEMPLATE_IDS.applicationRejected;

		const emailData = {
			to: {
				email: data.userEmail,
				name: `${data.userName} ${data.userLastName}`,
			},
			templateId,
			params: {
				USER_NAME: data.userName,
				SECTION_NAME: data.sectionName || "",
				CATEGORY_NAME: data.categoryName || "",
				COMMENTS: comments,
				DASHBOARD_URL: decision === "approved"
					? `${process.env.HOST}/dashboard`
					: `${process.env.HOST}/first-login/setup`,
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

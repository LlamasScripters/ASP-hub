import { api } from "@/lib/api";
import type { ApplicationData, ProfileData } from "./first-login.config";

export const firstLoginService = {
	/**
	 * Complete user profile during first login
	 */
	completeProfile: async (profileData: ProfileData) => {
		const response = await api
			.post("first-login/complete-profile", {
				json: profileData,
			})
			.json<{
				success: boolean;
				message: string;
				data: {
					user: {
						id: string;
						firstName: string;
						lastName: string;
						email: string;
						role: string;
					};
				};
			}>();

		if (!response.success) {
			throw new Error(response.message || "Failed to complete profile");
		}

		return response.data;
	},

	/**
	 * Submit membership application
	 */
	submitApplication: async (applicationData: ApplicationData) => {
		const response = await api
			.post("first-login/submit-application", {
				json: applicationData,
			})
			.json<{
				success: boolean;
				message: string;
				data: {
					application: {
						id: string;
						status: "pending" | "approved" | "rejected";
						createdAt: string;
					};
				};
			}>();

		if (!response.success) {
			throw new Error(response.message || "Failed to submit application");
		}

		return response.data;
	},

	/**
	 * Update existing membership application
	 */
	updateApplication: async (
		applicationId: string,
		applicationData: ApplicationData,
	) => {
		const response = await api
			.put(`first-login/applications/${applicationId}`, {
				json: applicationData,
			})
			.json<{
				success: boolean;
				message: string;
				data: {
					application: {
						id: string;
						status: "pending" | "approved" | "rejected";
						updatedAt: string;
					};
				};
			}>();

		if (!response.success) {
			throw new Error(response.message || "Failed to update application");
		}

		return response.data;
	},
};

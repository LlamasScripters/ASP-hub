import { api } from "@/lib/api";
import { queryOptions } from "@tanstack/react-query";

export type FirstLoginStatus = {
	step: "profile" | "application" | "validation" | "complete";
	isProfileComplete: boolean;
	hasActiveApplication: boolean;
	applicationStatus?: "pending" | "approved" | "rejected";
	canProceed: boolean;
	nextAction: string;
};

export type ApplicationData = {
	sectionIds?: string[];
	categoryIds?: string[];
	motivation: string;
	medicalCertificateUrl?: string;
	emergencyContactName: string;
	emergencyContactPhone: string;
};

export type ApplicationWithDetails = ApplicationData & {
	id: string;
	status: "pending" | "approved" | "rejected";
	createdAt: string;
	reviewedAt?: string;
	reviewComments?: string;
	userId: string;
	// Fields from backend for editing
	sectionId?: string;
	categoryId?: string;
	// Display fields
	sectionName?: string;
	categoryName?: string;
	reviewerName?: string;
};

export type ProfileData = {
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	civility: "monsieur" | "madame" | "mademoiselle" | "autre";
	phone: string;
	height?: number;
	weight?: number;
};

export const getFirstLoginStatusQueryOptions = ({
	signal,
}: { signal?: AbortSignal } = {}) =>
	queryOptions({
		queryKey: ["first-login", "status"],
		queryFn: async (): Promise<FirstLoginStatus> => {
			const response = await api
				.get("first-login/status", {
					signal,
				})
				.json<{ success: boolean; data: FirstLoginStatus }>();

			if (!response.success) {
				throw new Error("Failed to get first login status");
			}

			return response.data;
		},
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

export const getMembershipOptionsQueryOptions = ({
	signal,
}: { signal?: AbortSignal } = {}) =>
	queryOptions({
		queryKey: ["onboarding", "membership-options"],
		queryFn: async () => {
			try {
				const response = (await api
					.get("onboarding/membership-options", {
						signal,
					})
					.json()) as unknown;

				if (response && typeof response === "object") {
					const responseObj = response as Record<string, unknown>;

					if (responseObj.success && responseObj.data) {
						return responseObj.data;
					}

					if (responseObj.sections && Array.isArray(responseObj.sections)) {
						return responseObj;
					}

					if (
						responseObj.data &&
						typeof responseObj.data === "object" &&
						responseObj.data !== null
					) {
						const dataObj = responseObj.data as Record<string, unknown>;
						if (dataObj.sections && Array.isArray(dataObj.sections)) {
							return dataObj;
						}
					}
				}

				console.error("Unknown response format:", response);
				throw new Error("Invalid response format for membership options");
			} catch (error) {
				console.error("Error fetching membership options:", error);
				throw error;
			}
		},
		staleTime: 1000 * 60 * 15, // 15 minutes
		retry: 3,
		retryDelay: 1000,
	});

export const getUserApplicationsQueryOptions = ({
	signal,
}: { signal?: AbortSignal } = {}) =>
	queryOptions({
		queryKey: ["first-login", "applications"],
		queryFn: async () => {
			const response = await api
				.get("first-login/applications", {
					signal,
				})
				.json<{
					success: boolean;
					data: Array<{
						id: string;
						status: "pending" | "approved" | "rejected";
						motivation: string;
						sectionIds?: string[];
						categoryIds?: string[];
						emergencyContactName?: string;
						emergencyContactPhone?: string;
						medicalCertificateUrl?: string;
						reviewComments?: string;
						createdAt: string;
						reviewedAt?: string;
					}>;
				}>();

			if (!response.success) {
				throw new Error("Failed to get applications");
			}

			return response.data;
		},
	});

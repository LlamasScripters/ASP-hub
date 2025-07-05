import { api } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

// Types pour le first login flow
export interface FirstLoginStatus {
	step: "profile" | "application" | "validation" | "complete";
	isProfileComplete: boolean;
	hasActiveApplication: boolean;
	applicationStatus?: "pending" | "approved" | "rejected";
	canProceed: boolean;
	nextAction: string;
}

// Schémas de validation
const CompleteProfileSchema = z.object({
	firstName: z.string().min(1, "Prénom requis"),
	lastName: z.string().min(1, "Nom requis"),
	dateOfBirth: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, "Format de date invalide (YYYY-MM-DD)"),
	civility: z.enum(["monsieur", "madame", "mademoiselle", "autre"]),
	phone: z.string().min(10, "Numéro de téléphone valide requis"),
	height: z.number().int().min(100).max(250).optional(),
	weight: z.number().int().min(30).max(200).optional(),
});

const MembershipApplicationSchema = z.object({
	sectionIds: z
		.array(z.string().uuid())
		.min(1, "Au moins une section doit être sélectionnée")
		.optional(),
	categoryIds: z.array(z.string().uuid()).optional(),
	motivation: z
		.string()
		.min(
			50,
			"Veuillez fournir une motivation détaillée (minimum 50 caractères)",
		),
	medicalCertificateUrl: z.string().url().optional(),
	emergencyContactName: z.string().min(1, "Nom du contact d'urgence requis"),
	emergencyContactPhone: z
		.string()
		.min(10, "Téléphone du contact d'urgence requis"),
});

export type CompleteProfileData = z.infer<typeof CompleteProfileSchema>;
export type MembershipApplicationData = z.infer<
	typeof MembershipApplicationSchema
>;

// Types de réponse API
interface ApiResponse<T> {
	success: boolean;
	message?: string;
	data: T;
}

interface UserProfile {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
}

interface Application {
	id: string;
	status: "pending" | "approved" | "rejected";
	createdAt: string;
	motivation?: string;
	reviewComments?: string;
	reviewedAt?: string;
	sectionName?: string;
	categoryName?: string;
	reviewerName?: string;
}

/**
 * Hook pour gérer le parcours de first login
 */
export function useFirstLogin() {
	const queryClient = useQueryClient();

	// Query pour récupérer le statut du first login
	const {
		data: status,
		isLoading: isLoadingStatus,
		error: statusError,
		refetch: refetchStatus,
	} = useQuery({
		queryKey: ["first-login", "status"],
		queryFn: async (): Promise<FirstLoginStatus> => {
			const response = await api
				.get("first-login/status")
				.json<{ success: boolean; data: FirstLoginStatus }>();
			return response.data;
		},
		staleTime: 30 * 1000, // 30 secondes
	});

	// Mutation pour compléter le profil
	const completeProfileMutation = useMutation({
		mutationFn: async (profileData: CompleteProfileData) => {
			return api
				.post("first-login/complete-profile", {
					json: profileData,
				})
				.json<ApiResponse<{ user: UserProfile }>>();
		},
		onSuccess: () => {
			// Invalidate queries pour mettre à jour le statut
			queryClient.invalidateQueries({ queryKey: ["first-login"] });
			queryClient.invalidateQueries({ queryKey: ["auth"] });
		},
	});

	// Mutation pour soumettre une candidature
	const submitApplicationMutation = useMutation({
		mutationFn: async (applicationData: MembershipApplicationData) => {
			return api
				.post("first-login/submit-application", {
					json: applicationData,
				})
				.json<ApiResponse<{ application: Application }>>();
		},
		onSuccess: () => {
			// Invalidate queries pour mettre à jour le statut
			queryClient.invalidateQueries({ queryKey: ["first-login"] });
		},
	});

	// Query pour récupérer l'historique des candidatures
	const { data: applications, isLoading: isLoadingApplications } = useQuery({
		queryKey: ["first-login", "applications"],
		queryFn: async () => {
			const response = await api
				.get("first-login/applications")
				.json<ApiResponse<Application[]>>();
			return response.data;
		},
		enabled: !!status?.hasActiveApplication,
	});

	// Helper methods
	const isStepActive = (step: FirstLoginStatus["step"]) => {
		return status?.step === step;
	};

	const isStepCompleted = (step: FirstLoginStatus["step"]) => {
		if (!status) return false;

		const stepOrder = ["profile", "application", "validation", "complete"];
		const currentStepIndex = stepOrder.indexOf(status.step);
		const targetStepIndex = stepOrder.indexOf(step);

		return currentStepIndex > targetStepIndex;
	};

	const canProceedToStep = (step: FirstLoginStatus["step"]) => {
		if (!status) return false;

		switch (step) {
			case "profile":
				return true; // Toujours accessible
			case "application":
				return status.isProfileComplete;
			case "validation":
				return status.isProfileComplete && status.hasActiveApplication;
			case "complete":
				return status.applicationStatus === "approved";
			default:
				return false;
		}
	};

	const getStepTitle = (step: FirstLoginStatus["step"]) => {
		switch (step) {
			case "profile":
				return "Complétez votre profil";
			case "application":
				return "Soumettez votre candidature";
			case "validation":
				return "Validation en cours";
			case "complete":
				return "Bienvenue !";
			default:
				return "Étape inconnue";
		}
	};

	const getStepDescription = (step: FirstLoginStatus["step"]) => {
		switch (step) {
			case "profile":
				return "Renseignez vos informations personnelles pour continuer";
			case "application":
				return "Choisissez vos sections et motivez votre candidature";
			case "validation":
				return "Votre candidature est en cours de validation par nos équipes";
			case "complete":
				return "Votre adhésion est validée, vous pouvez maintenant profiter de tous nos services";
			default:
				return "";
		}
	};

	const getProgressPercentage = () => {
		if (!status) return 0;

		switch (status.step) {
			case "profile":
				return status.isProfileComplete ? 50 : 25;
			case "application":
				return 75;
			case "validation":
				return 90;
			case "complete":
				return 100;
			default:
				return 0;
		}
	};

	return {
		// Data
		status,
		applications,

		// Loading states
		isLoadingStatus,
		isLoadingApplications,
		isCompletingProfile: completeProfileMutation.isPending,
		isSubmittingApplication: submitApplicationMutation.isPending,

		// Error states
		statusError,
		profileError: completeProfileMutation.error,
		applicationError: submitApplicationMutation.error,

		// Actions
		completeProfile: completeProfileMutation.mutate,
		submitApplication: submitApplicationMutation.mutate,
		refetchStatus,

		// Helpers
		isStepActive,
		isStepCompleted,
		canProceedToStep,
		getStepTitle,
		getStepDescription,
		getProgressPercentage,

		// Validation schemas
		CompleteProfileSchema,
		MembershipApplicationSchema,
	};
}

/**
 * Hook pour vérifier si l'utilisateur doit passer par le first login flow
 */
export function useRequiresFirstLogin() {
	const { status, isLoadingStatus } = useFirstLogin();

	const requiresFirstLogin = status && status.step !== "complete";

	return {
		requiresFirstLogin,
		isLoading: isLoadingStatus,
		currentStep: status?.step,
	};
}

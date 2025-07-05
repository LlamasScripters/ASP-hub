import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface PendingApplication {
	id: string;
	motivation: string;
	createdAt: string;
	emergencyContactName: string;
	emergencyContactPhone: string;
	user: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
		dateOfBirth: string;
		phone: string;
	};
	section: {
		id: string;
		name: string;
	} | null;
	category: {
		id: string;
		name: string;
	} | null;
}

export interface ReviewApplicationData {
	decision: "approved" | "rejected";
	comments?: string;
}

/**
 * Hook pour récupérer les candidatures en attente
 */
export function usePendingApplications(sectionId?: string) {
	return useQuery({
		queryKey: ["pending-applications", sectionId],
		queryFn: async () => {
			const url = new URL(
				"/api/first-login/applications/pending",
				window.location.origin,
			);
			if (sectionId) {
				url.searchParams.set("sectionId", sectionId);
			}

			const response = await fetch(url.toString(), {
				credentials: "include",
			});

			if (!response.ok) {
				throw new Error("Erreur lors de la récupération des candidatures");
			}

			const data = await response.json();
			return data.data as PendingApplication[];
		},
	});
}

/**
 * Hook pour récupérer une candidature spécifique
 */
export function useApplication(applicationId: string) {
	return useQuery({
		queryKey: ["application", applicationId],
		queryFn: async () => {
			const response = await fetch(
				`/api/onboarding/application/${applicationId}`,
				{
					credentials: "include",
				},
			);

			if (!response.ok) {
				throw new Error("Erreur lors de la récupération de la candidature");
			}

			const data = await response.json();
			return data.application as PendingApplication;
		},
		enabled: !!applicationId,
	});
}

/**
 * Hook pour valider/rejeter une candidature
 */
export function useReviewApplication() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			applicationId,
			data,
		}: {
			applicationId: string;
			data: ReviewApplicationData;
		}) => {
			const response = await fetch(
				`/api/first-login/applications/${applicationId}/review`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify(data),
				},
			);

			if (!response.ok) {
				const error = await response.json();
				throw new Error(
					error.error || "Erreur lors de la validation de la candidature",
				);
			}

			return response.json();
		},
		onSuccess: (_, variables) => {
			// Invalider les listes de candidatures pour les mettre à jour
			queryClient.invalidateQueries({ queryKey: ["pending-applications"] });
			queryClient.invalidateQueries({
				queryKey: ["application", variables.applicationId],
			});

			const action =
				variables.data.decision === "approved" ? "approuvée" : "rejetée";
			toast.success(`Candidature ${action} avec succès`);
		},
		onError: (error) => {
			toast.error(error.message || "Erreur lors de la validation");
		},
	});
}

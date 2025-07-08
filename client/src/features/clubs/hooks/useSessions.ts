import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { SessionSport } from "../types";

interface CreateSessionData {
	title: string;
	description?: string;
	type: "entrainement" | "match" | "stage" | "competition" | "autre";
	status: "planifie" | "en_cours" | "termine" | "annule";
	startDate: string;
	endDate: string;
	location?: string;
	maxParticipants?: number;
	equipment?: string;
	notes?: string;
}

interface UpdateSessionData {
	title?: string;
	description?: string;
	type?: "entrainement" | "match" | "stage" | "competition" | "autre";
	status?: "planifie" | "en_cours" | "termine" | "annule";
	startDate?: string;
	endDate?: string;
	location?: string;
	maxParticipants?: number;
	equipment?: string;
	notes?: string;
}

export function useSessions(
	clubId: string,
	sectionId: string,
	categoryId: string,
) {
	const queryClient = useQueryClient();

	// Query pour récupérer toutes les sessions d'une catégorie
	const {
		data: sessions = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ["sessions", clubId, sectionId, categoryId],
		queryFn: async (): Promise<SessionSport[]> => {
			const response = await fetch(
				`/api/clubs/${clubId}/sections/${sectionId}/categories/${categoryId}/sessions`,
			);
			if (!response.ok) {
				throw new Error("Erreur lors du chargement des sessions");
			}
			return response.json();
		},
	});

	// Mutation pour créer une session
	const createSessionMutation = useMutation({
		mutationFn: async (data: CreateSessionData): Promise<SessionSport> => {
			const response = await fetch(
				`/api/clubs/${clubId}/sections/${sectionId}/categories/${categoryId}/sessions`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				},
			);

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					errorData.message || "Erreur lors de la création de la session",
				);
			}

			return response.json();
		},
		onSuccess: () => {
			// Invalidation et mise à jour du cache
			queryClient.invalidateQueries({
				queryKey: ["sessions", clubId, sectionId, categoryId],
			});
			// Aussi invalider les sessions pour toutes les vues du club
			queryClient.invalidateQueries({
				queryKey: ["sessions", clubId],
			});
			toast.success("Session créée avec succès !");
		},
		onError: (error) => {
			console.error("Erreur création session:", error);
			toast.error(
				error instanceof Error
					? error.message
					: "Erreur lors de la création de la session",
			);
		},
	});

	// Mutation pour mettre à jour une session
	const updateSessionMutation = useMutation({
		mutationFn: async ({
			sessionId,
			data,
		}: {
			sessionId: string;
			data: UpdateSessionData;
		}): Promise<SessionSport> => {
			const response = await fetch(
				`/api/clubs/${clubId}/sections/${sectionId}/categories/${categoryId}/sessions/${sessionId}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				},
			);

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					errorData.message || "Erreur lors de la mise à jour de la session",
				);
			}

			return response.json();
		},
		onSuccess: (updatedSession) => {
			// Invalidation et mise à jour du cache
			queryClient.invalidateQueries({
				queryKey: ["sessions", clubId, sectionId, categoryId],
			});
			queryClient.invalidateQueries({
				queryKey: ["session", clubId, sectionId, categoryId, updatedSession.id],
			});
			// Aussi invalider les sessions pour toutes les vues du club
			queryClient.invalidateQueries({
				queryKey: ["sessions", clubId],
			});
			toast.success("Session mise à jour avec succès !");
		},
		onError: (error) => {
			console.error("Erreur mise à jour session:", error);
			toast.error(
				error instanceof Error
					? error.message
					: "Erreur lors de la mise à jour de la session",
			);
		},
	});

	// Mutation pour supprimer une session
	const deleteSessionMutation = useMutation({
		mutationFn: async (sessionId: string): Promise<void> => {
			const response = await fetch(
				`/api/clubs/${clubId}/sections/${sectionId}/categories/${categoryId}/sessions/${sessionId}`,
				{
					method: "DELETE",
				},
			);

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					errorData.message || "Erreur lors de la suppression de la session",
				);
			}
		},
		onSuccess: () => {
			// Invalidation du cache
			queryClient.invalidateQueries({
				queryKey: ["sessions", clubId, sectionId, categoryId],
			});
			// Aussi invalider les sessions pour toutes les vues du club
			queryClient.invalidateQueries({
				queryKey: ["sessions", clubId],
			});
			toast.success("Session supprimée avec succès !");
		},
		onError: (error) => {
			console.error("Erreur suppression session:", error);
			toast.error(
				error instanceof Error
					? error.message
					: "Erreur lors de la suppression de la session",
			);
		},
	});

	// Fonctions wrapper
	const createSession = async (
		data: CreateSessionData,
	): Promise<SessionSport> => {
		return createSessionMutation.mutateAsync(data);
	};

	const updateSession = async (
		sessionId: string,
		data: UpdateSessionData,
	): Promise<SessionSport> => {
		return updateSessionMutation.mutateAsync({ sessionId, data });
	};

	const deleteSession = async (sessionId: string): Promise<void> => {
		return deleteSessionMutation.mutateAsync(sessionId);
	};

	return {
		// Data
		sessions,
		isLoading,
		error,

		// Mutations
		createSession,
		updateSession,
		deleteSession,

		// États des mutations
		isCreating: createSessionMutation.isPending,
		isUpdating: updateSessionMutation.isPending,
		isDeleting: deleteSessionMutation.isPending,
	};
}

// Hook pour récupérer une session spécifique
export function useSession(
	clubId: string,
	sectionId: string,
	categoryId: string,
	sessionId: string,
) {
	return useQuery({
		queryKey: ["session", clubId, sectionId, categoryId, sessionId],
		queryFn: async (): Promise<SessionSport> => {
			const response = await fetch(
				`/api/clubs/${clubId}/sections/${sectionId}/categories/${categoryId}/sessions/${sessionId}`,
			);
			if (!response.ok) {
				throw new Error("Erreur lors du chargement de la session");
			}
			return response.json();
		},
		enabled: !!sessionId,
	});
}

// Hook pour récupérer toutes les sessions d'un club (vue d'ensemble)
export function useClubSessions(clubId: string) {
	const queryClient = useQueryClient();

	const {
		data: sessions = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ["sessions", clubId],
		queryFn: async (): Promise<SessionSport[]> => {
			const response = await fetch(`/api/clubs/${clubId}/sessions`);
			if (!response.ok) {
				throw new Error("Erreur lors du chargement des sessions du club");
			}
			return response.json();
		},
	});

	// Mutation pour supprimer une session depuis la vue d'ensemble
	const deleteSessionMutation = useMutation({
		mutationFn: async (sessionId: string): Promise<void> => {
			const response = await fetch(`/api/sessions/${sessionId}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					errorData.message || "Erreur lors de la suppression de la session",
				);
			}
		},
		onSuccess: () => {
			// Invalidation du cache
			queryClient.invalidateQueries({
				queryKey: ["sessions", clubId],
			});
			toast.success("Session supprimée avec succès !");
		},
		onError: (error) => {
			console.error("Erreur suppression session:", error);
			toast.error(
				error instanceof Error
					? error.message
					: "Erreur lors de la suppression de la session",
			);
		},
	});

	const deleteSessionFromOverview = async (
		sessionId: string,
	): Promise<void> => {
		return deleteSessionMutation.mutateAsync(sessionId);
	};

	return {
		sessions,
		isLoading,
		error,
		deleteSession: deleteSessionFromOverview,
		isDeleting: deleteSessionMutation.isPending,
	};
}

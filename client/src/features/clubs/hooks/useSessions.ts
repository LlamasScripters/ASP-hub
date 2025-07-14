import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { sessionsApi } from "./../lib/api";
import type { 
	CreateSessionData, 
	UpdateSessionData, 
	ParticipantAction 
} from "./../types";

// Query keys
export const sessionsQueryKeys = {
	all: ['sessions'] as const,
	lists: () => [...sessionsQueryKeys.all, 'list'] as const,
	details: () => [...sessionsQueryKeys.all, 'detail'] as const,
	detail: (id: string) => [...sessionsQueryKeys.details(), id] as const,
	stats: () => [...sessionsQueryKeys.all, 'stats'] as const,
	conflicts: (data: CreateSessionData) => [...sessionsQueryKeys.all, 'conflicts', data] as const,
};

// Query hooks
export function useSessions() {
	return useQuery({
		queryKey: sessionsQueryKeys.lists(),
		queryFn: () => sessionsApi.getSessions(),
		staleTime: 2 * 60 * 1000, // 2 minutes (sessions change frequently)
		gcTime: 5 * 60 * 1000, // 5 minutes
	});
}

export function useSession(id: string) {
	return useQuery({
		queryKey: sessionsQueryKeys.detail(id),
		queryFn: () => sessionsApi.getSessionById(id),
		enabled: !!id,
		staleTime: 2 * 60 * 1000,
	});
}

export function useSessionStats() {
	return useQuery({
		queryKey: sessionsQueryKeys.stats(),
		queryFn: () => sessionsApi.getSessionStats(),
		staleTime: 5 * 60 * 1000,
	});
}

export function useSessionsByCategory(categoryId: string) {
	return useQuery({
		queryKey: [...sessionsQueryKeys.all, 'category', categoryId],
		queryFn: () => sessionsApi.getSessionsByCategory(categoryId),
		enabled: !!categoryId,
		staleTime: 2 * 60 * 1000,
	});
}

export function useSessionConflicts(data: CreateSessionData) {
	return useQuery({
		queryKey: sessionsQueryKeys.conflicts(data),
		queryFn: () => sessionsApi.checkSessionConflicts(data),
		enabled: !!(data.categoryId && data.startDate && data.endDate),
		staleTime: 0, // Always fresh for conflict detection
	});
}

// Mutation hooks
export function useCreateSession() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateSessionData) => sessionsApi.createSession(data),
		onSuccess: (newSession) => {
			// Invalidate all sessions lists
			queryClient.invalidateQueries({ queryKey: sessionsQueryKeys.lists() });
			
			// Invalidate all sessions queries
			queryClient.invalidateQueries({ queryKey: sessionsQueryKeys.all });
			
			// Invalidate sessions by category
			if (newSession.categoryId) {
				queryClient.invalidateQueries({ 
					queryKey: [...sessionsQueryKeys.all, 'category', newSession.categoryId] 
				});
			}
			
			// Invalidate stats
			queryClient.invalidateQueries({ queryKey: sessionsQueryKeys.stats() });
			
			// Invalidate categories (for session count)
			queryClient.invalidateQueries({ queryKey: ['categories'] });
			
			// Optimistically update the cache
			queryClient.setQueryData(
				sessionsQueryKeys.detail(newSession.id),
				newSession
			);
			
			toast.success("Session créée avec succès");
		},
		onError: (error) => {
			const errorMessage = error instanceof Error ? error.message : "Erreur lors de la création";
			toast.error(errorMessage);
		},
	});
}

export function useUpdateSession() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateSessionData }) =>
			sessionsApi.updateSession(id, data),
		onSuccess: (updatedSession, { id }) => {
			// Update the specific session in the cache
			queryClient.setQueryData(
				sessionsQueryKeys.detail(id),
				updatedSession
			);
			
			// Invalidate all sessions lists
			queryClient.invalidateQueries({ queryKey: sessionsQueryKeys.lists() });
			
			// Invalidate all sessions queries
			queryClient.invalidateQueries({ queryKey: sessionsQueryKeys.all });
			
			// Invalidate sessions by category
			if (updatedSession.categoryId) {
				queryClient.invalidateQueries({ 
					queryKey: [...sessionsQueryKeys.all, 'category', updatedSession.categoryId] 
				});
			}
			
			// Invalidate stats
			queryClient.invalidateQueries({ queryKey: sessionsQueryKeys.stats() });
			
			// Invalidate categories (for session count)
			queryClient.invalidateQueries({ queryKey: ['categories'] });
			
			toast.success("Session modifiée avec succès");
		},
		onError: (error) => {
			const errorMessage = error instanceof Error ? error.message : "Erreur lors de la modification";
			toast.error(errorMessage);
		},
	});
}

export function useDeleteSession() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => sessionsApi.deleteSession(id),
		onSuccess: (_, id) => {
			// Remove the session from the cache
			queryClient.removeQueries({ queryKey: sessionsQueryKeys.detail(id) });
			
			// Invalidate all sessions lists
			queryClient.invalidateQueries({ queryKey: sessionsQueryKeys.lists() });
			
			// Invalidate all sessions queries
			queryClient.invalidateQueries({ queryKey: sessionsQueryKeys.all });
			
			// Invalidate all sessions by category queries
			queryClient.invalidateQueries({ 
				queryKey: [...sessionsQueryKeys.all, 'category'] 
			});
			
			// Invalidate stats
			queryClient.invalidateQueries({ queryKey: sessionsQueryKeys.stats() });
			
			// Invalidate categories (for session count)
			queryClient.invalidateQueries({ queryKey: ['categories'] });
			
			toast.success("Session supprimée avec succès");
		},
		onError: (error) => {
			const errorMessage = error instanceof Error ? error.message : "Erreur lors de la suppression";
			toast.error(errorMessage);
		},
	});
}

export function useManageParticipants() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ sessionId, action }: { sessionId: string; action: ParticipantAction }) =>
			sessionsApi.manageParticipants(sessionId, action),
		onSuccess: (_, { sessionId, action }) => {
			// Invalidate the specific session to refresh participant data
			queryClient.invalidateQueries({ 
				queryKey: sessionsQueryKeys.detail(sessionId) 
			});
			
			// Invalidate all sessions lists to update participant counts
			queryClient.invalidateQueries({ queryKey: sessionsQueryKeys.lists() });
			
			// Invalidate all sessions queries
			queryClient.invalidateQueries({ queryKey: sessionsQueryKeys.all });
			
			// Invalidate stats
			queryClient.invalidateQueries({ queryKey: sessionsQueryKeys.stats() });
			
			const actionText = action.action === 'add' ? 'rejoint' : 'quitté';
			toast.success(`Vous avez ${actionText} la session avec succès`);
		},
		onError: (error) => {
			const errorMessage = error instanceof Error ? error.message : "Erreur lors de la gestion des participants";
			toast.error(errorMessage);
		},
	});
}

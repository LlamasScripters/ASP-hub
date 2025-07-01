import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import type { Club } from "../types";

interface UseClubsProps {
	initialData?: Club[];
	autoLoad?: boolean;
}

interface UseClubsReturn {
	clubs: Club[];
	loading: boolean;
	error: string | null;
	createClub: (data: Omit<Club, "id" | "createdAt" | "updatedAt">) => Promise<Club | null>;
	updateClub: (id: string, data: Partial<Club>) => Promise<Club | null>;
	deleteClub: (id: string) => Promise<boolean>;
	refresh: () => Promise<void>;
}

export function useClubs({ initialData = [], autoLoad = true }: UseClubsProps = {}): UseClubsReturn {
	const [clubs, setClubs] = useState<Club[]>(initialData);
	const [loading, setLoading] = useState(autoLoad);
	const [error, setError] = useState<string | null>(null);

	const refresh = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch("/api/clubs");
			if (!response.ok) {
				throw new Error("Erreur lors du chargement des associations");
			}
			const data = await response.json();
			setClubs(data);
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "Erreur inconnue";
			setError(errorMessage);
			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	}, []);

	// Auto-chargement au montage
	useEffect(() => {
		if (autoLoad && initialData.length === 0) {
			refresh();
		}
	}, [autoLoad, initialData.length, refresh]);

	const createClub = useCallback(async (data: Omit<Club, "id" | "createdAt" | "updatedAt">) => {
		setError(null);
		try {
			const response = await fetch("/api/clubs", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Erreur lors de la création de l'association");
			}

			const newClub = await response.json();
			setClubs(prev => [...prev, newClub]);
			toast.success("Association créée avec succès");
			return newClub;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "Erreur lors de la création";
			setError(errorMessage);
			toast.error(errorMessage);
			return null;
		}
	}, []);

	const updateClub = useCallback(async (id: string, data: Partial<Club>) => {
		setError(null);
		try {
			const response = await fetch(`/api/clubs/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Erreur lors de la modification de l'association");
			}

			const updatedClub = await response.json();
			setClubs(prev => prev.map(club => club.id === id ? updatedClub : club));
			toast.success("Association modifiée avec succès");
			return updatedClub;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "Erreur lors de la modification";
			setError(errorMessage);
			toast.error(errorMessage);
			return null;
		}
	}, []);

	const deleteClub = useCallback(async (id: string) => {
		setError(null);
		try {
			const response = await fetch(`/api/clubs/${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error("Erreur lors de la suppression de l'association");
			}

			setClubs(prev => prev.filter(club => club.id !== id));
			toast.success("Association supprimée avec succès");
			return true;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "Erreur lors de la suppression";
			setError(errorMessage);
			toast.error(errorMessage);
			return false;
		}
	}, []);

	return {
		clubs,
		loading,
		error,
		createClub,
		updateClub,
		deleteClub,
		refresh,
	};
}

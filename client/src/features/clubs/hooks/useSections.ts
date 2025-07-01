import { useState, useCallback } from "react";
import { toast } from "sonner";
import type { Section } from "../types";

interface UseSectionsProps {
	clubId: string;
	initialData?: Section[];
}

interface UseSectionsReturn {
	sections: Section[];
	loading: boolean;
	error: string | null;
	createSection: (data: Omit<Section, "id" | "createdAt" | "updatedAt">) => Promise<Section | null>;
	updateSection: (id: string, data: Partial<Section>) => Promise<Section | null>;
	deleteSection: (id: string) => Promise<boolean>;
	refresh: () => Promise<void>;
}

export function useSections({ clubId, initialData = [] }: UseSectionsProps): UseSectionsReturn {
	const [sections, setSections] = useState<Section[]>(initialData);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const refresh = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(`/api/clubs/${clubId}/sections`);
			if (!response.ok) {
				throw new Error("Erreur lors du chargement des sections");
			}
			const data = await response.json();
			setSections(data);
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "Erreur inconnue";
			setError(errorMessage);
			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	}, [clubId]);

	const createSection = useCallback(async (data: Omit<Section, "id" | "createdAt" | "updatedAt">) => {
		setError(null);
		try {
			const response = await fetch(`/api/clubs/${clubId}/sections`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...data, clubId }),
			});

			if (!response.ok) {
				throw new Error("Erreur lors de la création de la section");
			}

			const newSection = await response.json();
			setSections(prev => [...prev, newSection]);
			toast.success("Section créée avec succès");
			return newSection;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "Erreur lors de la création";
			setError(errorMessage);
			toast.error(errorMessage);
			return null;
		}
	}, [clubId]);

	const updateSection = useCallback(async (id: string, data: Partial<Section>) => {
		setError(null);
		try {
			const response = await fetch(`/api/clubs/${clubId}/sections/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Erreur lors de la modification de la section");
			}

			const updatedSection = await response.json();
			setSections(prev => prev.map(section => section.id === id ? updatedSection : section));
			toast.success("Section modifiée avec succès");
			return updatedSection;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "Erreur lors de la modification";
			setError(errorMessage);
			toast.error(errorMessage);
			return null;
		}
	}, [clubId]);

	const deleteSection = useCallback(async (id: string) => {
		setError(null);
		try {
			const response = await fetch(`/api/clubs/${clubId}/sections/${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error("Erreur lors de la suppression de la section");
			}

			setSections(prev => prev.filter(section => section.id !== id));
			toast.success("Section supprimée avec succès");
			return true;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "Erreur lors de la suppression";
			setError(errorMessage);
			toast.error(errorMessage);
			return false;
		}
	}, [clubId]);

	return {
		sections,
		loading,
		error,
		createSection,
		updateSection,
		deleteSection,
		refresh,
	};
}

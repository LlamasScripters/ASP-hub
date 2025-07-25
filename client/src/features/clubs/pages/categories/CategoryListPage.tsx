import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Link, useParams } from "@tanstack/react-router";
import {
	ArrowLeft,
	ChevronDown,
	ChevronUp,
	Edit,
	Search,
	Trash2,
	User,
	Users,
} from "lucide-react";

import { useMemo, useState } from "react";
import { useCategoriesBySection } from "../../hooks/useCategories";
import { useDeleteCategory } from "../../hooks/useCategories";
import { useSection } from "../../hooks/useSections";
import type { Category } from "../../types";

type SortField = "name" | "ageMin" | "ageMax";
type SortDirection = "asc" | "desc";

interface Filters {
	name: string;
	ageMin: string;
	ageMax: string;
	ageRange: string;
}

const isValidAge = (age: number | undefined | null): age is number => {
	return age !== undefined && age !== null && age >= 0;
};

export function CategoriesListPage() {
	const { clubId, sectionId } = useParams({
		from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/categories/",
	});

	const { data, isLoading: categoriesLoading } =
		useCategoriesBySection(sectionId);
	const categories = data?.data || [];
	const { data: section, isLoading: sectionLoading } = useSection(sectionId);
	const { mutateAsync: deleteCategory } = useDeleteCategory();

	const [sortField, setSortField] = useState<SortField>("name");
	const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
	const [filters, setFilters] = useState<Filters>({
		name: "",
		ageMin: "",
		ageMax: "",
		ageRange: "",
	});
	const [deleteCategoryState, setDeleteCategoryState] =
		useState<Category | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);

	const sectionName = section?.name || "";
	const isLoading = categoriesLoading || sectionLoading;

	const handleSort = (field: SortField) => {
		if (sortField === field) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortField(field);
			setSortDirection("asc");
		}
	};

	const handleFilterChange = (field: keyof Filters, value: string) => {
		setFilters((prev) => ({ ...prev, [field]: value }));
	};

	const getSortIcon = (field: SortField) => {
		if (sortField !== field) return null;
		return sortDirection === "asc" ? (
			<ChevronUp className="ml-1 h-4 w-4" />
		) : (
			<ChevronDown className="ml-1 h-4 w-4" />
		);
	};

	const filteredAndSortedCategories = useMemo(() => {
		const filtered = categories.filter((category) => {
			const nameMatch = category.name
				.toLowerCase()
				.includes(filters.name.toLowerCase());

			// amélioration du filtrage pour les âges undefined
			const ageMinMatch =
				filters.ageMin === "" ||
				(isValidAge(category.ageMin) &&
					category.ageMin.toString().includes(filters.ageMin)) ||
				(!isValidAge(category.ageMin) &&
					filters.ageMin.toLowerCase().includes("non"));

			const ageMaxMatch =
				filters.ageMax === "" ||
				(isValidAge(category.ageMax) &&
					category.ageMax.toString().includes(filters.ageMax)) ||
				(!isValidAge(category.ageMax) &&
					filters.ageMax.toLowerCase().includes("non"));

			const ageRangeMatch =
				filters.ageRange === "" ||
				(isValidAge(category.ageMin) &&
					isValidAge(category.ageMax) &&
					`${category.ageMin} - ${category.ageMax}`.includes(
						filters.ageRange,
					)) ||
				((!isValidAge(category.ageMin) || !isValidAge(category.ageMax)) &&
					filters.ageRange.toLowerCase().includes("non"));

			return nameMatch && ageMinMatch && ageMaxMatch && ageRangeMatch;
		});

		filtered.sort((a, b) => {
			let aValue: string | number;
			let bValue: string | number;

			switch (sortField) {
				case "name":
					aValue = a.name.toLowerCase();
					bValue = b.name.toLowerCase();
					break;
				case "ageMin":
					aValue = isValidAge(a.ageMin) ? a.ageMin : -1; // -1 pour que les undefined soient en premier
					bValue = isValidAge(b.ageMin) ? b.ageMin : -1;
					break;
				case "ageMax":
					aValue = isValidAge(a.ageMax) ? a.ageMax : -1; // -1 pour que les undefined soient en premier
					bValue = isValidAge(b.ageMax) ? b.ageMax : -1;
					break;
				default:
					return 0;
			}

			if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
			if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
			return 0;
		});

		return filtered;
	}, [categories, filters, sortField, sortDirection]);

	const clearFilters = () => {
		setFilters({
			name: "",
			ageMin: "",
			ageMax: "",
			ageRange: "",
		});
	};

	const handleDeleteCategory = async () => {
		if (!deleteCategoryState) return;

		setIsDeleting(true);
		try {
			await deleteCategory(deleteCategoryState.id);
			setDeleteCategoryState(null);
		} catch (error) {
			console.error("Erreur lors de la suppression:", error);
		} finally {
			setIsDeleting(false);
		}
	};

	if (isLoading) {
		return (
			<div className="container mx-auto p-6">
				<div className="text-center">Chargement...</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-6 space-y-8">
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div className="space-y-1">
						<h1 className="text-3xl font-bold tracking-tight">
							Catégories de la section {sectionName}
						</h1>
						<p className="text-muted-foreground">
							Gérez les catégories de la section{" "}
							<span className="font-medium">{sectionName}</span>
						</p>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm" asChild>
							<Link
								to="/admin/dashboard/clubs/$clubId/sections"
								params={{ clubId }}
							>
								<ArrowLeft className="w-4 h-4 mr-2" />
								Retour aux sections
							</Link>
						</Button>
						<Button asChild>
							<Link
								to="/admin/dashboard/clubs/$clubId/sections/$sectionId/categories/create"
								params={{ clubId, sectionId }}
							>
								<Users className="mr-2 h-4 w-4" />
								Créer une catégorie
							</Link>
						</Button>
					</div>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Users className="h-5 w-5" />
						Liste des catégories
					</CardTitle>
					<CardDescription>
						{filteredAndSortedCategories.length} catégorie
						{filteredAndSortedCategories.length > 1 ? "s" : ""} affichée
						{filteredAndSortedCategories.length > 1 ? "s" : ""} sur{" "}
						{categories.length} au total
					</CardDescription>
				</CardHeader>
				<CardContent>
					{/* Filtres */}
					<div className="mb-6 space-y-4">
						<div className="flex items-center justify-between">
							<h3 className="text-sm font-medium flex items-center gap-2">
								<Search className="h-4 w-4" />
								Filtres de recherche
							</h3>
							<Button
								variant="outline"
								className="hover:cursor-pointer"
								size="sm"
								onClick={clearFilters}
							>
								Effacer les filtres
							</Button>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
							<div className="space-y-2">
								<label
									htmlFor="name"
									className="text-xs font-medium text-muted-foreground"
								>
									Nom de la catégorie
								</label>
								<Input
									id="name"
									placeholder="Rechercher par nom..."
									value={filters.name}
									onChange={(e) => handleFilterChange("name", e.target.value)}
									className="h-8"
								/>
							</div>
							<div className="space-y-2">
								<label
									htmlFor="ageMin"
									className="text-xs font-medium text-muted-foreground"
								>
									Âge minimum
								</label>
								<Input
									id="ageMin"
									placeholder="Ex: 12"
									value={filters.ageMin}
									onChange={(e) => handleFilterChange("ageMin", e.target.value)}
									className="h-8"
								/>
							</div>
							<div className="space-y-2">
								<label
									htmlFor="ageMax"
									className="text-xs font-medium text-muted-foreground"
								>
									Âge maximum
								</label>
								<Input
									id="ageMax"
									placeholder="Ex: 18"
									value={filters.ageMax}
									onChange={(e) => handleFilterChange("ageMax", e.target.value)}
									className="h-8"
								/>
							</div>
							<div className="space-y-2">
								<label
									htmlFor="ageRange"
									className="text-xs font-medium text-muted-foreground"
								>
									Tranche d'âge
								</label>
								<Input
									id="ageRange"
									placeholder="Ex: 12 - 18"
									value={filters.ageRange}
									onChange={(e) =>
										handleFilterChange("ageRange", e.target.value)
									}
									className="h-8"
								/>
							</div>
						</div>
					</div>

					<div className="rounded-md border">
						<Table>
							<TableHeader>
								<TableRow className="hover:bg-transparent">
									<TableHead
										className="font-semibold cursor-pointer hover:bg-muted/50 transition-colors"
										onClick={() => handleSort("name")}
									>
										<div className="flex items-center">
											Nom de la catégorie
											{getSortIcon("name")}
										</div>
									</TableHead>
									<TableHead
										className="font-semibold cursor-pointer hover:bg-muted/50 transition-colors"
										onClick={() => handleSort("ageMin")}
									>
										<div className="flex items-center">
											Âge minimum
											{getSortIcon("ageMin")}
										</div>
									</TableHead>
									<TableHead
										className="font-semibold cursor-pointer hover:bg-muted/50 transition-colors"
										onClick={() => handleSort("ageMax")}
									>
										<div className="flex items-center">
											Âge maximum
											{getSortIcon("ageMax")}
										</div>
									</TableHead>
									<TableHead className="font-semibold">Tranche d'âge</TableHead>
									<TableHead className="font-semibold">Coach</TableHead>
									<TableHead className="font-semibold text-right">
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredAndSortedCategories.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={6}
											className="h-24 text-center text-muted-foreground"
										>
											{categories.length === 0
												? "Aucune catégorie trouvée. Créez votre première catégorie !"
												: "Aucune catégorie ne correspond aux filtres appliqués."}
										</TableCell>
									</TableRow>
								) : (
									filteredAndSortedCategories.map((c) => (
										<TableRow
											key={c.id}
											className="hover:bg-muted/50 transition-colors"
										>
											<TableCell className="font-medium text-foreground">
												{c.name}
											</TableCell>
											<TableCell>
												{c.ageMin !== undefined ? (
													<Badge variant="secondary" className="font-mono">
														{c.ageMin} ans
													</Badge>
												) : (
													<span className="text-muted-foreground text-sm">
														Non défini
													</span>
												)}
											</TableCell>
											<TableCell>
												{isValidAge(c.ageMax) ? (
													<Badge variant="secondary" className="font-mono">
														{c.ageMax} ans
													</Badge>
												) : (
													<Badge variant="outline" className="font-mono">
														Non défini
													</Badge>
												)}
											</TableCell>
											<TableCell>
												{isValidAge(c.ageMin) && isValidAge(c.ageMax) ? (
													<Badge variant="outline" className="font-mono">
														{c.ageMin} → {c.ageMax} ans
													</Badge>
												) : isValidAge(c.ageMin) && !isValidAge(c.ageMax) ? (
													<Badge variant="outline" className="font-mono">
														{c.ageMin} ans et +
													</Badge>
												) : (
													<Badge variant="outline" className="font-mono">
														Non défini
													</Badge>
												)}
											</TableCell>
											<TableCell>
												{c.coach ? (
													<div className="flex items-center gap-2 text-sm">
														<User className="h-3 w-3 text-muted-foreground" />
														<span>
															{c.coach.firstName} {c.coach.lastName}
														</span>
													</div>
												) : (
													<span className="text-muted-foreground text-sm">
														Aucun coach
													</span>
												)}
											</TableCell>
											<TableCell className="text-right">
												<div className="flex items-center justify-end gap-2">
													<Button
														variant="ghost"
														size="sm"
														className="h-8 px-3 hover:bg-primary/10 hover:text-primary"
														asChild
													>
														<Link
															to="/admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/edit"
															params={{
																clubId,
																sectionId,
																categoryId: c.id,
															}}
														>
															<Edit className="h-4 w-4 mr-1" />
															Modifier
														</Link>
													</Button>
													<Button
														variant="ghost"
														size="sm"
														className="h-8 px-3 hover:cursor-pointer hover:bg-destructive/10 hover:text-destructive"
														onClick={() => setDeleteCategoryState(c)}
													>
														<Trash2 className="mr-1 h-3 w-3" />
														Supprimer
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>

			{/* Modal de confirmation de suppression */}
			<AlertDialog
				open={!!deleteCategoryState}
				onOpenChange={() => setDeleteCategoryState(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Supprimer la catégorie</AlertDialogTitle>
						<AlertDialogDescription>
							Êtes-vous sûr de vouloir supprimer la catégorie{" "}
							<strong>"{deleteCategoryState?.name}"</strong> ?
							<br />
							<br />
							<span className="text-destructive font-medium">
								⚠️ Cette action est irréversible
							</span>
							<br />
							<br />
							La suppression de cette catégorie entraînera également :
							<ul className="list-disc list-inside mt-2 space-y-1">
								<li>La suppression de toutes les sessions associées</li>
								<li>La perte de tous les participants inscrits</li>
								<li>La suppression de l'historique des activités</li>
							</ul>
							<br />
							Toutes ces données seront définitivement perdues et ne pourront
							pas être récupérées.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeleteCategory}
							disabled={isDeleting}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							{isDeleting ? "Suppression..." : "Supprimer définitivement"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}

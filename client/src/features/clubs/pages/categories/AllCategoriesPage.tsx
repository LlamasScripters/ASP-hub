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
import { Skeleton } from "@/components/ui/skeleton";
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
	Calendar,
	Edit,
	FolderOpen,
	Plus,
	Tag,
	Trash2,
	User,
	Users,
} from "lucide-react";
import { useState } from "react";
import { useSectionsByClub } from "../../hooks/useSections";
import { useCategories, useDeleteCategory } from "../../hooks/useCategories";
import { SectionSelectionModal } from "../../components/categories/SectionSelectionModal";
import type { Category } from "../../types";

interface EnrichedCategory extends Category {
	sectionName?: string;
	sectionColor?: string;
}

export function AllCategoriesPage() {
	const { clubId } = useParams({
		from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/categories/",
	});

	// Hooks pour récupérer les données
	const { data: sectionsResponse, isLoading: isLoadingSections } = useSectionsByClub(clubId);
	const sections = sectionsResponse?.data || [];

	const { data: categoriesResponse, isLoading: isLoadingCategories } = useCategories();
	const categories = categoriesResponse?.data || [];

	const { mutateAsync: deleteCategory } = useDeleteCategory();

	const [showSectionModal, setShowSectionModal] = useState(false);
	const [deleteCategoryState, setDeleteCategoryState] = useState<EnrichedCategory | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);

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

	const getAgeRangeText = (ageMin?: number, ageMax?: number) => {
		if (ageMin && ageMax) return `${ageMin}-${ageMax} ans`;
		if (ageMin) return `${ageMin}+ ans`;
		if (ageMax) return `≤ ${ageMax} ans`;
		return "Non défini";
	};

	const sectionsCount = sections.length;
	const categoriesWithCoach = categories.filter(cat => cat.coach?.firstName && cat.coach?.lastName).length;
	const avgAge = categories.length > 0 
		? Math.round(categories
			.filter(cat => cat.ageMin && cat.ageMax)
			.reduce((sum, cat) => sum + (((cat.ageMin || 0) + (cat.ageMax || 0)) / 2), 0) / 
			categories.filter(cat => cat.ageMin && cat.ageMax).length || 0)
		: 0;

	if (isLoadingSections || isLoadingCategories) {
		return (
			<div className="container mx-auto p-4 sm:p-6 space-y-8 max-w-7xl">
				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<div className="space-y-2">
							<Skeleton className="h-10 w-80" />
							<Skeleton className="h-4 w-96" />
						</div>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
						{Array.from({ length: 5 }).map(() => (
							<Skeleton key={crypto.randomUUID()} className="h-20" />
						))}
					</div>
					<Card>
						<CardHeader>
							<Skeleton className="h-6 w-48" />
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{Array.from({ length: 8 }).map(() => (
									<Skeleton key={crypto.randomUUID()} className="h-12 w-full" />
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4 sm:p-6 space-y-8 max-w-7xl">
			<div className="space-y-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div className="space-y-2">
						<div className="flex items-center gap-3">
							<Link
								to="/admin/dashboard/clubs/$clubId"
								params={{ clubId }}
								className="text-muted-foreground hover:text-foreground transition-colors"
							>
								<ArrowLeft className="h-6 w-6" />
							</Link>
							<h1 className="text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-3">
								<Users className="h-8 w-8 text-primary" />
								Toutes les catégories
							</h1>
						</div>
						<p className="text-lg text-muted-foreground">
							Vue d'ensemble de toutes les catégories d'âge du club
						</p>
					</div>
					<Button
						onClick={() => setShowSectionModal(true)}
						size="lg"
						className="w-full sm:w-auto cursor-pointer hover:cursor-pointer"
					>
						<Plus className="mr-2 h-5 w-5" />
						Ajouter une catégorie
					</Button>
				</div>

				{/* Statistiques rapides */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
					<Card className="bg-primary/5 border-primary/20">
						<CardContent className="p-4">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-primary/10 rounded-lg">
									<Users className="h-5 w-5 text-primary" />
								</div>
								<div>
									<p className="text-sm font-medium text-muted-foreground">
										Total catégories
									</p>
									<p className="text-2xl font-bold">{categories.length}</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800">
						<CardContent className="p-4">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
									<FolderOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
								</div>
								<div>
									<p className="text-sm font-medium text-muted-foreground">
										Sections
									</p>
									<p className="text-2xl font-bold">{sectionsCount}</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800">
						<CardContent className="p-4">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
									<User className="h-5 w-5 text-green-600 dark:text-green-400" />
								</div>
								<div>
									<p className="text-sm font-medium text-muted-foreground">
										Avec coach
									</p>
									<p className="text-2xl font-bold">{categoriesWithCoach}</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-800">
						<CardContent className="p-4">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
									<Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
								</div>
								<div>
									<p className="text-sm font-medium text-muted-foreground">
										Âge moyen
									</p>
									<p className="text-2xl font-bold">
										{avgAge > 0 ? `${avgAge} ans` : "N/A"}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="bg-purple-50 border-purple-200 dark:bg-purple-950/20 dark:border-purple-800">
						<CardContent className="p-4">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
									<Tag className="h-5 w-5 text-purple-600 dark:text-purple-400" />
								</div>
								<div>
									<p className="text-sm font-medium text-muted-foreground">
										Avec âge défini
									</p>
									<p className="text-2xl font-bold">
										{
											categories.filter((cat) => cat.ageMin || cat.ageMax)
												.length
										}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Table des catégories */}
				{categories.length === 0 ? (
					<Card className="border-dashed border-2 border-muted-foreground/25">
						<CardContent className="flex flex-col items-center justify-center py-16 text-center">
							<div className="p-4 bg-muted/30 rounded-full mb-4">
								<Users className="h-12 w-12 text-muted-foreground" />
							</div>
							<h3 className="text-xl font-semibold mb-2">
								Aucune catégorie créée
							</h3>
							<p className="text-muted-foreground mb-6 max-w-md">
								Les catégories apparaîtront ici une fois qu'elles seront créées
								dans les sections.
							</p>
							<div className="flex flex-col sm:flex-row gap-3">
								<Button
									onClick={() => setShowSectionModal(true)}
									className="cursor-pointer hover:cursor-pointer"
									size="lg"
								>
									<Plus className="mr-2 h-5 w-5" />
									Créer une catégorie
								</Button>
								<Button variant="outline" size="lg" asChild>
									<Link
										to="/admin/dashboard/clubs/$clubId/sections"
										params={{ clubId }}
									>
										<FolderOpen className="mr-2 h-5 w-5" />
										Voir les sections
									</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				) : (
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Users className="h-5 w-5" />
								Liste des catégories ({categories.length})
							</CardTitle>
							<CardDescription>
								Toutes les catégories d'âge organisées par section
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="rounded-md border">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead className="font-semibold">Nom</TableHead>
											<TableHead className="font-semibold">Section</TableHead>
											<TableHead className="font-semibold">Coach</TableHead>
											<TableHead className="font-semibold">
												Tranche d'âge
											</TableHead>
											<TableHead className="font-semibold">
												Description
											</TableHead>
											<TableHead className="font-semibold text-right">
												Actions
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{categories.map((cat) => (
											<TableRow
												key={cat.id}
												className="hover:bg-muted/30 transition-colors"
											>
												<TableCell className="font-medium">
													<div className="flex items-center gap-2">
														<Users className="h-4 w-4 text-muted-foreground" />
														{cat.name}
													</div>
												</TableCell>
												<TableCell>
													<div className="flex items-center gap-2">
														<div
															className="w-3 h-3 rounded-full border border-primary/20"
															style={{
																backgroundColor: cat.section.color || "#3b82f6",
															}}
														/>
														<Badge variant="secondary" className="text-xs">
															{cat.section.name}
														</Badge>
													</div>
												</TableCell>
												<TableCell>
													{cat.coach?.firstName && cat.coach?.lastName ? (
														<div className="flex items-center gap-2">
															<User className="h-4 w-4 text-muted-foreground" />
															<div className="flex flex-col">
																<span className="text-sm font-medium">
																	{cat.coach.firstName} {cat.coach.lastName}
																</span>
																<span className="text-xs text-muted-foreground">
																	{cat.coach.email}
																</span>
															</div>
														</div>
													) : (
														<div className="flex items-center gap-2 text-muted-foreground">
															<User className="h-4 w-4" />
															<span className="text-sm">Aucun coach</span>
														</div>
													)}
												</TableCell>
												<TableCell>
													<Badge variant="outline" className="text-xs">
														{getAgeRangeText(cat.ageMin, cat.ageMax)}
													</Badge>
												</TableCell>
												<TableCell className="max-w-xs">
													<p className="text-sm text-muted-foreground line-clamp-2">
														{cat.description || "Aucune description"}
													</p>
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
																	sectionId: cat.sectionId,
																	categoryId: cat.id,
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
															onClick={() => setDeleteCategoryState(cat)}
														>
															<Trash2 className="mr-1 h-3 w-3" />
															Supprimer
														</Button>
													</div>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</CardContent>
					</Card>
				)}
			</div>

			{/* Modal de sélection de section */}
			<SectionSelectionModal
				isOpen={showSectionModal}
				onClose={() => setShowSectionModal(false)}
				clubId={clubId}
			/>

			{/* Modal de confirmation de suppression */}
			<AlertDialog
				open={!!deleteCategoryState}
				onOpenChange={() => setDeleteCategoryState(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Supprimer la catégorie</AlertDialogTitle>
						<AlertDialogDescription>
							Êtes-vous sûr de vouloir supprimer la catégorie "
							{deleteCategoryState?.name}" ? Cette action est irréversible et
							supprimera également toutes les sessions associées.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeleteCategory}
							disabled={isDeleting}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							{isDeleting ? "Suppression..." : "Supprimer"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}

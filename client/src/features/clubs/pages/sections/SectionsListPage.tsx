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
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
	ArrowLeft,
	Calendar,
	Edit,
	Eye,
	FolderOpen,
	Plus,
	Trash2,
	User,
	Users,
} from "lucide-react";
import { useState } from "react";
import { useSectionsByClub, useDeleteSection } from "../../hooks/useSections";
import type { Section } from "../../types";

export function SectionsListPage() {
	const { clubId } = useParams({
		from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/",
	});
	const navigate = useNavigate();
	
	// Utilisation des hooks
	const { data: sections = [], isLoading } = useSectionsByClub(clubId);
	const deleteSectionMutation = useDeleteSection();
	
	const [deleteSection, setDeleteSection] = useState<Section | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);

	const handleGoBack = () => {
		navigate({ to: ".." });
	};

	const handleDeleteSection = async () => {
		if (!deleteSection) return;

		setIsDeleting(true);
		try {
			await deleteSectionMutation.mutateAsync(deleteSection.id);
			setDeleteSection(null);
		} catch (error) {
			console.error("Erreur lors de la suppression:", error);
		} finally {
			setIsDeleting(false);
		}
	};

	if (isLoading) {
		return (
			<div className="container mx-auto p-4 sm:p-6 space-y-8 max-w-7xl">
				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<div className="space-y-2">
							<Skeleton className="h-10 w-64" />
							<Skeleton className="h-4 w-96" />
						</div>
						<Skeleton className="h-10 w-40" />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{Array.from({ length: 6 }).map(() => (
							<Card key={crypto.randomUUID()}>
								<CardHeader>
									<Skeleton className="h-6 w-32" />
									<Skeleton className="h-4 w-48" />
								</CardHeader>
								<CardContent className="space-y-3">
									<Skeleton className="h-10 w-full" />
									<Skeleton className="h-10 w-full" />
									<Skeleton className="h-10 w-full" />
								</CardContent>
							</Card>
						))}
					</div>
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
							<button
								type="button"
								onClick={handleGoBack}
								className="text-muted-foreground hover:text-foreground transition-colors"
							>
								<ArrowLeft className="h-6 w-6" />
							</button>
							<h1 className="text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-3">
								<FolderOpen className="h-8 w-8 text-primary" />
								Sections du club
							</h1>
						</div>
						<p className="text-lg text-muted-foreground">
							Gérez et organisez les sections sportives de votre club
						</p>
					</div>
					<Button size="lg" className="flex items-center gap-2" asChild>
						<Link
							to="/admin/dashboard/clubs/$clubId/sections/create"
							params={{ clubId }}
						>
							<Plus className="h-5 w-5" />
							Créer une section
						</Link>
					</Button>
				</div>

				{/* Statistiques rapides */}
				{sections.length > 0 && (
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						<Card className="bg-primary/5 border-primary/20">
							<CardContent className="p-4">
								<div className="flex items-center gap-3">
									<div className="p-2 bg-primary/10 rounded-lg">
										<FolderOpen className="h-5 w-5 text-primary" />
									</div>
									<div>
										<p className="text-sm font-medium text-muted-foreground">
											Total sections
										</p>
										<p className="text-2xl font-bold">{sections.length}</p>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card className="bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800">
							<CardContent className="p-4">
								<div className="flex items-center gap-3">
									<div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
										<Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
									</div>
									<div>
										<p className="text-sm font-medium text-muted-foreground">
											Total catégories
										</p>
										<p className="text-2xl font-bold">-</p>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card className="bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800">
							<CardContent className="p-4">
								<div className="flex items-center gap-3">
									<div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
										<Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
									</div>
									<div>
										<p className="text-sm font-medium text-muted-foreground">
											Sections actives
										</p>
										<p className="text-2xl font-bold">{sections.length}</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				)}

				{/* Sections Grid */}
				{sections.length === 0 ? (
					<Card className="border-dashed border-2 border-muted-foreground/25">
						<CardContent className="flex flex-col items-center justify-center py-16 text-center">
							<div className="p-4 bg-muted/30 rounded-full mb-4">
								<FolderOpen className="h-12 w-12 text-muted-foreground" />
							</div>
							<h3 className="text-xl font-semibold mb-2">
								Aucune section créée
							</h3>
							<p className="text-muted-foreground mb-6 max-w-md">
								Commencez par créer votre première section pour organiser les
								activités sportives de votre club.
							</p>
							<Button size="lg" asChild>
								<Link
									to="/admin/dashboard/clubs/$clubId/sections/create"
									params={{ clubId }}
								>
									<Plus className="mr-2 h-5 w-5" />
									Créer votre première section
								</Link>
							</Button>
						</CardContent>
					</Card>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{sections.map((section) => (
							<Card
								key={section.id}
								className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 bg-gradient-to-br from-background to-muted/20"
							>
								<CardHeader className="space-y-4 pb-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<div className="relative">
												<div
													className="w-5 h-5 rounded-full border-2 border-primary/30 shadow-sm ring-2 ring-background"
													style={{
														backgroundColor: section.color || "#3b82f6",
													}}
												/>
												<div
													className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full opacity-60 animate-pulse"
													style={{
														backgroundColor: section.color || "#3b82f6",
													}}
												/>
											</div>
											<Badge
												variant="secondary"
												className="text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary border-primary/20"
											>
												Section
											</Badge>
										</div>
										{(() => {
											const categoryCount = 0; // Sera implémenté plus tard
											return (
												<Badge
													variant="outline"
													className={`text-xs font-medium px-2.5 py-1 transition-colors ${
														categoryCount > 0
															? "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20 dark:border-green-800 dark:text-green-400"
															: "bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-950/20 dark:border-orange-800 dark:text-orange-400"
													}`}
												>
													{categoryCount} catégorie
													{categoryCount > 1 ? "s" : ""}
												</Badge>
											);
										})()}
									</div>
									<div className="space-y-2">
										<CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-200 leading-tight">
											{section.name}
										</CardTitle>
										<CardDescription className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed">
											{section.description || "Aucune description disponible"}
										</CardDescription>
										{/* Responsable de section */}
										{section.managerFirstName && section.managerLastName ? (
											<div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
												<User className="h-3 w-3" />
												<span>
													Responsable: {section.managerFirstName}{" "}
													{section.managerLastName}
												</span>
											</div>
										) : (
											<div className="flex items-center gap-2 text-xs text-muted-foreground/60 mt-2">
												<User className="h-3 w-3" />
												<span>Aucun responsable assigné</span>
											</div>
										)}
									</div>
								</CardHeader>

								<CardContent className="space-y-2 pt-0">
									<Button
										variant="outline"
										size="sm"
										className="w-full justify-start h-10 hover:bg-primary/10 hover:border-primary/30 hover:text-primary group transition-all duration-200 font-medium"
										asChild
									>
										<Link
											to="/admin/dashboard/clubs/$clubId/sections/$sectionId/categories"
											params={{ clubId, sectionId: section.id }}
											className="block"
										>
											<Eye className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
											Voir les catégories
										</Link>
									</Button>

									<Button
										variant="outline"
										size="sm"
										className="w-full justify-start h-10 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 dark:hover:bg-blue-950/20 dark:hover:border-blue-700 group transition-all duration-200 font-medium"
										asChild
									>
										<Link
											to="/admin/dashboard/clubs/$clubId/sections/$sectionId/sessions"
											params={{ clubId, sectionId: section.id }}
											className="block"
										>
											<Calendar className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
											Gérer les sessions
										</Link>
									</Button>

									<div className="flex gap-2 pt-1">
										<Button
											variant="ghost"
											size="sm"
											className="flex-1 justify-start h-9 hover:bg-destructive/10 text-muted-foreground hover:text-destructive group transition-all duration-200"
											asChild
										>
											<Link
												to="/admin/dashboard/clubs/$clubId/sections/$sectionId/edit"
												params={{ clubId, sectionId: section.id }}
												className="block"
											>
												<Edit className="mr-2 h-3.5 w-3.5 group-hover:scale-110 transition-transform duration-200" />
												Modifier
											</Link>
										</Button>

										<Button
											variant="ghost"
											size="sm"
											className="flex-1 justify-start h-9 hover:bg-destructive/10 hover:cursor-pointer text-muted-foreground hover:text-destructive group transition-all duration-200"
											onClick={() => setDeleteSection(section)}
										>
											<Trash2 className="mr-2 h-3.5 w-3.5 group-hover:scale-110 transition-transform duration-200" />
											Supprimer
										</Button>
									</div>
								</CardContent>

								{/* Subtle gradient overlay on hover */}
								<div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
							</Card>
						))}
					</div>
				)}
			</div>

			{/* Modal de confirmation de suppression */}
			<AlertDialog
				open={!!deleteSection}
				onOpenChange={() => setDeleteSection(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Supprimer la section</AlertDialogTitle>
						<AlertDialogDescription>
							Êtes-vous sûr de vouloir supprimer la section{" "}
							<strong>"{deleteSection?.name}"</strong> ?
							<br />
							<br />
							<span className="text-destructive font-medium">
								⚠️ Cette action est irréversible
							</span>
							<br />
							<br />
							La suppression de cette section entraînera également :
							<ul className="list-disc list-inside mt-2 space-y-1">
								<li>
									La suppression de toutes les catégories de cette section
								</li>
								<li>La suppression de toutes les sessions associées</li>
								<li>La perte de tous les participants inscrits</li>
								<li>La suppression de l'historique complet des activités</li>
								<li>La perte de toutes les données statistiques</li>
							</ul>
							<br />
							Toutes ces données seront définitivement perdues et ne pourront
							pas être récupérées.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeleteSection}
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

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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
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
	ChevronDown,
	ChevronUp,
	Clock,
	Edit,
	Filter,
	MapPin,
	Search,
	Trash2,
	Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { Category, Section, SessionSport } from "../../types";

type SortField =
	| "title"
	| "sectionName"
	| "categoryName"
	| "type"
	| "status"
	| "startDate";
type SortDirection = "asc" | "desc";

interface Filters {
	title: string;
	sectionName: string;
	categoryName: string;
	type: string;
	status: string;
}

interface EnrichedSession extends Omit<SessionSport, "categoryId"> {
	categoryName?: string;
	sectionName?: string;
	categoryId?: string;
	sectionId?: string;
}

export function AllClubSessionsPage() {
	const { clubId } = useParams({
		from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sessions/",
	});
	const [sessions, setSessions] = useState<EnrichedSession[]>([]);
	const [, setSections] = useState<Section[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [sortField, setSortField] = useState<SortField>("startDate");
	const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
	const [filters, setFilters] = useState<Filters>({
		title: "",
		sectionName: "",
		categoryName: "",
		type: "all",
		status: "all",
	});
	const [deleteSession, setDeleteSession] = useState<EnrichedSession | null>(
		null,
	);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const fetchSessions = async () => {
			try {
				const sectionsData: Section[] = await fetch(
					`/api/clubs/${clubId}/sections`,
				).then((res) => {
					if (!res.ok)
						throw new Error("Erreur lors du chargement des sections");
					return res.json();
				});
				setSections(sectionsData);

				const result: EnrichedSession[] = [];

				for (const section of sectionsData) {
					const categories: Category[] = await fetch(
						`/api/clubs/${clubId}/sections/${section.id}/categories`,
					).then((res) => {
						if (!res.ok)
							throw new Error("Erreur lors du chargement des catégories");
						return res.json();
					});

					for (const cat of categories) {
						const catSessions: SessionSport[] = await fetch(
							`/api/clubs/${clubId}/sections/${section.id}/categories/${cat.id}/sessions`,
						).then((res) => {
							if (!res.ok)
								throw new Error("Erreur lors du chargement des sessions");
							return res.json();
						});
						result.push(
							...catSessions.map((s) => ({
								...s,
								categoryName: cat.name,
								sectionName: section.name,
								categoryId: cat.id,
								sectionId: section.id,
							})),
						);
					}
				}

				setSessions(result);
			} catch (error) {
				console.error("Erreur:", error);
				toast.error("Erreur lors du chargement des sessions");
			} finally {
				setIsLoading(false);
			}
		};

		fetchSessions();
	}, [clubId]);

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

	const getStatusBadge = (status: string) => {
		const variants = {
			planifie: "default",
			en_cours: "secondary",
			termine: "outline",
			annule: "destructive",
		} as const;

		const labels = {
			planifie: "Planifié",
			en_cours: "En cours",
			termine: "Terminé",
			annule: "Annulé",
		} as const;

		return (
			<Badge variant={variants[status as keyof typeof variants] || "default"}>
				{labels[status as keyof typeof labels] || status}
			</Badge>
		);
	};

	const getTypeBadge = (type: string) => {
		const variants = {
			entrainement: "default",
			match: "secondary",
			stage: "outline",
			competition: "destructive",
			autre: "outline",
		} as const;

		const labels = {
			entrainement: "Entraînement",
			match: "Match",
			stage: "Stage",
			competition: "Compétition",
			autre: "Autre",
		} as const;

		return (
			<Badge variant={variants[type as keyof typeof variants] || "default"}>
				{labels[type as keyof typeof labels] || type}
			</Badge>
		);
	};

	const filteredAndSortedSessions = useMemo(() => {
		const filtered = sessions.filter((session) => {
			const titleMatch = session.title
				.toLowerCase()
				.includes(filters.title.toLowerCase());
			const sectionMatch =
				filters.sectionName === "" ||
				session.sectionName
					?.toLowerCase()
					.includes(filters.sectionName.toLowerCase());
			const categoryMatch =
				filters.categoryName === "" ||
				session.categoryName
					?.toLowerCase()
					.includes(filters.categoryName.toLowerCase());
			const typeMatch =
				filters.type === "" ||
				filters.type === "all" ||
				session.type === filters.type;
			const statusMatch =
				filters.status === "" ||
				filters.status === "all" ||
				session.status === filters.status;

			return (
				titleMatch && sectionMatch && categoryMatch && typeMatch && statusMatch
			);
		});

		// Sort
		filtered.sort((a, b) => {
			let aValue: string | number | Date;
			let bValue: string | number | Date;

			switch (sortField) {
				case "title":
					aValue = a.title.toLowerCase();
					bValue = b.title.toLowerCase();
					break;
				case "sectionName":
					aValue = (a.sectionName || "").toLowerCase();
					bValue = (b.sectionName || "").toLowerCase();
					break;
				case "categoryName":
					aValue = (a.categoryName || "").toLowerCase();
					bValue = (b.categoryName || "").toLowerCase();
					break;
				case "type":
					aValue = a.type;
					bValue = b.type;
					break;
				case "status":
					aValue = a.status;
					bValue = b.status;
					break;
				case "startDate":
					aValue = new Date(a.startDate);
					bValue = new Date(b.startDate);
					break;
				default:
					return 0;
			}

			if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
			if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
			return 0;
		});

		return filtered;
	}, [sessions, filters, sortField, sortDirection]);

	const clearFilters = () => {
		setFilters({
			title: "",
			sectionName: "",
			categoryName: "",
			type: "all",
			status: "all",
		});
	};

	const handleDeleteSession = async () => {
		if (!deleteSession) return;

		setIsDeleting(true);
		try {
			const response = await fetch(`/api/clubs/sessions/${deleteSession.id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error("Erreur lors de la suppression");
			}

			// Retirer la session de la liste
			setSessions((prev) =>
				prev.filter((session) => session.id !== deleteSession.id),
			);
			setDeleteSession(null);
			toast.success("Session supprimée avec succès");
		} catch (error) {
			console.error("Erreur lors de la suppression:", error);
			toast.error("Erreur lors de la suppression de la session");
		} finally {
			setIsDeleting(false);
		}
	};

	const uniqueTypes = [...new Set(sessions.map((s) => s.type))];
	const uniqueStatuses = [...new Set(sessions.map((s) => s.status))];
	// const uniqueSections = [...new Set(sessions.map(s => s.sectionName).filter(Boolean))];

	// Statistiques
	const totalSessions = sessions.length;
	const upcomingSessions = sessions.filter(
		(s) => new Date(s.startDate) > new Date() && s.status === "planifie",
	).length;
	const activeSessions = sessions.filter((s) => s.status === "en_cours").length;
	const completedSessions = sessions.filter(
		(s) => s.status === "termine",
	).length;

	if (isLoading) {
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
						{Array.from({ length: 4 }).map((_, i) => (
							<Skeleton key={i} className="h-20" />
						))}
					</div>
					<Card>
						<CardHeader>
							<Skeleton className="h-6 w-48" />
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{Array.from({ length: 8 }).map((_, i) => (
									<Skeleton key={i} className="h-12 w-full" />
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
								<Calendar className="h-8 w-8 text-primary" />
								Toutes les sessions
							</h1>
						</div>
						<p className="text-lg text-muted-foreground">
							Vue d'ensemble de toutes les sessions du club
						</p>
					</div>
				</div>

				{/* Statistiques rapides */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<Card className="bg-primary/5 border-primary/20">
						<CardContent className="p-4">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-primary/10 rounded-lg">
									<Calendar className="h-5 w-5 text-primary" />
								</div>
								<div>
									<p className="text-sm font-medium text-muted-foreground">
										Total sessions
									</p>
									<p className="text-2xl font-bold">{totalSessions}</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800">
						<CardContent className="p-4">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
									<Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
								</div>
								<div>
									<p className="text-sm font-medium text-muted-foreground">
										À venir
									</p>
									<p className="text-2xl font-bold">{upcomingSessions}</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800">
						<CardContent className="p-4">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
									<Users className="h-5 w-5 text-green-600 dark:text-green-400" />
								</div>
								<div>
									<p className="text-sm font-medium text-muted-foreground">
										En cours
									</p>
									<p className="text-2xl font-bold">{activeSessions}</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-800">
						<CardContent className="p-4">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
									<MapPin className="h-5 w-5 text-orange-600 dark:text-orange-400" />
								</div>
								<div>
									<p className="text-sm font-medium text-muted-foreground">
										Terminées
									</p>
									<p className="text-2xl font-bold">{completedSessions}</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Table des sessions */}
				{sessions.length === 0 ? (
					<Card className="border-dashed border-2 border-muted-foreground/25">
						<CardContent className="flex flex-col items-center justify-center py-16 text-center">
							<div className="p-4 bg-muted/30 rounded-full mb-4">
								<Calendar className="h-12 w-12 text-muted-foreground" />
							</div>
							<h3 className="text-xl font-semibold mb-2">
								Aucune session trouvée
							</h3>
							<p className="text-muted-foreground mb-6 max-w-md">
								Les sessions apparaîtront ici une fois qu'elles seront créées
								dans les catégories.
							</p>
							<Link
								to="/admin/dashboard/clubs/$clubId/sections"
								params={{ clubId }}
							>
								<Button size="lg">
									<Users className="mr-2 h-5 w-5" />
									Voir les sections
								</Button>
							</Link>
						</CardContent>
					</Card>
				) : (
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Calendar className="h-5 w-5" />
								Liste des sessions ({filteredAndSortedSessions.length})
							</CardTitle>
							<CardDescription>
								{filteredAndSortedSessions.length} session
								{filteredAndSortedSessions.length > 1 ? "s" : ""} affichée
								{filteredAndSortedSessions.length > 1 ? "s" : ""} sur{" "}
								{sessions.length} au total
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
									<Button variant="outline" size="sm" onClick={clearFilters}>
										<Filter className="mr-2 h-4 w-4" />
										Effacer les filtres
									</Button>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
									<div className="space-y-2">
										<label className="text-xs font-medium text-muted-foreground">
											Titre
										</label>
										<Input
											placeholder="Rechercher par titre..."
											value={filters.title}
											onChange={(e) =>
												handleFilterChange("title", e.target.value)
											}
											className="h-8"
										/>
									</div>
									<div className="space-y-2">
										<label className="text-xs font-medium text-muted-foreground">
											Section
										</label>
										<Input
											placeholder="Filtrer par section..."
											value={filters.sectionName}
											onChange={(e) =>
												handleFilterChange("sectionName", e.target.value)
											}
											className="h-8"
										/>
									</div>
									<div className="space-y-2">
										<label className="text-xs font-medium text-muted-foreground">
											Catégorie
										</label>
										<Input
											placeholder="Filtrer par catégorie..."
											value={filters.categoryName}
											onChange={(e) =>
												handleFilterChange("categoryName", e.target.value)
											}
											className="h-8"
										/>
									</div>
									<div className="space-y-2">
										<label className="text-xs font-medium text-muted-foreground">
											Type
										</label>
										<Select
											value={filters.type}
											onValueChange={(value) =>
												handleFilterChange("type", value)
											}
										>
											<SelectTrigger className="h-8">
												<SelectValue placeholder="Tous les types" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="all">Tous les types</SelectItem>
												{uniqueTypes.map((type) => (
													<SelectItem key={type} value={type}>
														{type === "entrainement"
															? "Entraînement"
															: type === "match"
																? "Match"
																: type === "stage"
																	? "Stage"
																	: type === "competition"
																		? "Compétition"
																		: "Autre"}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<label className="text-xs font-medium text-muted-foreground">
											Statut
										</label>
										<Select
											value={filters.status}
											onValueChange={(value) =>
												handleFilterChange("status", value)
											}
										>
											<SelectTrigger className="h-8">
												<SelectValue placeholder="Tous les statuts" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="all">Tous les statuts</SelectItem>
												{uniqueStatuses.map((status) => (
													<SelectItem key={status} value={status}>
														{status === "planifie"
															? "Planifié"
															: status === "en_cours"
																? "En cours"
																: status === "termine"
																	? "Terminé"
																	: "Annulé"}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>

							<div className="rounded-md border">
								<Table>
									<TableHeader>
										<TableRow className="hover:bg-transparent">
											<TableHead
												className="font-semibold cursor-pointer hover:bg-muted/50 transition-colors"
												onClick={() => handleSort("title")}
											>
												<div className="flex items-center">
													Titre
													{getSortIcon("title")}
												</div>
											</TableHead>
											<TableHead
												className="font-semibold cursor-pointer hover:bg-muted/50 transition-colors"
												onClick={() => handleSort("sectionName")}
											>
												<div className="flex items-center">
													Section
													{getSortIcon("sectionName")}
												</div>
											</TableHead>
											<TableHead
												className="font-semibold cursor-pointer hover:bg-muted/50 transition-colors"
												onClick={() => handleSort("categoryName")}
											>
												<div className="flex items-center">
													Catégorie
													{getSortIcon("categoryName")}
												</div>
											</TableHead>
											<TableHead
												className="font-semibold cursor-pointer hover:bg-muted/50 transition-colors"
												onClick={() => handleSort("type")}
											>
												<div className="flex items-center">
													Type
													{getSortIcon("type")}
												</div>
											</TableHead>
											<TableHead
												className="font-semibold cursor-pointer hover:bg-muted/50 transition-colors"
												onClick={() => handleSort("status")}
											>
												<div className="flex items-center">
													Statut
													{getSortIcon("status")}
												</div>
											</TableHead>
											<TableHead
												className="font-semibold cursor-pointer hover:bg-muted/50 transition-colors"
												onClick={() => handleSort("startDate")}
											>
												<div className="flex items-center">
													Date
													{getSortIcon("startDate")}
												</div>
											</TableHead>
											<TableHead className="font-semibold text-right">
												Actions
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{filteredAndSortedSessions.length === 0 ? (
											<TableRow>
												<TableCell
													colSpan={7}
													className="h-24 text-center text-muted-foreground"
												>
													{sessions.length === 0
														? "Aucune session trouvée. Créez votre première session !"
														: "Aucune session ne correspond aux filtres appliqués."}
												</TableCell>
											</TableRow>
										) : (
											filteredAndSortedSessions.map((s) => (
												<TableRow
													key={s.id}
													className="hover:bg-muted/50 transition-colors"
												>
													<TableCell className="font-medium">
														{s.title}
													</TableCell>
													<TableCell>
														<Badge variant="secondary" className="text-xs">
															{s.sectionName}
														</Badge>
													</TableCell>
													<TableCell>
														<Badge variant="outline" className="text-xs">
															{s.categoryName}
														</Badge>
													</TableCell>
													<TableCell>{getTypeBadge(s.type)}</TableCell>
													<TableCell>{getStatusBadge(s.status)}</TableCell>
													<TableCell className="font-mono text-sm">
														<div className="space-y-1">
															<div>
																{new Date(s.startDate).toLocaleDateString(
																	"fr-FR",
																	{
																		day: "2-digit",
																		month: "2-digit",
																		year: "numeric",
																	},
																)}{" "}
																à{" "}
																{new Date(s.startDate).toLocaleTimeString(
																	"fr-FR",
																	{
																		hour: "2-digit",
																		minute: "2-digit",
																	},
																)}
															</div>
															<div className="text-xs text-muted-foreground">
																→{" "}
																{new Date(s.endDate).toLocaleDateString(
																	"fr-FR",
																	{
																		day: "2-digit",
																		month: "2-digit",
																		year: "numeric",
																	},
																)}{" "}
																à{" "}
																{new Date(s.endDate).toLocaleTimeString(
																	"fr-FR",
																	{
																		hour: "2-digit",
																		minute: "2-digit",
																	},
																)}
															</div>
														</div>
													</TableCell>
													<TableCell className="text-right">
														<div className="flex items-center justify-end gap-2">
															<Link
																to="/admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/$sessionId/edit"
																params={{
																	clubId,
																	sectionId: s.sectionId!,
																	categoryId: s.categoryId!,
																	sessionId: s.id,
																}}
															>
																<Button
																	variant="ghost"
																	size="sm"
																	className="h-8 px-3 hover:bg-primary/10 hover:text-primary"
																>
																	<Edit className="mr-1 h-3 w-3" />
																	Modifier
																</Button>
															</Link>
															<Button
																variant="ghost"
																size="sm"
																className="h-8 px-3 hover:bg-destructive/10 hover:text-destructive"
																onClick={() => setDeleteSession(s)}
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
				)}
			</div>

			{/* Modal de confirmation de suppression */}
			<AlertDialog
				open={!!deleteSession}
				onOpenChange={() => setDeleteSession(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Supprimer la session</AlertDialogTitle>
						<AlertDialogDescription>
							Êtes-vous sûr de vouloir supprimer la session{" "}
							<strong>"{deleteSession?.title}"</strong> ?
							<br />
							<br />
							<span className="text-destructive font-medium">
								⚠️ Cette action est irréversible
							</span>
							<br />
							<br />
							La suppression de cette session entraînera également :
							<ul className="list-disc list-inside mt-2 space-y-1">
								<li>
									La perte de tous les participants inscrits à cette session
								</li>
								<li>La suppression de l'historique des présences</li>
								<li>
									La perte de toutes les données statistiques liées à cette
									session
								</li>
								<li>La suppression des évaluations et commentaires associés</li>
								<li>La perte de tous les documents et fichiers attachés</li>
							</ul>
							<br />
							Toutes ces données seront définitivement perdues et ne pourront
							pas être récupérées.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeleteSession}
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

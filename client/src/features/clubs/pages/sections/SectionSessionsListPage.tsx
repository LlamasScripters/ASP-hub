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
	Calendar,
	ChevronDown,
	ChevronUp,
	ChevronLeft,
	ChevronRight,
	Edit,
	Search,
	Trash2,
	Plus,
	ArrowLeft,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useSessionsBySection, useDeleteSession } from "../../hooks/useSessions";
import { useSection } from "../../hooks/useSections";
import { useCategoriesBySection } from "../../hooks/useCategories";
import type { SessionSport } from "../../types";

type SortField = "title" | "categoryName" | "type" | "status" | "startDate";
type SortDirection = "asc" | "desc";

interface Filters {
	title: string;
	categoryName: string;
	type: string;
	status: string;
}

export function SectionSessionsListPage() {
	const { clubId, sectionId } = useParams({
		from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/sessions/",
	});
	const { data: section, isLoading: sectionLoading } = useSection(sectionId);
	const sectionName = section?.name || "Section inconnue";
	const { data: sessions = [], isLoading: sessionsLoading } = useSessionsBySection(sectionId);
	const { data: categoriesData, isLoading: categoriesLoading } = useCategoriesBySection(sectionId);
	const categories = categoriesData?.data || [];

	const { mutateAsync: deleteSession, status: deleteStatus } = useDeleteSession();
	const isDeleting = deleteStatus === "pending";

	const [sortField, setSortField] = useState<SortField>("startDate");
	const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
	const [filters, setFilters] = useState<Filters>({
		title: "",
		categoryName: "",
		type: "all",
		status: "all",
	});
	const [deleteSessionState, setDeleteSessionState] = useState<SessionSport | null>(null);

	// Pagination state
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const isLoading = sectionLoading || sessionsLoading || categoriesLoading;

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
		setCurrentPage(1); // Reset to first page when filtering
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
			const categoryMatch =
				filters.categoryName === "" ||
				session.category?.name
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

			return titleMatch && categoryMatch && typeMatch && statusMatch;
		});

		filtered.sort((a, b) => {
			let aValue: string | number | Date;
			let bValue: string | number | Date;

			switch (sortField) {
				case "title":
					aValue = a.title.toLowerCase();
					bValue = b.title.toLowerCase();
					break;
				case "categoryName":
					aValue = (a.category?.name || "").toLowerCase();
					bValue = (b.category?.name || "").toLowerCase();
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

	// Pagination logic
	const totalPages = Math.ceil(filteredAndSortedSessions.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedSessions = filteredAndSortedSessions.slice(startIndex, endIndex);

	const clearFilters = () => {
		setFilters({
			title: "",
			categoryName: "",
			type: "all",
			status: "all",
		});
		setCurrentPage(1);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleDeleteSession = async () => {
		if (!deleteSessionState) return;
		try {
			await deleteSession(deleteSessionState.id);
			setDeleteSessionState(null);
		} catch (error) {
			// toast error déjà géré dans le hook
		}
	};

	const uniqueTypes = [...new Set(sessions.map((s) => s.type))];
	const uniqueStatuses = [...new Set(sessions.map((s) => s.status))];

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
							Sessions de la section {sectionName}
						</h1>
						<p className="text-muted-foreground">
							Gérez les sessions de la section{" "}
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
						{categories.length > 0 ? (
							<Button asChild>
								<Link
									to="/admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/create"
									params={{ clubId, sectionId, categoryId: categories[0].id }}
								>
									<Plus className="mr-2 h-4 w-4" />
									Créer une session
								</Link>
							</Button>
						) : (
							<Button variant="outline" asChild>
								<Link
									to="/admin/dashboard/clubs/$clubId/sections/$sectionId/categories/create"
									params={{ clubId, sectionId }}
								>
									<Plus className="mr-2 h-4 w-4" />
									Créer une catégorie
								</Link>
							</Button>
						)}
					</div>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Calendar className="h-5 w-5" />
						Liste des sessions
					</CardTitle>
					<CardDescription>
						Affichage de {filteredAndSortedSessions.length === 0 ? 0 : startIndex + 1} à{" "}
						{Math.min(endIndex, filteredAndSortedSessions.length)} sur{" "}
						{filteredAndSortedSessions.length} session
						{filteredAndSortedSessions.length > 1 ? "s" : ""} filtrée
						{filteredAndSortedSessions.length > 1 ? "s" : ""}
						{filteredAndSortedSessions.length !== sessions.length && (
							<> sur {sessions.length} au total</>
						)}
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
									htmlFor="title"
									className="text-xs font-medium text-muted-foreground"
								>
									Titre de la session
								</label>
								<Input
									id="title"
									placeholder="Rechercher par titre..."
									value={filters.title}
									onChange={(e) => handleFilterChange("title", e.target.value)}
									className="h-8"
								/>
							</div>
							<div className="space-y-2">
								<label
									htmlFor="categoryName"
									className="text-xs font-medium text-muted-foreground"
								>
									Catégorie
								</label>
								<Input
									id="categoryName"
									placeholder="Filtrer par catégorie..."
									value={filters.categoryName}
									onChange={(e) =>
										handleFilterChange("categoryName", e.target.value)
									}
									className="h-8"
								/>
							</div>
							<div className="space-y-2">
								<label
									htmlFor="type"
									className="text-xs font-medium text-muted-foreground"
								>
									Type
								</label>
								<Select
									value={filters.type}
									onValueChange={(value) => handleFilterChange("type", value)}
								>
									<SelectTrigger className="h-8" id="type">
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
								<label
									htmlFor="status"
									className="text-xs font-medium text-muted-foreground"
								>
									Statut
								</label>
								<Select
									value={filters.status}
									onValueChange={(value) => handleFilterChange("status", value)}
								>
									<SelectTrigger className="h-8" id="status">
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
								{paginatedSessions.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={6}
											className="h-24 text-center text-muted-foreground"
										>
											{sessions.length === 0
												? "Aucune session trouvée. Créez votre première session !"
												: "Aucune session ne correspond aux filtres appliqués."}
										</TableCell>
									</TableRow>
								) : (
									paginatedSessions.map((s) => (
										<TableRow
											key={s.id}
											className="hover:bg-muted/50 transition-colors"
										>
											<TableCell className="font-medium text-foreground">
												{s.title}
											</TableCell>
											<TableCell>
												<Badge variant="outline" className="font-medium">
													{s.category?.name}
												</Badge>
											</TableCell>
											<TableCell>{getTypeBadge(s.type)}</TableCell>
											<TableCell>{getStatusBadge(s.status)}</TableCell>
											<TableCell className="font-mono text-sm">
												<div className="space-y-1">
													<div>
														{new Date(s.startDate).toLocaleDateString("fr-FR", {
															day: "2-digit",
															month: "2-digit",
															year: "numeric",
														})}{" "}
														à{" "}
														{new Date(s.startDate).toLocaleTimeString("fr-FR", {
															hour: "2-digit",
															minute: "2-digit",
														})}
													</div>
													<div className="text-xs text-muted-foreground">
														→{" "}
														{new Date(s.endDate).toLocaleDateString("fr-FR", {
															day: "2-digit",
															month: "2-digit",
															year: "numeric",
														})}{" "}
														à{" "}
														{new Date(s.endDate).toLocaleTimeString("fr-FR", {
															hour: "2-digit",
															minute: "2-digit",
														})}
													</div>
												</div>
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
															to="/admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/$sessionId/edit"
															params={{
																clubId,
																sectionId,
																categoryId: s.categoryId,
																sessionId: s.id,
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
														onClick={() => setDeleteSessionState(s)}
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

					{/* Pagination Controls */}
					{filteredAndSortedSessions.length > 0 && (
						<div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
							<div className="flex items-center gap-2">
								<span className="text-sm text-muted-foreground">
									Afficher :
								</span>
								<Select
									value={itemsPerPage.toString()}
									onValueChange={(value) => {
										setItemsPerPage(Number(value));
										setCurrentPage(1);
									}}
								>
									<SelectTrigger className="w-16 h-8">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="5">5</SelectItem>
										<SelectItem value="10">10</SelectItem>
										<SelectItem value="20">20</SelectItem>
										<SelectItem value="50">50</SelectItem>
									</SelectContent>
								</Select>
								<span className="text-sm text-muted-foreground">
									éléments par page
								</span>
							</div>

							<div className="flex items-center gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => handlePageChange(currentPage - 1)}
									disabled={currentPage === 1}
								>
									<ChevronLeft className="h-4 w-4" />
									Précédent
								</Button>

								<div className="flex items-center gap-1">
									{Array.from({ length: totalPages }, (_, i) => i + 1)
										.filter(
											(page) =>
												page === 1 ||
												page === totalPages ||
												Math.abs(page - currentPage) <= 2,
										)
										.map((page, index, array) => (
											<div key={page} className="flex items-center">
												{index > 0 && array[index - 1] !== page - 1 && (
													<span className="px-2 text-muted-foreground">
														...
													</span>
												)}
												<Button
													variant={
														currentPage === page ? "default" : "outline"
													}
													size="sm"
													onClick={() => handlePageChange(page)}
													className="w-8 h-8 p-0"
												>
													{page}
												</Button>
											</div>
										))}
								</div>

								<Button
									variant="outline"
									size="sm"
									onClick={() => handlePageChange(currentPage + 1)}
									disabled={currentPage === totalPages}
								>
									Suivant
									<ChevronRight className="h-4 w-4" />
								</Button>
							</div>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Modal de confirmation de suppression */}
			<AlertDialog
				open={!!deleteSessionState}
				onOpenChange={() => setDeleteSessionState(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Supprimer la session</AlertDialogTitle>
						<AlertDialogDescription>
							Êtes-vous sûr de vouloir supprimer la session{" "}
							<strong>"{deleteSessionState?.title}"</strong> ?
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
};

export default SectionSessionsListPage;
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	CheckCircle,
	Download,
	Eye,
	FileText,
	Filter,
	Loader2,
	MoreHorizontal,
	RefreshCw,
	Search,
	XCircle,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useApplications } from "../hooks/useApplications";
import { useMembershipOptions } from "../hooks/useMembershipOptions";
import type {
	Application,
	ApplicationFilters,
	ReviewApplicationData,
} from "../lib/types";
import {
	applicationStatusTranslations,
	reviewApplicationSchema,
} from "../lib/types";
import {
	exportApplicationsToCSV,
	exportApplicationsToExcel,
} from "../lib/utils/export";

interface ApplicationsListProps {
	initialApplications?: Application[];
}

interface ApplicationDetailsDialogProps {
	application: Application | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onReview: (id: string, data: ReviewApplicationData) => void;
	isReviewing: boolean;
}

function ApplicationDetailsDialog({
	application,
	open,
	onOpenChange,
	onReview,
	isReviewing,
}: ApplicationDetailsDialogProps) {
	const [reviewMode, setReviewMode] = useState(false);

	const form = useForm<ReviewApplicationData>({
		resolver: zodResolver(reviewApplicationSchema),
		defaultValues: {
			decision: "approved",
			comments: "",
		},
	});

	const onSubmit = async (data: ReviewApplicationData) => {
		if (application) {
			try {
				await onReview(application.id, data);
				setReviewMode(false);
				onOpenChange(false);
				form.reset();
			} catch (error) {
				// L'erreur sera gérée par la fonction parent
			}
		}
	};

	if (!application) return null;

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("fr-FR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "pending":
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			case "approved":
				return "bg-green-100 text-green-800 border-green-200";
			case "rejected":
				return "bg-red-100 text-red-800 border-red-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>
						Candidature de {application.user.firstName}{" "}
						{application.user.lastName}
					</DialogTitle>
					<DialogDescription>
						Détails de la candidature d'adhésion soumise le{" "}
						{formatDate(application.createdAt)}
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6">
					{/* Statut */}
					<div className="flex items-center justify-between">
						<Badge className={getStatusColor(application.status)}>
							{applicationStatusTranslations[application.status]}
						</Badge>
						{application.status === "pending" && !reviewMode && (
							<Button onClick={() => setReviewMode(true)} size="sm">
								<FileText className="w-4 h-4 mr-2" />
								Examiner la candidature
							</Button>
						)}
					</div>

					{/* Informations du candidat */}
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">
								Informations du candidat
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<div className="text-sm font-medium text-muted-foreground">
										Nom complet
									</div>
									<p className="font-medium">
										{application.user.firstName} {application.user.lastName}
									</p>
								</div>
								<div>
									<div className="text-sm font-medium text-muted-foreground">
										Email
									</div>
									<p>{application.user.email}</p>
								</div>
								<div>
									<div className="text-sm font-medium text-muted-foreground">
										Date de naissance
									</div>
									<p>
										{application.user.dateOfBirth
											? new Date(
													application.user.dateOfBirth,
												).toLocaleDateString("fr-FR")
											: "Non renseignée"}
									</p>
								</div>
								<div>
									<div className="text-sm font-medium text-muted-foreground">
										Téléphone
									</div>
									<p>{application.user.phone || "Non renseigné"}</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Détails de la candidature */}
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">
								Détails de la candidature
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<div className="text-sm font-medium text-muted-foreground">
										Section
									</div>
									<p>{application.sectionName || "Non spécifiée"}</p>
								</div>
								<div>
									<div className="text-sm font-medium text-muted-foreground">
										Catégorie
									</div>
									<p>{application.categoryName || "Non spécifiée"}</p>
								</div>
							</div>

							<div>
								<div className="text-sm font-medium text-muted-foreground">
									Motivation
								</div>
								<p className="mt-1 text-sm bg-gray-50 p-3 rounded-md">
									{application.motivation}
								</p>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<div className="text-sm font-medium text-muted-foreground">
										Contact d'urgence
									</div>
									<p>{application.emergencyContactName}</p>
									<p className="text-sm text-muted-foreground">
										{application.emergencyContactPhone}
									</p>
								</div>
								<div>
									<div className="text-sm font-medium text-muted-foreground">
										Certificat médical
									</div>
									{application.medicalCertificateUrl ? (
										<a
											href={application.medicalCertificateUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-600 hover:underline text-sm"
										>
											Voir le certificat
										</a>
									) : (
										<p className="text-sm text-muted-foreground">Non fourni</p>
									)}
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Historique de révision */}
					{(application.reviewedAt || application.reviewComments) && (
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">
									Historique de révision
								</CardTitle>
							</CardHeader>
							<CardContent>
								{application.reviewedAt && (
									<p className="text-sm text-muted-foreground">
										Révisé le {formatDate(application.reviewedAt)}
										{application.reviewerName &&
											` par ${application.reviewerName}`}
									</p>
								)}
								{application.reviewComments && (
									<div className="mt-2">
										<div className="text-sm font-medium text-muted-foreground">
											Commentaires
										</div>
										<p className="mt-1 text-sm bg-gray-50 p-3 rounded-md">
											{application.reviewComments}
										</p>
									</div>
								)}
							</CardContent>
						</Card>
					)}

					{/* Formulaire de révision */}
					{reviewMode && application.status === "pending" && (
						<Card className="border-blue-200 bg-blue-50">
							<CardHeader>
								<CardTitle className="text-lg text-blue-900">
									Examiner la candidature
								</CardTitle>
								<CardDescription className="text-blue-700">
									Approuvez ou refusez cette candidature d'adhésion
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-4"
								>
									<div>
										<span className="text-sm font-medium mb-2 block">
											Décision
										</span>
										<Select
											value={form.watch("decision")}
											onValueChange={(value: "approved" | "rejected") =>
												form.setValue("decision", value)
											}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="approved">
													<div className="flex items-center">
														<CheckCircle className="w-4 h-4 mr-2 text-green-600" />
														Approuver
													</div>
												</SelectItem>
												<SelectItem value="rejected">
													<div className="flex items-center">
														<XCircle className="w-4 h-4 mr-2 text-red-600" />
														Refuser
													</div>
												</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div>
										<span className="text-sm font-medium mb-2 block">
											Commentaires{" "}
											<span className="text-muted-foreground">(optionnel)</span>
										</span>
										<Textarea
											{...form.register("comments")}
											placeholder="Ajoutez des commentaires pour le candidat..."
											rows={3}
										/>
									</div>

									<div className="flex justify-end space-x-2">
										<Button
											type="button"
											variant="outline"
											onClick={() => setReviewMode(false)}
										>
											Annuler
										</Button>
										<Button type="submit" disabled={isReviewing}>
											{isReviewing && (
												<Loader2 className="w-4 h-4 mr-2 animate-spin" />
											)}
											Confirmer la décision
										</Button>
									</div>
								</form>
							</CardContent>
						</Card>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}

export function ApplicationsList({
	initialApplications = [],
}: ApplicationsListProps) {
	const [filters, setFilters] = useState<Partial<ApplicationFilters>>({
		status: "pending",
		page: 1,
		limit: 20,
		dateRange: "all",
	});
	const [selectedApplication, setSelectedApplication] =
		useState<Application | null>(null);
	const [detailsOpen, setDetailsOpen] = useState(false);
	const [showFilters, setShowFilters] = useState(false);
	const [selectedApplications, setSelectedApplications] = useState<string[]>(
		[],
	);

	// TODO: Use initialApplications for optimistic updates
	console.log("Initial applications provided:", initialApplications.length);

	const {
		applications,
		total,
		page,
		totalPages,
		isLoading,
		error,
		refetch,
		reviewApplication,
		isReviewing,
	} = useApplications(filters);

	// Fetch membership options for dynamic filters
	const { data: membershipOptions, isLoading: isLoadingOptions } =
		useMembershipOptions();

	const handleSearch = (search: string) => {
		setFilters((prev: Partial<ApplicationFilters>) => ({
			...prev,
			search,
			page: 1,
		}));
	};

	const handleStatusFilter = (status: string) => {
		setFilters((prev: Partial<ApplicationFilters>) => ({
			...prev,
			status:
				status === "all"
					? undefined
					: (status as "pending" | "approved" | "rejected"),
			page: 1,
		}));
	};

	const handleViewDetails = (application: Application) => {
		setSelectedApplication(application);
		setDetailsOpen(true);
	};

	const handleReview = async (id: string, data: ReviewApplicationData) => {
		try {
			await reviewApplication({ id, data });
			toast.success(
				`Candidature ${data.decision === "approved" ? "approuvée" : "refusée"} avec succès`,
				{
					description:
						"La décision a été enregistrée et le candidat sera notifié.",
				},
			);
			refetch(); // Actualiser la liste
		} catch (error) {
			toast.error("Erreur lors de la révision", {
				description:
					"Une erreur est survenue lors de l'enregistrement de la décision.",
			});
		}
	};

	const handleQuickApprove = (application: Application) => {
		if (application.status !== "pending") return;

		if (
			window.confirm(
				`Êtes-vous sûr de vouloir approuver la candidature de ${application.user.firstName} ${application.user.lastName} ?`,
			)
		) {
			handleReview(application.id, {
				decision: "approved",
				comments: "Approuvé rapidement depuis la liste",
			});
		}
	};

	const handleQuickReject = (application: Application) => {
		if (application.status !== "pending") return;

		const reason = window.prompt("Raison du refus (optionnel) :");
		if (reason !== null) {
			// Si l'utilisateur n'a pas annulé
			handleReview(application.id, {
				decision: "rejected",
				comments: reason || "Refusé depuis la liste",
			});
		}
	};

	const handleSelectAll = () => {
		const pendingApplications = applications.filter(
			(app) => app.status === "pending",
		);
		if (selectedApplications.length === pendingApplications.length) {
			setSelectedApplications([]);
		} else {
			setSelectedApplications(pendingApplications.map((app) => app.id));
		}
	};

	const handleSelectApplication = (applicationId: string) => {
		setSelectedApplications((prev) =>
			prev.includes(applicationId)
				? prev.filter((id) => id !== applicationId)
				: [...prev, applicationId],
		);
	};

	const handleBulkApprove = async () => {
		if (selectedApplications.length === 0) return;

		if (
			window.confirm(
				`Êtes-vous sûr de vouloir approuver ${selectedApplications.length} candidature(s) ?`,
			)
		) {
			for (const applicationId of selectedApplications) {
				await handleReview(applicationId, {
					decision: "approved",
					comments: "Approuvé en lot",
				});
			}
			setSelectedApplications([]);
		}
	};

	const handleBulkReject = async () => {
		if (selectedApplications.length === 0) return;

		const reason = window.prompt("Raison du refus en lot (optionnel) :");
		if (reason !== null) {
			for (const applicationId of selectedApplications) {
				await handleReview(applicationId, {
					decision: "rejected",
					comments: reason || "Refusé en lot",
				});
			}
			setSelectedApplications([]);
		}
	};

	// Export functions
	const handleExportCSV = () => {
		if (applications.length === 0) {
			toast.error("Aucune candidature à exporter");
			return;
		}

		exportApplicationsToCSV(applications);
		toast.success("Export CSV généré avec succès");
	};

	const handleExportExcel = () => {
		if (applications.length === 0) {
			toast.error("Aucune candidature à exporter");
			return;
		}

		exportApplicationsToExcel(applications);
		toast.success("Export Excel généré avec succès");
	};

	// Filter utilities
	const handleDateFilter = (dateRange: string) => {
		setFilters((prev) => ({
			...prev,
			dateRange: dateRange as "all" | "today" | "week" | "month",
			page: 1,
		}));
	};

	const resetFilters = () => {
		setFilters({
			status: "pending",
			page: 1,
			limit: 20,
			dateRange: "all",
		});
	};

	const getActiveFiltersCount = () => {
		let count = 0;
		if (filters.search) count++;
		if (filters.status && filters.status !== "pending") count++;
		if (filters.sectionId) count++;
		if (filters.categoryId) count++;
		if (filters.dateRange && filters.dateRange !== "all") count++;
		return count;
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("fr-FR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "pending":
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			case "approved":
				return "bg-green-100 text-green-800 border-green-200";
			case "rejected":
				return "bg-red-100 text-red-800 border-red-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	return (
		<div className="space-y-6">
			{/* Filtres et actions */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="flex items-center gap-2">
								<span>Candidatures d'adhésion</span>
								{selectedApplications.length > 0 && (
									<Badge variant="outline" className="ml-2">
										{selectedApplications.length} sélectionnée(s)
									</Badge>
								)}
							</CardTitle>
						</div>
						<div className="flex items-center gap-2">
							{selectedApplications.length > 0 ? (
								<>
									<Button
										variant="outline"
										size="sm"
										onClick={handleBulkApprove}
										disabled={isReviewing}
										className="text-green-600 border-green-200 hover:bg-green-50"
									>
										<CheckCircle className="w-4 h-4 mr-2" />
										Approuver la sélection
									</Button>
									<Button
										variant="outline"
										size="sm"
										onClick={handleBulkReject}
										disabled={isReviewing}
										className="text-red-600 border-red-200 hover:bg-red-50"
									>
										<XCircle className="w-4 h-4 mr-2" />
										Refuser la sélection
									</Button>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => setSelectedApplications([])}
									>
										Annuler la sélection
									</Button>
								</>
							) : (
								<>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="outline" size="sm">
												<Download className="w-4 h-4 mr-2" />
												Exporter
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuItem onClick={handleExportCSV}>
												Exporter en CSV
											</DropdownMenuItem>
											<DropdownMenuItem onClick={handleExportExcel}>
												Exporter en Excel
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
									<Button
										variant="outline"
										size="sm"
										onClick={() => refetch()}
										disabled={isLoading}
									>
										<RefreshCw
											className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
										/>
										Actualiser
									</Button>
								</>
							)}
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex flex-col md:flex-row gap-4">
							<div className="flex-1">
								<div className="relative">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
									<Input
										placeholder="Rechercher par nom, email..."
										className="pl-10"
										onChange={(e) => handleSearch(e.target.value)}
									/>
								</div>
							</div>
							<div className="flex gap-2">
								<Select
									value={filters.status || "all"}
									onValueChange={handleStatusFilter}
								>
									<SelectTrigger className="w-[180px]">
										<Filter className="w-4 h-4 mr-2" />
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">Tous les statuts</SelectItem>
										<SelectItem value="pending">En attente</SelectItem>
										<SelectItem value="approved">Approuvées</SelectItem>
										<SelectItem value="rejected">Refusées</SelectItem>
									</SelectContent>
								</Select>
								<Button
									variant="outline"
									onClick={() => setShowFilters(!showFilters)}
									className="px-3"
								>
									<Filter className="w-4 h-4" />
								</Button>
							</div>
						</div>

						{/* Filtres avancés */}
						{showFilters && (
							<div className="border-t pt-4">
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<div>
										<div className="text-sm font-medium mb-2">Section</div>
										<Select
											value={filters.sectionId || "all"}
											onValueChange={(value) =>
												setFilters((prev) => ({
													...prev,
													sectionId: value === "all" ? undefined : value,
													page: 1,
												}))
											}
										>
											<SelectTrigger>
												<SelectValue placeholder="Toutes les sections" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="all">Toutes les sections</SelectItem>
												{isLoadingOptions ? (
													<SelectItem value="" disabled>
														Chargement...
													</SelectItem>
												) : (
													membershipOptions?.sections.map((section) => (
														<SelectItem key={section.id} value={section.id}>
															{section.name}
														</SelectItem>
													))
												)}
											</SelectContent>
										</Select>
									</div>
									<div>
										<div className="text-sm font-medium mb-2">Catégorie</div>
										<Select
											value={filters.categoryId || "all"}
											onValueChange={(value) =>
												setFilters((prev) => ({
													...prev,
													categoryId: value === "all" ? undefined : value,
													page: 1,
												}))
											}
										>
											<SelectTrigger>
												<SelectValue placeholder="Toutes les catégories" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="all">
													Toutes les catégories
												</SelectItem>
												{isLoadingOptions ? (
													<SelectItem value="" disabled>
														Chargement...
													</SelectItem>
												) : (
													membershipOptions?.categories
														.filter(
															(category) =>
																!filters.sectionId ||
																category.sectionId === filters.sectionId,
														)
														.map((category) => (
															<SelectItem key={category.id} value={category.id}>
																{category.name}
															</SelectItem>
														))
												)}
											</SelectContent>
										</Select>
									</div>
									<div>
										<div className="text-sm font-medium mb-2">
											Date de soumission
										</div>
										<Select
											value={filters.dateRange || "all"}
											onValueChange={handleDateFilter}
										>
											<SelectTrigger>
												<SelectValue placeholder="Toutes les dates" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="all">Toutes les dates</SelectItem>
												<SelectItem value="today">Aujourd'hui</SelectItem>
												<SelectItem value="week">Cette semaine</SelectItem>
												<SelectItem value="month">Ce mois</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>
						)}

						{/* Indicateur de filtres actifs */}
						{getActiveFiltersCount() > 0 && (
							<div className="flex items-center gap-2 flex-wrap text-sm text-muted-foreground">
								<span>Filtres actifs:</span>
								{filters.search && (
									<Badge variant="secondary">Recherche: {filters.search}</Badge>
								)}
								{filters.status && filters.status !== "pending" && (
									<Badge variant="secondary">
										Statut: {applicationStatusTranslations[filters.status]}
									</Badge>
								)}
								{filters.sectionId && (
									<Badge variant="secondary">
										Section:{" "}
										{membershipOptions?.sections.find(
											(s) => s.id === filters.sectionId,
										)?.name || "Sélectionnée"}
									</Badge>
								)}
								{filters.categoryId && (
									<Badge variant="secondary">
										Catégorie:{" "}
										{membershipOptions?.categories.find(
											(c) => c.id === filters.categoryId,
										)?.name || "Sélectionnée"}
									</Badge>
								)}
								{filters.dateRange && filters.dateRange !== "all" && (
									<Badge variant="secondary">
										Période:{" "}
										{filters.dateRange === "today"
											? "Aujourd'hui"
											: filters.dateRange === "week"
												? "Cette semaine"
												: filters.dateRange === "month"
													? "Ce mois"
													: filters.dateRange}
									</Badge>
								)}
								<Button
									variant="ghost"
									size="sm"
									onClick={resetFilters}
									className="h-6 px-2 text-xs"
								>
									Réinitialiser
								</Button>
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			{/* Statistiques */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Card>
					<CardContent className="p-6">
						<div className="flex items-center">
							<div className="p-2 bg-blue-100 rounded-lg">
								<FileText className="w-6 h-6 text-blue-600" />
							</div>
							<div className="ml-4">
								<div className="text-2xl font-bold">{total}</div>
								<p className="text-xs text-muted-foreground">
									Total candidatures
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-6">
						<div className="flex items-center">
							<div className="p-2 bg-yellow-100 rounded-lg">
								<Eye className="w-6 h-6 text-yellow-600" />
							</div>
							<div className="ml-4">
								<div className="text-2xl font-bold text-yellow-600">
									{
										applications.filter(
											(app: Application) => app.status === "pending",
										).length
									}
								</div>
								<p className="text-xs text-muted-foreground">En attente</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-6">
						<div className="flex items-center">
							<div className="p-2 bg-green-100 rounded-lg">
								<CheckCircle className="w-6 h-6 text-green-600" />
							</div>
							<div className="ml-4">
								<div className="text-2xl font-bold text-green-600">
									{
										applications.filter(
											(app: Application) => app.status === "approved",
										).length
									}
								</div>
								<p className="text-xs text-muted-foreground">Approuvées</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-6">
						<div className="flex items-center">
							<div className="p-2 bg-red-100 rounded-lg">
								<XCircle className="w-6 h-6 text-red-600" />
							</div>
							<div className="ml-4">
								<div className="text-2xl font-bold text-red-600">
									{
										applications.filter(
											(app: Application) => app.status === "rejected",
										).length
									}
								</div>
								<p className="text-xs text-muted-foreground">Refusées</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Liste des candidatures */}
			<Card>
				<CardContent className="p-0">
					{isLoading ? (
						<div className="flex items-center justify-center p-8">
							<Loader2 className="w-6 h-6 animate-spin mr-2" />
							Chargement des candidatures...
						</div>
					) : error ? (
						<div className="text-center p-8 text-red-600">
							Erreur lors du chargement des candidatures
						</div>
					) : applications.length === 0 ? (
						<div className="text-center p-8 text-muted-foreground">
							Aucune candidature trouvée
						</div>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-12">
										<Checkbox
											checked={
												selectedApplications.length > 0 &&
												selectedApplications.length ===
													applications.filter((app) => app.status === "pending")
														.length
											}
											onCheckedChange={handleSelectAll}
											aria-label="Sélectionner toutes les candidatures en attente"
										/>
									</TableHead>
									<TableHead>Candidat</TableHead>
									<TableHead>Section / Catégorie</TableHead>
									<TableHead>Date de soumission</TableHead>
									<TableHead>Statut</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{applications.map((application: Application) => (
									<TableRow key={application.id}>
										<TableCell>
											{application.status === "pending" && (
												<Checkbox
													checked={selectedApplications.includes(
														application.id,
													)}
													onCheckedChange={() =>
														handleSelectApplication(application.id)
													}
													aria-label={`Sélectionner la candidature de ${application.user.firstName} ${application.user.lastName}`}
												/>
											)}
										</TableCell>
										<TableCell>
											<div>
												<div className="font-medium">
													{application.user.firstName}{" "}
													{application.user.lastName}
												</div>
												<div className="text-sm text-muted-foreground">
													{application.user.email}
												</div>
											</div>
										</TableCell>
										<TableCell>
											<div className="text-sm">
												<div>{application.sectionName || "Non spécifiée"}</div>
												{application.categoryName && (
													<div className="text-muted-foreground">
														{application.categoryName}
													</div>
												)}
											</div>
										</TableCell>
										<TableCell>{formatDate(application.createdAt)}</TableCell>
										<TableCell>
											<Badge className={getStatusColor(application.status)}>
												{applicationStatusTranslations[application.status]}
											</Badge>
										</TableCell>
										<TableCell className="text-right">
											<div className="flex items-center justify-end gap-2">
												<Button
													variant="outline"
													size="sm"
													onClick={() => handleViewDetails(application)}
												>
													<Eye className="w-4 h-4 mr-2" />
													Détails
												</Button>

												{application.status === "pending" && (
													<>
														<Button
															variant="outline"
															size="sm"
															onClick={() => handleQuickApprove(application)}
															disabled={isReviewing}
															className="text-green-600 border-green-200 hover:bg-green-50"
														>
															{isReviewing ? (
																<Loader2 className="w-4 h-4 mr-2 animate-spin" />
															) : (
																<CheckCircle className="w-4 h-4 mr-2" />
															)}
															Approuver
														</Button>
														<Button
															variant="outline"
															size="sm"
															onClick={() => handleQuickReject(application)}
															disabled={isReviewing}
															className="text-red-600 border-red-200 hover:bg-red-50"
														>
															{isReviewing ? (
																<Loader2 className="w-4 h-4 mr-2 animate-spin" />
															) : (
																<XCircle className="w-4 h-4 mr-2" />
															)}
															Refuser
														</Button>
													</>
												)}

												{application.status !== "pending" && (
													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button variant="ghost" size="sm">
																<MoreHorizontal className="w-4 h-4" />
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent align="end">
															<DropdownMenuItem
																onClick={() => handleViewDetails(application)}
															>
																<Eye className="w-4 h-4 mr-2" />
																Voir les détails
															</DropdownMenuItem>
															<DropdownMenuSeparator />
															<DropdownMenuItem
																onClick={() => {
																	// Copier l'email dans le presse-papiers
																	navigator.clipboard.writeText(
																		application.user.email,
																	);
																}}
															>
																Copier l'email
															</DropdownMenuItem>
														</DropdownMenuContent>
													</DropdownMenu>
												)}
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex items-center justify-center space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() =>
							setFilters((prev: Partial<ApplicationFilters>) => ({
								...prev,
								page: Math.max(1, page - 1),
							}))
						}
						disabled={page <= 1}
					>
						Précédent
					</Button>
					<span className="text-sm text-muted-foreground">
						Page {page} sur {totalPages}
					</span>
					<Button
						variant="outline"
						size="sm"
						onClick={() =>
							setFilters((prev: Partial<ApplicationFilters>) => ({
								...prev,
								page: Math.min(totalPages, page + 1),
							}))
						}
						disabled={page >= totalPages}
					>
						Suivant
					</Button>
				</div>
			)}

			{/* Dialog des détails */}
			<ApplicationDetailsDialog
				application={selectedApplication}
				open={detailsOpen}
				onOpenChange={setDetailsOpen}
				onReview={handleReview}
				isReviewing={isReviewing}
			/>
		</div>
	);
}

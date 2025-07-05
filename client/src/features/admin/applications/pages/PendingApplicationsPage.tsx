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
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Clock, Filter, RefreshCw, Search, Users } from "lucide-react";
import { useState } from "react";
import { ApplicationReviewDialog } from "../components/ApplicationReviewDialog";
import { ApplicationsTable } from "../components/ApplicationsTable";
import { useAllSections } from "../hooks/use-all-sections";
import { usePendingApplications } from "../hooks/use-pending-applications";
import type { PendingApplication } from "../hooks/use-pending-applications";

export function PendingApplicationsPage() {
	const [selectedSectionId, setSelectedSectionId] = useState<
		string | undefined
	>();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedApplication, setSelectedApplication] =
		useState<PendingApplication | null>(null);
	const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

	const {
		data: applications = [],
		isLoading,
		refetch,
	} = usePendingApplications(selectedSectionId);

	const { data: sections = [], isLoading: sectionsLoading } = useAllSections();

	// Filtrer les candidatures selon le terme de recherche
	const filteredApplications = applications.filter(
		(app) =>
			app.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			app.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			app.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			app.section?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			app.category?.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const handleViewApplication = (applicationId: string) => {
		const application = applications.find((app) => app.id === applicationId);
		if (application) {
			setSelectedApplication(application);
			setIsReviewDialogOpen(true);
		}
	};

	const handleRefresh = () => {
		refetch();
	};

	return (
		<div className="space-y-6">
			{/* En-tête */}
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Candidatures d'adhésion
					</h1>
					<p className="text-muted-foreground">
						Gérez les candidatures d'adhésion en attente de validation
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={handleRefresh}
						disabled={isLoading}
					>
						<RefreshCw
							className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
						/>
						Actualiser
					</Button>
				</div>
			</div>

			{/* Statistiques */}
			<div className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total en attente
						</CardTitle>
						<Clock className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{applications.length}</div>
						<p className="text-xs text-muted-foreground">
							{applications.length === 1 ? "candidature" : "candidatures"} à
							traiter
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Avec section</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{applications.filter((app) => app.section).length}
						</div>
						<p className="text-xs text-muted-foreground">
							candidatures avec section spécifiée
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Avec catégorie
						</CardTitle>
						<Badge className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{applications.filter((app) => app.category).length}
						</div>
						<p className="text-xs text-muted-foreground">
							candidatures avec catégorie spécifiée
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Filtres et recherche */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Filter className="h-5 w-5" />
						Filtres et recherche
					</CardTitle>
					<CardDescription>
						Filtrez et recherchez parmi les candidatures
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						<div className="space-y-2">
							<Label htmlFor="search">Rechercher</Label>
							<div className="relative">
								<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input
									id="search"
									placeholder="Nom, email, section, catégorie..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-8"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label>Filtrer par section</Label>
							<Select
								value={selectedSectionId || "all"}
								onValueChange={(value) =>
									setSelectedSectionId(value === "all" ? undefined : value)
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Toutes les sections" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">Toutes les sections</SelectItem>
									{sectionsLoading ? (
										<SelectItem value="loading" disabled>
											Chargement...
										</SelectItem>
									) : (
										sections.map((section) => (
											<SelectItem key={section.id} value={section.id}>
												{section.name}
											</SelectItem>
										))
									)}
								</SelectContent>
							</Select>
						</div>
					</div>

					{(searchTerm || selectedSectionId) && (
						<div className="flex items-center gap-2">
							<span className="text-sm text-muted-foreground">
								Filtres actifs :
							</span>
							{searchTerm && (
								<Badge variant="secondary" className="flex items-center gap-1">
									Recherche: "{searchTerm}"
									<button
										type="button"
										onClick={() => setSearchTerm("")}
										className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
									>
										×
									</button>
								</Badge>
							)}
							{selectedSectionId && (
								<Badge variant="secondary" className="flex items-center gap-1">
									Section: {selectedSectionId}
									<button
										type="button"
										onClick={() => setSelectedSectionId(undefined)}
										className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
									>
										×
									</button>
								</Badge>
							)}
						</div>
					)}
				</CardContent>
			</Card>

			<Separator />

			{/* Liste des candidatures */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle>
								Candidatures ({filteredApplications.length})
							</CardTitle>
							<CardDescription>
								Cliquez sur "Examiner" pour valider ou rejeter une candidature
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<ApplicationsTable
						applications={filteredApplications}
						isLoading={isLoading}
						onViewApplication={handleViewApplication}
					/>
				</CardContent>
			</Card>

			{/* Dialog de validation */}
			<ApplicationReviewDialog
				application={selectedApplication}
				open={isReviewDialogOpen}
				onOpenChange={setIsReviewDialogOpen}
			/>
		</div>
	);
}

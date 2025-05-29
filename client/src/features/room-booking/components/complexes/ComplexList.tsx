import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useComplexes } from "@room-booking/hooks/useComplexes";
import type { Complex } from "@room-booking/hooks/useComplexes";
import { useNavigate } from "@tanstack/react-router";
import {
	Accessibility,
	Building,
	Calendar,
	Car,
	ChevronLeft,
	ChevronRight,
	CircleOff,
	Loader2,
	MapPin,
	MoreHorizontal,
	Plus,
	Search,
	//@ts-ignore
} from "lucide-react";
import { useState } from "react";

interface ComplexListProps {
	onCreateClick?: () => void;
	onEditClick?: (complexId: string) => void;
	initialComplexes?: Complex[];
}

export function ComplexList({
	onCreateClick,
	onEditClick,
	initialComplexes = [],
}: ComplexListProps) {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");

	const {
		complexes,
		pagination,
		loading,
		error,
		updateFilters,
		deleteComplex,
		nextPage,
		prevPage,
		goToPage,
	} = useComplexes({
		page: 1,
		limit: 10,
		initialData: initialComplexes,
	});

	const handleSearch = (value: string) => {
		setSearchTerm(value);
		updateFilters({ search: value || undefined });
	};

	const handleDelete = async (id: string, name: string) => {
		if (
			window.confirm(
				`Êtes-vous sûr de vouloir supprimer le complexe "${name}" ?`,
			)
		) {
			await deleteComplex(id);
		}
	};

	const handleViewDetails = (complexId: string) => {
		navigate({ to: `/admin/facilities/complexes/${complexId}` });
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("fr-FR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	const displayComplexes = searchTerm || loading ? complexes : initialComplexes;

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
						<div>
							<CardTitle>Liste des complexes</CardTitle>
							<CardDescription>
								{displayComplexes.length} complexe
								{displayComplexes.length > 1 ? "s" : ""} trouvé
								{displayComplexes.length > 1 ? "s" : ""}
							</CardDescription>
						</div>
						<Button onClick={onCreateClick}>
							<Plus className="w-4 h-4 mr-2" />
							Nouveau complexe
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					{/* Barre de recherche */}
					<div className="flex flex-col gap-4 mb-6 md:flex-row">
						<div className="relative flex-1">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Rechercher un complexe par nom ou ville..."
								className="pl-8"
								value={searchTerm}
								onChange={(e) => handleSearch(e.target.value)}
							/>
						</div>
					</div>

					{/* Table */}
					<div className="border rounded-md">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Complexe</TableHead>
									<TableHead>Localisation</TableHead>
									<TableHead>Services</TableHead>
									<TableHead>Accessibilité</TableHead>
									<TableHead>Créé le</TableHead>
									<TableHead className="w-[80px]">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{loading && searchTerm ? (
									<TableRow>
										<TableCell colSpan={6} className="h-24 text-center">
											<div className="flex items-center justify-center">
												<Loader2 className="w-6 h-6 animate-spin mr-2" />
												Recherche en cours...
											</div>
										</TableCell>
									</TableRow>
								) : error ? (
									<TableRow>
										<TableCell
											colSpan={6}
											className="h-24 text-center text-red-500"
										>
											{error}
										</TableCell>
									</TableRow>
								) : displayComplexes.length > 0 ? (
									displayComplexes.map((complex) => (
										<TableRow key={complex.id}>
											<TableCell>
												<div className="flex items-center">
													<Building className="w-4 h-4 mr-3 text-muted-foreground" />
													<div>
														<div className="font-medium">{complex.name}</div>
														<div className="text-sm text-muted-foreground">
															ID: {complex.id.slice(0, 8)}...
														</div>
													</div>
												</div>
											</TableCell>
											<TableCell>
												<div className="flex items-center">
													<MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
													<div>
														<div className="text-sm font-medium">
															{complex.street}
														</div>
														<div className="text-xs text-muted-foreground">
															{complex.city} {complex.postalCode}
														</div>
													</div>
												</div>
											</TableCell>
											<TableCell>
												<div className="space-y-1">
													<div className="flex items-center text-sm">
														<Car className="w-3 h-3 mr-1 text-muted-foreground" />
														<span className="text-muted-foreground">
															{complex.parkingCapacity > 0
																? `${complex.parkingCapacity} places`
																: "Pas de parking"}
														</span>
													</div>
													<div className="flex items-center text-xs text-muted-foreground">
														<Accessibility className="w-3 h-3 mr-1" />
														<span>
															{complex.numberOfElevators > 0
																? `${complex.numberOfElevators} ascenseur${complex.numberOfElevators > 1 ? "s" : ""}`
																: "Pas d'ascenseur"}
														</span>
													</div>
												</div>
											</TableCell>
											<TableCell>
												<Badge
													variant={
														complex.accessibleForReducedMobility
															? "default"
															: "secondary"
													}
													className={
														complex.accessibleForReducedMobility
															? "bg-green-100 text-green-800 border-green-200"
															: ""
													}
												>
													{complex.accessibleForReducedMobility
														? "PMR ✓"
														: "Standard"}
												</Badge>
											</TableCell>
											<TableCell>
												<div className="flex items-center text-sm text-muted-foreground">
													<Calendar className="w-3 h-3 mr-1" />
													{formatDate(complex.createdAt)}
												</div>
											</TableCell>
											<TableCell>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button variant="ghost" size="icon">
															<MoreHorizontal className="h-4 w-4" />
															<span className="sr-only">Menu</span>
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuLabel>Actions</DropdownMenuLabel>
														<DropdownMenuSeparator />
														<DropdownMenuItem
															onClick={() => handleViewDetails(complex.id)}
														>
															Voir les détails
														</DropdownMenuItem>
														<DropdownMenuItem
															onClick={() => onEditClick?.(complex.id)}
														>
															Modifier
														</DropdownMenuItem>
														<DropdownMenuSeparator />
														<DropdownMenuItem
															className="text-red-600"
															onClick={() =>
																handleDelete(complex.id, complex.name)
															}
														>
															Supprimer
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={6} className="h-24 text-center">
											<div className="text-center">
												<CircleOff className="w-12 h-12 mx-auto text-gray-400 mb-4" />
												<h3 className="text-lg font-medium text-gray-900 mb-2">
													Aucun complexe trouvé
												</h3>
												<p className="text-gray-500 mb-4">
													{searchTerm
														? "Aucun complexe ne correspond à votre recherche."
														: "Commencez par créer votre premier complexe sportif."}
												</p>
											</div>
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>

					{/* Pagination - seulement si on a des résultats de recherche */}
					{pagination && pagination.totalPages > 1 && searchTerm && (
						<div className="flex items-center justify-between mt-4">
							<div className="text-sm text-muted-foreground">
								Affichage de{" "}
								{Math.min(
									pagination.totalCount,
									(pagination.page - 1) * pagination.limit + 1,
								)}{" "}
								à{" "}
								{Math.min(
									pagination.totalCount,
									pagination.page * pagination.limit,
								)}{" "}
								sur {pagination.totalCount} complexes
							</div>
							<div className="flex items-center space-x-2">
								<Button
									variant="outline"
									size="icon"
									onClick={prevPage}
									disabled={!pagination.hasPrev || loading}
								>
									<ChevronLeft className="h-4 w-4" />
									<span className="sr-only">Page précédente</span>
								</Button>

								<div className="flex items-center space-x-1">
									{Array.from(
										{ length: Math.min(5, pagination.totalPages) },
										(_, i) => {
											const page = i + 1;
											return (
												<Button
													key={page}
													variant={
														pagination.page === page ? "default" : "outline"
													}
													size="sm"
													onClick={() => goToPage(page)}
													disabled={loading}
												>
													{page}
												</Button>
											);
										},
									)}
								</div>

								<Button
									variant="outline"
									size="icon"
									onClick={nextPage}
									disabled={!pagination.hasNext || loading}
								>
									<ChevronRight className="h-4 w-4" />
									<span className="sr-only">Page suivante</span>
								</Button>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

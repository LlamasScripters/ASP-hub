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
import { useComplexes } from "@room-booking/hooks/useComplexes";
import type { Complex } from "@room-booking/hooks/useComplexes";
import { Link } from "@tanstack/react-router";
import {
	Accessibility,
	Building,
	Calendar,
	Car,
	ChevronLeft,
	ChevronRight,
	CircleOff,
	Filter,
	MapPin,
	MoreHorizontal,
	Plus,
	Search,
	//@ts-ignore
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface ComplexListProps {
	initialComplexes?: Complex[];
}

export function ComplexList({ initialComplexes = [] }: ComplexListProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [accessibilityFilter, setAccessibilityFilter] = useState<string>("all");
	const [parkingFilter, setParkingFilter] = useState<string>("all");
	const itemsPerPage = 10;

	const { complexes: fetchedComplexes, deleteComplex } = useComplexes({
		initialData: initialComplexes,
	});

	const allComplexes =
		fetchedComplexes.length > 0 ? fetchedComplexes : initialComplexes;

	const filteredComplexes = useMemo(() => {
		let filtered = allComplexes;

		if (searchTerm) {
			const lowerSearchTerm = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(complex) =>
					complex.name.toLowerCase().includes(lowerSearchTerm) ||
					complex.city.toLowerCase().includes(lowerSearchTerm) ||
					complex.street.toLowerCase().includes(lowerSearchTerm),
			);
		}

		if (accessibilityFilter !== "all") {
			filtered = filtered.filter((complex) => {
				if (accessibilityFilter === "accessible") {
					return complex.accessibleForReducedMobility;
				}
				if (accessibilityFilter === "not-accessible") {
					return !complex.accessibleForReducedMobility;
				}
				return true;
			});
		}

		if (parkingFilter !== "all") {
			filtered = filtered.filter((complex) => {
				if (parkingFilter === "with-parking") {
					return complex.parkingCapacity > 0;
				}
				if (parkingFilter === "no-parking") {
					return complex.parkingCapacity === 0;
				}
				return true;
			});
		}

		return filtered;
	}, [allComplexes, searchTerm, accessibilityFilter, parkingFilter]);

	const totalPages = Math.ceil(filteredComplexes.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentComplexes = filteredComplexes.slice(startIndex, endIndex);

	useEffect(() => {
		setCurrentPage(1);
	}, []);

	const handleSearch = (value: string) => {
		setSearchTerm(value);
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

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("fr-FR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	const goToPage = (page: number) => {
		setCurrentPage(page);
	};

	const nextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const getPageNumbers = () => {
		const pages = [];
		const maxVisible = 5;

		if (totalPages <= maxVisible) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			const start = Math.max(1, currentPage - 2);
			const end = Math.min(totalPages, start + maxVisible - 1);

			for (let i = start; i <= end; i++) {
				pages.push(i);
			}
		}

		return pages;
	};

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
						<div>
							<CardTitle>Liste des complexes</CardTitle>
							<CardDescription>
								{filteredComplexes.length} complexe
								{filteredComplexes.length > 1 ? "s" : ""} trouvé
								{filteredComplexes.length > 1 ? "s" : ""}
								{filteredComplexes.length !== allComplexes.length &&
									` sur ${allComplexes.length} au total`}
							</CardDescription>
						</div>
						<Button asChild>
							<Link to="/admin/facilities/complexes/create">
								<Plus className="w-4 h-4 mr-2" />
								Nouveau complexe
							</Link>
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					{/* Barre de recherche et filtres */}
					<div className="flex flex-col gap-4 mb-6">
						<div className="flex flex-col gap-4 md:flex-row">
							<div className="relative flex-1">
								<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input
									placeholder="Rechercher un complexe par nom, ville ou adresse..."
									className="pl-8"
									value={searchTerm}
									onChange={(e) => handleSearch(e.target.value)}
								/>
							</div>
							<div className="flex gap-2">
								<Select
									value={accessibilityFilter}
									onValueChange={setAccessibilityFilter}
								>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Accessibilité" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">Toutes</SelectItem>
										<SelectItem value="accessible">PMR Accessible</SelectItem>
										<SelectItem value="not-accessible">Standard</SelectItem>
									</SelectContent>
								</Select>
								<Select value={parkingFilter} onValueChange={setParkingFilter}>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Parking" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">Tous</SelectItem>
										<SelectItem value="with-parking">Avec parking</SelectItem>
										<SelectItem value="no-parking">Sans parking</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
						{(searchTerm ||
							accessibilityFilter !== "all" ||
							parkingFilter !== "all") && (
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Filter className="w-4 h-4" />
								<span>Filtres actifs:</span>
								{searchTerm && (
									<Badge variant="secondary">Recherche: {searchTerm}</Badge>
								)}
								{accessibilityFilter !== "all" && (
									<Badge variant="secondary">
										Accessibilité:{" "}
										{accessibilityFilter === "accessible" ? "PMR" : "Standard"}
									</Badge>
								)}
								{parkingFilter !== "all" && (
									<Badge variant="secondary">
										Parking:{" "}
										{parkingFilter === "with-parking" ? "Avec" : "Sans"}
									</Badge>
								)}
								<Button
									variant="ghost"
									size="sm"
									onClick={() => {
										setSearchTerm("");
										setAccessibilityFilter("all");
										setParkingFilter("all");
									}}
								>
									Effacer
								</Button>
							</div>
						)}
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
								{currentComplexes.length > 0 ? (
									currentComplexes.map((complex) => (
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
														<DropdownMenuItem asChild>
															<Link
																to={"/admin/facilities/complexes/$complexId"}
																params={{ complexId: complex.id }}
																className="w-full cursor-pointer"
															>
																Voir les détails
															</Link>
														</DropdownMenuItem>
														<DropdownMenuItem asChild>
															<Link
																to={
																	"/admin/facilities/complexes/$complexId/edit"
																}
																params={{ complexId: complex.id }}
																className="w-full cursor-pointer"
															>
																Modifier
															</Link>
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
													{searchTerm ||
													accessibilityFilter !== "all" ||
													parkingFilter !== "all"
														? "Aucun complexe ne correspond à vos critères de recherche."
														: "Commencez par créer votre premier complexe sportif."}
												</p>
											</div>
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>

					{/* Pagination */}
					{totalPages > 1 && (
						<div className="flex items-center justify-between mt-4">
							<div className="text-sm text-muted-foreground">
								Affichage de {startIndex + 1} à{" "}
								{Math.min(endIndex, filteredComplexes.length)} sur{" "}
								{filteredComplexes.length} complexes
							</div>
							<div className="flex items-center space-x-2">
								<Button
									variant="outline"
									size="icon"
									onClick={prevPage}
									disabled={currentPage === 1}
								>
									<ChevronLeft className="h-4 w-4" />
									<span className="sr-only">Page précédente</span>
								</Button>

								<div className="flex items-center space-x-1">
									{getPageNumbers().map((page) => (
										<Button
											key={page}
											variant={currentPage === page ? "default" : "outline"}
											size="sm"
											onClick={() => goToPage(page)}
										>
											{page}
										</Button>
									))}
								</div>

								<Button
									variant="outline"
									size="icon"
									onClick={nextPage}
									disabled={currentPage === totalPages}
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

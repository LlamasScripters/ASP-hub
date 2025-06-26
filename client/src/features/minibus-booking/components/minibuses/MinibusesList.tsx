import { useState, useMemo, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import type { Minibus } from "@/features/minibus-booking/hooks/useMinibuses";
import { useMinibuses } from "@/features/minibus-booking/hooks/useMinibuses";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
	DropdownMenu, 
	DropdownMenuContent, 
	DropdownMenuItem, 
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
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
import {
	Bus,
	Calendar,
	ChevronLeft,
	ChevronRight,
	Filter,
	MoreHorizontal,
	Plus,
	Search,
	Users,
	UserCheck,
	// @ts-ignore
} from "lucide-react";

interface MinibusesListProps {
	initialMinibuses: Minibus[];
}

export function MinibusesList({ initialMinibuses }: MinibusesListProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");
	const [capacityFilter, setCapacityFilter] = useState<string>("all");
	const itemsPerPage = 10;

	const {
		minibuses: fetchedMinibuses,
		deleteMinibus,
	} = useMinibuses();

	const allMinibuses = fetchedMinibuses.length > 0 ? fetchedMinibuses : initialMinibuses;

	const filteredMinibuses = useMemo(() => {
		let filtered = allMinibuses;

		if (searchTerm) {
			const lowerSearchTerm = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(minibus) =>
					minibus.name.toLowerCase().includes(lowerSearchTerm) ||
					minibus.licensePlate.toLowerCase().includes(lowerSearchTerm)
			);
		}

		if (availabilityFilter !== "all") {
			filtered = filtered.filter((minibus) => {
				if (availabilityFilter === "available") return minibus.isAvailable;
				if (availabilityFilter === "unavailable") return !minibus.isAvailable;
				return true;
			});
		}

		if (capacityFilter !== "all") {
			filtered = filtered.filter((minibus) => {
				if (capacityFilter === "small") return minibus.capacity <= 15;
				if (capacityFilter === "medium") return minibus.capacity > 15 && minibus.capacity <= 30;
				if (capacityFilter === "large") return minibus.capacity > 30;
				if (capacityFilter === "pmr") return minibus.disabledPersonCapacity > 0;
				return true;
			});
		}

		return filtered;
	}, [allMinibuses, searchTerm, availabilityFilter, capacityFilter]);

	const totalPages = Math.ceil(filteredMinibuses.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentMinibuses = filteredMinibuses.slice(startIndex, endIndex);

	useEffect(() => {
		setCurrentPage(1);
	}, []);

	const handleSearch = (value: string) => {
		setSearchTerm(value);
	};

	const handleDelete = async (minibus: Minibus) => {
		if (
			window.confirm(
				`Êtes-vous sûr de vouloir supprimer le minibus "${minibus.name}" ?`,
			)
		) {
			await deleteMinibus(minibus.id);
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
							<CardTitle>Liste des minibus</CardTitle>
							<CardDescription>
								{filteredMinibuses.length} minibus trouvé
								{filteredMinibuses.length > 1 ? "s" : ""}
								{filteredMinibuses.length !== allMinibuses.length &&
									` sur ${allMinibuses.length} au total`}
							</CardDescription>
						</div>
						<Button asChild>
							<Link to="/admin/assets/minibuses/create">
								<Plus className="w-4 h-4 mr-2" />
								Nouveau minibus
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
									placeholder="Rechercher un minibus par nom ou plaque d'immatriculation..."
									className="pl-8"
									value={searchTerm}
									onChange={(e) => handleSearch(e.target.value)}
								/>
							</div>
							<div className="flex gap-2">
								<Select
									value={availabilityFilter}
									onValueChange={setAvailabilityFilter}
								>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Disponibilité" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">Tous</SelectItem>
										<SelectItem value="available">Disponibles</SelectItem>
										<SelectItem value="unavailable">Indisponibles</SelectItem>
									</SelectContent>
								</Select>
								<Select value={capacityFilter} onValueChange={setCapacityFilter}>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Capacité" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">Toutes</SelectItem>
										<SelectItem value="small">Petit (≤15)</SelectItem>
										<SelectItem value="medium">Moyen (16-30)</SelectItem>
										<SelectItem value="large">Grand (&gt;30)</SelectItem>
										<SelectItem value="pmr">Avec PMR</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
						{(searchTerm ||
							availabilityFilter !== "all" ||
							capacityFilter !== "all") && (
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Filter className="w-4 h-4" />
								<span>Filtres actifs:</span>
								{searchTerm && (
									<Badge variant="secondary">Recherche: {searchTerm}</Badge>
								)}
								{availabilityFilter !== "all" && (
									<Badge variant="secondary">
										Disponibilité:{" "}
										{availabilityFilter === "available" ? "Disponibles" : "Indisponibles"}
									</Badge>
								)}
								{capacityFilter !== "all" && (
									<Badge variant="secondary">
										Capacité:{" "}
										{capacityFilter === "small" ? "Petit" : 
										 capacityFilter === "medium" ? "Moyen" : 
										 capacityFilter === "large" ? "Grand" : "Avec PMR"}
									</Badge>
								)}
								<Button
									variant="ghost"
									size="sm"
									onClick={() => {
										setSearchTerm("");
										setAvailabilityFilter("all");
										setCapacityFilter("all");
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
									<TableHead>Minibus</TableHead>
									<TableHead>Plaque</TableHead>
									<TableHead>Capacité</TableHead>
									<TableHead>Disponibilité</TableHead>
									<TableHead>Créé le</TableHead>
									<TableHead className="w-[80px]">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{currentMinibuses.length > 0 ? (
									currentMinibuses.map((minibus) => (
										<TableRow key={minibus.id}>
											<TableCell>
												<div className="flex items-center">
													<Bus className="w-4 h-4 mr-3 text-muted-foreground" />
													<div>
														<div className="font-medium">{minibus.name}</div>
														{minibus.description && (
															<div className="text-sm text-muted-foreground line-clamp-1">
																{minibus.description}
															</div>
														)}
													</div>
												</div>
											</TableCell>
											<TableCell>
												<div className="font-mono text-sm">
													{minibus.licensePlate}
												</div>
											</TableCell>
											<TableCell>
												<div className="space-y-1">
													<div className="flex items-center text-sm">
														<Users className="w-3 h-3 mr-1 text-muted-foreground" />
														<span className="font-medium">{minibus.capacity} places</span>
													</div>
													{minibus.disabledPersonCapacity > 0 && (
														<div className="flex items-center text-xs text-muted-foreground">
															<UserCheck className="w-3 h-3 mr-1" />
															<span>
																{minibus.disabledPersonCapacity} PMR
															</span>
														</div>
													)}
												</div>
											</TableCell>
											<TableCell>
												<Badge
													variant={minibus.isAvailable ? "default" : "secondary"}
													className={
														minibus.isAvailable
															? "bg-green-100 text-green-800 border-green-200"
															: "bg-red-100 text-red-800 border-red-200"
													}
												>
													{minibus.isAvailable ? "Disponible" : "Indisponible"}
												</Badge>
											</TableCell>
											<TableCell>
												<div className="flex items-center text-sm text-muted-foreground">
													<Calendar className="w-3 h-3 mr-1" />
													{formatDate(minibus.createdAt)}
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
																to="/admin/assets/minibuses/$minibusId"
																params={{ minibusId: minibus.id }}
																className="w-full cursor-pointer"
															>
																Voir les détails
															</Link>
														</DropdownMenuItem>
														<DropdownMenuItem asChild>
															<Link
																to="/admin/assets/minibuses/$minibusId/edit"
																params={{ minibusId: minibus.id }}
																className="w-full cursor-pointer"
															>
																Modifier
															</Link>
														</DropdownMenuItem>
														<DropdownMenuSeparator />
														<DropdownMenuItem
															className="text-red-600"
															onClick={() => handleDelete(minibus)}
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
												<Bus className="w-12 h-12 mx-auto text-gray-400 mb-4" />
												<h3 className="text-lg font-medium text-gray-900 mb-2">
													Aucun minibus trouvé
												</h3>
												<p className="text-gray-500 mb-4">
													{searchTerm ||
													availabilityFilter !== "all" ||
													capacityFilter !== "all"
														? "Aucun minibus ne correspond à vos critères de recherche."
														: "Commencez par créer votre premier minibus."}
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
								{Math.min(endIndex, filteredMinibuses.length)} sur{" "}
								{filteredMinibuses.length} minibus
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

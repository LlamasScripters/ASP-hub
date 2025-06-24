import { useState, useMemo, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import type { Minibus } from "@/features/minibus-booking/hooks/useMinibuses";
import { useMinibuses } from "@/features/minibus-booking/hooks/useMinibuses";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
	DropdownMenu, 
	DropdownMenuContent, 
	DropdownMenuItem, 
	DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
	Bus,
	Calendar,
	ChevronLeft,
	ChevronRight,
	CircleOff,
	Filter,
	Loader2,
	MoreHorizontal,
	Plus,	Search,
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
	const itemsPerPage = 10;

	const {
		minibuses: fetchedMinibuses,
		loading,
		error,
		updateFilters,
		deleteMinibus,
	} = useMinibuses({
		initialData: initialMinibuses,
	});

	const allMinibuses = fetchedMinibuses.length > 0 ? fetchedMinibuses : initialMinibuses;

	const filteredMinibuses = useMemo(() => {
		let filtered = allMinibuses;

		if (searchTerm) {
			filtered = filtered.filter(
				(minibus) =>
					minibus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					minibus.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		if (availabilityFilter !== "all") {
			filtered = filtered.filter((minibus) => {
				if (availabilityFilter === "available") return minibus.isAvailable;
				if (availabilityFilter === "unavailable") return !minibus.isAvailable;
				return true;
			});
		}

		return filtered;
	}, [allMinibuses, searchTerm, availabilityFilter]);

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

	const getAvailabilityBadge = (isAvailable: boolean) => {
		return isAvailable ? (
			<Badge variant="default" className="bg-green-100 text-green-800">
				Disponible
			</Badge>
		) : (
			<Badge variant="secondary" className="bg-red-100 text-red-800">
				Indisponible
			</Badge>
		);
	};

	const goToPage = (page: number) => {
		setCurrentPage(Math.max(1, Math.min(page, totalPages)));
	};

	const nextPage = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};

	const prevPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	// Générer les numéros de page à afficher
	const getPageNumbers = () => {
		const delta = 2;
		const range = [];
		const rangeWithDots = [];

		for (
			let i = Math.max(2, currentPage - delta);
			i <= Math.min(totalPages - 1, currentPage + delta);
			i++
		) {
			range.push(i);
		}

		if (currentPage - delta > 2) {
			rangeWithDots.push(1, "...");
		} else {
			rangeWithDots.push(1);
		}

		rangeWithDots.push(...range);

		if (currentPage + delta < totalPages - 1) {
			rangeWithDots.push("...", totalPages);
		} else if (totalPages > 1) {
			rangeWithDots.push(totalPages);
		}

		return rangeWithDots;
	};

	return (
		<div className="space-y-6">
			{/* En-tête et recherche */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Liste des minibus</h2>
					<p className="text-muted-foreground">
						Gérez les minibus disponibles pour les réservations
					</p>
				</div>
				<Button asChild>
					<Link to="/admin/assets/minibuses/create">
						<Plus className="w-4 h-4 mr-2" />
						Nouveau minibus
					</Link>
				</Button>
			</div>

			{/* Filtres */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Filter className="w-4 h-4" />
						Filtres
					</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="space-y-2">
						<label htmlFor="search-input" className="text-sm font-medium">Recherche</label>
						<div className="relative">
							<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								id="search-input"
								placeholder="Nom ou plaque..."
								value={searchTerm}
								onChange={(e) => handleSearch(e.target.value)}
								className="pl-8"
							/>
						</div>
					</div>
					<div className="space-y-2">
						<div className="text-sm font-medium">Disponibilité</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" className="w-full justify-between">
									{availabilityFilter === "all" && "Tous"}
									{availabilityFilter === "available" && "Disponibles"}
									{availabilityFilter === "unavailable" && "Indisponibles"}
									<ChevronRight className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-40">
								<DropdownMenuItem onClick={() => setAvailabilityFilter("all")}>
									Tous
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setAvailabilityFilter("available")}>
									Disponibles
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setAvailabilityFilter("unavailable")}>
									Indisponibles
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</CardContent>
			</Card>

			{/* Loading state */}
			{loading && (
				<div className="flex items-center justify-center py-8">
					<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
				</div>
			)}

			{/* Error state */}
			{error && (
				<Card className="border-red-200 bg-red-50">
					<CardContent className="pt-6">
						<div className="flex items-center gap-2 text-red-800">
							<CircleOff className="h-4 w-4" />
							<span>{error}</span>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Liste des minibus */}
			{!loading && !error && (
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{currentMinibuses.length === 0 && (
						<div className="col-span-full text-center py-12">
							<Bus className="mx-auto h-12 w-12 text-muted-foreground" />
							<h3 className="mt-2 text-sm font-semibold text-muted-foreground">
								Aucun minibus trouvé
							</h3>
							<p className="mt-1 text-sm text-muted-foreground">
								{searchTerm || availabilityFilter !== "all"
									? "Essayez de modifier vos filtres."
									: "Commencez par créer un nouveau minibus."}
							</p>
						</div>
					)}

					{currentMinibuses.map((minibus) => (
						<Card key={minibus.id} className="hover:shadow-md transition-shadow">
							<CardHeader className="pb-3">
								<div className="flex items-start justify-between">
									<div className="space-y-1">
										<CardTitle className="text-lg">{minibus.name}</CardTitle>
										<p className="text-sm text-muted-foreground">
											{minibus.licensePlate}
										</p>
									</div>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="sm">
												<MoreHorizontal className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem asChild>
												<Link 
													to="/admin/assets/minibuses/$minibusId"
													params={{ minibusId: minibus.id }}
												>
													Voir détails
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem asChild>
												<Link 
													to="/admin/assets/minibuses/$minibusId/edit"
													params={{ minibusId: minibus.id }}
												>
													Modifier
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() => handleDelete(minibus)}
												className="text-red-600"
											>
												Supprimer
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</CardHeader>
							<CardContent className="space-y-3">
								<div className="flex items-center justify-between">
									{getAvailabilityBadge(minibus.isAvailable)}
									<div className="flex items-center gap-4 text-sm text-muted-foreground">
										<div className="flex items-center gap-1">
											<Users className="h-3 w-3" />
											{minibus.capacity}
										</div>										{minibus.disabledPersonCapacity > 0 && (
											<div className="flex items-center gap-1">
												<UserCheck className="h-3 w-3" />
												{minibus.disabledPersonCapacity} PMR
											</div>
										)}
									</div>
								</div>

								{minibus.description && (
									<p className="text-sm text-muted-foreground line-clamp-2">
										{minibus.description}
									</p>
								)}

								<div className="flex items-center justify-between pt-2 border-t">
									<div className="text-xs text-muted-foreground">
										Créé le {formatDate(minibus.createdAt)}
									</div>
									<Button asChild size="sm" variant="outline">
										<Link 
											to="/admin/assets/minibuses/$minibusId"
											params={{ minibusId: minibus.id }}
										>
											<Calendar className="w-3 h-3 mr-1" />
											Voir planning
										</Link>
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex items-center justify-between">
					<p className="text-sm text-muted-foreground">
						Affichage de {startIndex + 1} à {Math.min(endIndex, filteredMinibuses.length)} sur{" "}
						{filteredMinibuses.length} résultats
					</p>
					<div className="flex items-center space-x-2">
						<Button
							variant="outline"
							size="sm"
							onClick={prevPage}
							disabled={currentPage === 1}
						>
							<ChevronLeft className="h-4 w-4" />
							Précédent
						</Button>
						<div className="flex items-center space-x-1">
							{getPageNumbers().map((page) => (
								<Button
									key={`page-${page}`}
									variant={page === currentPage ? "default" : "outline"}
									size="sm"
									onClick={() => typeof page === "number" && goToPage(page)}
									disabled={page === "..."}
									className="w-8"
								>
									{page}
								</Button>
							))}
						</div>
						<Button
							variant="outline"
							size="sm"
							onClick={nextPage}
							disabled={currentPage === totalPages}
						>
							Suivant
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

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
import { useRooms } from "@room-booking/hooks/useRooms";
import type { Room } from "@room-booking/hooks/useRooms";
import {
	Calendar,
	CircleOff,
	Loader2,
	MoreHorizontal,
	Plus,
	Search,
	TreePine,
	Warehouse,
	//@ts-ignore
} from "lucide-react";
import { useState } from "react";

interface RoomsListProps {
	complexId: string;
	initialRooms: Room[];
	onCreateClick?: () => void;
	onEditClick?: (room: Room) => void;
}

export function RoomsList({
	complexId,
	initialRooms,
	onCreateClick,
	onEditClick,
}: RoomsListProps) {
	const [searchTerm, setSearchTerm] = useState("");

	const { rooms, loading, error, updateFilters, deleteRoom } = useRooms({
		complexId,
		initialData: initialRooms,
	});

	// Handle search
	const handleSearch = (value: string) => {
		setSearchTerm(value);
		updateFilters({ search: value || undefined });
	};

	// Handle delete
	const handleDelete = async (room: Room) => {
		if (
			window.confirm(
				`Êtes-vous sûr de vouloir supprimer la salle "${room.name}" ?`,
			)
		) {
			await deleteRoom(room.id);
		}
	};

	// Format date
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("fr-FR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	const getSportTypeBadgeColor = (sportType: string) => {
		const colors: Record<string, string> = {
			Football: "bg-green-100 text-green-800",
			Basketball: "bg-orange-100 text-orange-800",
			Tennis: "bg-yellow-100 text-yellow-800",
			Volleyball: "bg-blue-100 text-blue-800",
			Handball: "bg-red-100 text-red-800",
			Natation: "bg-cyan-100 text-cyan-800",
			Gymnastique: "bg-purple-100 text-purple-800",
			Judo: "bg-indigo-100 text-indigo-800",
			Danse: "bg-pink-100 text-pink-800",
			Fitness: "bg-emerald-100 text-emerald-800",
		};
		return colors[sportType] || "bg-gray-100 text-gray-800";
	};

	// Use initial data if no search is active and no loading
	const displayRooms = searchTerm || loading ? rooms : initialRooms;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Salles du complexe</CardTitle>
				<CardDescription>
					{displayRooms.length} salle{displayRooms.length > 1 ? "s" : ""}{" "}
					trouvée{displayRooms.length > 1 ? "s" : ""}
				</CardDescription>
			</CardHeader>
			<CardContent>
				{/* Barre de recherche */}
				<div className="flex flex-col gap-4 mb-6 md:flex-row">
					<div className="relative flex-1">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Rechercher une salle par nom ou sport..."
							className="pl-8"
							value={searchTerm}
							onChange={(e) => handleSearch(e.target.value)}
						/>
					</div>
					<Button onClick={onCreateClick}>
						<Plus className="w-4 h-4 mr-2" />
						Nouvelle salle
					</Button>
				</div>

				{/* Table */}
				<div className="border rounded-md">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Salle</TableHead>
								<TableHead>Sport</TableHead>
								<TableHead>Type</TableHead>
								<TableHead>Accréditation</TableHead>
								<TableHead>Créée le</TableHead>
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
							) : displayRooms.length > 0 ? (
								displayRooms.map((room) => (
									<TableRow key={room.id}>
										<TableCell>
											<div className="flex items-center">
												<Warehouse className="w-4 h-4 mr-3 text-muted-foreground" />
												<div>
													<div className="font-medium">{room.name}</div>
													<div className="text-sm text-muted-foreground">
														ID: {room.id.slice(0, 8)}...
													</div>
												</div>
											</div>
										</TableCell>
										<TableCell>
											<Badge className={getSportTypeBadgeColor(room.sportType)}>
												{room.sportType}
											</Badge>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												{room.isIndoor ? (
													<>
														<Warehouse className="w-4 h-4 text-blue-600" />
														<span className="text-sm">Intérieure</span>
													</>
												) : (
													<>
														<TreePine className="w-4 h-4 text-green-600" />
														<span className="text-sm">Extérieure</span>
													</>
												)}
											</div>
										</TableCell>
										<TableCell>
											{room.accreditation ? (
												<div className="text-sm">{room.accreditation}</div>
											) : (
												<span className="text-muted-foreground text-sm">
													Aucune
												</span>
											)}
										</TableCell>
										<TableCell>
											<div className="flex items-center text-sm text-muted-foreground">
												<Calendar className="w-3 h-3 mr-1" />
												{formatDate(room.createdAt)}
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
													<DropdownMenuItem>Voir les détails</DropdownMenuItem>
													<DropdownMenuItem onClick={() => onEditClick?.(room)}>
														Modifier
													</DropdownMenuItem>
													<DropdownMenuItem>Voir le planning</DropdownMenuItem>
													<DropdownMenuSeparator />
													<DropdownMenuItem
														className="text-red-600"
														onClick={() => handleDelete(room)}
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
												Aucune salle trouvée
											</h3>
											<p className="text-gray-500 mb-4">
												{searchTerm
													? "Aucune salle ne correspond à votre recherche."
													: "Commencez par créer votre première salle."}
											</p>
										</div>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
}

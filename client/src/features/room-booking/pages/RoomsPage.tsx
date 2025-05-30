import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type { Room } from "@room-booking/hooks/useRooms";
import { Link } from "@tanstack/react-router";
import {
	CalendarDays,
	Filter,
	LayoutList,
	Plus,
	Search,
	Warehouse,
	XCircle,
	// @ts-ignore
} from "lucide-react";
import { useMemo, useState } from "react";

interface RoomsPageProps {
	initialRooms?: Room[];
}

export function RoomsPage({ initialRooms = [] }: RoomsPageProps) {
	const [search, setSearch] = useState("");
	const [filterType, setFilterType] = useState<string>("all");

	const filteredRooms = useMemo(() => {
		return initialRooms.filter((room) => {
			const matchesSearch = room.name
				.toLowerCase()
				.includes(search.toLowerCase());
			const matchesType =
				filterType === "all" ||
				(filterType === "true" && room.isIndoor) ||
				(filterType === "false" && !room.isIndoor);
			return matchesSearch && matchesType;
		});
	}, [search, filterType, initialRooms]);

	const totalRooms = initialRooms.length;
	const totalIndoor = initialRooms.filter((r) => r.isIndoor).length;
	const totalOutdoor = totalRooms - totalIndoor;

	return (
		<div className="space-y-6">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Toutes les salles
					</h1>
					<p className="text-muted-foreground">
						Liste de toutes les salles enregistrées dans les complexes
					</p>
				</div>
				<Button asChild>
					<Link to="/admin/facilities/complexes">
						<Plus className="w-4 h-4 mr-2" /> Nouvelle salle
					</Link>
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Filtres</CardTitle>
					<CardDescription>
						Recherchez et filtrez les salles par type ou nom
					</CardDescription>
				</CardHeader>
				<CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="relative">
						<Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
						<Input
							placeholder="Rechercher par nom..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="pl-8"
						/>
					</div>
					<Select onValueChange={setFilterType} defaultValue={filterType}>
						<SelectTrigger>
							<Filter className="mr-2 h-4 w-4" /> Type de salle
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">Tous</SelectItem>
							<SelectItem value="true">Intérieur</SelectItem>
							<SelectItem value="false">Extérieur</SelectItem>
						</SelectContent>
					</Select>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Statistiques des salles</CardTitle>
					<CardDescription>
						Vue globale de toutes les salles enregistrées
					</CardDescription>
				</CardHeader>
				<CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="flex items-center space-x-3">
						<Warehouse className="w-6 h-6 text-muted-foreground" />
						<div>
							<p className="text-sm text-muted-foreground">Total</p>
							<p className="font-semibold text-lg">{totalRooms}</p>
						</div>
					</div>
					<div className="flex items-center space-x-3">
						<LayoutList className="w-6 h-6 text-muted-foreground" />
						<div>
							<p className="text-sm text-muted-foreground">Intérieures</p>
							<p className="font-semibold text-lg">{totalIndoor}</p>
						</div>
					</div>
					<div className="flex items-center space-x-3">
						<CalendarDays className="w-6 h-6 text-muted-foreground" />
						<div>
							<p className="text-sm text-muted-foreground">Extérieures</p>
							<p className="font-semibold text-lg">{totalOutdoor}</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<Separator />

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{filteredRooms.length === 0 && (
					<Alert variant="destructive" className="col-span-full">
						<XCircle className="w-5 h-5" />
						<AlertTitle>Aucune salle trouvée</AlertTitle>
						<AlertDescription>
							Aucun résultat ne correspond aux filtres ou à la recherche
							actuelle.
						</AlertDescription>
					</Alert>
				)}

				{filteredRooms.map((room) => (
					<Link to='/admin/facilities/rooms/$roomId' 
						params={{ roomId: room.id }} key={room.id}
					>
					
						<Card
							key={room.id}
							className="cursor-pointer hover:shadow-lg transition-shadow"
						>
							<CardHeader>
								<CardTitle className="flex items-center justify-between">
									{room.name}
									<Badge variant="outline">
										{room.isIndoor ? "Intérieur" : "Extérieur"}
									</Badge>
								</CardTitle>
								<CardDescription className="text-xs text-muted-foreground">
									{room.sportType || "Sport non précisé"}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									{"Aucune description fournie."}
								</p>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoomForm } from "@room-booking/components/rooms/RoomForm";
import { RoomsList } from "@room-booking/components/rooms/RoomsList";
import type { Complex } from "@room-booking/hooks/useComplexes";
import type { Room } from "@room-booking/hooks/useRooms";
import { useNavigate } from "@tanstack/react-router";
import {
	Accessibility,
	ArrowLeft,
	BarChart3,
	Building,
	Calendar,
	Car,
	Edit,
	MapPin,
	TreePine,
	Users,
	Warehouse,
} from "lucide-react";
import { useState } from "react";

type ViewMode =
	| "overview"
	| "rooms"
	| "create-room"
	| "edit-room"
	| "planning"
	| "stats";

interface ComplexDetailsPageProps {
	complex: Complex;
	initialRooms: Room[];
}

export function ComplexDetailsPage({
	complex,
	initialRooms,
}: ComplexDetailsPageProps) {
	const navigate = useNavigate();
	const [currentView, setCurrentView] = useState<ViewMode>("overview");
	const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("fr-FR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const handleBack = () => {
		navigate({ to: "/facilities/complexes" });
	};

	const handleEdit = () => {
		navigate({ to: `/facilities/complexes/${complex.id}/edit` });
	};

	const handleCreateRoom = () => {
		setSelectedRoom(null);
		setCurrentView("create-room");
	};

	const handleEditRoom = (room: Room) => {
		setSelectedRoom(room);
		setCurrentView("edit-room");
	};

	const handleRoomFormSuccess = () => {
		setCurrentView("rooms");
		setSelectedRoom(null);
	};

	const handleRoomFormCancel = () => {
		setCurrentView("rooms");
		setSelectedRoom(null);
	};

	// Calculer les statistiques des salles
	const totalRooms = initialRooms.length;
	const indoorRooms = initialRooms.filter((room) => room.isIndoor).length;
	const outdoorRooms = totalRooms - indoorRooms;
	const accreditedRooms = initialRooms.filter(
		(room) => room.accreditation && room.accreditation.trim() !== "",
	).length;
	const roomsBySport = initialRooms.reduce(
		(acc, room) => {
			acc[room.sportType] = (acc[room.sportType] || 0) + 1;
			return acc;
		},
		{} as Record<string, number>,
	);

	if (currentView === "create-room") {
		return (
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">
							Nouvelle salle
						</h1>
						<p className="text-muted-foreground">
							Ajouter une nouvelle salle au complexe {complex.name}
						</p>
					</div>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setCurrentView("rooms")}
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Retour aux salles
					</Button>
				</div>
				<RoomForm
					complexId={complex.id}
					onSuccess={handleRoomFormSuccess}
					onCancel={handleRoomFormCancel}
				/>
			</div>
		);
	}

	if (currentView === "edit-room" && selectedRoom) {
		return (
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">
							Modifier la salle
						</h1>
						<p className="text-muted-foreground">
							Modifier les informations de {selectedRoom.name}
						</p>
					</div>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setCurrentView("rooms")}
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Retour aux salles
					</Button>
				</div>
				<RoomForm
					complexId={complex.id}
					room={selectedRoom}
					onSuccess={handleRoomFormSuccess}
					onCancel={handleRoomFormCancel}
				/>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* En-tête */}
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">{complex.name}</h1>
					<p className="text-muted-foreground">
						Détails et gestion du complexe sportif
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm" onClick={handleBack}>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Retour à la liste
					</Button>
					<Button onClick={handleEdit}>
						<Edit className="w-4 h-4 mr-2" />
						Modifier
					</Button>
				</div>
			</div>

			{/* Informations principales */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Salles</CardTitle>
						<Building className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{totalRooms}</div>
						<p className="text-xs text-muted-foreground">
							{indoorRooms} intérieures • {outdoorRooms} extérieures
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">
							Accréditations
						</CardTitle>
						<Users className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{accreditedRooms}</div>
						<p className="text-xs text-muted-foreground">Salles certifiées</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Parking</CardTitle>
						<Car className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{complex.parkingCapacity}</div>
						<p className="text-xs text-muted-foreground">Places disponibles</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Accessibilité</CardTitle>
						<Accessibility className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{complex.numberOfElevators}
						</div>
						<p className="text-xs text-muted-foreground">
							Ascenseurs •{" "}
							{complex.accessibleForReducedMobility ? "PMR ✓" : "Standard"}
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Onglets */}
			<Tabs
				value={currentView}
				onValueChange={(value) => setCurrentView(value as ViewMode)}
				className="space-y-4"
			>
				<TabsList>
					<TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
					<TabsTrigger value="rooms">Salles ({totalRooms})</TabsTrigger>
					<TabsTrigger value="planning">Planning</TabsTrigger>
					<TabsTrigger value="stats">Statistiques</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						{/* Informations du complexe */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									Informations du complexe
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-start gap-3">
									<MapPin className="w-4 h-4 mt-1 text-muted-foreground" />
									<div>
										<p className="font-medium">{complex.street}</p>
										<p className="text-sm text-muted-foreground">
											{complex.city} {complex.postalCode}
										</p>
									</div>
								</div>

								<div className="flex items-center gap-3">
									<Car className="w-4 h-4 text-muted-foreground" />
									<span className="text-sm">
										{complex.parkingCapacity > 0
											? `${complex.parkingCapacity} places de parking`
											: "Pas de parking"}
									</span>
								</div>

								<div className="flex items-center gap-3">
									<Accessibility className="w-4 h-4 text-muted-foreground" />
									<div className="flex items-center gap-2">
										<span className="text-sm">
											{complex.numberOfElevators > 0
												? `${complex.numberOfElevators} ascenseur${complex.numberOfElevators > 1 ? "s" : ""}`
												: "Pas d'ascenseur"}
										</span>
										<Badge
											variant={
												complex.accessibleForReducedMobility
													? "default"
													: "secondary"
											}
											className={
												complex.accessibleForReducedMobility
													? "bg-green-100 text-green-800"
													: ""
											}
										>
											{complex.accessibleForReducedMobility
												? "PMR"
												: "Standard"}
										</Badge>
									</div>
								</div>

								<div className="flex items-center gap-3">
									<Calendar className="w-4 h-4 text-muted-foreground" />
									<span className="text-sm">
										Créé le {formatDate(complex.createdAt)}
									</span>
								</div>
							</CardContent>
						</Card>

						{/* Répartition des salles par sport */}
						<Card>
							<CardHeader>
								<CardTitle>Répartition des salles</CardTitle>
								<CardDescription>
									Sports pratiqués dans ce complexe
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{Object.entries(roomsBySport).map(([sport, count]) => (
										<div
											key={sport}
											className="flex items-center justify-between"
										>
											<span className="text-sm font-medium">{sport}</span>
											<Badge variant="outline">{count}</Badge>
										</div>
									))}
									{Object.keys(roomsBySport).length === 0 && (
										<p className="text-sm text-muted-foreground text-center py-4">
											Aucune salle configurée
										</p>
									)}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Types de salles */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								Types de salles
							</CardTitle>
							<CardDescription>Répartition intérieur/extérieur</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-4 md:grid-cols-2">
								<div className="flex items-center gap-3 p-4 border rounded-lg">
									<Warehouse className="w-8 h-8 text-blue-600" />
									<div>
										<p className="font-medium">Salles intérieures</p>
										<p className="text-2xl font-bold">{indoorRooms}</p>
									</div>
								</div>
								<div className="flex items-center gap-3 p-4 border rounded-lg">
									<TreePine className="w-8 h-8 text-green-600" />
									<div>
										<p className="font-medium">Terrains extérieurs</p>
										<p className="text-2xl font-bold">{outdoorRooms}</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Activité récente */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								Activité récente
							</CardTitle>
							<CardDescription>
								Dernières actions sur ce complexe
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="flex items-center gap-3">
									<div className="w-2 h-2 rounded-full bg-green-500" />
									<div className="flex-1">
										<p className="text-sm font-medium">Complexe créé</p>
										<p className="text-xs text-muted-foreground">
											{formatDate(complex.createdAt)}
										</p>
									</div>
								</div>
								{complex.updatedAt !== complex.createdAt && (
									<div className="flex items-center gap-3">
										<div className="w-2 h-2 rounded-full bg-blue-500" />
										<div className="flex-1">
											<p className="text-sm font-medium">
												Dernière modification
											</p>
											<p className="text-xs text-muted-foreground">
												{formatDate(complex.updatedAt)}
											</p>
										</div>
									</div>
								)}
								{totalRooms > 0 && (
									<div className="flex items-center gap-3">
										<div className="w-2 h-2 rounded-full bg-purple-500" />
										<div className="flex-1">
											<p className="text-sm font-medium">
												{totalRooms} salle{totalRooms > 1 ? "s" : ""} configurée
												{totalRooms > 1 ? "s" : ""}
											</p>
											<p className="text-xs text-muted-foreground">
												Prêt pour les réservations
											</p>
										</div>
									</div>
								)}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="rooms" className="space-y-4">
					<RoomsList
						complexId={complex.id}
						initialRooms={initialRooms}
						onCreateClick={handleCreateRoom}
						onEditClick={handleEditRoom}
					/>
				</TabsContent>

				<TabsContent value="planning" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Planning du complexe</CardTitle>
							<CardDescription>
								Calendrier des réservations et événements
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[400px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
								<Calendar className="w-12 h-12 text-gray-400" />
								<span className="ml-2 text-gray-500">
									Planning à implémenter
								</span>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="stats" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Statistiques d'utilisation</CardTitle>
							<CardDescription>
								Analyses et métriques du complexe
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[400px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
								<BarChart3 className="w-12 h-12 text-gray-400" />
								<span className="ml-2 text-gray-500">
									Statistiques à implémenter
								</span>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}

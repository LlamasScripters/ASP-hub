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
import { RoomsList } from "@room-booking/components/rooms/RoomsList";
import { frenchDays } from "@room-booking/hooks/useComplexes";
import type { Complex, OpeningHours } from "@room-booking/hooks/useComplexes";
import type { Room } from "@room-booking/hooks/useRooms";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
	Accessibility,
	ArrowLeft,
	BarChart3,
	Building,
	Calendar,
	Car,
	Edit,
	MapPin,
	Timer,
	TreePine,
	Users,
	Warehouse,
	//@ts-ignore
} from "lucide-react";
import { useEffect, useState } from "react";

type ViewMode = "overview" | "rooms" | "planning" | "stats";

interface ComplexDetailsPageProps {
	complex: Complex & { openingHours: OpeningHours };
	initialRooms: Room[];
}

export function ComplexDetailsPage({
	complex,
	initialRooms,
}: ComplexDetailsPageProps) {
	const search = useSearch({ strict: false });
	const navigate = useNavigate();
	// @ts-ignore
	const initialViewFromUrl = (search.view as ViewMode) ?? "overview";

	const [currentView, setCurrentView] = useState<ViewMode>(initialViewFromUrl);

	useEffect(() => {
		setCurrentView(initialViewFromUrl);
	}, [initialViewFromUrl]);

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("fr-FR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

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

	return (
		<div className="space-y-6">
			{/* En-tête */}
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">{complex.name}</h1>
					<p className="text-muted-foreground">{complex.description}</p>
				</div>
				<div className="flex items-center gap-2">
					<Button asChild variant="outline" size="sm">
						<Link
							to="/admin/facilities/complexes"
							search={{ view: "complexes" }}
						>
							<ArrowLeft className="w-4 h-4 mr-2" />
							Retour à la liste
						</Link>
					</Button>

					<Button asChild>
						<Link
							to="/admin/facilities/complexes/$complexId/edit"
							params={{ complexId: complex.id }}
						>
							<Edit className="w-4 h-4 mr-2" />
							Modifier
						</Link>
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

			{/* Horaires d'ouverture */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Timer className="w-4 h-4" />
						Horaires d'ouverture
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid gap-2 md:grid-cols-2 lg:grid-cols-7">
						{[
							"monday",
							"tuesday",
							"wednesday",
							"thursday",
							"friday",
							"saturday",
							"sunday",
						].map((dayKey) => {
							const dayData =
								complex.openingHours[
									dayKey as keyof typeof complex.openingHours
								];
							return (
								<div
									key={dayKey}
									className="flex flex-col items-center p-3 border rounded-lg"
								>
									<span className="text-sm font-medium mb-1">
										{frenchDays[dayKey as keyof typeof frenchDays]}
									</span>
									<span className="text-sm text-muted-foreground text-center">
										{dayData?.closed
											? "Fermé"
											: `${dayData?.open} - ${dayData?.close}`}
									</span>
								</div>
							);
						})}
					</div>
					<p className="text-xs text-muted-foreground mt-4 text-center">
						{Object.values(complex.openingHours).some(
							(dayData) => dayData?.closed,
						)
							? "Le complexe est fermé certains jours"
							: "Ouvert tous les jours"}
					</p>
				</CardContent>
			</Card>

			{/* Onglets */}
			<Tabs
				value={currentView}
				onValueChange={(value) => {
					setCurrentView(value as ViewMode);
					// @ts-ignore
					navigate({ search: (prev) => ({ ...prev, view: value }) });
				}}
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
					<RoomsList complexId={complex.id} initialRooms={initialRooms} />
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
							<div className="h-[400px] flex items-center justify-center bg-muted text-muted-foreground rounded-md">
								<Calendar className="w-12 h-12" />
								<span className="ml-2">
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
							<div className="h-[400px] flex items-center justify-center bg-muted text-muted-foreground rounded-md">
								<BarChart3 className="w-12 h-12" />
								<span className="ml-2">
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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComplexList } from "@room-booking/components/complexes/ComplexList";
import {
	useComplexStats,
	useComplexes,
} from "@room-booking/hooks/useComplexes";
import type { Complex } from "@room-booking/hooks/useComplexes";
import {
	Activity,
	AlertCircle,
	BarChart3,
	Building,
	Calendar,
	CheckCircle,
	Clock,
	Plus,
	RefreshCw,
	TrendingUp,
	Users,
	//@ts-ignore
} from "lucide-react";
import { useState } from "react";

type ViewMode = "overview" | "list" | "create" | "edit" | "stats" | "planning";

interface ComplexesPageProps {
	initialView?: ViewMode;
	initialComplexes?: Complex[];
}

export function ComplexesPage({
	initialView = "overview",
	initialComplexes = [],
}: ComplexesPageProps) {
	const [currentView, setCurrentView] = useState<ViewMode>(initialView);
	const [selectedComplex, setSelectedComplex] = useState<Complex | null>(null);

	const { refresh: refreshComplexes } = useComplexes({
		initialData: initialComplexes,
	});
	const {
		stats,
		loading: statsLoading,
		refresh: refreshStats,
	} = useComplexStats();

	// Mock data for recent activities - à remplacer par de vraies données
	const recentActivities = [
		{
			id: "1",
			action: "Nouveau complexe créé",
			complex: "Stade Pierre Dupont",
			date: "Il y a 2 heures",
			type: "create",
		},
		{
			id: "2",
			action: "Maintenance programmée",
			complex: "Gymnase Central",
			date: "Il y a 4 heures",
			type: "maintenance",
		},
		{
			id: "3",
			action: "Réservation confirmée",
			complex: "Courts de Tennis",
			date: "Il y a 6 heures",
			type: "booking",
		},
		{
			id: "4",
			action: "Équipement mis à jour",
			complex: "Piscine Municipale",
			date: "Hier",
			type: "update",
		},
	];

	const upcomingEvents = [
		{
			id: "1",
			title: "Maintenance annuelle",
			complex: "Stade Municipal",
			date: "15 juin 2025",
			type: "maintenance",
		},
		{
			id: "2",
			title: "Tournoi de basketball",
			complex: "Gymnase Central",
			date: "20 juin 2025",
			type: "event",
		},
		{
			id: "3",
			title: "Inspection sécurité",
			complex: "Piscine Municipale",
			date: "25 juin 2025",
			type: "inspection",
		},
	];

	const handleRefresh = async () => {
		await Promise.all([refreshComplexes(), refreshStats()]);
	};

	const getActionIcon = (type: string) => {
		switch (type) {
			case "create":
				return <Plus className="w-4 h-4 text-green-600" />;
			case "maintenance":
				return <AlertCircle className="w-4 h-4 text-orange-600" />;
			case "booking":
				return <CheckCircle className="w-4 h-4 text-blue-600" />;
			case "update":
				return <RefreshCw className="w-4 h-4 text-purple-600" />;
			default:
				return <Activity className="w-4 h-4 text-gray-600" />;
		}
	};

	const getEventBadge = (type: string) => {
		switch (type) {
			case "maintenance":
				return (
					<Badge
						variant="outline"
						className="text-orange-600 border-orange-600"
					>
						Maintenance
					</Badge>
				);
			case "event":
				return <Badge className="bg-blue-600">Événement</Badge>;
			case "inspection":
				return (
					<Badge
						variant="outline"
						className="text-purple-600 border-purple-600"
					>
						Inspection
					</Badge>
				);
			default:
				return <Badge variant="outline">Autre</Badge>;
		}
	};

	// Calculer les stats à partir des données initiales
	const totalComplexes = initialComplexes.length;
	const accessibleComplexes = initialComplexes.filter(
		(c) => c.accessibleForReducedMobility,
	).length;
	const totalParkingCapacity = initialComplexes.reduce(
		(sum, c) => sum + c.parkingCapacity,
		0,
	);
	const totalElevators = initialComplexes.reduce(
		(sum, c) => sum + c.numberOfElevators,
		0,
	);

	return (
		<div className="space-y-6">
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Installations sportives
					</h1>
					<p className="text-muted-foreground">
						Gérez les complexes et installations sportives de l'association
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						className="h-9"
						onClick={handleRefresh}
					>
						<RefreshCw className="w-4 h-4 mr-2" />
						Actualiser
					</Button>
				</div>
			</div>

			{/* Statistiques principales */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">
							Total Complexes
						</CardTitle>
						<Building className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{totalComplexes}</div>
						<p className="text-xs text-muted-foreground">
							{accessibleComplexes} accessibles PMR
						</p>
						<div className="mt-4">
							<Progress
								value={
									totalComplexes > 0
										? (accessibleComplexes / totalComplexes) * 100
										: 0
								}
								className="h-2"
							/>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">
							Places de Parking
						</CardTitle>
						<Users className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{totalParkingCapacity}</div>
						<p className="text-xs text-muted-foreground">
							Réparties sur {totalComplexes} complexes
						</p>
						<div className="mt-4">
							<Progress value={85} className="h-2" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Ascenseurs</CardTitle>
						<TrendingUp className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{totalElevators}</div>
						<p className="text-xs text-muted-foreground">
							Total dans tous les complexes
						</p>
						<div className="mt-4">
							<Progress value={78} className="h-2" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">
							Événements à venir
						</CardTitle>
						<Calendar className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{upcomingEvents.length}</div>
						<p className="text-xs text-muted-foreground">
							Prochain événement dans 3 jours
						</p>
						<div className="mt-4">
							<Progress value={60} className="h-2" />
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Onglets principaux */}
			<Tabs defaultValue="overview" className="space-y-4">
				<TabsList>
					<TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
					<TabsTrigger value="complexes">Tous les complexes</TabsTrigger>
					<TabsTrigger value="statistics">Statistiques</TabsTrigger>
					<TabsTrigger value="planning">Planning</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						{/* Graphique d'utilisation */}
						<Card className="lg:col-span-4">
							<CardHeader>
								<CardTitle>Utilisation des complexes</CardTitle>
								<CardDescription>Taux d'occupation par mois</CardDescription>
							</CardHeader>
							<CardContent className="pl-2">
								<div className="h-[300px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
									<BarChart3 className="w-12 h-12 text-gray-400" />
									<span className="ml-2 text-gray-500">
										Graphique d'utilisation
									</span>
								</div>
							</CardContent>
						</Card>

						{/* Événements à venir */}
						<Card className="lg:col-span-3">
							<CardHeader>
								<CardTitle>Événements à venir</CardTitle>
								<CardDescription>
									Prochains événements dans les complexes
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{upcomingEvents.map((event) => (
										<div key={event.id} className="flex items-center">
											<div className="w-2 h-2 mr-2 rounded-full bg-emerald-500" />
											<div className="flex-1 space-y-1">
												<p className="text-sm font-medium leading-none">
													{event.title}
												</p>
												<p className="text-sm text-muted-foreground">
													{event.date} - {event.complex}
												</p>
											</div>
											{getEventBadge(event.type)}
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{/* Activité récente */}
						<Card>
							<CardHeader>
								<CardTitle>Activité récente</CardTitle>
								<CardDescription>
									Dernières actions sur les complexes
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{recentActivities.map((activity) => (
										<div key={activity.id} className="flex items-center">
											<div className="mr-3">{getActionIcon(activity.type)}</div>
											<div className="flex-1 space-y-1">
												<p className="text-sm font-medium leading-none">
													{activity.action}
												</p>
												<p className="text-sm text-muted-foreground">
													{activity.complex}
												</p>
											</div>
											<div className="text-sm text-muted-foreground">
												{activity.date}
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Répartition par ville */}
						<Card>
							<CardHeader>
								<CardTitle>Répartition par ville</CardTitle>
								<CardDescription>
									Distribution des complexes par ville
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{Object.entries(
										initialComplexes.reduce(
											(acc, complex) => {
												acc[complex.city] = (acc[complex.city] || 0) + 1;
												return acc;
											},
											{} as Record<string, number>,
										),
									).map(([city, count]) => (
										<div key={city} className="space-y-2">
											<div className="flex items-center justify-between">
												<div className="text-sm font-medium">{city}</div>
												<div className="text-sm text-muted-foreground">
													{count}
												</div>
											</div>
											<Progress
												value={
													totalComplexes > 0
														? (count / totalComplexes) * 100
														: 0
												}
												className="h-2"
											/>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Maintenance et alertes */}
						<Card>
							<CardHeader>
								<CardTitle>Maintenance et alertes</CardTitle>
								<CardDescription>
									État de maintenance des installations
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div className="space-y-1">
											<p className="text-sm font-medium leading-none">
												Maintenance préventive
											</p>
											<p className="text-sm text-muted-foreground">
												3 complexes programmés
											</p>
										</div>
										<Badge
											variant="outline"
											className="text-orange-600 border-orange-600"
										>
											<Clock className="w-3 h-3 mr-1" />
											En attente
										</Badge>
									</div>
									<div className="flex items-center justify-between">
										<div className="space-y-1">
											<p className="text-sm font-medium leading-none">
												Inspections sécurité
											</p>
											<p className="text-sm text-muted-foreground">
												Toutes à jour
											</p>
										</div>
										<Badge className="bg-green-600">
											<CheckCircle className="w-3 h-3 mr-1" />
											OK
										</Badge>
									</div>
									<div className="flex items-center justify-between">
										<div className="space-y-1">
											<p className="text-sm font-medium leading-none">
												Équipements défaillants
											</p>
											<p className="text-sm text-muted-foreground">
												1 signalement
											</p>
										</div>
										<Badge variant="destructive">
											<AlertCircle className="w-3 h-3 mr-1" />
											Urgent
										</Badge>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="complexes" className="space-y-4">
					<ComplexList
						initialComplexes={initialComplexes}
					/>
				</TabsContent>

				<TabsContent value="statistics" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Statistiques détaillées</CardTitle>
							<CardDescription>
								Analyses approfondies de l'utilisation des complexes
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[400px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
								<BarChart3 className="w-12 h-12 text-gray-400" />
								<span className="ml-2 text-gray-500">
									Graphiques statistiques détaillés
								</span>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="planning" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Planning des installations</CardTitle>
							<CardDescription>
								Calendrier d'occupation et de réservation
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[400px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
								<Calendar className="w-12 h-12 text-gray-400" />
								<span className="ml-2 text-gray-500">
									Calendrier de planning
								</span>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}

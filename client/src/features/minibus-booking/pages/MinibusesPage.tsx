import { useState, useEffect } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import type { Minibus } from "@/features/minibus-booking/hooks/useMinibuses";
import { MinibusesList } from "@/features/minibus-booking/components/minibuses/MinibusesList";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Activity,
	AlertCircle,
	BarChart3,
	Bus,
	Calendar,
	CheckCircle,
	Clock,
	Plus,
	RefreshCw,
	UserCheck,
	Users,
	// @ts-ignore
} from "lucide-react";

type ViewMode = "overview" | "minibuses" | "planning";

interface MinibusesPageProps {
	initialMinibuses?: Minibus[];
}

export function MinibusesPage({ initialMinibuses = [] }: MinibusesPageProps) {
	const search = useSearch({ strict: false });
	const navigate = useNavigate();
	// @ts-ignore
	const initialViewFromUrl = (search.view as ViewMode) ?? "overview";

	const [currentView, setCurrentView] = useState<ViewMode>(initialViewFromUrl);

	useEffect(() => {
		setCurrentView(initialViewFromUrl);
	}, [initialViewFromUrl]);

	// Mock data for recent activities - à remplacer par de vraies données
	const recentActivities = [
		{
			id: "1",
			action: "Nouveau minibus ajouté",
			minibus: "Minibus Sportif A",
			date: "Il y a 1 heure",
			type: "create",
		},
		{
			id: "2",
			action: "Maintenance programmée",
			minibus: "Bus Équipe Pro",
			date: "Il y a 3 heures",
			type: "maintenance",
		},
		{
			id: "3",
			action: "Réservation confirmée",
			minibus: "Minibus Jeunes",
			date: "Il y a 5 heures",
			type: "booking",
		},
		{
			id: "4",
			action: "Contrôle technique effectué",
			minibus: "Bus Transport",
			date: "Hier",
			type: "update",
		},
	];

	const upcomingEvents = [
		{
			id: "1",
			title: "Révision générale",
			minibus: "Minibus Sportif A",
			date: "28 juin 2025",
			type: "maintenance",
		},
		{
			id: "2",
			title: "Déplacement championnat",
			minibus: "Bus Équipe Pro",
			date: "2 juillet 2025",
			type: "event",
		},
		{
			id: "3",
			title: "Contrôle technique",
			minibus: "Minibus Jeunes",
			date: "8 juillet 2025",
			type: "inspection",
		},
	];

	const handleRefresh = async () => {
		// Implement refresh logic or remove if not needed
		window.location.reload();
	};

	const handleCreate = () => {
		navigate({ to: "/admin/assets/minibuses/create" });
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
	const totalMinibuses = initialMinibuses.length;
	const totalAvailable = initialMinibuses.filter((m) => m.isAvailable).length;
	const totalUnavailable = totalMinibuses - totalAvailable;
	const totalCapacity = initialMinibuses.reduce((sum, m) => sum + m.capacity, 0);
	const totalDisabledCapacity = initialMinibuses.reduce((sum, m) => sum + m.disabledPersonCapacity, 0);

	return (
		<div className="space-y-6">
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Flotte de minibus
					</h1>
					<p className="text-muted-foreground">
						Gérez les minibus de l'association
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
							Total Minibus
						</CardTitle>
						<Bus className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{totalMinibuses}</div>
						<p className="text-xs text-muted-foreground">
							{totalAvailable} disponibles
						</p>
						<div className="mt-4">
							<Progress
								value={
									totalMinibuses > 0
										? (totalAvailable / totalMinibuses) * 100
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
							Capacité Totale
						</CardTitle>
						<Users className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{totalCapacity}</div>
						<p className="text-xs text-muted-foreground">
							places passagers
						</p>
						<div className="mt-4">
							<Progress value={
								totalCapacity > 0
									? (totalAvailable / totalCapacity) * 100
									: 0
							} className="h-2" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Places PMR</CardTitle>
						<UserCheck className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{totalDisabledCapacity}</div>
						<p className="text-xs text-muted-foreground">
							personnes à mobilité réduite
						</p>
						<div className="mt-4">
							<Progress value={
								totalDisabledCapacity > 0
									? (totalDisabledCapacity / totalCapacity) * 100
									: 0
							} className="h-2" />
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
							Prochain événement dans 4 jours
						</p>
						<div className="mt-4">
							<Progress value={
								upcomingEvents.length > 0
									? (upcomingEvents.length / 10) * 100 // Juste un exemple de calcul
									: 0
							} className="h-2" />
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Onglets principaux */}
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
					<TabsTrigger value="minibuses">Tous les minibus</TabsTrigger>
					<TabsTrigger value="planning">Planning</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						{/* Graphique d'utilisation */}
						<Card className="lg:col-span-4">
							<CardHeader>
								<CardTitle>Utilisation des minibus</CardTitle>
								<CardDescription>Taux d'occupation par mois</CardDescription>
							</CardHeader>
							<CardContent className="pl-2">
								<div className="h-[300px] flex items-center justify-center bg-muted text-muted-foreground rounded-md">
									<BarChart3 className="w-12 h-12" />
									<span className="ml-2">
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
									Prochains événements pour les minibus
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
													{event.date} - {event.minibus}
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
									Dernières actions sur les minibus
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
													{activity.minibus}
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

						{/* État de la flotte */}
						<Card>
							<CardHeader>
								<CardTitle>État de la flotte</CardTitle>
								<CardDescription>
									Statut opérationnel des véhicules
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<div className="text-sm font-medium">Disponibles</div>
											<div className="text-sm text-muted-foreground">
												{totalAvailable}
											</div>
										</div>
										<Progress
											value={
												totalMinibuses > 0
													? (totalAvailable / totalMinibuses) * 100
													: 0
											}
											className="h-2"
										/>
									</div>
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<div className="text-sm font-medium">Indisponibles</div>
											<div className="text-sm text-muted-foreground">
												{totalUnavailable}
											</div>
										</div>
										<Progress
											value={
												totalMinibuses > 0
													? (totalUnavailable / totalMinibuses) * 100
													: 0
											}
											className="h-2"
										/>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Maintenance et alertes */}
						<Card>
							<CardHeader>
								<CardTitle>Maintenance et alertes</CardTitle>
								<CardDescription>
									État de maintenance des minibus
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
												2 minibus programmés
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
												Contrôles techniques
											</p>
											<p className="text-sm text-muted-foreground">
												Tous à jour
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
												Réparations urgentes
											</p>
											<p className="text-sm text-muted-foreground">
												Aucune
											</p>
										</div>
										<Badge className="bg-green-600">
											<CheckCircle className="w-3 h-3 mr-1" />
											OK
										</Badge>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="minibuses" className="space-y-4">
					<MinibusesList initialMinibuses={initialMinibuses} />
				</TabsContent>

				<TabsContent value="planning" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Planning des minibus</CardTitle>
							<CardDescription>
								Calendrier de réservation et maintenance
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[400px] flex items-center justify-center bg-muted text-muted-foreground rounded-md">
								<Calendar className="w-12 h-12 text-muted-foreground" />
								<span className="ml-2 text-muted-foreground">
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

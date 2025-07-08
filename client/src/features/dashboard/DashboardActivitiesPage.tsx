import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Label } from "@/components/ui/label";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fr } from "date-fns/locale";
import {
	CalendarDays,
	Clock,
	Filter,
	MapPin,
	MoreHorizontal,
	Plus,
	Users,
} from "lucide-react";
import { useState } from "react";

// Données fictives pour les activités
const activities = [
	{
		id: crypto.randomUUID(),
		name: "Entraînement de football",
		type: "Entraînement",
		category: "Football",
		date: "15/05/2025",
		time: "18:00 - 20:00",
		location: "Stade municipal",
		coach: "Alexandre Dupont",
		participants: 18,
		maxParticipants: 22,
	},
	{
		id: crypto.randomUUID(),
		name: "Match de basketball",
		type: "Compétition",
		category: "Basketball",
		date: "17/05/2025",
		time: "14:00 - 16:00",
		location: "Gymnase central",
		coach: "Marie Leroy",
		participants: 12,
		maxParticipants: 12,
	},
	{
		id: crypto.randomUUID(),
		name: "Cours de natation débutants",
		type: "Cours",
		category: "Natation",
		date: "18/05/2025",
		time: "10:00 - 11:30",
		location: "Piscine municipale",
		coach: "Thomas Martin",
		participants: 8,
		maxParticipants: 10,
	},
	{
		id: crypto.randomUUID(),
		name: "Tournoi de tennis",
		type: "Compétition",
		category: "Tennis",
		date: "20/05/2025",
		time: "09:00 - 18:00",
		location: "Courts de tennis",
		coach: "Sophie Dubois",
		participants: 16,
		maxParticipants: 16,
	},
	{
		id: crypto.randomUUID(),
		name: "Cours de danse moderne",
		type: "Cours",
		category: "Danse",
		date: "21/05/2025",
		time: "17:30 - 19:00",
		location: "Salle polyvalente",
		coach: "Julie Moreau",
		participants: 12,
		maxParticipants: 15,
	},
	{
		id: crypto.randomUUID(),
		name: "Entraînement de judo",
		type: "Entraînement",
		category: "Judo",
		date: "22/05/2025",
		time: "18:30 - 20:30",
		location: "Dojo municipal",
		coach: "David Bernard",
		participants: 14,
		maxParticipants: 20,
	},
	{
		id: crypto.randomUUID(),
		name: "Compétition de gymnastique",
		type: "Compétition",
		category: "Gymnastique",
		date: "25/05/2025",
		time: "13:00 - 17:00",
		location: "Gymnase central",
		coach: "Nathalie Petit",
		participants: 20,
		maxParticipants: 25,
	},
	{
		id: crypto.randomUUID(),
		name: "Entraînement d'athlétisme",
		type: "Entraînement",
		category: "Athlétisme",
		date: "26/05/2025",
		time: "17:00 - 19:00",
		location: "Piste d'athlétisme",
		coach: "Pierre Lefebvre",
		participants: 15,
		maxParticipants: 25,
	},
];

// Données fictives pour les installations
const facilities = [
	{
		id: crypto.randomUUID(),
		name: "Stade municipal",
		type: "Terrain extérieur",
		capacity: 500,
		address: "12 rue du Sport, 93380 Pierrefitte-sur-Seine",
		availability: "Lundi-Dimanche, 8h-22h",
	},
	{
		id: crypto.randomUUID(),
		name: "Gymnase central",
		type: "Salle intérieure",
		capacity: 200,
		address: "5 avenue des Jeux, 93380 Pierrefitte-sur-Seine",
		availability: "Lundi-Samedi, 9h-21h",
	},
	{
		id: crypto.randomUUID(),
		name: "Piscine municipale",
		type: "Piscine",
		capacity: 100,
		address: "8 rue de la Natation, 93380 Pierrefitte-sur-Seine",
		availability: "Mardi-Dimanche, 10h-20h",
	},
	{
		id: crypto.randomUUID(),
		name: "Courts de tennis",
		type: "Terrain extérieur",
		capacity: 50,
		address: "15 allée du Tennis, 93380 Pierrefitte-sur-Seine",
		availability: "Lundi-Dimanche, 8h-21h",
	},
	{
		id: crypto.randomUUID(),
		name: "Salle polyvalente",
		type: "Salle intérieure",
		capacity: 150,
		address: "3 boulevard des Arts, 93380 Pierrefitte-sur-Seine",
		availability: "Lundi-Vendredi, 9h-22h",
	},
];

export default function DashboardActivitiesPage() {
	const [date, setDate] = useState<Date | undefined>(new Date());
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [typeFilter, setTypeFilter] = useState("all");

	// Filtrer les activités
	const filteredActivities = activities.filter((activity) => {
		const matchesCategory =
			categoryFilter === "all" || activity.category === categoryFilter;
		const matchesType = typeFilter === "all" || activity.type === typeFilter;

		return matchesCategory && matchesType;
	});

	// Obtenir les catégories uniques pour le filtre
	const uniqueCategories = Array.from(
		new Set(activities.map((activity) => activity.category)),
	);
	const uniqueTypes = Array.from(
		new Set(activities.map((activity) => activity.type)),
	);

	return (
		<div className="space-y-6">
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Gestion des activités
					</h1>
					<p className="text-muted-foreground">
						Planifiez et gérez les activités sportives et les installations.
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button size="sm" className="h-9">
						<Plus className="w-4 h-4 mr-2" />
						Nouvelle activité
					</Button>
				</div>
			</div>

			<Tabs defaultValue="calendar" className="space-y-4">
				<TabsList>
					<TabsTrigger value="calendar">Calendrier</TabsTrigger>
					<TabsTrigger value="list">Liste des activités</TabsTrigger>
					<TabsTrigger value="facilities">Installations</TabsTrigger>
				</TabsList>

				<TabsContent value="calendar" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-7">
						<Card className="md:col-span-5">
							<CardHeader>
								<CardTitle>Calendrier des activités</CardTitle>
								<CardDescription>
									Vue d'ensemble des activités planifiées
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="p-3">
									<Calendar
										mode="single"
										selected={date}
										onSelect={setDate}
										className="rounded-md border"
										locale={fr}
									/>
								</div>
								<div className="mt-6 space-y-4">
									<h3 className="font-medium">Activités du jour</h3>
									{filteredActivities
										.filter((activity) => activity.date === "15/05/2025") // Simuler la date sélectionnée
										.map((activity) => (
											<div
												key={activity.id}
												className="flex items-center p-3 border rounded-md"
											>
												<div className="flex-1">
													<div className="font-medium">{activity.name}</div>
													<div className="flex items-center mt-1 text-sm text-muted-foreground">
														<Clock className="w-4 h-4 mr-1" />
														{activity.time}
														<MapPin className="w-4 h-4 ml-3 mr-1" />
														{activity.location}
													</div>
												</div>
												<Badge
													variant={
														activity.type === "Compétition"
															? "default"
															: "outline"
													}
												>
													{activity.type}
												</Badge>
											</div>
										))}
								</div>
							</CardContent>
						</Card>
						<Card className="md:col-span-2">
							<CardHeader>
								<CardTitle>Filtres</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label>Catégorie</Label>
									<Select
										value={categoryFilter}
										onValueChange={setCategoryFilter}
									>
										<SelectTrigger>
											<SelectValue placeholder="Toutes les catégories" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">Toutes les catégories</SelectItem>
											{uniqueCategories.map((category) => (
												<SelectItem key={category} value={category}>
													{category}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label>Type</Label>
									<Select value={typeFilter} onValueChange={setTypeFilter}>
										<SelectTrigger>
											<SelectValue placeholder="Tous les types" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">Tous les types</SelectItem>
											{uniqueTypes.map((type) => (
												<SelectItem key={type} value={type}>
													{type}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="pt-4">
									<h3 className="mb-2 text-sm font-medium">
										Coachs disponibles
									</h3>
									<div className="space-y-3">
										{activities.slice(0, 4).map((activity) => (
											<div
												key={activity.id}
												className="flex items-center gap-2"
											>
												<Avatar className="h-8 w-8">
													<AvatarImage
														src={"/placeholder.svg?height=32&width=32"}
														alt={activity.coach}
													/>
													<AvatarFallback>{activity.coach[0]}</AvatarFallback>
												</Avatar>
												<div className="text-sm">{activity.coach}</div>
											</div>
										))}
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="list" className="space-y-4">
					<Card>
						<CardHeader className="flex flex-row items-center">
							<div className="flex-1">
								<CardTitle>Liste des activités</CardTitle>
								<CardDescription>
									{filteredActivities.length} activités trouvées
								</CardDescription>
							</div>
							<div className="flex items-center gap-2">
								<Select
									value={categoryFilter}
									onValueChange={setCategoryFilter}
								>
									<SelectTrigger className="w-[180px]">
										<Filter className="w-4 h-4 mr-2" />
										<SelectValue placeholder="Catégorie" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">Toutes les catégories</SelectItem>
										{uniqueCategories.map((category) => (
											<SelectItem key={category} value={category}>
												{category}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<Select value={typeFilter} onValueChange={setTypeFilter}>
									<SelectTrigger className="w-[180px]">
										<Filter className="w-4 h-4 mr-2" />
										<SelectValue placeholder="Type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">Tous les types</SelectItem>
										{uniqueTypes.map((type) => (
											<SelectItem key={type} value={type}>
												{type}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</CardHeader>
						<CardContent>
							<div className="border rounded-md">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Activité</TableHead>
											<TableHead>Date et heure</TableHead>
											<TableHead>Lieu</TableHead>
											<TableHead>Coach</TableHead>
											<TableHead>Participants</TableHead>
											<TableHead className="w-[80px]">Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{filteredActivities.length > 0 ? (
											filteredActivities.map((activity) => (
												<TableRow key={activity.id}>
													<TableCell>
														<div>
															<div className="font-medium">{activity.name}</div>
															<div className="flex items-center mt-1">
																<Badge
																	variant={
																		activity.type === "Compétition"
																			? "default"
																			: "outline"
																	}
																	className="text-xs"
																>
																	{activity.type}
																</Badge>
																<span className="ml-2 text-xs text-muted-foreground">
																	{activity.category}
																</span>
															</div>
														</div>
													</TableCell>
													<TableCell>
														<div className="flex items-center">
															<CalendarDays className="w-4 h-4 mr-1 text-muted-foreground" />
															<span>{activity.date}</span>
														</div>
														<div className="flex items-center mt-1 text-sm text-muted-foreground">
															<Clock className="w-4 h-4 mr-1" />
															<span>{activity.time}</span>
														</div>
													</TableCell>
													<TableCell>
														<div className="flex items-center">
															<MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
															<span>{activity.location}</span>
														</div>
													</TableCell>
													<TableCell>
														<div className="flex items-center">
															<Avatar className="h-6 w-6 mr-2">
																<AvatarImage
																	src={"/placeholder.svg?height=24&width=24"}
																	alt={activity.coach}
																/>
																<AvatarFallback>
																	{activity.coach
																		.split(" ")
																		.map((n) => n[0])
																		.join("")}
																</AvatarFallback>
															</Avatar>
															<span>{activity.coach}</span>
														</div>
													</TableCell>
													<TableCell>
														<div className="flex items-center">
															<Users className="w-4 h-4 mr-1 text-muted-foreground" />
															<span>
																{activity.participants}/
																{activity.maxParticipants}
															</span>
														</div>
														<div className="w-full h-2 mt-1 bg-gray-100 rounded-full dark:bg-gray-700">
															<div
																className="h-2 rounded-full bg-emerald-500"
																style={{
																	width: `${(activity.participants / activity.maxParticipants) * 100}%`,
																}}
															/>
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
																<DropdownMenuItem>
																	Voir les détails
																</DropdownMenuItem>
																<DropdownMenuItem>Modifier</DropdownMenuItem>
																<DropdownMenuItem>
																	Gérer les participants
																</DropdownMenuItem>
																<DropdownMenuSeparator />
																<DropdownMenuItem className="text-red-600">
																	Annuler
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell colSpan={6} className="h-24 text-center">
													Aucune activité trouvée.
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="facilities" className="space-y-4">
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle>Installations sportives</CardTitle>
									<CardDescription>
										Gérez les installations disponibles pour les activités
									</CardDescription>
								</div>
								<Button size="sm">
									<Plus className="w-4 h-4 mr-2" />
									Ajouter une installation
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							<div className="border rounded-md">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Nom</TableHead>
											<TableHead>Type</TableHead>
											<TableHead>Capacité</TableHead>
											<TableHead>Adresse</TableHead>
											<TableHead>Disponibilité</TableHead>
											<TableHead className="w-[80px]">Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{facilities.map((facility) => (
											<TableRow key={facility.id}>
												<TableCell>
													<div className="font-medium">{facility.name}</div>
												</TableCell>
												<TableCell>{facility.type}</TableCell>
												<TableCell>{facility.capacity} personnes</TableCell>
												<TableCell>{facility.address}</TableCell>
												<TableCell>{facility.availability}</TableCell>
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
															<DropdownMenuItem>
																Voir les détails
															</DropdownMenuItem>
															<DropdownMenuItem>Modifier</DropdownMenuItem>
															<DropdownMenuItem>
																Voir le planning
															</DropdownMenuItem>
															<DropdownMenuSeparator />
															<DropdownMenuItem>Réserver</DropdownMenuItem>
														</DropdownMenuContent>
													</DropdownMenu>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}

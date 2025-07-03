import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
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
import { Progress } from "@/components/ui/progress";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	BarChart3,
	Calendar,
	Download,
	FileText,
	MoreHorizontal,
	Plus,
	Users,
} from "lucide-react";
import { useState } from "react";

// Données fictives pour les projets sociaux
const socialProjects = [
	{
		id: crypto.randomUUID(),
		name: "Aide au permis de conduire",
		description:
			"Programme d'aide financière pour l'obtention du permis de conduire pour les jeunes de 18 à 25 ans.",
		status: "En cours",
		progress: 75,
		startDate: "01/01/2025",
		endDate: "31/12/2025",
		budget: "15 000 €",
		beneficiaries: 25,
		maxBeneficiaries: 30,
		coordinator: "Sophie Martin",
	},
	{
		id: crypto.randomUUID(),
		name: "Soutien scolaire",
		description:
			"Programme de tutorat et d'aide aux devoirs pour les élèves du primaire et du secondaire.",
		status: "En cours",
		progress: 60,
		startDate: "15/09/2024",
		endDate: "30/06/2025",
		budget: "12 000 €",
		beneficiaries: 45,
		maxBeneficiaries: 50,
		coordinator: "Thomas Dubois",
	},
	{
		id: crypto.randomUUID(),
		name: "Insertion professionnelle",
		description:
			"Accompagnement vers l'emploi par le sport pour les jeunes en difficulté d'insertion.",
		status: "En cours",
		progress: 45,
		startDate: "01/03/2025",
		endDate: "28/02/2026",
		budget: "20 000 €",
		beneficiaries: 18,
		maxBeneficiaries: 40,
		coordinator: "Julie Moreau",
	},
	{
		id: crypto.randomUUID(),
		name: "Sport pour tous",
		description:
			"Accès aux activités sportives pour les personnes en situation de handicap.",
		status: "Planifié",
		progress: 10,
		startDate: "01/06/2025",
		endDate: "31/05/2026",
		budget: "18 000 €",
		beneficiaries: 5,
		maxBeneficiaries: 30,
		coordinator: "Lucas Bernard",
	},
	{
		id: crypto.randomUUID(),
		name: "Vacances sportives",
		description:
			"Stages sportifs pendant les vacances scolaires pour les enfants de familles défavorisées.",
		status: "Terminé",
		progress: 100,
		startDate: "01/07/2024",
		endDate: "31/08/2024",
		budget: "10 000 €",
		beneficiaries: 60,
		maxBeneficiaries: 60,
		coordinator: "Emma Petit",
	},
];

// Données fictives pour les bénéficiaires
const beneficiaries = [
	{
		id: crypto.randomUUID(),
		name: "Alexandre Martin",
		age: 19,
		project: "Aide au permis de conduire",
		status: "En cours",
		progress: 60,
		startDate: "15/02/2025",
		contact: "a.martin@example.com",
	},
	{
		id: crypto.randomUUID(),
		name: "Léa Dubois",
		age: 17,
		project: "Soutien scolaire",
		status: "En cours",
		progress: 75,
		startDate: "10/10/2024",
		contact: "l.dubois@example.com",
	},
	{
		id: crypto.randomUUID(),
		name: "Maxime Petit",
		age: 22,
		project: "Insertion professionnelle",
		status: "En cours",
		progress: 40,
		startDate: "05/03/2025",
		contact: "m.petit@example.com",
	},
	{
		id: crypto.randomUUID(),
		name: "Chloé Bernard",
		age: 16,
		project: "Soutien scolaire",
		status: "En cours",
		progress: 80,
		startDate: "01/10/2024",
		contact: "c.bernard@example.com",
	},
	{
		id: crypto.randomUUID(),
		name: "Hugo Moreau",
		age: 20,
		project: "Aide au permis de conduire",
		status: "Terminé",
		progress: 100,
		startDate: "10/01/2025",
		contact: "h.moreau@example.com",
	},
	{
		id: crypto.randomUUID(),
		name: "Inès Lefebvre",
		age: 18,
		project: "Insertion professionnelle",
		status: "En cours",
		progress: 30,
		startDate: "15/03/2025",
		contact: "i.lefebvre@example.com",
	},
	{
		id: crypto.randomUUID(),
		name: "Nathan Roux",
		age: 15,
		project: "Soutien scolaire",
		status: "En cours",
		progress: 65,
		startDate: "05/10/2024",
		contact: "n.roux@example.com",
	},
	{
		id: crypto.randomUUID(),
		name: "Zoé Fournier",
		age: 21,
		project: "Aide au permis de conduire",
		status: "En cours",
		progress: 50,
		startDate: "01/03/2025",
		contact: "z.fournier@example.com",
	},
];

export default function SocialProjectsPage() {
	const [activeTab, setActiveTab] = useState("overview");

	return (
		<div className="space-y-6">
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Projets sociaux</h1>
					<p className="text-muted-foreground">
						Gérez les initiatives sociales et suivez leur impact.
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm" className="h-9">
						<Download className="w-4 h-4 mr-2" />
						Exporter
					</Button>
					<Button size="sm" className="h-9">
						<Plus className="w-4 h-4 mr-2" />
						Nouveau projet
					</Button>
				</div>
			</div>

			<Tabs
				value={activeTab}
				className="space-y-4"
				onValueChange={setActiveTab}
			>
				<TabsList>
					<TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
					<TabsTrigger value="projects">Projets</TabsTrigger>
					<TabsTrigger value="beneficiaries">Bénéficiaires</TabsTrigger>
					<TabsTrigger value="reports">Rapports</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
								<CardTitle className="text-sm font-medium">
									Projets actifs
								</CardTitle>
								<FileText className="w-4 h-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">3</div>
								<p className="text-xs text-muted-foreground">
									sur 5 projets au total
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
								<CardTitle className="text-sm font-medium">
									Bénéficiaires
								</CardTitle>
								<Users className="w-4 h-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">153</div>
								<p className="text-xs text-muted-foreground">+12 ce mois-ci</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
								<CardTitle className="text-sm font-medium">
									Budget total
								</CardTitle>
								<BarChart3 className="w-4 h-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">75 000 €</div>
								<p className="text-xs text-muted-foreground">65% utilisé</p>
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
								<div className="text-2xl font-bold">8</div>
								<p className="text-xs text-muted-foreground">
									Prochain dans 5 jours
								</p>
							</CardContent>
						</Card>
					</div>

					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="lg:col-span-4">
							<CardHeader>
								<CardTitle>Progression des projets</CardTitle>
								<CardDescription>
									État d'avancement des projets sociaux en cours
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-6">
									{socialProjects
										.filter((project) => project.status !== "Terminé")
										.map((project) => (
											<div key={project.id} className="space-y-2">
												<div className="flex items-center justify-between">
													<div className="space-y-1">
														<div className="flex items-center">
															<span className="font-medium">
																{project.name}
															</span>
															<Badge
																className="ml-2"
																variant={
																	project.status === "En cours"
																		? "default"
																		: "outline"
																}
															>
																{project.status}
															</Badge>
														</div>
														<div className="text-sm text-muted-foreground">
															{project.startDate} - {project.endDate}
														</div>
													</div>
													<div className="text-sm font-medium">
														{project.progress}%
													</div>
												</div>
												<Progress value={project.progress} className="h-2" />
												<div className="flex justify-between text-xs text-muted-foreground">
													<div>Budget: {project.budget}</div>
													<div>
														Bénéficiaires: {project.beneficiaries}/
														{project.maxBeneficiaries}
													</div>
												</div>
											</div>
										))}
								</div>
							</CardContent>
						</Card>
						<Card className="lg:col-span-3">
							<CardHeader>
								<CardTitle>Répartition des bénéficiaires</CardTitle>
								<CardDescription>
									Par projet et par tranche d'âge
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="h-[300px] flex items-center justify-center bg-muted text-muted-foreground rounded-md">
									<BarChart3 className="w-12 h-12" />
									<span className="ml-2">Graphique de répartition</span>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="grid gap-4 md:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle>Derniers bénéficiaires inscrits</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{beneficiaries.slice(0, 5).map((beneficiary) => (
										<div key={beneficiary.id} className="flex items-center">
											<Avatar className="h-9 w-9">
												<AvatarImage
													src={"/placeholder.svg?height=36&width=36"}
													alt={beneficiary.name}
												/>
												<AvatarFallback>
													{beneficiary.name
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
											<div className="ml-4 space-y-1">
												<p className="text-sm font-medium leading-none">
													{beneficiary.name}
												</p>
												<p className="text-sm text-muted-foreground">
													{beneficiary.project}
												</p>
											</div>
											<div className="ml-auto">
												<Badge
													variant={
														beneficiary.status === "Terminé"
															? "outline"
															: "default"
													}
												>
													{beneficiary.status}
												</Badge>
											</div>
										</div>
									))}
								</div>
							</CardContent>
							<CardFooter>
								<Button
									variant="outline"
									className="w-full"
									onClick={() => setActiveTab("beneficiaries")}
								>
									Voir tous les bénéficiaires
								</Button>
							</CardFooter>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Événements à venir</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="flex items-center">
										<div className="w-2 h-2 mr-2 rounded-full bg-emerald-500" />
										<div className="flex-1 space-y-1">
											<p className="text-sm font-medium leading-none">
												Atelier d'insertion professionnelle
											</p>
											<p className="text-sm text-muted-foreground">
												20 mai 2025 - Salle polyvalente
											</p>
										</div>
										<Badge variant="outline">Social</Badge>
									</div>
									<div className="flex items-center">
										<div className="w-2 h-2 mr-2 rounded-full bg-blue-500" />
										<div className="flex-1 space-y-1">
											<p className="text-sm font-medium leading-none">
												Session de soutien scolaire
											</p>
											<p className="text-sm text-muted-foreground">
												22 mai 2025 - Centre culturel
											</p>
										</div>
										<Badge variant="outline">Social</Badge>
									</div>
									<div className="flex items-center">
										<div className="w-2 h-2 mr-2 rounded-full bg-purple-500" />
										<div className="flex-1 space-y-1">
											<p className="text-sm font-medium leading-none">
												Réunion des bénéficiaires du permis
											</p>
											<p className="text-sm text-muted-foreground">
												25 mai 2025 - Salle de réunion
											</p>
										</div>
										<Badge variant="outline">Social</Badge>
									</div>
									<div className="flex items-center">
										<div className="w-2 h-2 mr-2 rounded-full bg-orange-500" />
										<div className="flex-1 space-y-1">
											<p className="text-sm font-medium leading-none">
												Forum des métiers du sport
											</p>
											<p className="text-sm text-muted-foreground">
												30 mai 2025 - Gymnase central
											</p>
										</div>
										<Badge variant="outline">Social</Badge>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button variant="outline" className="w-full">
									Voir tous les événements
								</Button>
							</CardFooter>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="projects" className="space-y-4">
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle>Liste des projets sociaux</CardTitle>
									<CardDescription>
										{socialProjects.length} projets au total
									</CardDescription>
								</div>
								<Button size="sm">
									<Plus className="w-4 h-4 mr-2" />
									Nouveau projet
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							<div className="border rounded-md">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Nom du projet</TableHead>
											<TableHead>Statut</TableHead>
											<TableHead>Période</TableHead>
											<TableHead>Budget</TableHead>
											<TableHead>Bénéficiaires</TableHead>
											<TableHead>Progression</TableHead>
											<TableHead className="w-[80px]">Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{socialProjects.map((project) => (
											<TableRow key={project.id}>
												<TableCell>
													<div className="font-medium">{project.name}</div>
													<div className="text-sm text-muted-foreground">
														{project.coordinator}
													</div>
												</TableCell>
												<TableCell>
													<Badge
														variant={
															project.status === "Terminé"
																? "outline"
																: project.status === "Planifié"
																	? "secondary"
																	: "default"
														}
													>
														{project.status}
													</Badge>
												</TableCell>
												<TableCell>
													<div className="text-sm">
														{project.startDate} - {project.endDate}
													</div>
												</TableCell>
												<TableCell>{project.budget}</TableCell>
												<TableCell>
													<div className="flex items-center">
														<Users className="w-4 h-4 mr-1 text-muted-foreground" />
														<span>
															{project.beneficiaries}/{project.maxBeneficiaries}
														</span>
													</div>
												</TableCell>
												<TableCell>
													<div className="flex items-center gap-2">
														<Progress
															value={project.progress}
															className="h-2 w-[60px]"
														/>
														<span className="text-sm">{project.progress}%</span>
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
																Gérer les bénéficiaires
															</DropdownMenuItem>
															<DropdownMenuItem>
																Générer un rapport
															</DropdownMenuItem>
															<DropdownMenuSeparator />
															<DropdownMenuItem className="text-red-600">
																Archiver
															</DropdownMenuItem>
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

				<TabsContent value="beneficiaries" className="space-y-4">
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle>Liste des bénéficiaires</CardTitle>
									<CardDescription>
										{beneficiaries.length} bénéficiaires au total
									</CardDescription>
								</div>
								<Button size="sm">
									<Plus className="w-4 h-4 mr-2" />
									Ajouter un bénéficiaire
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							<div className="border rounded-md">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Nom</TableHead>
											<TableHead>Âge</TableHead>
											<TableHead>Projet</TableHead>
											<TableHead>Statut</TableHead>
											<TableHead>Date d'inscription</TableHead>
											<TableHead>Progression</TableHead>
											<TableHead className="w-[80px]">Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{beneficiaries.map((beneficiary) => (
											<TableRow key={beneficiary.id}>
												<TableCell>
													<div className="flex items-center gap-3">
														<Avatar className="h-8 w-8">
															<AvatarImage
																src={"/placeholder.svg?height=32&width=32"}
																alt={beneficiary.name}
															/>
															<AvatarFallback>
																{beneficiary.name
																	.split(" ")
																	.map((n) => n[0])
																	.join("")}
															</AvatarFallback>
														</Avatar>
														<div>
															<div className="font-medium">
																{beneficiary.name}
															</div>
															<div className="text-sm text-muted-foreground">
																{beneficiary.contact}
															</div>
														</div>
													</div>
												</TableCell>
												<TableCell>{beneficiary.age} ans</TableCell>
												<TableCell>{beneficiary.project}</TableCell>
												<TableCell>
													<Badge
														variant={
															beneficiary.status === "Terminé"
																? "outline"
																: "default"
														}
													>
														{beneficiary.status}
													</Badge>
												</TableCell>
												<TableCell>{beneficiary.startDate}</TableCell>
												<TableCell>
													<div className="flex items-center gap-2">
														<Progress
															value={beneficiary.progress}
															className="h-2 w-[60px]"
														/>
														<span className="text-sm">
															{beneficiary.progress}%
														</span>
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
																Voir le profil
															</DropdownMenuItem>
															<DropdownMenuItem>Modifier</DropdownMenuItem>
															<DropdownMenuItem>
																Mettre à jour la progression
															</DropdownMenuItem>
															<DropdownMenuItem>
																Envoyer un message
															</DropdownMenuItem>
															<DropdownMenuSeparator />
															<DropdownMenuItem className="text-red-600">
																Retirer du programme
															</DropdownMenuItem>
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

				<TabsContent value="reports" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Rapports et statistiques</CardTitle>
							<CardDescription>
								Générez des rapports sur l'impact des projets sociaux
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="grid gap-4 md:grid-cols-2">
									<Card>
										<CardHeader className="pb-2">
											<CardTitle className="text-lg">
												Rapport d'impact
											</CardTitle>
											<CardDescription>
												Analyse de l'impact des projets sociaux
											</CardDescription>
										</CardHeader>
										<CardContent className="pb-2">
											<div className="h-[200px] flex items-center justify-center bg-muted text-muted-foreground rounded-md">
												<BarChart3 className="w-12 h-12" />
												<span className="ml-2">Graphique d'impact</span>
											</div>
										</CardContent>
										<CardFooter>
											<Button variant="outline" className="w-full">
												<Download className="w-4 h-4 mr-2" />
												Télécharger le rapport
											</Button>
										</CardFooter>
									</Card>
									<Card>
										<CardHeader className="pb-2">
											<CardTitle className="text-lg">
												Statistiques des bénéficiaires
											</CardTitle>
											<CardDescription>
												Répartition par âge et par projet
											</CardDescription>
										</CardHeader>
										<CardContent className="pb-2">
											<div className="h-[200px] flex items-center justify-center bg-muted text-muted-foreground rounded-md">
												<BarChart3 className="w-12 h-12" />
												<span className="ml-2">Graphique des statistiques</span>
											</div>
										</CardContent>
										<CardFooter>
											<Button variant="outline" className="w-full">
												<Download className="w-4 h-4 mr-2" />
												Télécharger les statistiques
											</Button>
										</CardFooter>
									</Card>
								</div>
								<div className="border rounded-md">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Nom du rapport</TableHead>
												<TableHead>Type</TableHead>
												<TableHead>Date de génération</TableHead>
												<TableHead>Taille</TableHead>
												<TableHead className="w-[80px]">Actions</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											<TableRow>
												<TableCell>
													<div className="font-medium">
														Rapport trimestriel - T1 2025
													</div>
												</TableCell>
												<TableCell>PDF</TableCell>
												<TableCell>01/04/2025</TableCell>
												<TableCell>2.4 MB</TableCell>
												<TableCell>
													<Button variant="ghost" size="icon">
														<Download className="h-4 w-4" />
														<span className="sr-only">Télécharger</span>
													</Button>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className="font-medium">
														Statistiques des bénéficiaires
													</div>
												</TableCell>
												<TableCell>Excel</TableCell>
												<TableCell>15/03/2025</TableCell>
												<TableCell>1.8 MB</TableCell>
												<TableCell>
													<Button variant="ghost" size="icon">
														<Download className="h-4 w-4" />
														<span className="sr-only">Télécharger</span>
													</Button>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className="font-medium">
														Rapport d'impact - Aide au permis
													</div>
												</TableCell>
												<TableCell>PDF</TableCell>
												<TableCell>28/02/2025</TableCell>
												<TableCell>3.2 MB</TableCell>
												<TableCell>
													<Button variant="ghost" size="icon">
														<Download className="h-4 w-4" />
														<span className="sr-only">Télécharger</span>
													</Button>
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}

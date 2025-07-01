import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Link, useParams } from "@tanstack/react-router";
import { Calendar, Clock, MapPin, Plus, Users, Edit, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import type { SessionSport } from "../../types";

export function SessionsListPage() {
	const { clubId, sectionId, categoryId } = useParams({
		from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/",
	});
	const [sessions, setSessions] = useState<SessionSport[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch(
			`/api/clubs/${clubId}/sections/${sectionId}/categories/${categoryId}/sessions`,
		)
			.then((res) => res.json())
			.then(setSessions)
			.finally(() => setIsLoading(false));
	}, [clubId, sectionId, categoryId]);

	const getStatusBadge = (status: string) => {
		const variants = {
			planifie: "default",
			en_cours: "secondary", 
			termine: "outline",
			annule: "destructive",
		} as const;

		const labels = {
			planifie: "Planifié",
			en_cours: "En cours",
			termine: "Terminé",
			annule: "Annulé",
		} as const;

		return (
			<Badge variant={variants[status as keyof typeof variants] || "default"}>
				{labels[status as keyof typeof labels] || status}
			</Badge>
		);
	};

	const getTypeBadge = (type: string) => {
		const variants = {
			entrainement: "default",
			match: "secondary",
			stage: "outline", 
			competition: "destructive",
			autre: "outline",
		} as const;

		const labels = {
			entrainement: "Entraînement",
			match: "Match",
			stage: "Stage",
			competition: "Compétition",
			autre: "Autre",
		} as const;

		return (
			<Badge variant={variants[type as keyof typeof variants] || "default"}>
				{labels[type as keyof typeof labels] || type}
			</Badge>
		);
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("fr-FR", {
			day: "2-digit",
			month: "2-digit", 
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	if (isLoading) {
		return (
			<div className="space-y-6">
				<div className="animate-pulse">
					<div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
					<div className="h-4 bg-gray-200 rounded w-1/2" />
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* En-tête cohérent */}
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Sessions</h1>
					<p className="text-muted-foreground">
						Gérez les sessions de votre catégorie
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm" asChild>
						<Link
							to="/admin/dashboard/clubs/$clubId/sections/$sectionId/categories"
							params={{ clubId, sectionId }}
						>
							<ArrowLeft className="w-4 h-4 mr-2" />
							Retour aux catégories
						</Link>
					</Button>
					<Button asChild>
						<Link
							to="/admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/create"
							params={{ clubId, sectionId, categoryId }}
						>
							<Plus className="w-4 h-4 mr-2" />
							Créer une session
						</Link>
					</Button>
				</div>
			</div>

			{/* Statistiques rapides */}
			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardContent className="p-4">
						<div className="flex items-center gap-2">
							<Calendar className="w-4 h-4 text-muted-foreground" />
							<div>
								<p className="text-2xl font-bold">{sessions.length}</p>
								<p className="text-xs text-muted-foreground">Total sessions</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="flex items-center gap-2">
							<Clock className="w-4 h-4 text-muted-foreground" />
							<div>
								<p className="text-2xl font-bold">
									{sessions.filter(s => s.status === "planifie").length}
								</p>
								<p className="text-xs text-muted-foreground">À venir</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="flex items-center gap-2">
							<Users className="w-4 h-4 text-muted-foreground" />
							<div>
								<p className="text-2xl font-bold">
									{sessions.filter(s => s.status === "en_cours").length}
								</p>
								<p className="text-xs text-muted-foreground">En cours</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="flex items-center gap-2">
							<MapPin className="w-4 h-4 text-muted-foreground" />
							<div>
								<p className="text-2xl font-bold">
									{sessions.filter(s => s.status === "termine").length}
								</p>
								<p className="text-xs text-muted-foreground">Terminées</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Liste des sessions */}
			<Card>
				<CardHeader>
					<CardTitle>Liste des sessions</CardTitle>
					<CardDescription>
						Toutes les sessions de cette catégorie
					</CardDescription>
				</CardHeader>
				<CardContent>
					{sessions.length === 0 ? (
						<div className="text-center py-8">
							<Calendar className="mx-auto h-12 w-12 text-gray-400" />
							<h3 className="mt-2 text-sm font-semibold text-gray-900">Aucune session</h3>
							<p className="mt-1 text-sm text-gray-500">
								Commencez par créer une nouvelle session.
							</p>
							<div className="mt-6">
								<Button asChild>
									<Link
										to="/admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/create"
										params={{ clubId, sectionId, categoryId }}
									>
										<Plus className="w-4 h-4 mr-2" />
										Créer une session
									</Link>
								</Button>
							</div>
						</div>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Titre</TableHead>
									<TableHead>Type</TableHead>
									<TableHead>Statut</TableHead>
									<TableHead>Date de début</TableHead>
									<TableHead>Date de fin</TableHead>
									<TableHead>Lieu</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{sessions.map((session) => (
									<TableRow key={session.id}>
										<TableCell className="font-medium">
											{session.title}
										</TableCell>
										<TableCell>
											{getTypeBadge(session.type)}
										</TableCell>
										<TableCell>
											{getStatusBadge(session.status)}
										</TableCell>
										<TableCell>
											{formatDate(session.startDate)}
										</TableCell>
										<TableCell>
											{formatDate(session.endDate)}
										</TableCell>
										<TableCell>
											{session.location || "Non défini"}
										</TableCell>
										<TableCell>
											<Button variant="outline" size="sm" asChild>
												<Link
													to="/admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/$sessionId/edit"
													params={{ 
														clubId, 
														sectionId, 
														categoryId, 
														sessionId: session.id 
													}}
												>
													<Edit className="w-4 h-4 mr-2" />
													Modifier
												</Link>
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

import { Link } from "@tanstack/react-router";
import type { Minibus } from "@/features/minibus-booking/hooks/useMinibuses";
import { frenchDays } from "@/features/minibus-booking/hooks/useMinibuses";
import { MinibusReservationList } from "../minibusReservations/MinibusReservationList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	ArrowLeft,
	Edit,
	Info,
	Plus,
	Timer,
	Users,
	UserCheck,
	// @ts-ignore
} from "lucide-react";

interface MinibusDetailsPageProps {
	minibus: Minibus;
}

export function MinibusDetailsPage({ minibus }: MinibusDetailsPageProps) {
	return (
		<div className="space-y-6">
			{/* En-tête de la page */}
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">{minibus.name}</h1>
					<p className="text-muted-foreground">
						Plaque d'immatriculation :{" "}
						<span className="font-medium">{minibus.licensePlate}</span>
					</p>
					<div className="flex items-center gap-2 mt-2">
						{minibus.isAvailable ? (
							<Badge variant="default" className="bg-green-100 text-green-800">
								Disponible
							</Badge>
						) : (
							<Badge variant="secondary" className="bg-red-100 text-red-800">
								Indisponible
							</Badge>
						)}
					</div>
				</div>				<div className="flex items-center gap-2">
					<Button asChild variant="outline" size="sm">
						<Link to="/admin/assets/minibuses">
							<ArrowLeft className="w-4 h-4 mr-2" />
							Retour à la liste
						</Link>
					</Button>

					<Button asChild variant="default" size="sm">
						<Link 
							to="/admin/assets/minibuses/$minibusId/edit"
							params={{ minibusId: minibus.id }}
						>
							<Edit className="w-4 h-4 mr-2" />
							Modifier
						</Link>
					</Button>

					<Button asChild variant="default" size="sm">
						<Link 
							to="/admin/assets/minibuses/$minibusId/create-reservation"
							params={{ minibusId: minibus.id }}
						>
							<Plus className="w-4 h-4 mr-2" />
							Nouvelle réservation
						</Link>
					</Button>
				</div>
			</div>

			{/* Carte d'information du minibus */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Info className="w-5 h-5 text-muted-foreground" />
						Détails du minibus
					</CardTitle>
					<CardDescription>Informations principales</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-6 md:grid-cols-2">
						<div className="space-y-4">
							<div>
								<h4 className="text-sm font-medium text-muted-foreground">Nom</h4>
								<p className="text-sm">{minibus.name}</p>
							</div>
							<div>
								<h4 className="text-sm font-medium text-muted-foreground">Description</h4>
								<p className="text-sm">{minibus.description || "Aucune description"}</p>
							</div>
							<div>
								<h4 className="text-sm font-medium text-muted-foreground">Plaque d'immatriculation</h4>
								<p className="text-sm font-mono">{minibus.licensePlate}</p>
							</div>
						</div>
						<div className="space-y-4">
							<div className="flex items-center gap-6">
								<div className="flex items-center gap-2">
									<Users className="w-4 h-4 text-muted-foreground" />
									<div>
										<h4 className="text-sm font-medium text-muted-foreground">Capacité totale</h4>
										<p className="text-sm">{minibus.capacity} places</p>
									</div>
								</div>
								{minibus.disabledPersonCapacity > 0 && (
									<div className="flex items-center gap-2">
										<UserCheck className="w-4 h-4 text-muted-foreground" />
										<div>
											<h4 className="text-sm font-medium text-muted-foreground">Places PMR</h4>
											<p className="text-sm">{minibus.disabledPersonCapacity} places</p>
										</div>
									</div>
								)}
							</div>
							<div>
								<h4 className="text-sm font-medium text-muted-foreground">Statut</h4>
								<p className="text-sm">
									{minibus.isAvailable ? "Disponible pour les réservations" : "Indisponible"}
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Disponibilités */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Timer className="w-4 h-4" />
						Disponibilités
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid gap-2 md:grid-cols-2 lg:grid-cols-7">
						{Object.entries(frenchDays).map(([dayKey, dayLabel]) => {
							const dayDisponibility = minibus.disponibility[dayKey as keyof typeof minibus.disponibility];
							
							return (
								<div key={dayKey} className="p-3 border rounded-lg text-center">
									<h4 className="text-sm font-medium">{dayLabel}</h4>
									{dayDisponibility?.available ? (
										<div className="mt-1 space-y-1">
											<Badge variant="default" className="text-xs bg-green-100 text-green-800">
												Disponible
											</Badge>
											{dayDisponibility.open && dayDisponibility.close && (
												<p className="text-xs text-muted-foreground">
													{dayDisponibility.open} - {dayDisponibility.close}
												</p>
											)}
										</div>
									) : (
										<Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600 mt-1">
											Fermé
										</Badge>
									)}
								</div>
							);
						})}
					</div>
					<p className="text-xs text-muted-foreground mt-4 text-center">
						Les heures indiquées correspondent aux créneaux où le minibus peut être réservé.
					</p>
				</CardContent>
			</Card>

			{/* Planification des réservations */}
			<MinibusReservationList
				minibusId={minibus.id}
				minibusDisponibility={minibus.disponibility}
				initialMinibusReservations={[]}
			/>
		</div>
	);
}

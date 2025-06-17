import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ReservationList } from "@room-booking/components/reservations/ReservationList";
import type { Complex } from "@room-booking/hooks/useComplexes";
import type { Room } from "@room-booking/hooks/useRooms";
import { frenchDays } from "@room-booking/hooks/useRooms";
import { Link } from "@tanstack/react-router";
// @ts-ignore
import {
	ArrowLeft,
	Edit,
	Info,
	Plus,
	Timer,
	// @ts-ignore
} from "lucide-react";

interface RoomDetailsPageProps {
	room: Room;
	complex: Complex;
}

export function RoomDetailsPage({ room, complex }: RoomDetailsPageProps) {
	return (
		<div className="space-y-6">
			{/* En-tête de la page */}
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">{room.name}</h1>
					<p className="text-muted-foreground">
						Salle du complexe :{" "}
						<span className="font-medium">{complex.name}</span>
					</p>
					<p className="text-muted-foreground">
						<span className="font-medium">{room.description}</span>
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button asChild variant="outline" size="sm">
						<Link
							to="/admin/facilities/complexes/$complexId"
							params={{ complexId: complex.id }}
						>
							<ArrowLeft className="w-4 h-4 mr-2" />
							Retour au complexe
						</Link>
					</Button>

					<Button asChild variant="default" size="sm">
						<Link
							to="/admin/facilities/rooms/$roomId/create-reservation"
							params={{ roomId: room.id }}
						>
							<Plus className="w-4 h-4 mr-2" />
							Réserver la salle
						</Link>
					</Button>

					<Button asChild variant="default" size="sm">
						<Link
							to="/admin/facilities/rooms/$roomId/edit"
							params={{ roomId: room.id }}
						>
							<Edit className="w-4 h-4 mr-2" />
							Modifier
						</Link>
					</Button>
				</div>
			</div>

			{/* Carte d'information de la salle */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Info className="w-5 h-5 text-muted-foreground" />
						Détails de la salle
					</CardTitle>
					<CardDescription>Informations principales</CardDescription>
				</CardHeader>
				<CardContent>
					<ul className="space-y-2 text-sm text-muted-foreground">
						<li>
							<strong>Sport :</strong>{" "}
							<span className="font-medium">{room.sportType}</span>
						</li>
						<li>
							<strong>Capacité :</strong>{" "}
							<span className="font-medium">{room.capacity} personnes</span>
						</li>
						<li>
							<strong>Intérieure :</strong>{" "}
							<span className="font-medium">
								{room.isIndoor ? "Oui" : "Non"}
							</span>
						</li>
						<li>
							<strong>Accréditation :</strong>{" "}
							<span className="font-medium">
								{room.accreditation || "Aucune"}
							</span>
						</li>
					</ul>
				</CardContent>
			</Card>

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
								room.openingHours[dayKey as keyof typeof room.openingHours];
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
						{Object.values(room.openingHours).some((dayData) => dayData?.closed)
							? "La salle est fermé certains jours"
							: "Ouvert tous les jours"}
					</p>
				</CardContent>
			</Card>

			{/* Planification des réservations */}
			<ReservationList
				roomId={room.id}
				roomOpeningHours={room.openingHours}
				initialReservations={[]}
			/>
		</div>
	);
}

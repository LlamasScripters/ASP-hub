// import { useSearch } from "@tanstack/react-router";
// import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import type { Complex } from "@room-booking/hooks/useComplexes";
import type { Room } from "@room-booking/hooks/useRooms";
// @ts-ignore
import { ArrowLeft, Info, Calendar as CalendarIcon, Plus, Edit } from "lucide-react";
import { ReservationList } from "@room-booking/components/reservations/ReservationList";

interface RoomDetailsPageProps {
	room: Room;
	complex: Complex;
}

export function RoomDetailsPage({ room, complex }: RoomDetailsPageProps) {
	// const search = useSearch({ strict: false });
	// const navigate = useNavigate();

	return (
		<div className="space-y-6">
			{/* En-tête de la page */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">{room.name}</h1>
					<p className="text-muted-foreground">
						Salle du complexe :{" "}
						<span className="font-medium">{complex.name}</span>
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

			{/* Planification des réservations */}
			<ReservationList roomId={room.id} initialReservations={[]} />
		</div>
	);
}

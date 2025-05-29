import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Complex } from "@room-booking/hooks/useComplexes";
import type { Room } from "@room-booking/hooks/useRooms";
import { useNavigate } from "@tanstack/react-router";
// @ts-ignore
import { ArrowLeft, Building, Calendar, Info } from "lucide-react";

interface RoomDetailsPageProps {
	room: Room;
	complex: Complex;
}

export function RoomDetailsPage({ room, complex }: RoomDetailsPageProps) {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate({ to: `/facilities/complexes/${complex.id}` });
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">{room.name}</h1>
					<p className="text-muted-foreground">
						Salle du complexe {complex.name}
					</p>
				</div>
				<Button variant="outline" size="sm" onClick={handleBack}>
					<ArrowLeft className="w-4 h-4 mr-2" />
					Retour au complexe
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Info className="w-5 h-5" />
						Détails de la salle
					</CardTitle>
					<CardDescription>Informations principales</CardDescription>
				</CardHeader>
				<CardContent>
					<ul className="space-y-2 text-sm text-muted-foreground">
						<li>
							<strong>Sport :</strong> {room.sportType}
						</li>
						<li>
							<strong>Intérieur :</strong> {room.isIndoor ? "Oui" : "Non"}
						</li>
						<li>
							<strong>Accréditation :</strong> {room.accreditation || "Aucune"}
						</li>
					</ul>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Calendar className="w-5 h-5" />
						Planning des réservations
					</CardTitle>
					<CardDescription>Calendrier des événements à venir</CardDescription>
				</CardHeader>
				<CardContent>
					{/* 👉 Ici tu pourras intégrer ton calendrier (FullCalendar, React Big Calendar, etc.) */}
					<div className="h-[400px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
						<Calendar className="w-12 h-12 text-gray-400" />
						<span className="ml-2 text-gray-500">Calendrier à implémenter</span>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

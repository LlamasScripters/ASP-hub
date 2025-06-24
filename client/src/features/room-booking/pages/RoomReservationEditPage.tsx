import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RoomReservationForm } from "@room-booking/components/roomReservations/RoomReservationForm";
import type { Complex } from "@room-booking/hooks/useComplexes";
import type { RoomReservation } from "@/features/room-booking/hooks/useRoomReservations";
import type { Room } from "@room-booking/hooks/useRooms";
import { useNavigate } from "@tanstack/react-router";
import { Link, useRouter } from "@tanstack/react-router";
// @ts-ignore
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";

interface RoomReservationEditPageProps {
	complex: Complex;
	room: Room;
	roomReservation: RoomReservation;
}

export function RoomReservationEditPage({
	complex,
	room,
	roomReservation,
}: RoomReservationEditPageProps) {
	const navigate = useNavigate();
	const router = useRouter();

	const previousPageHref =
		router.__store.prevState?.resolvedLocation?.href || undefined;

	const handleSuccess = () => {
		setTimeout(() => {
			navigate({
				to: `/admin/facilities/rooms/${room.id}`,
			});
		}, 1500);
	};

	return (
		<div className="space-y-6">
			{/* En-tête */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Modifier une réservation
					</h1>
					<p className="text-muted-foreground">
						Modifier la réservation{" "}
						<span className="font-medium">{roomReservation.title}</span> de la salle{" "}
						<span className="font-medium">{room.name}</span> du complexe{" "}
						<span className="font-medium">{complex.name}</span>
					</p>
				</div>
				<Button variant="outline" size="sm" asChild>
					<Link
						to="/admin/facilities/rooms/$roomId"
						params={{ roomId: room.id }}
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Retour à la salle
					</Link>
				</Button>
			</div>

			{/* Avertissement */}
			<Alert>
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>
					<strong>Important :</strong> En modifiant le créneau, vous pouvez
					entrer en conflit avec d’autres réservations. Vérifiez bien les
					nouvelles dates.
				</AlertDescription>
			</Alert>

			{/* Formulaire d’édition */}
			<RoomReservationForm
				roomId={room.id}
				roomOpeningHours={room.openingHours}
				roomReservation={roomReservation}
				onSuccess={handleSuccess}
				onCancelLink={previousPageHref}
			/>
		</div>
	);
}

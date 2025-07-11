import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RoomReservationForm } from "@room-booking/components/RoomReservations/RoomReservationForm";
import type { Complex } from "@room-booking/hooks/useComplexes";
import type { Room } from "@room-booking/hooks/useRooms";
import { useNavigate } from "@tanstack/react-router";
import { Link, useRouter } from "@tanstack/react-router";
// @ts-ignore
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";

interface RoomReservationCreatePageProps {
	complex: Complex;
	room: Room;
}

export function RoomReservationCreatePage({
	complex,
	room,
}: RoomReservationCreatePageProps) {
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
						Créer une réservation
					</h1>
					<p className="text-muted-foreground">
						Nouvelle réservation pour la salle{" "}
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
					<strong>Important :</strong> Veuillez vérifier que les créneaux
					choisis ne soient pas déjà réservés. En cas de conflit, un message
					d’erreur s’affichera.
				</AlertDescription>
			</Alert>

			{/* Formulaire de réservation */}
			<RoomReservationForm
				roomId={room.id}
				roomOpeningHours={room.openingHours}
				onSuccess={handleSuccess}
				onCancelLink={previousPageHref}
			/>
		</div>
	);
}

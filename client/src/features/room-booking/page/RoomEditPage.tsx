import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RoomForm } from "@room-booking/components/rooms/RoomForm";
import type { Complex } from "@room-booking/hooks/useComplexes";
import type { Room } from "@room-booking/hooks/useRooms";
import { useNavigate } from "@tanstack/react-router";
// @ts-ignore
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";
import { useState } from "react";

interface RoomEditPageProps {
	complex: Complex;
	room: Room;
}

export function RoomEditPage({ complex, room }: RoomEditPageProps) {
	const navigate = useNavigate();
	const [showSuccess, setShowSuccess] = useState(false);

	const handleSuccess = () => {
		setShowSuccess(true);
		setTimeout(() => {
			navigate({
				to: `/facilities/complexes/${complex.id}`,
			});
		}, 1500);
	};

	const handleCancel = () => {
		navigate({
			to: `/facilities/complexes/${complex.id}`,
		});
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Modifier une salle
					</h1>
					<p className="text-muted-foreground">
						Modifier la salle <strong>{room.name}</strong> du complexe{" "}
						{complex.name}
					</p>
				</div>
				<Button variant="outline" onClick={handleCancel}>
					<ArrowLeft className="w-4 h-4 mr-2" />
					Retour
				</Button>
			</div>

			{showSuccess && (
				<Alert className="border-green-200 bg-green-50">
					<CheckCircle className="h-4 w-4 text-green-600" />
					<AlertDescription className="text-green-800">
						Salle modifiée avec succès ! Redirection en cours...
					</AlertDescription>
				</Alert>
			)}

			{/* Avertissement */}
			<Alert>
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>
					<strong>Important :</strong> Assurez-vous que les informations de la
					salle sont correctes avant de sauvegarder. Toute modification peut
					affecter les réservations existantes.
				</AlertDescription>
			</Alert>

			<RoomForm
				complexId={complex.id}
				room={room}
				onSuccess={handleSuccess}
				onCancel={handleCancel}
			/>
		</div>
	);
}

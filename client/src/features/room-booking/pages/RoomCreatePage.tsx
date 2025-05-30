import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RoomForm } from "@room-booking/components/rooms/RoomForm";
import type { Complex } from "@room-booking/hooks/useComplexes";
import { Link, useNavigate } from "@tanstack/react-router";
// @ts-ignore
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";
import { useState } from "react";

interface RoomCreatePageProps {
	complex: Complex;
}

export function RoomCreatePage({ complex }: RoomCreatePageProps) {
	const navigate = useNavigate();
	const [showSuccess, setShowSuccess] = useState(false);

	const handleSuccess = () => {
		setShowSuccess(true);
		setTimeout(() => {
			navigate({
				to: `/admin/facilities/complexes/${complex.id}`,
			});
		}, 1500);
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Créer une salle</h1>
					<p className="text-muted-foreground">
						Nouvelle salle pour le complexe {complex.name}
					</p>
				</div>
				<Button variant="outline" size="sm" asChild>
					<Link
						to="/admin/facilities/complexes/$complexId"
						params={{ complexId: complex.id }}
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Retour
					</Link>
				</Button>
			</div>

			{showSuccess && (
				<Alert className="border-green-200 bg-green-50">
					<CheckCircle className="h-4 w-4 text-green-600" />
					<AlertDescription className="text-green-800">
						Salle créée avec succès ! Redirection en cours...
					</AlertDescription>
				</Alert>
			)}

			{/* Avertissement */}
			<Alert>
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>
					<strong>Important :</strong> Assurez-vous de remplir tous les champs
					requis avant de soumettre le formulaire.
				</AlertDescription>
			</Alert>

			<RoomForm
				complexId={complex.id}
				onSuccess={handleSuccess}
				onCancelLink={`/admin/facilities/complexes/${complex.id}`}
			/>
		</div>
	);
}

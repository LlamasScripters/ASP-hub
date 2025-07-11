import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ComplexForm } from "@room-booking/components/complexes/ComplexForm";
import { Link, useNavigate } from "@tanstack/react-router";
// @ts-ignore
import { AlertCircle, ArrowLeft, Building, CheckCircle } from "lucide-react";
import { useState } from "react";

export function ComplexCreatePage() {
	const navigate = useNavigate();
	const [showSuccessAlert, setShowSuccessAlert] = useState(false);

	const handleSuccess = (newComplex: { id: string }) => {
		setShowSuccessAlert(true);
		setTimeout(() => {
			navigate({ to: `/admin/facilities/complexes/${newComplex.id}` });
		}, 1500);
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Créer un complexe
					</h1>
					<p className="text-muted-foreground">
						Remplissez les informations pour ajouter un nouveau complexe
					</p>
				</div>
				<Button variant="outline" size="sm" asChild>
					<Link to="/admin/facilities/complexes" search={{ view: "complexes" }}>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Retour à la liste
					</Link>
				</Button>
			</div>

			{showSuccessAlert && (
				<Alert className="border-green-200 bg-green-50">
					<CheckCircle className="h-4 w-4 text-green-600" />
					<AlertDescription className="text-green-800">
						Le complexe a été créé avec succès ! Redirection en cours...
					</AlertDescription>
				</Alert>
			)}

			<Alert>
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>
					<strong>Important :</strong> Une fois créé, ce complexe pourra
					contenir des salles qui pourront être réservées. Assurez-vous de
					fournir des informations précises et complètes.
				</AlertDescription>
			</Alert>

			<ComplexForm
				onSuccess={handleSuccess}
				onCancelLink="/admin/facilities/complexes?view=complexes"
			/>
		</div>
	);
}

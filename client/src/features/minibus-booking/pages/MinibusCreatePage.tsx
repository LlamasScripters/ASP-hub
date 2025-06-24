import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { MinibusForm } from "../components/minibuses/MinibusForm";
import { Link, useNavigate } from "@tanstack/react-router";
// @ts-ignore
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";
import { useState } from "react";

export function MinibusCreatePage() {
	const navigate = useNavigate();
	const [showSuccess, setShowSuccess] = useState(false);

	const handleSuccess = () => {
		setShowSuccess(true);
		setTimeout(() => {
			navigate({
				to: "/admin/assets/minibuses",
			});
		}, 1500);
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Créer un minibus</h1>
					<p className="text-muted-foreground">
						Ajouter un nouveau minibus à la flotte
					</p>
				</div>
				<Button variant="outline" size="sm" asChild>
					<Link to="/admin/assets/minibuses">
						<ArrowLeft className="w-4 h-4 mr-2" />
						Retour
					</Link>
				</Button>
			</div>

			{showSuccess && (
				<Alert className="border-green-200 bg-green-50">
					<CheckCircle className="h-4 w-4 text-green-600" />
					<AlertDescription className="text-green-800">
						Minibus créé avec succès ! Redirection en cours...
					</AlertDescription>
				</Alert>
			)}

			{/* Avertissement */}
			<Alert>
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>
					<strong>Important :</strong> Assurez-vous de remplir tous les champs
					requis et de définir les créneaux de disponibilité appropriés.
				</AlertDescription>
			</Alert>

			<MinibusForm
				onSuccess={handleSuccess}
				onCancelLink="/admin/assets/minibuses"
			/>
		</div>
	);
}

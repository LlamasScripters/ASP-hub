import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { MinibusForm } from "../components/minibuses/MinibusForm";
import type { Minibus } from "../lib/api/minibuses";
import { useNavigate } from "@tanstack/react-router";
import { Link, useRouter } from "@tanstack/react-router";
// @ts-ignore
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";
import { useState } from "react";

interface MinibusEditPageProps {
	minibus: Minibus;
}

export function MinibusEditPage({ minibus }: MinibusEditPageProps) {
	const navigate = useNavigate();
	const [showSuccess, setShowSuccess] = useState(false);
	const router = useRouter();
	const previousPageHref =
		router.__store.prevState?.resolvedLocation?.href || undefined;

	const handleSuccess = (updatedMinibus: Minibus) => {
		setShowSuccess(true);
		setTimeout(() => {
			navigate({
				to: `/admin/assets/minibuses/${updatedMinibus.id}`,
			});
		}, 1500);
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Modifier un minibus
					</h1>
					<p className="text-muted-foreground">
						Modifier le minibus <strong>{minibus.name}</strong>
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm" asChild>
						<Link to="/admin/assets/minibuses">
							<ArrowLeft className="w-4 h-4 mr-2" />
							Retour à la liste
						</Link>
					</Button>					
					<Button asChild>
						<Link
							to="/admin/assets/minibuses/$minibusId"
							params={{ minibusId: minibus.id }}
						>
							Voir les détails
						</Link>
					</Button>
				</div>
			</div>

			{showSuccess && (
				<Alert className="border-green-200 bg-green-50">
					<CheckCircle className="h-4 w-4 text-green-600" />
					<AlertDescription className="text-green-800">
						Minibus modifié avec succès ! Redirection en cours...
					</AlertDescription>
				</Alert>
			)}

			{/* Avertissement */}
			<Alert>
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>
					<strong>Important :</strong> Assurez-vous que les informations du
					minibus sont correctes avant de sauvegarder. Toute modification peut
					affecter les réservations existantes.
				</AlertDescription>
			</Alert>

			<MinibusForm
				minibus={minibus}
				onSuccess={handleSuccess}
				onCancelLink={previousPageHref}
			/>
		</div>
	);
}

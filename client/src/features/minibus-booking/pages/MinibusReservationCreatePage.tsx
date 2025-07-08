import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Link, useRouter } from "@tanstack/react-router";
// @ts-ignore
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";
import { MinibusReservationForm } from "../components/minibusReservations/MinibusReservationForm";
import type { Minibus } from "../lib/api/minibuses";

interface MinibusReservationCreatePageProps {
	minibus: Minibus;
}

export function MinibusReservationCreatePage({
	minibus,
}: MinibusReservationCreatePageProps) {
	const navigate = useNavigate();

	const router = useRouter();
	const previousPageHref =
		router.__store.prevState?.resolvedLocation?.href || undefined;

	const handleSuccess = () => {
		setTimeout(() => {
			navigate({
				to: `/admin/assets/minibuses/${minibus.id}`,
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
						Nouvelle réservation pour le minibus{" "}
						<span className="font-medium">{minibus.name}</span>
					</p>
				</div>{" "}
				<Button variant="outline" size="sm" asChild>
					<Link
						to="/admin/assets/minibuses/$minibusId"
						params={{ minibusId: minibus.id }}
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Retour au minibus
					</Link>
				</Button>
			</div>

			{/* Avertissement */}
			<Alert>
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>
					<strong>Important :</strong> Veuillez vérifier que les créneaux
					choisis ne soient pas déjà réservés et respectent les heures de
					disponibilité du minibus.
				</AlertDescription>
			</Alert>

			{/* Formulaire de réservation */}
			<MinibusReservationForm
				minibusId={minibus.id}
				minibusDisponibility={minibus.disponibility}
				onSuccess={handleSuccess}
				onCancelLink={previousPageHref}
			/>
		</div>
	);
}

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { MinibusReservationForm } from "../components/minibusReservations/MinibusReservationForm";
import type { Minibus } from "../lib/api/minibuses";
import type { MinibusReservation } from "../lib/api/minibusReservations";
import { useNavigate } from "@tanstack/react-router";
import { Link, useRouter } from "@tanstack/react-router";
// @ts-ignore
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";

interface MinibusReservationEditPageProps {
	minibus: Minibus;
	minibusReservation: MinibusReservation;
}

export function MinibusReservationEditPage({
	minibus,
	minibusReservation,
}: MinibusReservationEditPageProps) {
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
						Modifier une réservation
					</h1>
					<p className="text-muted-foreground">
						Modifier la réservation{" "}
						<span className="font-medium">{minibusReservation.title}</span> du minibus{" "}
						<span className="font-medium">{minibus.name}</span>
					</p>
				</div>
				<Button variant="outline" size="sm" asChild>
					<Link to="/admin/assets/minibuses">
						<ArrowLeft className="w-4 h-4 mr-2" />
						Retour au minibus
					</Link>
				</Button>
			</div>

			{/* Avertissement */}
			<Alert>
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>
					<strong>Important :</strong> En modifiant le créneau, vous pouvez
					entrer en conflit avec d'autres réservations. Vérifiez bien les
					nouvelles dates.
				</AlertDescription>
			</Alert>

			{/* Formulaire d'édition */}
			<MinibusReservationForm
				minibusId={minibus.id}
				minibusDisponibility={minibus.disponibility}
				minibusReservation={minibusReservation}
				onSuccess={handleSuccess}
				onCancelLink={previousPageHref}
			/>
		</div>
	);
}

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ComplexForm } from "@room-booking/components/complexes/ComplexForm";
import type { Complex } from "@room-booking/hooks/useComplexes";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
	AlertCircle,
	ArrowLeft,
	Building,
	CheckCircle,
	// @ts-ignore
} from "lucide-react";
import { useState } from "react";

interface ComplexEditPageProps {
	initialComplex: Complex;
}

export function ComplexEditPage({ initialComplex }: ComplexEditPageProps) {
	const navigate = useNavigate();
	const [isNavigating, setIsNavigating] = useState(false);
	const [showSuccessAlert, setShowSuccessAlert] = useState(false);

	const handleSuccess = (updatedComplex: Complex) => {
		setShowSuccessAlert(true);

		setTimeout(() => {
			setShowSuccessAlert(false);
		}, 3000);

		setTimeout(() => {
			setIsNavigating(true);
			navigate({ to: `/admin/facilities/complexes/${updatedComplex.id}` });
		}, 1500);
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("fr-FR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<div className="space-y-6">
			{/* En-tête */}
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Modifier le complexe
					</h1>
					<p className="text-muted-foreground">
						Modifiez les informations du complexe "{initialComplex.name}"
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm" asChild>
						<Link to="/admin/facilities/complexes" search={{ view: 'complexes' }}>
							<ArrowLeft className="w-4 h-4 mr-2" />
							Retour à la liste
						</Link>
					</Button>
					<Button asChild>
						<Link
							to="/admin/facilities/complexes/$complexId"
							params={{ complexId: initialComplex.id }}
						>
							Voir les détails
						</Link>
					</Button>
				</div>
			</div>

			{/* Message de succès */}
			{showSuccessAlert && (
				<Alert className="border-green-200 bg-green-50">
					<CheckCircle className="h-4 w-4 text-green-600" />
					<AlertDescription className="text-green-800">
						Le complexe a été modifié avec succès ! Redirection en cours...
					</AlertDescription>
				</Alert>
			)}

			{/* Informations du complexe actuel */}
			<Card className="bg-green-50 border-green-200">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-green-900">
						<Building className="w-5 h-5" />
						Informations actuelles
					</CardTitle>
					<CardDescription className="text-green-700">
						Voici les informations actuellement enregistrées pour ce complexe
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
						<div>
							<span className="font-medium text-green-900">Nom :</span>
							<span className="ml-2 text-green-800">{initialComplex.name}</span>
						</div>
						<div>
							<span className="font-medium text-green-900">Ville :</span>
							<span className="ml-2 text-green-800">{initialComplex.city}</span>
						</div>
						<div>
							<span className="font-medium text-green-900">Adresse :</span>
							<span className="ml-2 text-green-800">
								{initialComplex.street}
							</span>
						</div>
						<div>
							<span className="font-medium text-green-900">Code postal :</span>
							<span className="ml-2 text-green-800">
								{initialComplex.postalCode}
							</span>
						</div>
						<div>
							<span className="font-medium text-green-900">
								Places de parking :
							</span>
							<span className="ml-2 text-green-800">
								{initialComplex.parkingCapacity}
							</span>
						</div>
						<div>
							<span className="font-medium text-green-900">Ascenseurs :</span>
							<span className="ml-2 text-green-800">
								{initialComplex.numberOfElevators}
							</span>
						</div>
						<div>
							<span className="font-medium text-green-900">
								Accessibilité PMR :
							</span>
							<span className="ml-2 text-green-800">
								{initialComplex.accessibleForReducedMobility ? "Oui" : "Non"}
							</span>
						</div>
						<div>
							<span className="font-medium text-green-900">
								Dernière modification :
							</span>
							<span className="ml-2 text-green-800">
								{formatDate(initialComplex.updatedAt)}
							</span>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Avertissement */}
			<Alert>
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>
					<strong>Important :</strong> Les modifications apportées à ce complexe
					affecteront toutes les salles et réservations associées. Assurez-vous
					que les informations sont correctes avant de sauvegarder.
				</AlertDescription>
			</Alert>

			{/* Formulaire de modification */}
			<div className="space-y-4">
				<ComplexForm
					complex={initialComplex}
					onSuccess={handleSuccess}
					onCancelLink={`/admin/facilities/complexes/${initialComplex.id}?view=rooms`}
				/>
			</div>
		</div>
	);
}

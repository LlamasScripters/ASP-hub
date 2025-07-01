import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { SectionForm } from "../../components/sections/SectionForm";

export function SectionCreatePage() {
	const { clubId } = useParams({
		from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/create",
	});

	return (
		<div className="space-y-6">
			{/* En-tête cohérent */}
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Créer une section
					</h1>
					<p className="text-muted-foreground">
						Ajoutez une nouvelle section sportive à votre association
					</p>
				</div>
				<Button variant="outline" size="sm" asChild>
					<Link
						to="/admin/dashboard/clubs/$clubId/sections"
						params={{ clubId }}
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Retour aux sections
					</Link>
				</Button>
			</div>

			{/* Information importante */}
			<Alert>
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>
					<strong>Important :</strong> Chaque section peut contenir plusieurs 
					catégories d'âge avec leurs propres sessions d'entraînement.
				</AlertDescription>
			</Alert>

			<SectionForm mode="create" clubId={clubId} />
		</div>
	);
}

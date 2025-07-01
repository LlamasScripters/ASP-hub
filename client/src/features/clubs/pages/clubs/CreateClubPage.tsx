import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { ClubForm } from "../../components/clubs/ClubForm";

export function ClubCreatePage() {
	return (
		<div className="space-y-6">
			{/* En-tête cohérent */}
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Créer une association
					</h1>
					<p className="text-muted-foreground">
						Configurez votre nouvelle association sportive
					</p>
				</div>
				<Button variant="outline" size="sm" asChild>
					<Link to="/admin/dashboard/clubs">
						<ArrowLeft className="w-4 h-4 mr-2" />
						Retour au tableau de bord
					</Link>
				</Button>
			</div>

			{/* Information importante */}
			<Alert>
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>
					<strong>Important :</strong> Une fois créée, cette association contiendra 
					toutes vos sections et catégories sportives.
				</AlertDescription>
			</Alert>

			<ClubForm mode="create" />
		</div>
	);
}

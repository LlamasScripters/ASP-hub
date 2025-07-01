import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { CategoryForm } from "../../components/categories/CategoryForm";

export function CategoryCreatePage() {
	const { clubId, sectionId } = useParams({
		from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/categories/create",
	});

	return (
		<div className="space-y-6">
			{/* En-tête cohérent avec room-booking */}
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Créer une catégorie
					</h1>
					<p className="text-muted-foreground">
						Ajoutez une nouvelle catégorie à votre section
					</p>
				</div>
				<Button variant="outline" size="sm" asChild>
					<Link
						to="/admin/dashboard/clubs/$clubId/sections/$sectionId/categories"
						params={{ clubId, sectionId }}
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Retour à la liste
					</Link>
				</Button>
			</div>

			{/* Avertissement */}
			<Alert>
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>
					<strong>Important :</strong> Assurez-vous de définir les tranches d'âge
					appropriées pour cette catégorie.
				</AlertDescription>
			</Alert>

			<CategoryForm 
				mode="create" 
				clubId={clubId} 
				sectionId={sectionId}
			/>
		</div>
	);
}

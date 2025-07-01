import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { CategoryForm } from "../../components/categories/CategoryForm";

export function CategoryEditPage() {
	const { clubId, sectionId, categoryId } = useParams({
		from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/edit",
	});

	return (
		<div className="space-y-6">
			{/* En-tête cohérent */}
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Modifier la catégorie
					</h1>
					<p className="text-muted-foreground">
						Modifiez les informations de votre catégorie
					</p>
				</div>
				<div className="flex items-center gap-2">
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
			</div>

			{/* Avertissement */}
			<Alert>
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>
					<strong>Important :</strong> Les modifications de cette catégorie 
					peuvent affecter les sessions associées.
				</AlertDescription>
			</Alert>

			<CategoryForm
				mode="edit"
				clubId={clubId}
				sectionId={sectionId}
				categoryId={categoryId}
			/>
		</div>
	);
}

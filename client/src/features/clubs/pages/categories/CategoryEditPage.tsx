import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { CategoryForm } from "../../components/categories/CategoryForm";
import { useCategory } from "../../hooks/useCategories";

export function CategoryEditPage() {
	const { clubId, sectionId, categoryId } = useParams({
		from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/edit",
	});

	// Utilisation du hook pour récupérer la catégorie
	const { data: category, isLoading, error } = useCategory(categoryId);

	if (isLoading) {
		return (
			<div className="space-y-6">
				<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
					<div>
						<Skeleton className="h-9 w-64" />
						<Skeleton className="h-5 w-96 mt-2" />
					</div>
					<Skeleton className="h-9 w-40" />
				</div>
				<div className="space-y-4">
					<Skeleton className="h-20 w-full" />
					<Skeleton className="h-40 w-full" />
				</div>
			</div>
		);
	}

	if (error || !category) {
		return (
			<div className="space-y-6">
				<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">
							Erreur de chargement
						</h1>
						<p className="text-muted-foreground">
							Impossible de charger la catégorie
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
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>
						{error?.message || "Catégorie non trouvée"}
					</AlertDescription>
				</Alert>
			</div>
		);
	}

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
				category={category}
			/>
		</div>
	);
}

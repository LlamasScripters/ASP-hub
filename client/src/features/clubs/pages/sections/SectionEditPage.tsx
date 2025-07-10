import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { SectionForm } from "../../components/sections/SectionForm";
import type { Section } from "../../types";

export function SectionEditPage() {
	const { clubId, sectionId } = useParams({
		from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/edit",
	});

	const [section, setSection] = useState<Section | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchSection = async () => {
			try {
				setIsLoading(true);
				const response = await fetch(
					`/api/clubs/${clubId}/sections/${sectionId}`,
				);
				if (!response.ok) {
					throw new Error("Erreur lors du chargement de la section");
				}
				const sectionData = await response.json();
				setSection(sectionData);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Erreur inconnue");
			} finally {
				setIsLoading(false);
			}
		};

		fetchSection();
	}, [clubId, sectionId]);

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

	if (error || !section) {
		return (
			<div className="space-y-6">
				<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">
							Erreur de chargement
						</h1>
						<p className="text-muted-foreground">
							Impossible de charger la section
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
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>{error || "Section non trouvée"}</AlertDescription>
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
						Modifier la section
					</h1>
					<p className="text-muted-foreground">
						Modifiez les informations de votre section sportive
					</p>
				</div>
				<div className="flex items-center gap-2">
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
			</div>

			{/* Avertissement */}
			<Alert>
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>
					<strong>Important :</strong> Les modifications de cette section
					affecteront toutes les catégories et sessions associées.
				</AlertDescription>
			</Alert>

			<SectionForm
				mode="edit"
				clubId={clubId}
				sectionId={sectionId}
				section={section}
			/>
		</div>
	);
}

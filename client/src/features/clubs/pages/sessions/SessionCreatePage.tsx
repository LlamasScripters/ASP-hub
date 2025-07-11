import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useSection } from "../../hooks/useSections";
import { SessionForm } from "../../components/sessions/SessionForm";

export function SessionCreatePage() {
	const { clubId, sectionId, categoryId } = useParams({
		from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/create",
	});

	// Utilisation du hook pour récupérer la section
	const { data: section } = useSection(sectionId);

	return (
		<div className="space-y-6">
			{/* En-tête cohérent */}
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Créer une session
					</h1>
					<p className="text-muted-foreground">
						Nouvelle session pour la section{" "}
						<span className="font-medium">{section?.name || "..."}</span>
					</p>
				</div>
				<Button variant="outline" size="sm" asChild>
					<Link
						to="/admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions"
						params={{ clubId, sectionId, categoryId }}
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Retour aux sessions
					</Link>
				</Button>
			</div>

			{/* Information importante */}
			<Alert>
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>
					<strong>Important :</strong> Vérifiez que les dates et horaires
					choisis ne sont pas en conflit avec d'autres sessions.
				</AlertDescription>
			</Alert>

			<SessionForm
				mode="create"
				clubId={clubId}
				sectionId={sectionId}
				categoryId={categoryId}
			/>
		</div>
	);
}

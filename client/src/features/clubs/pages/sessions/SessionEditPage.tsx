import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { SessionForm } from "../../components/sessions/SessionForm";

export function SessionEditPage() {
	const { clubId, sectionId, categoryId, sessionId } = useParams({
		from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/$sessionId/edit",
	});

	return (
		<div className="space-y-6">
			{/* En-tête cohérent */}
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Modifier la session
					</h1>
					<p className="text-muted-foreground">
						Modifiez les informations de votre session
					</p>
				</div>
				<div className="flex items-center gap-2">
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
			</div>

			{/* Avertissement */}
			<Alert>
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>
					<strong>Important :</strong> Les modifications peuvent affecter les
					participants déjà inscrits à cette session.
				</AlertDescription>
			</Alert>

			<SessionForm
				mode="edit"
				clubId={clubId}
				sectionId={sectionId}
				categoryId={categoryId}
				sessionId={sessionId}
			/>
		</div>
	);
}

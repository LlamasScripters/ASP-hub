import { ApplicationsList } from "@/features/admin/applications/components/ApplicationsList";
import type { Application } from "@/features/admin/applications/lib/types";

interface ApplicationsPageProps {
	initialApplications?: Application[];
}

export function ApplicationsPage({
	initialApplications = [],
}: ApplicationsPageProps) {
	return (
		<div className="space-y-6">
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Gestion des candidatures
					</h1>
					<p className="text-muted-foreground">
						Examinez et gérez les candidatures d'adhésion des nouveaux membres
					</p>
				</div>
			</div>

			<ApplicationsList initialApplications={initialApplications} />
		</div>
	);
}

import { PermissionExamples } from "@/components/examples/PermissionExamples";
import { FirstLoginGuard } from "@/components/guards/FirstLoginGuard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/permissions-demo")({
	component: PermissionsDemoPage,
});

function PermissionsDemoPage() {
	return (
		<FirstLoginGuard>
			<div className="container mx-auto py-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
						Démonstration des permissions
					</h1>
					<p className="text-gray-600 dark:text-gray-400">
						Cette page démontre l'utilisation des guards de permissions et de
						rôles dans l'application.
					</p>
				</div>

				<PermissionExamples />
			</div>
		</FirstLoginGuard>
	);
}

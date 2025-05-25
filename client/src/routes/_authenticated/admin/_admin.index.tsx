import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/_admin/")({
	component: AdminHome,
});

export default function AdminHome() {
	return (
		<div className="space-y-4">
			<h2 className="text-xl font-bold">
				Bienvenue sur le panel d'administration
			</h2>
			<ul className="space-y-2">
				<li>
					<Link to="/admin/users">Gestion des utilisateurs</Link>
				</li>
			</ul>
		</div>
	);
}

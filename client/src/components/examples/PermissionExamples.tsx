import {
	AdminOnly,
	ManagerOnly,
	MemberOnly,
	PermissionGuard,
	RoleGuard,
} from "@/components/guards/PermissionGuards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { usePermissions } from "@/hooks/use-permissions";

/**
 * Exemple d'utilisation des guards de permission dans un composant
 */
export function PermissionExamples() {
	const { role, permissions, isAuthenticated } = usePermissions();

	if (!isAuthenticated) {
		return (
			<Card>
				<CardContent className="p-6">
					<p>Vous devez être connecté pour voir cette page.</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Informations utilisateur</CardTitle>
					<CardDescription>Votre rôle et permissions actuels</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<div>
							<strong>Rôle :</strong> <Badge variant="outline">{role}</Badge>
						</div>
						<div>
							<strong>Permissions :</strong>
							<div className="flex flex-wrap gap-1 mt-1">
								{permissions.slice(0, 5).map((permission) => (
									<Badge
										key={permission}
										variant="secondary"
										className="text-xs"
									>
										{permission}
									</Badge>
								))}
								{permissions.length > 5 && (
									<Badge variant="secondary" className="text-xs">
										+{permissions.length - 5} autres
									</Badge>
								)}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Exemples avec PermissionGuard */}
			<Card>
				<CardHeader>
					<CardTitle>Tests de permissions</CardTitle>
					<CardDescription>
						Affichage conditionnel basé sur les permissions
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<PermissionGuard
						permissions="admin:access"
						fallback={
							<p className="text-muted-foreground">
								❌ Vous n'avez pas accès à l'administration
							</p>
						}
					>
						<div className="p-4 bg-red-50 border border-red-200 rounded-md">
							✅ Vous avez accès à l'administration !
						</div>
					</PermissionGuard>

					<PermissionGuard
						permissions="applications:review"
						fallback={
							<p className="text-muted-foreground">
								❌ Vous ne pouvez pas reviewer les candidatures
							</p>
						}
					>
						<div className="p-4 bg-green-50 border border-green-200 rounded-md">
							✅ Vous pouvez reviewer les candidatures !
						</div>
					</PermissionGuard>

					<PermissionGuard
						permissions={["rooms:write", "minibus:write"]}
						requireAll={false}
						fallback={
							<p className="text-muted-foreground">
								❌ Vous ne pouvez gérer ni les salles ni les minibus
							</p>
						}
					>
						<div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
							✅ Vous pouvez gérer les salles ou les minibus !
						</div>
					</PermissionGuard>

					<PermissionGuard
						permissions={["rooms:write", "minibus:write"]}
						requireAll={true}
						fallback={
							<p className="text-muted-foreground">
								❌ Vous ne pouvez pas gérer TOUTES les réservations
							</p>
						}
					>
						<div className="p-4 bg-purple-50 border border-purple-200 rounded-md">
							✅ Vous pouvez gérer TOUTES les réservations !
						</div>
					</PermissionGuard>
				</CardContent>
			</Card>

			{/* Exemples avec RoleGuard */}
			<Card>
				<CardHeader>
					<CardTitle>Tests de rôles</CardTitle>
					<CardDescription>
						Affichage conditionnel basé sur les rôles
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<RoleGuard
						minRole="member"
						fallback={
							<p className="text-muted-foreground">❌ Réservé aux membres</p>
						}
					>
						<div className="p-4 bg-green-50 border border-green-200 rounded-md">
							✅ Contenu pour les membres et plus !
						</div>
					</RoleGuard>

					<RoleGuard
						minRole="coach"
						fallback={
							<p className="text-muted-foreground">
								❌ Réservé aux entraîneurs
							</p>
						}
					>
						<div className="p-4 bg-orange-50 border border-orange-200 rounded-md">
							✅ Contenu pour les entraîneurs et plus !
						</div>
					</RoleGuard>

					<RoleGuard
						roles={["section_manager", "admin"]}
						fallback={
							<p className="text-muted-foreground">
								❌ Réservé aux managers et admins
							</p>
						}
					>
						<div className="p-4 bg-red-50 border border-red-200 rounded-md">
							✅ Contenu pour managers et admins uniquement !
						</div>
					</RoleGuard>
				</CardContent>
			</Card>

			{/* Exemples avec les guards prédéfinis */}
			<Card>
				<CardHeader>
					<CardTitle>Guards prédéfinis</CardTitle>
					<CardDescription>
						Utilisation des composants de protection prédéfinis
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<MemberOnly
						fallback={<p className="text-muted-foreground">❌ Membre requis</p>}
					>
						<Button variant="outline" className="w-full">
							🎫 Action réservée aux membres
						</Button>
					</MemberOnly>

					<ManagerOnly
						fallback={
							<p className="text-muted-foreground">❌ Manager requis</p>
						}
					>
						<Button variant="outline" className="w-full">
							🏢 Action réservée aux managers
						</Button>
					</ManagerOnly>

					<AdminOnly
						fallback={<p className="text-muted-foreground">❌ Admin requis</p>}
					>
						<Button variant="destructive" className="w-full">
							⚠️ Action d'administration
						</Button>
					</AdminOnly>
				</CardContent>
			</Card>
		</div>
	);
}

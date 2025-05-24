import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import type { ClientAccount } from "@/lib/auth/auth-client";
import type { User } from "@backend/db/schema.js";
import { UserPasswordAskResetForm } from "../components/UserPasswordAskResetForm";
import { UserPasswordUpdateForm } from "../components/UserPasswordUpdateForm";
import { UserSettingsEditForm } from "../components/UserSettingsEditForm";

export function UserSettingsPage({
	user,
	accounts,
}: {
	user: User;
	accounts: ClientAccount[];
}) {
	const hasPassword = accounts.some(
		(account) => account.provider === "credential",
	);

	const UserPasswordForm = hasPassword
		? UserPasswordUpdateForm
		: UserPasswordAskResetForm;

	return (
		<div className="container max-w-2xl py-6 space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Informations personnelles</CardTitle>
					<CardDescription>
						Gérez vos informations personnelles et votre photo de profil.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<UserSettingsEditForm user={user} />
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Sécurité</CardTitle>
					<CardDescription>
						Gérez votre mot de passe pour sécuriser votre compte.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<UserPasswordForm />
				</CardContent>
			</Card>
		</div>
	);
}

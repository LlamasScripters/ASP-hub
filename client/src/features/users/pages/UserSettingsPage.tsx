import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { UserLoggedIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { UserSettingsEditForm } from "../components/UserSettingsEditForm";

export function UserSettingsPage({ user }: { user: UserLoggedIn }) {
	const handleSuccess = () => {
		toast.success("Paramètres mis à jour", {
			description: "Vos paramètres ont été mis à jour avec succès.",
			dismissible: true,
		});
	};

	return (
		<div className="container max-w-2xl py-6">
			<Card>
				<CardHeader>
					<CardTitle>Paramètres du compte</CardTitle>
					<CardDescription>
						Gérez vos informations personnelles et vos préférences de compte.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<UserSettingsEditForm
						initialData={{
							firstName: user.firstName,
							lastName: user.lastName,
							email: user.email,
							dateOfBirth: user.dateOfBirth,
							image: user.image,
						}}
						onSuccess={handleSuccess}
					/>
				</CardContent>
			</Card>
		</div>
	);
}

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { Route as AuthenticatedRoute } from "@/routes/_authenticated";
import { Route as UserRoute } from "@/routes/_authenticated/(nonadmin)/_nonadmin/user/_user";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { UserPasswordAskResetForm } from "../components/UserPasswordAskResetForm";
import { UserPasswordUpdateForm } from "../components/UserPasswordUpdateForm";
import UserUpdateForm from "../components/UserUpdateForm";

export default function UserSettingsPage() {
	const { user } = AuthenticatedRoute.useLoaderData();
	const { accounts } = UserRoute.useLoaderData();

	const hasPassword = accounts.some(
		(account) => account.provider === "credential",
	);

	const UserPasswordForm = hasPassword
		? UserPasswordUpdateForm
		: UserPasswordAskResetForm;

	return (
		<div className="container max-w-2xl py-6 space-y-6">
			<div className="flex items-center gap-2">
				<Button variant="link" size="sm" className="gap-2" asChild>
					<Link to="/user/profile">
						<ArrowLeft className="h-4 w-4" />
						Retour au profil
					</Link>
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Informations personnelles</CardTitle>
					<CardDescription>
						Gérez vos informations personnelles et votre photo de profil.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<UserUpdateForm user={user} />
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

import AuthFooter from "@/components/AuthFooter";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Shield } from "lucide-react";
import { ResetPasswordForm } from "./ResetPasswordForm";

interface ResetPasswordPageProps {
	token: string;
}

export function ResetPasswordPage({ token }: ResetPasswordPageProps) {
	return (
		<div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
			<div className="container flex flex-col items-center justify-center flex-1 px-4 py-12 mx-auto sm:px-6">
				<Link
					to="/"
					className="flex items-center mb-8 text-emerald-600 hover:text-emerald-700"
				>
					<ArrowLeft className="w-4 h-4 mr-2" />
					Retour à l'accueil
				</Link>

				<Card className="w-full max-w-md">
					<CardHeader className="space-y-1 text-center">
						<div className="flex justify-center mb-2">
							<Shield className="w-10 h-10 text-emerald-600" />
						</div>
						<CardTitle className="text-2xl font-bold">
							Changer de mot de passe
						</CardTitle>
						<CardDescription>
							Veuillez entrer un nouveau mot de passe
						</CardDescription>
					</CardHeader>
					<CardContent>
						{token ? (
							<ResetPasswordForm token={token} />
						) : (
							<div className="text-center">
								<p>Le lien de réinitialisation est invalide ou a expiré.</p>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
			<AuthFooter />
		</div>
	);
}

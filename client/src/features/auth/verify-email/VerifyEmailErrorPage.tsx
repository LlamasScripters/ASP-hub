import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";

export default function VerifyEmailErrorPage() {
	return (
		<Card className="w-full max-w-md">
			<CardHeader className="space-y-1 text-center">
				<div className="flex justify-center mb-2">
					<Shield className="w-10 h-10 text-emerald-600" />
				</div>
				<CardTitle className="text-2xl font-bold">
					Erreur de vérification
				</CardTitle>
				<CardDescription>
					Une erreur est survenue lors de la vérification de votre email. Le
					lien est peut-être invalide ou expiré.
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col items-center justify-center">
				<Link
					to="/auth/login"
					className="mt-4 text-emerald-600 hover:text-emerald-700"
				>
					Retour à la connexion
				</Link>
			</CardContent>
		</Card>
	);
}

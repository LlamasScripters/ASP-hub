import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";

export default function VerifyEmailSuccessPage() {
	return (
		<Card className="w-full max-w-md">
			<CardHeader className="space-y-1 text-center">
				<div className="flex justify-center mb-2">
					<Shield className="w-10 h-10 text-emerald-600" />
				</div>
				<CardTitle className="text-2xl font-bold">
					Vérification de l'email
				</CardTitle>
				<CardDescription>
					Votre email a été vérifié avec succès ! Redirection vers la
					connexion...
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col items-center justify-center">
				<Button variant="default" className="mt-4" asChild>
					<Link to="/auth/login">Retour à la connexion</Link>
				</Button>
			</CardContent>
		</Card>
	);
}

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ForgotPasswordForm } from "@/features/auth/ForgotPasswordForm";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/auth/forgot-password")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-muted/50">
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
				<div className="flex flex-col space-y-2 text-center">
					<Button variant="link" asChild className="self-center">
						<Link to="/auth/login" className="flex items-center">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Retour à la connexion
						</Link>
					</Button>
				</div>

				<Card>
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl text-center">
							Mot de passe oublié
						</CardTitle>
						<CardDescription className="text-center">
							Entrez votre adresse email pour recevoir un lien de
							réinitialisation
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ForgotPasswordForm />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

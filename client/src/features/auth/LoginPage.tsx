import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="container flex flex-col items-center justify-center flex-1 px-4 py-12 mx-auto sm:px-6">
				<Button variant="link" asChild>
					<Link to="/" className="flex items-center mb-8">
						<ArrowLeftIcon className="w-4 h-4 mr-2" />
						Retour à l'accueil
					</Link>
				</Button>

				<Card className="w-full max-w-md">
					<CardHeader className="space-y-1 text-center">
						<div className="flex justify-center mb-2">
							<Logo />
						</div>
						<CardTitle className="text-2xl font-bold">Connexion</CardTitle>
						<CardDescription>
							Entrez vos identifiants pour accéder à votre compte
						</CardDescription>
					</CardHeader>
					<CardContent>
						<LoginForm />
						<div className="mt-4 text-sm text-center text-muted-foreground">
							Pas encore de compte?{" "}
							<Button variant="link" asChild className="p-0">
								<Link to="/auth/register">S'inscrire</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

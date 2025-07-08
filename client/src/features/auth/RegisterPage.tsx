import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { RegisterForm } from "./RegisterForm";

export default function RegisterPage() {
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
						<CardTitle className="text-2xl font-bold">
							Créer un compte
						</CardTitle>
						<CardDescription>
							Inscrivez-vous pour rejoindre l'association
						</CardDescription>
					</CardHeader>
					<CardContent>
						<RegisterForm />
					</CardContent>
					<CardFooter className="flex justify-center">
						<div className="text-sm text-center text-muted-foreground">
							Déjà inscrit?{" "}
							<Button variant="link" asChild className="p-0">
								<Link to="/auth/login">Se connecter</Link>
							</Button>
						</div>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}

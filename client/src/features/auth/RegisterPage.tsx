import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Shield } from "lucide-react";
import { RegisterForm } from "./RegisterForm";

export default function RegisterPage() {
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
							Créer un compte
						</CardTitle>
						<CardDescription>
							Inscrivez-vous pour rejoindre l'association
						</CardDescription>
					</CardHeader>
					<CardContent>
						<RegisterForm />
					</CardContent>
					<CardFooter className="flex flex-col">
						<div className="mt-4 text-sm text-center text-gray-500">
							Déjà inscrit?{" "}
							<Link
								to="/auth/login"
								className="text-emerald-600 hover:text-emerald-700"
							>
								Se connecter
							</Link>
						</div>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}

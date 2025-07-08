import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckCircle, Mail } from "lucide-react";

export const Route = createFileRoute("/_auth/auth/account-created")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
			<div className="container flex flex-col items-center justify-center flex-1 px-4 py-12 mx-auto sm:px-6">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center pb-4">
						<div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
							<CheckCircle className="w-8 h-8 text-green-600" />
						</div>

						<CardTitle className="text-2xl font-bold">
							Compte créé avec succès !
						</CardTitle>
					</CardHeader>

					<CardContent className="space-y-6">
						<div className="text-center">
							<div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
								<Mail className="w-6 h-6 text-blue-600" />
							</div>
							<CardDescription className="text-center leading-relaxed">
								Nous avons envoyé un email de vérification dans votre boîte de
								réception. Veuillez vérifier votre email et cliquer sur le lien
								de vérification pour activer votre compte.
							</CardDescription>
						</div>
						<Alert>
							<AlertDescription>
								<div>
									<h3 className="font-semibold text-foreground mb-2">
										Prochaines étapes :
									</h3>
									<ol className="text-sm space-y-1 list-decimal list-inside">
										<li>Vérifiez votre boîte de réception</li>
										<li>Cherchez notre email de vérification</li>
										<li>Cliquez sur le lien de vérification</li>
										<li>Commencez à utiliser votre compte !</li>
									</ol>
								</div>
							</AlertDescription>
						</Alert>

						<div className="text-center space-y-2">
							<p className="text-sm text-muted-foreground">
								Vous n'avez pas reçu l'email ?
							</p>
							<Button variant="link" className="text-sm h-auto p-0">
								Renvoyer l'email de vérification
							</Button>
							<p className="text-sm text-muted-foreground">
								Vérifiez votre dossier spam ou{" "}
								<Button variant="link" asChild className="text-sm h-auto p-0">
									{/* TODO: implement support page */}
									{/* @ts-ignore need to implement support page */}
									<Link to="/support">contactez le support</Link>
								</Button>
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

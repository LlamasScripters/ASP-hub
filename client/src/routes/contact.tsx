import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

// biome-ignore lint/suspicious/noExplicitAny: TanStack Router types will be generated automatically
export const Route = createFileRoute("/contact" as any)({
	component: ContactPage,
});

function ContactPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="container mx-auto px-4 py-8 max-w-4xl flex-1">
				<h1 className="text-3xl font-bold mb-8">Contact</h1>

				<div className="grid md:grid-cols-2 gap-8">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<MapPin className="h-5 w-5" />
								Association Sportive Omnisports de Pierrefitte-sur-Seine
							</CardTitle>
							<CardDescription>
								Votre association sportive locale depuis 1940
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-start gap-3">
								<MapPin className="h-5 w-5 text-emerald-600 mt-0.5" />
								<div>
									<p className="font-medium">Adresse</p>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Complexe Sportif Municipal
										<br />
										Avenue de la République
										<br />
										93380 Pierrefitte-sur-Seine
									</p>
								</div>
							</div>

							<div className="flex items-center gap-3">
								<Phone className="h-5 w-5 text-emerald-600" />
								<div>
									<p className="font-medium">Téléphone</p>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										01 48 26 75 42
									</p>
								</div>
							</div>

							<div className="flex items-center gap-3">
								<Mail className="h-5 w-5 text-emerald-600" />
								<div>
									<p className="font-medium">Email</p>
									<a
										href="mailto:contact@asops-pierrefitte.fr"
										className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 transition-colors"
									>
										contact@asops-pierrefitte.fr
									</a>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<Clock className="h-5 w-5 text-emerald-600 mt-0.5" />
								<div>
									<p className="font-medium">Horaires d'ouverture</p>
									<div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
										<p>Lundi - Vendredi : 9h00 - 12h00 / 14h00 - 18h00</p>
										<p>Samedi : 9h00 - 12h00</p>
										<p>Dimanche : Fermé</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Support technique</CardTitle>
							<CardDescription>
								Pour toute question concernant la plateforme numérique
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center gap-3">
								<Mail className="h-5 w-5 text-emerald-600" />
								<div>
									<p className="font-medium">Support</p>
									<a
										href="mailto:support@asops-pierrefitte.fr"
										className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 transition-colors"
									>
										support@asops-pierrefitte.fr
									</a>
								</div>
							</div>

							<div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
								<h3 className="font-medium mb-2">Questions fréquentes</h3>
								<ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
									<li>• Problèmes de connexion</li>
									<li>• Réservation de créneaux</li>
									<li>• Gestion du profil</li>
									<li>• Questions sur les données personnelles</li>
								</ul>
							</div>

							<Button
								className="w-full"
								onClick={() =>
									window.open(
										"mailto:contact@asops-pierrefitte.fr?subject=Contact depuis la plateforme ASOPS",
									)
								}
							>
								<Mail className="h-4 w-4 mr-2" />
								Envoyer un message
							</Button>
						</CardContent>
					</Card>
				</div>

				<Card className="mt-8">
					<CardHeader>
						<CardTitle>Informations légales</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-2 gap-6">
							<div>
								<h3 className="font-medium mb-2">Statut juridique</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Association loi 1901
									<br />
									Déclarée en préfecture de Seine-Saint-Denis
									<br />
									SIRET : 123 456 789 00012
								</p>
							</div>

							<div>
								<h3 className="font-medium mb-2">Responsable de publication</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Président de l'ASOPS
									<br />
									Email :{" "}
									<a
										href="mailto:president@asops-pierrefitte.fr"
										className="hover:text-emerald-600 transition-colors"
									>
										president@asops-pierrefitte.fr
									</a>
								</p>
							</div>

							<div>
								<h3 className="font-medium mb-2">Protection des données</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Délégué à la Protection des Données
									<br />
									Email :{" "}
									<a
										href="mailto:dpo@asops-pierrefitte.fr"
										className="hover:text-emerald-600 transition-colors"
									>
										dpo@asops-pierrefitte.fr
									</a>
								</p>
							</div>

							<div>
								<h3 className="font-medium mb-2">Hébergement</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Hébergeur de la plateforme
									<br />
									Conformément à l'article 6-III de la loi n° 2004-575
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
			<Footer />
		</div>
	);
}

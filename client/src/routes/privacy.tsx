import Footer from "@/components/Footer";
import { createFileRoute } from "@tanstack/react-router";

// biome-ignore lint/suspicious/noExplicitAny: TanStack Router types will be generated automatically
export const Route = createFileRoute("/privacy" as any)({
	component: PrivacyPage,
});

function PrivacyPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="container mx-auto px-4 py-8 max-w-4xl flex-1">
				<h1 className="text-3xl font-bold mb-8">
					Politique de Confidentialité
				</h1>

				<div className="prose prose-lg max-w-none dark:prose-invert">
					<section className="mb-8">
						<h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
						<p>
							L'Association Sportive Omnisports de Pierrefitte-sur-Seine (ASOPS)
							s'engage à protéger la confidentialité de vos données
							personnelles. Cette politique explique comment nous collectons,
							utilisons et protégeons vos informations conformément au Règlement
							Général sur la Protection des Données (RGPD).
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold mb-4">
							2. Responsable du traitement
						</h2>
						<div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
							<p>
								<strong>
									Association Sportive Omnisports de Pierrefitte-sur-Seine
								</strong>
							</p>
							<p>Complexe Sportif Municipal, Avenue de la République</p>
							<p>93380 Pierrefitte-sur-Seine</p>
							<p>Email : dpo@asops-pierrefitte.fr</p>
						</div>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold mb-4">
							3. Données collectées
						</h2>
						<p>Nous collectons les données suivantes :</p>

						<h3 className="text-xl font-semibold mt-6 mb-3">
							3.1 Données d'identification
						</h3>
						<ul className="list-disc list-inside ml-4 space-y-2">
							<li>Nom, prénom</li>
							<li>Date de naissance</li>
							<li>Adresse postale et email</li>
							<li>Numéro de téléphone</li>
							<li>Photographie (pour la carte d'adhérent)</li>
						</ul>

						<h3 className="text-xl font-semibold mt-6 mb-3">
							3.2 Données d'adhésion
						</h3>
						<ul className="list-disc list-inside ml-4 space-y-2">
							<li>Numéro d'adhérent</li>
							<li>Sections sportives pratiquées</li>
							<li>Certificat médical (validité)</li>
							<li>Historique des cotisations</li>
						</ul>

						<h3 className="text-xl font-semibold mt-6 mb-3">
							3.3 Données techniques
						</h3>
						<ul className="list-disc list-inside ml-4 space-y-2">
							<li>Adresse IP</li>
							<li>Données de connexion</li>
							<li>Cookies techniques et préférences</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold mb-4">
							4. Finalités du traitement
						</h2>
						<p>Vos données sont utilisées pour :</p>
						<ul className="list-disc list-inside ml-4 space-y-2">
							<li>Gérer votre adhésion et votre compte</li>
							<li>Organiser les activités sportives et les réservations</li>
							<li>Assurer la communication avec les adhérents</li>
							<li>Respecter nos obligations légales et réglementaires</li>
							<li>
								Améliorer nos services (analyses statistiques anonymisées)
							</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold mb-4">5. Base légale</h2>
						<p>Le traitement de vos données repose sur :</p>
						<ul className="list-disc list-inside ml-4 space-y-2">
							<li>
								<strong>Exécution du contrat</strong> : gestion de votre
								adhésion
							</li>
							<li>
								<strong>Intérêt légitime</strong> : amélioration de nos services
							</li>
							<li>
								<strong>Obligation légale</strong> : obligations comptables et
								déclaratives
							</li>
							<li>
								<strong>Consentement</strong> : communications marketing
								(optionnel)
							</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold mb-4">6. Vos droits</h2>
						<p>Conformément au RGPD, vous disposez des droits suivants :</p>

						<div className="grid md:grid-cols-2 gap-4 mt-4">
							<div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
								<h3 className="font-semibold mb-2">
									Droits d'accès et de rectification
								</h3>
								<p className="text-sm">
									Consultez et corrigez vos données personnelles
								</p>
							</div>

							<div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
								<h3 className="font-semibold mb-2">Droit à l'effacement</h3>
								<p className="text-sm">
									Demandez la suppression de vos données
								</p>
							</div>

							<div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
								<h3 className="font-semibold mb-2">Droit à la portabilité</h3>
								<p className="text-sm">
									Récupérez vos données dans un format lisible
								</p>
							</div>

							<div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
								<h3 className="font-semibold mb-2">Droit d'opposition</h3>
								<p className="text-sm">
									Refusez certains traitements de données
								</p>
							</div>
						</div>

						<p className="mt-4">
							Pour exercer vos droits, contactez-nous à :
							<a
								href="mailto:dpo@asops-pierrefitte.fr"
								className="text-emerald-600 hover:text-emerald-700 underline ml-1"
							>
								dpo@asops-pierrefitte.fr
							</a>
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold mb-4">7. Cookies</h2>
						<p>
							Notre site utilise des cookies essentiels pour son fonctionnement
							et des cookies de préférences pour améliorer votre expérience.
							Vous pouvez gérer vos préférences cookies à tout moment.
						</p>
					</section>

					<div className="text-sm text-gray-600 dark:text-gray-400 mt-8 pt-4 border-t">
						<p>
							Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
						</p>
						<p>Version 1.0 - Conforme RGPD</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

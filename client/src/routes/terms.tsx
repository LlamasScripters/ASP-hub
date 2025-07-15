import Footer from "@/components/Footer";
import { createFileRoute } from "@tanstack/react-router";

// biome-ignore lint/suspicious/noExplicitAny: TanStack Router types will be generated automatically
export const Route = createFileRoute("/terms" as any)({
	component: TermsPage,
});

function TermsPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="container mx-auto px-4 py-8 max-w-4xl flex-1">
				<h1 className="text-3xl font-bold mb-8">
					Conditions Générales d'Utilisation
				</h1>

				<div className="prose prose-lg max-w-none dark:prose-invert">
					<section className="mb-8">
						<h2 className="text-2xl font-semibold mb-4">1. Objet</h2>
						<p>
							Les présentes Conditions Générales d'Utilisation (CGU) régissent
							l'utilisation de la plateforme numérique de l'Association Sportive
							Omnisports de Pierrefitte-sur-Seine (ASOPS), destinée à la gestion
							des adhésions, réservations et activités de l'association.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold mb-4">
							2. Accès et inscription
						</h2>
						<p>
							L'accès à la plateforme est réservé aux membres de l'ASOPS.
							L'inscription nécessite la validation de votre adhésion auprès de
							l'association. Chaque utilisateur est responsable de la
							confidentialité de ses identifiants de connexion.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold mb-4">
							3. Utilisation de la plateforme
						</h2>
						<p>La plateforme permet aux adhérents de :</p>
						<ul className="list-disc list-inside ml-4 space-y-2">
							<li>Consulter les informations sur les activités sportives</li>
							<li>Effectuer des réservations de créneaux et d'équipements</li>
							<li>Participer aux communications de l'association</li>
							<li>Gérer leur profil et leurs préférences</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold mb-4">
							4. Obligations des utilisateurs
						</h2>
						<p>Les utilisateurs s'engagent à :</p>
						<ul className="list-disc list-inside ml-4 space-y-2">
							<li>
								Utiliser la plateforme de manière respectueuse et conforme aux
								valeurs sportives
							</li>
							<li>
								Fournir des informations exactes et maintenir leur profil à jour
							</li>
							<li>
								Respecter les créneaux de réservation et annuler en cas
								d'empêchement
							</li>
							<li>Ne pas partager leurs identifiants de connexion</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold mb-4">5. Responsabilité</h2>
						<p>
							L'ASOPS s'efforce d'assurer la disponibilité et le bon
							fonctionnement de la plateforme, mais ne peut garantir une
							disponibilité continue. L'association se réserve le droit de
							suspendre temporairement l'accès pour maintenance ou mise à jour.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold mb-4">
							6. Protection des données
						</h2>
						<p>
							Les données personnelles sont traitées conformément à notre{" "}
							<a
								href="/privacy"
								className="text-emerald-600 hover:text-emerald-700 underline"
							>
								{" "}
								Politique de Confidentialité{" "}
							</a>
							et au Règlement Général sur la Protection des Données (RGPD).
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold mb-4">
							7. Modification des CGU
						</h2>
						<p>
							L'ASOPS se réserve le droit de modifier ces CGU. Les utilisateurs
							seront informés des modifications par le biais de la plateforme.
							La poursuite de l'utilisation après notification vaut acceptation
							des nouvelles conditions.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
						<p>
							Pour toute question concernant ces CGU, contactez-nous via notre
							<a
								href="/contact"
								className="text-emerald-600 hover:text-emerald-700 underline"
							>
								{" "}
								page de contact
							</a>
							.
						</p>
					</section>

					<div className="text-sm text-gray-600 dark:text-gray-400 mt-8 pt-4 border-t">
						<p>
							Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

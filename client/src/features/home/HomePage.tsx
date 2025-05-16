import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
	ArrowRight,
	Award,
	BookOpen,
	Briefcase,
	Calendar,
	Shield,
	Users,
} from "lucide-react";

export default function HomePage() {
	return (
		<div className="flex flex-col min-h-screen">
			<header className="bg-white border-b border-gray-200 dark:bg-gray-950 dark:border-gray-800">
				<div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6">
					<div className="flex items-center">
						<Shield className="w-8 h-8 text-emerald-600" />
						<span className="ml-2 text-xl font-bold">ASOPS</span>
					</div>
					<nav className="hidden space-x-6 md:flex">
						<Link
							to="."
							hash="features"
							className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
						>
							Fonctionnalités
						</Link>
						<Link
							to="."
							hash="about"
							className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
						>
							À propos
						</Link>
						<Link
							to="."
							hash="contact"
							className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
						>
							Contact
						</Link>
					</nav>
					<div className="flex items-center space-x-4">
						<Link to="/auth/login">
							<Button variant="outline">Connexion</Button>
						</Link>
						<Link to="/auth/register" className="hidden sm:inline-block">
							<Button>Inscription</Button>
						</Link>
					</div>
				</div>
			</header>
			<main className="flex-1">
				<section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
					<div className="container px-4 mx-auto sm:px-6">
						<div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
							<div className="flex flex-col justify-center space-y-6">
								<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
									Association Sportive Omnisports de Pierrefitte-sur-Seine
								</h1>
								<p className="max-w-lg text-lg text-gray-600 dark:text-gray-300">
									Une plateforme complète pour gérer les adhérents, les
									activités sportives et les initiatives sociales de notre
									association.
								</p>
								<div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
									<Link to="/auth/register">
										<Button size="lg" className="w-full sm:w-auto">
											Rejoindre l'association
											<ArrowRight className="w-4 h-4 ml-2" />
										</Button>
									</Link>
									<Link to="/auth/login">
										<Button
											size="lg"
											variant="outline"
											className="w-full sm:w-auto"
										>
											Espace membre
										</Button>
									</Link>
								</div>
							</div>
							<div className="flex items-center justify-center">
								<div className="relative w-full h-64 overflow-hidden rounded-lg shadow-xl sm:h-80 md:h-96 lg:h-full">
									<div className="absolute inset-0 bg-emerald-600 opacity-10" />
									<div className="absolute inset-0 flex items-center justify-center">
										<Shield className="w-32 h-32 text-emerald-600" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section id="features" className="py-20 bg-white dark:bg-gray-950">
					<div className="container px-4 mx-auto sm:px-6">
						<div className="max-w-3xl mx-auto mb-16 text-center">
							<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
								Fonctionnalités principales
							</h2>
							<p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
								Notre application offre une solution complète pour la gestion de
								l'association.
							</p>
						</div>
						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							<div className="p-6 bg-gray-50 rounded-lg dark:bg-gray-900">
								<Users className="w-10 h-10 mb-4 text-emerald-600" />
								<h3 className="mb-2 text-xl font-bold">
									Gestion des adhérents
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									Inscription en ligne, gestion des profils, suivi des
									cotisations et des certificats médicaux.
								</p>
							</div>
							<div className="p-6 bg-gray-50 rounded-lg dark:bg-gray-900">
								<Calendar className="w-10 h-10 mb-4 text-emerald-600" />
								<h3 className="mb-2 text-xl font-bold">
									Organisation des activités
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									Planning des entraînements, réservation des infrastructures et
									suivi des performances.
								</p>
							</div>
							<div className="p-6 bg-gray-50 rounded-lg dark:bg-gray-900">
								<Award className="w-10 h-10 mb-4 text-emerald-600" />
								<h3 className="mb-2 text-xl font-bold">
									Événements socio-sportifs
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									Gestion des aides, suivi des bénéficiaires et mesure de
									l'impact des initiatives.
								</p>
							</div>
							<div className="p-6 bg-gray-50 rounded-lg dark:bg-gray-900">
								<Briefcase className="w-10 h-10 mb-4 text-emerald-600" />
								<h3 className="mb-2 text-xl font-bold">
									Administration et finances
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									Gestion des dépenses, facturation, suivi des subventions et
									rapports financiers.
								</p>
							</div>
							<div className="p-6 bg-gray-50 rounded-lg dark:bg-gray-900">
								<BookOpen className="w-10 h-10 mb-4 text-emerald-600" />
								<h3 className="mb-2 text-xl font-bold">Communication</h3>
								<p className="text-gray-600 dark:text-gray-300">
									Messagerie interne, forum communautaire, notifications et
									intégration avec les réseaux sociaux.
								</p>
							</div>
							<div className="p-6 bg-gray-50 rounded-lg dark:bg-gray-900">
								<Shield className="w-10 h-10 mb-4 text-emerald-600" />
								<h3 className="mb-2 text-xl font-bold">
									Sécurité et conformité
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									Protection des données personnelles, gestion sécurisée des
									paiements et conformité RGPD.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
					<div className="container px-4 mx-auto sm:px-6">
						<div className="max-w-3xl mx-auto text-center">
							<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
								À propos de l'association
							</h2>
							<p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
								L'association sportive omnisports de Pierrefitte-sur-Seine est
								une structure regroupant plus de 1500 adhérents et proposant
								plusieurs disciplines sportives (compétition, loisir, haut
								niveau).
							</p>
							<p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
								Elle joue également un rôle social important à travers des
								initiatives comme l'aide au permis de conduire pour les jeunes,
								le soutien scolaire pour les élèves et étudiants, et l'insertion
								professionnelle par le sport.
							</p>
						</div>
					</div>
				</section>

				<section id="contact" className="py-20 bg-white dark:bg-gray-950">
					<div className="container px-4 mx-auto sm:px-6">
						<div className="max-w-3xl mx-auto text-center">
							<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
								Contactez-nous
							</h2>
							<p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
								Pour plus d'informations sur l'association ou l'application,
								n'hésitez pas à nous contacter.
							</p>
							<div className="mt-8">
								<Button size="lg">Nous contacter</Button>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className="py-8 bg-gray-900 dark:bg-black">
				<div className="container px-4 mx-auto sm:px-6">
					<div className="flex flex-col items-center justify-between md:flex-row">
						<div className="flex items-center mb-4 md:mb-0">
							<Shield className="w-6 h-6 text-emerald-500" />
							<span className="ml-2 text-lg font-bold text-white">ASOPS</span>
						</div>
						<div className="text-sm text-gray-400">
							© {new Date().getFullYear()} Association Sportive Omnisports de
							Pierrefitte-sur-Seine. Tous droits réservés.
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

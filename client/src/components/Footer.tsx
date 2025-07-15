import { Link } from "@tanstack/react-router";
import Logo from "./Logo";

export default function Footer() {
	return (
		<footer className="py-8 bg-gray-900 dark:bg-black">
			<div className="container px-4 mx-auto sm:px-6">
				<div className="grid md:grid-cols-4 gap-8 mb-8">
					{/* Logo et description */}
					<div className="md:col-span-2">
						<div className="flex items-center mb-4">
							<Logo className="w-8 h-8" />
							<span className="ml-2 text-lg font-bold text-white">
								AS Pierrefitte
							</span>
						</div>
						<p className="text-sm text-gray-400 max-w-md">
							Association Sportive Omnisports de Pierrefitte-sur-Seine - Votre
							club sportif depuis 1940. Sport, convivialité et dépassement de
							soi.
						</p>
					</div>

					{/* Liens légaux */}
					<div>
						<h3 className="text-white font-semibold mb-4">
							Informations légales
						</h3>
						<ul className="space-y-2">
							<li>
								<a
									href="/terms"
									className="text-sm text-gray-400 hover:text-white transition-colors"
								>
									Conditions d'utilisation
								</a>
							</li>
							<li>
								<a
									href="/privacy"
									className="text-sm text-gray-400 hover:text-white transition-colors"
								>
									Politique de confidentialité
								</a>
							</li>
							<li>
								<a
									href="/contact"
									className="text-sm text-gray-400 hover:text-white transition-colors"
								>
									Contact & Mentions légales
								</a>
							</li>
						</ul>
					</div>

					{/* Contact rapide */}
					<div>
						<h3 className="text-white font-semibold mb-4">Contact</h3>
						<ul className="space-y-2 text-sm text-gray-400">
							<li>01 48 26 75 42</li>
							<li>
								<a
									href="mailto:contact@asops-pierrefitte.fr"
									className="hover:text-white transition-colors"
								>
									contact@asops-pierrefitte.fr
								</a>
							</li>
							<li>
								Complexe Sportif Municipal
								<br />
								93380 Pierrefitte-sur-Seine
							</li>
						</ul>
					</div>
				</div>

				{/* Séparateur et copyright */}
				<div className="border-t border-gray-800 pt-6">
					<div className="flex flex-col md:flex-row items-center justify-between">
						<div className="text-sm text-gray-400 mb-4 md:mb-0">
							© {new Date().getFullYear()} Association Sportive Omnisports de
							Pierrefitte-sur-Seine. Tous droits réservés.
						</div>
						<div className="flex space-x-6">
							<span className="text-xs text-gray-500">Conforme RGPD</span>
							<span className="text-xs text-gray-500">
								Association Loi 1901
							</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

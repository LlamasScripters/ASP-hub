import Logo from "./Logo";

export default function AuthFooter() {
	return (
		<footer className="py-6 bg-gray-900 dark:bg-black">
			<div className="container px-4 mx-auto sm:px-6">
				<div className="flex flex-col items-center justify-center space-y-4">
					{/* Logo */}
					<div className="flex items-center">
						<Logo className="w-6 h-6" />
						<span className="ml-2 text-sm font-bold text-white">
							AS Pierrefitte
						</span>
					</div>

					{/* Liens légaux */}
					<div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
						<a href="/terms" className="hover:text-white transition-colors">
							CGU
						</a>
						<span className="text-gray-600">•</span>
						<a href="/privacy" className="hover:text-white transition-colors">
							Confidentialité
						</a>
						<span className="text-gray-600">•</span>
						<a href="/contact" className="hover:text-white transition-colors">
							Contact
						</a>
					</div>

					{/* Copyright */}
					<div className="text-xs text-gray-500 text-center">
						© {new Date().getFullYear()} AS Pierrefitte - Tous droits réservés
					</div>
				</div>
			</div>
		</footer>
	);
}

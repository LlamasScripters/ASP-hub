import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { PropsWithChildren } from "react";

export default function VerifyEmailLayout({ children }: PropsWithChildren) {
	return (
		<div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
			<div className="container flex flex-col items-center justify-center flex-1 px-4 py-12 mx-auto sm:px-6">
				<Button variant="link" asChild>
					<Link
						to="/"
						className="flex items-center mb-8 text-emerald-600 hover:text-emerald-700"
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Retour à l'accueil
					</Link>
				</Button>

				{children}
			</div>
		</div>
	);
}

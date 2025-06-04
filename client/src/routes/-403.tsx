import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";

export default function ForbiddenPage() {
	return (
		<div className="flex flex-col w-full min-h-screen bg-background text-foreground">
			<div className="container flex flex-col items-center justify-center flex-1 px-4 py-12 mx-auto sm:px-6">
				<Card className="w-full max-w-md shadow-lg">
					<CardHeader className="space-y-1 text-center">
						<div className="flex justify-center mb-2">
							<Shield className="w-12 h-12 text-emerald-600" />
						</div>
						<CardTitle className="text-3xl font-bold">Interdit 🛑</CardTitle>
						<CardDescription>
							Vous n'avez pas les permissions nécessaires pour accéder à cette
							page.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col items-center justify-center gap-4">
						<Button asChild size="lg" className="w-full mt-2">
							<Link to="/">Retour à l'accueil</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

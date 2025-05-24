import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ResetPasswordForm } from "./ResetPasswordForm";

interface ResetPasswordPageProps {
	token: string;
}

export function ResetPasswordPage({ token }: ResetPasswordPageProps) {
	if (!token) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center bg-muted/50">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
					<Card>
						<CardHeader className="space-y-1">
							<CardTitle className="text-2xl text-center">
								Lien invalide
							</CardTitle>
							<CardDescription className="text-center">
								Le lien de réinitialisation est invalide ou a expiré.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="text-center">
								<Button asChild>
									<Link to="/auth/login">
										<ArrowLeft className="mr-2 h-4 w-4" />
										Retour à la connexion
									</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-muted/50">
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
				<div className="flex flex-col space-y-2 text-center">
					<Button variant="link" asChild className="self-center">
						<Link to="/auth/login" className="flex items-center">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Retour à la connexion
						</Link>
					</Button>
				</div>

				<Card>
					<CardContent className="p-6">
						<ResetPasswordForm token={token} />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

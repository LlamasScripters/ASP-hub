import GoogleIcon from "@/components/icons/GoogleIcon";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
// import { useNavigate } from "@tanstack/react-router";

export function LoginWithGoogleButton() {
	// const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const handleGoogleSignIn = async () => {
		setIsLoading(true);
		try {
			await authClient.signIn.social({
				provider: "google",
			});
		} catch (error) {
			console.error("Erreur lors de la connexion avec Google:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			variant="outline"
			onClick={handleGoogleSignIn}
			disabled={isLoading}
			className="w-full flex items-center justify-center gap-2"
		>
			<GoogleIcon className="h-5 w-5" />
			<span>
				{isLoading ? "Connexion en cours..." : "Continuer avec Google"}
			</span>
		</Button>
	);
}

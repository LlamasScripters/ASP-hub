import GoogleIcon from "@/components/icons/GoogleIcon";
import { Button } from "@/components/ui/button";
import { authClient, getAuthErrorMessage } from "@/lib/auth/auth-client";
import { useMutation } from "@tanstack/react-query";

export function LoginWithGoogleButton() {
	const { mutate: handleGoogleSignIn, isPending } = useMutation({
		mutationFn: async () => {
			const { data, error } = await authClient.signIn.social({
				provider: "google",
			});

			if (error?.code) {
				throw new Error(getAuthErrorMessage(error.code));
			}

			return data;
		},
	});

	return (
		<Button
			variant="outline"
			onClick={() => {
				handleGoogleSignIn();
			}}
			disabled={isPending}
			className="w-full flex items-center justify-center gap-2"
		>
			<GoogleIcon className="h-5 w-5" />
			<span>
				{isPending ? "Connexion en cours..." : "Continuer avec Google"}
			</span>
		</Button>
	);
}

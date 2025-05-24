import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient, getAuthErrorMessage } from "@/lib/auth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const forgotPasswordFormSchema = z.object({
	email: z.string().email("Adresse email invalide"),
});

type FormValues = z.infer<typeof forgotPasswordFormSchema>;

export function ForgotPasswordForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(forgotPasswordFormSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (values: FormValues) => {
		setIsLoading(true);

		try {
			const { error } = await authClient.forgetPassword({
				email: values.email,
				redirectTo: "/auth/reset-password",
			});

			// Better Auth doesn't return an error if the user doesn't exist for security reasons
			// So we always show success message
			setIsSuccess(true);
		} catch (err) {
			form.setError("root", {
				message: "Une erreur inattendue s'est produite",
			});
		} finally {
			setIsLoading(false);
		}
	};

	if (isSuccess) {
		return (
			<div className="space-y-6 text-center">
				<div className="space-y-2">
					<h2 className="text-lg font-medium">Email envoyé !</h2>
					<p className="text-sm text-muted-foreground">
						Si cette adresse email existe dans notre système, vous recevrez un
						lien de réinitialisation dans quelques minutes.
					</p>
				</div>
				<div className="space-y-2">
					<p className="text-xs text-muted-foreground">
						Vous n'avez pas reçu l'email ?
					</p>
					<Button
						variant="outline"
						onClick={() => {
							setIsSuccess(false);
							form.reset();
						}}
					>
						Renvoyer
					</Button>
				</div>
				<div className="text-center">
					<Button asChild variant="link">
						<Link to="/auth/login">Retour à la connexion</Link>
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Adresse email</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="votre@email.com"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{form.formState.errors.root && (
						<div className="text-red-500 text-sm text-center">
							{form.formState.errors.root.message}
						</div>
					)}

					<Button type="submit" disabled={isLoading} className="w-full">
						{isLoading ? "Envoi en cours..." : "Envoyer le lien"}
					</Button>
				</form>
			</Form>

			<div className="text-center">
				<Button asChild variant="link">
					<Link to="/auth/login">Retour à la connexion</Link>
				</Button>
			</div>
		</div>
	);
}

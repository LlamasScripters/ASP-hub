import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const askResetPasswordFormSchema = z.object({
	email: z.string().email("Adresse email invalide"),
});

type FormValues = z.infer<typeof askResetPasswordFormSchema>;

/**
 * This form is used to ask the user to reset their password.
 * It is used when the user has no password and wants to create one.
 */
export function UserPasswordAskResetForm() {
	const form = useForm<FormValues>({
		resolver: zodResolver(askResetPasswordFormSchema),
		defaultValues: {
			email: "",
		},
	});

	const { mutate: sendResetEmail, isPending } = useMutation({
		mutationFn: async (values: FormValues) => {
			const { error } = await authClient.forgetPassword({
				email: values.email,
				redirectTo: "/auth/reset-password",
			});

			if (error?.code) {
				throw new Error(getAuthErrorMessage(error.code));
			}

			toast.success(
				"Un email de réinitialisation a été envoyé si cette adresse existe dans notre système",
			);
			form.reset();
		},
		onError: (error) => {
			toast.error(error.message || "Une erreur s'est produite");
		},
	});

	const onSubmit = (values: FormValues) => {
		sendResetEmail(values);
	};

	return (
		<div className="space-y-4">
			<div className="text-center space-y-2">
				<h3 className="text-lg font-medium">Définir un mot de passe</h3>
				<p className="text-sm text-muted-foreground">
					Vous n'avez pas encore défini de mot de passe. Entrez votre adresse
					email pour recevoir un lien de création de mot de passe.
				</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
										disabled={isPending}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" disabled={isPending} className="w-full">
						{isPending ? "Envoi en cours..." : "Envoyer le lien"}
					</Button>
				</form>
			</Form>
		</div>
	);
}

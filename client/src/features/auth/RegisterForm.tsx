import { authClient, getSignInErrorMessage } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z
	.object({
		firstName: z
			.string()
			.min(2, "Le prénom doit contenir au moins 2 caractères"),
		lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
		email: z.string().email("Adresse email invalide"),
		password: z
			.string()
			.min(6, "Le mot de passe doit contenir au moins 6 caractères"),
		confirmPassword: z.string(),
		acceptTerms: z.boolean().refine((data) => data === true, {
			message: "Vous devez accepter les conditions d'utilisation",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Les mots de passe ne correspondent pas",
		path: ["confirmPassword"],
	});

export function RegisterForm() {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
			acceptTerms: false,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true);

		try {
			const { error } = await authClient.signUp.email({
				email: values.email,
				password: values.password,
				name: `${values.firstName} ${values.lastName}`,
				firstName: values.firstName,
				lastName: values.lastName,
				acceptTerms: values.acceptTerms,
			});

			if (error?.code) {
				form.setError("root", {
					message: getSignInErrorMessage(error.code),
				});
			}
		} catch (err) {
			form.setError("root", {
				message: "Une erreur inattendue s'est produite",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Prénom</FormLabel>
							<FormControl>
								<Input placeholder="Prénom" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nom</FormLabel>
							<FormControl>
								<Input placeholder="Nom" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" placeholder="Adresse email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mot de passe</FormLabel>
							<FormControl>
								<Input type="password" placeholder="Mot de passe" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirmer le mot de passe</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Confirmer le mot de passe"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="acceptTerms"
					render={({ field }) => (
						<FormItem>
							<div className="flex flex-row items-start space-x-3 space-y-0">
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
										id="acceptTerms"
									/>
								</FormControl>
								<div className="space-y-1 leading-none">
									<FormLabel>J'accepte les conditions d'utilisation</FormLabel>
								</div>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				{form.formState.errors.root && (
					<div className="text-sm font-medium text-destructive">
						{form.formState.errors.root.message}
					</div>
				)}

				<Button type="submit" className="w-full" disabled={isLoading}>
					{isLoading ? "Création du compte..." : "Créer un compte"}
				</Button>
			</form>
		</Form>
	);
}

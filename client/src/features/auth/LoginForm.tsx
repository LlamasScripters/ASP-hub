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
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginWithGoogleButton } from "./LoginWithGoogleButton";

const formSchema = z.object({
	email: z.string().email("Adresse email invalide"),
	password: z.string().min(1, "Le mot de passe est requis"),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm() {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: FormValues) => {
		setIsLoading(true);

		try {
			const { error } = await authClient.signIn.email(
				{
					email: values.email,
					password: values.password,
				},
				{
					onSuccess: () => {
						navigate({ to: location.search.redirect ?? "/dashboard" });
					},
				},
			);

			if (error?.code) {
				form.setError("root", { message: getAuthErrorMessage(error.code) });
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
								<div className="flex items-center justify-between">
									<FormLabel>Mot de passe</FormLabel>
									<Button variant="link" asChild className="px-0 font-normal">
										<Link
											to="/auth/forgot-password"
											className="text-sm text-muted-foreground hover:text-primary"
										>
											Mot de passe oublié ?
										</Link>
									</Button>
								</div>
								<FormControl>
									<Input
										type="password"
										placeholder="Mot de passe"
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
						{isLoading ? "Connexion en cours..." : "Se connecter"}
					</Button>
				</form>
			</Form>

			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Ou continuer avec
					</span>
				</div>
			</div>

			<LoginWithGoogleButton />
		</div>
	);
}

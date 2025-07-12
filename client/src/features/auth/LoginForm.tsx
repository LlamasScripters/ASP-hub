import Divider from "@/components/Divider";
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
import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getLoggedInUserQueryOptions } from "../users/users.config";
import { LoginWithGoogleButton } from "./LoginWithGoogleButton";

const formSchema = z.object({
	email: z.string().email("Adresse email invalide"),
	password: z.string().min(1, "Le mot de passe est requis"),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm() {
	// const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const queryClient = useQueryClient();
	const { isPending: isPendingSession, data } = authClient.useSession();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: FormValues) => {
		const { error } = await authClient.signIn.email({
			email: values.email,
			password: values.password,
		});

		if (error) {
			const message = error.code
				? getAuthErrorMessage(error.code)
				: "Une erreur inattendue s'est produite";

			form.setError("root", { message });
		}

		const { data } = await authClient.getSession();
		queryClient.setQueryData(
			getLoggedInUserQueryOptions().queryKey,
			data?.user,
		);

		navigate({ to: location.search.redirect ?? "/dashboard" });
	};

	return (
		<div className="space-y-6">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<div className="space-y-2">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Adresse email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="Adresse email"
											{...field}
										/>
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
										<Button variant="link" asChild className="pr-0 text-xs">
											<Link to="/auth/forgot-password">
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
							<div className="text-destructive text-sm text-center">
								{form.formState.errors.root.message}
							</div>
						)}
					</div>

					<Button type="submit" disabled={isPendingSession} className="w-full">
						{isPendingSession ? "Connexion en cours..." : "Se connecter"}
					</Button>
				</form>
			</Form>

			<Divider>
				<span className="bg-card px-2 text-muted-foreground">
					Ou continuer avec
				</span>
			</Divider>

			<LoginWithGoogleButton />
		</div>
	);
}

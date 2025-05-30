import PasswordInput from "@/components/PasswordInput";
import { PasswordStrengthIndicator } from "@/components/PasswordStrengthIndicator";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	type UserLoggedIn,
	authClient,
	getAuthErrorMessage,
} from "@/lib/auth/auth-client";
import { authConfig } from "@/lib/auth/auth-config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { type FieldErrors, useForm } from "react-hook-form";
import z from "zod";
import { generateRandomPassword } from "../utils/generate-random-password";

const userCreateFormSchema = z.object({
	firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
	lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
	email: z.string().email("L'email est invalide"),
	password: z
		.string()
		.min(
			authConfig.passwordMinLength,
			"Le mot de passe doit contenir au moins 12 caractères",
		),
	role: z.enum(["user", "admin"]),
});

type FormValues = z.infer<typeof userCreateFormSchema>;

export default function UserCreateForm({
	onSuccess = () => {},
	onError = () => {},
}: {
	onSuccess?: (user: UserLoggedIn) => void;
	onError?: (err: Error) => void;
}) {
	const form = useForm<FormValues>({
		resolver: zodResolver(userCreateFormSchema),
		defaultValues: {
			role: "user",
			password: "",
			firstName: "",
			lastName: "",
			email: "",
		},
	});

	const createUserMutation = useMutation({
		mutationFn: async (values: FormValues) => {
			const { data, error } = await authClient.admin.createUser({
				email: values.email,
				password: values.password,
				name: `${values.firstName} ${values.lastName}`,
				role: values.role,
				data: {
					firstName: values.firstName,
					lastName: values.lastName,
					acceptTerms: true,
				},
			});

			if (error?.code) {
				form.setError("root", {
					message: getAuthErrorMessage(error.code),
				});
				throw new Error(getAuthErrorMessage(error.code), { cause: error });
			}

			if (!data) {
				throw new Error("Une erreur est survenue, veuillez réessayer.");
			}

			return data.user as UserLoggedIn;
		},
	});

	const onSubmit = async (values: FormValues) => {
		const user = await createUserMutation.mutateAsync(values);
		onSuccess(user);
	};

	const onInvalidSubmit = (errors: FieldErrors<FormValues>) => {
		const firstError = Object.values(errors).at(0);
		if (firstError) {
			onError(new Error(firstError.message));
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit, onInvalidSubmit)}
				className="space-y-4"
			>
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
							<FormLabel>Adresse email</FormLabel>
							<FormControl>
								<Input placeholder="pierre.dupont@asphub.fr" {...field} />
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
								<div className="space-y-2">
									<PasswordInput {...field} />
									<PasswordStrengthIndicator password={field.value} />
									<Button
										variant="outline"
										type="button"
										size="sm"
										onClick={() => {
											const newPassword = generateRandomPassword();
											field.onChange(newPassword);
										}}
									>
										Générer un mot de passe
									</Button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="role"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rôle</FormLabel>
							<FormControl>
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger>
										<SelectValue placeholder="Sélectionner un rôle" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="user">Utilisateur</SelectItem>
										<SelectItem value="admin">Administrateur</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{form.formState.errors.root && (
					<div className="text-sm font-medium text-destructive">
						{form.formState.errors.root.message}
					</div>
				)}

				<Button type="submit" disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting
						? "Enregistrement..."
						: "Enregistrer les modifications"}
				</Button>
			</form>
		</Form>
	);
}

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { authClient } from "@/lib/auth-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { usersConfig } from "../users.config";

const createFormSchema = (hasPassword: boolean) =>
	z
		.object({
			currentPassword: hasPassword
				? z.string().min(1, "Le mot de passe actuel est requis")
				: z.string().optional(),
			newPassword: z.string().min(usersConfig.passwordMinLength, {
				message: `Le nouveau mot de passe doit faire au moins ${usersConfig.passwordMinLength} caractères`,
			}),
			confirmNewPassword: z
				.string()
				.min(1, "Veuillez confirmer le mot de passe"),
		})
		.refine((data) => data.newPassword === data.confirmNewPassword, {
			message: "Les mots de passe ne correspondent pas",
			path: ["confirmNewPassword"],
		});

interface UserPasswordUpdateFormProps {
	onSuccess?: () => void;
}

export function UserPasswordUpdateForm({
	onSuccess,
}: UserPasswordUpdateFormProps) {
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [hasPassword, setHasPassword] = useState<boolean | null>(null);

	// Check if user has a credential account (password)
	const { data: accounts, isLoading: isLoadingAccounts } = useQuery({
		queryKey: ["user-accounts"],
		queryFn: async () => {
			const response = await authClient.listAccounts();
			return response.data || [];
		},
	});

	useEffect(() => {
		if (accounts) {
			// Check if user has a credential account (password-based)
			const hasCredentialAccount = accounts.some(
				(account) => account.providerId === "credential",
			);
			setHasPassword(hasCredentialAccount);
		}
	}, [accounts]);

	const formSchema =
		hasPassword !== null
			? createFormSchema(hasPassword)
			: createFormSchema(true);
	type FormValues = z.infer<typeof formSchema>;

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			confirmNewPassword: "",
		},
	});

	// Reset form when hasPassword changes
	useEffect(() => {
		if (hasPassword !== null) {
			form.reset({
				currentPassword: "",
				newPassword: "",
				confirmNewPassword: "",
			});
		}
	}, [hasPassword, form]);

	const { mutate: updatePassword, isPending } = useMutation({
		mutationFn: async (values: FormValues) => {
			if (hasPassword) {
				// Change existing password
				const { data, error } = await authClient.changePassword({
					currentPassword: values.currentPassword,
					newPassword: values.newPassword,
					revokeOtherSessions: true,
				});

				if (error) {
					throw new Error(
						error.message || "Erreur lors de la mise à jour du mot de passe",
					);
				}

				return data;
			}
			// Set password for the first time (user registered with social account)
			const { data, error } = await authClient.setPassword({
				newPassword: values.newPassword,
			});

			if (error) {
				throw new Error(
					error.message || "Erreur lors de la définition du mot de passe",
				);
			}

			return data;
		},
		onSuccess: () => {
			const message = hasPassword
				? "Mot de passe mis à jour avec succès"
				: "Mot de passe défini avec succès";
			toast.success(message);
			form.reset();
			// Update hasPassword state if we just set a password for the first time
			if (!hasPassword) {
				setHasPassword(true);
			}
			onSuccess?.();
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const onSubmit = (values: FormValues) => {
		updatePassword(values);
	};

	const newPassword = form.watch("newPassword");

	// Show loading state while checking accounts
	if (isLoadingAccounts || hasPassword === null) {
		return (
			<div className="flex items-center justify-center py-8">
				<div className="text-sm text-muted-foreground">Chargement...</div>
			</div>
		);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div className="space-y-4">
					{!hasPassword && (
						<div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
							<p className="text-sm text-blue-800">
								Vous vous êtes connecté avec un compte social. Définissez un mot
								de passe pour pouvoir vous connecter avec votre email.
							</p>
						</div>
					)}

					{hasPassword && (
						<FormField
							control={form.control}
							name="currentPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mot de passe actuel</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												type={showCurrentPassword ? "text" : "password"}
												placeholder="Mot de passe actuel"
												{...field}
											/>
											<Button
												type="button"
												variant="ghost"
												size="sm"
												className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
												onClick={() =>
													setShowCurrentPassword(!showCurrentPassword)
												}
												aria-label={
													showCurrentPassword
														? "Masquer le mot de passe"
														: "Afficher le mot de passe"
												}
											>
												{showCurrentPassword ? (
													<EyeOff className="h-4 w-4" />
												) : (
													<Eye className="h-4 w-4" />
												)}
											</Button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}

					<FormField
						control={form.control}
						name="newPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									{hasPassword ? "Nouveau mot de passe" : "Mot de passe"}
								</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											type={showNewPassword ? "text" : "password"}
											placeholder={`Nouveau mot de passe (min. ${usersConfig.passwordMinLength} caractères)`}
											{...field}
										/>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
											onClick={() => setShowNewPassword(!showNewPassword)}
											aria-label={
												showNewPassword
													? "Masquer le mot de passe"
													: "Afficher le mot de passe"
											}
										>
											{showNewPassword ? (
												<EyeOff className="h-4 w-4" />
											) : (
												<Eye className="h-4 w-4" />
											)}
										</Button>
									</div>
								</FormControl>
								<PasswordStrengthIndicator password={newPassword} />
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="confirmNewPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirmer le nouveau mot de passe</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											type={showConfirmPassword ? "text" : "password"}
											placeholder="Confirmer le nouveau mot de passe"
											{...field}
										/>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
											onClick={() =>
												setShowConfirmPassword(!showConfirmPassword)
											}
											aria-label={
												showConfirmPassword
													? "Masquer le mot de passe"
													: "Afficher le mot de passe"
											}
										>
											{showConfirmPassword ? (
												<EyeOff className="h-4 w-4" />
											) : (
												<Eye className="h-4 w-4" />
											)}
										</Button>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button type="submit" disabled={isPending} className="w-full">
					{isPending ? "Mise à jour..." : "Mettre à jour le mot de passe"}
				</Button>
			</form>
		</Form>
	);
}

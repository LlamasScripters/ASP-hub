import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
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
import { authClient, getAuthErrorMessage } from "@/lib/auth/auth-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { usersConfig } from "../users.config";

const updatePasswordFormSchema = z
	.object({
		currentPassword: z.string().min(1, "Le mot de passe actuel est requis"),
		newPassword: z.string().min(usersConfig.passwordMinLength, {
			message: `Le nouveau mot de passe doit faire au moins ${usersConfig.passwordMinLength} caractères`,
		}),
		confirmNewPassword: z.string().min(1, "Veuillez confirmer le mot de passe"),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: "Les mots de passe ne correspondent pas",
		path: ["confirmNewPassword"],
	});

type FormValues = z.infer<typeof updatePasswordFormSchema>;

export function UserPasswordUpdateForm() {
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(updatePasswordFormSchema),
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			confirmNewPassword: "",
		},
	});

	const { mutate: updatePassword, isPending } = useMutation({
		mutationFn: async (values: FormValues) => {
			const { error } = await authClient.changePassword({
				currentPassword: values.currentPassword,
				newPassword: values.newPassword,
				revokeOtherSessions: true,
			});

			if (error?.code) {
				toast.error(getAuthErrorMessage(error.code));
			} else {
				toast.success("Mot de passe mis à jour avec succès");
			}

			form.reset();
		},
	});

	const onSubmit = (values: FormValues) => {
		updatePassword(values);
	};

	const newPassword = form.watch("newPassword");

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div className="space-y-4">
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

					<FormField
						control={form.control}
						name="newPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nouveau mot de passe</FormLabel>
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

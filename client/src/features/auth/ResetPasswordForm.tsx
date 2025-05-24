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
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usersConfig } from "../users/users.config";

const resetPasswordFormSchema = z
	.object({
		newPassword: z.string().min(usersConfig.passwordMinLength, {
			message: `Le mot de passe doit faire au moins ${usersConfig.passwordMinLength} caractères`,
		}),
		confirmPassword: z.string().min(1, "Veuillez confirmer le mot de passe"),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Les mots de passe ne correspondent pas",
		path: ["confirmPassword"],
	});

type FormValues = z.infer<typeof resetPasswordFormSchema>;

interface ResetPasswordFormProps {
	token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const navigate = useNavigate();

	const form = useForm<FormValues>({
		resolver: zodResolver(resetPasswordFormSchema),
		defaultValues: {
			newPassword: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (values: FormValues) => {
		setIsLoading(true);

		try {
			const { error } = await authClient.resetPassword({
				newPassword: values.newPassword,
				token,
			});

			if (error?.code) {
				form.setError("root", { message: getAuthErrorMessage(error.code) });
			} else {
				navigate({ to: "/auth/login", search: { success: "password-reset" } });
			}
		} catch (err) {
			form.setError("root", {
				message: "Une erreur inattendue s'est produite",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const newPassword = form.watch("newPassword");

	return (
		<div className="space-y-6">
			<div className="text-center space-y-2">
				<h1 className="text-2xl font-semibold tracking-tight">
					Nouveau mot de passe
				</h1>
				<p className="text-sm text-muted-foreground">
					Créez un nouveau mot de passe pour votre compte
				</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<FormField
						control={form.control}
						name="newPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nouveau mot de passe</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											type={showPassword ? "text" : "password"}
											placeholder={`Nouveau mot de passe (min. ${usersConfig.passwordMinLength} caractères)`}
											{...field}
										/>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
											onClick={() => setShowPassword(!showPassword)}
											aria-label={
												showPassword
													? "Masquer le mot de passe"
													: "Afficher le mot de passe"
											}
										>
											{showPassword ? (
												<EyeOff className="size-4" />
											) : (
												<Eye className="size-4" />
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
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirmer le mot de passe</FormLabel>
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
												<EyeOff className="size-4" />
											) : (
												<Eye className="size-4" />
											)}
										</Button>
									</div>
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
						{isLoading ? "Mise à jour..." : "Définir le mot de passe"}
					</Button>
				</form>
			</Form>
		</div>
	);
}

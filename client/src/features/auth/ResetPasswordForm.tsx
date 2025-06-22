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
import { checkPasswordStrength } from "@/lib/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { type FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { usersConfig } from "../users/users.config";

const resetPasswordFormSchema = z
	.object({
		newPassword: z.string().min(usersConfig.passwordMinLength, {
			message: `Le mot de passe doit faire au moins ${usersConfig.passwordMinLength} caractères`,
		}),
		confirmPassword: z.string().min(1, "Veuillez confirmer le mot de passe"),
		passwordMinStrength: z
			.number()
			.min(3, "Veuillez entrer un mot de passe fort"),
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
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const navigate = useNavigate();

	const form = useForm<FormValues>({
		resolver: zodResolver(resetPasswordFormSchema),
		defaultValues: {
			newPassword: "",
			confirmPassword: "",
			passwordMinStrength: 0,
		},
	});

	const resetPasswordMutation = useMutation({
		mutationFn: async (values: FormValues) => {
			const { error } = await authClient.resetPassword({
				newPassword: values.newPassword,
				token,
			});
			if (error?.code) {
				throw new Error(error.code);
			}
		},
		onSuccess: () => {
			navigate({
				to: "/auth/login",
				//@ts-ignore need implementation of auth/login?from=reset-password-success
				//TODO: implement auth/login?from=reset-password-success
				search: { from: "reset-password-success" },
				mask: {
					to: "/auth/login",
				},
			});
		},
		onError: (error) => {
			// here, error.message is the error code from the error thrown by the mutationFn
			form.setError("root", { message: getAuthErrorMessage(error.message) });
		},
	});

	const onSubmit = (values: FormValues) => {
		console.log(values);

		resetPasswordMutation.mutate(values);
	};

	const onInvalidSubmit = (errors: FieldErrors<FormValues>) => {
		console.log(errors);
	};

	const handlePasswordChange =
		(onChange: React.ChangeEventHandler<HTMLInputElement>) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			onChange(e);
			const { score } = checkPasswordStrength(e.target.value);
			form.setValue("passwordMinStrength", score);
		};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit, onInvalidSubmit)}
				className="space-y-6"
			>
				<FormField
					control={form.control}
					name="newPassword"
					render={({ field: { onChange, ...rest } }) => (
						<FormItem>
							<FormLabel>Nouveau mot de passe</FormLabel>
							<FormControl>
								<div className="relative">
									<Input
										type={showPassword ? "text" : "password"}
										placeholder={`Nouveau mot de passe (min. ${usersConfig.passwordMinLength} caractères)`}
										{...rest}
										onChange={handlePasswordChange(onChange)}
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
							<PasswordStrengthIndicator password={rest.value} />
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
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

				<Button
					type="submit"
					disabled={form.formState.isSubmitting}
					className="w-full"
				>
					{form.formState.isSubmitting
						? "Mise à jour..."
						: "Définir le mot de passe"}
				</Button>
			</form>
		</Form>
	);
}

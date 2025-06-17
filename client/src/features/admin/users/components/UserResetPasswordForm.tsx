import PasswordInput from "@/components/PasswordInput";
import { PasswordStrengthIndicator } from "@/components/PasswordStrengthIndicator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@/lib/api";
import {
	type UserLoggedIn,
	authClient,
	getAuthErrorMessage,
} from "@/lib/auth/auth-client";
import { authConfig } from "@/lib/auth/auth-config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
	AlertCircleIcon,
	CheckIcon,
	CopyIcon,
	RefreshCcwIcon,
} from "lucide-react";
import { useState } from "react";
import { type FieldErrors, useForm } from "react-hook-form";
import z from "zod";
import { generateRandomPassword } from "../utils/generate-random-password";

const userResetPasswordFormSchema = z.object({
	userId: z.string(),
	password: z
		.string()
		.min(
			authConfig.passwordMinLength,
			"Le mot de passe doit contenir au moins 12 caractères",
		),
});

type FormValues = z.infer<typeof userResetPasswordFormSchema>;

export default function UserResetPasswordForm({
	onSuccess = () => {},
	onError = () => {},
	user,
}: {
	onSuccess?: () => void;
	onError?: (err: Error) => void;
	user: UserLoggedIn;
}) {
	const [isPasswordCopied, setIsPasswordCopied] = useState(false);
	const form = useForm<FormValues>({
		resolver: zodResolver(userResetPasswordFormSchema),
		defaultValues: {
			userId: user.id,
			password: "",
		},
	});

	const resetUserPasswordMutation = useMutation({
		mutationFn: async (values: FormValues) => {
			const data = await api
				.post(`users/${values.userId}/set-password`, {
					json: {
						newPassword: values.password,
					},
				})
				.json<{ status: boolean }>();

			if (!data?.status) {
				throw new Error("Erreur lors de la modification du mot de passe");
			}

			return true;
		},
		onSuccess: () => {
			onSuccess();
		},
		onError: (error) => {
			onError(error);
		},
	});

	const onSubmit = async (values: FormValues) => {
		resetUserPasswordMutation.mutate(values);
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
				<Alert variant="default">
					<AlertCircleIcon className="size-4" />
					<AlertTitle>
						Modification du mot de passe de l'utilisateur {user.name}
					</AlertTitle>
					<AlertDescription>
						Attention, vous devrez communiquer le nouveau mot de passe à
						l'utilisateur.
					</AlertDescription>
				</Alert>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mot de passe</FormLabel>
							<FormControl>
								<div className="grid grid-cols-10 gap-2">
									<div className="col-span-9">
										<PasswordInput
											InputProps={field}
											ContainerProps={{ className: "w-full" }}
										/>
									</div>
									<div className="col-span-1 flex justify-end">
										<TooltipProvider>
											<Tooltip open={isPasswordCopied}>
												<TooltipTrigger asChild>
													<Button
														type="button"
														variant="ghost"
														onClick={() => {
															window.navigator.clipboard.writeText(field.value);
															setIsPasswordCopied(true);
															setTimeout(
																() => setIsPasswordCopied(false),
																2000,
															);
														}}
														disabled={isPasswordCopied}
													>
														{isPasswordCopied ? (
															<CheckIcon className="size-4 text-green-500" />
														) : (
															<CopyIcon className="size-4" />
														)}
													</Button>
												</TooltipTrigger>
												<TooltipContent>
													<p>Copié !</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
									<div className="col-span-9">
										{typeof field.value === "string" && (
											<PasswordStrengthIndicator password={field.value} />
										)}
									</div>
									<div className="col-span-10">
										<Button
											variant="outline"
											type="button"
											size="sm"
											onClick={() => {
												const newPassword = generateRandomPassword();
												field.onChange(newPassword);
											}}
										>
											<RefreshCcwIcon className="size-4" />
											Générer un mot de passe
										</Button>
									</div>
								</div>
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
						? "Modification en cours..."
						: "Enregistrer les modifications"}
				</Button>
			</form>
		</Form>
	);
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useFirstLogin } from "@/hooks/use-first-login";
import type { CompleteProfileData } from "@/hooks/use-first-login";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/first-login-profile")({
	component: FirstLoginProfilePage,
});

function FirstLoginProfilePage() {
	const navigate = useNavigate();
	const {
		status,
		completeProfile,
		isCompletingProfile,
		profileError,
		CompleteProfileSchema,
		getProgressPercentage,
	} = useFirstLogin();

	const form = useForm<CompleteProfileData>({
		resolver: zodResolver(CompleteProfileSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			dateOfBirth: "",
			civility: "monsieur",
			phone: "",
			height: undefined,
			weight: undefined,
		},
	});

	const onSubmit = async (data: CompleteProfileData) => {
		try {
			await new Promise<void>((resolve, reject) => {
				completeProfile(data, {
					onSuccess: () => {
						toast.success("Profil complété avec succès !");
						// Naviguer vers l'étape suivante
						navigate({ to: "/first-login-application" });
						resolve();
					},
					onError: (error) => {
						toast.error("Erreur lors de la completion du profil");
						console.error(error);
						reject(error);
					},
				});
			});
		} catch (error) {
			// Error handled in onError callback
		}
	};

	if (!status) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto">
					{/* Progress Bar */}
					<div className="mb-8">
						<div className="flex items-center justify-between mb-2">
							<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
								Bienvenue dans ASP-hub !
							</h1>
							<span className="text-sm text-gray-600 dark:text-gray-400">
								Étape 1/3
							</span>
						</div>
						<Progress value={getProgressPercentage()} className="w-full" />
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Complétez votre profil</CardTitle>
							<p className="text-gray-600 dark:text-gray-400">
								Renseignez vos informations personnelles pour continuer votre
								adhésion.
							</p>
						</CardHeader>
						<CardContent>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<Label htmlFor="firstName">Prénom *</Label>
										<Input
											id="firstName"
											{...form.register("firstName")}
											placeholder="Votre prénom"
										/>
										{form.formState.errors.firstName && (
											<p className="text-sm text-red-600 mt-1">
												{form.formState.errors.firstName.message}
											</p>
										)}
									</div>

									<div>
										<Label htmlFor="lastName">Nom *</Label>
										<Input
											id="lastName"
											{...form.register("lastName")}
											placeholder="Votre nom"
										/>
										{form.formState.errors.lastName && (
											<p className="text-sm text-red-600 mt-1">
												{form.formState.errors.lastName.message}
											</p>
										)}
									</div>
								</div>

								<div>
									<Label htmlFor="civility">Civilité *</Label>
									<Select
										onValueChange={(value) =>
											form.setValue(
												"civility",
												value as
													| "monsieur"
													| "madame"
													| "mademoiselle"
													| "autre",
											)
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Sélectionnez votre civilité" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="monsieur">Monsieur</SelectItem>
											<SelectItem value="madame">Madame</SelectItem>
											<SelectItem value="mademoiselle">Mademoiselle</SelectItem>
											<SelectItem value="autre">Autre</SelectItem>
										</SelectContent>
									</Select>
									{form.formState.errors.civility && (
										<p className="text-sm text-red-600 mt-1">
											{form.formState.errors.civility.message}
										</p>
									)}
								</div>

								<div>
									<Label htmlFor="dateOfBirth">Date de naissance *</Label>
									<Input
										id="dateOfBirth"
										type="date"
										{...form.register("dateOfBirth")}
									/>
									{form.formState.errors.dateOfBirth && (
										<p className="text-sm text-red-600 mt-1">
											{form.formState.errors.dateOfBirth.message}
										</p>
									)}
								</div>

								<div>
									<Label htmlFor="phone">Téléphone *</Label>
									<Input
										id="phone"
										type="tel"
										{...form.register("phone")}
										placeholder="0123456789"
									/>
									{form.formState.errors.phone && (
										<p className="text-sm text-red-600 mt-1">
											{form.formState.errors.phone.message}
										</p>
									)}
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<Label htmlFor="height">Taille (cm)</Label>
										<Input
											id="height"
											type="number"
											{...form.register("height", { valueAsNumber: true })}
											placeholder="170"
											min="100"
											max="250"
										/>
										{form.formState.errors.height && (
											<p className="text-sm text-red-600 mt-1">
												{form.formState.errors.height.message}
											</p>
										)}
									</div>

									<div>
										<Label htmlFor="weight">Poids (kg)</Label>
										<Input
											id="weight"
											type="number"
											{...form.register("weight", { valueAsNumber: true })}
											placeholder="70"
											min="30"
											max="200"
										/>
										{form.formState.errors.weight && (
											<p className="text-sm text-red-600 mt-1">
												{form.formState.errors.weight.message}
											</p>
										)}
									</div>
								</div>

								{profileError && (
									<div className="p-4 bg-red-50 border border-red-200 rounded-md">
										<p className="text-sm text-red-600">
											Une erreur est survenue. Veuillez réessayer.
										</p>
									</div>
								)}

								<div className="flex justify-end">
									<Button
										type="submit"
										disabled={isCompletingProfile}
										className="min-w-32"
									>
										{isCompletingProfile ? "Enregistrement..." : "Continuer"}
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

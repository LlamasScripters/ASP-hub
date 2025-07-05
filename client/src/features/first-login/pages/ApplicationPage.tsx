import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFirstLogin } from "@/hooks/use-first-login";
import type { MembershipApplicationData } from "@/hooks/use-first-login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FirstLoginProgressBar } from "../components/FirstLoginProgressBar";

export function ApplicationPage() {
	const navigate = useNavigate();
	const {
		status,
		submitApplication,
		isSubmittingApplication,
		applicationError,
		MembershipApplicationSchema,
	} = useFirstLogin();

	const form = useForm<MembershipApplicationData>({
		resolver: zodResolver(MembershipApplicationSchema),
		defaultValues: {
			sectionIds: [],
			categoryIds: [],
			motivation: "",
			medicalCertificateUrl: "",
			emergencyContactName: "",
			emergencyContactPhone: "",
		},
	});

	const onSubmit = async (data: MembershipApplicationData) => {
		try {
			await new Promise<void>((resolve, reject) => {
				submitApplication(data, {
					onSuccess: () => {
						toast.success("Candidature soumise avec succès !");
						navigate({ to: "/first-login/validation" });
						resolve();
					},
					onError: (error) => {
						toast.error("Erreur lors de la soumission de la candidature");
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

	// Rediriger si l'utilisateur n'a pas complété son profil
	if (!status.isProfileComplete) {
		navigate({ to: "/first-login/profile" });
		return null;
	}

	return (
		<div className="max-w-2xl mx-auto">
			{/* Barre de progression */}
			<FirstLoginProgressBar currentStep={2} title="Candidature d'adhésion" />

			<Card>
				<CardHeader>
					<CardTitle>Soumettez votre candidature</CardTitle>
					<p className="text-gray-600 dark:text-gray-400">
						Expliquez votre motivation et renseignez vos informations
						complémentaires.
					</p>
				</CardHeader>
				<CardContent>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div>
							<Label htmlFor="motivation">Motivation *</Label>
							<Textarea
								id="motivation"
								{...form.register("motivation")}
								placeholder="Expliquez pourquoi vous souhaitez adhérer à ASP-hub (minimum 50 caractères)..."
								rows={5}
								className="resize-none"
							/>
							{form.formState.errors.motivation && (
								<p className="text-sm text-red-600 mt-1">
									{form.formState.errors.motivation.message}
								</p>
							)}
							<p className="text-sm text-gray-500 mt-1">
								{form.watch("motivation")?.length || 0} / 50 caractères minimum
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<Label htmlFor="emergencyContactName">
									Contact d'urgence - Nom *
								</Label>
								<Input
									id="emergencyContactName"
									{...form.register("emergencyContactName")}
									placeholder="Nom de votre contact d'urgence"
								/>
								{form.formState.errors.emergencyContactName && (
									<p className="text-sm text-red-600 mt-1">
										{form.formState.errors.emergencyContactName.message}
									</p>
								)}
							</div>

							<div>
								<Label htmlFor="emergencyContactPhone">
									Contact d'urgence - Téléphone *
								</Label>
								<Input
									id="emergencyContactPhone"
									type="tel"
									{...form.register("emergencyContactPhone")}
									placeholder="0123456789"
								/>
								{form.formState.errors.emergencyContactPhone && (
									<p className="text-sm text-red-600 mt-1">
										{form.formState.errors.emergencyContactPhone.message}
									</p>
								)}
							</div>
						</div>

						<div>
							<Label htmlFor="medicalCertificateUrl">
								Certificat médical (optionnel)
							</Label>
							<Input
								id="medicalCertificateUrl"
								type="url"
								{...form.register("medicalCertificateUrl")}
								placeholder="https://exemple.com/certificat.pdf"
							/>
							{form.formState.errors.medicalCertificateUrl && (
								<p className="text-sm text-red-600 mt-1">
									{form.formState.errors.medicalCertificateUrl.message}
								</p>
							)}
							<p className="text-sm text-gray-500 mt-1">
								Vous pourrez également télécharger votre certificat médical plus
								tard.
							</p>
						</div>

						{applicationError && (
							<div className="p-4 bg-red-50 border border-red-200 rounded-md">
								<p className="text-sm text-red-600">
									Une erreur est survenue lors de la soumission. Veuillez
									réessayer.
								</p>
							</div>
						)}

						<div className="flex justify-between">
							<Button
								type="button"
								variant="outline"
								onClick={() => navigate({ to: "/first-login/profile" })}
							>
								Retour
							</Button>
							<Button
								type="submit"
								disabled={isSubmittingApplication}
								className="min-w-32"
							>
								{isSubmittingApplication ? "Soumission..." : "Soumettre"}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

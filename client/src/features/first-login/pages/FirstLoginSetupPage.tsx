import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { authClient } from "@/lib/auth/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle, Clock, Edit, LogOut, XCircle } from "lucide-react";
import { useState } from "react";
import { MembershipApplicationForm } from "../components/MembershipApplicationForm";
import { ProfileCompletionForm } from "../components/ProfileCompletionForm";
import { useFirstLogin } from "../hooks/use-first-login";

export function FirstLoginSetupPage() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [isEditingApplication, setIsEditingApplication] = useState(false);
	const {
		user,
		isLoadingStatus,
		currentStep,
		membershipOptions,
		isLoadingOptions,
		membershipError,
		applications,
		completeProfile,
		isCompletingProfile,
		submitApplication,
		isSubmittingApplication,
		updateApplication,
		isUpdatingApplication,
	} = useFirstLogin();

	const handleLogout = async () => {
		try {
			await authClient.signOut();
			// Clear all queries to ensure clean state
			queryClient.clear();
			navigate({ to: "/" });
		} catch (error) {
			console.error("Logout error:", error);
			// Force navigation even if logout fails
			navigate({ to: "/" });
		}
	};

	if (isLoadingStatus) {
		return (
			<div className="container mx-auto px-4 py-8">
				<Card className="w-full max-w-2xl mx-auto">
					<CardContent className="flex items-center justify-center py-12">
						<div className="text-center">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
							<p>Chargement de votre statut...</p>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	// Get progress percentage based on current step
	const getProgressPercentage = () => {
		switch (currentStep) {
			case "profile":
				return 25;
			case "application":
				return 50;
			case "validation":
				return 75;
			case "complete":
				return 100;
			default:
				return 0;
		}
	};

	// Render step indicator
	const renderStepIndicator = () => {
		const steps = [
			{
				key: "profile",
				label: "Profil",
				description: "Complétez votre profil",
			},
			{
				key: "application",
				label: "Candidature",
				description: "Soumettez votre candidature",
			},
			{
				key: "validation",
				label: "Validation",
				description: "Attente de validation",
			},
			{ key: "complete", label: "Terminé", description: "Bienvenue !" },
		];

		return (
			<div className="space-y-4 mb-8">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-lg font-semibold">
						Progression de votre inscription
					</h2>
					<span className="text-sm text-muted-foreground">
						{getProgressPercentage()}% terminé
					</span>
				</div>
				<Progress value={getProgressPercentage()} className="w-full" />
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{steps.map((step, index) => {
						const isActive = step.key === currentStep;
						const isCompleted = getProgressPercentage() > (index + 1) * 25;

						return (
							<div key={step.key} className="text-center">
								<div className="flex flex-col items-center space-y-2">
									<div
										className={`w-10 h-10 rounded-full flex items-center justify-center ${
											isCompleted
												? "bg-green-500 text-white"
												: isActive
													? "bg-primary text-white"
													: "bg-muted text-muted-foreground"
										}`}
									>
										{isCompleted ? (
											<CheckCircle className="w-5 h-5" />
										) : isActive ? (
											<Clock className="w-5 h-5" />
										) : (
											<span>{index + 1}</span>
										)}
									</div>
									<div>
										<p className="text-sm font-medium">{step.label}</p>
										<p className="text-xs text-muted-foreground">
											{step.description}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	};

	// Render current step content
	const renderStepContent = () => {
		switch (currentStep) {
			case "profile":
				return (
					<ProfileCompletionForm
						onSubmit={completeProfile}
						isLoading={isCompletingProfile}
						initialData={{
							firstName: user?.firstName || "",
							lastName: user?.lastName || "",
							dateOfBirth: user?.dateOfBirth
								? new Date(user.dateOfBirth).toISOString().split("T")[0]
								: "",
							civility:
								(user?.civility as
									| "monsieur"
									| "madame"
									| "mademoiselle"
									| "autre") || "monsieur",
							phone: user?.phone || "",
							height: user?.height || undefined,
							weight: user?.weight || undefined,
						}}
					/>
				);

			case "application":
				// Show loading state if membership options are not yet loaded
				if (isLoadingOptions || !membershipOptions) {
					return (
						<Card className="w-full max-w-2xl mx-auto">
							<CardContent className="flex items-center justify-center py-12">
								<div className="text-center">
									<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
									<p>Chargement des options d'adhésion...</p>
								</div>
							</CardContent>
						</Card>
					);
				}

				// Show error if membership options failed to load
				if (membershipError) {
					return (
						<Card className="w-full max-w-2xl mx-auto">
							<CardHeader>
								<CardTitle>Erreur de chargement</CardTitle>
								<CardDescription>
									Impossible de charger les options d'adhésion.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground mb-4">
									{membershipError instanceof Error
										? membershipError.message
										: "Une erreur inconnue s'est produite"}
								</p>
								<Button
									onClick={() => window.location.reload()}
									variant="outline"
								>
									Recharger la page
								</Button>
							</CardContent>
						</Card>
					);
				}

				// Check if sections are available
				if (
					//@ts-ignore
					!membershipOptions.sections ||
					//@ts-ignore
					membershipOptions.sections.length === 0
				) {
					return (
						<Card className="w-full max-w-2xl mx-auto">
							<CardHeader>
								<CardTitle>Aucune section disponible</CardTitle>
								<CardDescription>
									Il n'y a actuellement aucune section disponible pour
									l'adhésion.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Veuillez contacter l'administration pour plus d'informations.
								</p>
							</CardContent>
						</Card>
					);
				}

				return (
					<MembershipApplicationForm
						onSubmit={submitApplication}
						isLoading={isSubmittingApplication}
						// @ts-ignore
						membershipOptions={membershipOptions}
					/>
				);

			case "validation": {
				const latestApplication = applications?.[0];

				// If editing, show the form instead of the validation status
				if (isEditingApplication) {
					return (
						<div className="space-y-6">
							{/* Show loading state if membership options are not yet loaded */}
							{isLoadingOptions || !membershipOptions ? (
								<Card className="w-full max-w-2xl mx-auto">
									<CardContent className="flex items-center justify-center py-12">
										<div className="text-center">
											<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
											<p>Chargement des options d'adhésion...</p>
										</div>
									</CardContent>
								</Card>
							) : (
								<div className="space-y-6">
									{/* Navigation header */}
									<Card className="w-full max-w-2xl mx-auto border-blue-200 shadow-lg">
										<CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
											<div className="flex items-start justify-between gap-4">
												<div className="flex-1">
													<CardTitle className="text-xl text-blue-900 flex items-center gap-2">
														<Edit className="w-5 h-5" />
														Modifier votre candidature
													</CardTitle>
													<CardDescription className="text-blue-700 mt-2 text-sm">
														Vous pouvez modifier votre candidature tant qu'elle
														n'a pas été examinée. Toutes les modifications
														seront sauvegardées automatiquement.
													</CardDescription>
												</div>
												<Button
													variant="outline"
													onClick={() => setIsEditingApplication(false)}
													className="bg-white hover:bg-blue-50 border-blue-300 text-blue-700 flex-shrink-0 transition-colors cursor-pointer"
												>
													← Retour
												</Button>
											</div>
										</CardHeader>
									</Card>

									{/* Form section */}
									<div className="w-full max-w-2xl mx-auto">
										<MembershipApplicationForm
											onSubmit={(data) => {
												if (latestApplication?.id) {
													updateApplication({
														applicationId: latestApplication.id,
														applicationData: data,
													});
												} else {
													submitApplication(data);
												}
												setIsEditingApplication(false);
											}}
											isLoading={
												isSubmittingApplication || isUpdatingApplication
											}
											// @ts-ignore
											membershipOptions={membershipOptions}
											initialData={(() => {
												if (!latestApplication) return undefined;

												// Use the direct IDs from database instead of converting names
												const sectionIds: string[] = [];
												const categoryIds: string[] = [];

												// Add section ID if it exists
												if (latestApplication.sectionId) {
													sectionIds.push(latestApplication.sectionId);
												}

												// Add category ID if it exists
												if (latestApplication.categoryId) {
													categoryIds.push(latestApplication.categoryId);
												}

												const data = {
													sectionIds: sectionIds,
													categoryIds: categoryIds,
													motivation: latestApplication.motivation || "",
													emergencyContactName:
														latestApplication.emergencyContactName || "",
													emergencyContactPhone:
														latestApplication.emergencyContactPhone || "",
													medicalCertificateUrl:
														latestApplication.medicalCertificateUrl || "",
												};
												return data;
											})()}
										/>
									</div>
								</div>
							)}
						</div>
					);
				}

				return (
					<Card className="w-full max-w-2xl mx-auto">
						<CardHeader>
							<CardTitle>Candidature en cours de validation</CardTitle>
							<CardDescription>
								Votre candidature a été soumise et est en cours d'examen par nos
								équipes.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							{latestApplication && (
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<span className="font-medium">
											Statut de la candidature:
										</span>
										<Badge
											variant={
												latestApplication.status === "pending"
													? "secondary"
													: latestApplication.status === "approved"
														? "default"
														: "destructive"
											}
										>
											{latestApplication.status === "pending" && (
												<>
													<Clock className="w-3 h-3 mr-1" />
													En attente
												</>
											)}
											{latestApplication.status === "approved" && (
												<>
													<CheckCircle className="w-3 h-3 mr-1" />
													Approuvée
												</>
											)}
											{latestApplication.status === "rejected" && (
												<>
													<XCircle className="w-3 h-3 mr-1" />
													Refusée
												</>
											)}
										</Badge>
									</div>

									<div>
										<h4 className="font-medium mb-2">Votre motivation:</h4>
										<p className="text-sm text-muted-foreground bg-muted p-3 rounded">
											{latestApplication.motivation}
										</p>
									</div>

									{latestApplication.reviewComments && (
										<div>
											<h4 className="font-medium mb-2">
												Commentaires de révision:
											</h4>
											<p className="text-sm text-muted-foreground bg-muted p-3 rounded">
												{latestApplication.reviewComments}
											</p>
										</div>
									)}

									<div className="text-sm text-muted-foreground">
										<p>
											Candidature soumise le:{" "}
											{new Date(
												latestApplication.createdAt,
											).toLocaleDateString()}
										</p>
										{latestApplication.reviewedAt && (
											<p>
												Révisée le:{" "}
												{new Date(
													latestApplication.reviewedAt,
												).toLocaleDateString()}
											</p>
										)}
									</div>

									{/* Add edit button for pending applications */}
									{latestApplication.status === "pending" && (
										<div className="pt-4 border-t">
											<Button
												onClick={() => setIsEditingApplication(true)}
												variant="outline"
												className="w-full cursor-pointer"
											>
												<Edit className="w-4 h-4 mr-2" />
												Modifier ma candidature
											</Button>
										</div>
									)}
								</div>
							)}

							<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
								<h4 className="font-medium text-blue-900 mb-2">
									Prochaines étapes
								</h4>
								<p className="text-sm text-blue-800">
									Un responsable de section ou un administrateur examinera votre
									candidature. Vous recevrez un email dès qu'une décision sera
									prise.
									{latestApplication?.status === "pending" && (
										<span className="block mt-2 font-medium">
											Vous pouvez modifier votre candidature à tout moment avant
											validation.
										</span>
									)}
								</p>
							</div>
						</CardContent>
					</Card>
				);
			}

			case "complete":
				return (
					<Card className="w-full max-w-2xl mx-auto">
						<CardHeader className="text-center">
							<div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
								<CheckCircle className="w-8 h-8 text-white" />
							</div>
							<CardTitle className="text-2xl">
								Bienvenue à l'ASP Hub !
							</CardTitle>
							<CardDescription>
								Votre inscription a été validée avec succès. Vous avez
								maintenant accès à toutes les fonctionnalités.
							</CardDescription>
						</CardHeader>
						<CardContent className="text-center">
							<p className="text-muted-foreground mb-6">
								Vous allez être redirigé vers votre tableau de bord dans
								quelques instants.
							</p>
						</CardContent>
					</Card>
				);

			default:
				return null;
		}
	};

	return (
		<div className="container mx-auto px-4 py-8 max-w-6xl">
			<div className="text-center mb-8">
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-3xl font-bold">Configuration de votre compte</h1>
					<Button
						variant="outline"
						onClick={handleLogout}
						className="flex items-center gap-2 cursor-pointer"
					>
						<LogOut className="w-4 h-4" />
						Se déconnecter
					</Button>
				</div>
				<p className="text-muted-foreground">
					Complétez votre inscription pour accéder à toutes les fonctionnalités
					de l'ASP Hub
				</p>
			</div>

			{renderStepIndicator()}
			{renderStepContent()}
		</div>
	);
}

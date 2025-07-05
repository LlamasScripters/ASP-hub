import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useFirstLogin } from "@/hooks/use-first-login";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
	AlertCircle,
	Calendar,
	CheckCircle,
	Clock,
	RefreshCw,
	User,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/first-login-validation")({
	component: FirstLoginValidationPage,
});

function FirstLoginValidationPage() {
	const navigate = useNavigate();
	const { status, applications, getProgressPercentage, refetchStatus } =
		useFirstLogin();

	if (!status) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
			</div>
		);
	}

	// Rediriger si l'utilisateur n'a pas complété les étapes précédentes
	if (!status.isProfileComplete) {
		navigate({ to: "/first-login-profile" });
		return null;
	}

	if (!status.hasActiveApplication) {
		navigate({ to: "/first-login-application" });
		return null;
	}

	const getStatusIcon = (applicationStatus?: string) => {
		switch (applicationStatus) {
			case "approved":
				return <CheckCircle className="h-5 w-5 text-green-600" />;
			case "rejected":
				return <AlertCircle className="h-5 w-5 text-red-600" />;
			default:
				return <Clock className="h-5 w-5 text-yellow-600" />;
		}
	};

	const getStatusBadge = (applicationStatus?: string) => {
		switch (applicationStatus) {
			case "approved":
				return (
					<Badge
						variant="secondary"
						className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
					>
						Approuvée
					</Badge>
				);
			case "rejected":
				return <Badge variant="destructive">Rejetée</Badge>;
			default:
				return (
					<Badge
						variant="secondary"
						className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
					>
						En attente
					</Badge>
				);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto">
					{/* Barre de progression */}
					<div className="mb-8">
						<div className="flex items-center justify-between mb-2">
							<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
								Validation en cours
							</h1>
							<span className="text-sm text-gray-600 dark:text-gray-400">
								Étape 3/3
							</span>
						</div>
						<Progress value={getProgressPercentage()} className="w-full" />
					</div>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								{getStatusIcon(status.applicationStatus)}
								Statut de votre candidature
							</CardTitle>
							<p className="text-gray-600 dark:text-gray-400">
								Votre candidature est en cours de validation par nos équipes.
							</p>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white">
										Candidature d'adhésion
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Soumise le{" "}
										{applications?.[0]?.createdAt
											? new Date(applications[0].createdAt).toLocaleDateString(
													"fr-FR",
												)
											: "Date inconnue"}
									</p>
								</div>
								{getStatusBadge(status.applicationStatus)}
							</div>

							{status.applicationStatus === "pending" && (
								<div className="p-4 bg-blue-50 border border-blue-200 rounded-md dark:bg-blue-900/20 dark:border-blue-800">
									<div className="flex items-start gap-3">
										<Clock className="h-5 w-5 text-blue-600 mt-0.5" />
										<div>
											<h4 className="font-medium text-blue-900 dark:text-blue-200">
												Validation en cours
											</h4>
											<p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
												Nos équipes examinent votre candidature. Vous recevrez
												une notification par email dès que la validation sera
												terminée.
											</p>
										</div>
									</div>
								</div>
							)}

							{status.applicationStatus === "approved" && (
								<div className="p-4 bg-green-50 border border-green-200 rounded-md dark:bg-green-900/20 dark:border-green-800">
									<div className="flex items-start gap-3">
										<CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
										<div>
											<h4 className="font-medium text-green-900 dark:text-green-200">
												Candidature approuvée !
											</h4>
											<p className="text-sm text-green-700 dark:text-green-300 mt-1">
												Félicitations ! Votre adhésion a été validée. Vous
												pouvez maintenant accéder à tous les services d'ASP-hub.
											</p>
										</div>
									</div>
								</div>
							)}

							{status.applicationStatus === "rejected" && (
								<div className="p-4 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800">
									<div className="flex items-start gap-3">
										<AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
										<div>
											<h4 className="font-medium text-red-900 dark:text-red-200">
												Candidature rejetée
											</h4>
											<p className="text-sm text-red-700 dark:text-red-300 mt-1">
												Votre candidature n'a pas été retenue.
												{applications?.[0]?.reviewComments && (
													<>
														<br />
														<strong>Commentaires :</strong>{" "}
														{applications[0].reviewComments}
													</>
												)}
											</p>
										</div>
									</div>
								</div>
							)}

							{/* Détails de la candidature */}
							{applications?.[0] && (
								<div className="border-t pt-6">
									<h4 className="font-medium text-gray-900 dark:text-white mb-4">
										Détails de votre candidature
									</h4>
									<div className="space-y-3">
										{applications[0].motivation && (
											<div>
												<p className="text-sm font-medium text-gray-700 dark:text-gray-300">
													Motivation
												</p>
												<p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded">
													{applications[0].motivation}
												</p>
											</div>
										)}

										{applications[0].sectionName && (
											<div className="flex items-center gap-2">
												<User className="h-4 w-4 text-gray-500" />
												<span className="text-sm text-gray-600 dark:text-gray-400">
													Section : {applications[0].sectionName}
												</span>
											</div>
										)}

										{applications[0].reviewedAt && (
											<div className="flex items-center gap-2">
												<Calendar className="h-4 w-4 text-gray-500" />
												<span className="text-sm text-gray-600 dark:text-gray-400">
													Validée le :{" "}
													{new Date(
														applications[0].reviewedAt,
													).toLocaleDateString("fr-FR")}
												</span>
											</div>
										)}

										{applications[0].reviewerName && (
											<div className="flex items-center gap-2">
												<User className="h-4 w-4 text-gray-500" />
												<span className="text-sm text-gray-600 dark:text-gray-400">
													Validée par : {applications[0].reviewerName}
												</span>
											</div>
										)}
									</div>
								</div>
							)}

							<div className="flex justify-between">
								<Button
									type="button"
									variant="outline"
									onClick={() => refetchStatus()}
									className="flex items-center gap-2"
								>
									<RefreshCw className="h-4 w-4" />
									Actualiser
								</Button>

								{status.applicationStatus === "approved" && (
									<Button onClick={() => navigate({ to: "/" })}>
										Accéder au tableau de bord
									</Button>
								)}

								{status.applicationStatus === "rejected" && (
									<Button
										onClick={() => navigate({ to: "/first-login-application" })}
									>
										Nouvelle candidature
									</Button>
								)}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

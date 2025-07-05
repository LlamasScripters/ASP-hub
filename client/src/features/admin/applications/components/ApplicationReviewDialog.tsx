import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
	Building,
	Calendar,
	CheckCircle,
	FileText,
	Mail,
	Phone,
	Tag,
	User,
	XCircle,
} from "lucide-react";
import { useState } from "react";
import type {
	PendingApplication,
	ReviewApplicationData,
} from "../hooks/use-pending-applications";
import { useReviewApplication } from "../hooks/use-pending-applications";

interface ApplicationReviewDialogProps {
	application: PendingApplication | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function ApplicationReviewDialog({
	application,
	open,
	onOpenChange,
}: ApplicationReviewDialogProps) {
	const [reviewComments, setReviewComments] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const reviewMutation = useReviewApplication();

	const handleReview = async (decision: "approved" | "rejected") => {
		if (!application) return;

		setIsSubmitting(true);
		try {
			const reviewData: ReviewApplicationData = {
				decision,
				comments: reviewComments.trim() || undefined,
			};

			await reviewMutation.mutateAsync({
				applicationId: application.id,
				data: reviewData,
			});

			// Fermer le dialog et réinitialiser
			onOpenChange(false);
			setReviewComments("");
		} catch (error) {
			console.error("Erreur lors de la validation:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!application) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<User className="h-5 w-5" />
						Candidature d'adhésion
					</DialogTitle>
					<DialogDescription>
						Examinez les détails de la candidature et prenez une décision.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6">
					{/* Informations candidat */}
					<div className="space-y-4">
						<h3 className="text-lg font-medium flex items-center gap-2">
							<User className="h-4 w-4" />
							Informations du candidat
						</h3>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label className="text-sm font-medium text-gray-700">
									Nom complet
								</Label>
								<p className="text-sm">
									{application.user.firstName} {application.user.lastName}
								</p>
							</div>
							<div className="space-y-2">
								<Label className="text-sm font-medium text-gray-700">
									Email
								</Label>
								<p className="text-sm flex items-center gap-1">
									<Mail className="h-3 w-3" />
									{application.user.email}
								</p>
							</div>
							<div className="space-y-2">
								<Label className="text-sm font-medium text-gray-700">
									Téléphone
								</Label>
								<p className="text-sm flex items-center gap-1">
									<Phone className="h-3 w-3" />
									{application.user.phone}
								</p>
							</div>
							<div className="space-y-2">
								<Label className="text-sm font-medium text-gray-700">
									Date de naissance
								</Label>
								<p className="text-sm flex items-center gap-1">
									<Calendar className="h-3 w-3" />
									{format(
										new Date(application.user.dateOfBirth),
										"dd MMMM yyyy",
										{
											locale: fr,
										},
									)}
								</p>
							</div>
						</div>
					</div>

					<Separator />

					{/* Candidature */}
					<div className="space-y-4">
						<h3 className="text-lg font-medium flex items-center gap-2">
							<FileText className="h-4 w-4" />
							Détails de la candidature
						</h3>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label className="text-sm font-medium text-gray-700">
									Section
								</Label>
								{application.section ? (
									<Badge
										variant="outline"
										className="flex items-center gap-1 w-fit"
									>
										<Building className="h-3 w-3" />
										{application.section.name}
									</Badge>
								) : (
									<p className="text-sm text-gray-500">
										Aucune section spécifiée
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label className="text-sm font-medium text-gray-700">
									Catégorie
								</Label>
								{application.category ? (
									<Badge
										variant="secondary"
										className="flex items-center gap-1 w-fit"
									>
										<Tag className="h-3 w-3" />
										{application.category.name}
									</Badge>
								) : (
									<p className="text-sm text-gray-500">
										Aucune catégorie spécifiée
									</p>
								)}
							</div>
						</div>

						<div className="space-y-2">
							<Label className="text-sm font-medium text-gray-700">
								Motivation
							</Label>
							<div className="bg-gray-50 p-3 rounded-md">
								<p className="text-sm whitespace-pre-wrap">
									{application.motivation}
								</p>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label className="text-sm font-medium text-gray-700">
									Contact d'urgence
								</Label>
								<p className="text-sm">{application.emergencyContactName}</p>
							</div>
							<div className="space-y-2">
								<Label className="text-sm font-medium text-gray-700">
									Téléphone d'urgence
								</Label>
								<p className="text-sm flex items-center gap-1">
									<Phone className="h-3 w-3" />
									{application.emergencyContactPhone}
								</p>
							</div>
						</div>

						<div className="space-y-2">
							<Label className="text-sm font-medium text-gray-700">
								Date de soumission
							</Label>
							<p className="text-sm flex items-center gap-1">
								<Calendar className="h-3 w-3" />
								{format(
									new Date(application.createdAt),
									"dd MMMM yyyy 'à' HH:mm",
									{
										locale: fr,
									},
								)}
							</p>
						</div>
					</div>

					<Separator />

					{/* Commentaires de validation */}
					<div className="space-y-2">
						<Label htmlFor="reviewComments" className="text-sm font-medium">
							Commentaires (optionnel)
						</Label>
						<Textarea
							id="reviewComments"
							value={reviewComments}
							onChange={(e) => setReviewComments(e.target.value)}
							placeholder="Ajoutez des commentaires sur votre décision..."
							rows={3}
							className="resize-none"
						/>
						<p className="text-xs text-gray-500">
							Ces commentaires seront envoyés au candidat par email.
						</p>
					</div>
				</div>

				<DialogFooter className="gap-2">
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Annuler
					</Button>
					<Button
						variant="destructive"
						onClick={() => handleReview("rejected")}
						disabled={isSubmitting}
						className="flex items-center gap-2"
					>
						<XCircle className="h-4 w-4" />
						{isSubmitting ? "Traitement..." : "Rejeter"}
					</Button>
					<Button
						onClick={() => handleReview("approved")}
						disabled={isSubmitting}
						className="flex items-center gap-2"
					>
						<CheckCircle className="h-4 w-4" />
						{isSubmitting ? "Traitement..." : "Approuver"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

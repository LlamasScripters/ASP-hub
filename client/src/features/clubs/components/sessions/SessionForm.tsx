import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
	AlertCircle,
	ArrowLeft,
	Calendar,
	Clock,
	FileText,
	Loader2,
	MapPin,
	Save,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import type { Category, SessionSport } from "../../types";

const sessionSchema = z
	.object({
		categoryId: z.string().uuid("Veuillez sélectionner une catégorie"),
		title: z.string().min(1, "Le titre est obligatoire"),
		description: z.string().optional(),
		type: z.enum(["entrainement", "match", "stage", "competition", "autre"]),
		status: z.enum(["planifie", "en_cours", "termine", "annule"]),
		startDate: z.string().min(1, "La date de début est obligatoire"),
		endDate: z.string().min(1, "La date de fin est obligatoire"),
		location: z.string().optional(),
		maxParticipants: z.number().int().positive().optional(),
		notes: z.string().optional(),
	})
	.refine(
		(data) => {
			if (data.startDate && data.endDate) {
				return new Date(data.startDate) <= new Date(data.endDate);
			}
			return true;
		},
		{
			message: "La date de fin doit être postérieure à la date de début",
			path: ["endDate"],
		},
	);

// fonction pour convertir du datetime-local en ISO
const formatDateForAPI = (localDateTime: string): string => {
	if (!localDateTime) return "";
	try {
		const date = new Date(localDateTime);
		return date.toISOString();
	} catch (error) {
		console.error("Error converting date to ISO:", error);
		return localDateTime; // fallback à la valeur originale
	}
};

// fonction pour formater une date ISO en datetime-local
const formatDateForInput = (isoDate: string): string => {
	if (!isoDate) return "";
	try {
		const date = new Date(isoDate);
		// vérifier si la date est valide
		if (Number.isNaN(date.getTime())) return "";

		// format YYYY-MM-DDTHH:MM
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");

		return `${year}-${month}-${day}T${hours}:${minutes}`;
	} catch (error) {
		console.error("Error formatting date:", error);
		return "";
	}
};

export function SessionForm({
	mode,
	clubId,
	sectionId,
	categoryId,
	sessionId,
}: {
	mode: "create" | "edit";
	clubId: string;
	sectionId: string;
	categoryId: string;
	sessionId?: string;
}) {
	const navigate = useNavigate();
	const [categories, setCategories] = useState<Category[]>([]);
	const [existingSessions, setExistingSessions] = useState<SessionSport[]>([]);
	const [isLoadingExistingSessions, setIsLoadingExistingSessions] =
		useState(true);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isLoading, setIsLoading] = useState(false);
	const [sectionName, setSectionName] = useState("");
	const [dateValidation, setDateValidation] = useState<{
		isValid: boolean;
		message: string;
		type: "error" | "warning" | "info" | null;
	}>({ isValid: true, message: "", type: null });

	const [form, setForm] = useState<Partial<SessionSport>>({
		type: "entrainement",
		status: "planifie",
		categoryId: categoryId,
	});

	const validateDates = useCallback((startDate: string, endDate: string) => {
		if (!startDate && !endDate) {
			setDateValidation({ isValid: true, message: "", type: null });
			return;
		}

		if (!startDate && endDate) {
			setDateValidation({
				isValid: false,
				message: "Veuillez renseigner la date de début",
				type: "warning",
			});
			return;
		}

		if (startDate && !endDate) {
			setDateValidation({
				isValid: false,
				message: "Veuillez renseigner la date de fin",
				type: "warning",
			});
			return;
		}

		if (startDate && endDate) {
			const start = new Date(startDate);
			const end = new Date(endDate);

			if (start > end) {
				setDateValidation({
					isValid: false,
					message:
						"⚠️ La date de début ne peut pas être postérieure à la date de fin !",
					type: "error",
				});
				return;
			}

			if (start.getTime() === end.getTime()) {
				setDateValidation({
					isValid: false,
					message:
						"⚠️ Les dates de début et fin ne peuvent pas être identiques ! Une session doit avoir une durée minimale.",
					type: "error",
				});
				return;
			}

			// calcul des durées
			const durationMs = end.getTime() - start.getTime();
			const durationMinutes = Math.floor(durationMs / (1000 * 60));
			const hours = Math.floor(durationMinutes / 60);
			const minutes = durationMinutes % 60;

			let durationText = "";
			if (hours > 0) {
				durationText += `${hours}h`;
				if (minutes > 0) durationText += ` ${minutes}min`;
			} else {
				durationText = `${minutes}min`;
			}

			setDateValidation({
				isValid: true,
				message: `Durée de la session : ${durationText}`,
				type: "info",
			});
		}
	}, []);

	// récupération des sessions existantes au chargement
	useEffect(() => {
		const fetchExistingSessions = async () => {
			try {
				setIsLoadingExistingSessions(true);
				const categoriesRes = await fetch(
					`/api/clubs/${clubId}/sections/${sectionId}/categories`,
				);
				const categoriesData: Category[] = await categoriesRes.json();

				const allSessions: SessionSport[] = [];
				for (const cat of categoriesData) {
					try {
						const sessionsRes = await fetch(
							`/api/clubs/${clubId}/sections/${sectionId}/categories/${cat.id}/sessions`,
						);
						if (sessionsRes.ok) {
							const sessionsData: SessionSport[] = await sessionsRes.json();
							console.log(
								`Sessions from API for category ${cat.name}:`,
								JSON.stringify(sessionsData, null, 2),
							);
							const sessionsWithCategoryId = sessionsData.map((session) => ({
								...session,
								categoryId: cat.id,
							}));
							allSessions.push(...sessionsWithCategoryId);
						}
					} catch (error) {
						console.error(
							`Erreur lors du chargement des sessions pour la catégorie ${cat.id}:`,
							error,
						);
					}
				}

				setExistingSessions(allSessions);
			} catch (error) {
				console.error("Erreur lors du chargement des sessions:", error);
				toast.error("Erreur lors du chargement des sessions existantes");
			} finally {
				setIsLoadingExistingSessions(false);
			}
		};

		fetchExistingSessions();
	}, [clubId, sectionId]);

	useEffect(() => {
		const fetchData = async () => {
			if (isLoadingExistingSessions) return;

			setIsLoading(true);
			try {
				// Fetch categories
				const categoriesRes = await fetch(
					`/api/clubs/${clubId}/sections/${sectionId}/categories`,
				);
				const categoriesData = await categoriesRes.json();
				setCategories(categoriesData);

				// Fetch section name
				const sectionRes = await fetch(
					`/api/clubs/${clubId}/sections/${sectionId}`,
				);
				const sectionData = await sectionRes.json();
				setSectionName(sectionData.name);

				// Fetch session data for edit mode
				if (mode === "edit" && sessionId) {
					const sessionRes = await fetch(`/api/clubs/sessions/${sessionId}`);
					const sessionData = await sessionRes.json();

					// Ensure proper date formatting for datetime-local inputs
					const formattedSessionData = {
						...sessionData,
						startDate: sessionData.startDate
							? formatDateForInput(sessionData.startDate)
							: "",
						endDate: sessionData.endDate
							? formatDateForInput(sessionData.endDate)
							: "",
						notes: sessionData.notes || "",
					};

					setForm(formattedSessionData);
				}
			} catch (error) {
				setErrors({ general: "Erreur lors du chargement des données" });
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [mode, sessionId, clubId, sectionId, isLoadingExistingSessions]);

	// validation pour les titres dupliqués
	const validateDuplicateTitle = (
		title: string,
		selectedCategoryId: string,
	) => {
		if (!title.trim() || !selectedCategoryId) return null;

		console.log(
			"Validation - Title:",
			title,
			"CategoryId:",
			selectedCategoryId,
		);
		console.log("Existing sessions:", existingSessions);

		const normalizedTitle = title.trim().toLowerCase();
		console.log("Normalized title:", normalizedTitle);

		// Log each session for debugging
		existingSessions.forEach((session, index) => {
			console.log(`Session ${index}:`, {
				title: session.title,
				normalizedTitle: session.title.trim().toLowerCase(),
				categoryId: session.categoryId,
				id: session.id,
				titleMatch: session.title.trim().toLowerCase() === normalizedTitle,
				categoryMatch: session.categoryId === selectedCategoryId,
			});
		});

		const duplicateSession = existingSessions.find(
			(session) =>
				session.title.trim().toLowerCase() === normalizedTitle &&
				session.categoryId === selectedCategoryId &&
				session.id !== sessionId, // exclusion la session actuelle en mode édition
		);

		console.log("Duplicate found:", duplicateSession);

		return duplicateSession
			? "Une session avec ce titre existe déjà pour cette catégorie"
			: null;
	};

	// validation en temps réel pour les titres et catégories
	const duplicateTitleError = validateDuplicateTitle(
		form.title || "",
		form.categoryId || "",
	);

	const handleTitleChange = (value: string) => {
		setForm((prev) => ({ ...prev, title: value }));

		// nettoye l'erreur de titre dupliqué si elle existe
		if (
			errors.title ===
			"Une session avec ce titre existe déjà pour cette catégorie"
		) {
			setErrors((prev) => {
				const { title, ...newErrors } = prev;
				return newErrors;
			});
		}
	};

	// effect pour valider les dates quand elles changent
	useEffect(() => {
		validateDates(form.startDate || "", form.endDate || "");
	}, [form.startDate, form.endDate, validateDates]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrors({});
		setIsLoading(true);

		console.log("Form submission started:", { mode, form }); // Debug log

		// validation des titres dupliqués
		const titleError = validateDuplicateTitle(
			form.title || "",
			form.categoryId || "",
		);
		if (titleError) {
			setErrors({ title: titleError });
			setIsLoading(false);
			return;
		}

		// vérifie la validation des dates en premier
		if (!dateValidation.isValid) {
			setErrors({
				general: "Veuillez corriger les erreurs de dates avant de continuer",
			});
			setIsLoading(false);
			return;
		}

		const formData = {
			...form,
			startDate: form.startDate ? formatDateForAPI(form.startDate) : undefined,
			endDate: form.endDate ? formatDateForAPI(form.endDate) : undefined,
			maxParticipants: form.maxParticipants
				? Number(form.maxParticipants)
				: undefined,
		};

		const parsed = sessionSchema.safeParse(formData);

		if (!parsed.success) {
			const formattedErrors: Record<string, string> = {};
			for (const error of parsed.error.errors) {
				const field = error.path[0] as string;
				formattedErrors[field] = error.message;
			}
			setErrors(formattedErrors);
			setIsLoading(false);
			return;
		}

		try {
			const url =
				mode === "create"
					? `/api/clubs/${clubId}/sections/${sectionId}/categories/${categoryId}/sessions`
					: `/api/clubs/sessions/${sessionId}`;

			const method = mode === "create" ? "POST" : "PUT";

			const response = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(parsed.data),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				if (
					response.status === 409 ||
					errorData.message?.includes("existe déjà")
				) {
					setErrors({
						title: "Une session avec ce titre existe déjà pour cette catégorie",
					});
					setIsLoading(false);
					return;
				}
				throw new Error(`Erreur lors de la sauvegarde: ${response.status}`);
			}

			toast.success(
				mode === "create"
					? "Session créée avec succès !"
					: "Session modifiée avec succès !",
			);

			// délai pour s'assurer que le toast s'affiche avant la navigation
			setTimeout(() => {
				navigate({
					to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/sessions",
					params: { clubId, sectionId },
				});
			}, 500);
		} catch (error) {
			console.error("Erreur complète:", error);
			toast.error("Erreur lors de la sauvegarde de la session");
			setErrors({ general: "Erreur lors de la sauvegarde de la session" });
		} finally {
			setIsLoading(false);
		}
	};

	const handleBack = () => {
		navigate({
			to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/sessions",
			params: { clubId, sectionId },
		});
	};

	if (isLoadingExistingSessions) {
		return (
			<div className="p-6 max-w-4xl mx-auto">
				<Card>
					<CardContent className="pt-6">
						<div className="flex items-center justify-center space-x-2">
							<Loader2 className="h-6 w-6 animate-spin" />
							<span>Chargement des données...</span>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center gap-4">
					<Button
						variant="ghost"
						size="sm"
						onClick={handleBack}
						className="p-2"
					>
						<ArrowLeft className="h-4 w-4" />
					</Button>
					<div className="space-y-1">
						<h1 className="text-3xl font-bold tracking-tight">
							{mode === "create" ? "Créer une session" : "Modifier la session"}
						</h1>
						<p className="text-muted-foreground">
							{mode === "create"
								? `Planifiez une nouvelle session pour la section ${sectionName}`
								: "Modifiez les informations de cette session"}
						</p>
					</div>
				</div>

				{/* Error Alert */}
				{errors.general && (
					<Alert variant="destructive">
						<AlertCircle className="h-4 w-4" />
						<AlertDescription>{errors.general}</AlertDescription>
					</Alert>
				)}

				{/* Form Card */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Calendar className="h-5 w-5" />
							Informations de la session
						</CardTitle>
						<CardDescription>
							Définissez les détails de votre session sportive
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-8">
							{/* Basic Information */}
							<div className="space-y-6">
								<div className="flex items-center gap-2">
									<FileText className="h-4 w-4" />
									<h3 className="text-lg font-semibold">
										Informations générales
									</h3>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<Label htmlFor="categoryId" className="text-sm font-medium">
											Catégorie <span className="text-destructive">*</span>
										</Label>
										{categories.length > 0 ? (
											<Select
												value={form.categoryId || ""}
												onValueChange={(value) => {
													setForm((prev) => ({ ...prev, categoryId: value }));
												}}
											>
												<SelectTrigger
													className={
														errors.categoryId ? "border-destructive" : ""
													}
												>
													<SelectValue placeholder="Choisir une catégorie" />
												</SelectTrigger>
												<SelectContent>
													{categories.map((cat) => (
														<SelectItem key={cat.id} value={cat.id}>
															{cat.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										) : (
											<div className="flex items-center space-x-2">
												<Loader2 className="h-4 w-4 animate-spin" />
												<span className="text-sm text-muted-foreground">
													Chargement des catégories...
												</span>
											</div>
										)}
										{errors.categoryId && (
											<p className="text-sm text-destructive">
												{errors.categoryId}
											</p>
										)}
									</div>

									<div className="space-y-2">
										<Label htmlFor="title" className="text-sm font-medium">
											Titre de la session{" "}
											<span className="text-destructive">*</span>
										</Label>
										<Input
											id="title"
											placeholder="Ex: Entraînement technique, Match amical..."
											value={form.title ?? ""}
											onChange={(e) => handleTitleChange(e.target.value)}
											className={
												errors.title || duplicateTitleError
													? "border-destructive"
													: ""
											}
										/>
										{(errors.title || duplicateTitleError) && (
											<p className="text-sm text-destructive">
												{errors.title || duplicateTitleError}
											</p>
										)}
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="description" className="text-sm font-medium">
										Description
									</Label>
									<Textarea
										id="description"
										placeholder="Description détaillée de la session..."
										value={form.description ?? ""}
										onChange={(e) =>
											setForm({ ...form, description: e.target.value })
										}
										rows={3}
										className="resize-none"
									/>
									<p className="text-xs text-muted-foreground">
										Ajoutez des détails sur les objectifs, le contenu ou les
										consignes
									</p>
								</div>
							</div>

							<Separator />

							{/* Date and Time */}
							<div className="space-y-6">
								<div className="flex items-center gap-2">
									<Clock className="h-4 w-4" />
									<h3 className="text-lg font-semibold">Planification</h3>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<Label htmlFor="startDate" className="text-sm font-medium">
											Date et heure de début{" "}
											<span className="text-destructive">*</span>
										</Label>
										<Input
											id="startDate"
											type="datetime-local"
											value={form.startDate ?? ""}
											onChange={(e) =>
												setForm({ ...form, startDate: e.target.value })
											}
											className={errors.startDate ? "border-destructive" : ""}
										/>
										{errors.startDate && (
											<p className="text-sm text-destructive">
												{errors.startDate}
											</p>
										)}
									</div>

									<div className="space-y-2">
										<Label htmlFor="endDate" className="text-sm font-medium">
											Date et heure de fin{" "}
											<span className="text-destructive">*</span>
										</Label>
										<Input
											id="endDate"
											type="datetime-local"
											value={form.endDate ?? ""}
											onChange={(e) =>
												setForm({ ...form, endDate: e.target.value })
											}
											className={errors.endDate ? "border-destructive" : ""}
										/>
										{errors.endDate && (
											<p className="text-sm text-destructive">
												{errors.endDate}
											</p>
										)}
									</div>
								</div>

								{/* Validation des dates en temps réel */}
								{dateValidation.message && (
									<Alert
										variant={
											dateValidation.type === "error"
												? "destructive"
												: "default"
										}
										className={
											dateValidation.type === "error"
												? "border-destructive bg-destructive/10"
												: dateValidation.type === "warning"
													? "border-orange-500 bg-orange-50 text-orange-800"
													: "border-blue-500 bg-blue-50 text-blue-800"
										}
									>
										<AlertCircle className="h-4 w-4" />
										<AlertDescription className="font-medium">
											{dateValidation.message}
										</AlertDescription>
									</Alert>
								)}

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<Label htmlFor="type" className="text-sm font-medium">
											Type de session
										</Label>
										<Select
											value={form.type || "entrainement"}
											onValueChange={(value) =>
												setForm({
													...form,
													type: value as SessionSport["type"],
												})
											}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="entrainement">
													Entraînement
												</SelectItem>
												<SelectItem value="match">Match</SelectItem>
												<SelectItem value="stage">Stage</SelectItem>
												<SelectItem value="competition">Compétition</SelectItem>
												<SelectItem value="autre">Autre</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className="space-y-2">
										<Label htmlFor="status" className="text-sm font-medium">
											Statut
										</Label>
										<Select
											value={form.status || "planifie"}
											onValueChange={(value) =>
												setForm({
													...form,
													status: value as SessionSport["status"],
												})
											}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="planifie">Planifié</SelectItem>
												<SelectItem value="en_cours">En cours</SelectItem>
												<SelectItem value="termine">Terminé</SelectItem>
												<SelectItem value="annule">Annulé</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>

							<Separator />

							{/* Additional Details */}
							<div className="space-y-6">
								<div className="flex items-center gap-2">
									<MapPin className="h-4 w-4" />
									<h3 className="text-lg font-semibold">
										Détails supplémentaires
									</h3>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<Label htmlFor="location" className="text-sm font-medium">
											Lieu
										</Label>
										<Input
											id="location"
											placeholder="Ex: Gymnase principal, Terrain A..."
											value={form.location ?? ""}
											onChange={(e) =>
												setForm({ ...form, location: e.target.value })
											}
										/>
									</div>

									<div className="space-y-2">
										<Label
											htmlFor="maxParticipants"
											className="text-sm font-medium"
										>
											Nombre maximum de participants
										</Label>
										<Input
											id="maxParticipants"
											type="number"
											placeholder="Ex: 20"
											min="1"
											max="9999"
											value={form.maxParticipants ?? ""}
											onChange={(e) => {
												const value = e.target.value;
												if (value === "" || /^\d+$/.test(value)) {
													setForm({
														...form,
														maxParticipants: value ? Number(value) : undefined,
													});
												}
											}}
											onKeyDown={(e) => {
												if (
													![
														"Backspace",
														"Delete",
														"Tab",
														"Escape",
														"Enter",
														"ArrowLeft",
														"ArrowRight",
													].includes(e.key) &&
													!/^\d$/.test(e.key)
												) {
													e.preventDefault();
												}
											}}
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="notes" className="text-sm font-medium">
										Notes additionnelles
									</Label>
									<Textarea
										id="notes"
										placeholder="Notes, consignes particulières, matériel requis..."
										value={form.notes ?? ""}
										onChange={(e) => {
											setForm({ ...form, notes: e.target.value });
										}}
										rows={3}
										className="resize-none"
									/>
								</div>
							</div>

							<Separator />

							{/* Actions */}
							<div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
								<Button
									type="button"
									variant="outline"
									onClick={handleBack}
									disabled={isLoading}
								>
									Annuler
								</Button>
								<Button
									type="submit"
									disabled={
										isLoading ||
										!dateValidation.isValid ||
										!!duplicateTitleError
									}
									className="min-w-[120px]"
								>
									{isLoading ? (
										"Enregistrement..."
									) : (
										<>
											<Save className="mr-2 h-4 w-4" />
											{mode === "create" ? "Créer" : "Modifier"}
										</>
									)}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

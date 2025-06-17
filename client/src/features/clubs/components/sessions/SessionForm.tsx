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
	MapPin,
	Save,
} from "lucide-react";
import { useEffect, useState } from "react";
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

// Fonction pour formater une date ISO en format datetime-local
const formatDateForInput = (isoDate: string): string => {
	if (!isoDate) return "";
	const date = new Date(isoDate);
	// Format YYYY-MM-DDTHH:MM (sans secondes ni millisecondes)
	return date.toISOString().slice(0, 16);
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
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isLoading, setIsLoading] = useState(false);
	const [sectionName, setSectionName] = useState("");

	const [form, setForm] = useState<Partial<SessionSport>>({
		type: "entrainement",
		status: "planifie",
		categoryId: categoryId,
	});

	useEffect(() => {
		const fetchData = async () => {
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
					setForm(sessionData);
				}
			} catch (error) {
				setErrors({ general: "Erreur lors du chargement des données" });
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [mode, sessionId, clubId, sectionId]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrors({});
		setIsLoading(true);

		const parsed = sessionSchema.safeParse({
			...form,
			maxParticipants: form.maxParticipants
				? Number(form.maxParticipants)
				: undefined,
		});

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
				body: JSON.stringify({
					...parsed.data,
					categoryId,
				}),
			});

			if (!response.ok) {
				throw new Error("Erreur lors de la sauvegarde");
			}

			toast.success(
				mode === "create"
					? "Session créée avec succès !"
					: "Session modifiée avec succès !",
			);
			navigate({
				to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/sessions",
				params: { clubId, sectionId },
			});
		} catch (error) {
			console.error("Erreur:", error);
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
										<Select
											value={form.categoryId || ""}
											onValueChange={(value) =>
												setForm({ ...form, categoryId: value })
											}
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
											onChange={(e) =>
												setForm({ ...form, title: e.target.value })
											}
											className={errors.title ? "border-destructive" : ""}
										/>
										{errors.title && (
											<p className="text-sm text-destructive">{errors.title}</p>
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
											value={formatDateForInput(form.startDate ?? "")}
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
											value={formatDateForInput(form.endDate ?? "")}
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
											value={form.maxParticipants ?? ""}
											onChange={(e) =>
												setForm({
													...form,
													maxParticipants: e.target.value
														? Number(e.target.value)
														: undefined,
												})
											}
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
										onChange={(e) =>
											setForm({ ...form, notes: e.target.value })
										}
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
									disabled={isLoading}
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

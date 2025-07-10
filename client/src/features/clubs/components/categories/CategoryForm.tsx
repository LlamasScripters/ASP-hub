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
	AlertTriangle,
	ArrowLeft,
	Calendar,
	Loader2,
	Save,
	User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useCategoryCoach } from "../../hooks/useCategoryCoach";
import { useEligibleUsersForCategory } from "../../hooks/useEligibleUsers";
import type { Category, EligibleUser } from "../../types";

const schema = z
	.object({
		name: z.string().min(1, "Le nom est obligatoire"),
		description: z.string().optional(),
		ageMin: z.number().int().nonnegative().optional(),
		ageMax: z.number().int().nonnegative().optional(),
		coachId: z.string().optional(),
	})
	.refine(
		(data) => {
			// si on un âge est défini, l'autre doit l'être aussi
			if ((data.ageMin !== undefined) !== (data.ageMax !== undefined)) {
				return false;
			}
			// si les deux sont définis, âge min doit être inférieur à ou égal à âge max
			if (data.ageMin !== undefined && data.ageMax !== undefined) {
				if (data.ageMin > data.ageMax) {
					return false;
				}
				if (data.ageMin === data.ageMax) {
					return false;
				}
			}
			return true;
		},
		{
			message:
				"Si vous définissez une limite d'âge, vous devez remplir à la fois l'âge minimum et maximum",
			path: ["ageRange"],
		},
	)
	.refine(
		(data) => {
			if (data.ageMin !== undefined && data.ageMax !== undefined) {
				return data.ageMin <= data.ageMax;
			}
			return true;
		},
		{
			message: "L'âge minimum doit être inférieur à l'âge maximum",
			path: ["ageMax"],
		},
	)
	.refine(
		(data) => {
			if (data.ageMin !== undefined && data.ageMax !== undefined) {
				return data.ageMin !== data.ageMax;
			}
			return true;
		},
		{
			message: "L'âge minimum et maximum ne peuvent pas être identiques",
			path: ["ageMax"],
		},
	);

export function CategoryForm({
	mode,
	clubId,
	sectionId,
	categoryId,
	category,
}: {
	mode: "create" | "edit";
	clubId: string;
	sectionId: string;
	categoryId?: string;
	category?: Category;
}) {
	const navigate = useNavigate();
	const { data: eligibleUsers = [], isLoading: isLoadingUsers } =
		useEligibleUsersForCategory(categoryId);
	const { assignCoach, removeCoach } = useCategoryCoach();
	const [form, setForm] = useState<Partial<Category>>({});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isLoading, setIsLoading] = useState(false);
	const [existingCategories, setExistingCategories] = useState<Category[]>([]);
	const [isLoadingExistingCategories, setIsLoadingExistingCategories] =
		useState(true);

	// récupération des catégories existantes au chargement
	useEffect(() => {
		const fetchExistingCategories = async () => {
			try {
				setIsLoadingExistingCategories(true);
				const response = await fetch(
					`/api/clubs/${clubId}/sections/${sectionId}/categories`,
				);
				if (!response.ok)
					throw new Error("Erreur lors du chargement des catégories");
				const categories: Category[] = await response.json();
				setExistingCategories(categories);
			} catch (error) {
				console.error("Erreur lors du chargement des catégories:", error);
				toast.error("Erreur lors du chargement des catégories existantes");
			} finally {
				setIsLoadingExistingCategories(false);
			}
		};

		fetchExistingCategories();
	}, [clubId, sectionId]);

	useEffect(() => {
		if (mode === "edit" && category) {
			// If category data is already provided, use it
			setForm({
				name: category.name || "",
				description: category.description || "",
				ageMin: category.ageMin,
				ageMax: category.ageMax,
				coachId: category.coachId || "none",
			});
		} else if (
			mode === "edit" &&
			categoryId &&
			!isLoadingExistingCategories &&
			!category
		) {
			// If no category data provided, fetch it
			setIsLoading(true);
			fetch(
				`/api/clubs/${clubId}/sections/${sectionId}/categories/${categoryId}`,
			)
				.then((res) => res.json())
				.then((data) => {
					setForm({
						name: data.name || "",
						description: data.description || "",
						ageMin: data.ageMin,
						ageMax: data.ageMax,
						coachId: data.coachId || "none",
					});
				})
				.finally(() => setIsLoading(false));
		}
	}, [
		mode,
		categoryId,
		category,
		clubId,
		sectionId,
		isLoadingExistingCategories,
	]);

	// validation pour les noms dupliqués
	const validateDuplicateName = (name: string) => {
		if (!name.trim()) return null;

		const normalizedName = name.trim().toLowerCase();
		const duplicateCategory = existingCategories.find(
			(category) =>
				category.name.trim().toLowerCase() === normalizedName &&
				category.id !== categoryId, // exclusion la catégorie actuelle en mode édition
		);

		return duplicateCategory
			? "Une catégorie avec ce nom existe déjà dans cette section"
			: null;
	};

	// validation en temps réel des âges
	const validateAgeRange = (ageMin?: number, ageMax?: number) => {
		// si un âge est défini, l'autre doit l'être aussi
		if ((ageMin !== undefined) !== (ageMax !== undefined)) {
			return "Si vous définissez une limite d'âge, vous devez remplir à la fois l'âge minimum et maximum";
		}

		// si les deux sont définis, validation de cohérence
		if (ageMin !== undefined && ageMax !== undefined) {
			if (ageMin > ageMax) {
				return "L'âge minimum ne peut pas être supérieur à l'âge maximum";
			}
			if (ageMin === ageMax) {
				return "L'âge minimum et maximum ne peuvent pas être identiques";
			}
		}

		return null;
	};

	const ageRangeError = validateAgeRange(form.ageMin, form.ageMax);
	const duplicateNameError = validateDuplicateName(form.name || "");
	const isValidAgeRange =
		form.ageMin !== undefined && form.ageMax !== undefined && !ageRangeError;
	const hasPartialAge =
		(form.ageMin !== undefined) !== (form.ageMax !== undefined);

	const handleAgeMinChange = (value: string) => {
		const ageMin = value ? Number(value) : undefined;
		setForm((prev) => ({ ...prev, ageMin }));
	};

	const handleAgeMaxChange = (value: string) => {
		const ageMax = value ? Number(value) : undefined;
		setForm((prev) => ({ ...prev, ageMax }));
	};

	const handleNameChange = (value: string) => {
		setForm((prev) => ({ ...prev, name: value }));

		// nettoyer l'erreur de nom dupliqué si elle existe
		if (
			errors.name === "Une catégorie avec ce nom existe déjà dans cette section"
		) {
			setErrors((prev) => {
				const { name, ...newErrors } = prev;
				return newErrors;
			});
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrors({});
		setIsLoading(true);

		// validation des noms dupliqués
		const nameError = validateDuplicateName(form.name || "");
		if (nameError) {
			setErrors({ name: nameError });
			setIsLoading(false);
			return;
		}

		// validation côté client
		if (ageRangeError) {
			setErrors({ ageRange: ageRangeError });
			setIsLoading(false);
			return;
		}

		const parsed = schema.safeParse({
			...form,
			ageMin: form.ageMin ? Number(form.ageMin) : undefined,
			ageMax: form.ageMax ? Number(form.ageMax) : undefined,
			coachId: form.coachId, // Explicitement inclure coachId
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
			let response: Response;
			let createdCategory: Category | null = null;
			const { coachId, ...categoryData } = parsed.data;

			if (mode === "create") {
				response = await fetch(
					`/api/clubs/${clubId}/sections/${sectionId}/categories`,
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(categoryData),
					},
				);
			} else {
				response = await fetch(
					`/api/clubs/${clubId}/sections/${sectionId}/categories/${categoryId}`,
					{
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(categoryData),
					},
				);
			}

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				if (
					response.status === 409 ||
					errorData.message?.includes("existe déjà")
				) {
					setErrors({
						name: "Une catégorie avec ce nom existe déjà dans cette section",
					});
					setIsLoading(false);
					return;
				}
				throw new Error(errorData.message || "Erreur lors de la sauvegarde");
			}

			if (mode === "create") {
				createdCategory = await response.json();
			}

			// Gestion du coach
			const targetCategoryId =
				mode === "create" ? createdCategory?.id : categoryId;
			const actualCoachId = coachId === "none" ? "" : coachId;
			// Pour la comparaison, utiliser le coachId original de la catégorie, pas l'état du formulaire
			const originalCoachId =
				mode === "edit" && category ? category.coachId || "" : "";

			if (targetCategoryId && actualCoachId) {
				// Si un coach est sélectionné, l'assigner
				if (actualCoachId !== originalCoachId) {
					await assignCoach({
						clubId,
						sectionId,
						categoryId: targetCategoryId,
						userId: actualCoachId,
					});
				}
			} else if (targetCategoryId && originalCoachId && !actualCoachId) {
				// Si le coach a été supprimé, le retirer
				await removeCoach({ clubId, sectionId, categoryId: targetCategoryId });
			}

			toast.success(
				mode === "create"
					? "Catégorie créée avec succès !"
					: "Catégorie modifiée avec succès !",
			);
			navigate({
				to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/categories",
				params: { clubId, sectionId },
			});
		} catch (error) {
			console.error("Erreur:", error);
			toast.error("Erreur lors de la sauvegarde de la catégorie");
			setErrors({ general: "Une erreur est survenue lors de la sauvegarde" });
		} finally {
			setIsLoading(false);
		}
	};

	const handleBack = () => {
		navigate({
			to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/categories",
			params: { clubId, sectionId },
		});
	};

	if (isLoadingExistingCategories) {
		return (
			<div className="container mx-auto p-6 max-w-2xl">
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
		<div className="container mx-auto p-6 max-w-2xl">
			<div className="space-y-6">
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
							Formulaire d{""}
							{mode === "create" ? "e création" : "'édition"} d'une catégorie
						</CardTitle>
						<CardDescription>
							{mode === "edit" ? (
								<p className="text-sm text-muted-foreground">
									Modifiez les informations de cette catégorie pour mettre à
									jour ses paramètres.
								</p>
							) : (
								<p className="text-sm text-muted-foreground">
									Remplissez les informations ci-dessous pour créer une nouvelle
									catégorie dans cette section. Les champs marqués d'un{" "}
									<span className="text-destructive font-medium">*</span> sont
									obligatoires.
								</p>
							)}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Basic Information */}
							<div className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="name" className="text-sm font-medium">
										Nom de la catégorie{" "}
										<span className="text-destructive">*</span>
									</Label>
									<Input
										id="name"
										placeholder="Ex: U15, Seniors, Débutants..."
										value={form.name ?? ""}
										onChange={(e) => handleNameChange(e.target.value)}
										className={
											errors.name || duplicateNameError
												? "border-destructive"
												: ""
										}
									/>
									{(errors.name || duplicateNameError) && (
										<p className="text-sm text-destructive">
											{errors.name || duplicateNameError}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="description" className="text-sm font-medium">
										Description
									</Label>
									<Textarea
										id="description"
										placeholder="Description optionnelle de la catégorie..."
										value={form.description ?? ""}
										onChange={(e) =>
											setForm({ ...form, description: e.target.value })
										}
										rows={3}
										className="resize-none"
									/>
									<p className="text-xs text-muted-foreground">
										Ajoutez des détails sur cette catégorie (objectifs, niveau
										requis, etc.)
									</p>
								</div>
							</div>

							<Separator />

							{/* Age Range */}
							<div className="space-y-4">
								<div className="flex items-center gap-2">
									<Calendar className="h-4 w-4" />
									<h3 className="text-lg font-semibold">Tranche d'âge</h3>
								</div>
								<p className="text-sm text-muted-foreground">
									Définissez les limites d'âge pour cette catégorie
								</p>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="ageMin" className="text-sm font-medium">
											Âge minimum
										</Label>
										<Input
											id="ageMin"
											type="number"
											placeholder="Ex: 12"
											min="0"
											max="100"
											value={form.ageMin ?? ""}
											onChange={(e) => handleAgeMinChange(e.target.value)}
											className={
												errors.ageMin || ageRangeError
													? "border-destructive"
													: ""
											}
										/>
										{errors.ageMin && (
											<p className="text-sm text-destructive">
												{errors.ageMin}
											</p>
										)}
									</div>

									<div className="space-y-2">
										<Label htmlFor="ageMax" className="text-sm font-medium">
											Âge maximum
										</Label>
										<Input
											id="ageMax"
											type="number"
											placeholder="Ex: 18"
											min="0"
											max="100"
											value={form.ageMax ?? ""}
											onChange={(e) => handleAgeMaxChange(e.target.value)}
											className={
												errors.ageMax || ageRangeError
													? "border-destructive"
													: ""
											}
										/>
										{errors.ageMax && (
											<p className="text-sm text-destructive">
												{errors.ageMax}
											</p>
										)}
									</div>
								</div>

								{/* Erreur de tranche d'âge */}
								{ageRangeError && (
									<Alert variant="destructive">
										<AlertTriangle className="h-4 w-4" />
										<AlertDescription>{ageRangeError}</AlertDescription>
									</Alert>
								)}

								{/* Aperçu de la tranche d'âge valide */}
								{isValidAgeRange && (
									<div className="p-3 bg-green-50 border border-green-200 rounded-lg">
										<p className="text-sm text-green-700">
											✅ Cette catégorie acceptera les participants âgés de{" "}
											<span className="font-semibold">
												{form.ageMin} à {form.ageMax} ans
											</span>
											{form.ageMin !== undefined &&
												form.ageMax !== undefined && (
													<>
														{" "}
														({form.ageMax - form.ageMin + 1} années couvertes)
													</>
												)}
										</p>
									</div>
								)}

								{/* Avertissement pour âge partiel */}
								{hasPartialAge && (
									<div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
										<p className="text-sm text-orange-700">
											⚠️ <strong>Attention :</strong> Vous devez remplir à la
											fois l'âge minimum et maximum pour définir une limite
											d'âge, ou laisser les deux champs vides pour une catégorie
											sans restriction.
										</p>
									</div>
								)}

								{/* Aide pour les tranches d'âge */}
								{!form.ageMin && !form.ageMax && (
									<div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
										<p className="text-sm text-blue-700">
											💡 <strong>Options disponibles :</strong>
											<br />• Laissez vide pour une catégorie{" "}
											<strong>sans restriction d'âge</strong>
											<br />• Ou remplissez <strong>les deux champs</strong>{" "}
											pour définir une tranche d'âge spécifique
										</p>
									</div>
								)}
							</div>

							<Separator />

							{/* Coach */}
							<div className="space-y-4">
								<div className="flex items-center gap-2">
									<User className="h-4 w-4" />
									<h3 className="text-lg font-semibold">
										Coach de la catégorie
									</h3>
								</div>
								<p className="text-sm text-muted-foreground">
									Désignez un utilisateur comme coach pour cette catégorie
								</p>

								<div className="space-y-2">
									<Label htmlFor="coachId" className="text-sm font-medium">
										Coach (optionnel)
									</Label>
									<Select
										value={form.coachId || "none"}
										onValueChange={(value) =>
											setForm({
												...form,
												coachId: value === "none" ? undefined : value,
											})
										}
										disabled={isLoadingUsers}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Sélectionner un coach" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="none">Aucun coach</SelectItem>
											{eligibleUsers.map((user: EligibleUser) => (
												<SelectItem key={user.id} value={user.id}>
													{user.firstName} {user.lastName} ({user.email})
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<p className="text-xs text-muted-foreground">
										Seuls les utilisateurs non-administrateurs peuvent être
										sélectionnés comme coach.
									</p>
								</div>
							</div>

							<Separator />

							{/* Actions */}
							<div className="flex flex-col sm:flex-row gap-3 pt-6">
								<Button
									type="submit"
									disabled={
										isLoading || !!ageRangeError || !!duplicateNameError
									}
									className="flex items-center gap-2 flex-1 sm:flex-none hover:cursor-pointer hover:opacity-90 transition-opacity"
								>
									{isLoading ? (
										<>
											<Loader2 className="h-4 w-4 animate-spin" />
											{mode === "create" ? "Création..." : "Modification..."}
										</>
									) : (
										<>
											<Save className="h-4 w-4" />
											{mode === "create" ? "Créer la catégorie" : "Sauvegarder"}
										</>
									)}
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={handleBack}
									disabled={isLoading}
									className="flex items-center gap-2 hover:cursor-pointer hover:opacity-90 transition-opacity"
								>
									<ArrowLeft className="h-4 w-4" />
									Annuler
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

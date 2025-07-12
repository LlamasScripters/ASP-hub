import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
	ArrowLeft,
	Calendar,
	FileText,
	FolderOpen,
	Loader2,
	Save,
	User,
} from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useEligibleUsersForCategory, useAssignCategoryCoachSilent, useRemoveCategoryCoachSilent } from "../../hooks/useResponsibilities";
import { useCategoriesBySection, useCategory, useCreateCategory, useUpdateCategory } from "../../hooks/useCategories";
import type { Category, EligibleUser } from "../../types";

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
	
	// Utilisation des hooks personnalisés
	const { data: categoriesData } = useCategoriesBySection(sectionId);
	const existingCategories = categoriesData?.data || [];
	const { data: categoryData } = useCategory(categoryId || "");
	const createCategoryMutation = useCreateCategory();
	const updateCategoryMutation = useUpdateCategory();
	
	const { data: eligibleUsers = [], isLoading: isLoadingUsers } =
		useEligibleUsersForCategory(categoryId);
	const assignCoachMutation = useAssignCategoryCoachSilent();
	const removeCoachMutation = useRemoveCategoryCoachSilent();
	
	const isLoading = 
		createCategoryMutation.isPending || 
		updateCategoryMutation.isPending ||
		assignCoachMutation.isPending ||
		removeCoachMutation.isPending;

	const isEditing = mode === "edit";

	// Schéma de validation dynamique qui prend en compte les catégories existantes
	const createCategorySchema = (
		existingCategories: Category[],
		currentCategoryId?: string,
	) => {
		return z.object({
			name: z
				.string()
				.min(1, "Le nom est requis")
				.max(100, "Le nom ne peut pas dépasser 100 caractères")
				.refine((name) => {
					// Normalisation du nom pour la comparaison
					const normalizedName = name.trim().toLowerCase();

					// Vérifie si une catégorie avec ce nom existe déjà
					const duplicateCategory = existingCategories.find(
						(category) =>
							category.name.trim().toLowerCase() === normalizedName &&
							category.id !== currentCategoryId, // Exclusion la catégorie actuelle en mode édition
					);

					return !duplicateCategory;
				}, "Une catégorie avec ce nom existe déjà dans cette section"),
			description: z.string().optional(),
			ageMin: z.number().int().nonnegative().optional(),
			ageMax: z.number().int().nonnegative().optional(),
			coachId: z.string().optional(),
		})
		.refine(
			(data) => {
				// Si un âge est défini, l'autre doit l'être aussi
				if ((data.ageMin !== undefined) !== (data.ageMax !== undefined)) {
					return false;
				}
				// Si les deux sont définis, âge min doit être inférieur à âge max
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
				message: "Si vous définissez une limite d'âge, vous devez remplir à la fois l'âge minimum et maximum, et l'âge minimum doit être inférieur à l'âge maximum",
				path: ["ageMin"],
			},
		);
	};

	const categorySchema = createCategorySchema(existingCategories, categoryId);
	type CategoryFormData = z.infer<typeof categorySchema>;

	const form = useForm<CategoryFormData>({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: category?.name || "",
			description: category?.description || "",
			ageMin: category?.ageMin,
			ageMax: category?.ageMax,
			coachId: category?.coach?.id || "none",
		},
	});

	// Chargement de la catégorie en mode édition
	useEffect(() => {
		if (isEditing && category) {
			// If category data is already provided, use it to reset the form
			form.reset({
				name: category.name || "",
				description: category.description || "",
				ageMin: category.ageMin,
				ageMax: category.ageMax,
				coachId: category.coach?.id || "none",
			});
		} else if (isEditing && categoryData) {
			// Use data from the hook
			form.reset({
				name: categoryData.name || "",
				description: categoryData.description || "",
				ageMin: categoryData.ageMin,
				ageMax: categoryData.ageMax,
				coachId: categoryData.coach?.id || "none",
			});
		}
	}, [isEditing, category, categoryData, form]);

	// Validation en temps réel pour les noms dupliqués
	useEffect(() => {
		const subscription = form.watch((value, { name: fieldName }) => {
			if (fieldName === "name" && value.name) {
				const normalizedName = value.name.trim().toLowerCase();
				const duplicateCategory = existingCategories.find(
					(category: Category) =>
						category.name.trim().toLowerCase() === normalizedName &&
						category.id !== categoryId,
				);

				if (duplicateCategory) {
					form.setError("name", {
						type: "manual",
						message: "Une catégorie avec ce nom existe déjà dans cette section",
					});
				} else {
					// Nettoie l'erreur si le nom n'est plus dupliqué
					const currentError = form.formState.errors.name;
					if (
						currentError &&
						currentError.message === "Une catégorie avec ce nom existe déjà dans cette section"
					) {
						form.clearErrors("name");
					}
				}
			}
		});

		return () => subscription.unsubscribe();
	}, [form, existingCategories, categoryId]);

	const onSubmit = async (data: CategoryFormData) => {
		// Validation manuelle supplémentaire pour les noms dupliqués
		const normalizedName = data.name.trim().toLowerCase();
		const duplicateCategory = existingCategories.find(
			(category: Category) =>
				category.name.trim().toLowerCase() === normalizedName &&
				category.id !== categoryId,
		);

		if (duplicateCategory) {
			form.setError("name", {
				type: "manual",
				message: "Une catégorie avec ce nom existe déjà dans cette section",
			});
			return;
		}

		try {
			let createdCategory: Category | null = null;
			const { coachId, ...categoryData } = data;
			const actualCoachId = coachId && coachId !== "" && coachId !== "none" ? coachId : "";

			// Étape 1: Créer ou mettre à jour la catégorie
			if (mode === "create") {
				createdCategory = await createCategoryMutation.mutateAsync({
					...categoryData,
					sectionId,
				});
			} else if (categoryId) {
				await updateCategoryMutation.mutateAsync({
					id: categoryId,
					data: categoryData,
				});
			}

			// Étape 2: Gestion du coach (seulement si l'étape 1 a réussi)
			const targetCategoryId =
				mode === "create" ? createdCategory?.id : categoryId;
			const originalCoachId =
				mode === "edit" && category ? category.coach?.id || "" : "";

			if (targetCategoryId && actualCoachId) {
				// Si un coach est sélectionné, l'assigner
				if (actualCoachId !== originalCoachId) {
					try {
						await assignCoachMutation.mutateAsync({
							categoryId: targetCategoryId,
							data: { userId: actualCoachId },
						});
					} catch (coachError) {
						console.error("Erreur lors de l'assignation du coach:", coachError);
						form.setError("coachId", {
							type: "manual",
							message: "Catégorie créée/modifiée mais erreur lors de l'assignation du coach",
						});
						return; // Arrêter ici, ne pas naviguer
					}
				}
			} else if (targetCategoryId && originalCoachId && !actualCoachId) {
				// Si le coach a été supprimé, le retirer
				try {
					await removeCoachMutation.mutateAsync(targetCategoryId);
				} catch (coachError) {
					console.error("Erreur lors de la suppression du coach:", coachError);
					form.setError("coachId", {
						type: "manual",
						message: "Catégorie créée/modifiée mais erreur lors de la suppression du coach",
					});
					return; // Arrêter ici, ne pas naviguer
				}
			}

			// Étape 3: Navigation seulement si tout s'est bien passé
			const successMessage = mode === "create" ? "Catégorie créée avec succès" : "Catégorie modifiée avec succès";
			toast.success(successMessage);
			
			navigate({
				to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/categories",
				params: { clubId, sectionId },
			});
		} catch (error) {
			console.error("Erreur:", error);
			// Les erreurs sont gérées par les hooks de mutation
		}
	};

	const handleCancel = () => {
		navigate({
			to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/categories",
			params: { clubId, sectionId },
		});
	};

	// Valeurs des champs d'âge pour la validation et l'affichage
	const ageMinValue = form.watch("ageMin");
	const ageMaxValue = form.watch("ageMax");
	const hasPartialAge = (ageMinValue !== undefined) !== (ageMaxValue !== undefined);
	const isValidAgeRange = ageMinValue !== undefined && ageMaxValue !== undefined && ageMinValue < ageMaxValue;

	if (isLoading && mode === "edit") {
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
		<div className="container mx-auto p-4 sm:p-6 max-w-2xl">
			<div className="space-y-6">
				{/* Form Card */}
				<Card className="shadow-lg border">
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl flex items-center gap-2">
							<FolderOpen className="h-5 w-5" />
							Formulaire d{""}
							{mode === "create" ? "e création" : "'édition"} d'une catégorie
						</CardTitle>
						<CardDescription>
							{mode === "edit" ? (
								"Modifiez les informations de cette catégorie pour mettre à jour ses paramètres."
							) : (
								<>
									Remplissez les informations ci-dessous pour créer une nouvelle
									catégorie dans cette section. Les champs marqués d'un{" "}
									<span className="text-destructive font-medium">*</span> sont
									obligatoires.
								</>
							)}
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								{/* Nom de la catégorie */}
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-foreground font-medium flex items-center gap-2">
												<FolderOpen className="h-4 w-4" />
												Nom de la catégorie *
											</FormLabel>
											<FormControl>
												<Input
													placeholder="Ex: U15, Seniors, Débutants..."
													className="h-11"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Choisissez un nom clair et descriptif pour votre catégorie.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Description */}
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-foreground font-medium flex items-center gap-2">
												<FileText className="h-4 w-4" />
												Description
											</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Description optionnelle de la catégorie..."
													className="min-h-[100px] resize-vertical"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Ajoutez des détails sur cette catégorie (objectifs, niveau requis, etc.)
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

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
										{/* Âge minimum */}
										<FormField
											control={form.control}
											name="ageMin"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-sm font-medium">
														Âge minimum
													</FormLabel>
													<FormControl>
														<Input
															type="number"
															placeholder="Ex: 12"
															min="0"
															max="100"
															value={field.value ?? ""}
															onChange={(e) => {
																const value = e.target.value ? Number(e.target.value) : undefined;
																field.onChange(value);
															}}
															className="h-11"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										{/* Âge maximum */}
										<FormField
											control={form.control}
											name="ageMax"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-sm font-medium">
														Âge maximum
													</FormLabel>
													<FormControl>
														<Input
															type="number"
															placeholder="Ex: 18"
															min="0"
															max="100"
															value={field.value ?? ""}
															onChange={(e) => {
																const value = e.target.value ? Number(e.target.value) : undefined;
																field.onChange(value);
															}}
															className="h-11"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									{/* Aperçu de la tranche d'âge */}
									{isValidAgeRange && (
										<div className="p-3 bg-green-50 border border-green-200 rounded-lg">
											<p className="text-sm text-green-700">
												✅ Cette catégorie acceptera les participants âgés de{" "}
												<span className="font-semibold">
													{ageMinValue} à {ageMaxValue} ans
												</span>
												{" "}
												({ageMaxValue - ageMinValue + 1} années couvertes)
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
									{!ageMinValue && !ageMaxValue && (
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
								<FormField
									control={form.control}
									name="coachId"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-foreground font-medium flex items-center gap-2">
												<User className="h-4 w-4" />
												Coach de la catégorie
											</FormLabel>
											<FormControl>
												<Select
													value={field.value || "none"}
													onValueChange={(value) =>
														field.onChange(value === "none" ? "" : value)
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
											</FormControl>
											<FormDescription>
												Seuls les utilisateurs non-administrateurs peuvent être
												sélectionnés comme coach.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Separator />

								{/* Actions */}
								<div className="flex flex-col sm:flex-row gap-3 pt-6">
									<Button
										type="submit"
										disabled={isLoading}
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
										onClick={handleCancel}
										disabled={isLoading}
										className="flex items-center gap-2 hover:cursor-pointer hover:opacity-90 transition-opacity"
									>
										<ArrowLeft className="h-4 w-4" />
										Annuler
									</Button>
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

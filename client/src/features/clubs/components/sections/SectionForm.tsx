import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import {
	ArrowLeft,
	FileText,
	FolderOpen,
	Loader2,
	Palette,
	Save,
	User,
} from "lucide-react";
// client/src/features/clubs/components/SectionForm.tsx
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
import { ColorPicker } from "@/components/ui/color-picker";
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
import { Textarea } from "@/components/ui/textarea";
import { useEligibleUsersForSection, useAssignSectionManager, useRemoveSectionManager } from "../../hooks/useResponsibilities";
import { useSectionsByClub, useSection, useCreateSection, useUpdateSection } from "../../hooks/useSections";
import type { Section, EligibleUser } from "../../types";

interface SectionFormProps {
	mode: "create" | "edit";
	clubId: string;
	sectionId?: string;
	section?: Section;
	onSuccess?: (section: Section) => void;
	onCancelLink?: string;
}

export function SectionForm({
	mode,
	clubId,
	sectionId,
	section,
}: SectionFormProps) {
	const navigate = useNavigate();
	
	// Utilisation des hooks personnalisés
	const { data: sectionsData } = useSectionsByClub(clubId);
	const sections = sectionsData?.data || [];
	const { data: sectionData } = useSection(sectionId || "");
	const createSectionMutation = useCreateSection();
	const updateSectionMutation = useUpdateSection();
	
	const { data: eligibleUsers = [], isLoading: isLoadingUsers } =
		useEligibleUsersForSection(sectionId);
	const assignManagerMutation = useAssignSectionManager();
	const removeManagerMutation = useRemoveSectionManager();
	
	const isLoading = createSectionMutation.isPending || updateSectionMutation.isPending;

	const isEditing = mode === "edit";

	// Schéma de validation dynamique qui prend en compte les sections existantes
	const createSectionSchema = (
		existingSections: Section[],
		currentSectionId?: string,
	) => {
		return z.object({
			name: z
				.string()
				.min(1, "Le nom est requis")
				.max(100, "Le nom ne peut pas dépasser 100 caractères")
				.refine((name) => {
					// Normalisation du nom pour la comparaison
					const normalizedName = name.trim().toLowerCase();

					// Vérifie si une section avec ce nom existe déjà
					const duplicateSection = existingSections.find(
						(section) =>
							section.name.trim().toLowerCase() === normalizedName &&
							section.id !== currentSectionId, // Exclusion la section actuelle en mode édition
					);

					return !duplicateSection;
				}, "Une section avec ce nom existe déjà"),
			description: z.string().optional(),
			color: z
				.string()
				.regex(
					/^#[0-9a-fA-F]{6}$/,
					"La couleur doit être au format hexadécimal (#000000)",
				)
				.optional(),
			managerId: z.string().optional(),
		});
	};

	const sectionSchema = createSectionSchema(sections, sectionId);
	type SectionFormData = z.infer<typeof sectionSchema>;

	const form = useForm<SectionFormData>({
		resolver: zodResolver(sectionSchema),
		defaultValues: {
			name: section?.name || "",
			description: section?.description || "",
			color: section?.color || "#3b82f6", // blue-500 par défaut
			managerId: section?.manager?.id || "none",
		},
	});

	// Chargement de la section en mode édition
	useEffect(() => {
		if (isEditing && section) {
			// If section data is already provided, use it to reset the form
			form.reset({
				name: section.name || "",
				description: section.description || "",
				color: section.color || "#3b82f6",
				managerId: section.manager?.id || "none",
			});
		} else if (isEditing && sectionData) {
			// Use data from the hook
			form.reset({
				name: sectionData.name || "",
				description: sectionData.description || "",
				color: sectionData.color || "#3b82f6",
				managerId: sectionData.manager?.id || "none",
			});
		}
	}, [isEditing, section, sectionData, form]);

	// validation en temps réel pour les noms dupliqués
	useEffect(() => {
		const subscription = form.watch((value, { name: fieldName }) => {
			if (fieldName === "name" && value.name) {
				const normalizedName = value.name.trim().toLowerCase();
				const duplicateSection = sections.find(
					(section: Section) =>
						section.name.trim().toLowerCase() === normalizedName &&
						section.id !== sectionId,
				);

				if (duplicateSection) {
					form.setError("name", {
						type: "manual",
						message: "Une section avec ce nom existe déjà",
					});
				} else {
					// clean l'erreur si le nom n'est plus dupliqué
					const currentError = form.formState.errors.name;
					if (
						currentError &&
						currentError.message === "Une section avec ce nom existe déjà"
					) {
						form.clearErrors("name");
					}
				}
			}
		});

		return () => subscription.unsubscribe();
	}, [form, sections, sectionId]);

	const onSubmit = async (data: SectionFormData) => {
		// Validation manuelle supplémentaire pour les noms dupliqués
		const normalizedName = data.name.trim().toLowerCase();
		const duplicateSection = sections.find(
			(section: Section) =>
				section.name.trim().toLowerCase() === normalizedName &&
				section.id !== sectionId,
		);

		if (duplicateSection) {
			form.setError("name", {
				type: "manual",
				message: "Une section avec ce nom existe déjà",
			});
			return;
		}

		try {
			let createdSection: Section | null = null;
			const { managerId, ...sectionData } = data;
			const actualManagerId = managerId === "none" ? "" : managerId;

			if (mode === "create") {
				createdSection = await createSectionMutation.mutateAsync({ ...sectionData, clubId });
			} else if (sectionId) {
				await updateSectionMutation.mutateAsync({ id: sectionId, data: sectionData });
			}

			// Gestion du responsable
			const targetSectionId =
				mode === "create" ? createdSection?.id : sectionId;
			if (targetSectionId && actualManagerId) {
				// Si un responsable est sélectionné, l'assigner
				const currentManagerId =
					section?.manager?.id === "none" ? "" : section?.manager?.id;
				if (actualManagerId !== (currentManagerId || "")) {
					await assignManagerMutation.mutateAsync({
						sectionId: targetSectionId,
						data: { userId: actualManagerId },
					});
				}
			} else if (
				targetSectionId &&
				section?.manager?.id &&
				section.manager.id !== "none" &&
				!actualManagerId
			) {
				// Si le responsable a été supprimé, le retirer
				await removeManagerMutation.mutateAsync(targetSectionId);
			}

			navigate({
				to: "/admin/dashboard/clubs/$clubId/sections",
				params: { clubId },
			});
		} catch (error) {
			console.error("Erreur:", error);
			// Les erreurs sont gérées par les hooks de mutation
		}
	};

	const handleCancel = () => {
		navigate({
			to: "/admin/dashboard/clubs/$clubId/sections",
			params: { clubId },
		});
	};

	if (isLoading && mode === "edit") {
		return (
			<div className="container mx-auto p-6 max-w-4xl">
				<Card>
					<CardContent className="pt-6">
						<div className="flex items-center justify-center space-x-2">
							<Loader2 className="h-6 w-6 animate-spin" />
							<span>Chargement de la section...</span>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4 sm:p-6 max-w-4xl">
			<div className="space-y-6">
				{/* Form */}
				<Card className="shadow-lg border">
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl flex items-center gap-2">
							Formulaire d{""}
							{mode === "create" ? "e création" : "'édition"} d'une section
						</CardTitle>
						<CardDescription>
							Remplissez les informations ci-dessous pour{" "}
							{mode === "create" ? "créer" : "modifier"} votre section.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								{/* Nom de la section */}
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-foreground font-medium flex items-center gap-2">
												<FolderOpen className="h-4 w-4" />
												Nom de la section *
											</FormLabel>
											<FormControl>
												<Input
													placeholder="Ex: Football, Basketball, Tennis..."
													className="h-11"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Choisissez un nom clair et descriptif pour votre section
												sportive.
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
													placeholder="Décrivez cette section sportive, ses activités, ses spécificités..."
													className="min-h-[100px] resize-vertical"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Expliquez brièvement les activités et objectifs de cette
												section.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Couleur */}
								<FormField
									control={form.control}
									name="color"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-foreground font-medium flex items-center gap-2">
												<Palette className="h-4 w-4" />
												Couleur de la section
											</FormLabel>
											<FormControl>
												<ColorPicker
													value={field.value}
													onChange={field.onChange}
													className="h-11"
												/>
											</FormControl>
											<FormDescription>
												Choisissez une couleur pour identifier visuellement
												cette section dans l'interface.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Responsable de section */}
								<FormField
									control={form.control}
									name="managerId"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-foreground font-medium flex items-center gap-2">
												<User className="h-4 w-4" />
												Responsable de section
											</FormLabel>
											<Select
												value={field.value || "none"}
												onValueChange={(value) =>
													field.onChange(value === "none" ? "" : value)
												}
												disabled={isLoadingUsers}
											>
												<FormControl>
													<SelectTrigger className="h-11">
														<SelectValue placeholder="Sélectionner un responsable (optionnel)" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="none">
														Aucun responsable
													</SelectItem>
													{eligibleUsers.map((user: EligibleUser) => (
														<SelectItem key={user.id} value={user.id}>
															{user.firstName} {user.lastName} ({user.email})
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormDescription>
												Désignez un utilisateur comme responsable de cette
												section. Seuls les utilisateurs non-administrateurs
												peuvent être sélectionnés.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

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
												{mode === "create" ? "Créer la section" : "Sauvegarder"}
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

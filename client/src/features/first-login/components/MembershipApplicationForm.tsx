import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { ApplicationData } from "../first-login.config";

const applicationSchema = z.object({
	sectionIds: z
		.array(z.string())
		.min(1, "Veuillez sélectionner au moins une section"),
	categoryIds: z.array(z.string()).optional(),
	motivation: z
		.string()
		.min(5, "Veuillez fournir une motivation détaillée (minimum 5 caractères)"),
	emergencyContactName: z
		.string()
		.min(1, "Le nom du contact d'urgence est requis"),
	emergencyContactPhone: z
		.string()
		.min(10, "Un numéro de téléphone valide est requis"),
	medicalCertificateUrl: z.string().url().optional().or(z.literal("")),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface MembershipApplicationFormProps {
	onSubmit: (data: ApplicationData) => void;
	isLoading?: boolean;
	membershipOptions?: {
		sections: Array<{ id: string; name: string; description?: string }>;
		categories: Array<{
			id: string;
			name: string;
			sectionId: string;
			ageMin?: number;
			ageMax?: number;
		}>;
	};
	initialData?: {
		sectionIds?: string[];
		categoryIds?: string[];
		motivation?: string;
		emergencyContactName?: string;
		emergencyContactPhone?: string;
		medicalCertificateUrl?: string;
	};
}

export function MembershipApplicationForm({
	onSubmit,
	isLoading = false,
	membershipOptions,
	initialData,
}: MembershipApplicationFormProps) {
	const [selectedSections, setSelectedSections] = useState<string[]>(
		initialData?.sectionIds || [],
	);
	const [selectedCategories, setSelectedCategories] = useState<string[]>(
		initialData?.categoryIds || [],
	);
	const [isResetting, setIsResetting] = useState(false);

	const form = useForm<ApplicationFormData>({
		resolver: zodResolver(applicationSchema),
		defaultValues: {
			sectionIds: initialData?.sectionIds || [],
			categoryIds: initialData?.categoryIds || [],
			motivation: initialData?.motivation || "",
			emergencyContactName: initialData?.emergencyContactName || "",
			emergencyContactPhone: initialData?.emergencyContactPhone || "",
			medicalCertificateUrl: initialData?.medicalCertificateUrl || "",
		},
	});

	// Synchronize form state with selected sections and categories (only when not resetting)
	useEffect(() => {
		if (!isResetting) {
			form.setValue("sectionIds", selectedSections);
		}
	}, [selectedSections, form, isResetting]);

	useEffect(() => {
		if (!isResetting) {
			form.setValue("categoryIds", selectedCategories);
		}
	}, [selectedCategories, form, isResetting]);

	// Update selected sections and categories when initialData changes
	useEffect(() => {
		if (initialData) {
			setIsResetting(true);

			// Update local state first
			const newSections = initialData.sectionIds || [];
			const newCategories = initialData.categoryIds || [];
			setSelectedSections(newSections);
			setSelectedCategories(newCategories);

			// Reset form with new initial data
			form.reset({
				sectionIds: newSections,
				categoryIds: newCategories,
				motivation: initialData.motivation || "",
				emergencyContactName: initialData.emergencyContactName || "",
				emergencyContactPhone: initialData.emergencyContactPhone || "",
				medicalCertificateUrl: initialData.medicalCertificateUrl || "",
			});

			// Re-enable synchronization after a small delay
			setTimeout(() => {
				setIsResetting(false);
			}, 50);
		}
	}, [initialData, form]);

	const handleSubmit = (data: ApplicationFormData) => {
		onSubmit({
			...data,
			medicalCertificateUrl: data.medicalCertificateUrl || undefined,
		});
	};

	const handleSectionChange = (sectionId: string, checked: boolean) => {
		const newSelectedSections = checked
			? [...selectedSections, sectionId]
			: selectedSections.filter((id) => id !== sectionId);

		setSelectedSections(newSelectedSections);
		form.setValue("sectionIds", newSelectedSections);

		// Reset categories when sections change to avoid orphaned categories
		if (!checked) {
			const currentCategories = form.getValues("categoryIds") || [];
			const filteredCategories = currentCategories.filter((catId) => {
				const category = membershipOptions?.categories.find(
					(cat) => cat.id === catId,
				);
				return category && newSelectedSections.includes(category.sectionId);
			});
			form.setValue("categoryIds", filteredCategories);
			setSelectedCategories(filteredCategories);
		}

		// Trigger validation
		form.trigger("sectionIds");
	};

	const availableCategories =
		membershipOptions?.categories.filter((category) =>
			selectedSections.includes(category.sectionId),
		) || [];

	const handleCategoryChange = (categoryId: string, checked: boolean) => {
		const newSelectedCategories = checked
			? [...selectedCategories, categoryId]
			: selectedCategories.filter((id) => id !== categoryId);

		setSelectedCategories(newSelectedCategories);
		form.setValue("categoryIds", newSelectedCategories);
		// Trigger validation if needed
		form.trigger("categoryIds");
	};

	// Show loading state if no membership options are provided
	if (!membershipOptions) {
		return (
			<Card className="w-full max-w-4xl mx-auto">
				<CardContent className="flex items-center justify-center py-12">
					<div className="text-center">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
						<p>Chargement des options d'adhésion...</p>
					</div>
				</CardContent>
			</Card>
		);
	}

	// Show message if no sections are available
	if (!membershipOptions.sections || membershipOptions.sections.length === 0) {
		return (
			<Card className="w-full max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle>Aucune section disponible</CardTitle>
					<CardDescription>
						Il n'y a actuellement aucune section disponible pour l'adhésion.
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
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle>
					{initialData
						? "Modifier votre candidature d'adhésion"
						: "Candidature d'adhésion"}
				</CardTitle>
				<CardDescription>
					{initialData
						? "Modifiez les informations de votre candidature ci-dessous."
						: "Choisissez les sections et catégories qui vous intéressent et complétez votre candidature."}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
					<h4 className="font-medium text-blue-900 mb-2">
						Comment ça fonctionne ?
					</h4>
					<ul className="text-sm text-blue-800 space-y-1">
						<li>
							• Sélectionnez une ou plusieurs sections qui vous intéressent
						</li>
						<li>• Choisissez éventuellement des catégories spécifiques</li>
						<li>• Complétez votre motivation et vos informations de contact</li>
						<li>• Votre candidature sera examinée par nos équipes</li>
					</ul>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-6"
					>
						{/* Sections Selection */}
						<div className="space-y-4">
							<Label className="text-base font-medium">
								Sections d'intérêt *
							</Label>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{membershipOptions?.sections.map((section) => {
									const isChecked = selectedSections.includes(section.id);

									return (
										<Card key={section.id} className="p-4">
											<div className="flex items-start space-x-3">
												<Checkbox
													id={`section-${section.id}`}
													checked={isChecked}
													onCheckedChange={(checked) =>
														handleSectionChange(section.id, !!checked)
													}
												/>
												<div className="flex-1">
													<Label
														htmlFor={`section-${section.id}`}
														className="font-medium cursor-pointer"
													>
														{section.name}
													</Label>
													{section.description && (
														<p className="text-sm text-muted-foreground mt-1">
															{section.description}
														</p>
													)}
												</div>
											</div>
										</Card>
									);
								})}
							</div>
							<FormField
								control={form.control}
								name="sectionIds"
								render={() => (
									<FormItem>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Categories Selection */}
						{availableCategories.length > 0 && (
							<div className="space-y-4">
								<Label className="text-base font-medium">
									Catégories spécifiques
								</Label>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{availableCategories.map((category) => (
										<Card key={category.id} className="p-4">
											<div className="flex items-start space-x-3">
												<Checkbox
													id={`category-${category.id}`}
													checked={selectedCategories.includes(category.id)}
													onCheckedChange={(checked) =>
														handleCategoryChange(category.id, !!checked)
													}
												/>
												<div className="flex-1">
													<Label
														htmlFor={`category-${category.id}`}
														className="font-medium cursor-pointer"
													>
														{category.name}
													</Label>
													{(category.ageMin || category.ageMax) && (
														<p className="text-sm text-muted-foreground mt-1">
															Âge: {category.ageMin || "N/A"} -{" "}
															{category.ageMax || "N/A"} ans
														</p>
													)}
												</div>
											</div>
										</Card>
									))}
								</div>
							</div>
						)}

						{/* Motivation */}
						<FormField
							control={form.control}
							name="motivation"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Motivation *</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Expliquez pourquoi vous souhaitez rejoindre l'ASP Hub..."
											className="min-h-32"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Emergency Contact */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="emergencyContactName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Contact d'urgence - Nom *</FormLabel>
										<FormControl>
											<Input
												placeholder="Nom du contact d'urgence"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="emergencyContactPhone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Contact d'urgence - Téléphone *</FormLabel>
										<FormControl>
											<Input placeholder="0123456789" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Medical Certificate URL */}
						<FormField
							control={form.control}
							name="medicalCertificateUrl"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Certificat médical (URL)</FormLabel>
									<FormControl>
										<Input
											placeholder="https://example.com/certificate.pdf"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex justify-end space-x-4">
							<Button type="submit" disabled={isLoading} className="min-w-32">
								{isLoading
									? "Envoi..."
									: initialData
										? "Mettre à jour la candidature"
										: "Soumettre la candidature"}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

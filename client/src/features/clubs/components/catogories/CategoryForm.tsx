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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft, Calendar, Save, Users } from "lucide-react";
// client/src/features/clubs/components/CategoryForm.tsx
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import type { Category } from "../../types";

const schema = z
	.object({
		name: z.string().min(1, "Le nom est obligatoire"),
		description: z.string().optional(),
		ageMin: z.number().int().nonnegative().optional(),
		ageMax: z.number().int().nonnegative().optional(),
	})
	.refine(
		(data) => {
			if (data.ageMin !== undefined && data.ageMax !== undefined) {
				return data.ageMin <= data.ageMax;
			}
			return true;
		},
		{
			message: "L'âge minimum doit être inférieur ou égal à l'âge maximum",
			path: ["ageMax"],
		},
	);

export function CategoryForm({
	mode,
	clubId,
	sectionId,
	categoryId,
}: {
	mode: "create" | "edit";
	clubId: string;
	sectionId: string;
	categoryId?: string;
}) {
	const navigate = useNavigate();
	const [form, setForm] = useState<Partial<Category>>({});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (mode === "edit" && categoryId) {
			setIsLoading(true);
			fetch(
				`/api/clubs/${clubId}/sections/${sectionId}/categories/${categoryId}`,
			)
				.then((res) => res.json())
				.then(setForm)
				.finally(() => setIsLoading(false));
		}
	}, [mode, categoryId, clubId, sectionId]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrors({});
		setIsLoading(true);

		const parsed = schema.safeParse({
			...form,
			ageMin: form.ageMin ? Number(form.ageMin) : undefined,
			ageMax: form.ageMax ? Number(form.ageMax) : undefined,
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
			if (mode === "create") {
				await fetch(`/api/clubs/${clubId}/sections/${sectionId}/categories`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(parsed.data),
				});
			} else {
				await fetch(
					`/api/clubs/${clubId}/sections/${sectionId}/categories/${categoryId}`,
					{
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(parsed.data),
					},
				);
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

	return (
		<div className="container mx-auto p-6 max-w-2xl">
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
							{mode === "create"
								? "Créer une catégorie"
								: "Modifier la catégorie"}
						</h1>
						<p className="text-muted-foreground">
							{mode === "create"
								? "Ajoutez une nouvelle catégorie d'âge à votre section"
								: "Modifiez les informations de cette catégorie"}
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
							<Users className="h-5 w-5" />
							Informations de la catégorie
						</CardTitle>
						<CardDescription>
							Définissez les paramètres de votre catégorie d'âge
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
										onChange={(e) => setForm({ ...form, name: e.target.value })}
										className={errors.name ? "border-destructive" : ""}
									/>
									{errors.name && (
										<p className="text-sm text-destructive">{errors.name}</p>
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
											onChange={(e) =>
												setForm({
													...form,
													ageMin: e.target.value
														? Number(e.target.value)
														: undefined,
												})
											}
											className={errors.ageMin ? "border-destructive" : ""}
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
											onChange={(e) =>
												setForm({
													...form,
													ageMax: e.target.value
														? Number(e.target.value)
														: undefined,
												})
											}
											className={errors.ageMax ? "border-destructive" : ""}
										/>
										{errors.ageMax && (
											<p className="text-sm text-destructive">
												{errors.ageMax}
											</p>
										)}
									</div>
								</div>

								{form.ageMin !== undefined && form.ageMax !== undefined && (
									<div className="p-3 bg-muted rounded-lg">
										<p className="text-sm text-muted-foreground">
											Cette catégorie acceptera les participants âgés de{" "}
											<span className="font-medium text-foreground">
												{form.ageMin} à {form.ageMax} ans
											</span>
										</p>
									</div>
								)}
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

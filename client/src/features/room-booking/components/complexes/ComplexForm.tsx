import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { zodResolver } from "@hookform/resolvers/zod";
import {
	createComplexSchema,
	defaultOpenHours,
	frenchDays,
	updateComplexSchema,
	useComplexes,
} from "@room-booking/hooks/useComplexes.js";
import type {
	Complex,
	CreateComplexData,
	OpeningHours,
	UpdateComplexData,
} from "@room-booking/hooks/useComplexes.js";
import { Link } from "@tanstack/react-router";
import {
	Accessibility,
	Car,
	Info,
	Loader2,
	MapPin,
	Timer,
	Users,
	//@ts-ignore
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ComplexFormProps {
	complex?: Complex & { openingHours: OpeningHours };
	onSuccess?: (complex: Complex) => void;
	onCancelLink?: string;
}

export function ComplexForm({
	complex,
	onSuccess,
	onCancelLink,
}: ComplexFormProps) {
	const { createComplex, updateComplex } = useComplexes();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const isEditing = !!complex;

	const form = useForm<CreateComplexData | UpdateComplexData>({
		resolver: zodResolver(
			isEditing ? updateComplexSchema : createComplexSchema,
		),
		defaultValues: {
			name: complex?.name || "",
			description: complex?.description || "",
			street: complex?.street || "",
			city: complex?.city || "",
			postalCode: complex?.postalCode || "",
			numberOfElevators: complex?.numberOfElevators || 0,
			accessibleForReducedMobility:
				complex?.accessibleForReducedMobility || false,
			parkingCapacity: complex?.parkingCapacity || 0,
			openingHours: complex?.openingHours || defaultOpenHours,
		},
	});
	const openingHours = form.watch("openingHours");

	const onSubmit = async (data: CreateComplexData | UpdateComplexData) => {
		setIsSubmitting(true);

		try {
			let result: Complex | null = null;

			if (isEditing && complex) {
				result = await updateComplex(complex.id, data as UpdateComplexData);
			} else {
				result = await createComplex(data as CreateComplexData);
			}

			if (result) {
				onSuccess?.(result);
				if (!isEditing) {
					form.reset();
				}
			}
		} catch (error) {
			console.error("Form submission error:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					{isEditing ? "Formulaire d'édition" : "Formulaire de création"}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{/* Informations générales */}
						<div className="space-y-4">
							<div className="flex items-center gap-2 text-sm font-medium text-gray-700">
								<Info className="w-4 h-4" />
								Informations générales
							</div>

							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nom du complexe *</FormLabel>
										<FormControl>
											<Input
												placeholder="Ex: Complexe Nelson Mandela"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Le nom officiel du complexe sportif
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Input
												placeholder="Ex: Complexe polyvalent avec terrains de sport, salles de réunion, etc."
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Description détaillée du complexe
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Localisation */}
						<div className="space-y-4">
							<div className="flex items-center gap-2 text-sm font-medium text-gray-700">
								<MapPin className="w-4 h-4" />
								Localisation
							</div>

							<FormField
								control={form.control}
								name="street"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Adresse *</FormLabel>
										<FormControl>
											<Input
												placeholder="Ex: 42 Avenue des Sports"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Adresse complète du complexe
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="city"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Ville *</FormLabel>
											<FormControl>
												<Input
													placeholder="Ex: Pierrefitte-sur-Seine"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="postalCode"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Code postal *</FormLabel>
											<FormControl>
												<Input placeholder="Ex: 93380" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* Horaires d'ouverture */}
						<div className="space-y-4">
							<div className="flex items-center gap-2 text-sm font-medium">
								<Timer className="w-4 h-4" />
								Horaires d'ouverture
							</div>
							{openingHours &&
								Object.entries(frenchDays).map(([key, label]) => {
									const dayValue =
										openingHours[key as keyof typeof openingHours];
									if (!dayValue) return null;
									const isOpen = !dayValue.closed;
									return (
										<div
											key={key}
											className="flex items-center justify-between p-3 border rounded-lg"
										>
											<span className="w-20 font-medium">{label}</span>
											<div className="flex items-center gap-2 flex-1 mx-4">
												<Input
													type="time"
													disabled={!isOpen}
													value={dayValue.open || ""}
													onChange={(e) =>
														form.setValue(
															//@ts-ignore
															`openingHours.${key}.open`,
															e.target.value,
														)
													}
												/>
												<span>à</span>
												<Input
													type="time"
													disabled={!isOpen}
													value={dayValue.close || ""}
													onChange={(e) =>
														form.setValue(
															//@ts-ignore
															`openingHours.${key}.close`,
															e.target.value,
														)
													}
												/>
											</div>
											<Checkbox
												checked={isOpen}
												onCheckedChange={(checked) => {
													//@ts-ignore
													form.setValue(`openingHours.${key}.closed`, !checked);
													if (!checked) {
														//@ts-ignore
														form.setValue(`openingHours.${key}.open`, null);
														//@ts-ignore
														form.setValue(`openingHours.${key}.close`, null);
													}
												}}
											/>
										</div>
									);
								})}
							<p className="text-xs text-muted-foreground">
								Décochez un jour pour le marquer comme fermé.
							</p>
						</div>

						{/* Services et accessibilité */}
						<div className="space-y-4">
							<div className="flex items-center gap-2 text-sm font-medium text-gray-700">
								<Users className="w-4 h-4" />
								Services et accessibilité
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="numberOfElevators"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nombre d'ascenseurs</FormLabel>
											<FormControl>
												<div className="relative">
													<Accessibility className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
													<Input
														type="number"
														placeholder="Ex: 2"
														className="pl-10"
														min="0"
														max="20"
														{...field}
														onChange={(e) =>
															field.onChange(
																e.target.value ? Number(e.target.value) : 0,
															)
														}
													/>
												</div>
											</FormControl>
											<FormDescription>
												Nombre d'ascenseurs disponibles dans le complexe
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="parkingCapacity"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Capacité du parking</FormLabel>
											<FormControl>
												<div className="relative">
													<Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
													<Input
														type="number"
														placeholder="Ex: 100"
														className="pl-10"
														min="0"
														max="1000"
														{...field}
														onChange={(e) =>
															field.onChange(
																e.target.value ? Number(e.target.value) : 0,
															)
														}
													/>
												</div>
											</FormControl>
											<FormDescription>
												Nombre de places de parking disponibles
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="accessibleForReducedMobility"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel className="flex items-center gap-2">
												<Accessibility className="w-4 h-4" />
												Accessible aux personnes à mobilité réduite (PMR)
											</FormLabel>
											<FormDescription>
												Cochez cette case si le complexe est entièrement
												accessible aux personnes en situation de handicap
											</FormDescription>
										</div>
									</FormItem>
								)}
							/>
						</div>

						{/* Messages d'erreur globaux */}
						{form.formState.errors.root && (
							<Alert variant="destructive">
								<AlertDescription>
									{form.formState.errors.root.message}
								</AlertDescription>
							</Alert>
						)}

						{/* Actions */}
						<div className="flex items-center justify-end space-x-4 pt-6 border-t">
							{onCancelLink && (
								<Button variant="outline" asChild>
									<Link to={onCancelLink}>Annuler</Link>
								</Button>
							)}
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										{isEditing ? "Modification..." : "Création..."}
									</>
								) : isEditing ? (
									"Modifier le complexe"
								) : (
									"Créer le complexe"
								)}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

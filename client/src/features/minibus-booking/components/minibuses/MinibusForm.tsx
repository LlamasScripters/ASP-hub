/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
	type CreateMinibusData, 
	type UpdateMinibusData, 
	type Minibus,
	type Disponibility,
	frenchDays,
} from "@/features/minibus-booking/hooks/useMinibuses";
import { createMinibusSchema, updateMinibusSchema } from "@/features/minibus-booking/lib/api/minibuses";
import { useMinibuses } from "@/features/minibus-booking/hooks/useMinibuses";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
	Info, 
	Loader2, 
	Timer, 
	// @ts-ignore
} from "lucide-react";

interface MinibusFormProps {
	minibus?: Minibus;
	onSuccess?: (minibus: Minibus) => void;
	onCancelLink?: string;
	searchParams?: Record<string, unknown>;
	navigate?: (options: { search: Record<string, unknown> }) => void;
}

const defaultDisponibility: Disponibility = {
	monday: { open: null, close: null, available: false },
	tuesday: { open: null, close: null, available: false },
	wednesday: { open: "06:00", close: "20:00", available: true },
	thursday: { open: null, close: null, available: false },
	friday: { open: null, close: null, available: false },
	saturday: { open: "06:00", close: "20:00", available: true },
	sunday: { open: "06:00", close: "20:00", available: true },
};

export function MinibusForm({ minibus, onSuccess, onCancelLink, searchParams, navigate }: MinibusFormProps) {
	const { createMinibus, updateMinibus } = useMinibuses({ searchParams, navigate });
	const [isSubmitting, setIsSubmitting] = useState(false);

	const isEditing = !!minibus;

	const form = useForm<CreateMinibusData | UpdateMinibusData>({
		resolver: zodResolver(isEditing ? updateMinibusSchema : createMinibusSchema),
		defaultValues: {
			name: minibus?.name || "",
			description: minibus?.description || "",
			licensePlate: minibus?.licensePlate || "",
			capacity: minibus?.capacity || 8,
			disabledPersonCapacity: minibus?.disabledPersonCapacity || 0,
			disponibility: minibus?.disponibility || defaultDisponibility,
			isAvailable: minibus?.isAvailable ?? true,
		},
	});

	const disponibility = form.watch("disponibility");

	const onSubmit = async (data: CreateMinibusData | UpdateMinibusData) => {
		setIsSubmitting(true);

		try {
			let result: Minibus | null = null;

			if (isEditing && minibus) {
				result = await updateMinibus(minibus.id, data as UpdateMinibusData);
			} else {
				result = await createMinibus(data as CreateMinibusData);
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
							<div className="flex items-center gap-2">
								<Info className="w-4 h-4 text-muted-foreground" />
								<h3 className="text-lg font-medium">Informations générales</h3>
							</div>

							<div className="grid gap-4 md:grid-cols-2">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nom du minibus *</FormLabel>
											<FormControl>
												<Input placeholder="Ex: Minibus ASP 01" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="licensePlate"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Plaque d'immatriculation *</FormLabel>
											<FormControl>
												<Input placeholder="Ex: AB-123-CD" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Description du minibus..."
												rows={3}
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Description optionnelle du minibus (500 caractères maximum)
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="grid gap-4 md:grid-cols-3">
								<FormField
									control={form.control}
									name="capacity"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Capacité totale *</FormLabel>
											<FormControl>
												<Input
													type="number"
													min="1"
													{...field}
													onChange={(e) => field.onChange(Number(e.target.value))}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="disabledPersonCapacity"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Places PMR</FormLabel>
											<FormControl>
												<Input
													type="number"
													min="0"
													{...field}
													onChange={(e) => field.onChange(Number(e.target.value))}
												/>
											</FormControl>
											<FormDescription>
												Nombre de places pour personnes à mobilité réduite
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="isAvailable"
									render={({ field }) => (
										<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
											<div className="space-y-0.5">
												<FormLabel>Disponible</FormLabel>
												<FormDescription>
													Le minibus est-il disponible pour les réservations ?
												</FormDescription>
											</div>
											<FormControl>
												<Switch
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						</div>

						<Separator />

						{/* Disponibilités */}
						<div className="space-y-4">
							<div className="flex items-center gap-2">
								<Timer className="w-4 h-4 text-muted-foreground" />
								<h3 className="text-lg font-medium">Disponibilités</h3>
							</div>

							<div className="grid gap-4">
								{Object.entries(frenchDays).map(([dayKey, dayLabel]) => {
									const dayDisponibility = disponibility?.[dayKey as keyof Disponibility];
									
									return (
										<div key={dayKey} className="flex items-center gap-4 p-3 border rounded-lg">
											<div className="w-20 text-sm font-medium">
												{dayLabel}
											</div>
											
											<FormField
												control={form.control}
												name={`disponibility.${dayKey}.available` as Path<CreateMinibusData | UpdateMinibusData>}
												render={({ field }) => (
													<FormItem className="flex flex-row items-center space-x-2 space-y-0">
														<FormControl>
															<Checkbox
																checked={Boolean(field.value)}
																onCheckedChange={field.onChange}
															/>
														</FormControl>
														<FormLabel className="text-sm">Disponible</FormLabel>
													</FormItem>
												)}
											/>

											{dayDisponibility?.available && (
												<>
													<FormField
														control={form.control}
														name={`disponibility.${dayKey}.open` as Path<CreateMinibusData | UpdateMinibusData>}
														render={({ field }) => (
															<FormItem>
																<FormControl>
																	<Input
																		type="time"
																		{...field}
																		value={String(field.value || "")}
																		className="w-32"
																	/>
																</FormControl>
															</FormItem>
														)}
													/>
													
													<span className="text-sm text-muted-foreground">à</span>
													
													<FormField
														control={form.control}
														name={`disponibility.${dayKey}.close` as Path<CreateMinibusData | UpdateMinibusData>}
														render={({ field }) => (
															<FormItem>
																<FormControl>
																	<Input
																		type="time"
																		{...field}
																		value={String(field.value || "")}
																		className="w-32"
																	/>
																</FormControl>
															</FormItem>
														)}
													/>
												</>
											)}
										</div>
									);
								})}
							</div>
						</div>

						<Separator />

						{/* Actions */}
						<div className="flex items-center gap-2">
							{onCancelLink && (
								<Button type="button" variant="outline" asChild>
									<a href={onCancelLink}>Annuler</a>
								</Button>
							)}
							<Button 
								type="submit" 
								disabled={isSubmitting}
								className="flex-1"
							>
								{isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
								{isEditing ? "Modifier" : "Créer"}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

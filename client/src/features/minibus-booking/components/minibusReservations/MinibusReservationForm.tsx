import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useMinibusReservations } from "../../hooks/useMinibusReservations";
import type { 
	CreateMinibusReservationData, 
	UpdateMinibusReservationData,
	MinibusReservation 
} from "../../lib/api/minibusReservations";
import {
	createMinibusReservationSchema,
	updateMinibusReservationSchema,
} from "../../lib/api/minibusReservations";
import { minibusReservationStatusEnumTranslated } from "../../hooks/useMinibusReservations";
import type { Disponibility } from "../../lib/api/minibuses";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "@tanstack/react-router";
import { 
	ArrowLeft, 
	Loader2,
	Info,
	// @ts-ignore
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Route as AuthenticatedRoute } from "@/routes/_authenticated";

interface MinibusReservationFormProps {
	minibusId: string;
	minibusDisponibility: Disponibility;
	minibusReservation?: MinibusReservation;
	onSuccess?: (reservation: MinibusReservation) => void;
	onCancelLink?: string;
}

const daysOfWeek = [
	{ key: "monday", label: "Lundi" },
	{ key: "tuesday", label: "Mardi" },
	{ key: "wednesday", label: "Mercredi" },
	{ key: "thursday", label: "Jeudi" },
	{ key: "friday", label: "Vendredi" },
	{ key: "saturday", label: "Samedi" },
	{ key: "sunday", label: "Dimanche" },
];

export function MinibusReservationForm({
	minibusId,
	minibusDisponibility,
	minibusReservation,
	onSuccess,
	onCancelLink,
}: MinibusReservationFormProps) {
	const { user } = AuthenticatedRoute.useLoaderData();
	const { createMinibusReservation, updateMinibusReservation } = useMinibusReservations({ minibusId });
	const isEditing = Boolean(minibusReservation);

	const [formMode, setFormMode] = useState<"create" | "edit">(
		isEditing ? "edit" : "create",
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [globalError, setGlobalError] = useState<string | null>(null);
	const [validationError, setValidationError] = useState<string | null>(null);

	onCancelLink = onCancelLink || `/admin/assets/minibuses/${minibusId}`;

	const defaultValues = useMemo(
		() => ({
			title: minibusReservation?.title ?? "",
			startAt: minibusReservation 
				? minibusReservation.startAt instanceof Date 
					? minibusReservation.startAt 
					: new Date(minibusReservation.startAt)
				: new Date(),
			endAt: minibusReservation
				? minibusReservation.endAt instanceof Date
					? minibusReservation.endAt
					: new Date(minibusReservation.endAt)
				: new Date(Date.now() + 60 * 60 * 1000), // default +1h
			status: minibusReservation?.status ?? "pending",
		}),
		[minibusReservation],
	);

	const form = useForm<CreateMinibusReservationData | UpdateMinibusReservationData>({
		resolver: zodResolver(
			isEditing ? updateMinibusReservationSchema : createMinibusReservationSchema,
		),
		defaultValues: defaultValues,
	});

	const validateReservationTime = useCallback(
		(startAt: Date, endAt: Date): string | null => {
			const dayOfWeek = startAt.getDay();
			const dayKeys = [
				"sunday",
				"monday",
				"tuesday",
				"wednesday",
				"thursday",
				"friday",
				"saturday",
			];
			const dayKey = dayKeys[dayOfWeek] as keyof Disponibility;
			const dayDisponibility = minibusDisponibility[dayKey];
			
			if (!dayDisponibility || !dayDisponibility.available) {
				return `Le minibus n'est pas disponible le ${daysOfWeek.find(d => d.key === dayKey)?.label?.toLowerCase()}`;
			}

			const startHour = startAt.getHours();
			const startMinutes = startAt.getMinutes();
			const endHour = endAt.getHours();
			const endMinutes = endAt.getMinutes();

			const startTimeMinutes = startHour * 60 + startMinutes;
			const endTimeMinutes = endHour * 60 + endMinutes;

			if (dayDisponibility.open && dayDisponibility.close) {
				const [openHour, openMin] = dayDisponibility.open.split(":").map(Number);
				const [closeHour, closeMin] = dayDisponibility.close.split(":").map(Number);
				
				const openTimeMinutes = openHour * 60 + openMin;
				const closeTimeMinutes = closeHour * 60 + closeMin;

				if (startTimeMinutes < openTimeMinutes || endTimeMinutes > closeTimeMinutes) {
					return `Le créneau doit être entre ${dayDisponibility.open} et ${dayDisponibility.close}`;
				}
			}

			return null;
		},
		[minibusDisponibility],
	);

	const watchedStartAt = form.watch("startAt");
	const watchedEndAt = form.watch("endAt");

	useEffect(() => {
		if (watchedStartAt && watchedEndAt) {
			const error = validateReservationTime(watchedStartAt, watchedEndAt);
			setValidationError(error);
		}
	}, [watchedStartAt, watchedEndAt, validateReservationTime]);

	useEffect(() => {
		if (isEditing !== (formMode === "edit")) {
			setFormMode(isEditing ? "edit" : "create");
			form.reset(defaultValues);
		}
	}, [isEditing, formMode, form, defaultValues]);

	// const onSubmit = async (data: CreateMinibusReservationData | UpdateMinibusReservationData) => {
	// 	if (validationError) {
	// 		setGlobalError(validationError);
	// 		return;
	// 	}

	// 	setIsSubmitting(true);
	// 	setGlobalError(null);

	// 	try {
	// 		let result: MinibusReservation | null = null;

	// 		if (isEditing && minibusReservation) {
	// 			result = await updateMinibusReservation(
	// 				minibusReservation.id,
	// 				data as UpdateMinibusReservationData,
	// 			);
	// 		} else {
	// 			result = await createMinibusReservation({
	// 				...data,
	// 				minibusId,
	// 				bookerId: user.id,
	// 			} as CreateMinibusReservationData);
	// 		}

	// 		if (result) {
	// 			onSuccess?.(result);
	// 			if (!isEditing) {
	// 				form.reset();
	// 			}
	// 		}
	// 	} catch (error) {
	// 		console.error("Form submission error:", error);
	// 		setGlobalError(
	// 			error instanceof Error ? error.message : "Une erreur est survenue",
	// 		);
	// 	} finally {
	// 		setIsSubmitting(false);
	// 	}
	// };

	const formatDateTimeLocal = (date: Date | string): string => {
		if (!date) return "";
		const dateObj = date instanceof Date ? date : new Date(date);
		
		if (Number.isNaN(dateObj.getTime())) return "";
		
		const year = dateObj.getFullYear();
		const month = String(dateObj.getMonth() + 1).padStart(2, "0");
		const day = String(dateObj.getDate()).padStart(2, "0");
		const hours = String(dateObj.getHours()).padStart(2, "0");
		const minutes = String(dateObj.getMinutes()).padStart(2, "0");
		return `${year}-${month}-${day}T${hours}:${minutes}`;
	};

	const parseStringToDate = (str: string): Date => {
		return new Date(str);
	};

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Info className="w-5 h-5" />
					{isEditing ? "Modifier la réservation" : "Nouvelle réservation"}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={
						async (e) => {
							e.preventDefault();

							if (validationError) {
								setGlobalError(validationError);
								return;
							}

							setIsSubmitting(true);
							setGlobalError(null);

							try {
								const data = form.getValues();
								let result: MinibusReservation | null = null;

								if (isEditing && minibusReservation) {
									result = await updateMinibusReservation(
										minibusReservation.id,
										data as UpdateMinibusReservationData,
									);
								} else {
									result = await createMinibusReservation({
										...data,
										minibusId,
										bookerId: user.id,
									} as CreateMinibusReservationData);
								}

								if (result) {
									onSuccess?.(result);
									if (!isEditing) {
										form.reset();
									}
								}
							} catch (error) {
								console.error("Form submission error:", error);
								setGlobalError(
									error instanceof Error ? error.message : "Une erreur est survenue",
								);
							} finally {
								setIsSubmitting(false);
							}
						}
					} className="space-y-6">
						{globalError && (
							<div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
								{globalError}
							</div>
						)}

						{validationError && (
							<div className="p-3 text-sm text-orange-600 bg-orange-50 border border-orange-200 rounded-md">
								{validationError}
							</div>
						)}

						{/* Informations générales */}
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Titre de la réservation *</FormLabel>
										<FormControl>
											<Input 
												placeholder="Ex: Transport équipe foot"
												{...field} 
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="startAt"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Date et heure de début *</FormLabel>
											<FormControl>
												<Input
													type="datetime-local"
													{...field}
													value={field.value ? formatDateTimeLocal(field.value) : ""}
													onChange={(e) => field.onChange(parseStringToDate(e.target.value))}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="endAt"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Date et heure de fin *</FormLabel>
											<FormControl>
												<Input
													type="datetime-local"
													{...field}
													value={field.value ? formatDateTimeLocal(field.value) : ""}
													onChange={(e) => field.onChange(parseStringToDate(e.target.value))}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Statut</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Sélectionnez un statut" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.entries(minibusReservationStatusEnumTranslated).map(([key, label]) => (
													<SelectItem key={key} value={key}>
														{label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Separator />

						{/* Actions */}
						<div className="flex items-center justify-between pt-4">
							<Button variant="outline" asChild>
								<Link to={onCancelLink}>
									<ArrowLeft className="w-4 h-4 mr-2" />
									Annuler
								</Link>
							</Button>
							<Button 
								type="submit" 
								disabled={isSubmitting || !!validationError}
								className="min-w-[120px]"
							>
								{isSubmitting && (
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
								)}
								{isEditing ? "Modifier la réservation" : "Créer la réservation"}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

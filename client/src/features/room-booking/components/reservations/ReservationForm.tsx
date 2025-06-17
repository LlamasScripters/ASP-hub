import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { Route as AuthenticatedRoute } from "@/routes/_authenticated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReservations } from "@room-booking/hooks/useReservations";
import {
	type CreateReservationData,
	type Reservation,
	type UpdateReservationData,
	createReservationSchema,
	reservationStatusEnumTranslated,
	updateReservationSchema,
} from "@room-booking/hooks/useReservations";
import type { OpeningHours as RoomOpeningHours } from "@room-booking/hooks/useRooms";
import {
	parseLocalInputDateTime,
	toLocalInputDateTime,
} from "@room-booking/lib/api/reservations";
import { Link } from "@tanstack/react-router";
// @ts-ignore
import { Calendar as CalendarIcon, Clock, Info, Loader2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

interface ReservationFormProps {
	roomId: string;
	roomOpeningHours: RoomOpeningHours;
	reservation?: Reservation;
	onSuccess?: (r: Reservation) => void;
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

export function ReservationForm({
	roomId,
	roomOpeningHours,
	reservation,
	onSuccess,
	onCancelLink,
}: ReservationFormProps) {
	const { user } = AuthenticatedRoute.useLoaderData();
	const { createReservation, updateReservation } = useReservations({ roomId });
	const isEditing = Boolean(reservation);

	const [formMode, setFormMode] = useState<"create" | "edit">(
		isEditing ? "edit" : "create",
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [globalError, setGlobalError] = useState<string | null>(null);
	const [validationError, setValidationError] = useState<string | null>(null);

	onCancelLink = onCancelLink || `/admin/facilities/rooms/${roomId}`;

	const defaultValues = useMemo(
		() => ({
			title: reservation?.title ?? "",
			startAt: reservation ? reservation.startAt : new Date(),
			endAt: reservation
				? reservation.endAt
				: new Date(Date.now() + 60 * 60 * 1000), // default +1h
			status: reservation?.status ?? "pending",
		}),
		[reservation],
	);

	const form = useForm<CreateReservationData | UpdateReservationData>({
		resolver: zodResolver(
			isEditing ? updateReservationSchema : createReservationSchema,
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
			const dayKey = dayKeys[dayOfWeek] as keyof typeof roomOpeningHours;

			const daySchedule = roomOpeningHours[dayKey];

			if (!daySchedule || daySchedule.closed) {
				const dayName =
					daysOfWeek.find((d) => d.key === dayKey)?.label || "ce jour";
				return `La salle est fermée ${dayName.toLowerCase()}.`;
			}

			if (startAt.toDateString() !== endAt.toDateString()) {
				return "La réservation doit commencer et finir le même jour.";
			}

			const startMinutes = startAt.getHours() * 60 + startAt.getMinutes();
			const endMinutes = endAt.getHours() * 60 + endAt.getMinutes();

			const isValidTimeSlot = (() => {
				if (!daySchedule.open || !daySchedule.close) return false;

				const [openHour, openMinute] = daySchedule.open.split(":").map(Number);
				const [closeHour, closeMinute] = daySchedule.close
					.split(":")
					.map(Number);

				const openMinutes = openHour * 60 + openMinute;
				const closeMinutes = closeHour * 60 + closeMinute;

				return startMinutes >= openMinutes && endMinutes <= closeMinutes;
			})();

			if (!isValidTimeSlot) {
				const scheduleText =
					daySchedule.open && daySchedule.close
						? `${daySchedule.open} - ${daySchedule.close}`
						: "Non défini";
				const dayName =
					daysOfWeek.find((d) => d.key === dayKey)?.label || "ce jour";
				return `La réservation doit être comprise dans les horaires d'ouverture ${dayName.toLowerCase()} : ${scheduleText}.`;
			}

			return null;
		},
		[roomOpeningHours],
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
		if (formMode !== (isEditing ? "edit" : "create")) {
			setFormMode(isEditing ? "edit" : "create");
			form.reset(defaultValues);
		}
	}, [isEditing, formMode, form, defaultValues]);

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<CalendarIcon className="w-5 h-5 text-muted-foreground" />
					{isEditing ? "Modifier la réservation" : "Nouvelle réservation"}
				</CardTitle>
				<CardDescription>
					{isEditing
						? "Mettez à jour le créneau de réservation"
						: "Réservez un créneau pour cette salle"}
				</CardDescription>
			</CardHeader>
			<CardContent>
				{/* Affichage des horaires d'ouverture */}
				<div className="mb-6 p-4 bg-muted/50 rounded-lg">
					<div className="flex items-center gap-2 mb-3">
						<Clock className="w-4 h-4 text-muted-foreground" />
						<h3 className="font-medium text-sm">Horaires d'ouverture</h3>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
						{daysOfWeek.map((day) => {
							const schedule =
								roomOpeningHours[day.key as keyof typeof roomOpeningHours];
							return (
								<div key={day.key} className="flex justify-between">
									<span className="font-medium">{day.label} :</span>
									<span className="text-muted-foreground">
										{schedule &&
										!schedule.closed &&
										schedule.open &&
										schedule.close
											? `${schedule.open} - ${schedule.close}`
											: "Fermé"}
									</span>
								</div>
							);
						})}
					</div>
				</div>

				<Form {...form}>
					<form
						onSubmit={async (e) => {
							e.preventDefault();

							const startAt = form.getValues("startAt");
							const endAt = form.getValues("endAt");

							if (startAt && endAt) {
								const timeValidationError = validateReservationTime(
									startAt,
									endAt,
								);
								if (timeValidationError) {
									setValidationError(timeValidationError);
									return;
								}
							}

							setIsSubmitting(true);
							setGlobalError(null);
							setValidationError(null);

							try {
								let result: Reservation | null = null;

								if (isEditing && reservation) {
									const payload: UpdateReservationData = {
										title: form.getValues("title") ?? "",
										startAt: form.getValues("startAt") ?? new Date(),
										endAt: form.getValues("endAt") ?? new Date(),
										status: form.getValues("status") ?? "pending",
									};

									result = await updateReservation(reservation.id, payload);
								} else {
									if (!user?.id) {
										throw new Error("Utilisateur non authentifié");
									}

									const payload: CreateReservationData = {
										title: form.getValues("title") ?? "",
										startAt: form.getValues("startAt") ?? new Date(),
										endAt:
											form.getValues("endAt") ??
											new Date(Date.now() + 60 * 60 * 1000), // default +1h
										roomId,
										bookerId: user.id,
										status: form.getValues("status") ?? "pending",
									};

									result = await createReservation(payload);
								}

								if (result) {
									onSuccess?.(result);
									if (!isEditing) {
										form.reset(defaultValues);
									}
								}
							} catch (err) {
								let message = "Erreur inattendue";
								if (err instanceof Error) {
									message = err.message;
								}
								setGlobalError(message);
							} finally {
								setIsSubmitting(false);
							}
						}}
						className="space-y-6"
					>
						{/* TITRE */}
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Titre *</FormLabel>
									<FormControl>
										<Input
											placeholder="Ex : Entraînement football"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Nom du créneau ou de l'événement
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* HORAIRES */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="startAt"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Date de début *</FormLabel>
										<FormControl>
											<Input
												type="datetime-local"
												value={
													field.value ? toLocalInputDateTime(field.value) : ""
												}
												onChange={(e) => {
													const date = parseLocalInputDateTime(e.target.value);
													field.onChange(date);
												}}
												min={toLocalInputDateTime(new Date())}
											/>
										</FormControl>
										<FormDescription>
											Sélecteur de date et heure de début
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="endAt"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Date de fin *</FormLabel>
										<FormControl>
											<Input
												type="datetime-local"
												value={
													field.value ? toLocalInputDateTime(field.value) : ""
												}
												onChange={(e) => {
													const date = parseLocalInputDateTime(e.target.value);
													field.onChange(date);
												}}
												min={toLocalInputDateTime(new Date())}
											/>
										</FormControl>
										<FormDescription>
											Sélecteur de date et heure de fin
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* STATUT */}
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Statut</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger>
												<SelectValue placeholder="Sélectionner un statut" />
											</SelectTrigger>
											<SelectContent>
												{Object.entries(reservationStatusEnumTranslated).map(
													([value, label]) => (
														<SelectItem key={value} value={value}>
															{label}
														</SelectItem>
													),
												)}
											</SelectContent>
										</Select>
									</FormControl>
									<FormDescription>
										Sélectionnez le statut de la réservation
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* ERREUR DE VALIDATION DES HORAIRES */}
						{validationError && (
							<Alert variant="destructive">
								<Info className="h-4 w-4" />
								<AlertDescription>{validationError}</AlertDescription>
							</Alert>
						)}

						{/* ERREUR GLOBALE */}
						{globalError && (
							<Alert variant="destructive">
								<AlertDescription>{globalError}</AlertDescription>
							</Alert>
						)}

						{/* ACTIONS */}
						<div className="flex items-center justify-end pt-4 border-t space-x-4">
							{onCancelLink && (
								<Button variant="outline" asChild>
									<Link to={onCancelLink}>Annuler</Link>
								</Button>
							)}
							<Button
								type="submit"
								disabled={isSubmitting || !!validationError}
							>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										{isEditing ? "Enregistrement..." : "Création..."}
									</>
								) : isEditing ? (
									"Modifier la réservation"
								) : (
									"Créer la réservation"
								)}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

import { useState, useEffect, useMemo } from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useReservations } from "@room-booking/hooks/useReservations";
import {
	createReservationSchema,
	updateReservationSchema,
	type Reservation,
	type CreateReservationData,
	type UpdateReservationData,
} from "@room-booking/hooks/useReservations";
import {
	toLocalInputDateTime,
	parseLocalInputDateTime,
} from "@room-booking/lib/api/reservations";
import { Route as AuthenticatedRoute } from "@/routes/_authenticated";
import { Link } from "@tanstack/react-router";
// @ts-ignore
import { Info, Calendar as CalendarIcon, Loader2 } from "lucide-react";

interface ReservationFormProps {
	roomId: string;
	reservation?: Reservation;
	onSuccess?: (r: Reservation) => void;
	onCancelLink?: string;
}

const reservationStatusEnumTranslated = {
	pending: "En attente",
	confirmed: "Confirmée",
	cancelled: "Annulée",
	completed: "Terminée",
	no_show: "Non présentée",
	rescheduled: "Reportée",
};

export function ReservationForm({
	roomId,
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

	useEffect(() => {
		if (formMode !== (isEditing ? "edit" : "create")) {
			setFormMode(isEditing ? "edit" : "create");
			form.reset(defaultValues);
		}
	}, [isEditing, formMode, form, defaultValues]);

	const onSubmit = async ( data: CreateReservationData | UpdateReservationData,) => {
		setIsSubmitting(true);
		setGlobalError(null);

		try {
			let result: Reservation | null = null;

			if (isEditing && reservation) {
				const payload: UpdateReservationData = {
					title: data.title ?? "",
					startAt: data.startAt ?? new Date(),
					endAt: data.endAt ?? new Date(),
					status: data.status ?? "pending",
				};

				result = await updateReservation(reservation.id, payload);
			} else {
				if (!user?.id) {
					throw new Error("Utilisateur non authentifié");
				}

				const payload: CreateReservationData = {
					title: data.title ?? "",
					startAt: data.startAt ?? new Date(),
					endAt: data.endAt ?? new Date(Date.now() + 60 * 60 * 1000), // default +1h
					roomId,
					bookerId: user.id,
					status: data.status ?? "pending",
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
	};

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
				<Form {...form}>
					<form onSubmit={async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            setGlobalError(null);

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
                      endAt: form.getValues("endAt") ?? new Date(Date.now() + 60 * 60 * 1000), // default +1h
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
                  }}
            } className="space-y-6">
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
										Nom du créneau ou de l’événement
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

						{/* ERREUR GLOBALE */}
						{globalError && (
							<Alert variant="destructive">
								<AlertDescription>{globalError}</AlertDescription>
							</Alert>
						)}

						{/* ACTIONS */}
						<div className="flex items-center justify-end pt-4 border-t space-x-4">
							{onCancelLink && (
								<Button variant="outline" size="sm" asChild>
									<Link to={onCancelLink}>
										<span>Annuler</span>
									</Link>
								</Button>
							)}
							<Button type="submit" disabled={isSubmitting}>
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

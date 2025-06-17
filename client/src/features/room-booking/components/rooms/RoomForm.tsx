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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import type { OpeningHours as ComplexOpeningHours } from "@room-booking/hooks/useComplexes";
import { useRooms } from "@room-booking/hooks/useRooms";
import {
	createRoomSchema,
	frenchDays,
	updateRoomSchema,
} from "@room-booking/hooks/useRooms";
import type {
	CreateRoomData,
	Room,
	UpdateRoomData,
} from "@room-booking/hooks/useRooms";
import { Link } from "@tanstack/react-router";
import {
	Info,
	Loader2,
	Settings,
	Timer,
	Warehouse,
	//@ts-ignore
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const sportTypes = [
	"Football",
	"Basketball",
	"Tennis",
	"Volleyball",
	"Handball",
	"Badminton",
	"Natation",
	"Gymnastique",
	"Judo",
	"Karaté",
	"Danse",
	"Fitness",
	"Musculation",
	"Escalade",
	"Ping-pong",
	"Squash",
	"Boxe",
	"Yoga",
	"Pilates",
	"Autre",
];

interface RoomFormProps {
	complexId: string;
	complexOpeningHours: ComplexOpeningHours;
	room?: Room;
	onSuccess?: (room: Room) => void;
	onCancelLink?: string;
}

export function RoomForm({
	complexId,
	complexOpeningHours,
	room,
	onSuccess,
	onCancelLink,
}: RoomFormProps) {
	const { createRoom, updateRoom } = useRooms({ complexId });
	const [isSubmitting, setIsSubmitting] = useState(false);

	const isEditing = !!room;

	const form = useForm<CreateRoomData | UpdateRoomData>({
		resolver: zodResolver(isEditing ? updateRoomSchema : createRoomSchema),
		defaultValues: {
			name: room?.name || "",
			complexId: complexId,
			description: room?.description || "",
			sportType: room?.sportType || "",
			openingHours: room?.openingHours || complexOpeningHours,
			isIndoor: room?.isIndoor ?? true,
			accreditation: room?.accreditation || "",
			capacity: room?.capacity || 1,
		},
	});

	const openingHours = form.watch("openingHours");

	const onSubmit = async (data: CreateRoomData | UpdateRoomData) => {
		setIsSubmitting(true);

		try {
			let result: Room | null = null;

			if (isEditing && room) {
				result = await updateRoom(room.id, data as UpdateRoomData);
			} else {
				result = await createRoom({ ...data, complexId } as CreateRoomData);
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
					Formulaire d'édition
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
										<FormLabel>Nom de la salle *</FormLabel>
										<FormControl>
											<Input
												placeholder="Ex: Salle de sport principale"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Le nom de la salle ou de l'espace
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
											<Textarea
												placeholder="Ex: Salle équipée de machines de musculation, espace cardio..."
												className="min-h-[80px]"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Description détaillée de la salle
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="sportType"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Type de sport *</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Sélectionnez un sport" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{sportTypes.map((sport) => (
													<SelectItem key={sport} value={sport}>
														{sport}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>
											Sport principal pratiqué dans cette salle
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
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

									const complexDay =
										complexOpeningHours[
											key as keyof typeof complexOpeningHours
										];
									const isComplexOpen = complexDay && !complexDay.closed;

									// Si le complexe est fermé ce jour, fermer automatiquement la salle
									if (!isComplexOpen) {
										// Mettre à jour la valeur pour que la salle soit fermée
										if (!dayValue.closed) {
											//@ts-ignore
											form.setValue(
												`openingHours.${key}.closed` as const,
												true,
											);
											//@ts-ignore
											form.setValue(`openingHours.${key}.open` as const, null);
											//@ts-ignore
											form.setValue(`openingHours.${key}.close` as const, null);
										}

										return (
											<div
												key={key}
												className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
											>
												<span className="w-20 font-medium text-gray-500">
													{label}
												</span>
												<div className="flex items-center gap-2 flex-1 mx-4">
													<span className="text-sm text-muted-foreground italic">
														Le complexe est fermé ce jour
													</span>
												</div>
											</div>
										);
									}

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
													min={complexDay.open || undefined}
													max={complexDay.close || undefined}
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
													min={complexDay.open || undefined}
													max={complexDay.close || undefined}
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

						{/* Configuration */}
						<div className="space-y-4">
							<div className="flex items-center gap-2 text-sm font-medium text-gray-700">
								<Settings className="w-4 h-4" />
								Configuration
							</div>

							<FormField
								control={form.control}
								name="isIndoor"
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
												<Warehouse className="w-4 h-4" />
												Salle intérieure
											</FormLabel>
											<FormDescription>
												Cochez cette case si la salle est couverte/intérieure.
												Décochez pour un terrain extérieur.
											</FormDescription>
										</div>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="accreditation"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Accréditation</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Ex: Homologuée FFT, Norme FIFA, Certification FFA..."
												className="min-h-[80px]"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Certifications, homologations ou accréditations
											officielles de cette salle
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="capacity"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Capacité *</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="Ex: 30"
												{...field}
												onChange={(e) =>
													field.onChange(
														e.target.value ? Number(e.target.value) : 1,
													)
												}
											/>
										</FormControl>
										<FormDescription>
											Nombre maximum de personnes pouvant utiliser la salle
										</FormDescription>
										<FormMessage />
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
									"Modifier la salle"
								) : (
									"Créer la salle"
								)}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

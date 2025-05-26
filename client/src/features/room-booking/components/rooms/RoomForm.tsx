import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { useRooms } from "@room-booking/hooks/useRooms";
import {
	createRoomSchema,
	updateRoomSchema,
} from "@room-booking/hooks/useRooms";
import type {
	CreateRoomData,
	Room,
	UpdateRoomData,
} from "@room-booking/hooks/useRooms";
// @ts-ignore
import { Building, Info, Loader2, Settings, Users } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const roomTypes = [
	{ value: "gym", label: "Gymnase" },
	{ value: "pool", label: "Piscine" },
	{ value: "court", label: "Court" },
	{ value: "field", label: "Terrain" },
	{ value: "studio", label: "Studio" },
	{ value: "meeting", label: "Salle de réunion" },
	{ value: "other", label: "Autre" },
];

interface RoomFormProps {
	complexId: string;
	room?: Room;
	onSuccess?: (room: Room) => void;
	onCancel?: () => void;
}

export function RoomForm({
	complexId,
	room,
	onSuccess,
	onCancel,
}: RoomFormProps) {
	const { createRoom, updateRoom } = useRooms({ complexId });
	const [isSubmitting, setIsSubmitting] = useState(false);

	const isEditing = !!room;

	const form = useForm<CreateRoomData | UpdateRoomData>({
		resolver: zodResolver(isEditing ? updateRoomSchema : createRoomSchema),
		defaultValues: {
			name: room?.name || "",
			complexId: complexId,
			capacity: room?.capacity || undefined,
			type: room?.type || undefined,
			equipment: room?.equipment || "",
			isActive: room?.isActive ?? true,
		},
	});

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
					<Building className="w-5 h-5" />
					{isEditing ? "Modifier la salle" : "Nouvelle salle"}
				</CardTitle>
				<CardDescription>
					{isEditing
						? "Modifiez les informations de la salle"
						: "Ajoutez une nouvelle salle au complexe"}
				</CardDescription>
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

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="type"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Type de salle</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Sélectionnez un type" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{roomTypes.map((type) => (
														<SelectItem key={type.value} value={type.value}>
															{type.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormDescription>
												Type d'espace ou d'activité
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
											<FormLabel>Capacité</FormLabel>
											<FormControl>
												<div className="relative">
													<Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
													<Input
														type="number"
														placeholder="Ex: 50"
														className="pl-10"
														min="1"
														max="1000"
														{...field}
														onChange={(e) =>
															field.onChange(
																e.target.value
																	? Number(e.target.value)
																	: undefined,
															)
														}
													/>
												</div>
											</FormControl>
											<FormDescription>
												Nombre maximum de personnes
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* Équipements */}
						<div className="space-y-4">
							<div className="flex items-center gap-2 text-sm font-medium text-gray-700">
								<Settings className="w-4 h-4" />
								Équipements et configuration
							</div>

							<FormField
								control={form.control}
								name="equipment"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Équipements disponibles</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Ex: Matériel de sport, système audio, éclairage LED..."
												className="min-h-[80px]"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Listez les équipements et matériels disponibles dans cette
											salle
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="isActive"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel>Salle active</FormLabel>
											<FormDescription>
												Décochez cette case pour désactiver temporairement cette
												salle (maintenance, rénovation, etc.)
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
							{onCancel && (
								<Button
									type="button"
									variant="outline"
									onClick={onCancel}
									disabled={isSubmitting}
								>
									Annuler
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

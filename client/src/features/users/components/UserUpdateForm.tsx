import { ImageUploadButton } from "@/components/ImageUploadButton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { type UserLoggedIn, authClient } from "@/lib/auth/auth-client";
import { queryClient } from "@/lib/react-query";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, LaptopIcon, MoonIcon, SunIcon } from "lucide-react";
import { TZDate } from "react-day-picker";
import { type FieldErrors, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { getLoggedInUserQueryOptions } from "../users.config";
import { usersService } from "../users.service";

const formSchema = z.object({
	firstName: z
		.string()
		.min(2, "Le prénom doit contenir au moins 2 caractères")
		.optional(),
	lastName: z
		.string()
		.min(2, "Le nom doit contenir au moins 2 caractères")
		.optional(),
	dateOfBirth: z.coerce.date().optional(),
	civility: z.enum(["monsieur", "madame", "mademoiselle", "autre"]).optional(),
	phone: z
		.string()
		.regex(
			/^(\d{10}|)$/,
			"Le numéro de téléphone doit contenir exactement 10 chiffres",
		)
		.optional()
		.or(z.literal("")),
	height: z.coerce
		.number()
		.min(50, "La taille doit être supérieure à 50 cm")
		.max(250, "La taille doit être inférieure à 250 cm")
		.optional()
		.or(z.literal("")),
	weight: z.coerce
		.number()
		.min(20, "Le poids doit être supérieur à 20 kg")
		.max(300, "Le poids doit être inférieur à 300 kg")
		.optional()
		.or(z.literal("")),
	licenseNumber: z.string().optional(),
	newsletterSubscription: z.boolean().optional(),
	theme: z.enum(["light", "dark", "auto"]).optional(),
	image: z.union([z.string(), z.instanceof(File)]).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface UserUpdateFormProps {
	user: UserLoggedIn;
}

export default function UserUpdateForm({ user }: UserUpdateFormProps) {
	const defaultValues = {
		firstName: user.firstName ?? undefined,
		lastName: user.lastName ?? undefined,
		dateOfBirth: user.dateOfBirth ?? undefined,
		civility: user.civility as "monsieur" | "madame" | "mademoiselle" | "autre",
		phone: user.phone ?? undefined,
		height: user.height ?? undefined,
		weight: user.weight ?? undefined,
		licenseNumber: user.licenseNumber ?? undefined,
		newsletterSubscription:
			(user.preferences as { newsletter?: { enabled: boolean } } | null)
				?.newsletter?.enabled ?? false,
		theme:
			(
				user.preferences as {
					accessibility?: { theme: "light" | "dark" | "auto" };
				} | null
			)?.accessibility?.theme ?? "auto",
		image: user.image ?? undefined,
	};

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	const uploadUserAvatarMutation = useMutation({
		mutationFn: (file: File) => usersService.uploadUserAvatar(user.id, file),
	});

	const updateUserMutation = useMutation({
		mutationFn: async (values: FormValues) => {
			let imageUrl: string | undefined;

			try {
				if (values.image && typeof values.image !== "string") {
					imageUrl = await uploadUserAvatarMutation.mutateAsync(values.image);
				}
			} catch (error) {
				throw new Error("Une erreur est survenue lors de l'upload de l'image");
			}

			const { data } = await authClient.updateUser({
				firstName: values.firstName ?? undefined,
				lastName: values.lastName ?? undefined,
				dateOfBirth: values.dateOfBirth
					? new Date(values.dateOfBirth)
					: undefined,
				civility: values.civility ?? undefined,
				phone: values.phone ?? undefined,
				height: values.height ? Number(values.height) : undefined,
				weight: values.weight ? Number(values.weight) : undefined,
				licenseNumber: values.licenseNumber ?? undefined,
				preferences: JSON.stringify(
					(() => {
						const currentPrefs = user.preferences
							? typeof user.preferences === "string"
								? JSON.parse(user.preferences)
								: user.preferences
							: {};

						return {
							...currentPrefs,
							newsletter: {
								enabled: values.newsletterSubscription ?? false,
							},
							accessibility: {
								...(currentPrefs.accessibility || {}),
								theme: values.theme ?? "auto",
							},
						};
					})(),
				),
				image: imageUrl,
			});

			if (!data?.status) {
				throw new Error(
					"Une erreur est survenue lors de la mise à jour de l'utilisateur",
				);
			}
		},
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries(getLoggedInUserQueryOptions()),
				queryClient.invalidateQueries({
					queryKey: ["user", user.id, "accounts"],
				}),
			]);

			toast.success("Profil mis à jour avec succès !");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const onSubmit = (values: FormValues) => {
		updateUserMutation.mutate(values);
	};

	const onInvalidSubmit = (errors: FieldErrors<FormValues>) => {
		console.error(errors);
		const firstError = Object.values(errors)[0];
		toast.error(
			firstError?.message ?? "Une erreur est survenue, veuillez réessayer.",
		);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit, onInvalidSubmit)}
				className="space-y-4"
			>
				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Prénom</FormLabel>
							<FormControl>
								<Input placeholder="Prénom" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nom</FormLabel>
							<FormControl>
								<Input placeholder="Nom" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="dateOfBirth"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel htmlFor="dateOfBirth">Date de naissance</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className={cn(
											"w-[240px]",
											!field.value && "text-muted-foreground",
										)}
									>
										<CalendarIcon />
										{field.value ? (
											format(field.value, "P", { locale: fr })
										) : (
											<span>Choisir une date</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent
									className="w-auto overflow-hidden p-0"
									align="start"
								>
									<Calendar
										mode="single"
										captionLayout="dropdown"
										selected={field.value ?? undefined}
										onSelect={(date) => {
											if (date) {
												const dateInParis = new TZDate(date, "Europe/Paris");
												console.log(dateInParis.toUTCString());
												field.onChange(dateInParis);
												return;
											}
											field.onChange(undefined);
										}}
										defaultMonth={defaultValues.dateOfBirth}
										hideNavigation={false}
										locale={fr}
										timeZone="UTC"
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="civility"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Civilité</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Sélectionner une civilité" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="monsieur">Monsieur</SelectItem>
									<SelectItem value="madame">Madame</SelectItem>
									<SelectItem value="mademoiselle">Mademoiselle</SelectItem>
									<SelectItem value="autre">Autre</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Téléphone</FormLabel>
							<FormControl>
								<Input
									placeholder="Ex: 0123456789"
									{...field}
									maxLength={10}
									onChange={(e) => {
										const value = e.target.value.replace(/\D/g, "");
										field.onChange(value);
									}}
									onKeyDown={(e) => {
										if (
											!/\d/.test(e.key) &&
											![
												"Backspace",
												"Delete",
												"Tab",
												"Enter",
												"ArrowLeft",
												"ArrowRight",
											].includes(e.key)
										) {
											e.preventDefault();
										}
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="height"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Taille (cm)</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="Ex: 175"
										{...field}
										onChange={(e) =>
											field.onChange(
												e.target.value ? Number(e.target.value) : "",
											)
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="weight"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Poids (kg)</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="Ex: 70"
										{...field}
										onChange={(e) =>
											field.onChange(
												e.target.value ? Number(e.target.value) : "",
											)
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="licenseNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Numéro de licence</FormLabel>
							<FormControl>
								<Input placeholder="Ex: ABC123456" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="newsletterSubscription"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>S'abonner à la newsletter</FormLabel>
								<FormDescription>
									Recevoir les actualités et informations de l'association par
									email
								</FormDescription>
							</div>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="theme"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Thème d'affichage</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Sélectionner un thème" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="light">
										<div className="flex items-center gap-2">
											<SunIcon className="h-4 w-4" />
											<span>Clair</span>
										</div>
									</SelectItem>
									<SelectItem value="dark">
										<div className="flex items-center gap-2">
											<MoonIcon className="h-4 w-4" />
											<span>Sombre</span>
										</div>
									</SelectItem>
									<SelectItem value="auto">
										<div className="flex items-center gap-2">
											<LaptopIcon className="h-4 w-4" />
											<span>Automatique</span>
										</div>
									</SelectItem>
								</SelectContent>
							</Select>
							<FormDescription>
								Choisissez votre thème préféré. Le thème automatique s'adapte
								aux paramètres de votre système.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Photo de profil</FormLabel>
							<FormControl>
								<ImageUploadButton
									currentImage={user.image ?? undefined}
									onUploadSuccess={field.onChange}
									onUploadError={() => {
										form.setError("image", {
											message:
												"Une erreur est survenue lors de l'upload de l'image",
										});
									}}
									isUploading={uploadUserAvatarMutation.isPending}
									isErrorUpload={uploadUserAvatarMutation.isError}
									userId={user.id}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{form.formState.errors.root && (
					<div className="text-sm font-medium text-destructive">
						{form.formState.errors.root.message}
					</div>
				)}

				<Button type="submit" disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting
						? "Enregistrement..."
						: "Enregistrer les modifications"}
				</Button>
			</form>
		</Form>
	);
}

import { ImageUploadButton } from "@/components/ImageUploadButton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Form,
	FormControl,
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
import { type UserLoggedIn, authClient } from "@/lib/auth/auth-client";
import { queryClient } from "@/lib/react-query";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
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
				image: imageUrl,
			});

			if (!data?.status) {
				throw new Error(
					"Une erreur est survenue lors de la mise à jour de l'utilisateur",
				);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries(getLoggedInUserQueryOptions());
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const handleUploadSuccess = (file: File) => {
		uploadUserAvatarMutation.mutate(file);
	};

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
										variant={"outline"}
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

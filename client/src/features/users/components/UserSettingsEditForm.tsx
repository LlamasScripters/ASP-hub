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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { type FieldErrors, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

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
	image: z.string().url("L'URL de l'image est invalide").optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface UserSettingsEditFormProps {
	user: UserLoggedIn;
}

export function UserSettingsEditForm({ user }: UserSettingsEditFormProps) {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: user.firstName ?? undefined,
			lastName: user.lastName ?? undefined,
			dateOfBirth: user.dateOfBirth ?? undefined,
			image: user.image ?? undefined,
		},
	});

	const updateUserMutation = useMutation({
		mutationFn: async (values: FormValues) => {
			await authClient.updateUser({
				firstName: values.firstName ?? undefined,
				lastName: values.lastName ?? undefined,
				dateOfBirth: values.dateOfBirth
					? new Date(values.dateOfBirth)
					: undefined,
				image: values.image ?? undefined,
			});
		},
	});

	const onSubmit = (values: FormValues) => {
		updateUserMutation.mutate(values);
	};

	const onInvalidSubmit = (errors: FieldErrors<FormValues>) => {
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
							<FormLabel>Date de naissance</FormLabel>
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
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value ?? undefined}
										onSelect={field.onChange}
										hideNavigation={false}
										locale={fr}
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
									currentImage={field.value}
									onImageUpload={field.onChange}
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

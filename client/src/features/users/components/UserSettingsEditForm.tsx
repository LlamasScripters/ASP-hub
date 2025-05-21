import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { ImageUploadButton } from "@/components/ImageUploadButton";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const formSchema = z.object({
	firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
	lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
	email: z.string().email("Adresse email invalide"),
	dateOfBirth: z.coerce.date(),
	image: z.string().url("L'URL de l'image est invalide").nullish(),
});

type FormValues = z.infer<typeof formSchema>;

interface UserSettingsEditFormProps {
	initialData: {
		firstName: string;
		lastName: string;
		email: string;
		dateOfBirth?: Date;
		image?: string | null;
	};
	onSuccess?: () => void;
}

export function UserSettingsEditForm({
	initialData,
	onSuccess,
}: UserSettingsEditFormProps) {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: initialData.firstName,
			lastName: initialData.lastName,
			email: initialData.email,
			dateOfBirth: initialData.dateOfBirth,
			image: initialData.image ?? null,
		},
	});

	const onSubmit = async (values: FormValues) => {
		setIsLoading(true);

		try {
			// TODO: Implement update user settings API call
			// const { error } = await authClient.updateUser({
			//   ...values,
			// });

			// if (error) {
			//   form.setError("root", { message: error.message });
			//   return;
			// }

			onSuccess?.();
		} catch (err) {
			form.setError("root", {
				message: "Une erreur inattendue s'est produite",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" placeholder="Adresse email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="dateOfBirth"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Date de naissance</FormLabel>
							<FormControl>
								<Input
									type="date"
									{...field}
									value={field.value.toISOString().split("T")[0]}
								/>
							</FormControl>
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

				<Button type="submit" disabled={isLoading}>
					{isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
				</Button>
			</form>
		</Form>
	);
}

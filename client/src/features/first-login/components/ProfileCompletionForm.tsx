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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { ProfileData } from "../first-login.config";

const profileSchema = z.object({
	firstName: z.string().min(1, "Le prénom est requis"),
	lastName: z.string().min(1, "Le nom est requis"),
	dateOfBirth: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, "Format de date invalide (YYYY-MM-DD)"),
	civility: z.enum(["monsieur", "madame", "mademoiselle", "autre"]),
	phone: z.string().min(10, "Un numéro de téléphone valide est requis"),
	height: z.number().int().min(100).max(250).optional(),
	weight: z.number().int().min(30).max(200).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileCompletionFormProps {
	onSubmit: (data: ProfileData) => void;
	isLoading?: boolean;
	initialData?: Partial<ProfileData>;
}

export function ProfileCompletionForm({
	onSubmit,
	isLoading = false,
	initialData = {},
}: ProfileCompletionFormProps) {
	const form = useForm<ProfileFormData>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			firstName: initialData.firstName || "",
			lastName: initialData.lastName || "",
			dateOfBirth: initialData.dateOfBirth || "",
			civility: initialData.civility || "monsieur",
			phone: initialData.phone || "",
			height: initialData.height,
			weight: initialData.weight,
		},
	});

	const handleSubmit = (data: ProfileFormData) => {
		onSubmit(data);
	};

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle>Complétion de votre profil</CardTitle>
				<CardDescription>
					Veuillez compléter votre profil pour continuer votre inscription à
					l'ASP Hub.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-6"
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Prénom *</FormLabel>
										<FormControl>
											<Input placeholder="Votre prénom" {...field} />
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
										<FormLabel>Nom *</FormLabel>
										<FormControl>
											<Input placeholder="Votre nom" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="civility"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Civilité *</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Sélectionnez votre civilité" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="monsieur">Monsieur</SelectItem>
												<SelectItem value="madame">Madame</SelectItem>
												<SelectItem value="mademoiselle">
													Mademoiselle
												</SelectItem>
												<SelectItem value="autre">Autre</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="dateOfBirth"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Date de naissance *</FormLabel>
										<FormControl>
											<Input type="date" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Téléphone *</FormLabel>
									<FormControl>
										<Input placeholder="0123456789" {...field} />
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
												placeholder="170"
												{...field}
												onChange={(e) =>
													field.onChange(
														e.target.value ? Number(e.target.value) : undefined,
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
												placeholder="70"
												{...field}
												onChange={(e) =>
													field.onChange(
														e.target.value ? Number(e.target.value) : undefined,
													)
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="flex justify-end space-x-4">
							<Button type="submit" disabled={isLoading} className="min-w-32">
								{isLoading ? "Sauvegarde..." : "Continuer"}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

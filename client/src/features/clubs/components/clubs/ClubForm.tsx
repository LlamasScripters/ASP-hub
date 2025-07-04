import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import {
	AlertCircle,
	ArrowLeft,
	Building2,
	Captions,
	CheckCircle,
	FileText,
	Globe,
	Loader2,
	Mail,
	MapPin,
	Phone,
	Save,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import { Textarea } from "@/components/ui/textarea";
import type { Club } from "../../types";

const clubSchema = z.object({
	name: z
		.string()
		.min(1, "Le nom du club est requis")
		.max(255, "Le nom ne peut pas dépasser 255 caractères"),
	description: z.string().optional(),
	address: z.string().optional(),
	email: z
		.string()
		.email("Adresse email invalide")
		.optional()
		.or(z.literal("")),
	phone: z
		.string()
		.optional()
		.refine((val) => !val || /^0[0-9]{9}$/.test(val), {
			message:
				"Veuillez mettre un numéro de téléphone valide (10 chiffres commençant par 0)",
		}),
	website: z
		.string()
		.url("L'URL du site web est invalide")
		.optional()
		.or(z.literal("")),
});

type ClubFormData = z.infer<typeof clubSchema>;

export function ClubForm({
	mode,
	clubId,
}: { mode: "create" | "edit"; clubId?: string }) {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [showSuccessAlert, setShowSuccessAlert] = useState(false);
	const [initialClub, setInitialClub] = useState<Club | null>(null);

	const form = useForm<ClubFormData>({
		resolver: zodResolver(clubSchema),
		defaultValues: {
			name: "",
			description: "",
			address: "",
			email: "",
			phone: "",
			website: "",
		},
	});

	useEffect(() => {
		if (mode === "edit" && clubId) {
			setIsLoading(true);
			fetch(`/api/clubs/${clubId}`)
				.then((res) => {
					if (!res.ok) throw new Error("Erreur lors du chargement du club");
					return res.json();
				})
				.then((club: Club) => {
					setInitialClub(club);
					form.reset({
						name: club.name || "",
						description: club.description || "",
						address: club.address || "",
						email: club.email || "",
						phone: club.phone || "",
						website: club.website || "",
					});
				})
				.catch((error) => {
					console.error("Erreur:", error);
					toast.error("Erreur lors du chargement du club");
				})
				.finally(() => setIsLoading(false));
		}
	}, [mode, clubId, form]);

	const onSubmit = async (data: ClubFormData) => {
		setIsLoading(true);
		try {
			const cleanData = {
				...data,
				email: data.email || undefined,
				phone: data.phone || undefined,
				website: data.website || undefined,
				description: data.description || undefined,
				address: data.address || undefined,
			};

			const url = mode === "create" ? "/api/clubs" : `/api/clubs/${clubId}`;
			const method = mode === "create" ? "POST" : "PUT";

			const response = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(cleanData),
			});

			if (!response.ok) {
				throw new Error("Erreur lors de la sauvegarde");
			}

			if (mode === "edit") {
				setShowSuccessAlert(true);
				setTimeout(() => {
					setShowSuccessAlert(false);
				}, 3000);
				setTimeout(() => {
					navigate({ to: "..", replace: true });
				}, 1500);
			} else {
				toast.success("Club créé avec succès !");
				navigate({ to: "..", replace: true });
			}
		} catch (error) {
			console.error("Erreur:", error);
			toast.error("Une erreur est survenue lors de la sauvegarde");
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancel = () => {
		navigate({ to: "..", replace: true });
	};

	const fmt = (iso: string) =>
		new Date(iso).toLocaleDateString("fr-FR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});

	if (isLoading && mode === "edit") {
		return (
			<div className="space-y-6">
				<Card>
					<CardContent className="pt-6">
						<div className="flex items-center justify-center space-x-2">
							<Loader2 className="h-6 w-6 animate-spin" />
							<span>Chargement du club...</span>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* En-tête */}
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						{mode === "create" ? "Créer un club" : "Modifier le club"}
					</h1>
					<p className="text-muted-foreground">
						{mode === "create"
							? "Remplissez les informations ci-dessous pour créer votre club"
							: `Modifiez les informations du club "${initialClub?.name || ""}"`}
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm" asChild>
						<Link to="..">
							<ArrowLeft className="w-4 h-4 mr-2" />
							Retour
						</Link>
					</Button>
				</div>
			</div>

			{/* Message de succès */}
			{showSuccessAlert && (
				<Alert className="border-green-200 bg-green-50">
					<CheckCircle className="h-4 w-4 text-green-600" />
					<AlertDescription className="text-green-800">
						Le club a été modifié avec succès ! Redirection en cours...
					</AlertDescription>
				</Alert>
			)}

			{/* Informations du club actuel (mode édition) */}
			{mode === "edit" && initialClub && (
				<Card className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
							<Building2 className="w-5 h-5" />
							Informations actuelles
						</CardTitle>
						<CardDescription className="text-green-700 dark:text-green-300">
							Voici les informations actuellement enregistrées pour ce club
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
							<div>
								<span className="font-medium text-green-900 dark:text-green-100">
									Nom :
								</span>
								<span className="ml-2 text-green-800 dark:text-green-200">
									{initialClub.name}
								</span>
							</div>
							{initialClub.email && (
								<div>
									<span className="font-medium text-green-900 dark:text-green-100">
										Email :
									</span>
									<span className="ml-2 text-green-800 dark:text-green-200">
										{initialClub.email}
									</span>
								</div>
							)}
							{initialClub.phone && (
								<div>
									<span className="font-medium text-green-900 dark:text-green-100">
										Téléphone :
									</span>
									<span className="ml-2 text-green-800 dark:text-green-200">
										{initialClub.phone}
									</span>
								</div>
							)}
							{initialClub.website && (
								<div>
									<span className="font-medium text-green-900 dark:text-green-100">
										Site web :
									</span>
									<span className="ml-2 text-green-800 dark:text-green-200">
										{initialClub.website}
									</span>
								</div>
							)}
							{initialClub.updatedAt && (
								<div>
									<span className="font-medium text-green-900 dark:text-green-100">
										Dernière modification :
									</span>
									<span className="ml-2 text-green-800 dark:text-green-200">
										{fmt(initialClub.updatedAt)}
									</span>
								</div>
							)}
						</div>
						{initialClub.description && (
							<div className="mt-4">
								<span className="font-medium text-green-900 dark:text-green-100">
									Description :
								</span>
								<p className="ml-2 text-green-800 dark:text-green-200 mt-1">
									{initialClub.description}
								</p>
							</div>
						)}
						{initialClub.address && (
							<div>
								<span className="font-medium text-green-900 dark:text-green-100">
									Adresse :
								</span>
								<p className="ml-2 text-green-800 dark:text-green-200 mt-1">
									{initialClub.address}
								</p>
							</div>
						)}
					</CardContent>
				</Card>
			)}

			{/* Avertissement (mode édition) */}
			{mode === "edit" && (
				<Alert>
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>
						<strong>Important :</strong> Les modifications apportées à ce club
						affecteront toutes les données associées. Assurez-vous que les
						informations sont correctes avant de sauvegarder.
					</AlertDescription>
				</Alert>
			)}

			{/* Formulaire */}
			<Card className="shadow-lg border">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl flex items-center gap-2">
						Formulaire d{""}
						{mode === "create" ? "e création" : "'édition"} de club
					</CardTitle>
					<CardDescription>
						Remplissez les informations ci-dessous pour{" "}
						{mode === "create" ? "créer" : "modifier"} votre club.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							{/* Nom du club */}
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground font-medium flex items-center gap-2">
											<Captions className="h-4 w-4" />
											Nom du club *
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Ex: Club Sportif Municipal, Association de Football..."
												className="h-11"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Le nom officiel de votre club ou association sportive.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Description */}
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground font-medium flex items-center gap-2">
											<FileText className="h-4 w-4" />
											Description
										</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Décrivez votre club, ses activités, ses valeurs..."
												className="min-h-[100px] resize-vertical"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Une description de votre club, ses activités et ses
											objectifs.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Adresse */}
							<FormField
								control={form.control}
								name="address"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground font-medium flex items-center gap-2">
											<MapPin className="h-4 w-4" />
											Adresse
										</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Adresse complète du club ou lieu principal d'activité..."
												className="min-h-[80px] resize-vertical"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											L'adresse physique de votre club ou de votre lieu
											principal d'activité.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Coordonnées */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Email */}
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-foreground font-medium flex items-center gap-2">
												<Mail className="h-4 w-4" />
												Email
											</FormLabel>
											<FormControl>
												<Input
													type="email"
													placeholder="contact@monclub.fr"
													className="h-11"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Adresse email de contact du club.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Téléphone */}
								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-foreground font-medium flex items-center gap-2">
												<Phone className="h-4 w-4" />
												Téléphone
											</FormLabel>
											<FormControl>
												<Input
													type="tel"
													placeholder="0123456789"
													className="h-11"
													maxLength={10}
													{...field}
													onPaste={(e) => {
														e.preventDefault();
														const pastedText = e.clipboardData.getData("text");
														const cleanedPhone = pastedText.replace(/\D/g, "");
														const limitedPhone = cleanedPhone.slice(0, 10);
														field.onChange(limitedPhone);
													}}
													onChange={(e) => {
														const value = e.target.value.replace(/\D/g, "");
														field.onChange(value);
													}}
												/>
											</FormControl>
											<FormDescription>
												Numéro de téléphone à 10 chiffres (sans espaces ni
												tirets).
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Site web */}
							<FormField
								control={form.control}
								name="website"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground font-medium flex items-center gap-2">
											<Globe className="h-4 w-4" />
											Site web
										</FormLabel>
										<FormControl>
											<Input
												type="url"
												placeholder="https://www.monclub.fr"
												className="h-11"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											URL du site web officiel de votre club.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Actions */}
							<div className="flex flex-col sm:flex-row gap-3 pt-6">
								<Button
									type="submit"
									disabled={isLoading}
									className="flex items-center gap-2 flex-1 sm:flex-none hover:bg-primary/90 transition-colors cursor-pointer"
								>
									{isLoading ? (
										<>
											<Loader2 className="h-4 w-4 animate-spin" />
											{mode === "create" ? "Création..." : "Modification..."}
										</>
									) : (
										<>
											<Save className="h-4 w-4" />
											{mode === "create" ? "Créer le club" : "Sauvegarder"}
										</>
									)}
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={handleCancel}
									disabled={isLoading}
									className="flex items-center gap-2 hover:bg-muted transition-colors cursor-pointer"
								>
									<ArrowLeft className="h-4 w-4" />
									Annuler
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}

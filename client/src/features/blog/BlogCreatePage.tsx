import { Badge } from "@/components/ui/badge";
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
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { getLoggedInUserQueryOptions } from "@/features/users/users.config";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Check, Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SimpleEditor } from "./components/simple-editor";
import {
	type CreateBlogData,
	type Tag,
	useCreateBlog,
	useTags,
} from "./hooks/useBlogQueries.ts";

type ArticleState = "draft" | "published" | "archived";

export default function BlogCreatePage() {
	const [title, setTitle] = useState("");
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [state, setState] = useState<ArticleState>("draft");
	const [content, setContent] = useState("");
	const [commentsEnabled, setCommentsEnabled] = useState(true);
	const [headerImage, setHeaderImage] = useState("");
	const [tagSearchOpen, setTagSearchOpen] = useState(false);
	const [newTagName, setNewTagName] = useState("");

	const navigate = useNavigate();
	const createBlogMutation = useCreateBlog();
	const { data: availableTags = [], isLoading: tagsLoading } = useTags();

	// Récupérer l'utilisateur connecté
	const { data: currentUser } = useQuery(getLoggedInUserQueryOptions());

	const addTag = (tag: Tag) => {
		if (!selectedTags.find((t) => t.id === tag.id)) {
			setSelectedTags([...selectedTags, tag]);
		}
		setTagSearchOpen(false);
	};

	const removeTag = (tagId: number) => {
		setSelectedTags(selectedTags.filter((tag) => tag.id !== tagId));
	};

	const createNewTag = () => {
		if (
			newTagName.trim() &&
			!availableTags.find(
				(tag) => tag.name.toLowerCase() === newTagName.trim().toLowerCase(),
			)
		) {
			// Créer un tag temporaire avec un ID négatif pour le distinguer des vrais tags
			const tempTag: Tag = {
				id: -Date.now(), // ID temporaire négatif
				name: newTagName.trim(),
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				deletedAt: null,
			};
			addTag(tempTag);
			setNewTagName("");
			setTagSearchOpen(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validation basique
		if (!title.trim() || !content.trim()) {
			toast.error("Le titre et le contenu sont obligatoires");
			return;
		}

		if (!currentUser) {
			toast.error("Vous devez être connecté pour créer un article");
			return;
		}

		// Convertir les tags sélectionnés en array de noms
		const tagArray = selectedTags.map((tag) => tag.name);

		const blogData: CreateBlogData = {
			title: title.trim(),
			content,
			headerImage: headerImage.trim() || undefined,
			state,
			authorId: currentUser.id,
			tags: tagArray,
			commentsEnabled,
		};

		try {
			await createBlogMutation.mutateAsync(blogData);
			navigate({ to: "/admin/blog" });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="container mx-auto p-4 sm:p-6 max-w-4xl">
			<Card>
				<CardHeader>
					<CardTitle>Créer un article</CardTitle>
					<CardDescription>
						Remplissez les champs pour ajouter un nouvel article de blog
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-4">
								<div>
									<Label htmlFor="title">Titre *</Label>
									<Input
										id="title"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										required
										placeholder="Titre de l'article"
										className="mt-1"
									/>
								</div>

								<div>
									<Label htmlFor="headerImage">Image d'en-tête (URL)</Label>
									<Input
										id="headerImage"
										value={headerImage}
										onChange={(e) => setHeaderImage(e.target.value)}
										placeholder="https://example.com/image.jpg"
										className="mt-1"
									/>
								</div>

								<div>
									<Label htmlFor="tags">Tags</Label>
									<div className="mt-1 space-y-2">
										{/* Tags sélectionnés */}
										{selectedTags.length > 0 && (
											<div className="flex flex-wrap gap-1">
												{selectedTags.map((tag) => (
													<Badge
														key={tag.id}
														variant="secondary"
														className="text-xs"
													>
														#{tag.name}
														<Button
															type="button"
															size="sm"
															variant="ghost"
															className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
															onClick={() => removeTag(tag.id)}
														>
															<X className="h-3 w-3" />
														</Button>
													</Badge>
												))}
											</div>
										)}

										{/* Sélecteur de tags */}
										<Popover
											open={tagSearchOpen}
											onOpenChange={setTagSearchOpen}
										>
											<PopoverTrigger asChild>
												<Button
													type="button"
													variant="outline"
													size="sm"
													className="h-8 justify-start"
													disabled={tagsLoading}
												>
													<Plus className="h-4 w-4 mr-2" />
													Ajouter un tag
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-80 p-0" align="start">
												<Command>
													<CommandInput
														placeholder="Rechercher ou créer un tag..."
														value={newTagName}
														onValueChange={setNewTagName}
													/>
													<CommandList>
														{availableTags.filter(
															(tag) =>
																!selectedTags.find(
																	(selected) => selected.id === tag.id,
																) &&
																tag.name
																	.toLowerCase()
																	.includes(newTagName.toLowerCase()),
														).length === 0 && newTagName.trim() === "" ? (
															<CommandEmpty>Aucun tag trouvé.</CommandEmpty>
														) : (
															<CommandGroup>
																{availableTags
																	.filter(
																		(tag) =>
																			!selectedTags.find(
																				(selected) => selected.id === tag.id,
																			) &&
																			tag.name
																				.toLowerCase()
																				.includes(newTagName.toLowerCase()),
																	)
																	.map((tag) => (
																		<CommandItem
																			key={tag.id}
																			onSelect={() => addTag(tag)}
																		>
																			<Check className="mr-2 h-4 w-4 opacity-0" />
																			#{tag.name}
																		</CommandItem>
																	))}

																{newTagName.trim() &&
																	!availableTags.find(
																		(tag) =>
																			tag.name.toLowerCase() ===
																			newTagName.trim().toLowerCase(),
																	) && (
																		<CommandItem onSelect={createNewTag}>
																			<Plus className="mr-2 h-4 w-4" />
																			Créer "{newTagName.trim()}"
																		</CommandItem>
																	)}
															</CommandGroup>
														)}
													</CommandList>
												</Command>
											</PopoverContent>
										</Popover>
									</div>
									<p className="text-xs text-muted-foreground mt-1">
										Sélectionnez des tags existants ou créez-en de nouveaux
									</p>
								</div>
							</div>

							<div className="space-y-4">
								<div>
									<Label htmlFor="state">État de publication</Label>
									<Select
										value={state}
										onValueChange={(value: ArticleState) => setState(value)}
									>
										<SelectTrigger id="state" className="mt-1">
											<SelectValue placeholder="Choisir l'état" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="draft">
												<div className="flex items-center gap-2">
													<div className="w-2 h-2 rounded-full bg-gray-400" />
													Brouillon
												</div>
											</SelectItem>
											<SelectItem value="published">
												<div className="flex items-center gap-2">
													<div className="w-2 h-2 rounded-full bg-green-500" />
													Publié
												</div>
											</SelectItem>
											<SelectItem value="archived">
												<div className="flex items-center gap-2">
													<div className="w-2 h-2 rounded-full bg-yellow-500" />
													Archivé
												</div>
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="flex items-center space-x-2">
									<Checkbox
										id="comments"
										checked={commentsEnabled}
										onCheckedChange={(checked) =>
											setCommentsEnabled(checked as boolean)
										}
									/>
									<Label htmlFor="comments" className="text-sm">
										Autoriser les commentaires sur cet article
									</Label>
								</div>

								<div className="p-4 bg-muted/50 rounded-lg">
									<h4 className="text-sm font-medium mb-2">
										Aperçu des paramètres
									</h4>
									<div className="text-xs space-y-1 text-muted-foreground">
										<p>
											Auteur:{" "}
											<span className="font-medium">
												{currentUser
													? `${currentUser.firstName} ${currentUser.lastName}`
													: "Non connecté"}
											</span>
										</p>
										<p>
											État:{" "}
											<span className="font-medium">
												{state === "draft"
													? "Brouillon"
													: state === "published"
														? "Publié"
														: "Archivé"}
											</span>
										</p>
										<p>
											Commentaires:{" "}
											<span className="font-medium">
												{commentsEnabled ? "Activés" : "Désactivés"}
											</span>
										</p>
										<p>
											Tags:{" "}
											<span className="font-medium">
												{selectedTags.length > 0
													? selectedTags.map((tag) => tag.name).join(", ")
													: "Aucun"}
											</span>
										</p>
									</div>
								</div>
							</div>
						</div>

						<div>
							<Label className="text-base font-medium">
								Contenu de l'article *
							</Label>
							<p className="text-sm text-muted-foreground mb-3">
								Utilisez l'éditeur pour formatter votre contenu avec du texte
								enrichi
							</p>
							<div className="border rounded-lg overflow-hidden">
								<SimpleEditor value={content} onChange={setContent} />
							</div>
						</div>

						<div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
							<Button
								type="button"
								variant="outline"
								onClick={() => navigate({ to: "/admin/blog" })}
								className="flex-1 sm:flex-none"
								disabled={createBlogMutation.isPending}
							>
								Annuler
							</Button>
							<Button
								type="submit"
								disabled={
									createBlogMutation.isPending ||
									!title.trim() ||
									!content.trim() ||
									!currentUser
								}
								className="flex-1"
							>
								{createBlogMutation.isPending ? (
									<>
										<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
										Création en cours...
									</>
								) : !currentUser ? (
									"Connectez-vous pour créer un article"
								) : (
									"Créer l'article"
								)}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

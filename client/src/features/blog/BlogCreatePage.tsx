import { SimpleEditor } from "@/components/templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useState } from "react";
import { toast } from "sonner";
import { type CreateBlogData, useCreateBlog } from "./hooks/useBlogQueries.ts";

type ArticleState = "draft" | "published" | "archived";

export default function BlogCreatePage() {
	const [title, setTitle] = useState("");
	const [tags, setTags] = useState("");
	const [state, setState] = useState<ArticleState>("draft");
	const [content, setContent] = useState("");
	const [commentsEnabled, setCommentsEnabled] = useState(true);
	const [headerImage, setHeaderImage] = useState("");

	const navigate = useNavigate();
	const createBlogMutation = useCreateBlog();

	// Récupérer l'utilisateur connecté
	const { data: currentUser } = useQuery(getLoggedInUserQueryOptions());

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

		// Convertir les tags en array
		const tagArray = tags
			.split(",")
			.map((tag) => tag.trim())
			.filter((tag) => tag.length > 0);

		const blogData: CreateBlogData = {
			title: title.trim(),
			content,
			headerImage: headerImage.trim() || undefined,
			state,
			authorId: currentUser.id,
			tags: tagArray.length > 0 ? tagArray : undefined,
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
									<Label htmlFor="tags">Tags (séparés par des virgules)</Label>
									<Input
										id="tags"
										value={tags}
										onChange={(e) => setTags(e.target.value)}
										placeholder="ex: sport, club, info"
										className="mt-1"
									/>
									<p className="text-xs text-muted-foreground mt-1">
										Les tags seront créés automatiquement s'ils n'existent pas
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
											<span className="font-medium">{tags || "Aucun"}</span>
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

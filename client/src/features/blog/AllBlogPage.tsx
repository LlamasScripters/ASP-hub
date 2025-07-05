import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import {
	Calendar,
	Edit,
	Eye,
	FileText,
	Plus,
	Search,
	Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { type Blog, useBlogs, useDeleteBlog } from "./hooks/useBlogQueries.ts";

interface AllBlogPageProps {
	blogs?: Blog[]; // Pour compatibilité avec le router loader
}

export function AllBlogPage({ blogs: initialBlogs }: AllBlogPageProps) {
	const [deleteBlog, setDeleteBlog] = useState<Blog | null>(null);
	const [searchTerm, setSearchTerm] = useState("");

	// Utiliser TanStack Query pour gérer l'état
	const { data: queryBlogs, isLoading, error } = useBlogs();
	const deleteBlogMutation = useDeleteBlog();

	// Utiliser les blogs du query si disponibles, sinon les blogs initiaux
	const allBlogs = queryBlogs || initialBlogs || [];

	// Filtrer les blogs en fonction du terme de recherche
	const blogs = useMemo(() => {
		if (!searchTerm.trim()) return allBlogs;

		const term = searchTerm.toLowerCase();
		return allBlogs.filter(
			(blog) =>
				blog.title.toLowerCase().includes(term) ||
				blog.content.toLowerCase().includes(term) ||
				blog.tags?.some((tag) => tag.name.toLowerCase().includes(term)),
		);
	}, [allBlogs, searchTerm]);

	const handleDelete = async () => {
		if (!deleteBlog) return;

		try {
			await deleteBlogMutation.mutateAsync(deleteBlog.id);
			setDeleteBlog(null);
		} catch (error) {
			// L'erreur est déjà gérée dans le hook
			console.error(error);
		}
	};

	const getStateBadge = (state: string) => {
		switch (state) {
			case "published":
				return (
					<Badge className="bg-green-500 hover:bg-green-600">Publié</Badge>
				);
			case "draft":
				return <Badge variant="outline">Brouillon</Badge>;
			case "archived":
				return <Badge variant="secondary">Archivé</Badge>;
			default:
				return null;
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("fr-FR", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const stripHtml = (html: string) => {
		const temp = document.createElement("div");
		temp.innerHTML = html;
		return temp.textContent || temp.innerText || "";
	};

	if (error) {
		return (
			<div className="container mx-auto p-4 space-y-6">
				<Card>
					<CardContent className="p-12 text-center">
						<div className="text-red-500 text-5xl mb-4">⚠️</div>
						<h3 className="text-xl font-semibold mb-2">Erreur de chargement</h3>
						<p className="text-muted-foreground mb-4">
							Impossible de charger les articles de blog.
						</p>
						<Button onClick={() => window.location.reload()}>Réessayer</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (isLoading && !initialBlogs) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
					<p className="text-muted-foreground">Chargement des articles...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4 sm:p-6 space-y-8 max-w-7xl">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold flex items-center gap-2">
						<FileText className="h-8 w-8 text-primary" />
						Articles de blog
					</h1>
					<p className="text-muted-foreground mt-1">
						Gérez tous vos articles de blog depuis cette interface
					</p>
				</div>
				<Link to="/admin/blog/create">
					<Button size="lg" className="gap-2">
						<Plus className="h-5 w-5" />
						Créer un article
					</Button>
				</Link>
			</div>

			{/* Barre de recherche */}
			<Card>
				<CardContent className="p-6">
					<div className="relative w-full">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
						<Input
							type="text"
							placeholder="Rechercher un article..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10 w-full"
						/>
					</div>
					{searchTerm && (
						<p className="text-sm text-muted-foreground mt-2">
							{blogs.length} article{blogs.length > 1 ? "s" : ""} trouvé
							{blogs.length > 1 ? "s" : ""} pour "{searchTerm}"
						</p>
					)}
				</CardContent>
			</Card>

			{/* Stats rapides */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Card>
					<CardContent className="p-4">
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 rounded-full bg-green-500" />
							<span className="text-sm text-muted-foreground">Publiés</span>
						</div>
						<p className="text-2xl font-bold mt-1">
							{allBlogs.filter((b) => b.state === "published").length}
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 rounded-full bg-gray-400" />
							<span className="text-sm text-muted-foreground">Brouillons</span>
						</div>
						<p className="text-2xl font-bold mt-1">
							{allBlogs.filter((b) => b.state === "draft").length}
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 rounded-full bg-yellow-500" />
							<span className="text-sm text-muted-foreground">Archivés</span>
						</div>
						<p className="text-2xl font-bold mt-1">
							{allBlogs.filter((b) => b.state === "archived").length}
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="flex items-center gap-2">
							<FileText className="w-4 h-4 text-muted-foreground" />
							<span className="text-sm text-muted-foreground">Total</span>
						</div>
						<p className="text-2xl font-bold mt-1">{allBlogs.length}</p>
					</CardContent>
				</Card>
			</div>

			{/* Liste des articles */}
			{blogs.length === 0 ? (
				<Card>
					<CardContent className="p-12 text-center">
						<FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
						<h3 className="text-xl font-semibold mb-2">Aucun article</h3>
						<p className="text-muted-foreground mb-6 max-w-md mx-auto">
							Commencez par créer votre premier article de blog pour partager
							vos actualités avec votre communauté.
						</p>
						<Link to="/admin/blog/create">
							<Button size="lg" className="gap-2">
								<Plus className="h-5 w-5" />
								Créer un article
							</Button>
						</Link>
					</CardContent>
				</Card>
			) : (
				<Card>
					<CardContent className="p-0">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b bg-muted/50">
										<th className="text-left p-4 font-medium">Titre</th>
										<th className="text-left p-4 font-medium">Auteur</th>
										<th className="text-left p-4 font-medium">État</th>
										<th className="text-left p-4 font-medium">Date</th>
										<th className="text-left p-4 font-medium">Tags</th>
										<th className="text-left p-4 font-medium">Commentaires</th>
										<th className="text-right p-4 font-medium">Actions</th>
									</tr>
								</thead>
								<tbody>
									{blogs.map((blog) => (
										<tr
											key={blog.id}
											className="border-b hover:bg-muted/20 transition-colors"
										>
											<td className="p-4">
												<div>
													<p className="font-medium line-clamp-1">
														{blog.title}
													</p>
													<p className="text-sm text-muted-foreground line-clamp-1">
														{stripHtml(blog.content).substring(0, 80)}...
													</p>
												</div>
											</td>
											<td className="p-4">
												<div className="flex items-center gap-2">
													{blog.author?.image && (
														<img
															src={blog.author.image}
															alt={`${blog.author.firstName} ${blog.author.lastName}`}
															className="w-8 h-8 rounded-full object-cover"
														/>
													)}
													<div>
														<p className="text-sm font-medium">
															{blog.author
																? `${blog.author.firstName} ${blog.author.lastName}`
																: "Auteur inconnu"}
														</p>
														<p className="text-xs text-muted-foreground">
															{blog.author?.name || ""}
														</p>
													</div>
												</div>
											</td>
											<td className="p-4">{getStateBadge(blog.state)}</td>
											<td className="p-4">
												<div className="flex items-center gap-1 text-sm text-muted-foreground">
													<Calendar className="h-3 w-3" />
													{formatDate(blog.createdAt)}
												</div>
											</td>
											<td className="p-4">
												<div className="flex flex-wrap gap-1">
													{blog.tags && blog.tags.length > 0 ? (
														blog.tags.slice(0, 2).map((tag) => (
															<Badge
																key={tag.id}
																variant="outline"
																className="text-xs"
															>
																#{tag.name}
															</Badge>
														))
													) : (
														<span className="text-xs text-muted-foreground">
															Aucun
														</span>
													)}
													{blog.tags && blog.tags.length > 2 && (
														<Badge variant="outline" className="text-xs">
															+{blog.tags.length - 2}
														</Badge>
													)}
												</div>
											</td>
											<td className="p-4">
												<div className="flex items-center gap-1 text-sm">
													{blog.commentsEnabled ? "💬" : "🚫"}
													<span className="text-muted-foreground">
														{blog.commentsEnabled ? "Activés" : "Désactivés"}
													</span>
												</div>
											</td>
											<td className="p-4">
												<div className="flex items-center gap-1 justify-end">
													<Link
														to="/admin/blog/$blogId"
														params={{ blogId: blog.id }}
													>
														<Button
															variant="ghost"
															size="sm"
															className="h-8 w-8 p-0"
														>
															<Eye className="h-4 w-4" />
														</Button>
													</Link>
													<Link
														to="/admin/blog/$blogId/edit"
														params={{ blogId: blog.id }}
													>
														<Button
															variant="ghost"
															size="sm"
															className="h-8 w-8 p-0"
														>
															<Edit className="h-4 w-4" />
														</Button>
													</Link>
													<Button
														variant="ghost"
														size="sm"
														className="h-8 w-8 p-0 text-destructive hover:text-destructive"
														onClick={() => setDeleteBlog(blog)}
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Dialogue de confirmation de suppression */}
			<AlertDialog open={!!deleteBlog} onOpenChange={() => setDeleteBlog(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Supprimer l'article</AlertDialogTitle>
						<AlertDialogDescription>
							Êtes-vous sûr de vouloir supprimer l'article{" "}
							<strong>"{deleteBlog?.title}"</strong> ? Cette action est
							irréversible et supprimera également tous les commentaires
							associés.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={deleteBlogMutation.isPending}>
							Annuler
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							disabled={deleteBlogMutation.isPending}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							{deleteBlogMutation.isPending ? (
								<>
									<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
									Suppression...
								</>
							) : (
								"Supprimer définitivement"
							)}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}

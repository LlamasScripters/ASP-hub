import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	Calendar,
	Clock,
	Edit,
	Eye,
	MessageCircle,
	User,
} from "lucide-react";
import { BlogCommentsAdmin } from "./BlogCommentsAdmin.tsx";
import type { Blog } from "./hooks/useBlogQueries.ts";

interface BlogViewPageProps {
	blog: Blog;
}

export default function BlogViewPage({ blog }: BlogViewPageProps) {
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("fr-FR", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
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

	return (
		<div className="container mx-auto p-4 sm:p-6 max-w-4xl">
			{/* Header avec navigation */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
				<Link to="/admin/blog">
					<Button variant="outline" className="gap-2">
						<ArrowLeft className="h-4 w-4" />
						Retour à la liste
					</Button>
				</Link>
				<div className="flex gap-2">
					<Link to={`/admin/blog/${blog.id}/edit` as any}>
						<Button className="gap-2">
							<Edit className="h-4 w-4" />
							Modifier
						</Button>
					</Link>
				</div>
			</div>

			{/* Article principal */}
			<article className="space-y-6">
				<Card>
					{blog.headerImage && (
						<div className="aspect-video overflow-hidden rounded-t-lg">
							<img
								src={blog.headerImage}
								alt={blog.title}
								className="w-full h-full object-cover"
							/>
						</div>
					)}

					<CardHeader className="space-y-4">
						{/* Badges et statut */}
						<div className="flex flex-wrap items-center gap-2">
							{getStateBadge(blog.state)}
							{blog.commentsEnabled && (
								<Badge variant="outline" className="gap-1">
									<MessageCircle className="h-3 w-3" />
									Commentaires activés
								</Badge>
							)}
							<Badge variant="outline" className="gap-1">
								<Eye className="h-3 w-3" />
								Vue admin
							</Badge>
						</div>

						{/* Titre */}
						<CardTitle className="text-2xl sm:text-3xl leading-tight">
							{blog.title}
						</CardTitle>

						{/* Métadonnées */}
						<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
							<div className="flex items-center gap-1">
								<User className="h-4 w-4" />
								<span>Auteur ID: {blog.authorId}</span>
							</div>
							<div className="flex items-center gap-1">
								<Calendar className="h-4 w-4" />
								<span>Créé le {formatDate(blog.createdAt)}</span>
							</div>
							{blog.publishedAt && (
								<div className="flex items-center gap-1">
									<Clock className="h-4 w-4" />
									<span>Publié le {formatDate(blog.publishedAt)}</span>
								</div>
							)}
						</div>
					</CardHeader>

					<CardContent>
						{/* Contenu de l'article */}
						<div
							className="prose prose-gray dark:prose-invert max-w-none
                         prose-headings:text-foreground 
                         prose-p:text-foreground 
                         prose-strong:text-foreground
                         prose-a:text-primary hover:prose-a:text-primary/80
                         prose-blockquote:border-primary
                         prose-code:text-foreground prose-code:bg-muted
                         prose-pre:bg-muted prose-pre:text-foreground"
							dangerouslySetInnerHTML={{ __html: blog.content }}
						/>
					</CardContent>
				</Card>

				{/* Informations techniques - Section admin */}
				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Eye className="h-5 w-5" />
							Informations techniques
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-3">
								<div>
									<h4 className="text-sm font-medium text-muted-foreground">
										Identifiant
									</h4>
									<p className="text-sm font-mono bg-muted px-2 py-1 rounded">
										{blog.id}
									</p>
								</div>
								<div>
									<h4 className="text-sm font-medium text-muted-foreground">
										État
									</h4>
									<p className="text-sm">{blog.state}</p>
								</div>
								<div>
									<h4 className="text-sm font-medium text-muted-foreground">
										Commentaires
									</h4>
									<p className="text-sm">
										{blog.commentsEnabled ? "Activés" : "Désactivés"}
									</p>
								</div>
							</div>

							<div className="space-y-3">
								<div>
									<h4 className="text-sm font-medium text-muted-foreground">
										Créé le
									</h4>
									<p className="text-sm">{formatDate(blog.createdAt)}</p>
								</div>
								<div>
									<h4 className="text-sm font-medium text-muted-foreground">
										Dernière modification
									</h4>
									<p className="text-sm">{formatDate(blog.updatedAt)}</p>
								</div>
								{blog.publishedAt && (
									<div>
										<h4 className="text-sm font-medium text-muted-foreground">
											Date de publication
										</h4>
										<p className="text-sm">{formatDate(blog.publishedAt)}</p>
									</div>
								)}
							</div>
						</div>

						{blog.deletedAt && (
							<>
								<Separator />
								<div className="p-3 bg-destructive/10 border border-destructive/20 rounded">
									<h4 className="text-sm font-medium text-destructive mb-1">
										Article supprimé
									</h4>
									<p className="text-sm text-destructive/80">
										Supprimé le {formatDate(blog.deletedAt)}
									</p>
								</div>
							</>
						)}
					</CardContent>
				</Card>

				{/* Section de gestion des commentaires - Admin uniquement */}
				<BlogCommentsAdmin blogId={blog.id} />

				{/* Actions rapides */}
				<div className="flex flex-col sm:flex-row gap-4">
					<Link to={`/admin/blog/${blog.id}/edit` as any} className="flex-1">
						<Button className="w-full gap-2">
							<Edit className="h-4 w-4" />
							Modifier cet article
						</Button>
					</Link>
					<Link to="/admin/blog" className="flex-1">
						<Button variant="outline" className="w-full gap-2">
							<ArrowLeft className="h-4 w-4" />
							Retour à la liste
						</Button>
					</Link>
				</div>
			</article>
		</div>
	);
}

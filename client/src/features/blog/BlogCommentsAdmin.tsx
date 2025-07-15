import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	AlertTriangle,
	Calendar,
	Eye,
	EyeOff,
	MessageCircle,
	Shield,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { API_CONFIG } from "@/lib/config";

interface Comment {
	id: string;
	articleId: string;
	authorId: string;
	content: string;
	state: "published" | "archived";
	createdAt: string;
	updatedAt: string;
	deletedAt?: string | null;
	author: {
		id: string;
		name: string;
		firstName: string;
		lastName: string;
		image?: string | null;
	};
}

interface BlogCommentsAdminProps {
	blogId: string;
}

export function BlogCommentsAdmin({ blogId }: BlogCommentsAdminProps) {
	const [comments, setComments] = useState<Comment[]>([]);
	const [loading, setLoading] = useState(true);
	const [updatingComments, setUpdatingComments] = useState<Set<string>>(
		new Set(),
	);

	const fetchComments = useCallback(async () => {
		try {
			setLoading(true);
			const response = await fetch(`${API_CONFIG.FULL_URL}/comments/admin/article/${blogId}`);
			if (!response.ok) {
				throw new Error("Erreur lors du chargement des commentaires");
			}
			const data = await response.json();
			setComments(data);
		} catch (error) {
			console.error("Erreur:", error);
			toast.error("Impossible de charger les commentaires");
		} finally {
			setLoading(false);
		}
	}, [blogId]);

	const toggleCommentVisibility = async (
		commentId: string,
		currentState: string,
	) => {
		try {
			setUpdatingComments((prev) => new Set(prev).add(commentId));

			const action = currentState === "published" ? "hide" : "show";
			const response = await fetch(
				`${API_CONFIG.FULL_URL}/comments/admin/${commentId}/${action}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			if (!response.ok) {
				throw new Error(
					`Erreur lors du ${action === "hide" ? "masquage" : "affichage"} du commentaire`,
				);
			}

			// Mettre à jour le state local
			setComments((prev) =>
				prev.map((comment) =>
					comment.id === commentId
						? {
								...comment,
								state: action === "hide" ? "archived" : "published",
							}
						: comment,
				),
			);

			console.log(
				`Commentaire ${action === "hide" ? "masqué" : "affiché"} avec succès`,
			);
		} catch (error) {
			console.error("Erreur:", error);
			toast.error("Impossible de modifier le commentaire");
		} finally {
			setUpdatingComments((prev) => {
				const newSet = new Set(prev);
				newSet.delete(commentId);
				return newSet;
			});
		}
	};

	useEffect(() => {
		fetchComments();
	}, [fetchComments]);

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("fr-FR", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const getAuthorDisplayName = (author: Comment["author"]) => {
		if (author.firstName && author.lastName) {
			return `${author.firstName} ${author.lastName}`;
		}
		return author.name || "Utilisateur anonyme";
	};

	const getAuthorInitials = (author: Comment["author"]) => {
		if (author.firstName && author.lastName) {
			return `${author.firstName[0]}${author.lastName[0]}`.toUpperCase();
		}
		if (author.name) {
			const parts = author.name.split(" ");
			return parts.length > 1
				? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
				: author.name.substring(0, 2).toUpperCase();
		}
		return "U";
	};

	if (loading) {
		return (
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Shield className="h-5 w-5" />
						Gestion des commentaires
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-center py-8">
						<div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent" />
						<span className="ml-3 text-muted-foreground">
							Chargement des commentaires...
						</span>
					</div>
				</CardContent>
			</Card>
		);
	}

	const publishedComments = comments.filter((c) => c.state === "published");
	const hiddenComments = comments.filter((c) => c.state === "archived");

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Shield className="h-5 w-5" />
					Gestion des commentaires ({comments.length})
				</CardTitle>
				<div className="flex gap-2">
					<Badge variant="outline" className="gap-1">
						<Eye className="h-3 w-3" />
						{publishedComments.length} visible
						{publishedComments.length > 1 ? "s" : ""}
					</Badge>
					{hiddenComments.length > 0 && (
						<Badge variant="secondary" className="gap-1">
							<EyeOff className="h-3 w-3" />
							{hiddenComments.length} masqué
							{hiddenComments.length > 1 ? "s" : ""}
						</Badge>
					)}
				</div>
			</CardHeader>
			<CardContent>
				{comments.length === 0 ? (
					<div className="text-center py-8 text-muted-foreground">
						<MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
						<p>Aucun commentaire sur cet article</p>
					</div>
				) : (
					<div className="space-y-4">
						{comments.map((comment, index) => (
							<div key={comment.id}>
								<div className="flex gap-3">
									<Avatar className="h-8 w-8">
										<AvatarImage src={comment.author.image || undefined} />
										<AvatarFallback className="text-xs">
											{getAuthorInitials(comment.author)}
										</AvatarFallback>
									</Avatar>

									<div className="flex-1 space-y-2">
										<div className="flex items-center gap-2 flex-wrap">
											<span className="font-medium text-sm">
												{getAuthorDisplayName(comment.author)}
											</span>
											<Badge
												variant={
													comment.state === "published"
														? "default"
														: "secondary"
												}
												className="text-xs"
											>
												{comment.state === "published" ? (
													<>
														<Eye className="h-3 w-3 mr-1" />
														Visible
													</>
												) : (
													<>
														<EyeOff className="h-3 w-3 mr-1" />
														Masqué
													</>
												)}
											</Badge>
											<span className="text-xs text-muted-foreground flex items-center gap-1">
												<Calendar className="h-3 w-3" />
												{formatDate(comment.createdAt)}
											</span>
										</div>

										<div
											className={`text-sm p-3 rounded-md border ${
												comment.state === "archived"
													? "bg-muted text-muted-foreground border-dashed"
													: "bg-background"
											}`}
										>
											{comment.content}
										</div>

										<div className="flex gap-2">
											<Button
												variant={
													comment.state === "published"
														? "destructive"
														: "default"
												}
												size="sm"
												onClick={() =>
													toggleCommentVisibility(comment.id, comment.state)
												}
												disabled={updatingComments.has(comment.id)}
												className="text-xs"
											>
												{updatingComments.has(comment.id) ? (
													<div className="animate-spin rounded-full h-3 w-3 border-2 border-current border-t-transparent mr-1" />
												) : comment.state === "published" ? (
													<EyeOff className="h-3 w-3 mr-1" />
												) : (
													<Eye className="h-3 w-3 mr-1" />
												)}
												{comment.state === "published" ? "Masquer" : "Afficher"}
											</Button>
										</div>
									</div>
								</div>

								{index < comments.length - 1 && <Separator className="mt-4" />}
							</div>
						))}
					</div>
				)}

				{hiddenComments.length > 0 && (
					<div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
						<div className="flex items-center gap-2 text-amber-800 mb-2">
							<AlertTriangle className="h-4 w-4" />
							<span className="text-sm font-medium">Commentaires masqués</span>
						</div>
						<p className="text-xs text-amber-700">
							{hiddenComments.length} commentaire
							{hiddenComments.length > 1 ? "s sont masqués" : " est masqué"} et
							ne {hiddenComments.length > 1 ? "sont" : "est"} pas visible
							{hiddenComments.length > 1 ? "s" : ""}
							par les utilisateurs. Vous pouvez les réafficher à tout moment.
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

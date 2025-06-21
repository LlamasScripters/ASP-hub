import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Link } from "@tanstack/react-router";
import {
	BookOpen,
	Calendar,
	Filter,
	MessageCircle,
	Search,
	Share2,
	SortAsc,
	SortDesc,
} from "lucide-react";
import { useMemo, useState } from "react";
import { type Blog, useTags } from "./hooks/useBlogQueries.ts";

interface PublicBlogPageProps {
	blogs: Blog[];
}

export function PublicBlogPage({ blogs }: PublicBlogPageProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedTag, setSelectedTag] = useState<string>("all");
	const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");

	// Récupérer tous les tags depuis l'API
	const { data: tags = [] } = useTags();

	// Extraire tous les tags uniques des articles
	const allTags = useMemo(() => {
		return tags.map((tag) => tag.name);
	}, [tags]);

	// Filtrer et trier les articles
	const filteredAndSortedBlogs = useMemo(() => {
		const filtered = blogs.filter((blog) => {
			const matchesSearch =
				blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				blog.content.toLowerCase().includes(searchTerm.toLowerCase());

			const matchesTag =
				selectedTag === "all" ||
				blog.tags?.some((tag) => tag.name === selectedTag);

			return matchesSearch && matchesTag;
		});

		// Tri
		filtered.sort((a, b) => {
			switch (sortBy) {
				case "newest":
					return (
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					);
				case "oldest":
					return (
						new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
					);
				case "title":
					return a.title.localeCompare(b.title);
				default:
					return 0;
			}
		});

		return filtered;
	}, [blogs, searchTerm, selectedTag, sortBy]);

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

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<div className="bg-background shadow-sm border-b">
				<div className="container mx-auto px-4 py-12">
					<div className="text-center max-w-3xl mx-auto">
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
							📰 Blog du Club
						</h1>
						<p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
							Découvrez toutes les actualités et événements de notre club
							sportif
						</p>

						{/* Barre de recherche principale */}
						<div className="relative max-w-2xl mx-auto">
							<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
							<Input
								type="text"
								placeholder="Rechercher dans les articles..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-12 pr-4 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 shadow-lg"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Filtres et tri */}
			<div className="container mx-auto px-4 py-8">
				<div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
					<div className="flex flex-wrap gap-3 items-center">
						<Filter className="h-5 w-5 text-gray-600" />
						<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
							Filtrer par :
						</span>

						{/* Filtre par tags */}
						<Select value={selectedTag} onValueChange={setSelectedTag}>
							<SelectTrigger className="w-40">
								<SelectValue placeholder="Tous les tags" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Tous les tags</SelectItem>
								{allTags.map((tag) => (
									<SelectItem key={tag} value={tag}>
										#{tag}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="flex items-center gap-3">
						<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
							Trier par :
						</span>
						<Select
							value={sortBy}
							onValueChange={(value: "newest" | "oldest" | "title") =>
								setSortBy(value)
							}
						>
							<SelectTrigger className="w-48">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="newest">
									<div className="flex items-center gap-2">
										<SortDesc className="h-4 w-4" />
										Plus récent
									</div>
								</SelectItem>
								<SelectItem value="oldest">
									<div className="flex items-center gap-2">
										<SortAsc className="h-4 w-4" />
										Plus ancien
									</div>
								</SelectItem>
								<SelectItem value="title">
									<div className="flex items-center gap-2">
										<BookOpen className="h-4 w-4" />
										Titre A-Z
									</div>
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Résultats de recherche */}
				<div className="mb-6">
					<p className="text-gray-600 dark:text-gray-400">
						{filteredAndSortedBlogs.length} article
						{filteredAndSortedBlogs.length > 1 ? "s" : ""} trouvé
						{filteredAndSortedBlogs.length > 1 ? "s" : ""}
						{searchTerm && (
							<span>
								{" "}
								pour "<strong>{searchTerm}</strong>"
							</span>
						)}
					</p>
				</div>

				{/* Articles */}
				{filteredAndSortedBlogs.length === 0 ? (
					<div className="text-center py-16">
						<Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
						<h3 className="text-xl font-semibold text-gray-600 mb-2">
							Aucun article trouvé
						</h3>
						<p className="text-gray-500 mb-6">
							{searchTerm
								? "Essayez de modifier votre recherche ou vos filtres"
								: "Aucun article n'est disponible pour le moment"}
						</p>
						{searchTerm && (
							<Button onClick={() => setSearchTerm("")} variant="outline">
								Effacer la recherche
							</Button>
						)}
					</div>
				) : (
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{filteredAndSortedBlogs.map((blog) => (
							<Card
								key={blog.id}
								className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-slate-800 border-0 shadow-lg"
							>
								{/* Image d'en-tête */}
								{blog.headerImage && (
									<div className="aspect-video overflow-hidden rounded-t-lg relative">
										<img
											src={blog.headerImage}
											alt={blog.title}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
									</div>
								)}

								<CardHeader className="pb-3">
									<div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
										<Calendar className="h-4 w-4" />
										{formatDate(blog.createdAt)}
									</div>

									<CardTitle className="text-xl leading-tight group-hover:text-blue-600 transition-colors">
										<Link
											to="/dashboard/blog/$blogId"
											params={{ blogId: blog.id }}
											className="hover:underline"
										>
											{blog.title}
										</Link>
									</CardTitle>
								</CardHeader>

								<CardContent className="pb-3">
									<CardDescription className="text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
										{stripHtml(blog.content).substring(0, 150)}...
									</CardDescription>

									{/* Tags */}
									<div className="flex flex-wrap gap-1 mt-3">
										{blog.tags && blog.tags.length > 0 ? (
											blog.tags.slice(0, 3).map((tag) => (
												<Badge
													key={tag.id}
													variant="secondary"
													className="text-xs"
												>
													#{tag.name}
												</Badge>
											))
										) : (
											<Badge
												variant="outline"
												className="text-xs text-gray-400"
											>
												Aucun tag
											</Badge>
										)}
									</div>
								</CardContent>

								<CardFooter className="pt-3 border-t">
									<div className="flex items-center justify-between w-full">
										<div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
											<button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
												<MessageCircle className="h-4 w-4" />
												<span className="text-xs">
													{blog.commentsCount || 0}
												</span>
											</button>
										</div>

										<Button size="sm" variant="ghost" className="p-2">
											<Share2 className="h-4 w-4" />
										</Button>
									</div>
								</CardFooter>
							</Card>
						))}
					</div>
				)}

				{/* Pagination (à implémenter plus tard) */}
				{filteredAndSortedBlogs.length > 9 && (
					<div className="flex justify-center mt-12">
						<div className="flex gap-2">
							<Button variant="outline" disabled>
								Précédent
							</Button>
							<Button variant="outline" className="bg-blue-500 text-white">
								1
							</Button>
							<Button variant="outline">2</Button>
							<Button variant="outline">3</Button>
							<Button variant="outline">Suivant</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
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
import { MoreHorizontal, Edit, Trash2, Eye, Plus, FileText, Calendar } from "lucide-react";
import { useBlogs, useDeleteBlog, type Blog } from "../../pages/blog/hooks/useBlogQueries.ts";

interface AllBlogPageProps {
  blogs?: Blog[];  // Pour compatibilité avec le router loader
}

export function AllBlogPage({ blogs: initialBlogs }: AllBlogPageProps) {
  const [deleteBlog, setDeleteBlog] = useState<Blog | null>(null);
  
  // Utiliser TanStack Query pour gérer l'état
  const { data: queryBlogs, isLoading, error } = useBlogs();
  const deleteBlogMutation = useDeleteBlog();
  
  // Utiliser les blogs du query si disponibles, sinon les blogs initiaux
  const blogs = queryBlogs || initialBlogs || [];

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
      case 'published':
        return <Badge className="bg-green-500 hover:bg-green-600">Publié</Badge>;
      case 'draft':
        return <Badge variant="outline">Brouillon</Badge>;
      case 'archived':
        return <Badge variant="secondary">Archivé</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const stripHtml = (html: string) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
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
            <Button onClick={() => window.location.reload()}>
              Réessayer
            </Button>
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

      {/* Stats rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-muted-foreground">Publiés</span>
            </div>
            <p className="text-2xl font-bold mt-1">
              {blogs.filter(b => b.state === 'published').length}
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
              {blogs.filter(b => b.state === 'draft').length}
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
              {blogs.filter(b => b.state === 'archived').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Total</span>
            </div>
            <p className="text-2xl font-bold mt-1">{blogs.length}</p>
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
              Commencez par créer votre premier article de blog pour partager vos actualités avec votre communauté.
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map(blog => (
            <Card key={blog.id} className="flex flex-col hover:shadow-lg transition-shadow">
              {blog.headerImage && (
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={blog.headerImage} 
                    alt={blog.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <CardHeader className="flex-1">
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="line-clamp-2 text-lg leading-tight">
                    {blog.title}
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="shrink-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to="/admin/blog/$blogId" params={{ blogId: blog.id }}>
                          <Eye className="mr-2 h-4 w-4" /> Voir
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/blog/$blogId/edit" params={{ blogId: blog.id }}>
                          <Edit className="mr-2 h-4 w-4" /> Éditer
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setDeleteBlog(blog)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {formatDate(blog.createdAt)}
                </div>
              </CardHeader>
              
              <CardContent className="flex-1">
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {stripHtml(blog.content).substring(0, 150)}...
                </p>
              </CardContent>
              
              <CardFooter className="flex justify-between items-center pt-4 border-t">
                <div className="flex items-center gap-2">
                  {getStateBadge(blog.state)}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {blog.commentsEnabled ? "💬" : "🚫"}
                  <span className="hidden sm:inline">
                    {blog.commentsEnabled ? "Commentaires" : "Pas de commentaires"}
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Dialogue de confirmation de suppression */}
      <AlertDialog open={!!deleteBlog} onOpenChange={() => setDeleteBlog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l'article</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer l'article <strong>"{deleteBlog?.title}"</strong> ? 
              Cette action est irréversible et supprimera également tous les commentaires associés.
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
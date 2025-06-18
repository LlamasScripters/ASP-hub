import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar, 
  User, 
  MessageCircle, 
  Share2, 
  Eye,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  ChevronUp
} from "lucide-react";
import { type Blog, useComments, useCreateComment, type CreateCommentData } from "../../pages/blog/hooks/useBlogQueries.ts";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getLoggedInUserQueryOptions } from "@/features/users/users.config";
import { ReactionsBar } from "./components/ReactionsBar";
import { CommentReactionsBar } from "./components/CommentReactionsBar";

interface PublicBlogDetailPageProps {
  blog: Blog;
}

export function PublicBlogDetailPage({ blog }: PublicBlogDetailPageProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [newComment, setNewComment] = useState("");

  // Récupérer les commentaires réels
  const { data: comments = [], isLoading: commentsLoading, error: commentsError } = useComments(blog.id);
  const createCommentMutation = useCreateComment();

  // Récupérer l'utilisateur connecté
  const { data: currentUser } = useQuery(getLoggedInUserQueryOptions());

  // Barre de progression de lecture
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(progress);
      setShowScrollTop(scrollTop > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = blog.title;
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast.success("Lien copié dans le presse-papier !");
        setShowShareMenu(false);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      setShowShareMenu(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    if (!currentUser) {
      toast.error("Vous devez être connecté pour commenter");
      return;
    }

    const commentData: CreateCommentData = {
      articleId: blog.id,
      authorId: currentUser.id,
      content: newComment.trim(),
    };

    try {
      await createCommentMutation.mutateAsync(commentData);
      setNewComment("");
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error);
    }
  };

  const getAuthorDisplayName = (author: any) => {
    return `${author.firstName} ${author.lastName}`.trim() || author.name;
  };

  const getAuthorInitials = (author: any) => {
    const firstName = author.firstName || '';
    const lastName = author.lastName || '';
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    return author.name?.slice(0, 2).toUpperCase() || 'U';
  };

  return (
    <div className="min-h-screen bg-sidebar dark:bg-sidebar">
      {/* Barre de progression de lecture */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Actions flottantes */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 flex flex-col gap-2">
        
        <div className="relative">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="shadow-lg"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          
          {showShareMenu && (
            <div className="absolute right-full mr-2 top-0 bg-white dark:bg-slate-800 rounded-lg shadow-xl border p-2 flex flex-col gap-1">
              <Button variant="ghost" size="sm" onClick={() => handleShare('facebook')} className="justify-start">
                <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                Facebook
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleShare('twitter')} className="justify-start">
                <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                Twitter
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleShare('linkedin')} className="justify-start">
                <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
                LinkedIn
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleShare('copy')} className="justify-start">
                <Copy className="h-4 w-4 mr-2" />
                Copier
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Bouton scroll to top */}
      {showScrollTop && (
        <Button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-lg"
          size="sm"
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      )}

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="space-y-8">
          {/* Header de l'article */}
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <div className="flex justify-center">
                <Badge className="bg-blue-500">Article publié</Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                {blog.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Par {blog.author ? getAuthorDisplayName(blog.author) : `Auteur ID: ${blog.authorId}`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>247 vues</span>
                </div>
              </div>
            </div>

            {/* Image d'en-tête */}
            {blog.headerImage && (
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src={blog.headerImage} 
                  alt={blog.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            )}
          </div>

          {/* Contenu de l'article */}
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <div 
                className="prose prose-lg prose-blue dark:prose-invert max-w-none
                          prose-headings:text-gray-900 dark:prose-headings:text-white
                          prose-p:text-gray-700 dark:prose-p:text-gray-300
                          prose-strong:text-gray-900 dark:prose-strong:text-white
                          prose-a:text-blue-600 hover:prose-a:text-blue-500
                          prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20
                          prose-code:text-blue-600 prose-code:bg-blue-50 dark:prose-code:bg-blue-900/20
                          prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </CardContent>
          </Card>

          {/* Réactions */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Réactions
                  </h3>
                </div>
                <ReactionsBar articleId={blog.id} />
              </div>
            </CardContent>
          </Card>

          {/* Actions et stats */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">
                      {commentsLoading ? '...' : comments.length} commentaire{comments.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Eye className="h-5 w-5" />
                    <span className="font-medium">247 vues</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {blog.tags && blog.tags.length > 0 ? (
                    blog.tags.map((tag) => (
                      <Badge key={tag.id} variant="secondary">
                        #{tag.name}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">Aucun tag</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-8" />

          {/* Section commentaires */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Commentaires ({commentsLoading ? '...' : comments.length})
            </h2>

            {/* Nouveau commentaire */}
            {blog.commentsEnabled && currentUser && (
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Partagez votre avis sur cet article..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-20"
                    />
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleCommentSubmit} 
                        disabled={!newComment.trim() || createCommentMutation.isPending}
                      >
                        {createCommentMutation.isPending ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Publication...
                          </>
                        ) : (
                          "Publier le commentaire"
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Message pour utilisateurs non connectés */}
            {blog.commentsEnabled && !currentUser && (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    <Link to="/auth/login" className="text-blue-600 hover:text-blue-500 font-medium">
                      Connectez-vous
                    </Link>
                    {" "}pour laisser un commentaire
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Liste des commentaires */}
            <div className="space-y-4">
              {commentsLoading ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : commentsError ? (
                <div className="text-center py-8 text-red-500">
                  Erreur lors du chargement des commentaires
                </div>
              ) : comments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {blog.commentsEnabled ? (
                    "Aucun commentaire pour le moment. Soyez le premier à commenter !"
                  ) : (
                    "Les commentaires sont désactivés pour cet article."
                  )}
                </div>
              ) : (
                comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Avatar>
                          {comment.author.image ? (
                            <img src={comment.author.image} alt={getAuthorDisplayName(comment.author)} />
                          ) : (
                            <AvatarFallback>
                              {getAuthorInitials(comment.author)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {getAuthorDisplayName(comment.author)}
                            </span>
                            <span className="text-sm text-gray-500">
                              {formatDate(comment.createdAt)}
                            </span>
                          </div>
                          
                          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            {comment.content}
                          </p>
                          
                          <div className="flex items-center gap-4">
                            <CommentReactionsBar commentId={comment.id} />
                            <button className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                              Répondre
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
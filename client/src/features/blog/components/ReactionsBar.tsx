import { Button } from "@/components/ui/button";
import { useReactionTypes, useArticleReactions, useUserArticleReaction, useToggleArticleReaction } from "../hooks/useBlogQueries";
import { useQuery } from "@tanstack/react-query";
import { getLoggedInUserQueryOptions } from "@/features/users/users.config";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ReactionsBarProps {
  articleId: string;
  className?: string;
}

export function ReactionsBar({ articleId, className }: ReactionsBarProps) {
  // État pour suivre les images qui ont échoué à charger
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  
  // Récupérer les types de réactions disponibles
  const { data: reactionTypes = [], isLoading: typesLoading } = useReactionTypes();
  
  // Récupérer les réactions de l'article avec leurs comptes
  const { data: articleReactions = [], isLoading: reactionsLoading } = useArticleReactions(articleId);
  
  // Récupérer la réaction de l'utilisateur connecté
  const { data: userReaction } = useUserArticleReaction(articleId);
  
  // Récupérer l'utilisateur connecté
  const { data: currentUser } = useQuery(getLoggedInUserQueryOptions());
  
  // Mutation pour toggle une réaction
  const toggleReactionMutation = useToggleArticleReaction();

  const handleReactionClick = async (reactionId: number) => {
    if (!currentUser) {
      toast.error("Vous devez être connecté pour réagir");
      return;
    }

    try {
      await toggleReactionMutation.mutateAsync({
        articleId,
        reactionId,
      });
    } catch (error) {
      console.error("Erreur lors de la réaction:", error);
    }
  };

  const handleImageError = (reactionId: number) => {
    setFailedImages(prev => new Set(prev).add(reactionId));
  };

  // Emoji par défaut si l'image ne charge pas
  const getDefaultEmoji = (reactionId: number) => {
    const emojis = ['👍', '❤️', '😂', '😮', '😢', '😡'];
    return emojis[reactionId % emojis.length] || '👍';
  };

  if (typesLoading || reactionsLoading) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-10 h-8 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (reactionTypes.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex gap-1">
        {reactionTypes.map((reactionType) => {
          const reaction = articleReactions.find(r => r.reactionId === reactionType.id);
          const count = reaction?.count || 0;
          const isUserReacted = userReaction?.reactionId === reactionType.id;
          
          return (
            <Button
              key={reactionType.id}
              variant={isUserReacted ? "default" : "ghost"}
              size="sm"
              onClick={() => handleReactionClick(reactionType.id)}
              disabled={toggleReactionMutation.isPending}
              className={cn(
                "flex items-center gap-1 h-8 px-2",
                isUserReacted 
                  ? "bg-blue-500 text-white hover:bg-blue-600" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              {failedImages.has(reactionType.id) ? (
                <span className="text-sm">{getDefaultEmoji(reactionType.id)}</span>
              ) : (
                <img 
                  src={reactionType.logoLink} 
                  alt="reaction" 
                  className="w-4 h-4"
                  onError={() => handleImageError(reactionType.id)}
                />
              )}
              {count > 0 && (
                <span className={cn(
                  "text-xs font-medium",
                  isUserReacted ? "text-white" : "text-gray-600 dark:text-gray-400"
                )}>
                  {count}
                </span>
              )}
            </Button>
          );
        })}
      </div>
      
      {articleReactions.some(r => r.count > 0) && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {articleReactions.reduce((total, r) => total + r.count, 0)} réaction{articleReactions.reduce((total, r) => total + r.count, 0) > 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}
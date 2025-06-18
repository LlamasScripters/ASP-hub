import { Button } from "@/components/ui/button";
import { useReactionTypes, useCommentReactions, useUserCommentReaction, useToggleCommentReaction } from "../hooks/useBlogQueries";
import { useQuery } from "@tanstack/react-query";
import { getLoggedInUserQueryOptions } from "@/features/users/users.config";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CommentReactionsBarProps {
  commentId: string;
  className?: string;
}

export function CommentReactionsBar({ commentId, className }: CommentReactionsBarProps) {
  // État pour suivre les images qui ont échoué à charger
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  
  // Récupérer les types de réactions disponibles
  const { data: reactionTypes = [], isLoading: typesLoading } = useReactionTypes();
  
  // Récupérer les réactions du commentaire avec leurs comptes
  const { data: commentReactions = [], isLoading: reactionsLoading } = useCommentReactions(commentId);
  
  // Récupérer la réaction de l'utilisateur connecté
  const { data: userReaction } = useUserCommentReaction(commentId);
  
  // Récupérer l'utilisateur connecté
  const { data: currentUser } = useQuery(getLoggedInUserQueryOptions());
  
  // Mutation pour toggle une réaction
  const toggleReactionMutation = useToggleCommentReaction();

  const handleReactionClick = async (reactionId: number) => {
    if (!currentUser) {
      toast.error("Vous devez être connecté pour réagir");
      return;
    }

    try {
      await toggleReactionMutation.mutateAsync({
        commentId,
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
      <div className={cn("flex items-center gap-1", className)}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="w-8 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (reactionTypes.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {reactionTypes.slice(0, 3).map((reactionType) => {
        const reaction = commentReactions.find(r => r.reactionId === reactionType.id);
        const count = reaction?.count || 0;
        const isUserReacted = userReaction?.reactionId === reactionType.id;
        
        return (
          <Button
            key={reactionType.id}
            variant="ghost"
            size="sm"
            onClick={() => handleReactionClick(reactionType.id)}
            disabled={toggleReactionMutation.isPending}
            className={cn(
              "h-6 px-1 flex items-center gap-1",
              isUserReacted 
                ? "bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300" 
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            {failedImages.has(reactionType.id) ? (
              <span className="text-xs">{getDefaultEmoji(reactionType.id)}</span>
            ) : (
              <img 
                src={reactionType.logoLink} 
                alt="reaction" 
                className="w-3 h-3"
                onError={() => handleImageError(reactionType.id)}
              />
            )}
            {count > 0 && (
              <span className="text-xs font-medium">
                {count}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
}
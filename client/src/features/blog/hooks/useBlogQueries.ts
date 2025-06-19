// hooks/useBlogQueries.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { blogApi, tagsApi, commentsApi, reactionsApi, type Blog, type CreateBlogData, type UpdateBlogData, type Tag, type Comment, type CreateCommentData, type UpdateCommentData, type Reaction, type ArticleReaction, type CommentReaction, type UserReaction, type ToggleArticleReactionData, type ToggleCommentReactionData } from "../lib/blog.ts";

// Query Keys
export const blogKeys = {
  all: ['blogs'] as const,
  lists: () => [...blogKeys.all, 'list'] as const,
  list: (filters: string) => [...blogKeys.lists(), { filters }] as const,
  details: () => [...blogKeys.all, 'detail'] as const,
  detail: (id: string) => [...blogKeys.details(), id] as const,
}

// Get all blogs
export function useBlogs() {
  return useQuery({
    queryKey: blogKeys.lists(),
    queryFn: async () => {
      const response = await blogApi.getBlogs();
      return response.data;
    },
  });
}

// Get single blog
export function useBlog(id: string) {
  return useQuery({
    queryKey: blogKeys.detail(id),
    queryFn: async () => {
      const response = await blogApi.getBlog(id);
      return response.data;
    },
    enabled: !!id,
  });
}

// Create blog mutation
export function useCreateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateBlogData) => {
      const response = await blogApi.createBlog(data);
      return response.data;
    },
    onSuccess: (newBlog) => {
      // Invalider et refetch la liste des blogs
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      
      // Ajouter le nouveau blog au cache
      queryClient.setQueryData(blogKeys.detail(newBlog.id), newBlog);
      
      toast.success("Article créé avec succès !");
    },
    onError: (error) => {
      console.error("Erreur lors de la création de l'article:", error);
      toast.error("Erreur lors de la création de l'article");
    },
  });
}

// Update blog mutation
export function useUpdateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateBlogData }) => {
      const response = await blogApi.updateBlog(id, data);
      return response.data;
    },
    onSuccess: (updatedBlog) => {
      // Mettre à jour le cache du blog spécifique
      queryClient.setQueryData(blogKeys.detail(updatedBlog.id), updatedBlog);
      
      // Invalider la liste pour refetch
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      
      toast.success("Article mis à jour avec succès !");
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour de l'article:", error);
      toast.error("Erreur lors de la mise à jour de l'article");
    },
  });
}

// Delete blog mutation
export function useDeleteBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await blogApi.deleteBlog(id);
      return id;
    },
    onSuccess: (deletedId) => {
      // Supprimer du cache
      queryClient.removeQueries({ queryKey: blogKeys.detail(deletedId) });
      
      // Mettre à jour la liste en supprimant l'élément
      queryClient.setQueryData<Blog[]>(blogKeys.lists(), (oldData) => {
        if (!oldData) return [];
        return oldData.filter(blog => blog.id !== deletedId);
      });
      
      toast.success("Article supprimé avec succès !");
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression de l'article:", error);
      toast.error("Erreur lors de la suppression de l'article");
    },
  });
}

// Tags Query Keys
export const tagKeys = {
  all: ['tags'] as const,
  lists: () => [...tagKeys.all, 'list'] as const,
  details: () => [...tagKeys.all, 'detail'] as const,
  detail: (id: number) => [...tagKeys.details(), id] as const,
}

// Get all tags
export function useTags() {
  return useQuery({
    queryKey: tagKeys.lists(),
    queryFn: async () => {
      const response = await tagsApi.getTags();
      return response.data;
    },
  });
}

// Get single tag
export function useTag(id: number) {
  return useQuery({
    queryKey: tagKeys.detail(id),
    queryFn: async () => {
      const response = await tagsApi.getTagById(id);
      return response.data;
    },
    enabled: !!id,
  });
}

// Search tags
export function useSearchTags(query: string) {
  return useQuery({
    queryKey: [...tagKeys.all, 'search', query],
    queryFn: async () => {
      const response = await tagsApi.searchTags(query);
      return response.data;
    },
    enabled: !!query && query.length > 0,
  });
}

// Comments Query Keys
export const commentKeys = {
  all: ['comments'] as const,
  lists: () => [...commentKeys.all, 'list'] as const,
  list: (articleId: string) => [...commentKeys.lists(), { articleId }] as const,
  details: () => [...commentKeys.all, 'detail'] as const,
  detail: (id: string) => [...commentKeys.details(), id] as const,
  counts: () => [...commentKeys.all, 'count'] as const,
  count: (articleId: string) => [...commentKeys.counts(), { articleId }] as const,
}

// Get comments for an article
export function useComments(articleId: string) {
  return useQuery({
    queryKey: commentKeys.list(articleId),
    queryFn: async () => {
      const response = await commentsApi.getCommentsByArticleId(articleId);
      return response.data;
    },
    enabled: !!articleId,
  });
}

// Get single comment
export function useComment(id: string) {
  return useQuery({
    queryKey: commentKeys.detail(id),
    queryFn: async () => {
      const response = await commentsApi.getCommentById(id);
      return response.data;
    },
    enabled: !!id,
  });
}

// Get comments count for an article
export function useCommentsCount(articleId: string) {
  return useQuery({
    queryKey: commentKeys.count(articleId),
    queryFn: async () => {
      const response = await commentsApi.getCommentsCount(articleId);
      return response.data.count;
    },
    enabled: !!articleId,
  });
}

// Create comment mutation
export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentData: CreateCommentData) => {
      const response = await commentsApi.createComment(commentData);
      return response.data;
    },
    onSuccess: (newComment) => {
      // Invalider et refetch la liste des commentaires de l'article
      queryClient.invalidateQueries({ 
        queryKey: commentKeys.list(newComment.articleId) 
      });
      
      // Invalider le count des commentaires
      queryClient.invalidateQueries({ 
        queryKey: commentKeys.count(newComment.articleId) 
      });
      
      // Invalider la liste des blogs pour mettre à jour le count
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      
      toast.success("Commentaire publié avec succès !");
    },
    onError: (error) => {
      console.error("Erreur lors de la création du commentaire:", error);
      toast.error("Erreur lors de la publication du commentaire");
    },
  });
}

// Update comment mutation
export function useUpdateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateCommentData }) => {
      const response = await commentsApi.updateComment(id, data);
      return response.data;
    },
    onSuccess: (updatedComment) => {
      // Mettre à jour le cache du commentaire spécifique
      queryClient.setQueryData(commentKeys.detail(updatedComment.id), updatedComment);
      
      // Invalider la liste des commentaires de l'article
      queryClient.invalidateQueries({ 
        queryKey: commentKeys.list(updatedComment.articleId) 
      });
      
      toast.success("Commentaire mis à jour avec succès !");
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour du commentaire:", error);
      toast.error("Erreur lors de la mise à jour du commentaire");
    },
  });
}

// Delete comment mutation
export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, articleId }: { id: string; articleId: string }) => {
      await commentsApi.deleteComment(id);
      return { id, articleId };
    },
    onSuccess: ({ id, articleId }) => {
      // Supprimer du cache
      queryClient.removeQueries({ queryKey: commentKeys.detail(id) });
      
      // Invalider la liste des commentaires de l'article
      queryClient.invalidateQueries({ 
        queryKey: commentKeys.list(articleId) 
      });
      
      // Invalider le count des commentaires
      queryClient.invalidateQueries({ 
        queryKey: commentKeys.count(articleId) 
      });
      
      // Invalider la liste des blogs pour mettre à jour le count
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      
      toast.success("Commentaire supprimé avec succès !");
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression du commentaire:", error);
      toast.error("Erreur lors de la suppression du commentaire");
    },
  });
}

// Reactions Query Keys
export const reactionKeys = {
  all: ['reactions'] as const,
  types: () => [...reactionKeys.all, 'types'] as const,
  articleReactions: (articleId: string) => [...reactionKeys.all, 'article', articleId] as const,
  commentReactions: (commentId: string) => [...reactionKeys.all, 'comment', commentId] as const,
  userArticleReaction: (articleId: string) => [...reactionKeys.all, 'user', 'article', articleId] as const,
  userCommentReaction: (commentId: string) => [...reactionKeys.all, 'user', 'comment', commentId] as const,
}

// Get all reaction types
export function useReactionTypes() {
  return useQuery({
    queryKey: reactionKeys.types(),
    queryFn: async () => {
      const response = await reactionsApi.getReactionTypes();
      return response.data;
    },
  });
}

// Get article reactions
export function useArticleReactions(articleId: string) {
  return useQuery({
    queryKey: reactionKeys.articleReactions(articleId),
    queryFn: async () => {
      const response = await reactionsApi.getArticleReactions(articleId);
      return response.data;
    },
    enabled: !!articleId,
  });
}

// Get comment reactions
export function useCommentReactions(commentId: string) {
  return useQuery({
    queryKey: reactionKeys.commentReactions(commentId),
    queryFn: async () => {
      const response = await reactionsApi.getCommentReactions(commentId);
      return response.data;
    },
    enabled: !!commentId,
  });
}

// Get user article reaction
export function useUserArticleReaction(articleId: string) {
  return useQuery({
    queryKey: reactionKeys.userArticleReaction(articleId),
    queryFn: async () => {
      const response = await reactionsApi.getUserArticleReaction(articleId);
      return response.data;
    },
    enabled: !!articleId,
  });
}

// Get user comment reaction
export function useUserCommentReaction(commentId: string) {
  return useQuery({
    queryKey: reactionKeys.userCommentReaction(commentId),
    queryFn: async () => {
      const response = await reactionsApi.getUserCommentReaction(commentId);
      return response.data;
    },
    enabled: !!commentId,
  });
}

// Toggle article reaction mutation
export function useToggleArticleReaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ToggleArticleReactionData) => {
      const response = await reactionsApi.toggleArticleReaction(data);
      return response.data;
    },
    onSuccess: (_result, variables) => {
      // Invalider les réactions de l'article
      queryClient.invalidateQueries({ 
        queryKey: reactionKeys.articleReactions(variables.articleId) 
      });
      
      // Invalider la réaction utilisateur de l'article
      queryClient.invalidateQueries({ 
        queryKey: reactionKeys.userArticleReaction(variables.articleId) 
      });
    },
    onError: (error) => {
      console.error("Erreur lors du toggle de la réaction:", error);
      toast.error("Erreur lors de la gestion de la réaction");
    },
  });
}

// Toggle comment reaction mutation
export function useToggleCommentReaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ToggleCommentReactionData) => {
      const response = await reactionsApi.toggleCommentReaction(data);
      return response.data;
    },
    onSuccess: (_result, variables) => {
      // Invalider les réactions du commentaire
      queryClient.invalidateQueries({ 
        queryKey: reactionKeys.commentReactions(variables.commentId) 
      });
      
      // Invalider la réaction utilisateur du commentaire
      queryClient.invalidateQueries({ 
        queryKey: reactionKeys.userCommentReaction(variables.commentId) 
      });
    },
    onError: (error) => {
      console.error("Erreur lors du toggle de la réaction:", error);
      toast.error("Erreur lors de la gestion de la réaction");
    },
  });
}

// Export types for convenience
export type { Blog, CreateBlogData, UpdateBlogData, Tag, Comment, CreateCommentData, UpdateCommentData, Reaction, ArticleReaction, CommentReaction, UserReaction, ToggleArticleReactionData, ToggleCommentReactionData };
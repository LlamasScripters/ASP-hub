// reactions.service.ts
import { eq, and, sql } from "drizzle-orm";
import { db } from "@/db/index.js";
import {
  reactions,
  articleReactions,
  commentReactions,
  users,
} from "@/db/schema.js";

export interface CreateArticleReactionData {
  articleId: string;
  authorId: string;
  reactionId: number;
}

export interface CreateCommentReactionData {
  commentId: string;
  authorId: string;
  reactionId: number;
}

export const reactionsService = {
  // Récupère tous les types de réactions disponibles
  async getAllReactionTypes() {
    return await db.select().from(reactions).orderBy(reactions.id);
  },

  // Récupère les réactions d'un article avec les comptes
  async getArticleReactions(articleId: string) {
    const result = await db
      .select({
        reactionId: reactions.id,
        logoLink: reactions.logoLink,
        count: sql<number>`count(${articleReactions.id})::int`,
      })
      .from(reactions)
      .leftJoin(
        articleReactions,
        and(
          eq(articleReactions.reactionId, reactions.id),
          eq(articleReactions.articleId, articleId)
        )
      )
      .groupBy(reactions.id, reactions.logoLink)
      .orderBy(reactions.id);

    return result;
  },

  // Récupère les réactions d'un commentaire avec les comptes
  async getCommentReactions(commentId: string) {
    const result = await db
      .select({
        reactionId: reactions.id,
        logoLink: reactions.logoLink,
        count: sql<number>`count(${commentReactions.id})::int`,
      })
      .from(reactions)
      .leftJoin(
        commentReactions,
        and(
          eq(commentReactions.reactionId, reactions.id),
          eq(commentReactions.commentId, commentId)
        )
      )
      .groupBy(reactions.id, reactions.logoLink)
      .orderBy(reactions.id);

    return result;
  },

  // Vérifie si un utilisateur a déjà réagi à un article
  async getUserArticleReaction(articleId: string, authorId: string) {
    const result = await db
      .select()
      .from(articleReactions)
      .where(
        and(
          eq(articleReactions.articleId, articleId),
          eq(articleReactions.authorId, authorId)
        )
      );

    return result[0] || null;
  },

  // Vérifie si un utilisateur a déjà réagi à un commentaire
  async getUserCommentReaction(commentId: string, authorId: string) {
    const result = await db
      .select()
      .from(commentReactions)
      .where(
        and(
          eq(commentReactions.commentId, commentId),
          eq(commentReactions.authorId, authorId)
        )
      );

    return result[0] || null;
  },

  // Ajoute ou met à jour une réaction sur un article
  async toggleArticleReaction(data: CreateArticleReactionData) {
    const existingReaction = await this.getUserArticleReaction(
      data.articleId,
      data.authorId
    );

    if (existingReaction) {
      if (existingReaction.reactionId === data.reactionId) {
        // Supprime la réaction si c'est la même
        await db
          .delete(articleReactions)
          .where(eq(articleReactions.id, existingReaction.id));
        return { action: "removed" };
      } else {
        // Met à jour la réaction si elle est différente
        const [updated] = await db
          .update(articleReactions)
          .set({ reactionId: data.reactionId })
          .where(eq(articleReactions.id, existingReaction.id))
          .returning();
        return { action: "updated", reaction: updated };
      }
    } else {
      // Crée une nouvelle réaction
      const [created] = await db
        .insert(articleReactions)
        .values(data)
        .returning();
      return { action: "created", reaction: created };
    }
  },

  // Ajoute ou met à jour une réaction sur un commentaire
  async toggleCommentReaction(data: CreateCommentReactionData) {
    const existingReaction = await this.getUserCommentReaction(
      data.commentId,
      data.authorId
    );

    if (existingReaction) {
      if (existingReaction.reactionId === data.reactionId) {
        // Supprime la réaction si c'est la même
        await db
          .delete(commentReactions)
          .where(eq(commentReactions.id, existingReaction.id));
        return { action: "removed" };
      } else {
        // Met à jour la réaction si elle est différente
        const [updated] = await db
          .update(commentReactions)
          .set({ reactionId: data.reactionId })
          .where(eq(commentReactions.id, existingReaction.id))
          .returning();
        return { action: "updated", reaction: updated };
      }
    } else {
      // Crée une nouvelle réaction
      const [created] = await db
        .insert(commentReactions)
        .values(data)
        .returning();
      return { action: "created", reaction: created };
    }
  },

  // Supprime une réaction d'article
  async removeArticleReaction(articleId: string, authorId: string) {
    await db
      .delete(articleReactions)
      .where(
        and(
          eq(articleReactions.articleId, articleId),
          eq(articleReactions.authorId, authorId)
        )
      );
  },

  // Supprime une réaction de commentaire
  async removeCommentReaction(commentId: string, authorId: string) {
    await db
      .delete(commentReactions)
      .where(
        and(
          eq(commentReactions.commentId, commentId),
          eq(commentReactions.authorId, authorId)
        )
      );
  },
};
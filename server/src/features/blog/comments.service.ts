import { eq, and, desc, isNull } from "drizzle-orm";
import { db } from "../../db/index.js";
import { comments, users, type InsertComment, type SelectComment } from "../../db/schema.js";

export interface CreateCommentData {
  articleId: string;
  authorId: string;
  content: string;
}

export interface UpdateCommentData {
  content?: string;
  state?: 'published' | 'archived';
}

export interface CommentWithAuthor extends SelectComment {
  author: {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    image?: string | null;
  };
}

export class CommentsService {
  async getCommentsByArticleId(articleId: string): Promise<CommentWithAuthor[]> {
    const result = await db
      .select({
        id: comments.id,
        articleId: comments.articleId,
        authorId: comments.authorId,
        content: comments.content,
        state: comments.state,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
        deletedAt: comments.deletedAt,
        // Données de l'auteur
        authorName: users.name,
        authorFirstName: users.firstName,
        authorLastName: users.lastName,
        authorImage: users.image,
      })
      .from(comments)
      .innerJoin(users, eq(comments.authorId, users.id))
      .where(
        and(
          eq(comments.articleId, articleId),
          eq(comments.state, 'published'),
          isNull(comments.deletedAt)
        )
      )
      .orderBy(desc(comments.createdAt));

    return result.map(row => ({
      id: row.id,
      articleId: row.articleId,
      authorId: row.authorId,
      content: row.content,
      state: row.state,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
      author: {
        id: row.authorId,
        name: row.authorName,
        firstName: row.authorFirstName,
        lastName: row.authorLastName,
        image: row.authorImage,
      }
    }));
  }

  async getCommentById(id: string): Promise<CommentWithAuthor | undefined> {
    const result = await db
      .select({
        id: comments.id,
        articleId: comments.articleId,
        authorId: comments.authorId,
        content: comments.content,
        state: comments.state,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
        deletedAt: comments.deletedAt,
        // Données de l'auteur
        authorName: users.name,
        authorFirstName: users.firstName,
        authorLastName: users.lastName,
        authorImage: users.image,
      })
      .from(comments)
      .innerJoin(users, eq(comments.authorId, users.id))
      .where(
        and(
          eq(comments.id, id),
          isNull(comments.deletedAt)
        )
      )
      .limit(1);

    if (result.length === 0) return undefined;

    const row = result[0];
    return {
      id: row.id,
      articleId: row.articleId,
      authorId: row.authorId,
      content: row.content,
      state: row.state,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
      author: {
        id: row.authorId,
        name: row.authorName,
        firstName: row.authorFirstName,
        lastName: row.authorLastName,
        image: row.authorImage,
      }
    };
  }

  async createComment(commentData: CreateCommentData): Promise<SelectComment> {
    const result = await db
      .insert(comments)
      .values({
        ...commentData,
        state: 'published',
      })
      .returning();

    return result[0];
  }

  async updateComment(id: string, commentData: UpdateCommentData): Promise<SelectComment | undefined> {
    const result = await db
      .update(comments)
      .set({
        ...commentData,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(comments.id, id),
          isNull(comments.deletedAt)
        )
      )
      .returning();

    return result[0];
  }

  async deleteComment(id: string): Promise<boolean> {
    const result = await db
      .update(comments)
      .set({
        deletedAt: new Date(),
      })
      .where(eq(comments.id, id))
      .returning();

    return result.length > 0;
  }

  async getCommentsCountByArticleId(articleId: string): Promise<number> {
    const result = await db
      .select()
      .from(comments)
      .where(
        and(
          eq(comments.articleId, articleId),
          eq(comments.state, 'published'),
          isNull(comments.deletedAt)
        )
      );

    return result.length;
  }

  // ADMIN METHODS

  async getAllCommentsByArticleId(articleId: string): Promise<CommentWithAuthor[]> {
    const result = await db
      .select({
        id: comments.id,
        articleId: comments.articleId,
        authorId: comments.authorId,
        content: comments.content,
        state: comments.state,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
        deletedAt: comments.deletedAt,
        // Données de l'auteur
        authorName: users.name,
        authorFirstName: users.firstName,
        authorLastName: users.lastName,
        authorImage: users.image,
      })
      .from(comments)
      .innerJoin(users, eq(comments.authorId, users.id))
      .where(
        and(
          eq(comments.articleId, articleId),
          isNull(comments.deletedAt)
        )
      )
      .orderBy(desc(comments.createdAt));

    return result.map(row => ({
      id: row.id,
      articleId: row.articleId,
      authorId: row.authorId,
      content: row.content,
      state: row.state,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
      author: {
        id: row.authorId,
        name: row.authorName,
        firstName: row.authorFirstName,
        lastName: row.authorLastName,
        image: row.authorImage,
      }
    }));
  }

  async getAllComments(): Promise<CommentWithAuthor[]> {
    const result = await db
      .select({
        id: comments.id,
        articleId: comments.articleId,
        authorId: comments.authorId,
        content: comments.content,
        state: comments.state,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
        deletedAt: comments.deletedAt,
        // Données de l'auteur
        authorName: users.name,
        authorFirstName: users.firstName,
        authorLastName: users.lastName,
        authorImage: users.image,
      })
      .from(comments)
      .innerJoin(users, eq(comments.authorId, users.id))
      .where(isNull(comments.deletedAt))
      .orderBy(desc(comments.createdAt));

    return result.map(row => ({
      id: row.id,
      articleId: row.articleId,
      authorId: row.authorId,
      content: row.content,
      state: row.state,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
      author: {
        id: row.authorId,
        name: row.authorName,
        firstName: row.authorFirstName,
        lastName: row.authorLastName,
        image: row.authorImage,
      }
    }));
  }
}

export const commentsService = new CommentsService();
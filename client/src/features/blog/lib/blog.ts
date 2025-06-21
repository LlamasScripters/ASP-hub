// lib/api/blog.ts
import type { ArticleState } from "../../../../../server/src/db/schema";

export interface Blog {
	id: string;
	title: string;
	headerImage: string | null;
	content: string;
	state: ArticleState;
	createdAt: string;
	updatedAt: string;
	publishedAt: string | null;
	authorId: string;
	commentsEnabled: boolean;
	deletedAt: string | null;
	author?: {
		id: string;
		name: string;
		firstName: string;
		lastName: string;
		image?: string | null;
	};
	tags?: {
		id: number;
		name: string;
	}[];
	commentsCount?: number;
}

export interface CreateBlogData {
	title: string;
	content: string;
	headerImage?: string;
	state?: ArticleState;
	authorId: string;
	tags?: string[];
	commentsEnabled?: boolean;
}

export interface UpdateBlogData {
	title?: string;
	content?: string;
	headerImage?: string;
	state?: ArticleState;
	tags?: string[];
	commentsEnabled?: boolean;
}

export interface BlogLoaderData {
	blogs: Blog[];
}

export interface BlogDetailLoaderData {
	blog: Blog;
}

export interface Tag {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
}

export interface CreateTagData {
	name: string;
}

export interface UpdateTagData {
	name?: string;
}

export interface Comment {
	id: string;
	articleId: string;
	authorId: string;
	content: string;
	state: "published" | "archived";
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	author: {
		id: string;
		name: string;
		firstName: string;
		lastName: string;
		image?: string | null;
	};
}

export interface CreateCommentData {
	articleId: string;
	authorId: string;
	content: string;
}

export interface UpdateCommentData {
	content?: string;
	state?: "published" | "archived";
}

export interface Reaction {
	id: number;
	logoLink: string;
}

export interface ArticleReaction {
	reactionId: number;
	logoLink: string;
	count: number;
}

export interface CommentReaction {
	reactionId: number;
	logoLink: string;
	count: number;
}

export interface UserReaction {
	id: string;
	articleId?: string;
	commentId?: string;
	authorId: string;
	reactionId: number;
	createdAt: string;
}

export interface ToggleArticleReactionData {
	articleId: string;
	reactionId: number;
}

export interface ToggleCommentReactionData {
	commentId: string;
	reactionId: number;
}

export class BlogApi {
	private baseUrl = "/api/articles";

	async getBlogs(): Promise<{ data: Blog[] }> {
		const response = await fetch(this.baseUrl);
		if (!response.ok) {
			throw new Error("Failed to fetch blogs");
		}
		const data = await response.json();
		return { data };
	}

	async getBlog(id: string): Promise<{ data: Blog }> {
		const response = await fetch(`${this.baseUrl}/${id}`);
		if (!response.ok) {
			throw new Error("Failed to fetch blog");
		}
		const data = await response.json();
		return { data };
	}

	async createBlog(blogData: CreateBlogData): Promise<{ data: Blog }> {
		const response = await fetch(this.baseUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(blogData),
		});

		if (!response.ok) {
			throw new Error("Failed to create blog");
		}

		const data = await response.json();
		return { data };
	}

	async updateBlog(
		id: string,
		blogData: UpdateBlogData,
	): Promise<{ data: Blog }> {
		const response = await fetch(`${this.baseUrl}/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(blogData),
		});

		if (!response.ok) {
			throw new Error("Failed to update blog");
		}

		const data = await response.json();
		return { data };
	}

	async deleteBlog(id: string): Promise<void> {
		const response = await fetch(`${this.baseUrl}/${id}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error("Failed to delete blog");
		}
	}
}

export class TagsApi {
	private baseUrl = "/api/tags";

	async getTags(): Promise<{ data: Tag[] }> {
		const response = await fetch(this.baseUrl);
		if (!response.ok) {
			throw new Error("Failed to fetch tags");
		}
		const data = await response.json();
		return { data };
	}

	async getTagById(id: number): Promise<{ data: Tag }> {
		const response = await fetch(`${this.baseUrl}/${id}`);
		if (!response.ok) {
			throw new Error("Failed to fetch tag");
		}
		const data = await response.json();
		return { data };
	}

	async createTag(tagData: CreateTagData): Promise<{ data: Tag }> {
		const response = await fetch(this.baseUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(tagData),
		});

		if (!response.ok) {
			throw new Error("Failed to create tag");
		}

		const data = await response.json();
		return { data };
	}

	async updateTag(id: number, tagData: UpdateTagData): Promise<{ data: Tag }> {
		const response = await fetch(`${this.baseUrl}/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(tagData),
		});

		if (!response.ok) {
			throw new Error("Failed to update tag");
		}

		const data = await response.json();
		return { data };
	}

	async deleteTag(id: number): Promise<void> {
		const response = await fetch(`${this.baseUrl}/${id}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error("Failed to delete tag");
		}
	}

	async searchTags(query: string): Promise<{ data: Tag[] }> {
		const response = await fetch(
			`${this.baseUrl}/search?q=${encodeURIComponent(query)}`,
		);
		if (!response.ok) {
			throw new Error("Failed to search tags");
		}
		const data = await response.json();
		return { data };
	}
}

export class CommentsApi {
	private baseUrl = "/api/comments";

	async getCommentsByArticleId(
		articleId: string,
	): Promise<{ data: Comment[] }> {
		const response = await fetch(`${this.baseUrl}/article/${articleId}`);
		if (!response.ok) {
			throw new Error("Failed to fetch comments");
		}
		const data = await response.json();
		return { data };
	}

	async getCommentById(id: string): Promise<{ data: Comment }> {
		const response = await fetch(`${this.baseUrl}/${id}`);
		if (!response.ok) {
			throw new Error("Failed to fetch comment");
		}
		const data = await response.json();
		return { data };
	}

	async createComment(
		commentData: CreateCommentData,
	): Promise<{ data: Comment }> {
		const response = await fetch(this.baseUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(commentData),
		});

		if (!response.ok) {
			throw new Error("Failed to create comment");
		}

		const data = await response.json();
		return { data };
	}

	async updateComment(
		id: string,
		commentData: UpdateCommentData,
	): Promise<{ data: Comment }> {
		const response = await fetch(`${this.baseUrl}/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(commentData),
		});

		if (!response.ok) {
			throw new Error("Failed to update comment");
		}

		const data = await response.json();
		return { data };
	}

	async deleteComment(id: string): Promise<void> {
		const response = await fetch(`${this.baseUrl}/${id}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error("Failed to delete comment");
		}
	}

	async getCommentsCount(
		articleId: string,
	): Promise<{ data: { count: number } }> {
		const response = await fetch(`${this.baseUrl}/article/${articleId}/count`);
		if (!response.ok) {
			throw new Error("Failed to fetch comments count");
		}
		const data = await response.json();
		return { data };
	}
}

export class ReactionsApi {
	private baseUrl = "/api/reactions";

	async getReactionTypes(): Promise<{ data: Reaction[] }> {
		const response = await fetch(`${this.baseUrl}/types`);
		if (!response.ok) {
			throw new Error("Failed to fetch reaction types");
		}
		const result = await response.json();
		return { data: result.data };
	}

	async getArticleReactions(
		articleId: string,
	): Promise<{ data: ArticleReaction[] }> {
		const response = await fetch(`${this.baseUrl}/articles/${articleId}`);
		if (!response.ok) {
			throw new Error("Failed to fetch article reactions");
		}
		const result = await response.json();
		return { data: result.data };
	}

	async getCommentReactions(
		commentId: string,
	): Promise<{ data: CommentReaction[] }> {
		const response = await fetch(`${this.baseUrl}/comments/${commentId}`);
		if (!response.ok) {
			throw new Error("Failed to fetch comment reactions");
		}
		const result = await response.json();
		return { data: result.data };
	}

	async getUserArticleReaction(
		articleId: string,
	): Promise<{ data: UserReaction | null }> {
		const response = await fetch(`${this.baseUrl}/articles/${articleId}/user`, {
			credentials: "include",
		});
		if (!response.ok) {
			if (response.status === 401) {
				return { data: null };
			}
			throw new Error("Failed to fetch user article reaction");
		}
		const result = await response.json();
		return { data: result.data };
	}

	async getUserCommentReaction(
		commentId: string,
	): Promise<{ data: UserReaction | null }> {
		const response = await fetch(`${this.baseUrl}/comments/${commentId}/user`, {
			credentials: "include",
		});
		if (!response.ok) {
			if (response.status === 401) {
				return { data: null };
			}
			throw new Error("Failed to fetch user comment reaction");
		}
		const result = await response.json();
		return { data: result.data };
	}

	async toggleArticleReaction(
		data: ToggleArticleReactionData,
	): Promise<{ data: any }> {
		const response = await fetch(`${this.baseUrl}/articles`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error("Failed to toggle article reaction");
		}

		const result = await response.json();
		return { data: result.data };
	}

	async toggleCommentReaction(
		data: ToggleCommentReactionData,
	): Promise<{ data: any }> {
		const response = await fetch(`${this.baseUrl}/comments`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error("Failed to toggle comment reaction");
		}

		const result = await response.json();
		return { data: result.data };
	}
}

export const blogApi = new BlogApi();
export const tagsApi = new TagsApi();
export const commentsApi = new CommentsApi();
export const reactionsApi = new ReactionsApi();

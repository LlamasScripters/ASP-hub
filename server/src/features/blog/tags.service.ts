import { and, desc, eq, isNull } from "drizzle-orm";
import { db } from "../../db/index.js";
import { type InsertTag, type SelectTag, tags } from "../../db/schema.js";

export class TagsService {
	async getAllTags(): Promise<SelectTag[]> {
		return await db
			.select()
			.from(tags)
			.where(isNull(tags.deletedAt))
			.orderBy(desc(tags.createdAt));
	}

	async getTagById(id: number): Promise<SelectTag | undefined> {
		const result = await db
			.select()
			.from(tags)
			.where(and(eq(tags.id, id), isNull(tags.deletedAt)))
			.limit(1);

		return result[0];
	}

	async createTag(tagData: InsertTag): Promise<SelectTag> {
		const result = await db.insert(tags).values(tagData).returning();

		return result[0];
	}

	async updateTag(
		id: number,
		tagData: Partial<InsertTag>,
	): Promise<SelectTag | undefined> {
		const result = await db
			.update(tags)
			.set({
				...tagData,
				updatedAt: new Date(),
			})
			.where(and(eq(tags.id, id), isNull(tags.deletedAt)))
			.returning();

		return result[0];
	}

	async deleteTag(id: number): Promise<boolean> {
		const result = await db
			.update(tags)
			.set({
				deletedAt: new Date(),
			})
			.where(eq(tags.id, id))
			.returning();

		return result.length > 0;
	}

	async searchTags(query: string): Promise<SelectTag[]> {
		return await db
			.select()
			.from(tags)
			.where(and(eq(tags.name, query), isNull(tags.deletedAt)))
			.orderBy(desc(tags.createdAt));
	}
}

export const tagsService = new TagsService();

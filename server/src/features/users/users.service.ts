import type { InsertUser, SelectUser } from "@/db/schema.js";
import { users } from "@/db/schema.js";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";

export const usersService = {
	createUser: async (data: InsertUser) => {
		const [user] = await db.insert(users).values(data).returning();
		return user;
	},
	updateUser: async (id: string, data: Partial<SelectUser>) => {
		const [user] = await db
			.update(users)
			.set(data)
			.where(eq(users.id, id))
			.returning();
		return user;
	},
	getUser: async (id: string) => {},
};

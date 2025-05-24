import { users } from "@/db/schema.js";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";
import type { z } from "zod/v4";

export const userInsertSchema = createInsertSchema(users);
export const userSelectSchema = createSelectSchema(users);
export const userUpdateSchema = createUpdateSchema(users)
	.refine(
		(data) => {
			const isEmptyData = Object.keys(data).length === 0;

			if (isEmptyData) {
				return false;
			}

			return true;
		},
		{
			error: "At least one field is required",
			abort: true,
		},
	)
	.pick({
		firstName: true,
		lastName: true,
		email: true,
		dateOfBirth: true,
		acceptTerms: true,
		image: true,
	});

export type UserInsert = z.infer<typeof userInsertSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;

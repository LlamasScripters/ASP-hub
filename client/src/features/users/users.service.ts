import { api } from "@/lib/api";
import type { User } from "@backend/db/schema.js";

type UserUpdateBody = Partial<
	Pick<User, "firstName" | "lastName" | "email" | "dateOfBirth" | "image">
> & { id: string; password?: string };

export const usersService = {
	updateProfile: async (data: UserUpdateBody) => {
		const userUpdated = await api
			.patch(`/users/${data.id}`, {
				json: data,
			})
			.json<User>();

		return userUpdated;
	},
};

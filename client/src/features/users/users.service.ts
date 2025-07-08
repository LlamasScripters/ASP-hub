import { api } from "@/lib/api";

export const usersService = {
	uploadUserAvatar: async (userId: string, imageFile: File) => {
		const formData = new FormData();
		formData.append("image", imageFile);

		const response = await api
			.post(`users/${userId}/avatar`, {
				body: formData,
			})
			.json<{ image: string }>();

		return response.image;
	},
};

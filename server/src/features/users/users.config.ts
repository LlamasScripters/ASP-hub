import mime from "mime-types";

const userAvatarMimeTypes = [
	mime.types.jpg,
	mime.types.png,
	mime.types.jpeg,
	mime.types.webp,
];

export const usersConfig = {
	userAvatarMimeTypes,
} as const;

import type { Request } from "express";
import mime from "mime-types";
import multer from "multer";
import multerS3 from "multer-s3";
import { z } from "zod/v4";
import { s3Client } from "./s3.js";

// /api/users/79e91fd7-6971-4adf-998e-3da4879d1ff1/avatar
const userFolderSchema = z.templateLiteral([
	"/api/users/",
	z.uuid(),
	"/avatar",
]);

const folderMap = {
	users: (req: Request) => {
		const { success } = userFolderSchema.safeParse(req.originalUrl);
		return success;
	},
} as const;

export const upload = multer({
	storage: multerS3({
		s3: s3Client,
		bucket: process.env.S3_BUCKET,
		key: (req: Request, file, cb) => {
			let folder = "";

			if (folderMap.users(req)) {
				folder = "users";
				const userId = req.params.userId;
				cb(null, `${folder}/${userId}`);
			}
		},
		contentType: (req, file, cb) => {
			cb(null, file.mimetype);
		},
		contentDisposition: (req, file, cb) => {
			cb(null, "inline");
		},
	}),
});

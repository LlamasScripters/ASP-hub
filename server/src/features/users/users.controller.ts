import { auth, authConfig } from "@/lib/auth.js";
import { s3Client } from "@/lib/s3.js";
import { upload } from "@/lib/upload.js";
import { formatZodError } from "@/lib/zod.js";
import {
	requireOwnershipOrAdmin,
	requirePermissions,
} from "@/middleware/auth.middleware.js";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { fromNodeHeaders } from "better-auth/node";
import { Router } from "express";
import { z } from "zod/v4";
import { usersConfig } from "./users.config.js";

const usersRouter = Router();

const setUserPasswordBodySchema = z.object({
	newPassword: z.string().min(authConfig.MIN_PASSWORD_LENGTH),
});

// allow admin to set password for a user
usersRouter.post(
	"/:userId/set-password",
	requirePermissions("admin", { user: ["set-password"] }),
	async (req, res) => {
		const authHeaders = fromNodeHeaders(req.headers);
		const { data: body, error } = setUserPasswordBodySchema.safeParse(req.body);

		if (error) {
			res.status(422).json(formatZodError(error));
			return;
		}

		const { status } = await auth.api.setUserPassword({
			headers: authHeaders,
			body: {
				userId: req.params.userId,
				newPassword: body.newPassword,
			},
		});

		const statusCode = status ? 200 : 401;
		res.status(statusCode).json({
			status,
		});
		return;
	},
);

usersRouter.get("/:userId/avatar", async (req, res) => {
	const image = await s3Client.send(
		new GetObjectCommand({
			Bucket: process.env.S3_BUCKET,
			Key: `users/${req.params.userId}`,
		}),
	);

	const contentType = image.ContentType as string;
	const body = await image.Body?.transformToByteArray();

	res.setHeader("Content-Type", contentType);
	res.setHeader("Content-Length", image.ContentLength ?? 0);
	res.status(200).send(body);
	return;
});

// upload user avatar
usersRouter.post(
	"/:userId/avatar",
	requireOwnershipOrAdmin(),
	async (req, res, next) => {
		const uploader = await upload({
			key: `users/${req.params.userId}`,
			validMimeTypes: usersConfig.userAvatarMimeTypes,
		});

		return uploader.single("image")(req, res, next);
	},
	async (req, res) => {
		const image = req.file as Express.MulterS3.File | undefined;

		if (!image) {
			res.status(400).json({ error: "No image provided" });
			return;
		}

		const now = Date.now();
		// add a timestamp to the image url to avoid caching (aka cache busting)
		const imageUrl = `/api/users/${req.params.userId}/avatar?t=${now}`;

		res.status(201).json({ image: imageUrl, imageUrl });
		return;
	},
);

export default usersRouter;

import { Readable } from "node:stream";
import { ReadableStream } from "node:stream/web";
import { auth, authConfig } from "@/lib/auth.js";
import { s3Client } from "@/lib/s3.js";
import { upload } from "@/lib/upload.js";
import { formatZodError } from "@/lib/zod.js";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { fromNodeHeaders } from "better-auth/node";
import { Router } from "express";
import { z } from "zod/v4";

const usersRouter = Router();

const setUserPasswordBodySchema = z.object({
	newPassword: z.string().min(authConfig.MIN_PASSWORD_LENGTH),
});

// allow admin to set password for a user
usersRouter.post(
	"/:userId/set-password",
	async (req, res, next) => {
		const authHeaders = fromNodeHeaders(req.headers);

		const { success } = await auth.api.userHasPermission({
			headers: authHeaders,
			body: {
				role: "admin",
				permissions: {
					user: ["set-password"],
				},
			},
		});

		if (!success) {
			res.sendStatus(403);
			return;
		}

		next();
		return;
	},
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
	console.log(image.ContentType);
	console.log(image.ContentLength);
	const body = await image.Body?.transformToByteArray();

	res.setHeader("Content-Type", contentType);
	res.setHeader("Content-Length", image.ContentLength ?? 0);
	res.status(200).send(body);
	return;
});

// upload user avatar
usersRouter.post(
	"/:userId/avatar",
	async (req, res, next) => {
		const authHeaders = fromNodeHeaders(req.headers);
		const session = await auth.api.getSession({
			headers: authHeaders,
		});

		if (!session) {
			res.sendStatus(401);
			return;
		}

		const sessionUserId = session.user.id;
		const isAdmin = session.user.role === "admin";
		const userId = req.params.userId;

		const canUploadAvatar = isAdmin || sessionUserId === userId;

		if (!canUploadAvatar) {
			res.sendStatus(403);
			return;
		}

		next();
		return;
	},
	upload.single("image"),
	async (req, res) => {
		const image = req.file as Express.MulterS3.File | undefined;

		if (!image) {
			res.status(400).json({ error: "No image provided" });
			return;
		}

		res.status(200).json({ image: `/api/users/${req.params.userId}/avatar` });
		return;
	},
);

export default usersRouter;

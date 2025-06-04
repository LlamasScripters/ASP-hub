import { auth, authConfig } from "@/lib/auth.js";
import { formatZodError } from "@/lib/zod.js";
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

export default usersRouter;

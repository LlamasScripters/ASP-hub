import { auth } from "@/lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";
import type { NextFunction, Request, Response } from "express";

/**
 * Collection of predefined middlewares for common role-based access patterns
 * All based on Better Auth's userHasPermission API
 */

/**
 * Admin only - Can manage users
 */
export function requireAdminUserManagement() {
	return async (req: Request, res: Response, next: NextFunction) => {
		const authHeaders = fromNodeHeaders(req.headers);

		const { success } = await auth.api.userHasPermission({
			headers: authHeaders,
			body: {
				role: "admin",
				permissions: {
					user: ["create", "delete", "set-password", "set-role"],
				},
			},
		});

		if (!success) {
			res.status(403).json({ error: "Admin user management access required" });
			return;
		}

		next();
	};
}

/**
 * Section Manager or above - Can manage sections
 */
export function requireSectionManagement() {
	return async (req: Request, res: Response, next: NextFunction) => {
		const authHeaders = fromNodeHeaders(req.headers);
		const session = await auth.api.getSession({
			headers: authHeaders,
		});

		if (!session) {
			res.status(401).json({ error: "Authentication required" });
			return;
		}

		const userRole = session.user.role;

		// Admin or Section Manager can manage sections
		if (userRole === "admin" || userRole === "section_manager") {
			next();
			return;
		}

		res.status(403).json({
			error: "Section management access required",
			required: "section_manager or admin",
			current: userRole,
		});
	};
}

/**
 * Coach or above - Can manage sessions
 */
export function requireSessionManagement() {
	return async (req: Request, res: Response, next: NextFunction) => {
		const authHeaders = fromNodeHeaders(req.headers);
		const session = await auth.api.getSession({
			headers: authHeaders,
		});

		if (!session) {
			res.status(401).json({ error: "Authentication required" });
			return;
		}

		const userRole = session.user.role;

		// Admin, Section Manager, or Coach can manage sessions
		if (["admin", "section_manager", "coach"].includes(userRole || "")) {
			next();
			return;
		}

		res.status(403).json({
			error: "Session management access required",
			required: "coach or above",
			current: userRole,
		});
	};
}

/**
 * Member or above - Can make bookings
 */
export function requireMemberAccess() {
	return async (req: Request, res: Response, next: NextFunction) => {
		const authHeaders = fromNodeHeaders(req.headers);
		const session = await auth.api.getSession({
			headers: authHeaders,
		});

		if (!session) {
			res.status(401).json({ error: "Authentication required" });
			return;
		}

		const userRole = session.user.role;

		// All roles except basic "user" can access member features
		if (
			["admin", "section_manager", "coach", "member"].includes(userRole || "")
		) {
			next();
			return;
		}

		res.status(403).json({
			error: "Member access required",
			required: "member or above",
			current: userRole,
			message: "You need to be approved as a member to access this feature",
		});
	};
}

/**
 * Blog moderator - Can manage blog content
 */
export function requireBlogModeration() {
	return async (req: Request, res: Response, next: NextFunction) => {
		const authHeaders = fromNodeHeaders(req.headers);
		const session = await auth.api.getSession({
			headers: authHeaders,
		});

		if (!session) {
			res.status(401).json({ error: "Authentication required" });
			return;
		}

		const userRole = session.user.role;

		// Admin or coaches can moderate blog content
		if (["admin", "section_manager", "coach"].includes(userRole || "")) {
			next();
			return;
		}

		res.status(403).json({
			error: "Blog moderation access required",
			required: "coach or above",
			current: userRole,
		});
	};
}

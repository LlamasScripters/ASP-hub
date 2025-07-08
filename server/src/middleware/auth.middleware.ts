import { auth } from "@/lib/auth.js";
import type { UserRole } from "@/lib/roles.js";
import { hasRoleHierarchy } from "@/lib/roles.js";
import { fromNodeHeaders } from "better-auth/node";
import type { NextFunction, Request, Response } from "express";
import "@/types/express.js";

/**
 * Middleware to check if user is authenticated
 */
export async function requireAuth(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const authHeaders = fromNodeHeaders(req.headers);
	const session = await auth.api.getSession({
		headers: authHeaders,
	});

	if (!session) {
		res.status(401).json({ error: "Authentication required" });
		return;
	}

	// Attach session to request for later use
	req.session = session;
	next();
}

/**
 * Middleware to require admin role specifically
 * Uses Better Auth's userHasPermission API (compatible with your working example)
 */
export function requireAdmin() {
	return async (req: Request, res: Response, next: NextFunction) => {
		const authHeaders = fromNodeHeaders(req.headers);

		const { success } = await auth.api.userHasPermission({
			headers: authHeaders,
			body: {
				role: "admin",
				permissions: {
					user: ["set-password"], // Example admin permission
				},
			},
		});

		if (!success) {
			res.status(403).json({ error: "Admin access required" });
			return;
		}

		next();
	};
}

/**
 * Middleware to require a minimum role (hierarchical)
 * Uses session-based approach since Better Auth doesn't have built-in role hierarchy
 */
export function requireRole(minimumRole: UserRole) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const authHeaders = fromNodeHeaders(req.headers);
		const session = await auth.api.getSession({
			headers: authHeaders,
		});

		if (!session) {
			res.status(401).json({ error: "Authentication required" });
			return;
		}

		const userRole = session.user.role as UserRole;

		if (!hasRoleHierarchy(userRole, minimumRole)) {
			res.status(403).json({
				error: "Insufficient permissions",
				required: minimumRole,
				current: userRole,
			});
			return;
		}

		req.session = session;
		next();
	};
}

/**
 * Middleware to check if user can access their own resource or is admin
 * Follows the same pattern as your working avatar upload middleware
 */
export function requireOwnershipOrAdmin(userIdParam = "userId") {
	return async (req: Request, res: Response, next: NextFunction) => {
		const authHeaders = fromNodeHeaders(req.headers);
		const session = await auth.api.getSession({
			headers: authHeaders,
		});

		if (!session) {
			res.status(401).json({ error: "Authentication required" });
			return;
		}

		const sessionUserId = session.user.id;
		const isAdmin = session.user.role === "admin";
		const targetUserId = req.params[userIdParam];

		const hasAccess = isAdmin || sessionUserId === targetUserId;

		if (!hasAccess) {
			res
				.status(403)
				.json({ error: "Access denied: can only access own resources" });
			return;
		}

		req.session = session;
		next();
	};
}

/**
 * Middleware to require specific Better Auth permissions
 * Uses the exact same pattern as your working set-password route
 */
export function requirePermissions(
	role: "admin" | "user",
	permissions: Record<string, string[]>,
) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const authHeaders = fromNodeHeaders(req.headers);

		const { success } = await auth.api.userHasPermission({
			headers: authHeaders,
			body: {
				role,
				permissions,
			},
		});

		if (!success) {
			res.status(403).json({ error: "Permission denied" });
			return;
		}

		next();
	};
}

import { auth } from "@/lib/auth.js";
import {
	type Action,
	type Resource,
	hasPermission,
} from "@/lib/permissions.js";
import { UserRole } from "@/lib/roles.js";
import { fromNodeHeaders } from "better-auth/node";
import type { NextFunction, Request, Response } from "express";
import "@/types/express.js";

/**
 * Middleware to check custom application permissions
 * Uses our own permission system defined in lib/permissions.ts
 */
export function requireAppPermission(resource: Resource, action: Action) {
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

		// Check if user has the required permission
		if (!hasPermission(userRole, resource, action)) {
			res.status(403).json({
				error: "Permission denied",
				required: `${action} on ${resource}`,
				userRole: userRole,
			});
			return;
		}

		req.session = session;
		next();
	};
}

/**
 * Simple role-based access control for membership applications
 * Allows: admin, section_manager (as they can review applications)
 */
export function requireMembershipApplicationAccess() {
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

		// Allow admins and section managers to access membership applications
		if (userRole === UserRole.ADMIN || userRole === UserRole.SECTION_MANAGER) {
			req.session = session;
			next();
			return;
		}

		res.status(403).json({
			error: "Access denied",
			message: "Admin or section manager role required",
			userRole: userRole,
		});
	};
}

import { db } from "@/db/index.js";
import { sectionResponsibilities } from "@/db/schema.js";
import { auth } from "@/lib/auth.js";
import { UserRole } from "@/lib/roles.js";
import { fromNodeHeaders } from "better-auth/node";
import { and, eq } from "drizzle-orm";
import type { NextFunction, Request, Response } from "express";
import "@/types/express.js";

/**
 * Middleware to check if user has access to a specific section
 * Allows: Admin, Section Manager of this section
 */
export function requireSectionAccess(sectionIdParam = "sectionId") {
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
		const userId = session.user.id;
		const sectionId = req.params[sectionIdParam];

		// Admins have access to all sections
		if (userRole === UserRole.ADMIN) {
			req.session = session;
			next();
			return;
		}

		// Check if user is section manager of this section
		const responsibility = await db
			.select()
			.from(sectionResponsibilities)
			.where(
				and(
					eq(sectionResponsibilities.userId, userId),
					eq(sectionResponsibilities.sectionId, sectionId),
					eq(sectionResponsibilities.role, "section_manager"),
					eq(sectionResponsibilities.isActive, true),
				),
			)
			.limit(1);

		if (responsibility.length === 0) {
			res.status(403).json({
				error: "Access denied: insufficient section permissions",
				sectionId,
			});
			return;
		}

		req.session = session;
		next();
	};
}

/**
 * Middleware to check if user has access to a specific category
 * Allows: Admin, Section Manager of parent section, Coach of this category
 */
export function requireCategoryAccess(categoryIdParam = "categoryId") {
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
		const userId = session.user.id;
		const categoryId = req.params[categoryIdParam];

		// Admins have access to all categories
		if (userRole === UserRole.ADMIN) {
			req.session = session;
			next();
			return;
		}

		// Check if user has responsibility for this category or its section
		const responsibility = await db
			.select()
			.from(sectionResponsibilities)
			.where(
				and(
					eq(sectionResponsibilities.userId, userId),
					eq(sectionResponsibilities.isActive, true),
				),
			);

		const hasAccess = responsibility.some(
			(resp) =>
				// Section manager of parent section
				resp.role === "section_manager" ||
				// Coach of this specific category
				(resp.role === "coach" && resp.categoryId === categoryId),
		);

		if (!hasAccess) {
			res.status(403).json({
				error: "Access denied: insufficient category permissions",
				categoryId,
			});
			return;
		}

		req.session = session;
		next();
	};
}

/**
 * Middleware to check if user can manage members (approve/reject membership)
 * Allows: Admin, Section Manager, Coach
 */
export function requireMemberManagement() {
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

		// Check if user has management permissions
		if (
			![UserRole.ADMIN, UserRole.SECTION_MANAGER, UserRole.COACH].includes(
				userRole,
			)
		) {
			res.status(403).json({
				error: "Access denied: member management permissions required",
			});
			return;
		}

		req.session = session;
		next();
	};
}

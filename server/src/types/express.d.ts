/**
 * Global TypeScript type extensions for Express Request
 * This file extends the Express Request interface to include Better Auth session data
 */

declare global {
	namespace Express {
		interface Request {
			session?: {
				user: {
					id: string;
					role?: string | null;
					[key: string]: unknown;
				};
				session: {
					id: string;
					token: string;
					userId: string;
					expiresAt: Date;
					createdAt: Date;
					updatedAt: Date;
					ipAddress?: string | null;
					userAgent?: string | null;
					impersonatedBy?: string | null;
					[key: string]: unknown;
				};
			};
		}
	}
}

export {};

import { UserRole } from "@/lib/roles.js";
import { requireAuth, requireRole } from "@/middleware/auth.middleware.js";
import { requireMemberAccess } from "@/middleware/role-specific.middleware.js";
import { type Request, type Response, Router } from "express";
import { z } from "zod";
import { complexesService } from "./complexes.service.js";
import { roomsService } from "./rooms.service.js";

const complexesRouter = Router();

// Authentication required for all complex routes
complexesRouter.use(requireAuth);

const complexSchema = z.object({
	name: z.string().min(1).max(255),
	description: z.string().max(500),
	street: z.string().min(1).max(255),
	city: z.string().min(1).max(100),
	postalCode: z.string().min(5).max(20),
	numberOfElevators: z.number().int().min(0),
	accessibleForReducedMobility: z.boolean(),
	parkingCapacity: z.number().int().min(0),
	openingHours: z.record(
		z.enum([
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday",
			"sunday",
		]),
		z.object({
			open: z
				.string()
				.regex(/^\d{2}:\d{2}$/)
				.nullable(),
			close: z
				.string()
				.regex(/^\d{2}:\d{2}$/)
				.nullable(),
			closed: z.boolean(),
		}),
	),
});

const complexQuerySchema = z
	.object({
		page: z.string().optional(),
		limit: z.string().optional(),
	})
	.transform((data) => ({
		page: Number.parseInt(data.page || "1", 10),
		limit: Number.parseInt(data.limit || "20", 10),
	}));

const roomQuerySchema = z
	.object({
		page: z.string().optional(),
		limit: z.string().optional(),
	})
	.transform((data) => ({
		page: Number.parseInt(data.page || "1", 10),
		limit: Number.parseInt(data.limit || "20", 10),
	}));

// GET all complexes - Members can view complexes for booking
complexesRouter.get(
	"/",
	requireMemberAccess(),
	async (req: Request, res: Response) => {
		const query = complexQuerySchema.safeParse(req.query);
		if (!query.success) {
			res.status(400).json({ error: query.error.flatten() });
			return;
		}

		const { page, limit } = query.data;
		if (page < 1 || limit < 1) {
			res.status(400).json({ error: "Page and limit must be greater than 0" });
			return;
		}

		const complexes = await complexesService.getAllPaginated(page, limit);
		res.json(complexes);
	},
);

// GET complex by ID - Members can view complex details
complexesRouter.get(
	"/:id",
	requireMemberAccess(),
	async (req: Request, res: Response) => {
		const complex = await complexesService.getById(req.params.id);
		if (!complex) {
			res.status(404).json({ error: "Complex not found" });
			return;
		}
		res.json(complex);
	},
);

// GET rooms by complex - Members can view available rooms
complexesRouter.get(
	"/:id/rooms",
	requireMemberAccess(),
	async (req: Request, res: Response) => {
		const query = roomQuerySchema.safeParse(req.query);
		if (!query.success) {
			res.status(400).json({ error: query.error.flatten() });
			return;
		}

		const { page, limit } = query.data;
		if (page < 1 || limit < 1) {
			res.status(400).json({ error: "Page and limit must be greater than 0" });
			return;
		}

		const rooms = await roomsService.getByComplexIdPaginated(
			req.params.id,
			page,
			limit,
		);
		if (rooms.data.length === 0) {
			res.status(404).json({ error: "No rooms found for this complex" });
			return;
		}
		res.json(rooms);
	},
);

// POST new complex - Only admins can create complexes
complexesRouter.post(
	"/",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		const parse = complexSchema.safeParse(req.body);
		if (!parse.success) {
			res.status(400).json({ error: parse.error.flatten() });
			return;
		}
		const created = await complexesService.create(parse.data);
		res.status(201).json(created);
	},
);

// PUT update complex - Only admins can modify complexes
complexesRouter.put(
	"/:id",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		const parse = complexSchema.partial().safeParse(req.body);
		if (!parse.success) {
			res.status(400).json({ error: parse.error.flatten() });
			return;
		}
		const updated = await complexesService.update(req.params.id, parse.data);
		if (!updated) {
			res.status(404).json({ error: "Complex not found" });
			return;
		}
		res.json(updated);
	},
);

// DELETE complex - Only admins can delete complexes
complexesRouter.delete(
	"/:id",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		const complex = await complexesService.getById(req.params.id);
		if (!complex) {
			res.status(404).json({ error: "Complex not found" });
			return;
		}
		await complexesService.delete(req.params.id);
		res.status(200).json({ message: "Complex deleted successfully" });
	},
);

export default complexesRouter;

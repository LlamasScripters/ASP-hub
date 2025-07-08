import { UserRole } from "@/lib/roles.js";
import { requireAuth, requireRole } from "@/middleware/auth.middleware.js";
import { requireMemberAccess } from "@/middleware/role-specific.middleware.js";
import { type Request, type Response, Router } from "express";
import { z } from "zod";
import { complexesService } from "./complexes.service.js";
import { roomReservationsService } from "./roomReservations.service.js";
import { roomsService } from "./rooms.service.js";

const roomsRouter = Router();

// Authentication required for all room routes
roomsRouter.use(requireAuth);

const roomSchema = z.object({
	name: z.string().min(1).max(255),
	description: z.string().max(500),
	sportType: z.string().min(1).max(100),
	isIndoor: z.boolean(),
	accreditation: z.string().max(255).optional(),
	capacity: z.number().int().min(0),
	complexId: z.string().uuid(),
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

const roomQuerySchema = z
	.object({
		page: z.string().optional(),
		limit: z.string().optional(),
	})
	.transform((data) => ({
		page: Number.parseInt(data.page || "1", 10),
		limit: Number.parseInt(data.limit || "20", 10),
	}));

const roomReservationQuerySchema = z
	.object({
		startDate: z.string().optional(),
		endDate: z.string().optional(),
	})
	.transform((data) => ({
		startDate: data.startDate
			? new Date(data.startDate)
			: new Date(new Date().setDate(1)), // First day of current month
		endDate: data.endDate
			? new Date(data.endDate)
			: new Date(new Date().setMonth(new Date().getMonth() + 1)), // Last day of next month
	}));

// GET all rooms - Members can view rooms for booking
roomsRouter.get(
	"/",
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

		const rooms = await roomsService.getAllPaginated(page, limit);
		res.json(rooms);
	},
);

// GET room by ID - Members can view room details
roomsRouter.get(
	"/:id",
	requireMemberAccess(),
	async (req: Request, res: Response) => {
		const room = await roomsService.getById(req.params.id);
		if (!room) {
			res.status(404).json({ error: "Room not found" });
			return;
		}
		res.json(room);
	},
);

// GET room reservations - Members can view reservations for planning
roomsRouter.get(
	"/:id/roomReservations",
	requireMemberAccess(),
	async (req: Request, res: Response) => {
		const query = roomReservationQuerySchema.safeParse(req.query);
		if (!query.success) {
			res.status(400).json({ error: query.error.flatten() });
			return;
		}

		const { startDate, endDate } = query.data;
		if (startDate >= endDate) {
			res.status(400).json({ error: "Start date must be before end date" });
			return;
		}

		const room = await roomsService.getById(req.params.id);
		if (!room) {
			res.status(404).json({ error: "Room not found" });
			return;
		}

		const roomReservations =
			await roomReservationsService.getPaginatedByRoomAndDateRange(
				req.params.id,
				startDate,
				endDate,
			);
		res.json(roomReservations);
	},
);

// POST new room - Only admins can create rooms
roomsRouter.post(
	"/",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		const parse = roomSchema.safeParse(req.body);
		if (!parse.success) {
			res.status(400).json({ error: parse.error.flatten() });
			return;
		}

		const complex = await complexesService.getById(parse.data.complexId);
		if (!complex) {
			res.status(404).json({ error: "Complex not found" });
			return;
		}

		const created = await roomsService.create(parse.data);
		res.status(201).json(created);
	},
);

// PUT update room - Only admins can modify rooms
roomsRouter.put(
	"/:id",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		const parse = roomSchema.partial().safeParse(req.body);
		if (!parse.success) {
			res.status(400).json({ error: parse.error.flatten() });
			return;
		}

		const updated = await roomsService.update(req.params.id, parse.data);
		if (!updated) {
			res.status(404).json({ error: "Room not found" });
			return;
		}

		res.json(updated);
	},
);

// DELETE room - Only admins can delete rooms
roomsRouter.delete(
	"/:id",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		const room = await roomsService.getById(req.params.id);
		if (!room) {
			res.status(404).json({ error: "Room not found" });
			return;
		}

		await roomsService.delete(req.params.id);
		res.status(200).json({ message: "Room deleted successfully" });
	},
);

export default roomsRouter;

import { UserRole } from "@/lib/roles.js";
import { requireAuth, requireRole } from "@/middleware/auth.middleware.js";
import { requireMemberAccess } from "@/middleware/role-specific.middleware.js";
import { type Request, type Response, Router } from "express";
import { z } from "zod";
import { roomReservationsService } from "./roomReservations.service.js";

const roomReservationsRouter = Router();

// Authentication required for all room reservation routes
roomReservationsRouter.use(requireAuth);

const roomReservationSchema = z.object({
	title: z.string().min(1).max(255),
	startAt: z.coerce.date(),
	endAt: z.coerce.date(),
	roomId: z.string().uuid(),
	bookerId: z.string().uuid(),
	status: z.enum([
		"pending",
		"confirmed",
		"cancelled",
		"completed",
		"no_show",
		"rescheduled",
	]),
});

const roomReservationQuerySchema = z
	.object({
		startDate: z.string().optional(),
		endDate: z.string().optional(),
		page: z.string().optional(),
		limit: z.string().optional(),
	})
	.transform((data) => ({
		startDate: data.startDate
			? new Date(data.startDate)
			: new Date(new Date().setDate(1)), // First day of current month
		endDate: data.endDate
			? new Date(data.endDate)
			: new Date(new Date().setMonth(new Date().getMonth() + 1)), // Last day of next month
		page: Number.parseInt(data.page || "1", 10),
		limit: Number.parseInt(data.limit || "20", 10),
	}));

// GET all reservations - Only admins can view all reservations
roomReservationsRouter.get(
	"/",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		const roomReservations = await roomReservationsService.getAll();
		res.json(roomReservations);
	},
);

// GET reservation by ID - Owner or admin can view
roomReservationsRouter.get("/:id", async (req: Request, res: Response) => {
	const roomReservation = await roomReservationsService.getById(req.params.id);
	if (!roomReservation) {
		res.status(404).json({ error: "Room Reservation not found" });
		return;
	}

	// Check if user can access this reservation (owner or admin)
	const session = req.session;
	const isOwner = session?.user.id === roomReservation.bookerId;
	const isAdmin = session?.user.role === "admin";

	if (!isOwner && !isAdmin) {
		res
			.status(403)
			.json({ error: "Access denied: can only view own reservations" });
		return;
	}

	res.json(roomReservation);
});

// POST new reservation - Members can create reservations
roomReservationsRouter.post(
	"/",
	requireMemberAccess(),
	async (req: Request, res: Response) => {
		const parse = roomReservationSchema.safeParse(req.body);
		if (!parse.success) {
			res.status(400).json({ error: parse.error.flatten() });
			return;
		}

		const created = await roomReservationsService.create(parse.data);
		if (!created) {
			res
				.status(409)
				.json({ error: "Time slot is already reserved for this room" });
			return;
		}

		res.status(201).json(created);
	},
);

// PUT update reservation - Owner or admin can modify
roomReservationsRouter.put("/:id", async (req: Request, res: Response) => {
	// First check if reservation exists and get ownership info
	const existingReservation = await roomReservationsService.getById(
		req.params.id,
	);
	if (!existingReservation) {
		res.status(404).json({ error: "Room Reservation not found" });
		return;
	}

	// Check ownership
	const session = req.session;
	const isOwner = session?.user.id === existingReservation.bookerId;
	const isAdmin = session?.user.role === "admin";

	if (!isOwner && !isAdmin) {
		res
			.status(403)
			.json({ error: "Access denied: can only modify own reservations" });
		return;
	}

	const parse = roomReservationSchema.partial().safeParse(req.body);
	if (!parse.success) {
		res.status(400).json({ error: parse.error.flatten() });
		return;
	}

	const result = await roomReservationsService.update(
		req.params.id,
		parse.data,
	);

	if (result === "not_found") {
		res.status(404).json({ error: "Room Reservation not found" });
		return;
	}
	if (result === "conflict") {
		res.status(409).json({
			error: "Updated time slot conflicts with another room reservation",
		});
		return;
	}

	res.json(result);
});

// DELETE reservation - Owner or admin can delete
roomReservationsRouter.delete("/:id", async (req: Request, res: Response) => {
	const roomReservation = await roomReservationsService.getById(req.params.id);
	if (!roomReservation) {
		res.status(404).json({ error: "Room Reservation not found" });
		return;
	}

	// Check ownership
	const session = req.session;
	const isOwner = session?.user.id === roomReservation.bookerId;
	const isAdmin = session?.user.role === "admin";

	if (!isOwner && !isAdmin) {
		res
			.status(403)
			.json({ error: "Access denied: can only delete own reservations" });
		return;
	}

	await roomReservationsService.delete(req.params.id);
	res.status(200).json({ message: "Room Reservation deleted successfully" });
});

export default roomReservationsRouter;

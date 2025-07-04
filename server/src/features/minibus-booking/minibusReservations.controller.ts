import { UserRole } from "@/lib/roles.js";
import {
	requireAuth,
	requireOwnershipOrAdmin,
	requireRole,
} from "@/middleware/auth.middleware.js";
import {
	requireMemberAccess,
	requireSessionManagement,
} from "@/middleware/role-specific.middleware.js";
import { type Request, type Response, Router } from "express";
import { z } from "zod";
import { minibusReservationsService } from "./minibusReservations.service.js";

const minibusReservationsRouter = Router();

// Authentication required for all reservation routes
minibusReservationsRouter.use(requireAuth);

const minibusReservationSchema = z.object({
	title: z.string().min(1).max(255),
	startAt: z.coerce.date(),
	endAt: z.coerce.date(),
	minibusId: z.string().uuid(),
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

const minibusReservationQuerySchema = z
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
minibusReservationsRouter.get(
	"/",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		const minibusReservations = await minibusReservationsService.getAll();
		res.json(minibusReservations);
	},
);

// GET reservation by ID - Owner or admin can view
minibusReservationsRouter.get("/:id", async (req: Request, res: Response) => {
	const minibusReservation = await minibusReservationsService.getById(
		req.params.id,
	);
	if (!minibusReservation) {
		res.status(404).json({ error: "Minibus Reservation not found" });
		return;
	}

	// Check if user can access this reservation (owner or admin)
	const session = req.session;
	const isOwner = session?.user.id === minibusReservation.bookerId;
	const isAdmin = session?.user.role === "admin";

	if (!isOwner && !isAdmin) {
		res
			.status(403)
			.json({ error: "Access denied: can only view own reservations" });
		return;
	}

	res.json(minibusReservation);
});

// POST new reservation - Members can create reservations
minibusReservationsRouter.post(
	"/",
	requireSessionManagement(),
	async (req: Request, res: Response) => {
		const parse = minibusReservationSchema.safeParse(req.body);
		if (!parse.success) {
			res.status(400).json({ error: parse.error.flatten() });
			return;
		}

		const created = await minibusReservationsService.create(parse.data);
		if (!created) {
			res
				.status(409)
				.json({ error: "Time slot is already reserved for this minibus" });
			return;
		}

		res.status(201).json(created);
	},
);

// PUT update reservation - Owner or admin can modify
minibusReservationsRouter.put("/:id", async (req: Request, res: Response) => {
	// First check if reservation exists and get ownership info
	const existingReservation = await minibusReservationsService.getById(
		req.params.id,
	);
	if (!existingReservation) {
		res.status(404).json({ error: "Minibus Reservation not found" });
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

	const parse = minibusReservationSchema.partial().safeParse(req.body);
	if (!parse.success) {
		res.status(400).json({ error: parse.error.flatten() });
		return;
	}

	const result = await minibusReservationsService.update(
		req.params.id,
		parse.data,
	);

	if (result === "not_found") {
		res.status(404).json({ error: "Minibus Reservation not found" });
		return;
	}
	if (result === "conflict") {
		res.status(409).json({
			error: "Updated time slot conflicts with another minibus reservation",
		});
		return;
	}

	res.json(result);
});

// DELETE reservation - Owner or admin can delete
minibusReservationsRouter.delete(
	"/:id",
	async (req: Request, res: Response) => {
		const minibusReservation = await minibusReservationsService.getById(
			req.params.id,
		);
		if (!minibusReservation) {
			res.status(404).json({ error: "Minibus Reservation not found" });
			return;
		}

		// Check ownership
		const session = req.session;
		const isOwner = session?.user.id === minibusReservation.bookerId;
		const isAdmin = session?.user.role === "admin";

		if (!isOwner && !isAdmin) {
			res
				.status(403)
				.json({ error: "Access denied: can only delete own reservations" });
			return;
		}

		await minibusReservationsService.delete(req.params.id);
		res
			.status(200)
			.json({ message: "Minibus Reservation deleted successfully" });
	},
);

export default minibusReservationsRouter;

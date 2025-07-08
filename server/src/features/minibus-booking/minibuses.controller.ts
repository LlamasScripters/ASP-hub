import { UserRole } from "@/lib/roles.js";
import { requireAuth, requireRole } from "@/middleware/auth.middleware.js";
import { requireSessionManagement } from "@/middleware/role-specific.middleware.js";
import { type Request, type Response, Router } from "express";
import { z } from "zod";
import { minibusReservationsService } from "./minibusReservations.service.js";
import { minibusesService } from "./minibuses.service.js";

const minibusesRouter = Router();

minibusesRouter.use(requireAuth);

const minibusSchema = z.object({
	name: z.string().min(1).max(255),
	description: z.string().max(500),
	licensePlate: z.string().max(9),
	capacity: z.number().int().min(1),
	disabledPersonCapacity: z.number().int().min(0),
	disponibility: z.record(
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
			available: z.boolean(),
		}),
	),
	isAvailable: z.boolean(),
});

const minibusQuerySchema = z
	.object({
		page: z.string().optional(),
		limit: z.string().optional(),
	})
	.transform((data) => ({
		page: Number.parseInt(data.page || "1", 10),
		limit: Number.parseInt(data.limit || "20", 10),
	}));

const minibusReservationQuerySchema = z
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

// GET all minibuses - Members can view available minibuses
minibusesRouter.get(
	"/",
	requireSessionManagement(),
	async (req: Request, res: Response) => {
		const query = minibusQuerySchema.safeParse(req.query);
		if (!query.success) {
			res.status(400).json({ error: query.error.flatten() });
			return;
		}

		const { page, limit } = query.data;
		if (page < 1 || limit < 1) {
			res.status(400).json({ error: "Page and limit must be greater than 0." });
			return;
		}

		const minibuses = await minibusesService.getAllPaginated(page, limit);
		res.json(minibuses);
	},
);

// GET minibus by ID - Members can view specific minibus details
minibusesRouter.get(
	"/:id",
	requireSessionManagement(),
	async (req: Request, res: Response) => {
		const id = req.params.id;
		if (!id) {
			res.status(400).json({ error: "Minibus ID is required." });
			return;
		}

		const minibus = await minibusesService.getById(id);
		if (!minibus) {
			res.status(404).json({ error: "Minibus not found." });
			return;
		}
		res.json(minibus);
	},
);

// GET minibus reservations - Members can view reservations for planning
minibusesRouter.get(
	"/:id/minibusReservations",
	requireSessionManagement(),
	async (req: Request, res: Response) => {
		const query = minibusReservationQuerySchema.safeParse(req.query);
		if (!query.success) {
			res.status(400).json({ error: query.error.flatten() });
			return;
		}

		const { startDate, endDate } = query.data;
		if (startDate > endDate) {
			res.status(400).json({ error: "Start date must be before end date." });
			return;
		}

		const minibus = await minibusesService.getById(req.params.id);
		if (!minibus) {
			res.status(404).json({ error: "Minibus not found." });
			return;
		}
		const minibusReservations =
			await minibusReservationsService.getPaginatedByMinibusAndDateRange(
				req.params.id,
				startDate,
				endDate,
			);
		res.json(minibusReservations);
	},
);

// POST new minibus - Only admins can create minibuses
minibusesRouter.post(
	"/",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		const parse = minibusSchema.safeParse(req.body);
		if (!parse.success) {
			res.status(400).json({ error: parse.error.flatten() });
			return;
		}

		const created = await minibusesService.create(parse.data);
		res.status(201).json(created);
	},
);

// PUT update minibus - Only admins can modify minibuses
minibusesRouter.put(
	"/:id",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		const parse = minibusSchema.partial().safeParse(req.body);
		if (!parse.success) {
			res.status(400).json({ error: parse.error.flatten() });
			return;
		}

		const updated = await minibusesService.update(req.params.id, parse.data);
		if (!updated) {
			res.status(404).json({ error: "Minibus not found." });
			return;
		}

		res.json(updated);
	},
);

// DELETE minibus - Only admins can delete minibuses
minibusesRouter.delete(
	"/:id",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		const minibus = await minibusesService.getById(req.params.id);
		if (!minibus) {
			res.status(404).json({ error: "Minibus not found." });
			return;
		}

		await minibusesService.deleteById(req.params.id);
		res.status(200).json({ message: "Minibus deleted successfully." });
	},
);

export default minibusesRouter;

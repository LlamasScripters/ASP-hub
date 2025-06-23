import { type Request, type Response, Router } from "express";
import { z } from "zod";
import { complexesService } from "./complexes.service.js";
import { roomReservationsService } from "./roomReservations.service.js";
import { roomsService } from "./rooms.service.js";

const roomsRouter = Router();

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

const reservationQuerySchema = z
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

//@ts-ignore
roomsRouter.get("/", async (req: Request, res: Response) => {
	const query = roomQuerySchema.safeParse(req.query);
	if (!query.success) {
		return res.status(400).json({ error: query.error.flatten() });
	}

	const { page, limit } = query.data;
	if (page < 1 || limit < 1) {
		return res
			.status(400)
			.json({ error: "Page and limit must be greater than 0" });
	}

	const rooms = await roomsService.getAllPaginated(page, limit);
	return res.json(rooms);
});

//@ts-ignore
roomsRouter.get("/:id", async (req: Request, res: Response) => {
	const room = await roomsService.getById(req.params.id);
	if (!room) return res.status(404).json({ error: "Room not found" });
	return res.json(room);
});

//@ts-ignore
roomsRouter.get("/:id/reservations", async (req: Request, res: Response) => {
	const query = reservationQuerySchema.safeParse(req.query);
	if (!query.success) {
		return res.status(400).json({ error: query.error.flatten() });
	}

	const { startDate, endDate } = query.data;
	if (startDate >= endDate) {
		return res
			.status(400)
			.json({ error: "Start date must be before end date" });
	}

	const room = await roomsService.getById(req.params.id);
	if (!room) return res.status(404).json({ error: "Room not found" });

	const roomReservations = await roomReservationsService.getPaginatedByRoomAndDateRange(
		req.params.id,
		startDate,
		endDate,
	);
	return res.json(roomReservations);
});

//@ts-ignore
roomsRouter.post("/", async (req: Request, res: Response) => {
	const parse = roomSchema.safeParse(req.body);
	if (!parse.success)
		return res.status(400).json({ error: parse.error.flatten() });

	const complex = await complexesService.getById(parse.data.complexId);
	if (!complex) {
		return res.status(404).json({ error: "Complex not found" });
	}

	const created = await roomsService.create(parse.data);
	return res.status(201).json(created);
});

//@ts-ignore
roomsRouter.put("/:id", async (req: Request, res: Response) => {
	const parse = roomSchema.partial().safeParse(req.body);
	if (!parse.success)
		return res.status(400).json({ error: parse.error.flatten() });

	const updated = await roomsService.update(req.params.id, parse.data);
	if (!updated) return res.status(404).json({ error: "Room not found" });

	return res.json(updated);
});

//@ts-ignore
roomsRouter.delete("/:id", async (req: Request, res: Response) => {
	const room = await roomsService.getById(req.params.id);
	if (!room) return res.status(404).json({ error: "Room not found" });

	await roomsService.delete(req.params.id);
	return res.status(200).json({ message: "Room deleted successfully" });
});

export default roomsRouter;

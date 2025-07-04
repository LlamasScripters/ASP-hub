import { type Request, type Response, Router } from "express";
import { z } from "zod";
import { roomReservationsService } from "./roomReservations.service.js";

const roomReservationsRouter = Router();

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

//@ts-ignore
roomReservationsRouter.get("/", async (req: Request, res: Response) => {
	const roomReservations = await roomReservationsService.getAll();
	return res.json(roomReservations);
});

//@ts-ignore
roomReservationsRouter.get("/:id", async (req: Request, res: Response) => {
	const roomReservation = await roomReservationsService.getById(req.params.id);
	if (!roomReservation)
		return res.status(404).json({ error: "Room Reservation not found" });
	return res.json(roomReservation);
});

//@ts-ignore
roomReservationsRouter.post("/", async (req: Request, res: Response) => {
	const parse = roomReservationSchema.safeParse(req.body);
	if (!parse.success)
		return res.status(400).json({ error: parse.error.flatten() });

	const created = await roomReservationsService.create(parse.data);
	if (!created) {
		return res
			.status(409)
			.json({ error: "Time slot is already reserved for this room" });
	}

	return res.status(201).json(created);
});

//@ts-ignore
roomReservationsRouter.put("/:id", async (req: Request, res: Response) => {
	const parse = roomReservationSchema.partial().safeParse(req.body);
	if (!parse.success)
		return res.status(400).json({ error: parse.error.flatten() });

	const result = await roomReservationsService.update(
		req.params.id,
		parse.data,
	);

	if (result === "not_found") {
		return res.status(404).json({ error: "Room Reservation not found" });
	}
	if (result === "conflict") {
		return res.status(409).json({
			error: "Updated time slot conflicts with another room reservation",
		});
	}

	return res.json(result);
});

//@ts-ignore
roomReservationsRouter.delete("/:id", async (req: Request, res: Response) => {
	const roomReservation = await roomReservationsService.getById(req.params.id);
	if (!roomReservation)
		return res.status(404).json({ error: "Room Reservation not found" });

	await roomReservationsService.delete(req.params.id);
	return res
		.status(200)
		.json({ message: "Room Reservation deleted successfully" });
});

export default roomReservationsRouter;

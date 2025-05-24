import { Router, Request, Response } from "express";
import { z } from "zod";
import { reservationsService } from "./reservations.service.js";

const reservationsRouter = Router();

const reservationSchema = z.object({
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
		"rescheduled"
	])
});

//@ts-ignore
reservationsRouter.get("/", async (req: Request, res: Response) => {
	const data = await reservationsService.getAll();
	return res.json({ message: "List of reservations retrieved successfully", data });
});

//@ts-ignore
reservationsRouter.get("/:id", async (req: Request, res: Response) => {
	const reservation = await reservationsService.getById(req.params.id);
	if (!reservation) return res.status(404).json({ error: "Reservation not found" });
	return res.json({ message: "Reservation retrieved successfully", data: reservation });
});

//@ts-ignore
reservationsRouter.post("/", async (req: Request, res: Response) => {
	const parse = reservationSchema.safeParse(req.body);
	if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });

	const created = await reservationsService.create(parse.data);
	if (!created) {
		return res.status(409).json({ error: "Time slot is already reserved for this room" });
	}

	return res.status(201).json({ message: "Reservation created successfully", data: created });
});

//@ts-ignore
reservationsRouter.put("/:id", async (req: Request, res: Response) => {
	const parse = reservationSchema.partial().safeParse(req.body);
	if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });

	const result = await reservationsService.update(req.params.id, parse.data);

	if (result === "not_found") {
		return res.status(404).json({ error: "Reservation not found" });
	}
	if (result === "conflict") {
		return res.status(409).json({ error: "Updated time slot conflicts with another reservation" });
	}

	return res.json({ message: "Reservation updated successfully", data: result });
});

//@ts-ignore
reservationsRouter.delete("/:id", async (req: Request, res: Response) => {
	const reservation = await reservationsService.getById(req.params.id);
	if (!reservation) return res.status(404).json({ error: "Reservation not found" });

	await reservationsService.delete(req.params.id);
	return res.status(200).json({ message: "Reservation deleted successfully" });
});

export default reservationsRouter;
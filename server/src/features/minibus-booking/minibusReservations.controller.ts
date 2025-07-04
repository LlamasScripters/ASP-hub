import { type Request, type Response, Router } from "express";
import { z } from "zod";
import { minibusReservationsService } from "./minibusReservations.service.js";

const minibusReservationsRouter = Router();

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

//@ts-ignore
minibusReservationsRouter.get("/", async (req: Request, res: Response) => {
	const minibusReservations = await minibusReservationsService.getAll();
	return res.json(minibusReservations);
});

//@ts-ignore
minibusReservationsRouter.get("/:id", async (req: Request, res: Response) => {
	const minibusReservation = await minibusReservationsService.getById(
		req.params.id,
	);
	if (!minibusReservation)
		return res.status(404).json({ error: "Minibus Reservation not found" });
	return res.json(minibusReservation);
});

//@ts-ignore
minibusReservationsRouter.post("/", async (req: Request, res: Response) => {
	const parse = minibusReservationSchema.safeParse(req.body);
	if (!parse.success)
		return res.status(400).json({ error: parse.error.flatten() });

	const created = await minibusReservationsService.create(parse.data);
	if (!created) {
		return res
			.status(409)
			.json({ error: "Time slot is already reserved for this minibus" });
	}

	return res.status(201).json(created);
});

//@ts-ignore
minibusReservationsRouter.put("/:id", async (req: Request, res: Response) => {
	const parse = minibusReservationSchema.partial().safeParse(req.body);
	if (!parse.success)
		return res.status(400).json({ error: parse.error.flatten() });

	const result = await minibusReservationsService.update(
		req.params.id,
		parse.data,
	);

	if (result === "not_found") {
		return res.status(404).json({ error: "Minibus Reservation not found" });
	}
	if (result === "conflict") {
		return res.status(409).json({
			error: "Updated time slot conflicts with another minibus reservation",
		});
	}

	return res.json(result);
});

//@ts-ignore
minibusReservationsRouter.delete(
	"/:id",
	async (req: Request, res: Response) => {
		const minibusReservation = await minibusReservationsService.getById(
			req.params.id,
		);
		if (!minibusReservation)
			return res.status(404).json({ error: "Minibus Reservation not found" });

		await minibusReservationsService.delete(req.params.id);
		return res
			.status(200)
			.json({ message: "Minibus Reservation deleted successfully" });
	},
);

export default minibusReservationsRouter;

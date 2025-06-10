import { type Request, type Response, Router } from "express";
import { z } from "zod";
import { complexesService } from "./complexes.service.js";
import { roomsService } from "./rooms.service.js";
import { complexOpeningHoursService } from "./complexOpeningHours.service.js";

const complexesRouter = Router();

const complexSchema = z.object({
	name: z.string().min(1).max(255),
	description: z.string().max(500).optional(),
	street: z.string().min(1).max(255),
	city: z.string().min(1).max(100),
	postalCode: z.string().min(5).max(20),
	numberOfElevators: z.number().int().min(0),
	accessibleForReducedMobility: z.boolean(),
	parkingCapacity: z.number().int().min(0),
});

const complexOpeningHoursSchema = z.object({
  complexId: z.string().uuid(),
  dayOfWeek: z.enum([
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
	"sunday",
  ]),
  openAt: z.string().regex(/^\d{2}:\d{2}$/, "HH:mm"),
  closeAt: z.string().regex(/^\d{2}:\d{2}$/, "HH:mm"),
  isClosed: z.boolean().default(false),
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

// @ts-ignore
complexesRouter.get("/", async (req: Request, res: Response) => {
	const query = complexQuerySchema.safeParse(req.query);
	if (!query.success) {
		return res.status(400).json({ error: query.error.flatten() });
	}

	const { page, limit } = query.data;
	if (page < 1 || limit < 1) {
		return res
			.status(400)
			.json({ error: "Page and limit must be greater than 0" });
	}

	const complexes = await complexesService.getAllPaginated(page, limit);
	res.json(complexes);
});

//@ts-ignore
complexesRouter.get("/:id", async (req: Request, res: Response) => {
	const complex = await complexesService.getById(req.params.id);
	if (!complex) {
		return res.status(404).json({ error: "Complex not found" });
	}
	res.json(complex);
});

//@ts-ignore
complexesRouter.get("/:id/rooms", async (req: Request, res: Response) => {
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

	const rooms = await roomsService.getByComplexIdPaginated(
		req.params.id,
		page,
		limit,
	);
	if (rooms.data.length === 0) {
		return res.status(404).json({ error: "No rooms found for this complex" });
	}
	res.json(rooms);
});

//@ts-ignore
complexesRouter.get("/:id/opening-hours", async (req: Request, res: Response) => {
	const complex = await complexesService.getById(req.params.id);
	if (!complex) {
		return res.status(404).json({ error: "Complex not found" });
	}
	
	const openingHours = await complexOpeningHoursService.getByComplexId(req.params.id);
	if (openingHours.length === 0) {
		return res.status(404).json({ error: "No opening hours found for this complex" });
	}
	res.json(openingHours);
});

//@ts-ignore
complexesRouter.post("/", async (req: Request, res: Response) => {
	const parse = complexSchema.safeParse(req.body);
	if (!parse.success) {
		return res.status(400).json({ error: parse.error.flatten() });
	}
	const created = await complexesService.create(parse.data);
	res.status(201).json(created);
});

//@ts-ignore
complexesRouter.post("/:id/opening-hours", async (req: Request, res: Response) => {
	const parse = z.array(complexOpeningHoursSchema).safeParse(req.body);
	if (!parse.success) {
		return res.status(400).json({ error: parse.error.flatten() });
	}
	const complex = await complexesService.getById(req.params.id);
	if (!complex) {
		return res.status(404).json({ error: "Complex not found" });
	}

	const existingOpeningHours = await complexOpeningHoursService.getByComplexId(req.params.id);
	if (existingOpeningHours.length > 0) {
		return res.status(400).json({ error: "Opening hours already exist for this complex" });
	}

	const created = await complexOpeningHoursService.createMany(parse.data);
	if (created.length === 0) {
		return res.status(400).json({ error: "No opening hours created" });
	}
	res.status(201).json(created);
});

//@ts-ignore
complexesRouter.put("/:id", async (req: Request, res: Response) => {
	const parse = complexSchema.partial().safeParse(req.body);
	if (!parse.success) {
		return res.status(400).json({ error: parse.error.flatten() });
	}
	const updated = await complexesService.update(req.params.id, parse.data);
	if (!updated) {
		return res.status(404).json({ error: "Complex not found" });
	}
	res.json(updated);
});

//@ts-ignore
complexesRouter.put("/:id/opening-hours", async (req: Request, res: Response) => {
	const complex = await complexesService.getById(req.params.id);
	if (!complex) {
		return res.status(404).json({ error: "Complex not found" });
	}
	const parse = z.array(complexOpeningHoursSchema).safeParse(req.body);
	if (!parse.success) {
		return res.status(400).json({ error: parse.error.flatten() });
	}
	const updatedOpeningHours = await complexOpeningHoursService.updateMany(parse.data);
	if (updatedOpeningHours.length === 0) {
		return res.status(400).json({ error: "No opening hours updated" });
	}
	res.status(200).json(updatedOpeningHours);
});

//@ts-ignore
complexesRouter.delete("/:id", async (req: Request, res: Response) => {
	const complex = await complexesService.getById(req.params.id);
	if (!complex) {
		return res.status(404).json({ error: "Complex not found" });
	}
	await complexesService.delete(req.params.id);
	res.status(200).json({ message: "Complex deleted successfully" });
});

//@ts-ignore
complexesRouter.delete("/:id/opening-hours", async (req: Request, res: Response) => {
	const complex = await complexesService.getById(req.params.id);
	if (!complex) {
		return res.status(404).json({ error: "Complex not found" });
	}
	await complexOpeningHoursService.deleteByComplexId(req.params.id);
	res.status(204).end();
});

export default complexesRouter;

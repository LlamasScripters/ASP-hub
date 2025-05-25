import { type Request, type Response, Router } from "express";
import { z } from "zod";
import { complexesService } from "./complexes.service.js";
import { roomsService } from "./rooms.service.js";

const roomsRouter = Router();

const roomSchema = z.object({
	name: z.string().min(1).max(255),
	sportType: z.string().min(1).max(100),
	isIndoor: z.boolean(),
	accreditation: z.string().max(255).optional(),
	complexId: z.string().uuid(),
});

//@ts-ignore
roomsRouter.get("/", async (req: Request, res: Response) => {
	const rooms = await roomsService.getAll();
	return res.json(rooms);
});

//@ts-ignore
roomsRouter.get("/:id", async (req: Request, res: Response) => {
	const room = await roomsService.getById(req.params.id);
	if (!room) return res.status(404).json({ error: "Room not found" });
	return res.json(room);
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

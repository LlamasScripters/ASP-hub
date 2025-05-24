import { Router, Request, Response } from "express";
import { z } from "zod";
import { roomsService } from "./rooms.service.js";
import { complexesService } from "./complexes.service.js";

const roomsRouter = Router();

const roomSchema = z.object({
	name: z.string().min(1).max(100),
	sportType: z.string().min(1).max(100),
	isIndoor: z.boolean(),
	accreditation: z.string().max(255).optional(),
	complexId: z.string().uuid()
});

//@ts-ignore
roomsRouter.get("/", async (req: Request, res: Response) => {
	const rooms = await roomsService.getAll();
	return res.json({ message: "List of rooms retrieved successfully", data: rooms });
});

//@ts-ignore
roomsRouter.get("/:id", async (req: Request, res: Response) => {
	const room = await roomsService.getById(req.params.id);
	if (!room) return res.status(404).json({ error: "Room not found" });
	return res.json({ message: "Room retrieved successfully", data: room });
});

//@ts-ignore
roomsRouter.post("/", async (req: Request, res: Response) => {
	const parse = roomSchema.safeParse(req.body);
	if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });

    const complex = await complexesService.getById(parse.data.complexId);
    if (!complex) {
        return res.status(404).json({ error: "Complex not found" });
    }
    
	const created = await roomsService.create(parse.data);
	return res.status(201).json({ message: "Room created successfully", data: created });
});

//@ts-ignore
roomsRouter.put("/:id", async (req: Request, res: Response) => {
	const parse = roomSchema.partial().safeParse(req.body);
	if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });

	const updated = await roomsService.update(req.params.id, parse.data);
	if (!updated) return res.status(404).json({ error: "Room not found" });

	return res.json({ message: "Room updated successfully", data: updated });
});

//@ts-ignore
roomsRouter.delete("/:id", async (req: Request, res: Response) => {
	const room = await roomsService.getById(req.params.id);
	if (!room) return res.status(404).json({ error: "Room not found" });

	await roomsService.delete(req.params.id);
	return res.status(200).json({ message: "Room deleted successfully" });
});

export default roomsRouter;

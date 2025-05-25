import { type Request, type Response, Router } from "express";
import { z } from "zod";
import { complexesService } from "./complexes.service.js";

const complexesRouter = Router();

const complexSchema = z.object({
	name: z.string().min(1).max(100),
	street: z.string().min(1).max(100),
	city: z.string().min(1).max(100),
	postalCode: z.string().min(5).max(10),
	numberOfElevators: z.number().int().min(0),
	accessibleForReducedMobility: z.boolean(),
	parkingCapacity: z.number().int().min(0),
});

complexesRouter.get("/", async (req: Request, res: Response) => {
	const complexes = await complexesService.getAll();
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
complexesRouter.post("/", async (req: Request, res: Response) => {
	const parse = complexSchema.safeParse(req.body);
	if (!parse.success) {
		return res.status(400).json({ error: parse.error.flatten() });
	}
	const created = await complexesService.create(parse.data);
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
complexesRouter.delete("/:id", async (req: Request, res: Response) => {
	const complex = await complexesService.getById(req.params.id);
	if (!complex) {
		return res.status(404).json({ error: "Complex not found" });
	}
	await complexesService.delete(req.params.id);
	res.status(200).json({ message: "Complex deleted successfully" });
});

export default complexesRouter;

import { Router, Request, Response } from "express";
import { z } from "zod";
import { complexService } from "./complexes.service.js";

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
	const complexes = await complexService.getAll();
	res.json({
		message: "List of complexes retrieved successfully",
		data: complexes
	});
});

//@ts-ignore
complexesRouter.get("/:id", async (req: Request, res: Response) => {
	const complex = await complexService.getById(req.params.id);
	if (!complex) {
		return res.status(404).json({ error: "Complex not found" });
	}
	res.json({
		message: "Complex retrieved successfully",
		data: complex
	});
});

//@ts-ignore
complexesRouter.post("/", async (req: Request, res: Response) => {
	const parse = complexSchema.safeParse(req.body);
	if (!parse.success) {
		return res.status(400).json({ error: parse.error.flatten() });
	}
	const created = await complexService.create(parse.data);
	res.status(201).json({
		message: "Complex created successfully",
		data: created
	});
});

//@ts-ignore
complexesRouter.put("/:id", async (req: Request, res: Response) => {
	const parse = complexSchema.partial().safeParse(req.body);
	if (!parse.success) {
		return res.status(400).json({ error: parse.error.flatten() });
	}
	const updated = await complexService.update(req.params.id, parse.data);
	if (!updated) {
		return res.status(404).json({ error: "Complex not found" });
	}
	res.json({
		message: "Complex updated successfully",
		data: updated
	});
});

//@ts-ignore
complexesRouter.delete("/:id", async (req: Request, res: Response) => {
	const complex = await complexService.getById(req.params.id);
	if (!complex) {
		return res.status(404).json({ error: "Complex not found" });
	}
	await complexService.delete(req.params.id);
	res.status(200).json({
		message: "Complex deleted successfully"
	});
});

export default complexesRouter;

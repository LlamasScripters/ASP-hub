import { type Request, type Response, Router } from "express";
import { z } from "zod";
import { minibusesService } from "./minibuses.service.js";
import { minibusReservationsService } from "./minibusReservations.service.js";
import { min } from "drizzle-orm";

const minibusesRouter = Router();

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
    })
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

//@ts-ignore
minibusesRouter.get("/", async (req: Request, res: Response) => {
  const query = minibusQuerySchema.safeParse(req.query);
  if (!query.success) {
    return res.status(400).json({ error: query.error.flatten() });
  }

  const { page, limit } = query.data;
  if (page < 1 || limit < 1) {
    return res
      .status(400)
      .json({ error: "Page and limit must be greater than 0." });
  }

  const minibuses = await minibusesService.getAllPaginated(page, limit);
  return res.json(minibuses);
});

//@ts-ignore
minibusesRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Minibus ID is required." });
  }

  const minibus = await minibusesService.getById(id);
  if (!minibus) {
    return res.status(404).json({ error: "Minibus not found." });
  }
  return res.json(minibus);
});

//@ts-ignore
minibusesRouter.get("/:id/minibusReservations", async (req: Request, res: Response) => {
    const query = minibusReservationQuerySchema.safeParse(req.query);
    if (!query.success) {
      return res.status(400).json({ error: query.error.flatten() });
    }

    const { startDate, endDate } = query.data;
    if (startDate > endDate) {
      return res
        .status(400)
        .json({ error: "Start date must be before end date." });
    }

    const minibus = await minibusesService.getById(req.params.id);
    if (!minibus) {
      return res.status(404).json({ error: "Minibus not found." });
    }
    const minibusReservations =
      await minibusReservationsService.getPaginatedByMinibusAndDateRange(
        req.params.id,
        startDate,
        endDate
      );
    return res.json(minibusReservations);
  }
);

//@ts-ignore
minibusesRouter.post("/", async (req: Request, res: Response) => {
  const parse = minibusSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten() });
  }

  const created = await minibusesService.create(parse.data);
  return res.status(201).json(created);
});

//@ts-ignore
minibusesRouter.put("/:id", async (req: Request, res: Response) => {
  const parse = minibusSchema.partial().safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten() });
  }

  const updated = await minibusesService.update(req.params.id, parse.data);
  if (!updated) {
    return res.status(404).json({ error: "Minibus not found." });
  }

  return res.json(updated);
});

//@ts-ignore
minibusesRouter.delete("/:id", async (req: Request, res: Response) => {
  const minibus = await minibusesService.getById(req.params.id);
  if (!minibus) {
    return res.status(404).json({ error: "Minibus not found." });
  }

  await minibusesService.deleteById(req.params.id);
  return res.status(200).json({ message: "Minibus deleted successfully." });
});

export default minibusesRouter;

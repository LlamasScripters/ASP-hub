import type { db } from "@/db/index.js";
import { DrizzleQueryError } from "drizzle-orm/errors";
import {
	type InsertMinibus,
	type SelectMinibus,
	minibuses,
} from "../../../schema.js";
import {
	ALTERNATIVE_MINIBUS_HOURS,
	STANDARD_MINIBUS_HOURS,
	type WeekSchedule,
} from "../../utils/openingHours.js";

const createMinibus = (
	name: string,
	licensePlate: string,
	capacity: number,
	disabledPersonCapacity: number,
	disponibility: WeekSchedule,
): InsertMinibus => ({
	name,
	description: "Minibus de l'ASP",
	licensePlate,
	capacity,
	disabledPersonCapacity,
	disponibility,
	isAvailable: true,
});

const minibusesData: InsertMinibus[] = [
	createMinibus("Minibus Standard", "AB-123-CD", 20, 2, STANDARD_MINIBUS_HOURS),
	createMinibus(
		"Minibus Alternatif",
		"EF-456-GH",
		15,
		1,
		ALTERNATIVE_MINIBUS_HOURS,
	),
	createMinibus(
		"Minibus Accessible",
		"IJ-789-KL",
		12,
		3,
		ALTERNATIVE_MINIBUS_HOURS,
	),
	createMinibus(
		"Minibus Familial",
		"MN-012-OP",
		8,
		0,
		ALTERNATIVE_MINIBUS_HOURS,
	),
	createMinibus(
		"Minibus Compact",
		"QR-345-ST",
		5,
		0,
		ALTERNATIVE_MINIBUS_HOURS,
	),
];

export async function seedMinibuses(
	database: typeof db,
): Promise<SelectMinibus[]> {
	console.log(`Insertion of ${minibusesData.length} minibuses...`);

	try {
		const insertedMinibuses = await database
			.insert(minibuses)
			.values(minibusesData)
			.onConflictDoNothing()
			.returning();

		console.log(`${insertedMinibuses.length} minibuses created successfully`);
		return insertedMinibuses;
	} catch (error) {
		if (
			error instanceof DrizzleQueryError &&
			error.cause &&
			"code" in error.cause &&
			error.cause.code === "23505"
		) {
			console.warn(
				"Minibus with license plate already exists, skipping insertion",
			);
		}
		console.error("Error during the insertion of minibuses:", error);
		throw error;
	}
}

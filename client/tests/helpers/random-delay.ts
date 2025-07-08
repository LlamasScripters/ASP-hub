import crypto from "node:crypto";

/**
 * Generate a random delay between min and max milliseconds
 */
export function randomDelay(
	{ min = 300, max = 1250 }: { min?: number; max?: number } = {
		min: 300,
		max: 1250,
	},
) {
	const randomInt = crypto.randomInt(min, max);
	return randomInt;
}

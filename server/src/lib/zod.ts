import type { z } from "zod";

export function formatZodError(error: z.ZodError): Record<string, string> {
	const errors = error.issues.reduce(
		(acc, err) => {
			const path = err.path.join(".");
			acc[path] = err.message;
			return acc;
		},
		{} as Record<string, string>,
	);

	return errors;
}

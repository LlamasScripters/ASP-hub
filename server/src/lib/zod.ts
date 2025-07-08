import { z } from "zod/v4";

type FormattedZodError = {
	root?: string;
} & {
	[key: string]: string | FormattedZodError;
};

export function formatZodError(error: z.ZodError): FormattedZodError {
	const errors = error.issues.reduce((acc, err) => {
		const path = err.path.length > 0 ? z.core.toDotPath(err.path) : "root";
		acc[path] = err.message;
		return acc;
	}, {} as FormattedZodError);

	return errors;
}

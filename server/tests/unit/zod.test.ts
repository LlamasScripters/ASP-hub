import * as assert from "node:assert";
import { describe, test } from "node:test";
import { z } from "zod/v4";
import { formatZodError } from "../../src/lib/zod.js";

describe("Zod Module", () => {
	test("should format simple validation error", () => {
		const schema = z.object({
			name: z.string().min(3, "Name must be at least 3 characters"),
			email: z.string().email("Invalid email format"),
		});

		const result = schema.safeParse({
			name: "ab",
			email: "invalid-email",
		});

		assert.strictEqual(result.success, false);

		if (!result.success) {
			const formatted = formatZodError(result.error);

			assert.strictEqual(typeof formatted, "object");
			assert.strictEqual(formatted.name, "Name must be at least 3 characters");
			assert.strictEqual(formatted.email, "Invalid email format");
		}
	});

	test("should format nested validation error", () => {
		const schema = z.object({
			user: z.object({
				profile: z.object({
					age: z.number().min(18, "Must be at least 18 years old"),
				}),
			}),
		});

		const result = schema.safeParse({
			user: {
				profile: {
					age: 15,
				},
			},
		});

		assert.strictEqual(result.success, false);

		if (!result.success) {
			const formatted = formatZodError(result.error);

			assert.strictEqual(typeof formatted, "object");
			assert.strictEqual(
				formatted["user.profile.age"],
				"Must be at least 18 years old",
			);
		}
	});

	test("should format array validation error", () => {
		const schema = z.object({
			tags: z.array(z.string().min(2, "Tag must be at least 2 characters")),
		});

		const result = schema.safeParse({
			tags: ["a", "valid-tag", "b"],
		});

		assert.strictEqual(result.success, false);

		if (!result.success) {
			const formatted = formatZodError(result.error);

			assert.strictEqual(typeof formatted, "object");
			// Check that we have error messages for invalid tags
			const errorKeys = Object.keys(formatted);
			assert.strictEqual(errorKeys.length > 0, true);

			// Check that at least one error message contains the expected text
			const errorMessages = Object.values(formatted);
			const hasExpectedMessage = errorMessages.some(
				(msg) =>
					typeof msg === "string" &&
					msg.includes("Tag must be at least 2 characters"),
			);
			assert.strictEqual(hasExpectedMessage, true);
		}
	});

	test("should handle root level error", () => {
		const schema = z.string().min(5, "String too short");

		const result = schema.safeParse("abc");

		assert.strictEqual(result.success, false);

		if (!result.success) {
			const formatted = formatZodError(result.error);

			assert.strictEqual(typeof formatted, "object");
			assert.strictEqual(formatted.root, "String too short");
		}
	});

	test("should handle empty error object", () => {
		const schema = z.object({
			name: z.string(),
		});

		const result = schema.safeParse({
			name: "valid name",
		});

		assert.strictEqual(result.success, true);

		if (result.success) {
			// This should not happen in practice, but testing the function
			const mockError = new z.ZodError([]);
			const formatted = formatZodError(mockError);

			assert.strictEqual(typeof formatted, "object");
			assert.strictEqual(Object.keys(formatted).length, 0);
		}
	});
});

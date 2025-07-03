import * as assert from "node:assert";
import { describe, test } from "node:test";
import {
	MIN_PASSWORD_STRENGTH,
	checkPasswordStrength,
} from "../../src/lib/password.js";

describe("Password Module", () => {
	test("should check password strength correctly", () => {
		// Test weak password
		const weakPassword = "123456";
		const weakResult = checkPasswordStrength(weakPassword);

		assert.strictEqual(typeof weakResult.score, "number");
		assert.strictEqual(typeof weakResult.isStrong, "boolean");
		assert.strictEqual(weakResult.isStrong, false);
		assert.strictEqual(weakResult.score < MIN_PASSWORD_STRENGTH, true);
	});

	test("should identify strong passwords", () => {
		// Test strong password
		const strongPassword = "MySecurePassword123!@#";
		const strongResult = checkPasswordStrength(strongPassword);

		assert.strictEqual(typeof strongResult.score, "number");
		assert.strictEqual(typeof strongResult.isStrong, "boolean");
		assert.strictEqual(strongResult.isStrong, true);
		assert.strictEqual(strongResult.score >= MIN_PASSWORD_STRENGTH, true);
	});

	test("should handle empty password", () => {
		const emptyPassword = "";
		const result = checkPasswordStrength(emptyPassword);

		assert.strictEqual(typeof result.score, "number");
		assert.strictEqual(typeof result.isStrong, "boolean");
		assert.strictEqual(result.isStrong, false);
	});

	test("should handle very long passwords", () => {
		const longPassword = `${"a".repeat(100)}A1!@#`;
		const result = checkPasswordStrength(longPassword);

		assert.strictEqual(typeof result.score, "number");
		assert.strictEqual(typeof result.isStrong, "boolean");
	});

	test("should have correct MIN_PASSWORD_STRENGTH constant", () => {
		assert.strictEqual(typeof MIN_PASSWORD_STRENGTH, "number");
		assert.strictEqual(MIN_PASSWORD_STRENGTH >= 0, true);
		assert.strictEqual(MIN_PASSWORD_STRENGTH <= 4, true);
	});
});

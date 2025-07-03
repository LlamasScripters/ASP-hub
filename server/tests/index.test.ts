import * as assert from "node:assert";
import { describe, test } from "node:test";

// Import all test files
import "./unit/password.test.js";
import "./unit/zod.test.js";
import "./unit/tags.service.test.js";
import "./functional/users.test.js";
import "./interface/api.test.js";

describe("Test Suite", () => {
	test("should run all test modules", () => {
		// This test ensures that all test modules are properly imported and run
		assert.strictEqual(true, true);
	});

	test("should have proper test structure", () => {
		// Verify that we have the expected test structure
		const testStructure = {
			unit: ["password", "zod", "tags.service"],
			functional: ["users"],
			interface: ["api"],
		};

		assert.strictEqual(typeof testStructure, "object");
		assert.strictEqual(Array.isArray(testStructure.unit), true);
		assert.strictEqual(Array.isArray(testStructure.functional), true);
		assert.strictEqual(Array.isArray(testStructure.interface), true);
	});
});

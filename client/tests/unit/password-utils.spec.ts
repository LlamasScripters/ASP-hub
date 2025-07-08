import { expect, test } from "@playwright/test";
import { checkPasswordStrength } from "../../src/lib/password";

test.describe("checkPasswordStrength", () => {
	test("reject a weak password", () => {
		const { isStrong } = checkPasswordStrength("123456");
		expect(isStrong).toBe(false);
	});

	test("accept a strong password", () => {
		const { isStrong } = checkPasswordStrength("MySecurePassword123!@#");
		expect(isStrong).toBe(true);
	});
});

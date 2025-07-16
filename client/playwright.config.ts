import {
	type PlaywrightTestConfig,
	defineConfig,
	devices,
} from "@playwright/test";

const baseUseOptions: NonNullable<
	PlaywrightTestConfig["projects"]
>[number]["use"] = {
	baseURL: "http://localhost:8080",
	trace: "on-first-retry",
	viewport: { width: 1200, height: 800 },
	screenshot: "only-on-failure",
	video: "retain-on-failure",
	navigationTimeout: 15000,
	actionTimeout: 10000,
	locale: "fr-FR",
	timezoneId: "Europe/Paris",
};

process.loadEnvFile(".env");

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	tsconfig: "./tsconfig.test.json",
	testDir: "./tests",
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry configuration - let Playwright handle retries instead of global setup polling */
	retries: process.env.CI ? 2 : 0, // More retries for flaky network conditions
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Timeout configuration */
	timeout: 30000, // 30s timeout per test
	expect: {
		/* Timeout for expect() assertions */
		timeout: 5000, // 5s timeout for assertions
	},
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [
		["html"],
		["junit", { outputFile: "test-results/junit.xml" }],
		["json", { outputFile: "test-results/results.json" }],
	],
	/* Authentication setup for parallel testing */
	projects: [
		// Setup projects for authentication
		{
			name: "setup",
			testMatch: /tests\/setup\/.*\.setup\.ts/, // Match all setup files in tests/setup folder
			use: {
				...devices["Desktop Chrome"],
				...baseUseOptions,
				trace: "off", // Disable tracing for setup tests
			},
		},
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
				...baseUseOptions,
			},
			dependencies: ["setup"],
		},
		{
			name: "firefox",
			use: {
				...devices["Desktop Firefox"],
				...baseUseOptions,
			},
			dependencies: ["setup"],
		},
		{
			name: "webkit",
			use: {
				...devices["Desktop Safari"],
				...baseUseOptions,
			},
			dependencies: ["setup"],
		},
	],
});

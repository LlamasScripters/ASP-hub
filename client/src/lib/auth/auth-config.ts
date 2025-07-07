export const authConfig = Object.freeze({
	sessionDuration: 300000 as const, // 300000ms = 5 minutes
	appRoles: Object.freeze([
		"user",
		"member",
		"coach",
		"section_manager",
		"admin",
	] as const),
	passwordMinLength: 12 as const,
});

export type AppRole = (typeof authConfig.appRoles)[number];

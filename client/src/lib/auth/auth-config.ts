export const authConfig = {
	sessionDuration: 5 * 60,
	appRoles: Object.freeze(["user", "admin"] as const),
	passwordMinLength: 12,
};

export type AppRole = (typeof authConfig.appRoles)[number];

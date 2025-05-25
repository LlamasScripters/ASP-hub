export const authConfig = {
	sessionDuration: 5 * 60,
	appRoles: Object.freeze(["user", "admin"] as const),
};

export type AppRole = (typeof authConfig.appRoles)[number];

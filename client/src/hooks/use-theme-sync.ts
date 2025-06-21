import type { UserLoggedIn } from "@/lib/auth/auth-client";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

interface UseThemeSyncProps {
	user: UserLoggedIn | null;
}

export function useThemeSync({ user }: UseThemeSyncProps) {
	const { setTheme, theme } = useTheme();
	const hasInitialized = useRef(false);
	const lastUserPreference = useRef<string | null>(null);

	useEffect(() => {
		if (user?.preferences) {
			try {
				const preferences =
					typeof user.preferences === "string"
						? JSON.parse(user.preferences)
						: user.preferences;

				const userTheme = preferences?.accessibility?.theme;

				if (userTheme && ["light", "dark", "auto"].includes(userTheme)) {
					const themeValue = userTheme === "auto" ? "system" : userTheme;

					if (!hasInitialized.current) {
						setTheme(themeValue);
						hasInitialized.current = true;
						lastUserPreference.current = userTheme;
					} else if (lastUserPreference.current !== userTheme) {
						if (theme !== themeValue) {
							setTheme(themeValue);
						}
						lastUserPreference.current = userTheme;
					}
				}
			} catch (error) {
				console.warn("Failed to parse user preferences for theme:", error);
			}
		}
	}, [user?.preferences, setTheme, theme]);
}

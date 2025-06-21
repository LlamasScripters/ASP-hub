import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getLoggedInUserQueryOptions } from "@/features/users/users.config";
import { type UserLoggedIn, authClient } from "@/lib/auth/auth-client";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

interface ThemeToggleProps {
	user?: UserLoggedIn;
}

export function ThemeToggle({ user }: ThemeToggleProps) {
	const { theme, setTheme } = useTheme();

	const updateThemeMutation = useMutation({
		mutationFn: async (newTheme: "light" | "dark" | "auto") => {
			// update theme in database
			const currentPreferences = user?.preferences
				? typeof user.preferences === "string"
					? JSON.parse(user.preferences)
					: user.preferences
				: {};

			const updatedPreferences = {
				...currentPreferences,
				accessibility: {
					...currentPreferences.accessibility,
					theme: newTheme,
				},
			};

			const { data } = await authClient.updateUser({
				preferences: JSON.stringify(updatedPreferences),
			});

			if (!data?.status) {
				throw new Error("Échec de la mise à jour du thème");
			}

			return newTheme;
		},
		onSuccess: () => {
			// Invalidate user query to refresh preferences
			queryClient.invalidateQueries(getLoggedInUserQueryOptions());
		},
		onError: (error) => {
			toast.error("Erreur lors du changement de thème");
			console.error("Theme update error:", error);
		},
	});

	const handleThemeChange = (newTheme: "light" | "dark" | "auto") => {
		const themeValue = newTheme === "auto" ? "system" : newTheme;
		setTheme(themeValue);

		updateThemeMutation.mutate(newTheme);
	};

	const getCurrentTheme = () => {
		if (user?.preferences) {
			try {
				const preferences =
					typeof user.preferences === "string"
						? JSON.parse(user.preferences)
						: user.preferences;
				return preferences?.accessibility?.theme || "auto";
			} catch {
				return "auto";
			}
		}
		return theme === "system" ? "auto" : theme;
	};

	const currentTheme = getCurrentTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="h-8 w-8">
					<SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Changer le thème</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() => handleThemeChange("light")}
					className={currentTheme === "light" ? "bg-accent" : ""}
				>
					<SunIcon className="mr-2 h-4 w-4" />
					<span>Clair</span>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => handleThemeChange("dark")}
					className={currentTheme === "dark" ? "bg-accent" : ""}
				>
					<MoonIcon className="mr-2 h-4 w-4" />
					<span>Sombre</span>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => handleThemeChange("auto")}
					className={currentTheme === "auto" ? "bg-accent" : ""}
				>
					<LaptopIcon className="mr-2 h-4 w-4" />
					<span>Automatique</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import NotFoundPage from "./-404";

export const Route = createRootRoute({
	component: () => (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<Outlet />
			<TanStackRouterDevtools />
			<Toaster visibleToasts={1} />
		</ThemeProvider>
	),
	notFoundComponent: NotFoundPage,
});

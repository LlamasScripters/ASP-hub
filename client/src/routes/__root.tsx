import { CookieConsent } from "@/components/blocks/cookie-consent";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { QueryClient } from "@tanstack/react-query";
import {
	HeadContent,
	Outlet,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import NotFoundPage from "./-404";

type RouterContext = {
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
	component: () => (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<HeadContent />
			<Outlet />
			<TanStackRouterDevtools position="bottom-right" />
			<Toaster visibleToasts={1} />
			<CookieConsent
				variant="mini"
				description="Pour assurer son bon fonctionnement, le site utilise des cookies. En continuant votre navigation, vous acceptez leur utilisation."
				learnMoreHref="/privacy"
			/>
		</ThemeProvider>
	),
	notFoundComponent: NotFoundPage,
});

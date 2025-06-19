import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const ReactCompilerConfig = {
	target: "19",
};

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		TanStackRouterVite({ autoCodeSplitting: true, quoteStyle: "double" }),
		viteReact({
			babel: {
				plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
			},
		}),
		tailwindcss(),
	],
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
			"@room-booking": resolve(__dirname, "./src/features/room-booking"),
		},
	},
	server: {
		host: true,
		port: 5173,
		strictPort: true,
		allowedHosts: ["client_upstream"],
	},
});

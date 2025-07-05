import { AdminRoute } from "@/components/guards/RouteGuards";
import { AdminSidebar } from "@/components/sidebar/AdminSidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/_admin")({
	component: AdminLayout,
});

function AdminLayout() {
	return (
		<AdminRoute>
			<AdminSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<h1 className="text-lg font-semibold">Panel d'administration</h1>
				</header>
				<main className="flex flex-1 flex-col gap-4 p-4">
					<Outlet />
				</main>
			</SidebarInset>
		</AdminRoute>
	);
}

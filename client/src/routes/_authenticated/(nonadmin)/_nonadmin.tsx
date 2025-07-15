import Footer from "@/components/Footer";
import { UserSidebar } from "@/components/sidebar/UserSidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/(nonadmin)/_nonadmin")({
	component: NonAdminLayout,
});

function NonAdminLayout() {
	return (
		<>
			<UserSidebar />
			<SidebarInset className="flex flex-col min-h-screen">
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<h1 className="text-lg font-semibold">ASP Hub</h1>
				</header>
				<main className="flex-1 p-4 overflow-auto md:p-6">
					<Outlet />
				</main>
				<Footer />
			</SidebarInset>
		</>
	);
}

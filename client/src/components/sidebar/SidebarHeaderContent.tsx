import { Link } from "@tanstack/react-router";
import Logo from "../Logo";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

export function SidebarHeaderContent({
	siteName = "ASP Hub",
}: {
	siteName?: string;
}) {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton asChild>
					<Link to="/">
						<Logo />
						<span className="text-lg font-bold">{siteName}</span>
					</Link>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

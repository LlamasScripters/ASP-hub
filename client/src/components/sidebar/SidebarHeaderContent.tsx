import { Link } from "@tanstack/react-router";
import Logo from "../Logo";
import { SidebarMenu, SidebarMenuButton } from "../ui/sidebar";

export function SidebarHeaderContent({
	siteName = "ASP Hub",
}: {
	siteName?: string;
}) {
	return (
		<SidebarMenu>
			<SidebarMenuButton asChild>
				<Link to="/">
					<Logo />
					<span className="text-lg font-bold">{siteName}</span>
				</Link>
			</SidebarMenuButton>
		</SidebarMenu>
	);
}

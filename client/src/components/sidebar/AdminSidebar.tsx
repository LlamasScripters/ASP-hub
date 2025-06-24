import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarRail,
} from "@/components/ui/sidebar";
import {
	Building2Icon,
	HomeIcon,
	RssIcon,
	ShieldIcon,
	UsersIcon,
	BusIcon,
} from "lucide-react";
import type * as React from "react";
import type { NavItemProps } from "./NavItem";
import NavItems from "./NavItems";
import { NavUser } from "./NavUser";
import { SidebarHeaderContent } from "./SidebarHeaderContent";

const navigationItems: NavItemProps[] = [
	{
		url: "/admin",
		title: "Accueil",
		IconComponent: HomeIcon,
	},
	{
		url: "/admin/users",
		title: "Utilisateurs",
		IconComponent: UsersIcon,
	},
	{
		url: "/admin/facilities/complexes",
		title: "Complexes",
		IconComponent: Building2Icon,
	},
	{
		url: "/admin/assets/minibuses",
		title: "Minibus",
		IconComponent: BusIcon,
	},
	{
		url: "/admin/dashboard/clubs",
		title: "Clubs",
		IconComponent: ShieldIcon,
	},
	{
		url: "/admin/blog",
		title: "Blog",
		IconComponent: RssIcon,
	},
];

export function AdminSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarHeaderContent siteName="ASP Hub - Admin" />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						<NavItems items={navigationItems} />
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

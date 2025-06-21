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
	CalendarIcon,
	HomeIcon,
	RssIcon,
	SettingsIcon,
	ShieldIcon,
	UsersIcon,
} from "lucide-react";
import type * as React from "react";
import { NavUser } from "../sidebar/NavUser";
import type { NavItemProps } from "./NavItem";
import NavItems from "./NavItems";
import { SidebarHeaderContent } from "./SidebarHeaderContent";

const navigationItems: NavItemProps[] = [
	{
		url: "/dashboard",
		title: "Tableau de bord",
		IconComponent: HomeIcon,
	},
	{
		url: "/dashboard/members",
		title: "Adhérents",
		IconComponent: UsersIcon,
	},
	{
		url: "/dashboard/activities",
		title: "Activités",
		IconComponent: CalendarIcon,
	},
	{
		url: "/dashboard/social",
		title: "Projets sociaux",
		IconComponent: ShieldIcon,
	},
	{
		url: "/dashboard/blog",
		title: "Blog",
		IconComponent: RssIcon,
	},
	{
		url: "/user/settings",
		title: "Paramètres",
		IconComponent: SettingsIcon,
	},
];

export function UserSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarHeaderContent siteName="ASP Hub" />
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

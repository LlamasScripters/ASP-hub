import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarRail,
} from "@/components/ui/sidebar";
import { Calendar, Home, Settings, Shield, Users } from "lucide-react";
import type * as React from "react";
import { NavUser } from "../sidebar/NavUser";
import type { NavItemProps } from "./NavItem";
import NavItems from "./NavItems";
import { SidebarHeaderContent } from "./SidebarHeaderContent";

const navigationItems: NavItemProps[] = [
	{
		url: "/dashboard",
		title: "Tableau de bord",
		IconComponent: Home,
	},
	{
		url: "/dashboard/members",
		title: "Adhérents",
		IconComponent: Users,
	},
	{
		url: "/dashboard/activities",
		title: "Activités",
		IconComponent: Calendar,
	},
	{
		url: "/dashboard/social",
		title: "Projets sociaux",
		IconComponent: Shield,
	},
	{
		url: "/user/settings",
		title: "Paramètres",
		IconComponent: Settings,
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

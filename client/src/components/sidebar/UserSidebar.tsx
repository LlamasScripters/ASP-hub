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
<<<<<<< HEAD
=======
import { Home, Users, Calendar, Shield, Settings, type LucideIcon, Rss  } from "lucide-react";
import { Link, useLocation, type LinkProps } from "@tanstack/react-router";
>>>>>>> 7721a2e (feat(navigation): add blog links to sidebar menus)

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
<<<<<<< HEAD
=======
	{
		url: "/dashboard/blog",
		title: "Blog",
		icon: Rss,
	},
>>>>>>> 7721a2e (feat(navigation): add blog links to sidebar menus)
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

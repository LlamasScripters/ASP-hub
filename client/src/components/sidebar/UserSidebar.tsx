import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { Link, type LinkProps, useLocation } from "@tanstack/react-router";
import {
	Calendar,
	Home,
	type LucideIconComponent,
	Settings,
	Shield,
	Users,
} from "lucide-react";
import type * as React from "react";
import { NavUser } from "../sidebar/NavUser";
import type { NavItemProps } from "./NavItem";
import NavItem from "./NavItem";
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
	// {
	// 	url: "/dashboard/finances",
	// 	title: "Finances",
	// 	IconComponent: CreditCard,
	// },
	// {
	// 	url: "/dashboard/reports",
	// 	title: "Rapports",
	// 	IconComponent: FileText,
	// },
	// {
	// 	url: "/dashboard/statistics",
	// 	title: "Statistiques",
	// 	IconComponent: BarChart3,
	// },
	// {
	// 	url: "/dashboard/",
	// 	title: "Messages",
	// 	IconComponent: MessageSquare,
	// },

	{
		url: "/user/settings",
		title: "Paramètres",
		IconComponent: Settings,
	},
];

export function UserSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const location = useLocation().pathname;

	return (
		<Sidebar collapsible="IconComponent" {...props}>
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

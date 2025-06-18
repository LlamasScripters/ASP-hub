import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { Link, type LinkProps, useLocation } from "@tanstack/react-router";
import {
	Calendar,
	Home,
	type LucideIcon,
	Settings,
	Shield,
	Users,
} from "lucide-react";
import type * as React from "react";
import { NavUser } from "../sidebar/NavUser";
import { SidebarHeaderContent } from "./SidebarHeaderContent";

type NavMainItem = {
	title: string;
	url: LinkProps["to"];
	icon: LucideIcon;
};

const navigationItems: NavMainItem[] = [
	{
		url: "/dashboard",
		title: "Tableau de bord",
		icon: Home,
	},
	{
		url: "/dashboard/members",
		title: "Adhérents",
		icon: Users,
	},
	{
		url: "/dashboard/activities",
		title: "Activités",
		icon: Calendar,
	},
	{
		url: "/dashboard/social",
		title: "Projets sociaux",
		icon: Shield,
	},
	// {
	// 	url: "/dashboard/finances",
	// 	title: "Finances",
	// 	icon: CreditCard,
	// },
	// {
	// 	url: "/dashboard/reports",
	// 	title: "Rapports",
	// 	icon: FileText,
	// },
	// {
	// 	url: "/dashboard/statistics",
	// 	title: "Statistiques",
	// 	icon: BarChart3,
	// },
	// {
	// 	url: "/dashboard/",
	// 	title: "Messages",
	// 	icon: MessageSquare,
	// },

	{
		url: "/user/settings",
		title: "Paramètres",
		icon: Settings,
	},
];

export function UserSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const location = useLocation().pathname;

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarHeaderContent siteName="ASP Hub" />
			</SidebarHeader>
			<SidebarContent>
				{navigationItems.map((item) => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton asChild isActive={location === item.url}>
							<Link to={item.url}>
								<item.icon />
								<span>{item.title}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

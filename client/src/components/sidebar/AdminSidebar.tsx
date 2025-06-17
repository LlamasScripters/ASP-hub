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
	Building2,
	HomeIcon,
	type LucideIcon,
	Shield,
	UsersIcon,
} from "lucide-react";
import type * as React from "react";
import NavItem, { type NavItemProps } from "./NavItem";
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
		IconComponent: Building2,
	},
	{
		url: "/admin/dashboard/clubs",
		title: "Clubs",
		IconComponent: Shield,
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

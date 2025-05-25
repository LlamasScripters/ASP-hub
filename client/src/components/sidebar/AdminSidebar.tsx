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
import { Building2, HomeIcon, type LucideIcon, Shield, UsersIcon } from "lucide-react";
import type * as React from "react";
import { NavUser } from "./NavUser";
import { SidebarHeaderContent } from "./SidebarHeaderContent";

type NavAdminContentItem = {
	url: LinkProps["to"];
	title: string;
	icon: LucideIcon;
};

const navigationItems: NavAdminContentItem[] = [
	{
		url: "/admin",
		title: "Accueil",
		icon: HomeIcon,
	},
	{
		url: "/admin/users",
		title: "Utilisateurs",
		icon: UsersIcon,
	},
	{
		url: "/admin/facilities/complexes",
		title: "Complexes",
		icon: Building2,
	},
	{
		url: "/admin/dashboard/clubs",
		title: "Clubs",
		icon: Shield
	}
];

export function AdminSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const location = useLocation().pathname;

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarHeaderContent siteName="ASP Hub - Admin" />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
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

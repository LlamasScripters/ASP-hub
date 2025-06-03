import { Link, type LinkProps } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

export type NavItemProps = {
	title: string;
	url: LinkProps["to"];
	IconComponent: LucideIcon;
	isActive?: boolean;
};

export default function NavItem({
	IconComponent,
	title,
	url,
	isActive = false,
}: NavItemProps) {
	return (
		<SidebarMenuItem>
			<Link to={url}>
				<SidebarMenuButton isActive={isActive}>
					<IconComponent />
					<span>{title}</span>
				</SidebarMenuButton>
			</Link>
		</SidebarMenuItem>
	);
}

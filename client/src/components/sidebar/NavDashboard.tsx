import { type LucideIcon, MinusIcon, PlusIcon } from "lucide-react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, type ToOptions, useLocation } from "@tanstack/react-router";

export type NavMainItem = {
	title: string;
	url?: ToOptions;
	icon?: LucideIcon;
	items?: NavSubItem[];
};

export type NavSubItem = {
	title: string;
	url: ToOptions;
	icon?: LucideIcon;
};

export function NavDashboard({ items }: { items: NavMainItem[] }) {
	const location = useLocation().pathname;

	return (
		<SidebarGroup>
			<SidebarMenu>
				{items.map((item, index) => (
					<Collapsible
						key={item.title}
						defaultOpen={index === 1}
						className="group/collapsible"
					>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton>
									{item.title}
									<PlusIcon className="ml-auto group-data-[state=open]/collapsible:hidden" />
									<MinusIcon className="ml-auto group-data-[state=closed]/collapsible:hidden" />
								</SidebarMenuButton>
							</CollapsibleTrigger>
							{item.items?.length ? (
								<CollapsibleContent>
									<SidebarMenuSub>
										{item.items.map((item) => (
											<SidebarMenuSubItem key={item.title}>
												<SidebarMenuSubButton
													asChild
													isActive={location === item.url}
												>
													<Link to={item.url}>{item.title}</Link>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								</CollapsibleContent>
							) : null}
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}

import { useLocation } from "@tanstack/react-router";
import NavItem, { type NavItemProps } from "./NavItem";

export type NavItemsProps = {
	items: Omit<NavItemProps, "isActive">[];
};

export default function NavItems({ items }: NavItemsProps) {
	const location = useLocation().pathname;
	return items.map((item) => (
		<NavItem key={item.title} {...item} isActive={location === item.url} />
	));
}

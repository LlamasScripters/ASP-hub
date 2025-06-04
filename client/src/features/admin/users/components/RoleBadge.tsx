import { Badge } from "@/components/ui/badge";
import type { AppRole } from "@/lib/auth/auth-config";
import { cn } from "@/lib/utils";

const roleMap: Record<AppRole, { label: string; className: string }> = {
	admin: {
		label: "Administrateur",
		className:
			"bg-destructive text-white border-transparent dark:bg-transparent dark:text-red-400 dark:border-red-400",
	},
	user: {
		label: "Utilisateur",
		className:
			"bg-blue-500 text-white border-transparent dark:bg-transparent dark:text-blue-500 dark:border-blue-500",
	},
};

export function RoleBadge({
	role,
	className,
}: {
	role: keyof typeof roleMap;
	className?: string;
}) {
	return (
		<Badge
			className={cn(
				"hover:bg-unset select-none cursor-default",
				roleMap[role].className,
				className,
			)}
		>
			{roleMap[role].label}
		</Badge>
	);
}

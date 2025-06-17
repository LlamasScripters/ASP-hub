import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { type UserLoggedIn, authClient } from "@/lib/auth/auth-client";
import type { AppRole } from "@/lib/auth/auth-config";
import { LockIcon, ShieldUserIcon, TrashIcon } from "lucide-react";
import { RoleBadge } from "./RoleBadge";

export default function UsersTableRow({
	onDelete = (_user: UserLoggedIn) => {},
	onResetPassword = (_user: UserLoggedIn) => {},
	onRoleEdit = (_user: UserLoggedIn) => {},
	user,
}: {
	onDelete: (user: UserLoggedIn) => void;
	onResetPassword: (user: UserLoggedIn) => void;
	onRoleEdit: (user: UserLoggedIn) => void;
	user: UserLoggedIn;
}) {
	const { data } = authClient.useSession();

	const isCurrentUser = data?.user?.id === user.id;

	const handleRoleEdit = () => {
		onRoleEdit(user);
	};

	const handleResetPassword = () => {
		onResetPassword(user);
	};

	const handleDelete = () => {
		onDelete(user);
	};

	return (
		<TableRow key={user.id}>
			<TableCell>{user.lastName}</TableCell>
			<TableCell>{user.firstName}</TableCell>
			<TableCell>{user.email}</TableCell>
			<TableCell>
				<RoleBadge role={user.role as AppRole} />
			</TableCell>
			<TableCell>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon">
							<span className="sr-only">Ouvrir le menu</span>⋮
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel className="select-none">
							Actions
						</DropdownMenuLabel>
						<DropdownMenuItem onClick={handleResetPassword}>
							<LockIcon className="size-4" />
							Modifier le mot de passe
						</DropdownMenuItem>
						<DropdownMenuItem onClick={handleRoleEdit}>
							<ShieldUserIcon className="size-4" />
							Modifier le rôle
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							variant={isCurrentUser ? "default" : "destructive"}
							onClick={handleDelete}
							disabled={isCurrentUser}
						>
							<TrashIcon className="size-4" />
							Supprimer l'utilisateur
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	);
}

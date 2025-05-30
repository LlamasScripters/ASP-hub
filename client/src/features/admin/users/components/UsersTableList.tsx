import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { RoleBadge } from "@/features/admin/users/components/RoleBadge";
import type { UserLoggedIn } from "@/lib/auth/auth-client";
import type { AppRole } from "@/lib/auth/auth-config";
import {
	PencilIcon,
	ShieldUserIcon,
	TrashIcon,
	UserPenIcon,
} from "lucide-react";

const UserTableHeader = () => {
	return (
		<TableHeader>
			<TableRow>
				<TableHead>Nom</TableHead>
				<TableHead>Prénom</TableHead>
				<TableHead>Email</TableHead>
				<TableHead>Rôle</TableHead>
				<TableHead>Actions</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default function UsersTableList({
	users,
	onUserRoleEdit = () => {},
	onUserEdit = () => {},
	onUserDelete = () => {},
}: {
	users: UserLoggedIn[];
	onUserRoleEdit: (user: UserLoggedIn) => void;
	onUserEdit: (user: UserLoggedIn) => void;
	onUserDelete: (user: UserLoggedIn) => void;
}) {
	const handleUserRoleEdit = (user: UserLoggedIn) => {
		onUserRoleEdit(user);
	};

	const handleUserEdit = (user: UserLoggedIn) => {
		onUserEdit(user);
	};

	const handleUserDelete = (user: UserLoggedIn) => {
		onUserDelete(user);
	};

	return (
		<Table>
			<UserTableHeader />
			<TableBody>
				{users.map((user) => {
					const { firstName, lastName } = user;
					return (
						<TableRow key={user.id}>
							<TableCell>{lastName}</TableCell>
							<TableCell>{firstName}</TableCell>
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
										<DropdownMenuItem onClick={() => handleUserEdit(user)}>
											<UserPenIcon className="size-4" />
											Modifier l'utilisateur
										</DropdownMenuItem>
										<DropdownMenuItem onClick={() => handleUserRoleEdit(user)}>
											<ShieldUserIcon className="size-4" />
											Modifier le rôle
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem
											variant="destructive"
											onClick={() => handleUserDelete(user)}
										>
											<TrashIcon className="size-4" />
											Supprimer l'utilisateur
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}

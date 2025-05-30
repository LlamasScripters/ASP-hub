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
	onEditRole = () => {},
}: {
	users: UserLoggedIn[];
	onEditRole: (user: UserLoggedIn) => void;
}) {
	const handleEditRole = (user: UserLoggedIn) => {
		onEditRole(user);
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
										<DropdownMenuLabel>Actions</DropdownMenuLabel>
										<DropdownMenuItem onClick={() => handleEditRole(user)}>
											Modifier le rôle
										</DropdownMenuItem>
										<DropdownMenuSeparator />
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

import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { UserLoggedIn } from "@/lib/auth/auth-client";
import UsersTableRow from "./UsersTableRow";

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
	onUserResetPassword = () => {},
	onUserDelete = () => {},
}: {
	users: UserLoggedIn[];
	onUserRoleEdit: (user: UserLoggedIn) => void;
	onUserResetPassword: (user: UserLoggedIn) => void;
	onUserDelete: (user: UserLoggedIn) => void;
}) {
	const handleUserRoleEdit = (user: UserLoggedIn) => {
		onUserRoleEdit(user);
	};

	const handleUserResetPassword = (user: UserLoggedIn) => {
		onUserResetPassword(user);
	};

	const handleUserDelete = (user: UserLoggedIn) => {
		onUserDelete(user);
	};

	return (
		<Table>
			<UserTableHeader />
			<TableBody>
				{users.map((user) => {
					return (
						<UsersTableRow
							key={user.id}
							user={user}
							onDelete={handleUserDelete}
							onResetPassword={handleUserResetPassword}
							onRoleEdit={handleUserRoleEdit}
						/>
					);
				})}
			</TableBody>
		</Table>
	);
}

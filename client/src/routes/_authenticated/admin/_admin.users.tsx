import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { RoleBadge } from "@/features/admin/components/RoleBadge";
import {
	type UserLoggedIn,
	authClient,
	getAuthErrorMessage,
} from "@/lib/auth/auth-client";
import type { AppRole } from "@/lib/auth/auth-config";
import { queryClient } from "@/lib/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import type { DialogProps } from "@radix-ui/react-dialog";
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type ListUsersQuery = Parameters<
	typeof authClient.admin.listUsers
>["0"]["query"];

const listUsersQueryOptions = (query: ListUsersQuery = {}) =>
	queryOptions({
		queryKey: ["admin", "users", query],
		queryFn: async ({ queryKey }) => {
			const query = queryKey[2] as ListUsersQuery;
			const { data, error } = await authClient.admin.listUsers({
				query,
			});
			if (error?.code) {
				throw new Error(getAuthErrorMessage(error.code));
			}

			if (!data) {
				throw new Error("Aucun utilisateur trouvé");
			}

			return {
				total: data.total,
				users: data.users as UserLoggedIn[],
			};
		},
	});

const searchParamsSchema = z.object({
	search: z.string().optional(),
	limit: z.number().optional(),
	offset: z.number().optional(),
});

export const Route = createFileRoute("/_authenticated/admin/_admin/users")({
	component: UsersList,
	validateSearch: zodValidator(searchParamsSchema),
	loaderDeps: ({ search }) => ({ search }),
	loader: ({ deps: { search } }) => {
		queryClient.prefetchQuery(listUsersQueryOptions(search));
	},
});

const updateRoleFormSchema = z.object({
	role: z.enum(["user", "admin"]),
	userId: z.string(),
});

type UpdateRoleFormValues = z.infer<typeof updateRoleFormSchema>;

function RoleEditDialog({
	user,
	...dialogProps
}: { user: UserLoggedIn } & DialogProps) {
	const searchParams = Route.useSearch();
	const { onOpenChange } = dialogProps;
	const form = useForm({
		resolver: zodResolver(updateRoleFormSchema),
		defaultValues: {
			role: (user.role as "user" | "admin") || "user",
			userId: user.id,
		},
	});

	const setRoleMutation = useMutation({
		mutationFn: async (values: UpdateRoleFormValues) => {
			const { data, error } = await authClient.admin.setRole({
				userId: user.id,
				role: values.role,
			});

			if (error?.code) {
				throw new Error(getAuthErrorMessage(error.code));
			}

			if (!data) {
				throw new Error("Erreur lors de la modification du rôle");
			}

			queryClient.setQueryData(
				listUsersQueryOptions(searchParams).queryKey,
				(old) => {
					if (!old) return old;

					const oldUsers = old.users;

					const newUserIndex = oldUsers.findIndex(
						(user) => user.id === values.userId,
					);

					if (newUserIndex === -1) return old;

					const newUsers = oldUsers.with(
						newUserIndex,
						data.user as UserLoggedIn,
					);
					return {
						total: old.total,
						users: newUsers,
					};
				},
			);

			return data;
		},
		onSuccess: () => {
			if (onOpenChange) {
				onOpenChange(false);
			}
			toast.success("Rôle modifié avec succès", {
				description: `Le rôle de ${user.name} a été modifié avec succès`,
			});
		},
	});

	async function onSubmit(values: UpdateRoleFormValues) {
		setRoleMutation.mutate(values);
	}

	return (
		<Dialog {...dialogProps}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Modifier le rôle</DialogTitle>
					<DialogDescription>
						Modifier le rôle de l'utilisateur {user.name} ({user.email})
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Rôle</FormLabel>
									<FormControl>
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger>
												<SelectValue placeholder="Sélectionner un rôle" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="user">Utilisateur</SelectItem>
												<SelectItem value="admin">Administrateur</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{form.formState.errors.role && (
							<div className="text-red-500 text-sm">
								{form.formState.errors.role.message}
							</div>
						)}
						<DialogFooter>
							<Button type="submit" disabled={setRoleMutation.isPending}>
								{setRoleMutation.isPending
									? "Enregistrement..."
									: "Enregistrer"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

function UsersListSkeleton() {
	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h2 className="text-lg font-semibold">Liste des utilisateurs</h2>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Nom</TableHead>
						<TableHead>Prénom</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Rôle</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((key) => {
						return (
							<TableRow key={key}>
								<TableCell>
									<Skeleton className="size-10" />
								</TableCell>
								<TableCell>
									<Skeleton className="size-10" />
								</TableCell>
								<TableCell>
									<Skeleton className="size-10" />
								</TableCell>
								<TableCell>
									<Skeleton className="size-10" />
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}

export default function UsersList() {
	const searchParams = Route.useSearch();

	const { data, isPending } = useQuery(listUsersQueryOptions(searchParams));

	const [selectedUser, setSelectedUser] = useState<UserLoggedIn | null>(null);
	const isRoleEditDialogOpen = !!selectedUser;

	if (isPending) {
		return <UsersListSkeleton />;
	}

	if (!data) {
		return <div>Erreur lors de la récupération des utilisateurs</div>;
	}

	const { total, users } = data;

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h2 className="text-lg font-semibold">
					Liste des utilisateurs ({total})
				</h2>
				<Button asChild>
					<Link to="/admin/users/create">Créer un utilisateur</Link>
				</Button>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Nom</TableHead>
						<TableHead>Prénom</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Rôle</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
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
											<DropdownMenuItem
												onClick={() => {
													setSelectedUser(user);
												}}
											>
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
			{selectedUser && (
				<RoleEditDialog
					open={isRoleEditDialogOpen}
					onOpenChange={(open) => {
						if (!open) {
							setSelectedUser(null);
						}
					}}
					user={selectedUser}
					key={selectedUser?.id} // if key changes, the dialog state is reset
				/>
			)}
		</div>
	);
}

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
import UsersListSkeleton from "@/features/admin/users/components/UsersListSkeleton";
import UsersTableList from "@/features/admin/users/components/UsersTableList";
import UserCreateForm from "@/features/users/components/UserCreateForm";

import {
	type UserLoggedIn,
	authClient,
	getAuthErrorMessage,
} from "@/lib/auth/auth-client";

import { queryClient } from "@/lib/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import type { DialogProps } from "@radix-ui/react-dialog";
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
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
	showCreate: z.boolean().optional(),
});

export const Route = createFileRoute("/_authenticated/admin/_admin/users")({
	component: UsersListPage,
	validateSearch: zodValidator(searchParamsSchema),
	// avoid reloading the page when the showCreate search param changes
	loaderDeps: ({ search: { showCreate, ...search } }) => ({ search }),
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

function UserCreateDialog(props: DialogProps) {
	const searchParams = Route.useSearch();
	return (
		<Dialog {...props}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Créer un utilisateur</DialogTitle>
					<DialogDescription>Créer un nouvel utilisateur</DialogDescription>
				</DialogHeader>
				<UserCreateForm
					onSuccess={(user) => {
						queryClient.setQueryData(
							listUsersQueryOptions(searchParams).queryKey,
							(old) => {
								if (!old) return old;
								const newUsers = [...old.users, user];
								const newTotal = newUsers.length;
								return {
									total: newTotal,
									users: newUsers,
								};
							},
						);
						toast.success("Utilisateur créé avec succès", {
							description: `L'utilisateur ${user.name} a été créé avec succès`,
						});
					}}
					onError={(err) => {
						toast.error("Erreur lors de la création de l'utilisateur", {
							description: err.message,
						});
					}}
				/>
			</DialogContent>
		</Dialog>
	);
}

function UsersListPage() {
	const searchParams = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });
	const { showCreate } = searchParams;

	const { data, isPending } = useQuery(listUsersQueryOptions(searchParams));

	const [selectedUser, setSelectedUser] = useState<UserLoggedIn | null>(null);

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
					<Link
						to="."
						search={(prev) => ({ ...prev, showCreate: true })}
						mask={{ to: "." }}
					>
						Créer un utilisateur
					</Link>
				</Button>
			</div>

			<UsersTableList
				users={users}
				onEditRole={(user) => setSelectedUser(user)}
			/>

			{selectedUser && (
				<RoleEditDialog
					open={!!selectedUser}
					onOpenChange={(open) => {
						if (!open) {
							setSelectedUser(null);
						}
					}}
					user={selectedUser}
					key={selectedUser?.id} // if key changes, the dialog state is reset
				/>
			)}

			<UserCreateDialog
				open={showCreate}
				onOpenChange={() => {
					navigate({
						search: (prev) => ({
							...prev,
							showCreate: false,
						}),
						mask: { to: "." },
					});
				}}
			/>
		</div>
	);
}

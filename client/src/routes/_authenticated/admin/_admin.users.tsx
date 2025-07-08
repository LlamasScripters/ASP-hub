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
import UserCreateForm from "@/features/admin/users/components/UserCreateForm";
import UserResetPasswordForm from "@/features/admin/users/components/UserResetPasswordForm";
import UsersListSkeleton from "@/features/admin/users/components/UsersListSkeleton";
import UsersTableList from "@/features/admin/users/components/UsersTableList";

import {
	type UserLoggedIn,
	authClient,
	getAuthErrorMessage,
} from "@/lib/auth/auth-client";

import { queryClient } from "@/lib/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import type { DialogProps } from "@radix-ui/react-dialog";
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
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
	action: z.enum(["create", "role", "reset-password", "delete"]).optional(),
});

export const Route = createFileRoute("/_authenticated/admin/_admin/users")({
	component: UsersListPage,
	validateSearch: zodValidator(searchParamsSchema),
	// avoid reloading the page when the action search param changes
	loaderDeps: ({ search: { action, ...search } }) => ({ search }),
	loader: ({ deps: { search } }) => {
		queryClient.prefetchQuery(listUsersQueryOptions(search));
	},
});

const updateRoleFormSchema = z.object({
	role: z.enum(["user", "admin"]),
	userId: z.string(),
});

type UpdateRoleFormValues = z.infer<typeof updateRoleFormSchema>;

function UserRoleEditDialog({
	user,
	...dialogProps
}: { user: UserLoggedIn } & DialogProps) {
	const { action, ...searchParams } = Route.useSearch();
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
	const { action, ...searchParams } = Route.useSearch();
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

function UserResetPasswordDialog({
	user,
	...dialogProps
}: { user: UserLoggedIn } & DialogProps) {
	return (
		<Dialog {...dialogProps}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Réinitialiser le mot de passe</DialogTitle>
					<DialogDescription>
						Réinitialiser le mot de passe de l'utilisateur{" "}
						<span className="font-bold">{user.name}</span>
					</DialogDescription>
				</DialogHeader>
				<UserResetPasswordForm
					user={user}
					onSuccess={() => {
						toast.success("Mot de passe réinitialisé avec succès", {
							description: `Le mot de passe de l'utilisateur ${user.name} a été réinitialisé avec succès`,
						});
					}}
					onError={(err) => {
						toast.error("Erreur lors de la réinitialisation du mot de passe", {
							description: err.message,
						});
					}}
				/>
			</DialogContent>
		</Dialog>
	);
}

function UserDeleteDialog({
	user,
	onConfirm,
	onCancel,
	...dialogProps
}: {
	user: UserLoggedIn;
	onConfirm: () => void;
	onCancel: () => void;
} & DialogProps) {
	return (
		<Dialog {...dialogProps}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Supprimer l'utilisateur</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					Supprimer l'utilisateur {user.name} ({user.email})
				</DialogDescription>
				<DialogFooter>
					<div className="flex gap-2">
						<Button variant="outline" onClick={onCancel}>
							Annuler
						</Button>
						<Button variant="destructive" onClick={onConfirm}>
							Supprimer
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

function UsersListPage() {
	const searchParams = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });
	const location = useLocation();

	const selectedUser =
		"selectedUser" in location.state
			? (location.state.selectedUser as UserLoggedIn | null)
			: null;

	const { data, isPending } = useQuery(listUsersQueryOptions(searchParams));
	const deleteUserMutation = useMutation({
		mutationFn: async (user: UserLoggedIn) => {
			const { data, error } = await authClient.admin.removeUser({
				userId: user.id,
			});

			if (error?.code) {
				throw new Error(getAuthErrorMessage(error.code));
			}

			if (!data?.success) {
				throw new Error("Erreur lors de la suppression de l'utilisateur");
			}

			return true;
		},
		onSuccess: () => {
			toast.success("Utilisateur supprimé avec succès", {
				description: `L'utilisateur ${selectedUser?.name} a été supprimé avec succès`,
			});
			queryClient.setQueryData(
				listUsersQueryOptions(searchParams).queryKey,
				(old) => {
					if (!old) return old;
					const newUsers = old.users.filter(
						(user) => user.id !== selectedUser?.id,
					);
					const newTotal = newUsers.length;
					return {
						total: newTotal,
						users: newUsers,
					};
				},
			);
			navigate({
				search: (prev) => ({
					...prev,
					action: undefined,
				}),
			});
		},
		onError: (err) => {
			toast.error("Erreur lors de la suppression de l'utilisateur", {
				description: err.message,
			});
		},
	});

	const action = searchParams.action;

	if (isPending) {
		return <UsersListSkeleton />;
	}

	if (!data) {
		return <div>Erreur lors de la récupération des utilisateurs</div>;
	}

	const { total, users } = data;

	const handleUserRoleEdit = (user: UserLoggedIn) => {
		navigate({
			search: (prev) => ({
				...prev,
				action: "role",
			}),
			state: {
				//@ts-ignore Unsafe but we know the type of the state
				selectedUser: user,
			},
			mask: { to: "." },
		});
	};

	const handleUserResetPassword = (user: UserLoggedIn) => {
		navigate({
			search: (prev) => ({
				...prev,
				action: "reset-password",
			}),
			state: {
				//@ts-ignore Unsafe but we know the type of the state
				selectedUser: user,
			},
			mask: { to: "." },
		});
	};

	const handleUserDelete = (user: UserLoggedIn) => {
		navigate({
			search: (prev) => ({
				...prev,
				action: "delete",
			}),
			state: {
				//@ts-ignore Unsafe but we know the type of the state
				selectedUser: user,
			},
			mask: { to: "." },
		});
	};

	const handleDialogClose = () => {
		navigate({
			search: (prev) => ({
				...prev,
				action: undefined,
			}),
			state: undefined,
		});
	};

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h2 className="text-lg font-semibold">
					Liste des utilisateurs ({total})
				</h2>
				<Button asChild>
					<Link
						to="."
						search={(prev) => ({ ...prev, action: "create" })}
						mask={{ to: "." }}
					>
						Créer un utilisateur
					</Link>
				</Button>
			</div>

			<UsersTableList
				users={users}
				onUserRoleEdit={handleUserRoleEdit}
				onUserResetPassword={handleUserResetPassword}
				onUserDelete={handleUserDelete}
			/>

			{selectedUser && (
				<>
					<UserRoleEditDialog
						open={action === "role"}
						onOpenChange={handleDialogClose}
						user={selectedUser}
					/>
					<UserResetPasswordDialog
						open={action === "reset-password"}
						onOpenChange={handleDialogClose}
						user={selectedUser}
					/>
				</>
			)}

			<UserCreateDialog
				open={action === "create"}
				onOpenChange={handleDialogClose}
			/>

			{selectedUser && (
				<UserDeleteDialog
					open={action === "delete"}
					onOpenChange={handleDialogClose}
					user={selectedUser}
					onConfirm={() => {
						deleteUserMutation.mutate(selectedUser);
						handleDialogClose();
					}}
					onCancel={handleDialogClose}
				/>
			)}
		</div>
	);
}

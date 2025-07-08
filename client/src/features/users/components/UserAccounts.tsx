import GoogleIcon from "@/components/icons/GoogleIcon";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
	type UserLoggedIn,
	authClient,
	getAuthErrorMessage,
} from "@/lib/auth/auth-client";
import { queryClient } from "@/lib/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { AlertCircleIcon, Mail, Shield, Trash2, UserIcon } from "lucide-react";
import { useId } from "react";
import { toast } from "sonner";
import { listAccountsQueryOptions } from "../users.config";

interface SocialProvider {
	id: string;
	name: string;
	icon: React.ComponentType<{ className?: string }>;
}

const socialProviders: Record<string, SocialProvider> = {
	google: {
		id: "google",
		name: "Google",
		icon: GoogleIcon,
	},
};

function UserAccountsLoading() {
	const id = useId();

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Shield className="h-5 w-5" />
					Comptes connectés
				</CardTitle>
				<CardDescription>
					Gérez les comptes sociaux liés à votre profil
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div className="flex items-center justify-between p-4 border rounded-lg">
						<div className="flex items-center gap-3">
							<Skeleton className="h-10 w-10 rounded-full" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-3 w-48" />
							</div>
						</div>
						<Skeleton className="h-4 w-24" />
					</div>

					{[1, 2].map((i) => (
						<div
							key={`${id}-${i}`}
							className="flex items-center justify-between p-4 border rounded-lg"
						>
							<div className="flex items-center gap-3">
								<Skeleton className="h-10 w-10 rounded-full" />
								<div className="space-y-2">
									<Skeleton className="h-4 w-32" />
									<Skeleton className="h-3 w-48" />
								</div>
							</div>
							<Skeleton className="h-8 w-24" />
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

function UserAccountError() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Shield className="h-5 w-5" />
					Comptes connectés
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-center text-sm text-muted-foreground">
					Une erreur est survenue lors de la récupération des comptes connectés.
				</div>
			</CardContent>
		</Card>
	);
}

export default function UserAccounts({
	user,
}: {
	user: UserLoggedIn;
}) {
	const {
		data: accounts,
		isPending,
		isError,
	} = useQuery(listAccountsQueryOptions(user.id));

	if (isPending) return <UserAccountsLoading />;
	if (isError || !accounts) return <UserAccountError />;

	const hasCredentialAccount = accounts.some(
		(account) => account.provider === "credential",
	);

	const socialAccounts = accounts.filter(
		(account) => account.provider !== "credential",
	);

	const unlinkAccountMutation = useMutation({
		mutationFn: async (providerId: string) => {
			const { error } = await authClient.unlinkAccount({ providerId });
			if (error?.code) throw new Error(getAuthErrorMessage(error.code));
		},
		onSuccess: () => {
			const queryOptions = listAccountsQueryOptions(user.id);
			queryClient.invalidateQueries({
				queryKey: queryOptions.queryKey,
			});
			toast.success("Compte déconnecté avec succès");
		},
		onError: (error) => {
			toast.error(error?.message || "Erreur lors de la déconnexion du compte");
		},
	});

	const handleUnlinkAccount = (providerId: string) => {
		unlinkAccountMutation.mutate(providerId);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Shield className="h-5 w-5" />
					Comptes connectés
				</CardTitle>
				<CardDescription>
					Gérez les comptes sociaux liés à votre profil
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{!hasCredentialAccount && socialAccounts.length > 0 && (
					<Alert variant="default">
						<AlertCircleIcon className="size-4" />
						<AlertTitle>Attention</AlertTitle>
						<AlertDescription>
							Vous ne pouvez pas déconnecter vos comptes sociaux car vous n'avez
							pas de compte email configuré. Pour plus de sécurité, configurez
							d'abord un mot de passe depuis la page des paramètres.
						</AlertDescription>
					</Alert>
				)}
				<div className="space-y-4">
					{hasCredentialAccount && (
						<div className="flex items-center justify-between p-4 border rounded-lg">
							<div className="flex items-center gap-3">
								<div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
									<Mail className="h-5 w-5 text-primary" />
								</div>
								<div>
									<p className="font-medium">Compte Email</p>
									<p className="text-sm text-muted-foreground">
										Connexion avec email et mot de passe
									</p>
								</div>
							</div>
						</div>
					)}

					{socialAccounts.map((account) => {
						const provider = socialProviders[account.provider];
						const IconComponent = provider?.icon || UserIcon;

						return (
							<div
								key={account.id}
								className="flex items-center justify-between p-4 border rounded-lg"
							>
								<div className="flex items-center gap-3">
									<div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
										<IconComponent className="h-5 w-5" />
									</div>
									<div>
										<p className="font-medium">
											{provider?.name || account.provider}
										</p>
										<p className="text-sm text-muted-foreground">
											Connecté le {formatDate(account.createdAt, "dd/MM/yyyy")}
										</p>
									</div>
								</div>
								{hasCredentialAccount && (
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button
												variant="outline"
												size="sm"
												className="text-destructive hover:text-destructive"
												disabled={unlinkAccountMutation.isPending}
											>
												<Trash2 className="h-4 w-4 mr-1" />
												Déconnecter
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>
													Déconnecter le compte{" "}
													{provider?.name || account.provider}
												</AlertDialogTitle>
												<AlertDialogDescription>
													Êtes-vous sûr de vouloir déconnecter ce compte ? Vous
													ne pourrez plus vous connecter avec{" "}
													{provider?.name || account.provider} sauf si vous le
													reconnectez manuellement.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Annuler</AlertDialogCancel>
												<AlertDialogAction
													onClick={() => handleUnlinkAccount(account.provider)}
													className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
												>
													Déconnecter
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								)}
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
}

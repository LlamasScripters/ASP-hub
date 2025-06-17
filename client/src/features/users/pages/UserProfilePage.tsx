import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Route as AuthenticatedRoute } from "@/routes/_authenticated";
import { Link } from "@tanstack/react-router";
import { formatDate } from "date-fns";
import { Calendar, Edit, Mail, User as UserIcon } from "lucide-react";
import UserAccounts from "../components/UserAccounts";

export default function UserProfilePage() {
	const { user } = AuthenticatedRoute.useLoaderData();
	return (
		<div className="container max-w-4xl py-6 space-y-6">
			<Card>
				<CardHeader>
					<div className="flex items-start justify-between">
						<div>
							<CardTitle className="flex items-center gap-2">
								<UserIcon className="h-5 w-5" />
								Profil utilisateur
							</CardTitle>
							<CardDescription>
								Informations de votre profil et comptes connectés
							</CardDescription>
						</div>
						<Link to="/user/settings">
							<Button variant="outline" size="sm" className="gap-2">
								<Edit className="h-4 w-4" />
								Modifier le profil
							</Button>
						</Link>
					</div>
				</CardHeader>
				<CardContent>
					<div className="flex items-start gap-6">
						<Avatar className="h-20 w-20">
							<AvatarImage
								src={user.image || undefined}
								alt={user.firstName || "User"}
							/>
							<AvatarFallback className="text-lg">
								{user.firstName[0]}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1 space-y-3">
							<div>
								<h3 className="text-xl font-semibold">
									{user.firstName && user.lastName
										? `${user.firstName} ${user.lastName}`
										: user.firstName || user.lastName || "Utilisateur"}
								</h3>
								<div className="flex items-center gap-2 text-muted-foreground">
									<Mail className="h-4 w-4" />
									<span>{user.email}</span>
								</div>
							</div>
							{user.dateOfBirth && (
								<div className="flex items-center gap-2 text-sm text-muted-foreground">
									<Calendar className="h-4 w-4" />
									<span>
										Né(e) le {formatDate(user.dateOfBirth, "dd/MM/yyyy")}
									</span>
								</div>
							)}
						</div>
					</div>
				</CardContent>
			</Card>

			<UserAccounts user={user} />
		</div>
	);
}

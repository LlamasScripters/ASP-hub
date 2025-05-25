import { UserSidebar } from "@/components/sidebar/UserSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth/auth-client";
import { Route as AuthenticatedRoute } from "@/routes/_authenticated";
import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bell, LogOut, Search, Shield } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/(nonadmin)/_nonadmin")({
	component: NonAdminLayout,
});

function NonAdminLayout() {
	const navigate = useNavigate();
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const { user } = AuthenticatedRoute.useLoaderData();

	const handleLogout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					navigate({ to: "/" });
				},
			},
		});
	};

	return (
		<SidebarProvider className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
			<UserSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 md:px-6">
					<SidebarTrigger className="-ml-1" />
					<Shield className="w-6 h-6 text-emerald-600 ml-2" />
					<span className="ml-2 text-lg font-bold">ASOPS</span>
					<div className="flex items-center ml-auto space-x-4">
						{isSearchOpen ? (
							<div className="relative">
								<Input
									placeholder="Rechercher..."
									className="w-64"
									autoFocus
									onBlur={() => setIsSearchOpen(false)}
								/>
								<Button
									variant="ghost"
									size="icon"
									className="absolute right-0 top-0"
									onClick={() => setIsSearchOpen(false)}
								>
									<LogOut className="w-4 h-4" />
								</Button>
							</div>
						) : (
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setIsSearchOpen(true)}
							>
								<Search className="w-5 h-5" />
								<span className="sr-only">Rechercher</span>
							</Button>
						)}
						<Button variant="ghost" size="icon">
							<Bell className="w-5 h-5" />
							<span className="sr-only">Notifications</span>
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="relative w-8 h-8 rounded-full"
								>
									<Avatar className="w-8 h-8">
										<AvatarImage src={user.image ?? ""} alt={user.name} />
										<AvatarFallback>
											{user.firstName[0]} {user.lastName[0]}
										</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Mon compte</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={() => navigate({ to: "/user/profile" })}
								>
									Profil
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => navigate({ to: "/user/settings" })}
								>
									Paramètres
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<Button
										type="button"
										variant="ghost"
										className="flex items-center w-full"
										onClick={handleLogout}
									>
										<LogOut className="w-4 h-4 mr-2" />
										Déconnexion
									</Button>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</header>
				<main className="flex-1 p-4 overflow-auto md:p-6">
					<Outlet />
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}

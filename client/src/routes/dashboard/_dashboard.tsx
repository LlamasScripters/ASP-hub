import { createFileRoute, useLocation, Link, Outlet } from '@tanstack/react-router'

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart3,
  Calendar,
  CreditCard,
  FileText,
  Home,
  Menu,
  MessageSquare,
  Settings,
  Shield,
  Users,
  X,
  LogOut,
  Bell,
  Search,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

export const Route = createFileRoute('/dashboard/_dashboard')({
  component: DashboardLayout,
})

interface NavItemProps {
  href: string
  label: string
  icon: React.ReactNode
  isActive: boolean
}

function NavItem({ href, label, icon, isActive }: NavItemProps) {
  return (
    <Link to={href}>
      <Button
        variant="ghost"
        className={cn("w-full justify-start gap-2", isActive ? "bg-gray-100 dark:bg-gray-800" : "")}
      >
        {icon}
        {label}
      </Button>
    </Link>
  )
}

const navigationItems = [
  { href: "/dashboard", label: "Tableau de bord", icon: <Home className="w-5 h-5" /> },
  { href: "/dashboard/members", label: "Adhérents", icon: <Users className="w-5 h-5" /> },
  { href: "/dashboard/activities", label: "Activités", icon: <Calendar className="w-5 h-5" /> },
  { href: "/dashboard/social", label: "Projets sociaux", icon: <Shield className="w-5 h-5" /> },
  { href: "/dashboard/finances", label: "Finances", icon: <CreditCard className="w-5 h-5" /> },
  { href: "/dashboard/reports", label: "Rapports", icon: <FileText className="w-5 h-5" /> },
  { href: "/dashboard/statistics", label: "Statistiques", icon: <BarChart3 className="w-5 h-5" /> },
  { href: "/dashboard/messages", label: "Messages", icon: <MessageSquare className="w-5 h-5" /> },
  { href: "/dashboard/settings", label: "Paramètres", icon: <Settings className="w-5 h-5" /> },
]

function DashboardNavigation() {
  const { pathname } = useLocation()

  return (
    <nav className="p-4 space-y-1">
      {navigationItems.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          label={item.label}
          icon={item.icon}
          isActive={pathname === item.href}
        />
      ))}
    </nav>
  )
}


function DashboardLayout() {
  const isMobile = useMobile()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <aside className="hidden w-64 border-r border-gray-200 dark:border-gray-800 md:block">
        <div className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-800">
          <Link to="/" className="flex items-center">
            <Shield className="w-6 h-6 text-emerald-600" />
            <span className="ml-2 text-lg font-bold">ASOPS</span>
          </Link>
        </div>
        <DashboardNavigation />
      </aside>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
            <Link to="/" className="flex items-center">
              <Shield className="w-6 h-6 text-emerald-600" />
              <span className="ml-2 text-lg font-bold">ASOPS</span>
            </Link>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <X className="w-5 h-5" />
                <span className="sr-only">Fermer</span>
              </Button>
            </SheetTrigger>
          </div>
          <DashboardNavigation />
        </SheetContent>
      </Sheet>

      <div className="flex flex-col flex-1">
        <header className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-800 md:px-6">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
                  <Link to="/" className="flex items-center">
                    <Shield className="w-6 h-6 text-emerald-600" />
                    <span className="ml-2 text-lg font-bold">ASOPS</span>
                  </Link>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="w-5 h-5" />
                      <span className="sr-only">Fermer</span>
                    </Button>
                  </SheetTrigger>
                </div>
                <DashboardNavigation />
              </SheetContent>
            </Sheet>
          )}

          <div className="flex items-center ml-auto space-x-4">
            {isSearchOpen ? (
              <div className="relative">
                <Input placeholder="Rechercher..." className="w-64" autoFocus onBlur={() => setIsSearchOpen(false)} />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
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
                <Button variant="ghost" className="relative w-8 h-8 rounded-full">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                    <AvatarFallback>MT</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard/profile" className="flex w-full">
                    Profil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/dashboard/settings" className="flex w-full">
                    Paramètres
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/" className="flex items-center w-full">
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-4 overflow-auto md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

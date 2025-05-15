"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    ChevronLeft,
    ChevronRight,
    Download,
    Filter,
    MoreHorizontal,
    Plus,
    Search,
    SlidersHorizontal,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Données fictives pour les adhérents
const members = [
    {
        id: 1,
        name: "Sophie Martin",
        email: "s.martin@example.com",
        phone: "06 12 34 56 78",
        status: "Actif",
        activity: "Football",
        joinDate: "15/01/2025",
        paymentStatus: "Payé",
        medicalCertificate: true,
    },
    {
        id: 2,
        name: "Thomas Dubois",
        email: "t.dubois@example.com",
        phone: "06 23 45 67 89",
        status: "Actif",
        activity: "Basketball",
        joinDate: "20/01/2025",
        paymentStatus: "Payé",
        medicalCertificate: true,
    },
    {
        id: 3,
        name: "Emma Petit",
        email: "e.petit@example.com",
        phone: "06 34 56 78 90",
        status: "Actif",
        activity: "Natation",
        joinDate: "05/02/2025",
        paymentStatus: "En attente",
        medicalCertificate: false,
    },
    {
        id: 4,
        name: "Lucas Bernard",
        email: "l.bernard@example.com",
        phone: "06 45 67 89 01",
        status: "Inactif",
        activity: "Tennis",
        joinDate: "10/02/2025",
        paymentStatus: "Non payé",
        medicalCertificate: false,
    },
    {
        id: 5,
        name: "Chloé Moreau",
        email: "c.moreau@example.com",
        phone: "06 56 78 90 12",
        status: "Actif",
        activity: "Danse",
        joinDate: "25/02/2025",
        paymentStatus: "Payé",
        medicalCertificate: true,
    },
    {
        id: 6,
        name: "Hugo Lefebvre",
        email: "h.lefebvre@example.com",
        phone: "06 67 89 01 23",
        status: "Actif",
        activity: "Judo",
        joinDate: "03/03/2025",
        paymentStatus: "Payé",
        medicalCertificate: true,
    },
    {
        id: 7,
        name: "Léa Roux",
        email: "l.roux@example.com",
        phone: "06 78 90 12 34",
        status: "Actif",
        activity: "Gymnastique",
        joinDate: "12/03/2025",
        paymentStatus: "Payé",
        medicalCertificate: true,
    },
    {
        id: 8,
        name: "Nathan Fournier",
        email: "n.fournier@example.com",
        phone: "06 89 01 23 45",
        status: "Inactif",
        activity: "Athlétisme",
        joinDate: "20/03/2025",
        paymentStatus: "Non payé",
        medicalCertificate: false,
    },
    {
        id: 9,
        name: "Camille Girard",
        email: "c.girard@example.com",
        phone: "06 90 12 34 56",
        status: "Actif",
        activity: "Volleyball",
        joinDate: "01/04/2025",
        paymentStatus: "En attente",
        medicalCertificate: true,
    },
    {
        id: 10,
        name: "Mathis Morel",
        email: "m.morel@example.com",
        phone: "06 01 23 45 67",
        status: "Actif",
        activity: "Handball",
        joinDate: "10/04/2025",
        paymentStatus: "Payé",
        medicalCertificate: true,
    },
]

export default function DashboardMembersPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [activityFilter, setActivityFilter] = useState("all")
    const [paymentFilter, setPaymentFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    // Filtrer les adhérents
    const filteredMembers = members.filter((member) => {
        const matchesSearch =
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || member.status === statusFilter
        const matchesActivity = activityFilter === "all" || member.activity === activityFilter
        const matchesPayment = paymentFilter === "all" || member.paymentStatus === paymentFilter

        return matchesSearch && matchesStatus && matchesActivity && matchesPayment
    })

    // Pagination
    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage)
    const paginatedMembers = filteredMembers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    // Obtenir les activités uniques pour le filtre
    const uniqueActivities = Array.from(new Set(members.map((member) => member.activity)))

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Gestion des adhérents</h1>
                    <p className="text-muted-foreground">Consultez et gérez les informations des adhérents de l'association.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-9">
                        <Download className="w-4 h-4 mr-2" />
                        Exporter
                    </Button>
                    <Button size="sm" className="h-9">
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter un adhérent
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Liste des adhérents</CardTitle>
                    <CardDescription>{filteredMembers.length} adhérents trouvés</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4 mb-6 md:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Rechercher un adhérent..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <div className="flex items-center">
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-[130px]">
                                        <Filter className="w-4 h-4 mr-2" />
                                        <SelectValue placeholder="Statut" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tous les statuts</SelectItem>
                                        <SelectItem value="Actif">Actif</SelectItem>
                                        <SelectItem value="Inactif">Inactif</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center">
                                <Select value={activityFilter} onValueChange={setActivityFilter}>
                                    <SelectTrigger className="w-[130px]">
                                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                                        <SelectValue placeholder="Activité" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Toutes les activités</SelectItem>
                                        {uniqueActivities.map((activity) => (
                                            <SelectItem key={activity} value={activity}>
                                                {activity}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center">
                                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                                    <SelectTrigger className="w-[130px]">
                                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                                        <SelectValue placeholder="Paiement" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tous les paiements</SelectItem>
                                        <SelectItem value="Payé">Payé</SelectItem>
                                        <SelectItem value="En attente">En attente</SelectItem>
                                        <SelectItem value="Non payé">Non payé</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Adhérent</TableHead>
                                    <TableHead>Activité</TableHead>
                                    <TableHead>Date d'inscription</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead>Paiement</TableHead>
                                    <TableHead>Certificat médical</TableHead>
                                    <TableHead className="w-[80px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedMembers.length > 0 ? (
                                    paginatedMembers.map((member) => (
                                        <TableRow key={member.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-9 w-9">
                                                        <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={member.name} />
                                                        <AvatarFallback>
                                                            {member.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{member.name}</div>
                                                        <div className="text-sm text-muted-foreground">{member.email}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{member.activity}</TableCell>
                                            <TableCell>{member.joinDate}</TableCell>
                                            <TableCell>
                                                <Badge variant={member.status === "Actif" ? "default" : "secondary"}>{member.status}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        member.paymentStatus === "Payé"
                                                            ? "outline"
                                                            : member.paymentStatus === "En attente"
                                                                ? "secondary"
                                                                : "destructive"
                                                    }
                                                >
                                                    {member.paymentStatus}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {member.medicalCertificate ? (
                                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                        Valide
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                                        Manquant
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                                                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                                                        <DropdownMenuItem>Envoyer un message</DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-600">Désactiver</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center">
                                            Aucun adhérent trouvé.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-muted-foreground">
                            Affichage de {Math.min(filteredMembers.length, (currentPage - 1) * itemsPerPage + 1)} à{" "}
                            {Math.min(filteredMembers.length, currentPage * itemsPerPage)} sur {filteredMembers.length} adhérents
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">Page précédente</span>
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages || totalPages === 0}
                            >
                                <ChevronRight className="h-4 w-4" />
                                <span className="sr-only">Page suivante</span>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

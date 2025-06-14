import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useRooms } from "@room-booking/hooks/useRooms";
import type { Room } from "@room-booking/hooks/useRooms";
import { Link } from "@tanstack/react-router";
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    CircleOff,
    Filter,
    Loader2,
    MoreHorizontal,
    Plus,
    Search,
    TreePine,
    Warehouse,
	//@ts-ignore
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";

interface RoomsListProps {
    complexId: string;
    initialRooms: Room[];
}

export function RoomsList({ complexId, initialRooms }: RoomsListProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sportTypeFilter, setSportTypeFilter] = useState<string>("all");
    const [roomTypeFilter, setRoomTypeFilter] = useState<string>("all");
    const [accreditationFilter, setAccreditationFilter] = useState<string>("all");
    const itemsPerPage = 10;

    const { rooms: fetchedRooms, loading, error, updateFilters, deleteRoom } = useRooms({
        complexId,
        initialData: initialRooms,
    });

    const allRooms = fetchedRooms.length > 0 ? fetchedRooms : initialRooms;

    const availableSportTypes = useMemo(() => {
        const types = Array.from(new Set(allRooms.map(room => room.sportType)));
        return types.sort();
    }, [allRooms]);

    const filteredRooms = useMemo(() => {
        let filtered = allRooms;

        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (room) =>
                    room.name.toLowerCase().includes(lowerSearchTerm) ||
                    room.sportType.toLowerCase().includes(lowerSearchTerm) ||
                    room.accreditation?.toLowerCase().includes(lowerSearchTerm)
            );
        }

        if (sportTypeFilter !== "all") {
            filtered = filtered.filter((room) => room.sportType === sportTypeFilter);
        }

        if (roomTypeFilter !== "all") {
            filtered = filtered.filter((room) => {
                if (roomTypeFilter === "indoor") {
                    return room.isIndoor;
                }
                if (roomTypeFilter === "outdoor") {
                    return !room.isIndoor;
                }
                return true;
            });
        }

        if (accreditationFilter !== "all") {
            filtered = filtered.filter((room) => {
                if (accreditationFilter === "with-accreditation") {
                    return room.accreditation && room.accreditation.trim() !== "";
                }
                if (accreditationFilter === "without-accreditation") {
                    return !room.accreditation || room.accreditation.trim() === "";
                }
                return true;
            });
        }

        return filtered;
    }, [allRooms, searchTerm, sportTypeFilter, roomTypeFilter, accreditationFilter]);

    const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentRooms = filteredRooms.slice(startIndex, endIndex);

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredRooms.length]);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const handleDelete = async (room: Room) => {
        if (
            window.confirm(
                `Êtes-vous sûr de vouloir supprimer la salle "${room.name}" ?`,
            )
        ) {
            await deleteRoom(room.id);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const getSportTypeBadgeColor = (sportType: string) => {
        const colors: Record<string, string> = {
            Football: "bg-green-100 text-green-800",
            Basketball: "bg-orange-100 text-orange-800",
            Tennis: "bg-yellow-100 text-yellow-800",
            Volleyball: "bg-blue-100 text-blue-800",
            Handball: "bg-red-100 text-red-800",
            Natation: "bg-cyan-100 text-cyan-800",
            Gymnastique: "bg-purple-100 text-purple-800",
            Judo: "bg-indigo-100 text-indigo-800",
            Danse: "bg-pink-100 text-pink-800",
            Fitness: "bg-emerald-100 text-emerald-800",
        };
        return colors[sportType] || "bg-gray-100 text-gray-800";
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Générer les numéros de page à afficher
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const start = Math.max(1, currentPage - 2);
            const end = Math.min(totalPages, start + maxVisible - 1);
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
        }
        
        return pages;
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <CardTitle>Salles du complexe</CardTitle>
                        <CardDescription>
                            {filteredRooms.length} salle{filteredRooms.length > 1 ? "s" : ""} trouvée{filteredRooms.length > 1 ? "s" : ""}
                            {filteredRooms.length !== allRooms.length && 
                                ` sur ${allRooms.length} au total`}
                        </CardDescription>
                    </div>
                    <Button asChild>
                        <Link
                            to="/admin/facilities/complexes/$complexId/create-room"
                            params={{ complexId }}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Nouvelle salle
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {/* Barre de recherche et filtres */}
                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex flex-col gap-4 md:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Rechercher une salle par nom, sport ou accréditation..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Select value={sportTypeFilter} onValueChange={setSportTypeFilter}>
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Type de sport" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tous les sports</SelectItem>
                                    {availableSportTypes.map((sport) => (
                                        <SelectItem key={sport} value={sport}>
                                            {sport}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={roomTypeFilter} onValueChange={setRoomTypeFilter}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Type de salle" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Toutes</SelectItem>
                                    <SelectItem value="indoor">Intérieure</SelectItem>
                                    <SelectItem value="outdoor">Extérieure</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={accreditationFilter} onValueChange={setAccreditationFilter}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Accréditation" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Toutes</SelectItem>
                                    <SelectItem value="with-accreditation">Avec</SelectItem>
                                    <SelectItem value="without-accreditation">Sans</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {(searchTerm || sportTypeFilter !== "all" || roomTypeFilter !== "all" || accreditationFilter !== "all") && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Filter className="w-4 h-4" />
                            <span>Filtres actifs:</span>
                            {searchTerm && <Badge variant="secondary">Recherche: {searchTerm}</Badge>}
                            {sportTypeFilter !== "all" && (
                                <Badge variant="secondary">Sport: {sportTypeFilter}</Badge>
                            )}
                            {roomTypeFilter !== "all" && (
                                <Badge variant="secondary">
                                    Type: {roomTypeFilter === "indoor" ? "Intérieure" : "Extérieure"}
                                </Badge>
                            )}
                            {accreditationFilter !== "all" && (
                                <Badge variant="secondary">
                                    Accréditation: {accreditationFilter === "with-accreditation" ? "Avec" : "Sans"}
                                </Badge>
                            )}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setSearchTerm("");
                                    setSportTypeFilter("all");
                                    setRoomTypeFilter("all");
                                    setAccreditationFilter("all");
                                }}
                            >
                                Effacer
                            </Button>
                        </div>
                    )}
                </div>

                {/* Table */}
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Salle</TableHead>
                                <TableHead>Sport</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Accréditation</TableHead>
                                <TableHead>Créée le</TableHead>
                                <TableHead className="w-[80px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        <div className="flex items-center justify-center">
                                            <Loader2 className="w-6 h-6 animate-spin mr-2" />
                                            Chargement...
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : error ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="h-24 text-center text-red-500"
                                    >
                                        {error}
                                    </TableCell>
                                </TableRow>
                            ) : currentRooms.length > 0 ? (
                                currentRooms.map((room) => (
                                    <TableRow key={room.id}>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <Warehouse className="w-4 h-4 mr-3 text-muted-foreground" />
                                                <div>
                                                    <div className="font-medium">{room.name}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        ID: {room.id.slice(0, 8)}...
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={getSportTypeBadgeColor(room.sportType)}>
                                                {room.sportType}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {room.isIndoor ? (
                                                    <>
                                                        <Warehouse className="w-4 h-4 text-blue-600" />
                                                        <span className="text-sm">Intérieure</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <TreePine className="w-4 h-4 text-green-600" />
                                                        <span className="text-sm">Extérieure</span>
                                                    </>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {room.accreditation ? (
                                                <div className="text-sm">{room.accreditation}</div>
                                            ) : (
                                                <span className="text-muted-foreground text-sm">
                                                    Aucune
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {formatDate(room.createdAt)}
                                            </div>
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
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            to="/admin/facilities/rooms/$roomId"
                                                            params={{ roomId: room.id }}
                                                            className="w-full cursor-pointer"
                                                        >
                                                            Voir les détails
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            to="/admin/facilities/rooms/$roomId/edit"
                                                            params={{ roomId: room.id }}
                                                            className="w-full cursor-pointer"
                                                        >
                                                            Modifier
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="text-red-600"
                                                        onClick={() => handleDelete(room)}
                                                    >
                                                        Supprimer
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        <div className="text-center">
                                            <CircleOff className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                Aucune salle trouvée
                                            </h3>
                                            <p className="text-gray-500 mb-4">
                                                {searchTerm || sportTypeFilter !== "all" || roomTypeFilter !== "all" || accreditationFilter !== "all"
                                                    ? "Aucune salle ne correspond à vos critères de recherche."
                                                    : "Commencez par créer votre première salle."}
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-muted-foreground">
                            Affichage de {startIndex + 1} à {Math.min(endIndex, filteredRooms.length)} sur {filteredRooms.length} salles
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={prevPage}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">Page précédente</span>
                            </Button>

                            <div className="flex items-center space-x-1">
                                {getPageNumbers().map((page) => (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => goToPage(page)}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                size="icon"
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                                <span className="sr-only">Page suivante</span>
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Room } from "@room-booking/hooks/useRooms";
import { Link } from "@tanstack/react-router";
import {
    BarChart3,
    Building2,
    CalendarDays,
    Clock,
    Filter,
    Notebook ,
    Plus,
    Search,
    TrendingUp,
    Users,
    Vote,
    Warehouse,
    XCircle,
    //@ts-ignore
} from "lucide-react";
import { useMemo, useState } from "react";

interface RoomsPageProps {
    initialRooms?: Room[];
}

const mockRoomStats = {
    totalReservations: 847,
    occupancyRate: 73,
    popularSports: [
        { sport: "Football", count: 12, percentage: 35 },
        { sport: "Basketball", count: 8, percentage: 24 },
        { sport: "Tennis", count: 6, percentage: 18 },
        { sport: "Volleyball", count: 4, percentage: 12 },
        { sport: "Handball", count: 4, percentage: 11 },
    ],
    recentActivity: [
        {
            id: 1,
            action: "Nouvelle réservation",
            room: "Terrain de Football A",
            time: "Il y a 5 min",
            type: "reservation",
        },
        {
            id: 2,
            action: "Salle créée",
            room: "Court de Tennis 3",
            time: "Il y a 2h",
            type: "creation",
        },
        {
            id: 3,
            action: "Maintenance programmée",
            room: "Gymnase Principal",
            time: "Il y a 4h",
            type: "maintenance",
        },
    ],
    upcomingEvents: [
        {
            id: 1,
            name: "Tournoi de Basketball",
            room: "Gymnase Principal",
            date: "15 Mai 2025",
            participants: 64,
        },
        {
            id: 2,
            name: "Cours de Yoga",
            room: "Salle Polyvalente",
            date: "16 Mai 2025",
            participants: 20,
        },
        {
            id: 3,
            name: "Match de Handball",
            room: "Terrain B",
            date: "18 Mai 2025",
            participants: 30,
        },
    ],
};

export function RoomsPage({ initialRooms = [] }: RoomsPageProps) {
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState<string>("all");
    const [filterSport, setFilterSport] = useState<string>("all");
    const [sortBy, setSortBy] = useState<string>("name");

    const roomStats = useMemo(() => {
        const total = initialRooms.length;
        const indoor = initialRooms.filter((r) => r.isIndoor).length;
        const outdoor = total - indoor;
        const accredited = initialRooms.filter((r) => r.accreditation).length;
        
        const sportCounts = initialRooms.reduce((acc, room) => {
            acc[room.sportType] = (acc[room.sportType] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const totalCapacity = initialRooms.reduce((sum, room) => sum + (room.capacity || 0), 0);
        const avgCapacity = total > 0 ? Math.round(totalCapacity / total) : 0;

        return {
            total,
            indoor,
            outdoor,
            accredited,
            sportCounts,
            totalCapacity,
            avgCapacity,
        };
    }, [initialRooms]);

    const availableSports = useMemo(() => {
        return Array.from(new Set(initialRooms.map(room => room.sportType))).sort();
    }, [initialRooms]);

    const filteredAndSortedRooms = useMemo(() => {
        const filtered = initialRooms.filter((room) => {
            const matchesSearch = room.name.toLowerCase().includes(search.toLowerCase()) ||
                                 room.sportType.toLowerCase().includes(search.toLowerCase());
            const matchesType =
                filterType === "all" ||
                (filterType === "indoor" && room.isIndoor) ||
                (filterType === "outdoor" && !room.isIndoor);
            const matchesSport = filterSport === "all" || room.sportType === filterSport;
            
            return matchesSearch && matchesType && matchesSport;
        });

        // Tri
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "sport":
                    return a.sportType.localeCompare(b.sportType);
                case "capacity":
                    return (b.capacity || 0) - (a.capacity || 0);
                case "created":
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                default:
                    return 0;
            }
        });

        return filtered;
    }, [search, filterType, filterSport, sortBy, initialRooms]);

    const getSportBadgeColor = (sport: string) => {
        const colors: Record<string, string> = {
            Football: "bg-green-100 text-green-800 border-green-200",
            Basketball: "bg-orange-100 text-orange-800 border-orange-200",
            Tennis: "bg-yellow-100 text-yellow-800 border-yellow-200",
            Volleyball: "bg-blue-100 text-blue-800 border-blue-200",
            Handball: "bg-red-100 text-red-800 border-red-200",
            Natation: "bg-cyan-100 text-cyan-800 border-cyan-200",
        };
        return colors[sport] || "bg-gray-100 text-gray-800 border-gray-200";
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case "reservation":
                return <CalendarDays className="w-4 h-4 text-green-600" />;
            case "creation":
                return <Plus className="w-4 h-4 text-blue-600" />;
            case "maintenance":
                return <Clock className="w-4 h-4 text-orange-600" />;
            default:
                return <Building2 className="w-4 h-4 text-gray-600" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* En-tête */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                        Gestion des Salles
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Gérez et supervisez toutes les installations sportives
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Rapport
                    </Button>
                    <Button asChild>
                        <Link to="/admin/facilities/complexes" search={{ view: "rooms" }}>
                            <Plus className="w-4 h-4 mr-2" />
                            Nouvelle salle
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Statistiques principales */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Total Salles</CardTitle>
                        <Warehouse className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{roomStats.total}</div>
                        <p className="text-xs text-muted-foreground">
                            {roomStats.indoor} intérieures • {roomStats.outdoor} extérieures
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Taux d'occupation</CardTitle>
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockRoomStats.occupancyRate}%</div>
                        <div className="mt-2">
                            <Progress value={mockRoomStats.occupancyRate} className="h-2" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Capacité totale</CardTitle>
                        <Users className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{roomStats.totalCapacity}</div>
                        <p className="text-xs text-muted-foreground">
                            Moyenne: {roomStats.avgCapacity} personnes/salle
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Réservations</CardTitle>
                        <CalendarDays className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockRoomStats.totalReservations}</div>
                        <p className="text-xs text-muted-foreground">+12% ce mois-ci</p>
                    </CardContent>
                </Card>
            </div>

            {/* Onglets principaux */}
            <Tabs defaultValue="rooms" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="rooms">Toutes les salles</TabsTrigger>
                    <TabsTrigger value="analytics">Analyses</TabsTrigger>
                    <TabsTrigger value="activity">Activité</TabsTrigger>
                </TabsList>

                <TabsContent value="rooms" className="space-y-4">
                    {/* Filtres et recherche */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Filtres et recherche</CardTitle>
                            <CardDescription>
                                Trouvez rapidement les salles que vous cherchez
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                <div className="relative lg:col-span-2">
                                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Rechercher par nom ou sport..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-8"
                                    />
                                </div>
                                
                                <Select value={filterType} onValueChange={setFilterType}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Type de salle" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tous types</SelectItem>
                                        <SelectItem value="indoor">Intérieure</SelectItem>
                                        <SelectItem value="outdoor">Extérieure</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select value={filterSport} onValueChange={setFilterSport}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sport" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tous sports</SelectItem>
                                        {availableSports.map((sport) => (
                                            <SelectItem key={sport} value={sport}>
                                                {sport}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Trier par" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="name">Nom</SelectItem>
                                        <SelectItem value="sport">Sport</SelectItem>
                                        <SelectItem value="capacity">Capacité</SelectItem>
                                        <SelectItem value="created">Date de création</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Indicateurs de filtres actifs */}
                            {(search || filterType !== "all" || filterSport !== "all") && (
                                <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                                    <Filter className="w-4 h-4" />
                                    <span>Filtres actifs:</span>
                                    {search && <Badge variant="secondary">Recherche: {search}</Badge>}
                                    {filterType !== "all" && (
                                        <Badge variant="secondary">
                                            Type: {filterType === "indoor" ? "Intérieure" : "Extérieure"}
                                        </Badge>
                                    )}
                                    {filterSport !== "all" && (
                                        <Badge variant="secondary">Sport: {filterSport}</Badge>
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setSearch("");
                                            setFilterType("all");
                                            setFilterSport("all");
                                        }}
                                    >
                                        Effacer
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Résultats */}
                    <div className="text-sm text-muted-foreground mb-4">
                        {filteredAndSortedRooms.length} salle{filteredAndSortedRooms.length > 1 ? "s" : ""} trouvée{filteredAndSortedRooms.length > 1 ? "s" : ""}
                        {filteredAndSortedRooms.length !== roomStats.total && ` sur ${roomStats.total} au total`}
                    </div>

                    {/* Grille des salles */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredAndSortedRooms.length === 0 && (
                            <Alert className="col-span-full">
                                <XCircle className="w-5 h-5" />
                                <AlertTitle>Aucune salle trouvée</AlertTitle>
                                <AlertDescription>
                                    {search || filterType !== "all" || filterSport !== "all"
                                        ? "Aucun résultat ne correspond à vos critères de recherche."
                                        : "Aucune salle n'est encore enregistrée."}
                                </AlertDescription>
                            </Alert>
                        )}

                        {filteredAndSortedRooms.map((room) => (
                            <Link
                                to="/admin/facilities/rooms/$roomId"
                                params={{ roomId: room.id }}
                                key={room.id}
                            >
                                <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary/20">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="text-lg leading-6">
                                                    {room.name}
                                                </CardTitle>
                                                <CardDescription className="flex items-center gap-2 mt-1">
                                                    <Notebook  className="w-3 h-3" />
                                                    {room.description}
                                                </CardDescription>
                                            </div>
                                            <Badge variant="outline" className={getSportBadgeColor(room.sportType)}>
                                                {room.sportType}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">Type:</span>
                                                <Badge variant={room.isIndoor ? "default" : "secondary"}>
                                                    {room.isIndoor ? "Intérieure" : "Extérieure"}
                                                </Badge>
                                            </div>
                                            
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">Capacité:</span>
                                                <span className="font-medium flex items-center gap-1">
                                                    <Users className="w-3 h-3" />
                                                    {room.capacity || "Non définie"}
                                                </span>
                                            </div>

                                            {room.accreditation && (
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Accréditation:</span>
                                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                        <Vote className="w-3 h-3 mr-1" />
                                                        {room.accreditation}
                                                    </Badge>
                                                </div>
                                            )}

                                            <Separator />
                                            
                                            <div className="text-xs text-muted-foreground">
                                                Créée le {new Date(room.createdAt).toLocaleDateString("fr-FR")}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Répartition par sport */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Répartition par sport</CardTitle>
                                <CardDescription>
                                    Distribution des salles par type de sport
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {mockRoomStats.popularSports.map((sport) => (
                                        <div key={sport.sport} className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="font-medium">{sport.sport}</span>
                                                <span className="text-muted-foreground">
                                                    {sport.count} salles ({sport.percentage}%)
                                                </span>
                                            </div>
                                            <Progress value={sport.percentage} className="h-2" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Événements à venir */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Événements à venir</CardTitle>
                                <CardDescription>
                                    Prochains événements dans les salles
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {mockRoomStats.upcomingEvents.map((event) => (
                                        <div key={event.id} className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {event.name}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {event.date} • {event.room}
                                                </p>
                                            </div>
                                            <Badge variant="outline">
                                                {event.participants} participants
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="activity" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Activité récente</CardTitle>
                            <CardDescription>
                                Dernières actions effectuées sur les salles
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mockRoomStats.recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-center gap-4 p-3 border rounded-lg">
                                        {getActivityIcon(activity.type)}
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                {activity.action}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {activity.room}
                                            </p>
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                                            {activity.time}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
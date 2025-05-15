import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Calendar, Clock, Download, Plus, RefreshCw, TrendingUp, Users } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function DashboardHomePage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
                    <p className="text-muted-foreground">Bienvenue, Moussa. Voici un aperçu de l'association.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-9">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Actualiser
                    </Button>
                    <Button size="sm" className="h-9">
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter un adhérent
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Adhérents</CardTitle>
                        <Users className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,547</div>
                        <p className="text-xs text-muted-foreground">+12% par rapport au mois dernier</p>
                        <div className="mt-4">
                            <Progress value={75} className="h-2" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Activités</CardTitle>
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">+2 nouvelles activités ce mois-ci</p>
                        <div className="mt-4">
                            <Progress value={60} className="h-2" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Projets sociaux</CardTitle>
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">3 projets en cours, 5 terminés</p>
                        <div className="mt-4">
                            <Progress value={40} className="h-2" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Événements à venir</CardTitle>
                        <Clock className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">Prochain événement dans 3 jours</p>
                        <div className="mt-4">
                            <Progress value={85} className="h-2" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                    <TabsTrigger value="activities">Activités</TabsTrigger>
                    <TabsTrigger value="members">Adhérents</TabsTrigger>
                    <TabsTrigger value="projects">Projets sociaux</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="lg:col-span-4">
                            <CardHeader>
                                <CardTitle>Statistiques des adhésions</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <div className="h-[300px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                                    <BarChart3 className="w-12 h-12 text-gray-400" />
                                    <span className="ml-2 text-gray-500">Graphique des adhésions</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="lg:col-span-3">
                            <CardHeader>
                                <CardTitle>Événements à venir</CardTitle>
                                <CardDescription>Les prochains événements de l'association</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 mr-2 rounded-full bg-emerald-500"></div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">Tournoi de football</p>
                                            <p className="text-sm text-muted-foreground">15 mai 2025 - Stade municipal</p>
                                        </div>
                                        <Badge>Sport</Badge>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 mr-2 rounded-full bg-blue-500"></div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">Atelier d'insertion professionnelle</p>
                                            <p className="text-sm text-muted-foreground">20 mai 2025 - Salle polyvalente</p>
                                        </div>
                                        <Badge variant="outline">Social</Badge>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 mr-2 rounded-full bg-orange-500"></div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">Compétition de natation</p>
                                            <p className="text-sm text-muted-foreground">28 mai 2025 - Piscine municipale</p>
                                        </div>
                                        <Badge>Sport</Badge>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 mr-2 rounded-full bg-purple-500"></div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">Session de soutien scolaire</p>
                                            <p className="text-sm text-muted-foreground">2 juin 2025 - Centre culturel</p>
                                        </div>
                                        <Badge variant="outline">Social</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Nouveaux adhérents</CardTitle>
                                <CardDescription>Les 5 derniers adhérents inscrits</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { name: "Sophie Martin", email: "s.martin@example.com", date: "12 mai 2025" },
                                        { name: "Thomas Dubois", email: "t.dubois@example.com", date: "10 mai 2025" },
                                        { name: "Emma Petit", email: "e.petit@example.com", date: "8 mai 2025" },
                                        { name: "Lucas Bernard", email: "l.bernard@example.com", date: "5 mai 2025" },
                                        { name: "Chloé Moreau", email: "c.moreau@example.com", date: "2 mai 2025" },
                                    ].map((user, index) => (
                                        <div key={index} className="flex items-center">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={user.name} />
                                                <AvatarFallback>
                                                    {user.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="ml-4 space-y-1">
                                                <p className="text-sm font-medium leading-none">{user.name}</p>
                                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                            </div>
                                            <div className="ml-auto text-sm text-muted-foreground">{user.date}</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Projets sociaux en cours</CardTitle>
                                <CardDescription>État d'avancement des projets</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm font-medium">Aide au permis de conduire</div>
                                            <div className="text-sm text-muted-foreground">75%</div>
                                        </div>
                                        <Progress value={75} className="h-2" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm font-medium">Soutien scolaire</div>
                                            <div className="text-sm text-muted-foreground">60%</div>
                                        </div>
                                        <Progress value={60} className="h-2" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm font-medium">Insertion professionnelle</div>
                                            <div className="text-sm text-muted-foreground">45%</div>
                                        </div>
                                        <Progress value={45} className="h-2" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Rapports récents</CardTitle>
                                <CardDescription>Téléchargez les derniers rapports</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">Rapport financier - Avril 2025</p>
                                            <p className="text-sm text-muted-foreground">PDF • 2.4 MB</p>
                                        </div>
                                        <Button variant="ghost" size="icon">
                                            <Download className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">Bilan des activités - T1 2025</p>
                                            <p className="text-sm text-muted-foreground">PDF • 3.8 MB</p>
                                        </div>
                                        <Button variant="ghost" size="icon">
                                            <Download className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">Impact des projets sociaux</p>
                                            <p className="text-sm text-muted-foreground">PDF • 1.6 MB</p>
                                        </div>
                                        <Button variant="ghost" size="icon">
                                            <Download className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="activities" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Activités sportives</CardTitle>
                            <CardDescription>Gérez les activités et les plannings d'entraînement</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                                <Calendar className="w-12 h-12 text-gray-400" />
                                <span className="ml-2 text-gray-500">Contenu des activités à venir</span>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="members" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Liste des adhérents</CardTitle>
                            <CardDescription>Gérez les profils et les cotisations des adhérents</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                                <Users className="w-12 h-12 text-gray-400" />
                                <span className="ml-2 text-gray-500">Tableau des adhérents à venir</span>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="projects" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Projets sociaux</CardTitle>
                            <CardDescription>Suivez l'avancement des initiatives sociales</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                                <TrendingUp className="w-12 h-12 text-gray-400" />
                                <span className="ml-2 text-gray-500">Suivi des projets à venir</span>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

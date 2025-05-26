// client/src/features/clubs/pages/ClubsListPage.tsx
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Building2, 
  Settings, 
  Plus, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Users,
  FolderOpen,
  Calendar,
  ArrowRight,
  Edit
} from "lucide-react";
import type { Club } from "../../types";

export function ClubsListPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/clubs")
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du chargement');
        return res.json();
      })
      .then((data) => {
        setClubs(data);
      })
      .catch((error) => {
        console.error('Erreur:', error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const mainClub = clubs.length > 0 ? clubs[0] : null;

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 sm:p-6 space-y-8 max-w-7xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-10 w-80" />
              <Skeleton className="h-4 w-96" />
            </div>
            <Skeleton className="h-10 w-40" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-96" />
            <div className="space-y-4">
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-8 max-w-7xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-3">
              <Building2 className="h-8 w-8 text-primary" />
              Mon Association
            </h1>
            <p className="text-lg text-muted-foreground">
              Gérez l'Association Sportive de Pierrefitte-sur-Seine
            </p>
          </div>
          {!mainClub && (
            <Link to="/dashboard/clubs/create">
              <Button size="lg" className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Créer l'association
              </Button>
            </Link>
          )}
        </div>

        {/* Contenu principal */}
        {!mainClub ? (
          // État initial - aucune association créée
          <Card className="border-dashed border-2 border-muted-foreground/25">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="p-6 bg-primary/10 rounded-full mb-6">
                <Building2 className="h-16 w-16 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                Bienvenue sur ASP Hub
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md text-lg">
                Commencez par créer votre association sportive pour accéder à tous les outils de gestion.
              </p>
              <Link to="/dashboard/clubs/create">
                <Button size="lg" className="text-lg px-8 py-3">
                  <Plus className="mr-3 h-6 w-6" />
                  Créer mon association
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          // Association existante
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Carte principale de l'association */}
            <Card className="shadow-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <Building2 className="h-8 w-8 text-primary" />
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      Association Principale
                    </Badge>
                  </div>
                  <Link 
                    to="/dashboard/clubs/$clubId/edit" 
                    params={{ clubId: mainClub.id }}
                  >
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                
                <div>
                  <CardTitle className="text-2xl font-bold mb-2">
                    {mainClub.name}
                  </CardTitle>
                  {mainClub.description && (
                    <CardDescription className="text-base leading-relaxed">
                      {mainClub.description}
                    </CardDescription>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Informations de contact */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Informations de contact
                  </h4>
                  
                  <div className="grid gap-3">
                    {mainClub.address && (
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 bg-muted rounded">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-muted-foreground">Adresse</p>
                          <p className="text-sm">{mainClub.address}</p>
                        </div>
                      </div>
                    )}

                    {mainClub.email && (
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-muted rounded">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-muted-foreground">Email</p>
                          <Badge variant="outline" className="text-xs">
                            {mainClub.email}
                          </Badge>
                        </div>
                      </div>
                    )}

                    {mainClub.phone && (
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-muted rounded">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
                          <Badge variant="outline" className="text-xs">
                            {mainClub.phone}
                          </Badge>
                        </div>
                      </div>
                    )}

                    {mainClub.website && (
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-muted rounded">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-muted-foreground">Site web</p>
                          <a 
                            href={mainClub.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Badge variant="outline" className="text-xs hover:bg-primary/10 transition-colors cursor-pointer">
                              {mainClub.website}
                            </Badge>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bouton principal d'accès */}
                <div className="pt-4 border-t border-primary/20">
                  <Link 
                    to="/dashboard/clubs/$clubId" 
                    params={{ clubId: mainClub.id }}
                    className="block"
                  >
                    <Button 
                      size="lg" 
                      className="w-full text-lg py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
                    >
                      <Building2 className="mr-3 h-6 w-6" />
                      Gérer mon association
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Actions rapides
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Accédez directement aux fonctionnalités principales de gestion.
                </p>
              </div>

              <div className="space-y-4">
                <Link 
                  to="/dashboard/clubs/$clubId/sections" 
                  params={{ clubId: mainClub.id }}
                >
                  <Card className="group hover:shadow-md transition-all duration-200 hover:border-primary/20 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                          <FolderOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium group-hover:text-primary transition-colors">
                            Gérer les sections
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Organisez vos sections sportives
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link 
                  to="/dashboard/clubs/$clubId/categories" 
                  params={{ clubId: mainClub.id }}
                >
                  <Card className="group hover:shadow-md transition-all duration-200 hover:border-primary/20 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                          <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium group-hover:text-primary transition-colors">
                            Voir toutes les catégories
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Vue d'ensemble des catégories d'âge
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link 
                  to="/dashboard/clubs/$clubId/sessions" 
                  params={{ clubId: mainClub.id }}
                >
                  <Card className="group hover:shadow-md transition-all duration-200 hover:border-primary/20 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg group-hover:bg-orange-200 dark:group-hover:bg-orange-800 transition-colors">
                          <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium group-hover:text-primary transition-colors">
                            Gérer les sessions
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Planifiez entraînements et matchs
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
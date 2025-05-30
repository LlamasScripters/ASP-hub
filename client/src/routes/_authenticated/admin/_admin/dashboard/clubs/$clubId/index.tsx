// client/src/routes/_authenticated/dashboard/clubs/$clubId/index.tsx
import { Outlet, Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Club } from "@/features/clubs/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, Phone, Users, Calendar, Settings, FolderOpen, Building2, MapPin, Globe, FileText, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/_admin/dashboard/clubs/$clubId/")({
  component: ClubOverviewPage,
});

function ClubOverviewPage() {
  const { clubId } = Route.useParams();
  const [club, setClub] = useState<Club | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/clubs/${clubId}`)
      .then((res) => res.json())
      .then((data) => {
        setClub(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [clubId]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-8 max-w-7xl">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-6 w-48" />
            </div>
            <Separator />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="container mx-auto p-6 max-w-7xl">
        <Card className="border-destructive/50">
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">
              <Building2 className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p className="text-lg font-medium">Club introuvable</p>
              <p className="text-sm">Le club demandé n'existe pas ou n'est plus accessible.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const managementActions = [
    {
      to: "/admin/dashboard/clubs/$clubId/sections",
      icon: FolderOpen,
      label: "Gérer les sections",
      description: "Organisez vos sections sportives",
      variant: "default" as const,
    },
    {
      to: "/admin/dashboard/clubs/$clubId/categories",
      icon: Users,
      label: "Gérer les catégories",
      description: "Définissez les catégories d'âge",
      variant: "secondary" as const,
    },
    {
      to: "/admin/dashboard/clubs/$clubId/sessions",
      icon: Calendar,
      label: "Gérer les sessions",
      description: "Planifiez vos entraînements, matchs...",
      variant: "secondary" as const,
    },
    {
      to: "/admin/dashboard/clubs/$clubId/edit",
      icon: Settings,
      label: "Modifier le club",
      description: "Paramètres du club",
      variant: "outline" as const,
    },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-8 max-w-7xl">
      {/* En-tête principal */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-3">
              <Building2 className="h-8 w-8 text-primary" />
              {club.name}
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Tableau de bord de gestion du club
            </p>
          </div>
          <Link to="/admin/dashboard/clubs">
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour à l'association
            </Button>
          </Link>
        </div>

        {/* Informations du club */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Informations du club
            </CardTitle>
            <CardDescription>
              Coordonnées et détails de contact du club
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Description du club */}
            {club.description && (
              <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
                    <p className="text-sm leading-relaxed">{club.description}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Adresse */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Adresse</p>
                  {club.address ? (
                    <p className="text-sm mt-1 break-words">{club.address}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">Non renseignée</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  {club.email ? (
                    <Badge variant="outline" className="mt-1 text-sm font-normal">
                      {club.email}
                    </Badge>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">Non renseigné</p>
                  )}
                </div>
              </div>

              {/* Téléphone */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
                  {club.phone ? (
                    <Badge variant="outline" className="mt-1 text-sm font-normal">
                      {club.phone}
                    </Badge>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">Non renseigné</p>
                  )}
                </div>
              </div>

              {/* Site web */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Site web</p>
                  {club.website ? (
                    <a 
                      href={club.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mt-1"
                    >
                      <Badge variant="outline" className="text-sm font-normal hover:bg-primary/10 transition-colors cursor-pointer">
                        {club.website}
                      </Badge>
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">Non renseigné</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions de gestion */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Actions de gestion</CardTitle>
            <CardDescription>
              Accédez rapidement aux différentes sections de gestion de votre club
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {managementActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.to}
                    to={action.to}
                    params={{ clubId }}
                    className="group"
                  >
                    <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/20 cursor-pointer">
                      <CardContent className="p-4 flex flex-col items-center text-center space-y-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-medium text-sm">{action.label}</h3>
                          <p className="text-xs text-muted-foreground leading-tight">
                            {action.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Outlet />
    </div>
  );
}
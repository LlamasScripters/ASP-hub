// client/src/features/clubs/components/ClubForm.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save, ArrowLeft, Building2, Mail, Phone, MapPin, Globe, FileText } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Club } from "../../types";

const clubSchema = z.object({
  name: z.string().min(1, "Le nom du club est requis").max(255, "Le nom ne peut pas dépasser 255 caractères"),
  description: z.string().optional(),
  address: z.string().optional(),
  email: z.string().email("Adresse email invalide").optional().or(z.literal("")),
  phone: z.string().optional(),
  website: z.string().url("L'URL du site web est invalide").optional().or(z.literal("")),
});

type ClubFormData = z.infer<typeof clubSchema>;

export function ClubForm({ mode, clubId }: { mode: "create" | "edit"; clubId?: string }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ClubFormData>({
    resolver: zodResolver(clubSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      email: "",
      phone: "",
      website: "",
    },
  });

  useEffect(() => {
    if (mode === "edit" && clubId) {
      setIsLoading(true);
      fetch(`/api/clubs/${clubId}`)
        .then((res) => {
          if (!res.ok) throw new Error('Erreur lors du chargement du club');
          return res.json();
        })
        .then((club: Club) => {
          form.reset({
            name: club.name || "",
            description: club.description || "",
            address: club.address || "",
            email: club.email || "",
            phone: club.phone || "",
            website: club.website || "",
          });
        })
        .catch((error) => {
          console.error('Erreur:', error);
          toast.error("Erreur lors du chargement du club");
        })
        .finally(() => setIsLoading(false));
    }
  }, [mode, clubId, form]);

  const onSubmit = async (data: ClubFormData) => {
    setIsLoading(true);
    try {
      // Nettoyer les données avant envoi (convertir les chaînes vides en undefined)
      const cleanData = {
        ...data,
        email: data.email || undefined,
        phone: data.phone || undefined,
        website: data.website || undefined,
        description: data.description || undefined,
        address: data.address || undefined,
      };

      const url = mode === "create" ? "/api/clubs" : `/api/clubs/${clubId}`;
      const method = mode === "create" ? "POST" : "PUT";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde');
      }

      toast.success(mode === "create" ? "Club créé avec succès !" : "Club modifié avec succès !");
      navigate({ to: "/dashboard/clubs" });
    } catch (error) {
      console.error('Erreur:', error);
      toast.error("Une erreur est survenue lors de la sauvegarde");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (mode === "edit" && clubId) {
      navigate({ to: "/dashboard/clubs/$clubId", params: { clubId } });
    } 
  };

  if (isLoading && mode === "edit") {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Chargement du club...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <Building2 className="h-8 w-8 text-primary" />
              {mode === "create" ? "Créer un club" : "Modifier le club"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {mode === "create" 
                ? "Remplissez les informations ci-dessous pour créer votre club"
                : "Modifiez les informations de votre club"
              }
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
        </div>

        {/* Form */}
        <Card className="shadow-lg border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              Informations du club
            </CardTitle>
            <CardDescription>
              Remplissez les informations ci-dessous pour {mode === "create" ? "créer" : "modifier"} votre club.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Nom du club */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Nom du club *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Club Sportif Municipal, Association de Football..."
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Le nom officiel de votre club ou association sportive.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Décrivez votre club, ses activités, ses valeurs..."
                          className="min-h-[100px] resize-vertical"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Une description de votre club, ses activités et ses objectifs.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Adresse */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Adresse
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Adresse complète du club ou lieu principal d'activité..."
                          className="min-h-[80px] resize-vertical"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        L'adresse physique de votre club ou de votre lieu principal d'activité.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Coordonnées */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-medium flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="contact@monclub.fr"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Adresse email de contact du club.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Téléphone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-medium flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Téléphone
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="01 23 45 67 89"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Numéro de téléphone de contact.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Site web */}
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Site web
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://www.monclub.fr"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        URL du site web officiel de votre club.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="flex items-center gap-2 flex-1 sm:flex-none"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {mode === "create" ? "Création..." : "Modification..."}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        {mode === "create" ? "Créer le club" : "Sauvegarder"}
                      </>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Annuler
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// client/src/features/clubs/components/SectionForm.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save, ArrowLeft, FolderOpen, Palette, FileText } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ColorPicker } from "@/components/ui/color-picker";
import type { Section } from "../../types";

const sectionSchema = z.object({
  name: z.string().min(1, "Le nom est requis").max(100, "Le nom ne peut pas dépasser 100 caractères"),
  description: z.string().optional(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "La couleur doit être au format hexadécimal (#000000)").optional(),
});

type SectionFormData = z.infer<typeof sectionSchema>;

export function SectionForm({ 
  mode, 
  clubId, 
  sectionId 
}: { 
  mode: "create" | "edit"; 
  clubId: string; 
  sectionId?: string; 
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<SectionFormData>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      name: "",
      description: "",
      color: "#3b82f6", // blue-500 par défaut
    },
  });

  useEffect(() => {
    if (mode === "edit" && sectionId) {
      setIsLoading(true);
      fetch(`/api/clubs/${clubId}/sections/${sectionId}`)
        .then((res) => {
          if (!res.ok) throw new Error('Erreur lors du chargement de la section');
          return res.json();
        })
        .then((section: Section) => {
          form.reset({
            name: section.name || "",
            description: section.description || "",
            color: section.color || "#3b82f6",
          });
        })
        .catch((error) => {
          console.error('Erreur:', error);
          toast.error("Erreur lors du chargement de la section");
        })
        .finally(() => setIsLoading(false));
    }
  }, [mode, sectionId, clubId, form]);

  const onSubmit = async (data: SectionFormData) => {
    setIsLoading(true);
    try {
      const url = mode === "create" 
        ? `/api/clubs/${clubId}/sections`
        : `/api/clubs/${clubId}/sections/${sectionId}`;
      
      const method = mode === "create" ? "POST" : "PUT";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde');
      }

      toast.success(mode === "create" ? "Section créée avec succès !" : "Section modifiée avec succès !");
      navigate({ to: "/admin/dashboard/clubs/$clubId/sections", params: { clubId } });
    } catch (error) {
      console.error('Erreur:', error);
      toast.error("Une erreur est survenue lors de la sauvegarde");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate({ to: "/admin/dashboard/clubs/$clubId/sections", params: { clubId } });
  };

  if (isLoading && mode === "edit") {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Chargement de la section...</span>
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
              <FolderOpen className="h-8 w-8 text-primary" />
              {mode === "create" ? "Créer une section" : "Modifier la section"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {mode === "create" 
                ? "Ajoutez une nouvelle section à votre club pour organiser vos membres"
                : "Modifiez les informations de cette section"
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
              <div 
                className="w-4 h-4 rounded-full border border-primary/20" 
                style={{ backgroundColor: form.watch("color") || "#3b82f6" }}
              />
              Informations de la section
            </CardTitle>
            <CardDescription>
              Remplissez les informations ci-dessous pour {mode === "create" ? "créer" : "modifier"} votre section.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Nom de la section */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium flex items-center gap-2">
                        <FolderOpen className="h-4 w-4" />
                        Nom de la section *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Football, Basketball, Tennis..."
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Choisissez un nom clair et descriptif pour votre section sportive.
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
                          placeholder="Décrivez cette section sportive, ses activités, ses spécificités..."
                          className="min-h-[100px] resize-vertical"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Expliquez brièvement les activités et objectifs de cette section.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Couleur */}
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        Couleur de la section
                      </FormLabel>
                      <FormControl>
                        <ColorPicker
                          value={field.value}
                          onChange={field.onChange}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>
                        Choisissez une couleur pour identifier visuellement cette section dans l'interface.
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
                        {mode === "create" ? "Créer la section" : "Sauvegarder"}
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

// client/src/features/clubs/components/CategoryForm.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Save, ArrowLeft, Users, AlertCircle, Calendar, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import type { Category } from "../../types";

const schema = z.object({
  name: z.string().min(1, "Le nom est obligatoire"),
  description: z.string().optional(),
  ageMin: z.number().int().nonnegative().optional(),
  ageMax: z.number().int().nonnegative().optional(),
}).refine((data) => {
  if (data.ageMin !== undefined && data.ageMax !== undefined) {
    return data.ageMin <= data.ageMax;
  }
  return true;
}, {
  message: "L'âge minimum doit être inférieur ou égal à l'âge maximum",
  path: ["ageMax"]
});

export function CategoryForm({ mode, clubId, sectionId, categoryId }: { mode: "create" | "edit"; clubId: string; sectionId: string; categoryId?: string }) {
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<Category>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && categoryId) {
      setIsLoading(true);
      fetch(`/api/clubs/${clubId}/sections/${sectionId}/categories/${categoryId}`)
        .then((res) => res.json())
        .then(setForm)
        .finally(() => setIsLoading(false));
    }
  }, [mode, categoryId, clubId, sectionId]);

  // Validation en temps réel des âges
  const validateAgeRange = (ageMin?: number, ageMax?: number) => {
    if (ageMin !== undefined && ageMax !== undefined) {
      if (ageMin > ageMax) {
        return "L'âge minimum ne peut pas être supérieur à l'âge maximum";
      }
      if (ageMin === ageMax) {
        return "L'âge minimum et maximum ne peuvent pas être identiques";
      }
    }
    return null;
  };

  const ageRangeError = validateAgeRange(form.ageMin, form.ageMax);
  const isValidAgeRange = form.ageMin !== undefined && form.ageMax !== undefined && !ageRangeError;

  const handleAgeMinChange = (value: string) => {
    const ageMin = value ? Number(value) : undefined;
    setForm(prev => ({ ...prev, ageMin }));
  };

  const handleAgeMaxChange = (value: string) => {
    const ageMax = value ? Number(value) : undefined;
    setForm(prev => ({ ...prev, ageMax }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    // Validation côté client
    if (ageRangeError) {
      setErrors({ ageRange: ageRangeError });
      setIsLoading(false);
      return;
    }

    const parsed = schema.safeParse({
      ...form,
      ageMin: form.ageMin ? Number(form.ageMin) : undefined,
      ageMax: form.ageMax ? Number(form.ageMax) : undefined,
    });

    if (!parsed.success) {
      const formattedErrors: Record<string, string> = {};
      parsed.error.errors.forEach((error) => {
        const field = error.path[0] as string;
        formattedErrors[field] = error.message;
      });
      setErrors(formattedErrors);
      setIsLoading(false);
      return;
    }

    try {
      if (mode === "create") {
        await fetch(`/api/clubs/${clubId}/sections/${sectionId}/categories`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        });
      } else {
        await fetch(`/api/clubs/${clubId}/sections/${sectionId}/categories/${categoryId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        });
      }

      toast.success(mode === "create" ? "Catégorie créée avec succès !" : "Catégorie modifiée avec succès !");
      navigate({ to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/categories", params: { clubId, sectionId } });
    } catch (error) {
      console.error('Erreur:', error);
      toast.error("Erreur lors de la sauvegarde de la catégorie");
      setErrors({ general: "Une erreur est survenue lors de la sauvegarde" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate({ to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/categories", params: { clubId, sectionId } });
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleBack} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              {mode === "create" ? "Créer une catégorie" : "Modifier la catégorie"}
            </h1>
            <p className="text-muted-foreground">
              {mode === "create" 
                ? "Ajoutez une nouvelle catégorie d'âge à votre section"
                : "Modifiez les informations de cette catégorie"
              }
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errors.general && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.general}</AlertDescription>
          </Alert>
        )}

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Informations de la catégorie
            </CardTitle>
            <CardDescription>
              Définissez les paramètres de votre catégorie d'âge
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Nom de la catégorie <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Ex: U15, Seniors, Débutants..."
                    value={form.name ?? ""}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Description optionnelle de la catégorie..."
                    value={form.description ?? ""}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Ajoutez des détails sur cette catégorie (objectifs, niveau requis, etc.)
                  </p>
                </div>
              </div>

              <Separator />

              {/* Age Range */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <h3 className="text-lg font-semibold">Tranche d'âge</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Définissez les limites d'âge pour cette catégorie
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ageMin" className="text-sm font-medium">
                      Âge minimum
                    </Label>
                    <Input
                      id="ageMin"
                      type="number"
                      placeholder="Ex: 12"
                      min="0"
                      max="100"
                      value={form.ageMin ?? ""}
                      onChange={(e) => handleAgeMinChange(e.target.value)}
                      className={errors.ageMin || ageRangeError ? "border-destructive" : ""}
                    />
                    {errors.ageMin && (
                      <p className="text-sm text-destructive">{errors.ageMin}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ageMax" className="text-sm font-medium">
                      Âge maximum
                    </Label>
                    <Input
                      id="ageMax"
                      type="number"
                      placeholder="Ex: 18"
                      min="0"
                      max="100"
                      value={form.ageMax ?? ""}
                      onChange={(e) => handleAgeMaxChange(e.target.value)}
                      className={errors.ageMax || ageRangeError ? "border-destructive" : ""}
                    />
                    {errors.ageMax && (
                      <p className="text-sm text-destructive">{errors.ageMax}</p>
                    )}
                  </div>
                </div>

                {/* Erreur de tranche d'âge */}
                {ageRangeError && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{ageRangeError}</AlertDescription>
                  </Alert>
                )}

                {/* Aperçu de la tranche d'âge valide */}
                {isValidAgeRange && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700">
                      Cette catégorie acceptera les participants âgés de{" "}
                      <span className="font-semibold">
                        {form.ageMin} à {form.ageMax} ans
                      </span>
                      {form.ageMin !== undefined && form.ageMax !== undefined && (
                        <>
                          {" "}({form.ageMax - form.ageMin + 1} années couvertes)
                        </>
                      )}
                    </p>
                  </div>
                )}

                {/* Aide pour les tranches d'âge */}
                {!form.ageMin && !form.ageMax && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                      💡 <strong>Conseil :</strong> Laissez vide pour une catégorie sans restriction d'âge, ou définissez une tranche pour cibler un groupe spécifique.
                    </p>
                  </div>
                )}
              </div>

              <Separator />

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={isLoading}
                >
                  Annuler
                </Button>
                <Button 
                  type="submit" 
                  disabled={isLoading || !!ageRangeError} 
                  className="min-w-[120px]"
                >
                  {isLoading ? (
                    "Enregistrement..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {mode === "create" ? "Créer" : "Modifier"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

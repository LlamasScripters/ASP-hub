import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [acceptTerms, setAcceptTerms] = useState(false)
    const navigate = useNavigate()
    const { toast } = useToast()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            toast({
                title: "Erreur",
                description: "Les mots de passe ne correspondent pas.",
                variant: "destructive",
            })
            return
        }

        if (!acceptTerms) {
            toast({
                title: "Erreur",
                description: "Vous devez accepter les conditions d'utilisation.",
                variant: "destructive",
            })
            return
        }

        setIsLoading(true)

        try {
            // Simulation d'une inscription réussie
            // À remplacer par une véritable inscription
            await new Promise((resolve) => setTimeout(resolve, 1000))

            toast({
                title: "Inscription réussie",
                description: "Votre compte a été créé avec succès.",
            })

            navigate({ to: "/auth/login" })
        } catch (error) {
            toast({
                title: "Erreur d'inscription",
                description: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="container flex flex-col items-center justify-center flex-1 px-4 py-12 mx-auto sm:px-6">
                <Link to="/" className="flex items-center mb-8 text-emerald-600 hover:text-emerald-700">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour à l'accueil
                </Link>

                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1 text-center">
                        <div className="flex justify-center mb-2">
                            <Shield className="w-10 h-10 text-emerald-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Créer un compte</CardTitle>
                        <CardDescription>Inscrivez-vous pour rejoindre l'association</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">Prénom</Label>
                                    <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Nom</Label>
                                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="exemple@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Mot de passe</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="terms"
                                    checked={acceptTerms}
                                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                                />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    J'accepte les{" "}
                                    <Link to="/terms" className="text-emerald-600 hover:text-emerald-700">
                                        conditions d'utilisation
                                    </Link>
                                </label>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Inscription en cours..." : "S'inscrire"}
                            </Button>
                            <div className="mt-4 text-sm text-center text-gray-500">
                                Déjà inscrit?{" "}
                                <Link to="/login" className="text-emerald-600 hover:text-emerald-700">
                                    Se connecter
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}

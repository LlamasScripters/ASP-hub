import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Simulation d'une connexion réussie
            // À remplacer par une véritable authentification
            await new Promise((resolve) => setTimeout(resolve, 1000))

            toast({
                title: "Connexion réussie",
                description: "Vous êtes maintenant connecté à votre compte.",
            })

            navigate({ to: "/dashboard" })
        } catch (error) {
            toast({
                title: "Erreur de connexion",
                description: "Identifiants incorrects. Veuillez réessayer.",
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
                        <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
                        <CardDescription>Entrez vos identifiants pour accéder à votre compte</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="exemple@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Mot de passe</Label>
                                    <Link to="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700">
                                        Mot de passe oublié?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Connexion en cours..." : "Se connecter"}
                            </Button>
                            <div className="mt-4 text-sm text-center text-gray-500">
                                Pas encore de compte?{" "}
                                <Link to="/register" className="text-emerald-600 hover:text-emerald-700">
                                    S'inscrire
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}

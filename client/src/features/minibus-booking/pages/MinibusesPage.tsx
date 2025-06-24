import { useState, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { Minibus } from "@/features/minibus-booking/hooks/useMinibuses";
import { MinibusesList } from "@/features/minibus-booking/components/minibuses/MinibusesList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
	Bus,
	CalendarDays,
	Filter,
	LayoutList,
	Plus,
	Search,
	UserCheck,
	XCircle,
	// @ts-ignore
} from "lucide-react";

interface MinibusesPageProps {
	initialMinibuses?: Minibus[];
}

export function MinibusesPage({ initialMinibuses = [] }: MinibusesPageProps) {
	const navigate = useNavigate();
	const [search, setSearch] = useState("");
	const [filterType, setFilterType] = useState<string>("all");

	const filteredMinibuses = useMemo(() => {
		return initialMinibuses.filter((minibus) => {
			const matchesSearch = minibus.name
				.toLowerCase()
				.includes(search.toLowerCase()) ||
				minibus.licensePlate
				.toLowerCase()
				.includes(search.toLowerCase());
			const matchesType =
				filterType === "all" ||
				(filterType === "available" && minibus.isAvailable) ||
				(filterType === "unavailable" && !minibus.isAvailable);
			return matchesSearch && matchesType;
		});
	}, [search, filterType, initialMinibuses]);
	const handleView = (minibusId: string) => {
		navigate({
			to: "/admin/assets/minibuses/$minibusId",
			params: { minibusId },
		});
	};

	const handleCreate = () => {
		navigate({ to: "/admin/assets/minibuses/create" });
	};

	const totalMinibuses = initialMinibuses.length;
	const totalAvailable = initialMinibuses.filter((m) => m.isAvailable).length;
	const totalUnavailable = totalMinibuses - totalAvailable;
	const totalCapacity = initialMinibuses.reduce((sum, m) => sum + m.capacity, 0);

	return (
		<div className="space-y-6">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Tous les minibus
					</h1>
					<p className="text-muted-foreground">
						Liste de tous les minibus de la flotte
					</p>
				</div>
				<Button onClick={handleCreate} className="w-full md:w-auto">
					<Plus className="w-4 h-4 mr-2" /> Nouveau minibus
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Filtres</CardTitle>
					<CardDescription>
						Recherchez et filtrez les minibus par statut ou nom
					</CardDescription>
				</CardHeader>
				<CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="space-y-2">
						<label htmlFor="search" className="text-sm font-medium">Recherche</label>
						<div className="relative">
							<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								id="search"
								placeholder="Nom ou plaque..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="pl-8"
							/>
						</div>
					</div>
					<div className="space-y-2">
						<label htmlFor="type-filter" className="text-sm font-medium">Statut</label>
						<select
							id="type-filter"
							value={filterType}
							onChange={(e) => setFilterType(e.target.value)}
							className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						>
							<option value="all">Tous</option>
							<option value="available">Disponibles</option>
							<option value="unavailable">Indisponibles</option>
						</select>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<LayoutList className="w-4 h-4" />
						Statistiques
					</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
						<Bus className="w-8 h-8 text-blue-600" />
						<div>
							<p className="text-sm text-muted-foreground">Total minibus</p>
							<p className="text-2xl font-bold text-blue-600">{totalMinibuses}</p>
						</div>
					</div>
					<div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
						<CalendarDays className="w-8 h-8 text-green-600" />
						<div>
							<p className="text-sm text-muted-foreground">Disponibles</p>
							<p className="text-2xl font-bold text-green-600">{totalAvailable}</p>
						</div>
					</div>
					<div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
						<XCircle className="w-8 h-8 text-red-600" />
						<div>
							<p className="text-sm text-muted-foreground">Indisponibles</p>
							<p className="text-2xl font-bold text-red-600">{totalUnavailable}</p>
						</div>
					</div>
					<div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
						<UserCheck className="w-8 h-8 text-orange-600" />
						<div>
							<p className="text-sm text-muted-foreground">Capacité totale</p>
							<p className="text-2xl font-bold text-orange-600">{totalCapacity}</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<Separator />

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{filteredMinibuses.length === 0 && (
					<div className="col-span-full text-center py-12">
						<Bus className="mx-auto h-12 w-12 text-muted-foreground" />
						<h3 className="mt-2 text-sm font-semibold text-muted-foreground">
							Aucun minibus trouvé
						</h3>
						<p className="mt-1 text-sm text-muted-foreground">
							{search || filterType !== "all"
								? "Essayez de modifier vos filtres."
								: "Commencez par créer un nouveau minibus."}
						</p>
						{!search && filterType === "all" && (
							<Button onClick={handleCreate} className="mt-4">
								<Plus className="w-4 h-4 mr-2" />
								Créer un minibus
							</Button>
						)}
					</div>
				)}

				{filteredMinibuses.map((minibus) => (
					<Card 
						key={minibus.id} 
						className="hover:shadow-md transition-shadow cursor-pointer"
						onClick={() => handleView(minibus.id)}
					>
						<CardHeader className="pb-3">
							<div className="flex items-start justify-between">
								<div className="space-y-1">
									<CardTitle className="text-lg">{minibus.name}</CardTitle>
									<p className="text-sm text-muted-foreground font-mono">
										{minibus.licensePlate}
									</p>
								</div>
								<div className="text-right">
									{minibus.isAvailable ? (
										<span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
											Disponible
										</span>
									) : (
										<span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
											Indisponible
										</span>
									)}
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-3">
							<div className="flex items-center justify-between text-sm">
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-1 text-muted-foreground">
										<Bus className="h-3 w-3" />
										{minibus.capacity} places
									</div>
									{minibus.disabledPersonCapacity > 0 && (
										<div className="flex items-center gap-1 text-muted-foreground">
											<UserCheck className="h-3 w-3" />
											{minibus.disabledPersonCapacity} PMR
										</div>
									)}
								</div>
							</div>

							{minibus.description && (
								<p className="text-sm text-muted-foreground line-clamp-2">
									{minibus.description}
								</p>
							)}

							<div className="pt-2 border-t">
								<div className="text-xs text-muted-foreground">
									Créé le {new Date(minibus.createdAt).toLocaleDateString("fr-FR")}
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Composant Liste détaillée - Alternative */}
			{/* <MinibusesList initialMinibuses={initialMinibuses} /> */}
		</div>
	);
}

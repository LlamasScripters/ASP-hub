import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { complexesApi } from "@room-booking/lib/api/complexes";
import { roomsApi } from "@room-booking/lib/api/rooms";
import { useRoomReservations } from "@room-booking/hooks/useRoomReservations";
import type { Complex } from "@room-booking/hooks/useComplexes";
import type { Room } from "@room-booking/hooks/useRooms";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Building, MapPin, Users, Zap, Loader2 } from "lucide-react";

interface RoomSelectionProps {
	onRoomSelect: (roomId: string | null) => void;
	selectedRoomId?: string | null;
	sessionStartDate?: Date;
	sessionEndDate?: Date;
}

export function RoomSelection({
	onRoomSelect,
	selectedRoomId,
	sessionStartDate,
	sessionEndDate,
}: RoomSelectionProps) {
	const [selectedComplexId, setSelectedComplexId] = useState<string>("");
	const [selectedRoomId_, setSelectedRoomId_] = useState<string>(selectedRoomId || "");

	// Requête pour récupérer les complexes
	const { data: complexesData, isLoading: isLoadingComplexes } = useQuery({
		queryKey: ["complexes"],
		queryFn: () => complexesApi.getComplexes(),
		initialData: { data: [], total: 0, page: 1, limit: 20 },
	});

	// Requête pour récupérer les salles du complexe sélectionné
	const { data: roomsData, isLoading: isLoadingRooms } = useQuery({
		queryKey: ["rooms", "by-complex", selectedComplexId],
		queryFn: () => roomsApi.getRoomsByComplexId(selectedComplexId, 1, 50),
		enabled: !!selectedComplexId,
		initialData: { data: [], total: 0, page: 1, limit: 50 },
	});

	const complexes = complexesData?.data || [];
	const rooms = roomsData?.data || [];

	// Vérification de la disponibilité des salles
	const { roomReservations } = useRoomReservations({
		roomId: selectedRoomId_,
		startDate: sessionStartDate,
		endDate: sessionEndDate,
	});

	const isRoomAvailable = (roomId: string) => {
		if (!sessionStartDate || !sessionEndDate || !roomReservations) return true;
		
		// Vérifier s'il y a des conflits avec les réservations existantes
		return !roomReservations.some((reservation) => {
			const reservationStart = new Date(reservation.startAt);
			const reservationEnd = new Date(reservation.endAt);
			
			// Vérifier les chevauchements
			return (
				reservation.roomId === roomId &&
				reservation.status !== "cancelled" &&
				(
					(sessionStartDate >= reservationStart && sessionStartDate < reservationEnd) ||
					(sessionEndDate > reservationStart && sessionEndDate <= reservationEnd) ||
					(sessionStartDate <= reservationStart && sessionEndDate >= reservationEnd)
				)
			);
		});
	};

	// Synchroniser avec les props externes
	useEffect(() => {
		if (selectedRoomId !== selectedRoomId_) {
			setSelectedRoomId_(selectedRoomId || "");
		}
	}, [selectedRoomId, selectedRoomId_]);

	const handleComplexChange = (complexId: string) => {
		setSelectedComplexId(complexId);
		setSelectedRoomId_("");
		onRoomSelect(null);
	};

	const handleRoomChange = (roomId: string) => {
		setSelectedRoomId_(roomId);
		onRoomSelect(roomId);
	};

	const clearSelection = () => {
		setSelectedComplexId("");
		setSelectedRoomId_("");
		onRoomSelect(null);
	};

	const selectedComplex = complexes.find((c: Complex) => c.id === selectedComplexId);
	const selectedRoom = rooms.find((r: Room) => r.id === selectedRoomId_);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Building className="h-5 w-5 text-muted-foreground" />
					<h3 className="text-lg font-semibold">Sélection de la salle</h3>
				</div>
				{(selectedComplexId || selectedRoomId_) && (
					<Button variant="outline" size="sm" onClick={clearSelection}>
						Effacer la sélection
					</Button>
				)}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* Sélection du complexe */}
				<div className="space-y-2">
					<Label htmlFor="complex-select">Complexe sportif</Label>
					<Select value={selectedComplexId} onValueChange={handleComplexChange}>
						<SelectTrigger id="complex-select">
							<SelectValue placeholder="Sélectionner un complexe" />
						</SelectTrigger>
						<SelectContent>
							{isLoadingComplexes ? (
								<SelectItem value="loading" disabled>
									<div className="flex items-center gap-2">
										<Loader2 className="h-4 w-4 animate-spin" />
										<span>Chargement...</span>
									</div>
								</SelectItem>
							) : (
								complexes.map((complex: Complex) => (
									<SelectItem key={complex.id} value={complex.id}>
										<div className="flex items-center gap-2">
											<span>{complex.name}</span>
										</div>
									</SelectItem>
								))
							)}
						</SelectContent>
					</Select>
				</div>

				{/* Sélection de la salle */}
				<div className="space-y-2">
					<Label htmlFor="room-select">Salle</Label>
					<Select
						value={selectedRoomId_}
						onValueChange={handleRoomChange}
						disabled={!selectedComplexId}
					>
						<SelectTrigger id="room-select">
							<SelectValue placeholder="Sélectionner une salle" />
						</SelectTrigger>
						<SelectContent>
							{isLoadingRooms ? (
								<SelectItem value="loading" disabled>
									<div className="flex items-center gap-2">
										<Loader2 className="h-4 w-4 animate-spin" />
										<span>Chargement des salles...</span>
									</div>
								</SelectItem>
							) : rooms.length === 0 && selectedComplexId ? (
								<SelectItem value="no-rooms" disabled>
									<div className="flex items-center gap-2">
										<span>Aucune salle disponible</span>
									</div>
								</SelectItem>
							) : (
								rooms.map((room: Room) => {
									const available = isRoomAvailable(room.id);
									return (
										<SelectItem 
											key={room.id} 
											value={room.id}
											disabled={!available}
										>
											<div className="flex items-center gap-2">
												<span>{room.name}</span>
												<Badge variant="secondary" className="ml-2">
													{room.sportType}
												</Badge>
												{!available && (
													<Badge variant="destructive" className="ml-1">
														Occupée
													</Badge>
												)}
											</div>
										</SelectItem>
									);
								})
							)}
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* Affichage des détails de la sélection */}
			{selectedComplex && (
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							{selectedComplex.name}
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<MapPin className="h-4 w-4" />
							<span>{selectedComplex.street}, {selectedComplex.city} {selectedComplex.postalCode}</span>
						</div>
						
						<p className="text-sm text-muted-foreground">
							{selectedComplex.description}
						</p>

						{selectedRoom && (
							<>
								<Separator />
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<h4 className="font-semibold flex items-center gap-2">
											{selectedRoom.name}
										</h4>
										<div className="flex items-center gap-2">
											<Badge variant="secondary">{selectedRoom.sportType}</Badge>
											{!isRoomAvailable(selectedRoom.id) && (
												<Badge variant="destructive">Occupée</Badge>
											)}
										</div>
									</div>
									
									<p className="text-sm text-muted-foreground">
										{selectedRoom.description}
									</p>
									
									<div className="flex items-center gap-4 text-sm">
										<div className="flex items-center gap-1">
											<Users className="h-4 w-4" />
											<span>Capacité: {selectedRoom.capacity}</span>
										</div>
										<Badge variant={selectedRoom.isIndoor ? "default" : "secondary"}>
											{selectedRoom.isIndoor ? "Intérieur" : "Extérieur"}
										</Badge>
									</div>
								</div>
							</>
						)}
					</CardContent>
				</Card>
			)}
		</div>
	);
}

export default RoomSelection;

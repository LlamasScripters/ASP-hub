import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type RoomReservation,
	useRoomReservations,
} from "@/features/room-booking/hooks/useRoomReservations";
import type { OpeningHours as RoomOpeningHours } from "@room-booking/hooks/useRooms";
import {
	getMonthBounds,
	getWeekBounds,
} from "@/features/room-booking/lib/api/roomReservations";
import { Link } from "@tanstack/react-router";
import {
	Calendar as CalendarIcon,
	ChevronLeft,
	ChevronRight,
	Edit2,
	Loader2,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

type ViewMode = "week" | "month";

interface RoomReservationListProps {
	roomId: string;
	roomOpeningHours: RoomOpeningHours;
}

const getDayOfWeekKey = (date: Date): keyof RoomOpeningHours => {
	const days: (keyof RoomOpeningHours)[] = [
		"sunday",
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday",
	];
	return days[date.getDay()];
};

const isRoomOpenOnDay = (
	date: Date,
	openingHours: RoomOpeningHours,
): boolean => {
	const dayKey = getDayOfWeekKey(date);
	const dayHours = openingHours[dayKey];
	return dayHours ? !dayHours.closed : false;
};

const getRoomHoursForDay = (date: Date, openingHours: RoomOpeningHours) => {
	const dayKey = getDayOfWeekKey(date);
	const dayHours = openingHours[dayKey];
	if (!dayHours || dayHours.closed) return null;

	return {
		openTime: dayHours.open,
		closeTime: dayHours.close,
	};
};

const timeToMinutes = (time: string): number => {
	const [hours, minutes] = time.split(":").map(Number);
	return hours * 60 + minutes;
};

const formatDateKey = (date: Date): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

const getStatusColor = (status: string) => {
	switch (status.toLowerCase()) {
		case "confirmed":
		case "confirmé":
			return "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-800 text-green-800 dark:text-green-200";
		case "pending":
		case "en_attente":
			return "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200";
		case "cancelled":
		case "annulé":
			return "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-800 text-red-800 dark:text-red-200";
		default:
			return "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-800 text-blue-800 dark:text-blue-200";
	}
};

const HOUR_HEIGHT = 60;
const MIN_RESERVATION_HEIGHT = 20;
const START_HOUR = 5; // 5h du matin
const END_HOUR = 24; // Minuit

export function RoomReservationList({
	roomId,
	roomOpeningHours,
}: RoomReservationListProps) {
	const [viewMode, setViewMode] = useState<ViewMode>("week");
	const [referenceDate, setReferenceDate] = useState<Date>(new Date());
	
	const now = new Date();
	const currentHour = now.getHours();
	// Utiliser le fuseau horaire local pour la date actuelle
	const currentYear = now.getFullYear();
	const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
	const currentDay = String(now.getDate()).padStart(2, '0');
	const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

	const { start: startDate, end: endDate } = useMemo(() => {
		if (viewMode === "week") {
			return getWeekBounds(referenceDate);
		}
		return getMonthBounds(referenceDate);
	}, [viewMode, referenceDate]);

	const { roomReservations, totalCount, loading, error } =
		useRoomReservations({ roomId, startDate, endDate });

	const goPrevious = useCallback(() => {
		setReferenceDate((prev) => {
			const next = new Date(prev);
			if (viewMode === "week") {
				next.setDate(prev.getDate() - 7);
			} else {
				next.setMonth(prev.getMonth() - 1);
			}
			return next;
		});
	}, [viewMode]);

	const goNext = useCallback(() => {
		setReferenceDate((prev) => {
			const next = new Date(prev);
			if (viewMode === "week") {
				next.setDate(prev.getDate() + 7);
			} else {
				next.setMonth(prev.getMonth() + 1);
			}
			return next;
		});
	}, [viewMode]);

	const roomReservationsByDay = useMemo(() => {
		const reservationsByDay: Record<string, RoomReservation[]> = {};
		
		for (const reservation of roomReservations) {
			const date = new Date(reservation.startAt);
			// Utiliser le fuseau horaire local au lieu d'UTC
			const dateKey = formatDateKey(date);
			
			if (!reservationsByDay[dateKey]) {
				reservationsByDay[dateKey] = [];
			}
			
			reservationsByDay[dateKey].push(reservation);
		}
		
		return reservationsByDay;
	}, [roomReservations]);

	const formatPeriod = () => {
		if (viewMode === "week") {
			const options: Intl.DateTimeFormatOptions = { 
				day: "numeric", 
				month: "short", 
				year: "numeric" 
			};
			return `${startDate.toLocaleDateString("fr-FR", options)} - ${endDate.toLocaleDateString("fr-FR", options)}`;
		}
		return referenceDate.toLocaleDateString("fr-FR", { 
			month: "long", 
			year: "numeric" 
		});
	};

	if (loading) {
		return (
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<CalendarIcon className="w-4 h-4" />
						Planning des réservations
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-center py-8">
						<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
					</div>
				</CardContent>
			</Card>
		);
	}

	if (error) {
		return (
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<CalendarIcon className="w-4 h-4" />
						Planning des réservations
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-center py-8 text-red-600">
						Erreur lors du chargement des réservations: {error}
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
					<div>
						<CardTitle className="flex items-center gap-2 text-lg">
							<CalendarIcon className="w-6 h-6 text-muted-foreground" />
							Planning des réservations
						</CardTitle>
						<CardDescription className="text-sm text-muted-foreground">
							Total : {totalCount} réservation{totalCount > 1 ? "s" : ""}
						</CardDescription>
					</div>
					<div className="flex items-center gap-2">
						{/* Sélecteur de vue */}
						<div className="flex rounded-md border">
							<Button
								variant={viewMode === "week" ? "default" : "ghost"}
								size="sm"
								onClick={() => setViewMode("week")}
								className="rounded-r-none"
							>
								Semaine
							</Button>
							<Button
								variant={viewMode === "month" ? "default" : "ghost"}
								size="sm"
								onClick={() => setViewMode("month")}
								className="rounded-l-none"
							>
								Mois
							</Button>
						</div>
						
						{/* Navigation */}
						<div className="flex items-center gap-1">
							<Button variant="outline" size="sm" onClick={goPrevious}>
								<ChevronLeft className="h-4 w-4" />
							</Button>
							<div className="px-3 py-1 text-sm font-medium min-w-[180px] text-center">
								{formatPeriod()}
							</div>
							<Button variant="outline" size="sm" onClick={goNext}>
								<ChevronRight className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				{/* Vue semaine */}
				{viewMode === "week" && (
					<div className="overflow-x-auto">
						<div className="grid grid-cols-8 gap-1 min-w-[800px]">
							{/* En-tête avec les jours */}
							<div className="p-2 text-xs font-medium text-muted-foreground">
								Heure
							</div>
							{Array.from({ length: 7 }, (_, i) => {
								const date = new Date(startDate);
								date.setDate(startDate.getDate() + i);
								const isOpen = isRoomOpenOnDay(date, roomOpeningHours);
								const dateKey = formatDateKey(date);
								const isToday = dateKey === currentDate;
								
								return (
									<div
										key={`day-header-${dateKey}`}
										className={`p-2 text-center border-b border-border ${
											isOpen ? "bg-green-50 dark:bg-green-950/30" : "bg-muted"
										} ${isToday ? "ring-2 ring-primary bg-primary/10 dark:bg-primary/20" : ""}`}
									>
										<div className={`text-xs font-medium ${isToday ? "text-primary" : "text-foreground"}`}>
											{date.toLocaleDateString("fr-FR", { weekday: "short" })}
											{isToday && " (Aujourd'hui)"}
										</div>
										<div className={`text-sm ${isToday ? "text-primary font-bold" : "text-foreground"}`}>
											{date.toLocaleDateString("fr-FR", { 
												day: "numeric", 
												month: "short" 
											})}
										</div>
										{isOpen && (
											<div className={`text-xs mt-1 ${isToday ? "text-primary" : "text-muted-foreground"}`}>
												{(() => {
													const hours = getRoomHoursForDay(date, roomOpeningHours);
													return hours?.openTime && hours?.closeTime 
														? `${hours.openTime}-${hours.closeTime}`
														: "Ouvert";
												})()}
											</div>
										)}
									</div>
								);
							})}

							{/* Grille horaire */}
							{Array.from({ length: END_HOUR - START_HOUR }, (_, index) => {
								const hour = START_HOUR + index;
								const hourStr = `${hour.toString().padStart(2, "0")}:00`;
								const isCurrentHour = hour === currentHour;
								
								return (
									<div key={`hour-${hour}`} className="contents">
										{/* Colonne des heures */}
										<div className={`p-2 text-xs border-r border-border ${
											isCurrentHour ? "bg-primary/20 text-primary font-bold" : "text-muted-foreground"
										}`}>
											{hourStr}
										</div>
										
										{/* Colonnes des jours */}
										{Array.from({ length: 7 }, (_, dayIndex) => {
											const date = new Date(startDate);
											date.setDate(startDate.getDate() + dayIndex);
											const dateKey = formatDateKey(date);
											const dayRoomReservations = roomReservationsByDay[dateKey] || [];
											const isOpen = isRoomOpenOnDay(date, roomOpeningHours);
											const isCurrentDay = dateKey === currentDate;
											const isCurrentTimeSlot = isCurrentDay && isCurrentHour;
											
											const roomHours = getRoomHoursForDay(date, roomOpeningHours);
											const isHourInAvailableRange = roomHours?.openTime && roomHours?.closeTime 
												? hour >= Math.floor(timeToMinutes(roomHours.openTime) / 60) && hour < Math.ceil(timeToMinutes(roomHours.closeTime) / 60)
												: false;
											
											const hourReservations = dayRoomReservations.filter((reservation) => {
												const startHour = new Date(reservation.startAt).getHours();
												const endHour = new Date(reservation.endAt).getHours();
												return hour >= startHour && hour < endHour;
											});
											
											let cellBackground = "bg-background";
											if (!isOpen) {
												cellBackground = "bg-muted";
											} else if (isOpen && !isHourInAvailableRange) {
												cellBackground = "bg-muted";
											} else if (isOpen && isHourInAvailableRange) {
												cellBackground = "bg-green-50 dark:bg-green-950/20";
											}
											
											if (isCurrentTimeSlot) {
												cellBackground = "bg-primary/30";
											}
											
											return (
												<div
													key={`day-${dayIndex}-hour-${hour}`}
													className={`relative border border-border ${cellBackground}`}
													style={{ minHeight: `${HOUR_HEIGHT}px` }}
												>
													{/* Indicateur de l'heure actuelle */}
													{isCurrentTimeSlot && (
														<div className="absolute top-0 left-0 right-0 h-1 bg-primary z-20" />
													)}
													
													{hourReservations.map((reservation) => (
														<div
															key={reservation.id}
															className={`absolute inset-x-1 rounded text-xs p-1 border group ${getStatusColor(
																reservation.status
															)}`}
															style={{
																top: "2px",
																height: `${Math.max(MIN_RESERVATION_HEIGHT, HOUR_HEIGHT - 4)}px`,
																zIndex: 10,
															}}
														>
															<div className="flex justify-between items-start h-full">
																<div className="flex-1 min-w-0">
																	<div className="font-medium truncate">
																		{reservation.title}
																	</div>
																	<div className="text-xs opacity-75">
																		{new Date(reservation.startAt).toLocaleTimeString("fr-FR", {
																			hour: "2-digit",
																			minute: "2-digit",
																		})}
																		-
																		{new Date(reservation.endAt).toLocaleTimeString("fr-FR", {
																			hour: "2-digit",
																			minute: "2-digit",
																		})}
																	</div>
																</div>
																<Button
																	size="icon"
																	variant="ghost"
																	asChild
																	title="Modifier"
																	className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background dark:bg-background/80 dark:hover:bg-background"
																>
																	<Link
																		to="/admin/facilities/roomReservations/$roomReservationId/edit"
																		params={{ roomReservationId: reservation.id }}
																	>
																		<Edit2 className="w-3 h-3" />
																	</Link>
																</Button>
															</div>
														</div>
													))}
												</div>
											);
										})}
									</div>
								);
							})}
						</div>
					</div>
				)}

				{/* Vue mois */}
				{viewMode === "month" && (
					<div className="grid grid-cols-7 gap-1">
						{/* En-têtes des jours */}
						{["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
							<div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
								{day}
							</div>
						))}
						
						{/* Grille mensuelle */}
						{Array.from({ length: 42 }, (_, i) => {
							// Calculer la date en commençant par lundi (au lieu de dimanche)
							const firstOfMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
							const firstDayOfWeek = firstOfMonth.getDay(); // 0 = dimanche, 1 = lundi, etc.
							const mondayOffset = firstDayOfWeek === 0 ? -6 : 1 - firstDayOfWeek; // Ajustement pour commencer par lundi
							const date = new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth(), mondayOffset + i);
							const dateKey = formatDateKey(date);
							const dayRoomReservations = roomReservationsByDay[dateKey] || [];
							const isCurrentMonth = date.getMonth() === startDate.getMonth();
							const isOpen = isRoomOpenOnDay(date, roomOpeningHours);
							const isToday = dateKey === currentDate;
							
							return (
								<div
									key={`month-day-${dateKey}`}
									className={`p-2 border border-border min-h-[80px] ${
										!isCurrentMonth ? "bg-muted/50 text-muted-foreground" : ""
									} ${!isOpen && isCurrentMonth ? "bg-muted" : ""}
									${isToday ? "ring-2 ring-primary bg-primary/10 dark:bg-primary/20" : ""}`}
								>
									<div className={`text-sm font-medium mb-1 ${
										isToday ? "text-primary" : "text-foreground"
									}`}>
										{date.getDate()}
										{isToday && (
											<span className="ml-1 text-xs text-primary">(Auj.)</span>
										)}
									</div>
									<div className="space-y-1">
										{dayRoomReservations.slice(0, 2).map((reservation) => (
											<div
												key={reservation.id}
												className={`text-xs p-1 rounded truncate group flex justify-between items-center ${getStatusColor(
													reservation.status
												)}`}
											>
												<span className="truncate flex-1 mr-1">{reservation.title}</span>
												<Button
													size="icon"
													variant="ghost"
													asChild
													title="Modifier"
													className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background dark:bg-background/80 dark:hover:bg-background"
												>
													<Link
														to="/admin/facilities/roomReservations/$roomReservationId/edit"
														params={{ roomReservationId: reservation.id }}
													>
														<Edit2 className="w-2 h-2" />
													</Link>
												</Button>
											</div>
										))}
										{dayRoomReservations.length > 2 && (
											<div className="text-xs text-muted-foreground">
												+{dayRoomReservations.length - 2} autre(s)
											</div>
										)}
									</div>
								</div>
							);
						})}
					</div>
				)}

				{/* Résumé */}
				<div className="mt-4 pt-4 border-t space-y-3">
					{/* Légende des statuts */}
					<div className="flex items-center justify-between text-sm text-muted-foreground">
						<div className="flex items-center gap-4">
							<span className="font-medium text-foreground">Statuts :</span>
							<div className="flex items-center gap-1">
								<div className="w-3 h-3 rounded bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-800" />
								<span>En attente</span>
							</div>
							<div className="flex items-center gap-1">
								<div className="w-3 h-3 rounded bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-800" />
								<span>Confirmée</span>
							</div>
							<div className="flex items-center gap-1">
								<div className="w-3 h-3 rounded bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800" />
								<span>Annulée</span>
							</div>
						</div>
					</div>
					
					{/* Légende des disponibilités */}
					<div className="flex items-center justify-between text-sm text-muted-foreground">
						<div className="flex items-center gap-4">
							<span className="font-medium text-foreground">Disponibilités :</span>
							<div className="flex items-center gap-1">
								<div className="w-3 h-3 rounded bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800" />
								<span>Heures d'ouverture</span>
							</div>
							<div className="flex items-center gap-1">
								<div className="w-3 h-3 rounded bg-muted border border-border" />
								<span>Fermé</span>
							</div>
							<div className="flex items-center gap-1">
								<div className="w-3 h-3 rounded bg-primary/30 border border-primary" />
								<span>Maintenant</span>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

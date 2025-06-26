import { useState, useMemo, useCallback } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Edit2, Loader2 } from "lucide-react";
import type { Disponibility } from "@/features/minibus-booking/hooks/useMinibuses";
import type { MinibusReservation } from "@/features/minibus-booking/hooks/useMinibusReservations";
import { useMinibusReservations } from "@/features/minibus-booking/hooks/useMinibusReservations";
import { getWeekBounds, getMonthBounds } from "@/features/minibus-booking/lib/api/minibusReservations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";

type ViewMode = "week" | "month";

interface MinibusReservationListProps {
	minibusDisponibility: Disponibility;
}

const getDayOfWeekKey = (date: Date): keyof Disponibility => {
	const days: (keyof Disponibility)[] = [
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

const isMinibusAvailableOnDay = (
	date: Date,
	disponibility: Disponibility,
): boolean => {
	const dayKey = getDayOfWeekKey(date);
	const dayDisponibility = disponibility[dayKey];
	return dayDisponibility ? dayDisponibility.available : false;
};

const getMinibusHoursForDay = (date: Date, disponibility: Disponibility) => {
	const dayKey = getDayOfWeekKey(date);
	const dayDisponibility = disponibility[dayKey];
	if (!dayDisponibility || !dayDisponibility.available)
		return { openTime: null, closeTime: null };

	return {
		openTime: dayDisponibility.open,
		closeTime: dayDisponibility.close,
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
		case "pending":
			return "bg-yellow-100 text-yellow-800 border-yellow-200";
		case "confirmed":
			return "bg-green-100 text-green-800 border-green-200";
		case "cancelled":
			return "bg-red-100 text-red-800 border-red-200";
		case "completed":
			return "bg-blue-100 text-blue-800 border-blue-200";
		case "no_show":
			return "bg-gray-100 text-gray-800 border-gray-200";
		case "rescheduled":
			return "bg-purple-100 text-purple-800 border-purple-200";
		default:
			return "bg-gray-100 text-gray-800 border-gray-200";
	}
};

const HOUR_HEIGHT = 60;
const MIN_RESERVATION_HEIGHT = 20;
const START_HOUR = 5;
const END_HOUR = 24; 

export function MinibusReservationList({
	minibusDisponibility,
}: MinibusReservationListProps) {
	const [viewMode, setViewMode] = useState<ViewMode>("week");
	const [referenceDate, setReferenceDate] = useState<Date>(new Date());
	
	const { start: startDate, end: endDate } = useMemo(() => {
		if (viewMode === "week") {
			return getWeekBounds(referenceDate);
		}
		return getMonthBounds(referenceDate);
	}, [viewMode, referenceDate]);

	const { minibusReservations, loading } = useMinibusReservations({
		minibusId: undefined,
	});

	const filteredReservations = useMemo(() => {
		return minibusReservations.filter(reservation => {
			const reservationDate = new Date(reservation.startAt);
			return reservationDate >= startDate && reservationDate <= endDate;
		});
	}, [minibusReservations, startDate, endDate]);

	const now = new Date();
	const currentHour = now.getHours();

	const currentYear = now.getFullYear();
	const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
	const currentDay = String(now.getDate()).padStart(2, '0');
	const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

	const goPrevious = useCallback(() => {
		if (viewMode === "week") {
			const newDate = new Date(referenceDate);
			newDate.setDate(newDate.getDate() - 7);
			setReferenceDate(newDate);
		} else {
			const newDate = new Date(referenceDate);
			newDate.setMonth(newDate.getMonth() - 1);
			setReferenceDate(newDate);
		}
	}, [viewMode, referenceDate]);

	const goNext = useCallback(() => {
		if (viewMode === "week") {
			const newDate = new Date(referenceDate);
			newDate.setDate(newDate.getDate() + 7);
			setReferenceDate(newDate);
		} else {
			const newDate = new Date(referenceDate);
			newDate.setMonth(newDate.getMonth() + 1);
			setReferenceDate(newDate);
		}
	}, [viewMode, referenceDate]);

	const minibusReservationsByDay = useMemo(() => {
		const reservationsByDay: Record<string, MinibusReservation[]> = {};
		
		for (const reservation of filteredReservations) {
			const date = new Date(reservation.startAt);
			const dateKey = formatDateKey(date);
			
			if (!reservationsByDay[dateKey]) {
				reservationsByDay[dateKey] = [];
			}
			
			reservationsByDay[dateKey].push(reservation);
		}
		
		return reservationsByDay;
	}, [filteredReservations]);

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
							Total : {filteredReservations.length} réservation{filteredReservations.length > 1 ? "s" : ""} sur la période
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
								const isAvailable = isMinibusAvailableOnDay(date, minibusDisponibility);
								const dateKey = formatDateKey(date);
								const isToday = dateKey === currentDate;
								
								return (
									<div
										key={`day-header-${dateKey}`}
										className={`p-2 text-center border-b ${
											isAvailable ? "bg-green-50" : "bg-gray-50"
										} ${isToday ? "ring-2 ring-blue-500 bg-blue-50" : ""}`}
									>
										<div className={`text-xs font-medium ${isToday ? "text-blue-700" : ""}`}>
											{date.toLocaleDateString("fr-FR", { weekday: "short" })}
											{isToday && " (Aujourd'hui)"}
										</div>
										<div className={`text-sm ${isToday ? "text-blue-800 font-bold" : ""}`}>
											{date.toLocaleDateString("fr-FR", { 
												day: "numeric", 
												month: "short" 
											})}
										</div>
										{isAvailable && (
											<div className={`text-xs mt-1 ${isToday ? "text-blue-600" : "text-muted-foreground"}`}>
												{(() => {
													const hours = getMinibusHoursForDay(date, minibusDisponibility);
													return hours.openTime && hours.closeTime 
														? `${hours.openTime}-${hours.closeTime}`
														: "Disponible";
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
										<div className={`p-2 text-xs border-r ${
											isCurrentHour ? "bg-blue-100 text-blue-800 font-bold" : "text-muted-foreground"
										}`}>
											{hourStr}
										</div>
										
										{/* Colonnes des jours */}
										{Array.from({ length: 7 }, (_, dayIndex) => {
											const date = new Date(startDate);
											date.setDate(startDate.getDate() + dayIndex);
											const dateKey = formatDateKey(date);
											const dayReservations = minibusReservationsByDay[dateKey] || [];
											const isAvailable = isMinibusAvailableOnDay(date, minibusDisponibility);
											const isCurrentDay = dateKey === currentDate;
											const isCurrentTimeSlot = isCurrentDay && isCurrentHour;
											
											// Vérifier si le minibus est disponible à cette heure
											const dayHours = getMinibusHoursForDay(date, minibusDisponibility);
											const isHourInAvailableRange = dayHours.openTime && dayHours.closeTime 
												? hour >= Math.floor(timeToMinutes(dayHours.openTime) / 60) && hour < Math.ceil(timeToMinutes(dayHours.closeTime) / 60)
												: false;
											
											// Filtrer les réservations pour cette heure
											const hourReservations = dayReservations.filter((reservation) => {
												const startHour = new Date(reservation.startAt).getHours();
												const endHour = new Date(reservation.endAt).getHours();
												return hour >= startHour && hour < endHour;
											});
											
											let cellBackground = "bg-white";
											if (!isAvailable) {
												// Jour complètement indisponible
												cellBackground = "bg-gray-100";
											} else if (isAvailable && !isHourInAvailableRange) {
												// Jour disponible mais heure en dehors des créneaux
												cellBackground = "bg-gray-100";
											} else if (isAvailable && isHourInAvailableRange) {
												// Jour disponible et heure dans les créneaux
												cellBackground = "bg-green-50";
											}
											
											if (isCurrentTimeSlot) {
												cellBackground = "bg-blue-200";
											}
											
											return (
												<div
													key={`day-${dayIndex}-hour-${hour}`}
													className={`relative border border-gray-200 ${cellBackground}`}
													style={{ minHeight: `${HOUR_HEIGHT}px` }}
												>
													{/* Indicateur de l'heure actuelle */}
													{isCurrentTimeSlot && (
														<div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 z-20" />
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
																	className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/10"
																>
																	<Link
																		to="/admin/assets/minibusReservations/$minibusReservationId/edit"
																		params={{ minibusReservationId: reservation.id }}
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
							const dayReservations = minibusReservationsByDay[dateKey] || [];
							const isCurrentMonth = date.getMonth() === startDate.getMonth();
							const isAvailable = isMinibusAvailableOnDay(date, minibusDisponibility);
							const isToday = dateKey === currentDate;
							
							return (
								<div
									key={`month-day-${dateKey}`}
									className={`p-2 border min-h-[80px] ${
										!isCurrentMonth ? "bg-gray-50 text-gray-400" : ""
									} ${!isAvailable && isCurrentMonth ? "bg-gray-100" : ""}
									${isToday ? "ring-2 ring-blue-500 bg-blue-50" : ""}`}
								>
									<div className={`text-sm font-medium mb-1 ${
										isToday ? "text-blue-800" : ""
									}`}>
										{date.getDate()}
										{isToday && (
											<span className="ml-1 text-xs text-blue-600">(Auj.)</span>
										)}
									</div>
									<div className="space-y-1">
										{dayReservations.slice(0, 2).map((reservation) => (
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
													className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
												>
													<Link
														to="/admin/assets/minibusReservations/$minibusReservationId/edit"
														params={{ minibusReservationId: reservation.id }}
													>
														<Edit2 className="w-2 h-2" />
													</Link>
												</Button>
											</div>
										))}
										{dayReservations.length > 2 && (
											<div className="text-xs text-muted-foreground">
												+{dayReservations.length - 2} autre(s)
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
							<span className="font-medium text-gray-700">Statuts :</span>
							<div className="flex items-center gap-1">
								<div className="w-3 h-3 rounded bg-yellow-100 border border-yellow-200" />
								<span>En attente</span>
							</div>
							<div className="flex items-center gap-1">
								<div className="w-3 h-3 rounded bg-green-100 border border-green-200" />
								<span>Confirmée</span>
							</div>
							<div className="flex items-center gap-1">
								<div className="w-3 h-3 rounded bg-red-100 border border-red-200" />
								<span>Annulée</span>
							</div>
							<div className="flex items-center gap-1">
								<div className="w-3 h-3 rounded bg-blue-100 border border-blue-200" />
								<span>Terminée</span>
							</div>
						</div>
					</div>
					
					{/* Légende des disponibilités */}
					<div className="flex items-center justify-between text-sm text-muted-foreground">
						<div className="flex items-center gap-4">
							<span className="font-medium text-gray-700">Disponibilités :</span>
							<div className="flex items-center gap-1">
								<div className="w-3 h-3 rounded bg-green-50 border border-green-200" />
								<span>Heures d'ouverture</span>
							</div>
							<div className="flex items-center gap-1">
								<div className="w-3 h-3 rounded bg-gray-100 border border-gray-200" />
								<span>Indisponible</span>
							</div>
							<div className="flex items-center gap-1">
								<div className="w-3 h-3 rounded bg-blue-200 border border-blue-500" />
								<span>Maintenant</span>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

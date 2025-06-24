import { useState, useMemo, useEffect, useCallback } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Edit2, Loader2 } from "lucide-react";
import type { Minibus, Disponibility } from "@/features/minibus-booking/hooks/useMinibuses";
import type { MinibusReservation } from "@/features/minibus-booking/hooks/useMinibusReservations";
import { useMinibusReservations } from "@/features/minibus-booking/hooks/useMinibusReservations";
import { getWeekBounds, getMonthBounds } from "@/features/minibus-booking/lib/api/minibusReservations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ViewMode = "week" | "month";

interface MinibusReservationListProps {
	minibusId: string;
	minibusDisponibility: Disponibility;
	initialMinibusReservations?: MinibusReservation[];
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

const minutesToTime = (minutes: number): string => {
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
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

export function MinibusReservationList({
	minibusId,
	minibusDisponibility,
	initialMinibusReservations = [],
}: MinibusReservationListProps) {
	const { minibusReservations, totalCount, loading, error, updateFilters } =
		useMinibusReservations({ minibusId, initialData: initialMinibusReservations });

	const [viewMode, setViewMode] = useState<ViewMode>("week");
	const [referenceDate, setReferenceDate] = useState<Date>(new Date());

	const { start: startDate, end: endDate } = useMemo(() => {
		if (viewMode === "week") {
			return getWeekBounds(referenceDate);
		}
		return getMonthBounds(referenceDate);
	}, [viewMode, referenceDate]);

	useEffect(() => {
		updateFilters({
			startDate,
			endDate,
		});
	}, [startDate, endDate, updateFilters]);

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
		
		for (const reservation of minibusReservations) {
			const date = new Date(reservation.startAt);
			const dateKey = date.toISOString().split("T")[0];
			
			if (!reservationsByDay[dateKey]) {
				reservationsByDay[dateKey] = [];
			}
			
			reservationsByDay[dateKey].push(reservation);
		}
		
		return reservationsByDay;
	}, [minibusReservations]);

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
					<CardTitle className="flex items-center gap-2">
						<CalendarIcon className="w-4 h-4" />
						Planning des réservations
					</CardTitle>
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
								
								return (
									<div
										key={i}
										className={`p-2 text-center border-b ${
											isAvailable ? "bg-green-50" : "bg-gray-50"
										}`}
									>
										<div className="text-xs font-medium">
											{date.toLocaleDateString("fr-FR", { weekday: "short" })}
										</div>
										<div className="text-sm">
											{date.toLocaleDateString("fr-FR", { 
												day: "numeric", 
												month: "short" 
											})}
										</div>
										{isAvailable && (
											<div className="text-xs text-muted-foreground mt-1">
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
							{Array.from({ length: 24 }, (_, hour) => {
								const hourStr = `${hour.toString().padStart(2, "0")}:00`;
								
								return (
									<div key={hour} className="contents">
										{/* Colonne des heures */}
										<div className="p-2 text-xs text-muted-foreground border-r">
											{hourStr}
										</div>
										
										{/* Colonnes des jours */}
										{Array.from({ length: 7 }, (_, dayIndex) => {
											const date = new Date(startDate);
											date.setDate(startDate.getDate() + dayIndex);
											const dateKey = date.toISOString().split("T")[0];
											const dayReservations = minibusReservationsByDay[dateKey] || [];
											const isAvailable = isMinibusAvailableOnDay(date, minibusDisponibility);
											
											// Filtrer les réservations pour cette heure
											const hourReservations = dayReservations.filter((reservation) => {
												const startHour = new Date(reservation.startAt).getHours();
												const endHour = new Date(reservation.endAt).getHours();
												return hour >= startHour && hour < endHour;
											});
											
											return (
												<div
													key={dayIndex}
													className={`relative border border-gray-200 min-h-[${HOUR_HEIGHT}px] ${
														!isAvailable ? "bg-gray-100" : ""
													}`}
													style={{ minHeight: `${HOUR_HEIGHT}px` }}
												>
													{hourReservations.map((reservation) => (
														<div
															key={reservation.id}
															className={`absolute inset-x-1 rounded text-xs p-1 border ${getStatusColor(
																reservation.status
															)}`}
															style={{
																top: "2px",
																height: `${Math.max(MIN_RESERVATION_HEIGHT, HOUR_HEIGHT - 4)}px`,
																zIndex: 10,
															}}
														>
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
							const date = new Date(startDate.getFullYear(), startDate.getMonth(), i - startDate.getDay() + 1);
							const dateKey = date.toISOString().split("T")[0];
							const dayReservations = minibusReservationsByDay[dateKey] || [];
							const isCurrentMonth = date.getMonth() === startDate.getMonth();
							const isAvailable = isMinibusAvailableOnDay(date, minibusDisponibility);
							
							return (
								<div
									key={i}
									className={`p-2 border min-h-[80px] ${
										!isCurrentMonth ? "bg-gray-50 text-gray-400" : ""
									} ${!isAvailable && isCurrentMonth ? "bg-gray-100" : ""}`}
								>
									<div className="text-sm font-medium mb-1">{date.getDate()}</div>
									<div className="space-y-1">
										{dayReservations.slice(0, 2).map((reservation) => (
											<div
												key={reservation.id}
												className={`text-xs p-1 rounded truncate ${getStatusColor(
													reservation.status
												)}`}
											>
												{reservation.title}
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
				<div className="mt-4 pt-4 border-t">
					<div className="flex items-center justify-between text-sm text-muted-foreground">
						<div>
							Total des réservations : {totalCount}
						</div>
						<div className="flex items-center gap-4">
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
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

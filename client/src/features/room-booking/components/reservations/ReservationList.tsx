import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	type Reservation,
	reservationStatusEnumTranslated,
	useReservations,
} from "@room-booking/hooks/useReservations";
import type { OpeningHours as RoomOpeningHours } from "@room-booking/hooks/useRooms";
import {
	formatDateShort,
	getMonthBounds,
	getWeekBounds,
} from "@room-booking/lib/api/reservations";
import { Link } from "@tanstack/react-router";
import {
	Calendar as CalendarIcon,
	ChevronLeft,
	ChevronRight,
	Clock,
	Edit2,
	Loader2,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

type ViewMode = "week" | "month";

interface ReservationListProps {
	roomId: string;
	roomOpeningHours: RoomOpeningHours;
	initialReservations?: Reservation[];
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

const minutesToTime = (minutes: number): string => {
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
};

const getStatusColor = (status: string) => {
	switch (status.toLowerCase()) {
		case "confirmed":
		case "confirmé":
			return "bg-green-100 border-green-300 text-green-800";
		case "pending":
		case "en_attente":
			return "bg-yellow-100 border-yellow-300 text-yellow-800";
		case "cancelled":
		case "annulé":
			return "bg-red-100 border-red-300 text-red-800";
		default:
			return "bg-blue-100 border-blue-300 text-blue-800";
	}
};

const HOUR_HEIGHT = 60;
const MIN_RESERVATION_HEIGHT = 20;

export function ReservationList({
	roomId,
	roomOpeningHours,
	initialReservations = [],
}: ReservationListProps) {
	const { reservations, totalCount, loading, error, updateFilters } =
		useReservations({ roomId, initialData: initialReservations });

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

	const reservationsByDay = useMemo(() => {
		const map: Record<string, Reservation[]> = {};
		for (const r of reservations) {
			const d = new Date(r.startAt);
			const key = d.toLocaleDateString("fr-FR");
			if (!map[key]) map[key] = [];
			map[key].push(r);
		}
		for (const arr of Object.values(map)) {
			arr.sort(
				(a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
			);
		}
		return map;
	}, [reservations]);

	const dateGrid = useMemo(() => {
		if (viewMode === "week") {
			const dates: Date[] = [];
			const curr = new Date(startDate);
			curr.setHours(0, 0, 0, 0);
			while (curr <= endDate) {
				dates.push(new Date(curr));
				curr.setDate(curr.getDate() + 1);
			}
			return dates.map((d) => ({ date: d, isPlaceholder: false }));
		}
		const { start: monthStart, end: monthEnd } = getMonthBounds(referenceDate);
		const daysInMonth: Date[] = [];
		const cursor = new Date(monthStart);
		while (cursor <= monthEnd) {
			daysInMonth.push(new Date(cursor));
			cursor.setDate(cursor.getDate() + 1);
		}
		const firstDayWeekday = monthStart.getDay();
		const blanksBefore = (firstDayWeekday + 6) % 7;
		const lastDayWeekday = monthEnd.getDay();
		const blanksAfter = (7 - ((lastDayWeekday + 6) % 7) - 1 + 7) % 7;
		const grid: Array<{ date: Date | null; isPlaceholder: boolean }> = [];
		for (let i = 0; i < blanksBefore; i++) {
			grid.push({ date: null, isPlaceholder: true });
		}
		for (const d of daysInMonth) {
			grid.push({ date: d, isPlaceholder: false });
		}
		for (let i = 0; i < blanksAfter; i++) {
			grid.push({ date: null, isPlaceholder: true });
		}
		return grid;
	}, [viewMode, startDate, endDate, referenceDate]);

	const timeSlots = useMemo(() => {
		const slots = [];
		for (let hour = 6; hour < 24; hour++) {
			slots.push(`${hour.toString().padStart(2, "0")}:00`);
		}
		return slots;
	}, []);

	const organizeOverlappingReservations = (reservations: Reservation[]) => {
		const sortedReservations = [...reservations].sort(
			(a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
		);

		const columns: Reservation[][] = [];

		for (const reservation of sortedReservations) {
			const startTime = new Date(reservation.startAt).getTime();
			const endTime = new Date(reservation.endAt).getTime();

			let placed = false;
			for (let i = 0; i < columns.length; i++) {
				const column = columns[i];
				const lastReservation = column[column.length - 1];
				const lastEndTime = new Date(lastReservation.endAt).getTime();

				if (lastEndTime <= startTime) {
					column.push(reservation);
					placed = true;
					break;
				}
			}

			if (!placed) {
				columns.push([reservation]);
			}
		}

		return columns;
	};

	const renderWeekView = () => (
		<div className="border rounded-lg bg-white dark:bg-gray-900 overflow-hidden">
			<ScrollArea className="h-[700px]">
				<div className="min-w-[800px]">
					{/* En-tête avec les jours */}
					<div className="grid grid-cols-8 border-b bg-gray-50 dark:bg-gray-800 sticky top-0 z-20">
						<div className="p-3 border-r bg-gray-100 dark:bg-gray-900">
							<div className="text-xs font-semibold text-center text-gray-600 dark:text-gray-400">
								Heures
							</div>
						</div>
						{dateGrid.map((cell) => {
							if (!cell.date) return null;

							const d = cell.date;
							const key = d.toLocaleDateString("fr-FR");
							const isOpen = isRoomOpenOnDay(d, roomOpeningHours);
							const roomHours = getRoomHoursForDay(d, roomOpeningHours);
							const isToday = d.toDateString() === new Date().toDateString();

							return (
								<div
									key={key}
									className={`p-3 border-r ${isToday ? "bg-blue-50 dark:bg-blue-900/30" : "bg-gray-50 dark:bg-gray-800"} ${!isOpen ? "bg-gray-200 dark:bg-gray-700" : ""}`}
								>
									<div className="text-center">
										<div
											className={`text-sm font-semibold ${isToday ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-gray-100"} ${!isOpen ? "text-gray-500 dark:text-gray-400" : ""}`}
										>
											{d.toLocaleDateString("fr-FR", { weekday: "short" })}
										</div>
										<div
											className={`text-xs ${isToday ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"} ${!isOpen ? "text-gray-500 dark:text-gray-400" : ""}`}
										>
											{d.getDate()}/{d.getMonth() + 1}
										</div>
										{!isOpen ? (
											<div className="flex items-center justify-center gap-1 text-red-500 dark:text-red-400 mt-1">
												<Clock className="w-3 h-3" />
												<span className="text-[10px]">Fermé</span>
											</div>
										) : (
											roomHours && (
												<div className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
													{roomHours.openTime} - {roomHours.closeTime}
												</div>
											)
										)}
									</div>
								</div>
							);
						})}
					</div>

					{/* Grille horaire */}
					<div className="grid grid-cols-8 relative">
						{/* Colonne des heures */}
						<div className="border-r bg-gray-50 dark:bg-gray-800">
							{timeSlots.map((time, idx) => (
								<div
									key={time}
									className="border-b flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800"
									style={{ height: `${HOUR_HEIGHT}px` }}
								>
									<div className="text-center">
										<div className="font-medium">{time}</div>
										{idx < timeSlots.length - 1 && (
											<div className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
												{timeSlots[idx + 1]?.substring(0, 2)}h
											</div>
										)}
									</div>
								</div>
							))}
						</div>

						{/* Colonnes des jours */}
						{dateGrid.map((cell) => {
							if (!cell.date) return null;

							const d = cell.date;
							const key = d.toLocaleDateString("fr-FR");
							const dayReservations = reservationsByDay[key] || [];
							const isOpen = isRoomOpenOnDay(d, roomOpeningHours);
							const roomHours = getRoomHoursForDay(d, roomOpeningHours);
							const isToday = d.toDateString() === new Date().toDateString();

							const reservationColumns =
								organizeOverlappingReservations(dayReservations);
							const totalColumns = reservationColumns.length;

							return (
								<div
									key={key}
									className={`relative border-r ${isToday ? "bg-blue-50/30 dark:bg-blue-900/20" : "bg-white dark:bg-gray-900"}`}
								>
									{/* Grille horaire de fond */}
									{timeSlots.map((time, idx) => {
										const timeMinutes = timeToMinutes(time);
										const isClosedTime =
											!isOpen ||
											(roomHours?.openTime &&
												roomHours?.closeTime &&
												(timeMinutes < timeToMinutes(roomHours.openTime) ||
													timeMinutes >= timeToMinutes(roomHours.closeTime)));

										return (
											<div
												key={time}
												className={`border-b border-gray-200 dark:border-gray-700 relative ${
													isClosedTime
														? "bg-gray-100 dark:bg-gray-800 bg-opacity-80"
														: idx % 2 === 0
															? "bg-white dark:bg-gray-900"
															: "bg-gray-50/30 dark:bg-gray-800/30"
												}`}
												style={{ height: `${HOUR_HEIGHT}px` }}
											>
												{/* Ligne médiane pour les demi-heures */}
												<div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200/50 dark:bg-gray-600/50" />

												{/* Indicateur d'heure fermée */}
												{isClosedTime && (
													<div className="absolute inset-0 flex items-center justify-center" />
												)}
											</div>
										);
									})}

									{/* Réservations positionnées absolument */}
									{isOpen &&
										reservationColumns.map((column, columnIndex) =>
											column.map((reservation) => {
												const startTime = new Date(reservation.startAt);
												const endTime = new Date(reservation.endAt);

												const startMinutes =
													startTime.getHours() * 60 + startTime.getMinutes();
												const endMinutes =
													endTime.getHours() * 60 + endTime.getMinutes();
												const duration = endMinutes - startMinutes;

												const topOffset =
													Math.max(0, (startMinutes - 360) / 60) * HOUR_HEIGHT;
												const height = Math.max(
													(duration / 60) * HOUR_HEIGHT,
													MIN_RESERVATION_HEIGHT,
												);

												if (startMinutes >= 1440 || endMinutes <= 360)
													return null;

												const width =
													totalColumns > 1
														? `${(1 / totalColumns) * 95}%`
														: "95%";
												const left =
													totalColumns > 1
														? `${(columnIndex / totalColumns) * 100 + 2.5}%`
														: "2.5%";

												const statusColors = getStatusColor(reservation.status);

												return (
													<div
														key={`${reservation.id}-${columnIndex}`}
														className={`absolute rounded-lg p-2 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group border-l-4 ${statusColors} hover:scale-[1.02] z-10`}
														style={{
															top: `${topOffset}px`,
															height: `${height}px`,
															width,
															left,
														}}
													>
														<div className="h-full flex flex-col justify-between">
															<div className="min-h-0">
																<div className="text-xs font-semibold truncate mb-1 group-hover:text-wrap group-hover:whitespace-normal">
																	{reservation.title}
																</div>
																<div className="text-[10px] opacity-80">
																	{startTime.toLocaleTimeString("fr-FR", {
																		hour: "2-digit",
																		minute: "2-digit",
																	})}{" "}
																	-{" "}
																	{endTime.toLocaleTimeString("fr-FR", {
																		hour: "2-digit",
																		minute: "2-digit",
																	})}
																</div>
															</div>

															<div className="flex justify-between items-end mt-1">
																<Badge
																	variant="secondary"
																	className="text-[8px] px-1 py-0 bg-white/50 dark:bg-gray-800/50"
																>
																	{reservationStatusEnumTranslated[
																		reservation.status
																	] || reservation.status}
																</Badge>
																<Button
																	size="icon"
																	variant="ghost"
																	asChild
																	title="Modifier"
																	className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
																>
																	<Link
																		to="/admin/facilities/reservations/$reservationId/edit"
																		params={{ reservationId: reservation.id }}
																	>
																		<Edit2 className="w-3 h-3" />
																	</Link>
																</Button>
															</div>
														</div>
													</div>
												);
											}),
										)}

									{/* Ligne indicatrice de l'heure actuelle */}
									{isToday &&
										(() => {
											const now = new Date();
											const currentMinutes =
												now.getHours() * 60 + now.getMinutes();
											if (currentMinutes >= 360 && currentMinutes < 1440) {
												const currentOffset =
													((currentMinutes - 360) / 60) * HOUR_HEIGHT;
												return (
													<div
														className="absolute left-0 right-0 h-0.5 bg-red-500 dark:bg-red-400 z-30"
														style={{ top: `${currentOffset}px` }}
													>
														<div className="absolute -left-2 -top-1 w-3 h-3 bg-red-500 dark:bg-red-400 rounded-full" />
													</div>
												);
											}
											return null;
										})()}
								</div>
							);
						})}
					</div>
				</div>
			</ScrollArea>
		</div>
	);

	const renderMonthView = () => (
		<ScrollArea className="h-[500px] border rounded-lg">
			<div className="grid grid-cols-1 sm:grid-cols-7 divide-x divide-y divide-gray-200 dark:divide-gray-700">
				{dateGrid.map((cell, idx) => {
					if (cell.isPlaceholder || !cell.date) {
						return (
							<div
								key={`empty-${referenceDate.toISOString()}-${idx}`}
								className="flex flex-col min-h-[100px] bg-gray-50 dark:bg-gray-800 p-2"
							/>
						);
					}

					const d = cell.date;
					const key = d.toLocaleDateString("fr-FR");
					const dayReservations = reservationsByDay[key] || [];
					const isOpen = isRoomOpenOnDay(d, roomOpeningHours);
					const roomHours = getRoomHoursForDay(d, roomOpeningHours);

					return (
						<div
							key={key}
							className={`flex flex-col min-h-[100px] p-2 ${
								!isOpen
									? "bg-gray-100 dark:bg-gray-800"
									: "bg-white dark:bg-gray-900"
							}`}
						>
							<div className="border-b border-gray-200 dark:border-gray-700 pb-1 mb-1 text-xs font-semibold flex items-center justify-between">
								<span
									className={
										isOpen
											? "text-muted-foreground dark:text-gray-400"
											: "text-red-500 dark:text-red-400"
									}
								>
									{formatDateShort(d)}
								</span>
								{!isOpen && (
									<div className="flex items-center gap-1 text-red-500 dark:text-red-400">
										<Clock className="w-3 h-3" />
										<span className="text-[10px]">Fermé</span>
									</div>
								)}
								{isOpen && roomHours && (
									<div className="text-[10px] text-muted-foreground dark:text-gray-400">
										{roomHours.openTime} - {roomHours.closeTime}
									</div>
								)}
							</div>

							{dayReservations.length > 0 ? (
								<div className="space-y-2 overflow-y-auto flex-1 pr-1">
									{dayReservations.map((r) => (
										<div
											key={r.id}
											className={`rounded-md p-2 transition-colors flex justify-between items-start ${
												isOpen
													? "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
													: "bg-gray-200 dark:bg-gray-700 opacity-60"
											}`}
										>
											<div className="flex-1 pr-2">
												<div className="flex items-center justify-between">
													<span className="text-xs font-medium text-gray-800 dark:text-gray-200">
														{r.title}
													</span>
													<Badge
														variant="outline"
														className="text-[9px] px-1 py-[1px] border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
													>
														{reservationStatusEnumTranslated[r.status] ||
															r.status}
													</Badge>
												</div>
												<div className="mt-1 text-[10px] text-muted-foreground dark:text-gray-400">
													{new Date(r.startAt).toLocaleTimeString("fr-FR", {
														hour: "2-digit",
														minute: "2-digit",
													})}{" "}
													–{" "}
													{new Date(r.endAt).toLocaleTimeString("fr-FR", {
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
												className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 mt-1"
												disabled={!isOpen}
											>
												<Link
													to="/admin/facilities/reservations/$reservationId/edit"
													params={{ reservationId: r.id }}
												>
													<Edit2 className="w-4 h-4" />
												</Link>
											</Button>
										</div>
									))}
								</div>
							) : (
								<div className="flex-1 flex items-center justify-center">
									<span className="text-[11px] text-gray-300 dark:text-gray-600 text-center">
										{isOpen ? "Aucune réservation" : "-"}
									</span>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</ScrollArea>
	);

	return (
		<Card className="space-y-4">
			<CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
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
					<Button
						size="sm"
						variant="outline"
						onClick={goPrevious}
						disabled={loading}
						className="rounded-full p-2"
					>
						<ChevronLeft className="w-4 h-4" />
					</Button>
					<Button
						size="sm"
						variant="outline"
						onClick={goNext}
						disabled={loading}
						className="rounded-full p-2"
					>
						<ChevronRight className="w-4 h-4" />
					</Button>
					<Tabs
						value={viewMode}
						onValueChange={(v) => {
							setViewMode(v as ViewMode);
							setReferenceDate(new Date());
						}}
					>
						<TabsList className="rounded-xl border">
							<TabsTrigger
								value="week"
								className="px-3 py-1 text-sm font-medium"
							>
								Semaine
							</TabsTrigger>
							<TabsTrigger
								value="month"
								className="px-3 py-1 text-sm font-medium"
							>
								Mois
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				{loading ? (
					<div className="flex items-center justify-center py-16">
						<Loader2 className="animate-spin w-6 h-6 mr-2 text-muted-foreground" />
						<span className="text-muted-foreground">Chargement …</span>
					</div>
				) : error ? (
					<div className="text-center text-destructive py-12">{error}</div>
				) : (
					<>{viewMode === "week" ? renderWeekView() : renderMonthView()}</>
				)}
			</CardContent>
		</Card>
	);
}

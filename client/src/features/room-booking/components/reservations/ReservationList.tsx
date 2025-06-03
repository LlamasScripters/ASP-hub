import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useReservations, type Reservation } from "@room-booking/hooks/useReservations";
// @ts-ignore
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getWeekBounds, getMonthBounds, formatDateShort, formatDateTime } from "@room-booking/lib/api/reservations";



type ViewMode = "week" | "month";

interface ReservationListProps {
  roomId: string;
  initialReservations?: Reservation[];
}

export function ReservationList({
  roomId,
  initialReservations = [],
}: ReservationListProps) {

  const {
    reservations,
    totalCount,
    loading,
    error,
    updateFilters,
    fetchReservations,
  } = useReservations({ roomId, initialData: initialReservations });


  const [viewMode, setViewMode] = useState<ViewMode>("week");

  const [referenceDate, setReferenceDate] = useState<Date>(new Date());

  const { start: startDate, end: endDate } = useMemo(() => {
    if (viewMode === "week") {
      return getWeekBounds();
    }
    return getMonthBounds(referenceDate);
  }, [viewMode, referenceDate]);


  useEffect(() => {

    updateFilters({
      startDate: startDate,
      endDate: endDate,
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
    const map: Record<string, Array<typeof reservations[number]>> = {};

    for (const r of reservations) {
      const d = new Date(r.startAt);
      const key = d.toLocaleDateString("fr-FR");
      if (!map[key]) {
        map[key] = [];
      }
      map[key].push(r);
    }

    for (const arr of Object.values(map)) {
      arr.sort(
        (a, b) =>
          new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
      );
    }

    return map;
  }, [reservations]);

  const dateList = useMemo(() => {
    const dates: Date[] = [];
    const curr = new Date(startDate);
    curr.setHours(0, 0, 0, 0);
    while (curr <= endDate) {
      dates.push(new Date(curr));
      curr.setDate(curr.getDate() + 1);
    }
    return dates;
  }, [startDate, endDate]);

  return (
    <Card className="space-y-4">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-muted-foreground" />
            Planning des réservations
          </CardTitle>
          <CardDescription>
            Total : {totalCount} réservation{totalCount > 1 ? "s" : ""}
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={goPrevious}
            disabled={loading}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={goNext}
            disabled={loading}
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
            <TabsList>
              <TabsTrigger value="week">Semaine</TabsTrigger>
              <TabsTrigger value="month">Mois</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="animate-spin w-6 h-6 mr-2" />
            <span>Chargement …</span>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-12">
            Erreur : {error}
          </div>
        ) : reservations.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            Aucune réservation pour cette période.
          </div>
        ) : viewMode === "week" ? (
          // ========== Week View ==========
          <div className="grid grid-cols-7 gap-2">
            {dateList.map((day) => {
              const key = day.toLocaleDateString("fr-FR");
              const dayReservations = reservationsByDay[key] || [];
              return (
                <div
                  key={key}
                  className="border rounded-lg p-2 flex flex-col h-[200px] overflow-y-auto"
                >
                  <div className="font-semibold mb-1 text-sm text-center">
                    {formatDateShort(day)}
                  </div>
                  <div className="flex-1 space-y-1">
                    {dayReservations.length > 0 ? (
                      dayReservations.map((r) => (
                        <div
                          key={r.id}
                          className="p-1 border rounded-md hover:bg-gray-50 cursor-pointer"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium">{r.title}</span>
                            <Badge
                              variant="outline"
                              className="text-[10px] px-1 py-0"
                            >
                              {r.status}
                            </Badge>
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            {new Date(r.startAt).toLocaleTimeString("fr-FR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            -{" "}
                            {new Date(r.endAt).toLocaleTimeString("fr-FR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                          <div className="mt-1 text-right">
                            <Button
                              size="icon"
                              variant="ghost"
                              asChild
                              title="Modifier"
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <Link
                                to="/admin/facilities/reservations/$reservationId/edit"
                                params={{ reservationId: r.id }}
                              >
                                ✏️
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-[11px] text-center text-gray-300">
                        — 
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // ========== Month View ==========
          <div className="space-y-4">
            {dateList.map((day) => {
              const key = day.toLocaleDateString("fr-FR");
              const dayReservations = reservationsByDay[key] || [];
              return (
                <div
                  key={key}
                  className="border rounded-lg p-4 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">
                      {day.toLocaleDateString("fr-FR", {
                        weekday: "long",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                    <Badge variant="secondary" className="text-[10px]">
                      {dayReservations.length} réservation
                      {dayReservations.length > 1 ? "s" : ""}
                    </Badge>
                  </div>
                  {dayReservations.length > 0 ? (
                    <div className="space-y-2">
                      {dayReservations.map((r) => (
                        <div
                          key={r.id}
                          className="p-2 border rounded-md hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                        >
                          <div>
                            <div className="text-sm font-medium">{r.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(r.startAt).toLocaleTimeString("fr-FR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}{" "}
                              -{" "}
                              {new Date(r.endAt).toLocaleTimeString("fr-FR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px]">
                              {r.status}
                            </Badge>
                            <Button
                              size="icon"
                              variant="ghost"
                              asChild
                              title="Modifier"
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <Link
                                to="/admin/facilities/reservations/$reservationId/edit"
                                params={{ reservationId: r.id }}
                              >
                                ✏️
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-300 py-4">
                      Aucune réservation
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

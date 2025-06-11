import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useReservations,
  type Reservation,
  reservationStatusEnumTranslated,
} from "@room-booking/hooks/useReservations";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Edit2,
  // @ts-ignore
} from "lucide-react";
import {
  getWeekBounds,
  getMonthBounds,
  formatDateShort,
} from "@room-booking/lib/api/reservations";

type ViewMode = "week" | "month";

interface ReservationListProps {
  roomId: string;
  initialReservations?: Reservation[];
}

export function ReservationList({
  roomId,
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
        (a, b) =>
          new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
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
          <>
            {viewMode === "week" ? (
              <ScrollArea className="h-[300px] border rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-7 divide-x">
                  {dateGrid.map((cell) => {
                    if (!cell.date) {
                      return null;
                    }
                    const d = cell.date;
                    const key = d.toLocaleDateString("fr-FR");
                    const dayReservations = reservationsByDay[key] || [];
                    return (
                      <div
                        key={key}
                        className="flex flex-col min-h-[280px] p-2"
                      >
                        <div className="border-b pb-1 mb-1 text-center text-xs font-semibold text-muted-foreground">
                          {formatDateShort(d)}
                        </div>
                        <div className="flex-1 space-y-2 overflow-y-auto pr-1">
                          {dayReservations.length > 0 ? (
                            dayReservations.map((r) => (
                              <div
                                key={r.id}
                                className="bg-white shadow-sm rounded-md p-2 hover:shadow-lg transition-shadow"
                              >
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-gray-800">
                                    {r.title}
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className="text-[10px] px-1 py-0"
                                  >
                                    {reservationStatusEnumTranslated[r.status] ||
                                      r.status}
                                  </Badge>
                                </div>
                                <div className="mt-1 text-[11px] text-muted-foreground">
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
                                      <Edit2 className="w-4 h-4" />
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
              </ScrollArea>
            ) : (
              <ScrollArea className="h-[500px] border rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-7 divide-x divide-y">
                  {dateGrid.map((cell, idx) => {
                    if (cell.isPlaceholder || !cell.date) {
                      return (
                        <div
                          key={`empty-${referenceDate.toISOString()}-${idx}`}
                          className="flex flex-col min-h-[100px] bg-gray-50 p-2"
                        />
                      );
                    }
                    const d = cell.date;
                    const key = d.toLocaleDateString("fr-FR");
                    const dayReservations = reservationsByDay[key] || [];
                    return (
                      <div
                        key={key}
                        className="flex flex-col min-h-[100px] p-2 bg-white"
                      >
                        <div className="border-b pb-1 mb-1 text-xs font-semibold text-muted-foreground">
                          {formatDateShort(d)}
                        </div>
                        {dayReservations.length > 0 ? (
                          <div className="space-y-2 overflow-y-auto flex-1 pr-1">
                            {dayReservations.map((r) => (
                              <div
                                key={r.id}
                                className="bg-gray-50 rounded-md p-2 hover:bg-gray-100 transition-colors flex justify-between items-start"
                              >
                                <div className="flex-1 pr-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-gray-800">
                                      {r.title}
                                    </span>
                                    <Badge
                                      variant="outline"
                                      className="text-[9px] px-1 py-[1px]"
                                    >
                                      {reservationStatusEnumTranslated[
                                        r.status
                                      ] || r.status}
                                    </Badge>
                                  </div>
                                  <div className="mt-1 text-[10px] text-muted-foreground">
                                    {new Date(r.startAt).toLocaleTimeString(
                                      "fr-FR",
                                      {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      }
                                    )}{" "}
                                    –{" "}
                                    {new Date(r.endAt).toLocaleTimeString(
                                      "fr-FR",
                                      {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      }
                                    )}
                                  </div>
                                </div>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  asChild
                                  title="Modifier"
                                  className="text-gray-400 hover:text-gray-600 mt-1"
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
                            <span className="text-[11px] text-gray-300 text-center">
                              Aucune réservation
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

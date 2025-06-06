import { createFileRoute } from "@tanstack/react-router";
import { complexesApi } from "@room-booking/lib/api/complexes";
import { roomsApi } from "@room-booking/lib/api/rooms";
import { reservationsApi } from "@room-booking/lib/api/reservations";
import type { Complex } from "@room-booking/hooks/useComplexes";
import type { Room } from "@room-booking/hooks/useRooms";
import type { Reservation } from "@room-booking/hooks/useReservations";
import { ReservationEditPage } from "@/features/room-booking/pages/ReservationEditPage";

interface LoaderData {
  complex: Complex;
  room: Room;
  reservation: Reservation;
}

export const Route = createFileRoute(
  "/_authenticated/admin/_admin/facilities/reservations/$reservationId/edit"
)({
  loader: async ({ params }): Promise<LoaderData> => {
    const reservation = await reservationsApi.getReservationById(
      params.reservationId
    );
    const room = await roomsApi.getRoomById(reservation.roomId);
    const complex = await complexesApi.getComplexById(room.complexId);

    return { reservation, room, complex };
  },
  component: ReservationEditRoute,
  errorComponent: ({ error }) => {
    console.error("Erreur chargement de la réservation pour édition:", error);
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-red-600 mb-2">
            Erreur de chargement
          </h2>
          <p className="text-gray-600 mb-4">
            Impossible de charger la réservation demandée.
          </p>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
          >
            Retour
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Réessayez
          </button>
        </div>
      </div>
    );
  },
  pendingComponent: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-600 mb-2">
          Chargement en cours…
        </h2>
        <p className="text-gray-500">
          Veuillez patienter pendant que nous récupérons la réservation.
        </p>
      </div>
    </div>
  ),
});

function ReservationEditRoute() {
  const { reservation, room, complex } = Route.useLoaderData();
  return (
    <ReservationEditPage
      reservation={reservation}
      room={room}
      complex={complex}
    />
  );
}

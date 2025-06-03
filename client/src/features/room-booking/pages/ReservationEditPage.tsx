import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ReservationForm } from "@room-booking/components/reservations/ReservationForm";
import type { Complex } from "@room-booking/hooks/useComplexes";
import type { Room } from "@room-booking/hooks/useRooms";
import type { Reservation } from "@room-booking/hooks/useReservations";
import { Link, useRouter } from "@tanstack/react-router";
// @ts-ignore
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";

interface ReservationEditPageProps {
  complex: Complex;
  room: Room;
  reservation: Reservation;
}

export function ReservationEditPage({
  complex,
  room,
  reservation,
}: ReservationEditPageProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const router = useRouter();

	const previousPageHref = router.__store.prevState?.resolvedLocation?.href || undefined;

  const handleSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      navigate({
        to: `/admin/facilities/complexes/${complex.id}?view=rooms`,
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Modifier une réservation
          </h1>
          <p className="text-muted-foreground">
            Modifier la réservation{" "}
            <span className="font-medium">{reservation.title}</span> de la salle{" "}
            <span className="font-medium">{room.name}</span> du complexe{" "}
            <span className="font-medium">{complex.name}</span>
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link
            to="/admin/facilities/complexes/$complexId"
            search={{ view: "rooms" }}
            params={{ complexId: complex.id }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au complexe
          </Link>
        </Button>
      </div>

      {/* Message de succès */}
      {showSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Réservation modifiée avec succès ! Redirection en cours...
          </AlertDescription>
        </Alert>
      )}

      {/* Avertissement */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important :</strong> En modifiant le créneau, vous pouvez entrer
          en conflit avec d’autres réservations. Vérifiez bien les nouvelles dates.
        </AlertDescription>
      </Alert>

      {/* Formulaire d’édition */}
      <ReservationForm
        roomId={room.id}
        reservation={reservation}
        onSuccess={handleSuccess}
        onCancelLink={previousPageHref}
      />
    </div>
  );
}

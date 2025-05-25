// client/src/features/clubs/pages/SessionEditPage.tsx
import { SessionForm } from "../../components/sessions/SessionForm";
import { useParams } from "@tanstack/react-router";

export function SessionEditPage() {
  const { clubId, sectionId, categoryId, sessionId } = useParams({ from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/$sessionId/edit" });
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Modifier la session</h1>
      <SessionForm mode="edit" clubId={clubId} sectionId={sectionId} categoryId={categoryId} sessionId={sessionId} />
    </div>
  );
}
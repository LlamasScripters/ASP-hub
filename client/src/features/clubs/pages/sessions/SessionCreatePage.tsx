// client/src/features/clubs/pages/SessionCreatePage.tsx
import { SessionForm } from "../../components/sessions/SessionForm";
import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Section } from "../../types";


export function SessionCreatePage() {
  const { clubId, sectionId, categoryId } = useParams({ from: "/_authenticated/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/create" });
  const [section, setSection] = useState<Section | null>(null);

useEffect(() => {
  fetch(`/api/clubs/${clubId}/sections/${sectionId}`)
    .then((res) => res.json())
    .then(setSection);
}, [clubId, sectionId]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Créer une session {section ? `pour la section ${section.name}` : ""}
      </h1>
      <SessionForm mode="create" clubId={clubId} sectionId={sectionId} categoryId={categoryId} />
    </div>
  );
}

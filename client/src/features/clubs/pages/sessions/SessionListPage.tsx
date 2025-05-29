// client/src/features/clubs/pages/SessionsListPage.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { SessionSport } from "../../types";

export function SessionsListPage() {
  const { clubId, sectionId, categoryId } = useParams({ from: "/_authenticated/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/" });
  const [sessions, setSessions] = useState<SessionSport[]>([]);

  useEffect(() => {
    fetch(`/api/clubs/${clubId}/sections/${sectionId}/categories/${categoryId}/sessions`)
      .then((res) => res.json())
      .then(setSessions);
  }, [clubId, sectionId, categoryId]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sessions</h1>
        <Link to="/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/create" params={{ clubId, sectionId, categoryId }}>
          <Button>Créer une session</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.title}</TableCell>
              <TableCell>{s.type}</TableCell>
              <TableCell>{s.status}</TableCell>
              <TableCell>{new Date(s.startDate).toLocaleDateString()} → {new Date(s.endDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Link to="/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/$sessionId/edit" params={{ clubId, sectionId, categoryId, sessionId: s.id }}>
                  <Button variant="outline">Modifier</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

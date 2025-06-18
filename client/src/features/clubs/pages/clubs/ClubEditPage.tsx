// client/src/features/clubs/pages/ClubEditPage.tsx
import { useParams } from "@tanstack/react-router";
import { ClubForm } from "../../components/clubs/ClubForm";

export function ClubEditPage() {
	const { clubId } = useParams({
		from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/edit",
	});
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Modifier le club</h1>
			<ClubForm mode="edit" clubId={clubId} />
		</div>
	);
}

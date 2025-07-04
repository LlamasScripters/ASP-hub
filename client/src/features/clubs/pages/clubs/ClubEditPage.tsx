import { useParams } from "@tanstack/react-router";
import { ClubForm } from "../../components/clubs/ClubForm";

export function ClubEditPage() {
	const { clubId } = useParams({
		from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/edit",
	});
	return <ClubForm mode="edit" clubId={clubId} />;
}

import { useParams } from "@tanstack/react-router";
// client/src/features/clubs/pages/SectionCreatePage.tsx
import { SectionForm } from "../../components/sections/SectionForm";

export function SectionCreatePage() {
	const { clubId } = useParams({
		from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/create",
	});
	return <SectionForm mode="create" clubId={clubId} />;
}

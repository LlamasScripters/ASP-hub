import { useParams } from "@tanstack/react-router";
// client/src/features/clubs/pages/SectionEditPage.tsx
import { SectionForm } from "../../components/sections/SectionForm";

export function SectionEditPage() {
	const { clubId, sectionId } = useParams({
		from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/edit",
	});
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Modifier la section</h1>
			<SectionForm mode="edit" clubId={clubId} sectionId={sectionId} />
		</div>
	);
}

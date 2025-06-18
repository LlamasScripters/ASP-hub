import { useParams } from "@tanstack/react-router";
// client/src/features/clubs/pages/CategoryCreatePage.tsx
import { CategoryForm } from "../../components/catogories/CategoryForm";

export function CategoryCreatePage() {
	const { clubId, sectionId } = useParams({
		from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/categories/create",
	});
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Créer une catégorie</h1>
			<CategoryForm mode="create" clubId={clubId} sectionId={sectionId} />
		</div>
	);
}

import { useParams } from "@tanstack/react-router";
// client/src/features/clubs/pages/CategoryEditPage.tsx
import { CategoryForm } from "../../components/catogories/CategoryForm";

export function CategoryEditPage() {
	const { clubId, sectionId, categoryId } = useParams({
		from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/edit",
	});
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Modifier la catégorie</h1>
			<CategoryForm
				mode="edit"
				clubId={clubId}
				sectionId={sectionId}
				categoryId={categoryId}
			/>
		</div>
	);
}

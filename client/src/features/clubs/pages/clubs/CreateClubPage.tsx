// client/src/features/clubs/pages/ClubCreatePage.tsx
import { ClubForm } from "../../components/clubs/ClubForm";

export function ClubCreatePage() {
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Créer un club</h1>
			<ClubForm mode="create" />
		</div>
	);
}

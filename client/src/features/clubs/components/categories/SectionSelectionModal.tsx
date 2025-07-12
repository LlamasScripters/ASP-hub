import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "@tanstack/react-router";
import { FolderOpen } from "lucide-react";
import { useSectionsByClub } from "../../hooks/useSections";

interface SectionSelectionModalProps {
	isOpen: boolean;
	onClose: () => void;
	clubId: string;
}

export function SectionSelectionModal({
	isOpen,
	onClose,
	clubId,
}: SectionSelectionModalProps) {
	const navigate = useNavigate();
	const { data: sectionsResponse, isLoading } = useSectionsByClub(clubId);
	const sections = sectionsResponse?.data || [];

	const handleSectionSelect = (sectionId: string) => {
		navigate({
			to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/categories/create",
			params: { clubId, sectionId },
		});
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<FolderOpen className="h-5 w-5" />
						Sélectionner une section
					</DialogTitle>
					<DialogDescription>
						Choisissez la section dans laquelle vous souhaitez créer la nouvelle
						catégorie.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					{isLoading ? (
						<div className="text-center py-8">
							<p className="text-muted-foreground">
								Chargement des sections...
							</p>
						</div>
					) : sections.length === 0 ? (
						<div className="text-center py-8">
							<div className="p-4 bg-muted/30 rounded-full mb-4 w-fit mx-auto">
								<FolderOpen className="h-8 w-8 text-muted-foreground" />
							</div>
							<p className="text-muted-foreground mb-4">
								Aucune section disponible. Vous devez d'abord créer une section.
							</p>
							<Button
								onClick={() => {
									navigate({
										to: "/admin/dashboard/clubs/$clubId/sections/create",
										params: { clubId },
									});
									onClose();
								}}
							>
								Créer une section
							</Button>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
							{sections.map((section) => (
								<Card
									key={section.id}
									className="cursor-pointer hover:shadow-md transition-all duration-200 hover:border-primary/20"
									onClick={() => handleSectionSelect(section.id)}
								>
									<CardContent className="p-4">
										<div className="flex items-center gap-3 mb-2">
											<div
												className="w-3 h-3 rounded-full border border-primary/20"
												style={{ backgroundColor: section.color || "#3b82f6" }}
											/>
											<Badge variant="secondary" className="text-xs">
												Section
											</Badge>
										</div>
										<h3 className="font-semibold text-lg mb-1">
											{section.name}
										</h3>
										<p className="text-sm text-muted-foreground line-clamp-2">
											{section.description || "Aucune description"}
										</p>
									</CardContent>
								</Card>
							))}
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}

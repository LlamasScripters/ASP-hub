import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, Eye, User } from "lucide-react";
import type { PendingApplication } from "../hooks/use-pending-applications";

interface ApplicationsTableProps {
	applications: PendingApplication[];
	isLoading?: boolean;
	onViewApplication: (applicationId: string) => void;
}

export function ApplicationsTable({
	applications,
	isLoading = false,
	onViewApplication,
}: ApplicationsTableProps) {
	if (isLoading) {
		return (
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Candidat</TableHead>
							<TableHead>Section</TableHead>
							<TableHead>Catégorie</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Array.from({ length: 5 }, (_, i) => {
							const rowId = `skeleton-row-${Date.now()}-${i}`;
							return (
								<TableRow key={rowId}>
									{Array.from({ length: 5 }, (_, j) => {
										const cellId = `skeleton-cell-${rowId}-${j}`;
										return (
											<TableCell key={cellId}>
												<div className="h-4 bg-gray-200 rounded animate-pulse" />
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
		);
	}

	if (applications.length === 0) {
		return (
			<div className="rounded-md border p-8 text-center">
				<div className="flex flex-col items-center gap-2">
					<User className="h-8 w-8 text-gray-400" />
					<h3 className="text-lg font-medium text-gray-900">
						Aucune candidature en attente
					</h3>
					<p className="text-gray-500">
						Toutes les candidatures ont été traitées.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Candidat</TableHead>
						<TableHead>Section</TableHead>
						<TableHead>Catégorie</TableHead>
						<TableHead>Date de soumission</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{applications.map((application) => (
						<TableRow key={application.id}>
							<TableCell>
								<div className="flex flex-col">
									<span className="font-medium">
										{application.user.firstName} {application.user.lastName}
									</span>
									<span className="text-sm text-gray-500">
										{application.user.email}
									</span>
								</div>
							</TableCell>
							<TableCell>
								{application.section?.name ? (
									<Badge variant="outline">{application.section.name}</Badge>
								) : (
									<span className="text-gray-400">-</span>
								)}
							</TableCell>
							<TableCell>
								{application.category?.name ? (
									<Badge variant="secondary">{application.category.name}</Badge>
								) : (
									<span className="text-gray-400">-</span>
								)}
							</TableCell>
							<TableCell>
								<div className="flex items-center gap-1 text-sm text-gray-500">
									<Calendar className="h-4 w-4" />
									{format(new Date(application.createdAt), "dd MMM yyyy", {
										locale: fr,
									})}
								</div>
							</TableCell>
							<TableCell>
								<Button
									size="sm"
									variant="outline"
									onClick={() => onViewApplication(application.id)}
									className="flex items-center gap-1"
								>
									<Eye className="h-4 w-4" />
									Examiner
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

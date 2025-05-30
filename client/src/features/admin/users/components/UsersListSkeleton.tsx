import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default function UsersListSkeleton() {
	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h2 className="text-lg font-semibold">Liste des utilisateurs</h2>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Nom</TableHead>
						<TableHead>Prénom</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Rôle</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((key) => {
						return (
							<TableRow key={key}>
								<TableCell>
									<Skeleton className="size-10" />
								</TableCell>
								<TableCell>
									<Skeleton className="size-10" />
								</TableCell>
								<TableCell>
									<Skeleton className="size-10" />
								</TableCell>
								<TableCell>
									<Skeleton className="size-10" />
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}

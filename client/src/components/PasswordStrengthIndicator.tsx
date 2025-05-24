import { checkPasswordStrength } from "@/lib/password";
import { cn } from "@/lib/utils";

interface PasswordStrengthIndicatorProps {
	password: string;
	className?: string;
}

const colorsMap = Object.freeze({
	0: {
		label: "Très faible",
		color: "bg-red-500",
	},
	1: {
		label: "Faible",
		color: "bg-orange-500",
	},
	2: {
		label: "Moyen",
		color: "bg-yellow-500",
	},
	3: {
		label: "Fort",
		color: "bg-blue-500",
	},
	4: {
		label: "Très fort",
		color: "bg-green-500",
	},
});

export function PasswordStrengthIndicator({
	password,
	className,
}: PasswordStrengthIndicatorProps) {
	const { score } = checkPasswordStrength(password);
	const { color, label } = colorsMap[score];

	if (!password) return null;

	return (
		<div className={cn("space-y-2", className)}>
			<div className="flex space-x-1">
				{[0, 1, 2, 3, 4].map((level) => (
					<div
						key={level}
						className={cn(
							"h-0.5 w-full rounded-full transition-colors",
							level <= score ? color : "bg-gray-200",
						)}
					/>
				))}
			</div>
			{label && (
				<div className="text-sm text-muted-foreground">
					Force du mot de passe: <span className="font-medium">{label}</span>
				</div>
			)}
		</div>
	);
}

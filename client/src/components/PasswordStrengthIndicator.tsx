import { cn } from "@/lib/utils";

interface PasswordStrengthIndicatorProps {
	password: string;
	className?: string;
}

export function PasswordStrengthIndicator({
	password,
	className,
}: PasswordStrengthIndicatorProps) {
	const getPasswordStrength = (password: string) => {
		if (!password) return { score: 0, label: "", color: "" };

		let score = 0;
		const checks = {
			length: password.length >= 8,
			lowercase: /[a-z]/.test(password),
			uppercase: /[A-Z]/.test(password),
			number: /\d/.test(password),
			special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
		};

		// Each check adds to the score
		if (checks.length) score += 1;
		if (checks.lowercase) score += 1;
		if (checks.uppercase) score += 1;
		if (checks.number) score += 1;
		if (checks.special) score += 1;

		const strengthLevels = [
			{ score: 0, label: "", color: "" },
			{ score: 1, label: "Très faible", color: "bg-red-500" },
			{ score: 2, label: "Faible", color: "bg-orange-500" },
			{ score: 3, label: "Moyen", color: "bg-yellow-500" },
			{ score: 4, label: "Fort", color: "bg-blue-500" },
			{ score: 5, label: "Très fort", color: "bg-green-500" },
		];

		return strengthLevels[score];
	};

	const { score, label, color } = getPasswordStrength(password);

	if (!password) return null;

	return (
		<div className={cn("space-y-2", className)}>
			<div className="flex space-x-1">
				{[1, 2, 3, 4, 5].map((level) => (
					<div
						key={level}
						className={cn(
							"h-2 w-full rounded-full transition-colors",
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
			<div className="text-xs text-muted-foreground space-y-1">
				<div>Le mot de passe doit contenir:</div>
				<ul className="space-y-1 ml-4">
					<li className={password.length >= 8 ? "text-green-600" : ""}>
						• Au moins 8 caractères
					</li>
					<li className={/[a-z]/.test(password) ? "text-green-600" : ""}>
						• Une minuscule
					</li>
					<li className={/[A-Z]/.test(password) ? "text-green-600" : ""}>
						• Une majuscule
					</li>
					<li className={/\d/.test(password) ? "text-green-600" : ""}>
						• Un chiffre
					</li>
					<li
						className={
							/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "text-green-600" : ""
						}
					>
						• Un caractère spécial
					</li>
				</ul>
			</div>
		</div>
	);
}

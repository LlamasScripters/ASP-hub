import { Progress } from "@/components/ui/progress";
import { useFirstLogin } from "@/hooks/use-first-login";

interface FirstLoginProgressBarProps {
	currentStep: 1 | 2 | 3;
	title: string;
}

export function FirstLoginProgressBar({
	currentStep,
	title,
}: FirstLoginProgressBarProps) {
	const { getProgressPercentage } = useFirstLogin();

	return (
		<div className="mb-8">
			<div className="flex items-center justify-between mb-2">
				<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
					{title}
				</h1>
				<span className="text-sm text-gray-600 dark:text-gray-400">
					Étape {currentStep}/3
				</span>
			</div>
			<Progress value={getProgressPercentage()} className="w-full" />
		</div>
	);
}

import { cn } from "@/lib/utils";

export default function Divider({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className="relative">
			<div className="absolute inset-0 flex items-center">
				<span className={cn("w-full border-t", className)} />
			</div>
			<div className="relative flex justify-center text-xs uppercase">
				{children}
			</div>
		</div>
	);
}

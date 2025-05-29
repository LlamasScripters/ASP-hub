import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
	return (
		<img
			src="/logo.png"
			alt="AS Pierrefitte"
			className={cn("size-10 object-contain", className)}
		/>
	);
}

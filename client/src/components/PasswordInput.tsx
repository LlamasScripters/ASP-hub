import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function PasswordInput(props: React.ComponentProps<"input">) {
	const [showPassword, setShowPassword] = useState(false);
	const ShowIcon = showPassword ? EyeOffIcon : EyeIcon;
	const ariaLabel = showPassword
		? "Masquer le mot de passe"
		: "Afficher le mot de passe";
	const type = showPassword ? "text" : "password";

	return (
		<div className="relative">
			<Input type={type} placeholder="Mot de passe" {...props} />
			<Button
				type="button"
				variant="ghost"
				size="sm"
				className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
				aria-label={ariaLabel}
				onClick={() => setShowPassword(!showPassword)}
			>
				<ShowIcon className="h-4 w-4" />
			</Button>
		</div>
	);
}

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export function RegisterForm() {
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);

		const formData = new FormData(e.currentTarget);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const confirmPassword = formData.get("confirm-password") as string;

		console.group("RegisterForm");
		console.log("name", name);
		console.log("email", email);
		console.log("password", password);
		console.log("confirmPassword", confirmPassword);
		console.groupEnd();

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		setIsLoading(true);

		try {
			const { error } = await authClient.signUp.email({
				email,
				password,
				name,
			});

			if (error?.message) {
				setError(error.message);
			}
		} catch (err) {
			setError("An unexpected error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full max-w-md space-y-8">
			<div>
				<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
					Create your account
				</h2>
			</div>
			<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
				<div className="space-y-4">
					<div>
						<label htmlFor="name" className="sr-only">
							Full Name
						</label>
						<input
							id="name"
							name="name"
							type="text"
							autoComplete="name"
							required
							className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							placeholder="Full Name"
						/>
					</div>
					<div>
						<label htmlFor="email" className="sr-only">
							Email address
						</label>
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							required
							className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							placeholder="Email address"
						/>
					</div>
					<div>
						<label htmlFor="password" className="sr-only">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="new-password"
							required
							className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							placeholder="Password"
						/>
					</div>
					<div>
						<label htmlFor="confirm-password" className="sr-only">
							Confirm Password
						</label>
						<input
							id="confirm-password"
							name="confirm-password"
							type="password"
							autoComplete="new-password"
							required
							className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							placeholder="Confirm Password"
						/>
					</div>
				</div>

				{error && (
					<div className="text-red-500 text-sm text-center">{error}</div>
				)}

				<div>
					<button
						type="submit"
						disabled={isLoading}
						className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
					>
						{isLoading ? "Creating account..." : "Create account"}
					</button>
				</div>
			</form>
		</div>
	);
}

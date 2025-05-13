import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export function ForgotPasswordForm() {
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		setSuccess(false);
		setIsLoading(true);

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;

		try {
			const { error } = await authClient.forgetPassword({
				email,
			});

			if (error?.message) {
				setError(error.message);
			} else {
				setSuccess(true);
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
					Reset your password
				</h2>
				<p className="mt-2 text-center text-sm text-gray-600">
					Enter your email address and we'll send you a link to reset your
					password.
				</p>
			</div>
			<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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

				{error && (
					<div className="text-red-500 text-sm text-center">{error}</div>
				)}

				{success && (
					<div className="text-green-500 text-sm text-center">
						Password reset link has been sent to your email.
					</div>
				)}

				<div>
					<button
						type="submit"
						disabled={isLoading}
						className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
					>
						{isLoading ? "Sending reset link..." : "Send reset link"}
					</button>
				</div>
			</form>
		</div>
	);
}

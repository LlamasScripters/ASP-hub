import { authClient } from "@/lib/auth/auth-client";
import { authConfig } from "@/lib/auth/auth-config";
import { queryOptions } from "@tanstack/react-query";

export const usersConfig = {
	passwordMinLength: 12,
};

export const getLoggedInUserQueryOptions = ({
	signal,
}: { signal?: AbortSignal } = {}) =>
	queryOptions({
		queryKey: ["user", "me"],
		queryFn: async () => {
			const { data } = await authClient.getSession({
				fetchOptions: { signal },
			});
			return data?.user ?? null;
		},
		staleTime: authConfig.sessionDuration,
		gcTime: authConfig.sessionDuration,
	});

export const listAccountsQueryOptions = (
	userId: string,
	{ signal }: { signal?: AbortSignal } = {},
) =>
	queryOptions({
		queryKey: ["user", userId, "accounts"],
		queryFn: async () => {
			const { data } = await authClient.listAccounts({
				fetchOptions: { signal },
			});
			return data;
		},
	});

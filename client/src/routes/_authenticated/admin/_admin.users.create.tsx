import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/users/create",
)({
	component: CreateUser,
});

//TODO: Create user form
export default function CreateUser() {
	return <></>;
}

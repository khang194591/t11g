import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
	component: () => (
		<section className="h-screen w-screen flex items-center justify-center">
			<Outlet />
		</section>
	),
});

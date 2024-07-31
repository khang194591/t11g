import { treaty } from "@elysiajs/eden";
import type { App } from "@t11g/backend/src";
import { useQuery } from "@tanstack/react-query";

export * from "./client";

export const api = treaty<App>("localhost:3000");

export const useGetMembers = () =>
	useQuery({
		queryKey: ["get-members"],
		queryFn: () => api.members.index.get(),
	});

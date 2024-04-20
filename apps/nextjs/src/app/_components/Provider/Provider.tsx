"use client";

import { AuthKitProvider } from "@farcaster/auth-kit";
import { HuddleClient, HuddleProvider } from "@huddle01/react";

import { farcasterConfig } from "~/app/_config/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
interface ProviderProps {
	children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
	const huddleClient = new HuddleClient({
		projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? "",
		options: {
			activeSpeakers: {
				size: 8,
			},
		},
	});
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<AuthKitProvider config={farcasterConfig}>
				<HuddleProvider client={huddleClient}>{children}</HuddleProvider>
			</AuthKitProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
};
export default Provider;

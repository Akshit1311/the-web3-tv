"use client";

import React from "react";
import { AuthKitProvider } from "@farcaster/auth-kit";
import { HuddleClient, HuddleProvider } from "@huddle01/react";

import { farcasterConfig } from "~/app/_config/config";

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
  return (
    <AuthKitProvider config={farcasterConfig}>
      <HuddleProvider client={huddleClient}>{children}</HuddleProvider>
    </AuthKitProvider>
  );
};
export default Provider;

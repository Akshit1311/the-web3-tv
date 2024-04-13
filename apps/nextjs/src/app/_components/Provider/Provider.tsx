"use client";

import React from "react";
import { AuthKitProvider } from "@farcaster/auth-kit";

import { farcasterConfig } from "~/app/_config/config";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return <AuthKitProvider config={farcasterConfig}>{children}</AuthKitProvider>;
};
export default Provider;

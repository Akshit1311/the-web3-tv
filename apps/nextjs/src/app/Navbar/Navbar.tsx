"use client";

import React from "react";
import Image from "next/image";

import "@farcaster/auth-kit/styles.css";

import { useRouter } from "next/navigation";
import { SignInButton, useProfile } from "@farcaster/auth-kit";

import GoLiveDropDown from "../Dropdowns/GoLiveDropDown";

const Navbar = () => {
  const {
    isAuthenticated,
    profile: { displayName },
  } = useProfile();

  const router = useRouter();

  return (
    <div className="h-50 sticky top-0 flex w-full items-center justify-between border-b pb-3 pt-4">
      <Image
        src="/logo.png"
        alt="Logo"
        height={50}
        width={107.2}
        className="cursor-pointer rounded-lg"
        onClick={() => router.push("/")}
      />

      <div className="flex items-center gap-4">
        <GoLiveDropDown />

        {isAuthenticated ? (
          <div>{displayName}</div>
        ) : (
          <SignInButton
            onSuccess={(data) => {
              console.log({ data });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;

"use client";

import React from "react";
import Image from "next/image";

import "@farcaster/auth-kit/styles.css";

import { SignInButton, useProfile } from "@farcaster/auth-kit";

import GoLiveDropDown from "../Dropdowns/GoLiveDropDown";

const Navbar = () => {
  const {
    isAuthenticated,
    profile: { displayName },
  } = useProfile();

  return (
    <div className="h-50 sticky top-0 flex w-full items-center justify-between pt-4">
      <Image
        src="/logo.png"
        alt="Logo"
        height={50}
        width={107.2}
        className="rounded-lg"
      />

      <div className="flex items-center gap-8">
        <GoLiveDropDown />

        {isAuthenticated ? (
          <div>{displayName}</div>
        ) : (
          <SignInButton
            onSuccess={({ displayName, bio, fid }) => {
              console.log(displayName, bio, fid);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;

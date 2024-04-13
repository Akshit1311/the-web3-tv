"use client";

import React from "react";
import Image from "next/image";

import "@farcaster/auth-kit/styles.css";

import { SignInButton, useProfile } from "@farcaster/auth-kit";

const Navbar = () => {
  const {
    isAuthenticated,
    profile: { displayName },
  } = useProfile();

  return (
    <div className="h-50 relative mt-4 flex w-full  items-center justify-between">
      <Image
        src="/logo.png"
        alt="Logo"
        height={50}
        width={107.2}
        className="rounded-lg"
      />
      {/* <Image src="/logo.png" alt="Logo" height={933} width={2000} /> */}

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
  );
};

export default Navbar;

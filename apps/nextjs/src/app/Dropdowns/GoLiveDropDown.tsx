"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";

import icons from "../_assets/icons";

const GoLiveDropDown: React.FC = () => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="select-none">
        <Image
          src="/images/Navbar/Camera.png"
          alt="camera"
          width={44}
          height={44}
          className="cursor-pointer object-contain"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem className=" flex flex-col items-center gap-y-4">
          <div
            className="flex cursor-pointer items-center gap-2"
            role="presentation"
            onClick={() => router.push("/creator")}
          >
            <div>{icons.wifi}</div>
            <div>Start stream</div>
          </div>

          <div
            className="flex cursor-pointer items-center gap-2"
            role="presentation"
            onClick={() => router.push("/streams")}
          >
            <div>{icons.record}</div>
            <div>view streams</div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default GoLiveDropDown;

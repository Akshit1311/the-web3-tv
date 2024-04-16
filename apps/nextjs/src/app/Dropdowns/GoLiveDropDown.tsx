"use client";

import React from "react";
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
      <DropdownMenuTrigger asChild>
        <div role="presentation" className="cursor-pointer">
          {icons.camera}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>
          <div
            className="flex cursor-pointer items-center gap-2"
            role="presentation"
            onClick={() => router.push("/creator")}
          >
            <div>{icons.wifi}</div>
            <div>Start streaming</div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default GoLiveDropDown;

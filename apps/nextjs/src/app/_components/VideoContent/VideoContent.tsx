"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface VideoContentProps {
  title: string;
  roomId: string;
}

const VideoContent: React.FC<VideoContentProps> = ({ roomId, title }) => {
  const router = useRouter();

  return (
    <div
      className="w-full cursor-pointer"
      role="presentation"
      onClick={() => router.push(`/live/${roomId}`)}
    >
      <div className="aspect-video bg-zinc-800" />
      <div className="my-2 flex gap-1">
        {/* <div className="aspect-square h-12 rounded-full bg-zinc-800" /> */}
        <div className="flex w-full items-center gap-2">
          <div className="w-full text-lg text-zinc-500">
            <span className="">{title}</span>
          </div>
          {/* <div className="w-full text-xs text-zinc-500">
            <span className="">Description</span>
          </div> */}
          {/* <div className="w-full bg-zinc-800 text-xs">
            <span className="invisible">988 watching</span>
          </div> */}

          <div className="flex h-fit w-fit items-center gap-1 rounded-sm bg-red-500 px-1  text-xs font-medium text-white">
            <span className="h-2 w-2 rounded-full bg-white"></span>
            Live
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoContent;

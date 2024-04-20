import React from "react";

import { Skeleton } from "@acme/ui/skeleton";

const VideoContentSkeleton: React.FC = () => {
  return (
    <div className="w-full cursor-pointer" role="presentation">
      <Skeleton className="aspect-video bg-zinc-800" />
      <div className="my-2 flex gap-1">
        <Skeleton className="aspect-square h-12 rounded-full bg-zinc-800" />
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="w-full bg-zinc-800 text-lg">
            <span className="invisible">Title</span>
          </Skeleton>
          <Skeleton className="w-full bg-zinc-800 text-xs">
            <span className="invisible">Description</span>
          </Skeleton>
          <Skeleton className="w-full bg-zinc-800 text-xs">
            <span className="invisible">988 watching</span>
          </Skeleton>

          <div className="flex w-fit items-center gap-1 rounded-sm bg-red-500 px-1  text-xs font-medium text-white">
            <span className="h-2 w-2 rounded-full bg-white"></span>
            Live
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoContentSkeleton;

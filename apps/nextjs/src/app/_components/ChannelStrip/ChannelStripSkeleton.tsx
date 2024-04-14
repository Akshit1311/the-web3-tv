import React from "react";

import { Skeleton } from "@acme/ui/skeleton";

const ChannelStripSkeleton = () => {
  return (
    <div className="scrollbar-hide flex w-full gap-2 overflow-x-auto scroll-smooth">
      {Array.from({ length: 50 }).map((_, i) => (
        <Skeleton
          id={i.toString()}
          className="w-20 flex-shrink-0 snap-center text-nowrap rounded-md bg-zinc-800 px-3 py-1 text-sm font-medium text-zinc-300"
        >
          <span className="invisible">sfsffs</span>
        </Skeleton>
      ))}
    </div>
  );
};

export default ChannelStripSkeleton;

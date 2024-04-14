import React from "react";

import { Skeleton } from "@acme/ui/skeleton";

const ChannelStripSkeleton = () => {
  return (
    <div className=" flex w-full gap-2 overflow-x-hidden ">
      {Array.from({ length: 50 }).map((_, i) => (
        <Skeleton
          id={i.toString()}
          className="w-fit cursor-pointer snap-center text-nowrap rounded-md bg-zinc-800 px-3 py-1 text-sm font-medium text-zinc-300"
        >
          <span className="invisible">sfsfsdsdsfs</span>
        </Skeleton>
      ))}
    </div>
  );
};

export default ChannelStripSkeleton;

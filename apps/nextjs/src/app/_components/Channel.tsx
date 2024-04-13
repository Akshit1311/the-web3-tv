import React from "react";

interface Props {
  channelName: string;
  subs: number;
}

const Channel = ({ channelName, subs }: Props) => {
  return (
    <div className="my-2 flex items-center gap-3">
      <div className="h-8 w-8 rounded-full bg-slate-200 sm:h-10 sm:w-10"></div>
      <div>
        <div className="text-sm sm:text-base">{channelName}</div>
        <div className="text-xs text-slate-400">{subs} Subscribers</div>
      </div>
      <button className="flex items-center rounded-3xl  bg-white px-4 py-2.5  text-xs font-medium text-black sm:text-sm">
        Subscribe
      </button>
    </div>
  );
};

export default Channel;

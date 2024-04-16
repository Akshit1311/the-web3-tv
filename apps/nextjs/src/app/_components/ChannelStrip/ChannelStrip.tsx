import React from "react";

interface Channel {
  id: string;
  name: string;
  description: string;
  subscribers: number;
  videos: number;
  thumbnail: string;
  banner: string;
}

interface IAllChannelsResponse {
  result: { channels: Channel[] };
}

const ChannelStrip = async () => {
  const response = await fetch("https://api.warpcast.com/v2/all-channels");

  const {
    result: { channels },
  } = (await response.json()) as IAllChannelsResponse;

  return (
    <div className="flex w-full gap-2 overflow-x-hidden">
      {channels.map((channel) => (
        <div
          id={channel.id}
          key={channel.id}
          className="w-fit cursor-pointer snap-center text-nowrap rounded-md bg-zinc-800 px-3 py-1 text-sm font-medium text-zinc-300"
        >
          {channel.id}
        </div>
      ))}
    </div>
  );
};

export default ChannelStrip;

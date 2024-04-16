"use client";

import React from "react";
import { usePeerIds } from "@huddle01/react/hooks";

import Navbar from "../../Navbar/Navbar";
import Channel from "../Channel";
import Chat from "../Chat";
import RemoteView from "./RemoteView";

interface Props {
  id: string;
}

const Presentation: React.FC<Props> = ({ id }) => {
  const { peerIds } = usePeerIds();

  return (
    <main className="h-screen w-full px-4 pb-4 sm:px-8">
      <div className="flex h-full flex-col items-center justify-start gap-4">
        <Navbar />

        {id}

        <div className="flex h-fit w-full flex-1 flex-col gap-4  sm:flex-initial sm:flex-row">
          {peerIds.map((id) => (
            <RemoteView key={`remote-peer-${id}`} id={id} />
          ))}
          <Chat className="h-[calc(50vh)]" />
        </div>
        <div className="hidden w-full sm:block">
          <div className="my-2 text-3xl font-medium">Hi there mofo</div>
          <Channel channelName="Sundeee" subs={10000} />
        </div>
      </div>
    </main>
  );
};
export default Presentation;

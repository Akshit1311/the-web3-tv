"use client";

import React, { useEffect } from "react";
import { useLocalVideo } from "@huddle01/react/hooks";

import Channel from "../Channel";
import Chat from "../Chat";
import VideoEle from "../Common/VideoEle";
import Navbar from "../Navbar";

interface Props {
  id: string;
}

const Presentation: React.FC<Props> = ({ id }) => {
  const { stream, enableVideo } = useLocalVideo();

  useEffect(() => {
    (async () => {
      await enableVideo().catch((error) => {
        console.error({ error });
      });
    })();
  }, []);

  return (
    <main className="h-screen w-full px-4 pb-4 sm:px-8">
      <div className="flex h-full flex-col items-center justify-start gap-4">
        <Navbar />

        {id}

        <div className="flex h-fit w-full flex-1 flex-col gap-4  sm:flex-initial sm:flex-row">
          <VideoEle stream={stream} />
          <Chat className="h-[calc(90vh-2rem)]" />
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

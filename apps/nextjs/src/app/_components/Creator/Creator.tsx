"use client";

import React, { useEffect } from "react";
import { useLocalVideo } from "@huddle01/react/hooks";

import { Button } from "@acme/ui/button";

import Chat from "../Chat";
import VideoEle from "../Common/VideoEle";
import Navbar from "../Navbar";

interface CreatprProps {}

const Creator: React.FC<CreatprProps> = () => {
  const { stream, enableVideo, disableVideo, isVideoOn } = useLocalVideo();

  // Handlers
  const handleEnableVideo = async () => {
    await enableVideo().catch((err) => {
      console.error({ err });
    });
  };

  const handleDisableVideo = async () => {
    await disableVideo().catch((err) => {
      console.error({ err });
    });
  };

  // useEffect(() => {
  //   handleEnableVideo();
  // }, []);
  return (
    <section className="relative h-full">
      <Navbar />

      <div className="borde  mt-10 flex h-full items-start gap-4">
        <div className="h-96 w-96 flex-1 border">
          {isVideoOn ? (
            <VideoEle stream={stream} />
          ) : (
            <div className="flex h-[13.5rem] w-96 items-center justify-center bg-gray-800">
              Avatar
            </div>
          )}

          <div className="my-4 flex items-center justify-center gap-2">
            <Button type="button" variant="outline" onClick={handleEnableVideo}>
              video on
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleDisableVideo}
            >
              video off
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => alert("todo")}
            >
              Livestream
            </Button>
          </div>

          <div>Test</div>
        </div>

        <div className="w-96">
          <Chat className="h-[calc(90vh-1rem)]" />
        </div>
      </div>
    </section>
  );
};
export default Creator;

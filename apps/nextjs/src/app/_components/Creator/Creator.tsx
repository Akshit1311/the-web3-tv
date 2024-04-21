"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useProfile } from "@farcaster/auth-kit";
import { useLocalVideo, useRoom } from "@huddle01/react/hooks";
import { z } from "zod";

import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";

import { createRoom, genTokenforRecording, getToken } from "~/app/_actions";
// import { startRecording } from "~/app/_recorder";
import Navbar from "../../Navbar/Navbar";
import Loader from "../Common/Loader";
import VideoEle from "../Common/VideoEle";
import CreatorChat from "./CreatorChat";

const EditModal = dynamic(() => import("./EditModal"));

const streamSchema = z.object({
  title: z.string(),
  desc: z.string(),
  isModalOpen: z.boolean(),
  streamKey: z.string(),
  streamUrl: z.string(),
  isOpen: z.boolean(),
});

export type TStreamType = z.infer<typeof streamSchema>;

const Creator: React.FC = () => {
  const {
    profile: { displayName, pfpUrl },
  } = useProfile();

  const streamMap: TStreamType = {
    title: `${displayName ?? "Harry"} Stream`,
    desc: "This is a test stream",
    isModalOpen: false,
    streamKey: "qh69-4azq-g1y0-jb2z-a10m",
    streamUrl: "",
    isOpen: true,
  };

  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [streamData, setStreamData] = useState<TStreamType>(streamMap);

  const { stream, enableVideo, disableVideo, isVideoOn } = useLocalVideo();

  const { joinRoom, state, room } = useRoom({
    onJoin: () => {
      setIsLoading(false);
    },
  });

  // Handlers
  const handleEnableVideo = async () => {
    await enableVideo().catch((error: Error) => {
      console.error({ error });
    });
  };

  const handleDisableVideo = async () => {
    await disableVideo().catch((err: Error) => {
      console.error({ err });
    });
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setStreamData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnClose = useCallback(() => {
    setStreamData((prev) => ({
      ...prev,
      isModalOpen: false,
    }));
  }, [streamData, setStreamData]);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ streamData });
    setStreamData(streamMap);
  };

  const handleJoinRoom = async () => {
    setIsLoading(true);

    const roomData = await createRoom({
      title: streamData.title,
      desc: streamData.desc,
      avatar: pfpUrl ?? "",
    });

    if (!roomData.data?.roomId) return console.error("Room creation failed");

    const { data } = await getToken({
      role: "host",
      roomId: roomData.data.roomId,
    });

    if (!data) {
      throw new Error("Token creation failed");
    }

    const { data: _recData } = await genTokenforRecording({
      roomId: roomData.data.roomId,
    });

    console.log(data);
    await joinRoom({
      roomId: roomData.data.roomId,
      token: data.token,
    });

    // await startRecording({
    //   roomId,
    //   token,
    // });
  };

  return (
    <section className="relative h-full">
      <Navbar />

      <div className=" h-[calc(100vh- 2.5rem)] mt-7 flex items-start gap-4">
        <div className="relative flex-1">
          <div className="bg-default-1 flex items-start justify-center gap-8">
            <div className="relative w-full">
              {state === "connected" && (
                <div className="absolute left-2 top-2 flex items-center gap-2 rounded-md  bg-zinc-900 px-2">
                  <div className="h-2 w-2 rounded-full bg-red-500"> </div>

                  <div className="font-semibold text-red-500">Streaming</div>
                </div>
              )}

              {isVideoOn && (state === "idle" || state === "connected") ? (
                <VideoEle stream={stream} />
              ) : (
                <Loader
                  text={
                    isLoading
                      ? "Starting Stream"
                      : "Start Streaming by clicking the Video on button"
                  }
                  isLoading={isLoading}
                />
              )}

              <div className="my-2 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleEnableVideo}
                >
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
                  onClick={handleJoinRoom}
                >
                  Start Livestream
                </Button>
              </div>
            </div>
            <div className="w-full">
              <TitleStrip
                className="mt-4"
                title="Title"
                subtitle={streamData.title}
              />

              <TitleStrip
                className="my-4"
                title="Description"
                subtitle={streamData.desc}
              />

              <TitleStrip title="Privacy" subtitle="Public" />
            </div>

            <Button
              onClick={() => {
                setStreamData((prev) => ({
                  ...prev,
                  isModalOpen: true,
                }));
              }}
              type="button"
              variant="outline"
              className="absolute right-4 top-4"
            >
              Edit
            </Button>
          </div>
          <div className=" bg-default-1 mt-4 p-4">
            <div className=" text-sm font-medium text-blue-500">
              Stream Settings
            </div>

            <div className="mt-4">
              <div className="text-sm font-medium text-gray-400">Stream ID</div>

              <div>
                <input
                  id="pass"
                  value={room.roomId ?? ""}
                  type={streamData.isOpen ? "text" : "password"}
                  name="streamKey"
                  className="w-1/2 border-b border-white bg-transparent p-1 text-sm font-normal text-white focus:outline-none"
                />

                <button
                  type="button"
                  className="-ml-6"
                  onClick={() => {
                    setStreamData((prev) => ({
                      ...prev,
                      isOpen: !prev.isOpen,
                    }));
                  }}
                >
                  {streamData.isOpen ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-medium text-gray-400">
                Stream URL
              </div>
              <input
                value={`${origin}/live/${room.roomId}`}
                type="text"
                name="streamUrl"
                className="w-1/2 border-b border-white bg-transparent p-1 text-sm font-normal text-white focus:outline-none"
                placeholder="rtmp://a.rtmp.youtube.com/live2"
              />
            </div>
          </div>
        </div>

        <CreatorChat />
      </div>

      {streamData.isModalOpen ? (
        <Suspense fallback={"...loading"}>
          <EditModal
            onSave={handleSave}
            streamData={streamData}
            onChange={handleOnChange}
            onClose={handleOnClose}
          />
        </Suspense>
      ) : null}
    </section>
  );
};
export default Creator;

interface TitleProps {
  className?: string;
  title: string;
  subtitle: string;
}

const TitleStrip: React.FC<TitleProps> = ({ className, title, subtitle }) => (
  <div className={cn(className)}>
    <div className="text-sm font-normal text-[#aaaaaa]">{title}</div>
    <div className="mt-1.5 text-xl font-medium text-white">{subtitle}</div>
  </div>
);

"use client";

import React, { Suspense, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { useProfile } from "@farcaster/auth-kit";
import { useLocalVideo } from "@huddle01/react/hooks";

import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";

import VideoEle from "../Common/VideoEle";
import Navbar from "../Navbar";
import CreatorChat from "./CreatorChat";

const EditModal = dynamic(() => import("./EditModal"));

export interface TStreamType {
  title?: string;
  desc: string;
  isModalOpen: boolean;
}

const Creator: React.FC = () => {
  const {
    profile: { displayName },
  } = useProfile();

  const streamMap = {
    title: displayName ?? "Harry",
    desc: "",
    isModalOpen: false,
  };

  const [streamData, setStreamData] = useState<TStreamType>(streamMap);

  const { stream, enableVideo, disableVideo, isVideoOn } = useLocalVideo();

  // Handlers
  const handleEnableVideo = async () => {
    await enableVideo().catch((error) => {
      console.error({ error });
    });
  };

  const handleDisableVideo = async () => {
    await disableVideo().catch((err) => {
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
  }, [streamData]);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ streamData });
    setStreamData(streamMap);
  };

  return (
    <section className="relative h-full">
      <Navbar />

      <div className=" h-[calc(100vh- 2.5rem)] mt-7 flex items-start gap-4">
        <div className="relative flex-1">
          <div className="bg-default-1 flex items-start justify-center gap-8">
            <div className="w-full">
              {isVideoOn ? (
                <VideoEle stream={stream} />
              ) : (
                <div className="flex h-[17.4rem] w-full flex-col items-center justify-center gap-y-2 bg-black">
                  <div
                    className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                  />
                  <div className="max-w-48 text-center text-sm font-medium text-white">
                    Start Streaming by clicking the Video on button
                  </div>
                </div>
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
                  onClick={() => alert("todo")}
                >
                  Livestream
                </Button>
              </div>
            </div>
            <div className="w-full">
              <TitleStrip
                className="mt-4"
                title="Title"
                subtitle={`${streamData.title} Live Stream`}
              />

              <TitleStrip
                className="my-4"
                title="Category"
                subtitle="People & Blogs"
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
          <div className=" bg-default-1 mt-4">
            <div className="p-4 text-sm font-medium text-blue-500">
              Stream Settings
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

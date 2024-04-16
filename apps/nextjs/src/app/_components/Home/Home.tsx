"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRoom } from "@huddle01/react/hooks";

import type { ILiveMeeting } from "~/app/_actions";
import { getLiveMeetings, getToken } from "~/app/_actions";
import ChannelStrip from "../ChannelStrip/ChannelStrip";
import ChannelStripSkeleton from "../ChannelStrip/ChannelStripSkeleton";
import Navbar from "../Navbar";
import VideoContent from "../VideoContent/VideoContent";

const Home: React.FC = () => {
  const [meetingsData, setMeetingsData] = useState<ILiveMeeting[]>();

  const { joinRoom } = useRoom();

  const router = useRouter();

  // handlers
  const handleJoinStream = async (roomId: string) => {
    const { data } = await getToken({ role: "guest", roomId });

    if (!data) {
      throw new Error("Token creation failed");
    }
    await joinRoom({
      roomId: data.roomId,
      token: data.token,
    })
      .then(() => {
        router.push(`/video/${roomId}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    void (async () => {
      const liveMeetings = await getLiveMeetings();
      setMeetingsData(liveMeetings);
    })();
  }, []);

  console.log({ meetingsData });

  return (
    <div className="flex h-full flex-col items-center justify-start gap-4">
      <Navbar />

      <Suspense fallback={<ChannelStripSkeleton />}>
        <ChannelStrip />
      </Suspense>

      <div className="flex w-full flex-wrap gap-3 overflow-y-auto px-2 sm:grid sm:grid-cols-4 sm:justify-between">
        {Array.from({ length: 12 }).map((_, i) => (
          <VideoContent key={i} onClick={() => alert("todo")} />
        ))}

        {/* {meetingsData?.map(({ roomId, title }, i) => (
          <VideoContent key={i} onClick={() => handleJoinStream(roomId)} />
        ))} */}
      </div>
    </div>
  );
};
export default Home;

import React from "react";

import type { ILiveMeetingData } from "~/app/_actions";
import VideoContent from "./VideoContent";

const VideoContentParent = async () => {
  const resp = await fetch("https://api.huddle01.com/api/v1/live-meetings", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "x-api-key": process.env.API_KEY ?? "",
    },
    cache: "no-cache",
  });

  const data = (await resp.json()) as ILiveMeetingData;

  console.log({ data });

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  await sleep(3000);

  return (
    <>
      {data.liveMeetings.map(({ title, roomId }, i) => (
        <VideoContent key={i} title={title} roomId={roomId} />
      ))}
    </>
  );
};

export default VideoContentParent;

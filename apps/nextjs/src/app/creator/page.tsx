"use server";

import React from "react";

import Creator from "../_components/Creator/Creator";

interface RoomDetails {
  message: string;
  data: {
    roomId: string;
  };
}

const getRoomId = async () => {
  const res = await fetch("https://api.huddle01.com/api/v1/create-room", {
    method: "POST",
    body: JSON.stringify({
      title: "Huddle01 Room",
    }),
    headers: {
      "Content-type": "application/json",
      "x-api-key": process.env.API_KEY ?? "",
    },
    cache: "no-cache",
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: RoomDetails = await res.json();

  const roomId = data.data.roomId;

  return roomId;
};

export default async function apage() {
  const roomId = await getRoomId();
  return <Creator roomId={roomId} />;
}

"use server";

import { revalidatePath } from "next/cache";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

export const action = createSafeActionClient();

const tokenSchema = z.object({
  roomId: z.string().optional(),
  role: z.enum(["host", "guest"]),
});

export interface RoomDetails {
  message: string;
  data: {
    roomId: string;
  };
}

export interface ILiveMeeting {
  title: string;
  roomId: string;
}

export interface ILiveMeetingData {
  liveMeetings: ILiveMeeting[];
}

export const getToken = action(tokenSchema, async ({ roomId, role }) => {
  revalidatePath("/creator");

  let finalRoomId = roomId;

  if (role === "host") {
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

    const data = (await res.json()) as RoomDetails;

    finalRoomId = data.data.roomId;
  }

  if (!finalRoomId) throw new Error("Error in room creation");

  const accessToken = new AccessToken({
    apiKey: process.env.API_KEY ?? "",
    roomId: finalRoomId,
    role: Role.HOST,
    permissions: {
      admin: true,
      canConsume: true,
      canProduce: true,
      canProduceSources: {
        cam: true,
        mic: true,
        screen: true,
      },
      canRecvData: true,
      canSendData: true,
      canUpdateMetadata: true,
    },
  });

  const token = await accessToken.toJwt();
  return { token, roomId: finalRoomId };
});

export const getLiveMeetings = async () => {
  // revalidatePath("/");
  const resp = await fetch("https://api.huddle01.com/api/v1/live-meetings", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "x-api-key": process.env.API_KEY ?? "",
    },
    cache: "no-cache",
  });

  const data = (await resp.json()) as ILiveMeetingData;

  const liveMeetings = data.liveMeetings;

  return liveMeetings;
};

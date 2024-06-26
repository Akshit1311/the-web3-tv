"use server";

import { revalidatePath } from "next/cache";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

import { env } from "~/env";

const action = createSafeActionClient();

const tokenSchema = z.object({
  roomId: z.string(),
  role: z.enum(["host", "guest"]),
});
const createRoomSchema = z.object({
  title: z.string(),
  avatar: z.string(),
  desc: z.string(),
});

const RecordingSchema = z.object({
  roomId: z.string(),
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

export interface IRecordingdata {
  id: string;
  url: string;
  size: number;
}

export interface IRecordingType {
  nextcursor: number;
  recordings: IRecordingdata[];
}

export const createRoom = action(
  createRoomSchema,
  async ({ desc, title, avatar }) => {
    const res = await fetch("https://api.huddle01.com/api/v1/create-room", {
      method: "POST",
      body: JSON.stringify({
        title,
        appData: {
          title,
          desc,
          avatar,
        },
      }),
      headers: {
        "Content-type": "application/json",
        "x-api-key": process.env.API_KEY ?? "",
      },
      cache: "no-cache",
    });

    const { data } = (await res.json()) as RoomDetails;

    return data;
  },
);

export const getToken = action(tokenSchema, async ({ roomId, role }) => {
  revalidatePath("/creator");

  const accessToken = new AccessToken({
    apiKey: process.env.API_KEY ?? "",
    roomId: roomId,
    role: role,
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
  return { token };
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

export const genTokenforRecording = action(
  RecordingSchema,
  async ({ roomId }) => {
    if (!roomId) {
      throw new Error("romid doesn't exist");
    }

    const accessToken = new AccessToken({
      apiKey: env.API_KEY,
      roomId,
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
      options: {
        metadata: {
          test: "true",
        },
      },
    });

    const token = await accessToken.toJwt();

    return token;
  },
);

export const getAllRecordings = async () => {
  const resp = await fetch("https://api.huddle01.com/api/v1/get-recordings", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "x-api-key": process.env.API_KEY ?? "",
    },
    cache: "no-cache",
  });

  const data = (await resp.json()) as IRecordingType;

  const recordings = data.recordings;

  return recordings;
};

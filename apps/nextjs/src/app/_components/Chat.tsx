"use client";

import React, { useState } from "react";
import { useProfile } from "@farcaster/auth-kit";
import { useDataMessage, useLocalPeer } from "@huddle01/react/hooks";
import { z } from "zod";

import { cn } from "@acme/ui";

import icons from "../_assets/icons";

export interface TMessageType {
  message: string;
  sender: string;
}

interface ChatProps {
  className: string;
  innerHeight: string;
}

const ParsedMsgSchema = z.object({
  text: z.string(),
  username: z.string(),
});

const Chat: React.FC<ChatProps> = ({ className, innerHeight }) => {
  const { peerId } = useLocalPeer();
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<TMessageType[]>([]);

  const {
    profile: { username },
  } = useProfile();

  const { sendData } = useDataMessage({
    onMessage: (payload, from, label) => {
      try {
        console.log({ payload, from, label });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const parsedPayload = JSON.parse(payload);
        const typedPayload = ParsedMsgSchema.parse(parsedPayload);

        if (label === "chat") {
          setMessages((prev) => [
            ...prev,
            {
              message: typedPayload.text,
              sender: typedPayload.username,
            },
          ]);
        }
      } catch (error) {
        console.log({ error });
      }
    },
  });

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = JSON.stringify({
      text,
      username: username ?? peerId,
    });

    console.log({ payload });

    await sendData({
      to: "*",
      payload,
      label: "chat",
    });
  };

  return (
    <form
      className={cn(
        "relative w-full flex-1 rounded-sm border  border-zinc-600 sm:w-96 sm:min-w-96 sm:max-w-96 sm:flex-auto",
        className,
      )}
      onSubmit={handleSend}
    >
      <div className="flex items-center justify-center gap-2 border-b p-4 text-base font-semibold">
        <div>{icons.chat}</div>
        <div>Top Chats</div>
      </div>
      <div
        className={cn(
          "break-after-all overflow-y-auto overflow-x-hidden break-all p-2",
          innerHeight,
        )}
      >
        {/* {Array.from({ length: 100 }).map((_) => (
          <div className="ml-auto flex flex-col justify-end text-sm font-normal">
            <div className="text-right text-gray-500">
              {"message message message message"}
            </div>
            <div className="text-right font-semibold text-gray-300/80">
              {"sender"}
            </div>
          </div>
        ))} */}
        {messages.map(({ message, sender }) =>
          sender === username ? (
            <div className="ml-auto flex w-fit flex-col justify-end text-sm font-normal text-gray-300/80">
              {message}
            </div>
          ) : (
            <div className="mr-auto flex w-fit items-center justify-end gap-1.5 font-normal text-white">
              <div className="w-fit truncate font-semibold text-purple-500">
                {sender}
              </div>
              <div className="w-fit rounded-md text-sm ">{message}</div>
            </div>
          ),
        )}
      </div>

      <div className="mt-2 flex w-full items-center gap-2  border-t p-1.5 backdrop-blur-md">
        <input
          value={text}
          type="text"
          placeholder="Enter you text"
          className="w-full  bg-transparent  text-sm font-normal placeholder:text-gray-700 focus:outline-none"
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="">
          {icons.enterIcon}
        </button>
      </div>
    </form>
  );
};

export default Chat;

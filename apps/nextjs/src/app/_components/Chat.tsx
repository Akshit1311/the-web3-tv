"use client";

import React, { useState } from "react";
import { useDataMessage, useLocalPeer } from "@huddle01/react/hooks";

import { cn } from "@acme/ui";

export interface TMessageType {
  message: string;
  sender: string;
}

interface ChatProps {
  className: string;
}

const Chat: React.FC<ChatProps> = ({ className }) => {
  const { peerId } = useLocalPeer();
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<TMessageType[]>([]);

  const { sendData } = useDataMessage({
    onMessage: (payload, from, label) => {
      if (label === "chat") {
        setMessages((prev) => [...prev, { message: payload, sender: from }]);
      }
    },
  });

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendData({
      to: "*",
      payload: text,
      label: "chat",
    });
  };

  return (
    <form
      className={cn(
        "w-full flex-1 rounded-lg border border-zinc-600  sm:w-96 sm:min-w-96 sm:max-w-96 sm:flex-auto",
        className,
      )}
      onSubmit={handleSend}
    >
      <div className="h-[93%] overflow-y-auto p-2">
        {messages.map(({ message, sender }) =>
          sender === peerId ? (
            <div className="flex w-fit flex-col items-end rounded-lg bg-red-500 p-1.5 text-sm">
              {message}
            </div>
          ) : (
            <div className="flex w-fit flex-col items-end rounded-lg bg-red-500 p-1.5 text-sm">
              <div>{message}</div>
              <div>{sender}</div>
            </div>
          ),
        )}
      </div>

      <div className="mt-2 flex items-center gap-2 border border-t p-2">
        <input
          type="text"
          placeholder="Enter you text"
          className="w-full rounded-sm p-2"
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="">
          enter
        </button>
      </div>
    </form>
  );
};

export default Chat;

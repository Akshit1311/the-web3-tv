import React from "react";

import Chat from "../Chat";

interface CreatorChatProps {}

const CreatorChat: React.FC<CreatorChatProps> = () => {
  return (
    <div className="w-96">
      <Chat className="h-[calc(90vh-2.5rem)]" />
    </div>
  );
};
export default CreatorChat;

import React from "react";

import Chat from "../Chat";

const CreatorChat: React.FC = () => {
  return (
    <div className="w-96">
      <Chat className="h-[calc(80vh)]" innerHeight="h-[87%]" />
    </div>
  );
};
export default CreatorChat;

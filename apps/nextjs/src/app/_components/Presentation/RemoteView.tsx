import React from "react";
import { useRemoteVideo } from "@huddle01/react/hooks";

import VideoEle from "../Common/VideoEle";

interface RemoteViewProps {
  id: string;
}

const RemoteView: React.FC<RemoteViewProps> = ({ id }) => {
  const { stream, state } = useRemoteVideo({ peerId: id });

  return (
    <div className="h-full w-96 border">
      {state === "playable" && <VideoEle stream={stream} />}
    </div>
  );
};
export default RemoteView;

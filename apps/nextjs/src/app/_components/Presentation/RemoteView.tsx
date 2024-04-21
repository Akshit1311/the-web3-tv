import React from "react";
import { useRemoteVideo } from "@huddle01/react/hooks";

import Loader from "../Common/Loader";
import VideoEle from "../Common/VideoEle";

interface RemoteViewProps {
  id: string;
}

const RemoteView: React.FC<RemoteViewProps> = ({ id }) => {
  const { stream, state } = useRemoteVideo({ peerId: id });

  return (
    <div className="flex h-full w-96 flex-1 items-center border">
      {state === "playable" ? (
        <VideoEle stream={stream} />
      ) : (
        <Loader text=" Streaming is starting please wait..." />
      )}
    </div>
  );
};
export default RemoteView;

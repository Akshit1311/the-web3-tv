import React from "react";

import VideoContentSkeleton from "./VideoContentSkeleton";

const VideoContentSkeletons = () => {
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <VideoContentSkeleton key={i} />
      ))}
    </>
  );
};

export default VideoContentSkeletons;

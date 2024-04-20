import React, { Suspense } from "react";

import Navbar from "../../Navbar/Navbar";
import ChannelStripSkeleton from "../ChannelStrip/ChannelStripSkeleton";
import VideoContentSkeletons from "../VideoContent/VideoContentSkeletons";

const ChannelStrip = React.lazy(() => import("../ChannelStrip/ChannelStrip"));
const VideoContentParent = React.lazy(
  () => import("../VideoContent/VideoContentParent"),
);

const Home: React.FC = () => {
  return (
    <div className="flex h-full flex-col items-center justify-start gap-4">
      <Navbar />

      <Suspense fallback={<ChannelStripSkeleton />}>
        <ChannelStrip />
      </Suspense>

      <div className="flex w-full flex-wrap gap-3 overflow-y-auto px-2 sm:grid sm:grid-cols-4 sm:justify-between">
        <Suspense fallback={<VideoContentSkeletons />}>
          <VideoContentParent />
        </Suspense>

        {/* {liveMeetings?.map(({ roomId, title }, i) => (
          <VideoContent key={i} onClick={() => handleJoinStream(roomId)} />
        ))} */}
      </div>
    </div>
  );
};
export default Home;

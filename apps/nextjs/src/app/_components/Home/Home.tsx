import React, { Suspense } from "react";

import type { ILiveMeeting } from "~/app/page";
import ChannelStrip from "../ChannelStrip/ChannelStrip";
import ChannelStripSkeleton from "../ChannelStrip/ChannelStripSkeleton";
import Navbar from "../Navbar";
import VideoContent from "../VideoContent/VideoContent";

interface HomeProps {
  data: ILiveMeeting[];
}

const Home: React.FC<HomeProps> = ({ data }) => {
  console.log({ data });
  return (
    <div className="flex h-full flex-col items-center justify-start gap-4">
      <Navbar />

      <Suspense fallback={<ChannelStripSkeleton />}>
        <ChannelStrip />
      </Suspense>

      <div className="flex w-full flex-wrap gap-3 overflow-y-auto px-2 sm:grid sm:grid-cols-4 sm:justify-between">
        {Array.from({ length: 12 }).map((_, i) => (
          <VideoContent key={i} />
        ))}

        {/* {data.map(({ roomId, title }, i) => (
          <VideoContent key={i} />
        ))} */}
      </div>
    </div>
  );
};
export default Home;

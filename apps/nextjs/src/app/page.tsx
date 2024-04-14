import { Suspense } from "react";

import ChannelStrip from "./_components/ChannelStrip/ChannelStrip";
import ChannelStripSkeleton from "./_components/ChannelStrip/ChannelStripSkeleton";
import Navbar from "./_components/Navbar";
import VideoContent from "./_components/VideoContent/VideoContent";

function HomePage() {
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
      </div>
    </div>
  );
}

export default HomePage;

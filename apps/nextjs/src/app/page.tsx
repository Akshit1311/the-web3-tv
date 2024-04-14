import { Suspense } from "react";

import ChannelStrip from "./_components/ChannelStrip/ChannelStrip";
import ChannelStripSkeleton from "./_components/ChannelStrip/ChannelStripSkeleton";
import Navbar from "./_components/Navbar";

function HomePage() {
  return (
    <div className="flex h-full flex-col items-center justify-start gap-4">
      <Navbar />

      <Suspense fallback={<ChannelStripSkeleton />}>
        <ChannelStrip />
      </Suspense>
    </div>
  );
}

export default HomePage;

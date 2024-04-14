// export const runtime = "edge";

import Channel from "../../_components/Channel";
import Chat from "../../_components/Chat";
import Navbar from "../../_components/Navbar";

export default function VideoPage() {
  return (
    <div className="flex h-full flex-col items-center justify-start gap-4">
      <Navbar />

      <div className="flex h-fit w-full flex-1 flex-col gap-4  sm:flex-initial sm:flex-row">
        <div className="w-auto sm:flex-1">
          <video
            className="aspect-video w-full rounded-lg  "
            autoPlay
            muted
            controls
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          />
          <div className="sm:hidden">
            <div className="my-2 text-2xl font-medium">Video Page</div>
            <Channel channelName="Sundeee" subs={10000} />
          </div>
        </div>
        <Chat />
      </div>
      <div className="hidden w-full sm:block">
        <div className="my-2 text-3xl font-medium">Video Page</div>
        <Channel channelName="Sundeee" subs={10000} />
      </div>
    </div>
  );
}

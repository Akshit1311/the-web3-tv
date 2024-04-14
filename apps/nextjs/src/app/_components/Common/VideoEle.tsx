import React, { useEffect, useRef } from "react";

import Channel from "../Channel";

interface VideoEleProps {
  stream: MediaStream | null;
}

const VideoEle: React.FC<VideoEleProps> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoObj = videoRef.current;

    if (!videoObj) return;

    if (stream) {
      videoObj.srcObject = stream;

      videoObj.onloadedmetadata = async () => {
        try {
          await videoObj.play();
        } catch (error) {
          console.error({ error });
        }

        videoObj.onerror = () => {
          console.error("error in playing video");
        };
      };
    }
  }, [stream]);

  return (
    <div className="w-auto">
      <video
        ref={videoRef}
        className="aspect-video w-full rounded-lg"
        autoPlay
        muted
      />
      <div className="sm:hidden">
        <div className="my-2 text-2xl font-medium">Hi there mofo</div>
        <Channel channelName="Sundeee" subs={10000} />
      </div>
    </div>
  );
};
export default React.memo(VideoEle);

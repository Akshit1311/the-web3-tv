"use client";

import { useProfile } from "@farcaster/auth-kit";
import { usePeerIds } from "@huddle01/react/hooks";

import { useGetAddress } from "~/app/_hooks";
import Navbar from "../../Navbar/Navbar";
import Channel from "../Channel";
import Chat from "../Chat";
import Loader from "../Common/Loader";
import RemoteView from "./RemoteView";

interface Props {
  id: string;
}

const Presentation: React.FC<Props> = () => {
  const {
    profile: { username },
  } = useProfile();
  const { data } = useGetAddress({ displayName: username ?? "" });
  console.log("data", data);
  const { peerIds } = usePeerIds();

  return (
    <main className="h-screen w-full px-4 pb-4 sm:px-8">
      <div className="flex h-full flex-col items-center justify-start gap-4">
        <Navbar />

        <div className="flex h-fit w-full flex-1 flex-col gap-4  sm:flex-initial sm:flex-row">
          {peerIds.map((id) => (
            <RemoteView key={`remote-peer-${id}`} id={id} />
          ))}

          <Loader text=" Streaming is starting please wait..." />

          <Chat className="h-[calc(50vh)]" innerHeight="h-[78.9%]" />
        </div>
        <div className="hidden w-full sm:block">
          <div className="my-2 text-3xl font-medium">Hi there mofo</div>
          <Channel channelName="Sundeee" subs={10000} />
        </div>
      </div>
    </main>
  );
};
export default Presentation;

"use client";

import { createWalletClient, viemConnector } from "@farcaster/auth-kit";
import { usePeerIds } from "@huddle01/react/hooks";

import { getOwnerValue } from "~/app/_atom/owner.atom";
import { useGetAddress } from "~/app/_hooks";
import Navbar from "../../Navbar/Navbar";
import Channel from "../Channel";
import Chat from "../Chat";
import Loader from "../Common/Loader";
import RemoteView from "./RemoteView";

interface Props {
  id: string;
}

const Presentation: React.FC<Props> = ({ id }) => {
  const { username, fid, nonce } = getOwnerValue();
  const { data } = useGetAddress({ displayName: username ?? "" });
  console.log("data", data);
  const { peerIds } = usePeerIds();
  const coreOptions = {
    chain: "0xaa36a7",
  };

  const getSignatureArgsHook = async () => {
    const walletClient = createWalletClient({
      relay: "https://relay.farcaster.xyz",
      ethereum: viemConnector(),
    });

    const myData = {
      fid: fid || 0,
      address: data?.data?.transfer?.owner,
      uri: window.location.origin,
      domain: window.location.host,
      nonce,
      //   statement: "Sign in to continue",
    };
    console.log({ myData });

    const { siweMessage, message, isError, error } =
      walletClient.buildSignInMessage(myData);
    console.log("message", message);
    console.log("siweMessage", siweMessage, error);
    console.log("errMsg", error?.message);
  };
  getSignatureArgsHook();
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

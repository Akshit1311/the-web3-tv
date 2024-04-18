import { Recorder } from "@huddle01/server-sdk/recorder";

const recorder = new Recorder(
  process.env.NEXT_PUBLIC_PROJECT_ID ?? "",
  process.env.API_KEY ?? "",
);

export const startRecording = async ({
  roomId,
  token,
}: {
  roomId: string;
  token: string;
}) => {
  await recorder.startRecording({
    roomId,
    token,
  });
};

export const stopRecoridng = async ({ roomId }: { roomId: string }) => {
  await recorder.stop({ roomId });
};

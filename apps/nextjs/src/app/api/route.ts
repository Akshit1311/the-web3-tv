import { AccessToken, Role } from "@huddle01/server-sdk/auth";

export const dynamic = "force-dynamic";

export default async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const roomId = searchParams.get("roomId");

  if (!roomId) {
    return new Response("throw new error");
  }

  const accessToken = new AccessToken({
    apiKey: process.env.NEXT_PUBLIC_API_KEY ?? "",
    roomId,
    //available roles: Role.HOST, Role.CO_HOST, Role.SPEAKER, Role.LISTENER, Role.GUEST - depending on the privileges you want to give to the user
    role: Role.HOST,
    //custom permissions give you more flexibility in terms of the user privileges than a pre-defined role
    permissions: {
      admin: true,
      canConsume: true,
      canProduce: true,
      canProduceSources: {
        cam: true,
        mic: true,
        screen: true,
      },
      canRecvData: true,
      canSendData: true,
      canUpdateMetadata: true,
    },
  });

  const token = await accessToken.toJwt();

  return new Response(token);
}

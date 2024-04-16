"use server";

import Home from "./_components/Home/Home";

export interface ILiveMeeting {
  title: string;
  roomId: string;
}

export interface IData {
  liveMeetings: ILiveMeeting[];
}

const getLiveMeetigs = async () => {
  const resp = await fetch("https://api.huddle01.com/api/v1/live-meetings", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "x-api-key": process.env.API_KEY ?? "",
    },
    cache: "no-cache",
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: IData = await resp.json();

  const { liveMeetings } = data;

  return liveMeetings;
};

async function HomePage() {
  const liveMeetings = await getLiveMeetigs();

  return <Home data={liveMeetings} />;
}

export default HomePage;

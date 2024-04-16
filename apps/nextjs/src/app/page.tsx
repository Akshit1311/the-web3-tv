import { getLiveMeetings } from "./_actions";
import Home from "./_components/Home/Home";

async function HomePage() {
  const liveMeetings = await getLiveMeetings();
  return <Home liveMeetings={liveMeetings} />;
}

export default HomePage;

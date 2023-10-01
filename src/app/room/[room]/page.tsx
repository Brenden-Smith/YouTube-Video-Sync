import ReactPlayer from "react-player";
import Player from "./player";

export default function Room() {
  return (
    <main className="flex flex-col items-center justify-center flex-grow h-screen w-screen">
      <Player />
    </main>
  );
}

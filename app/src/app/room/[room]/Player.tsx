import { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useRoomContext } from "./content";

type PlayerProps = {
  url: string;
  playing: boolean;
  volume: number;
  muted: boolean;
};

export default function Player({ url, playing, volume, muted }: PlayerProps) {
  const { socket, player } = useRoomContext();
  const [mounted, setMounted] = useState(false);
  const onPlay = useCallback(
    () => socket?.send(JSON.stringify({ event: "play" })),
    [socket]
  );
  const onPause = useCallback(
    () => socket?.send(JSON.stringify({ event: "pause" })),
    [socket]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center flex-grow w-full z-[-1]">
      {mounted && (
        <ReactPlayer
          ref={player}
          playing={playing}
          url={url}
          width="100%"
          height="100%"
          onPlay={onPlay}
          onPause={onPause}
          volume={volume}
          muted={muted}
        />
      )}
    </div>
  );
}
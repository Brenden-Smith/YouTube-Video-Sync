"use client";

import useRoom from "@/hooks/useRoom";
import {
  RefObject,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactPlayer from "react-player/lazy";
import Player from "./Player";
import Footer from "./Footer";
import HUD from "./HUD";

type RoomContextType = {
  player: RefObject<ReactPlayer>;
  socket: WebSocket | null;
  host: boolean;
};

export const RoomContext = createContext<RoomContextType>(
  {} as RoomContextType
);

export function useRoomContext() {
  return useContext(RoomContext);
}

export default function Content() {
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [hover, setHover] = useState(false);

  const player = useRef<ReactPlayer>(null);
  const {
    socket,
    playing,
    queue,
    setPlaying,
    position,
    setPosition,
    host,
    setQueue,
  } = useRoom(player);
  const url = useMemo(() => (queue ? queue[0]?.videoUrl : ""), [queue]);

  useEffect(() => {
    const interval = setInterval(() => {
      playing && setPosition(player.current?.getCurrentTime() ?? 0);
      host &&
        socket?.send(
          JSON.stringify({
            event: "position",
            data: player.current?.getCurrentTime(),
          })
        );
      setDuration(player.current?.getDuration() ?? 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [player, playing, setPosition, host, socket]);

  useEffect(() => {
    let timer: any = null;
    window.onmousemove = () => {
      clearTimeout(timer);
      setHover(true);
      timer = setTimeout(() => setHover(false), 3000);
    };
  }, []);

  useEffect(() => {
    if (host && position >= duration - 1)
      socket?.send(JSON.stringify({ event: "queue_next" }));
  }, [position, duration, host, socket]);

  return (
    <RoomContext.Provider
      value={{
        player,
        socket,
        host,
      }}
    >
      <Player url={url} playing={playing} volume={volume} muted={muted} />
      <HUD hover={hover} queue={queue} setQueue={setQueue} />
      <Footer
        duration={duration}
        hover={hover}
        muted={muted}
        playing={playing}
        position={position}
        setMuted={setMuted}
        setPlaying={setPlaying}
        setPosition={setPosition}
        setVolume={setVolume}
        url={url}
        volume={volume}
      />
    </RoomContext.Provider>
  );
}

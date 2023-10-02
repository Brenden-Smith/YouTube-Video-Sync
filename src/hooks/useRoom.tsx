import Room from "@/types/Room";
import Video from "@/types/Video";
import { useParams } from "next/navigation";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ReactPlayer from "react-player/lazy";
import { Socket, io } from "socket.io-client";

export default function useRoom(player: RefObject<ReactPlayer>): {
  socket: Socket | null;
  position: number;
  playing: boolean;
  queue: Video[];
  setQueue: Dispatch<SetStateAction<Video[]>>;
  host: boolean;
  setPosition: Dispatch<SetStateAction<number>>;
  setPlaying: Dispatch<SetStateAction<boolean>>;
} {
  const [queue, setQueue] = useState<Video[]>([]);
  const [host, setHost] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [position, setPosition] = useState(0);
  const [playing, setPlaying] = useState(true);

  const params = useParams();

  useEffect(() => {
    // Create socket
    const s = io(`:${3001}`, {
      path: "/api/socket",
      addTrailingSlash: false,
      query: {
        room: params.room,
      },
    });

    // Define socket events
    s.on("position", (value: number, h: string) => {
      if (
        h !== s.id &&
        Math.abs((player.current?.getCurrentTime() ?? 0) - value) > 0.3
      ) {
        player.current?.seekTo(value);
        setPosition(value);
      }
    });
    s.on("room", (room: Room) => {
      setHost(room.users[0] === s.id);
      setQueue(room.queue);
    });
    s.on("play", () => setPlaying(true));
    s.on("pause", () => setPlaying(false));
    s.on("seek", (value: number) => {
      player.current?.seekTo(value);
      setPosition(value);
    });
    s.on("queue_update", (value: Video[]) => {
      setQueue(value);
      console.log(value);
    });
    s.on("host", (h: string) => setHost(h === s.id));
    s.on("connect_error", () => fetch("/api/socket"));

    // Set socket
    setSocket(s);

    // Disconnect socket on unmount
    return () => {
      s.disconnect();
    };
  }, [params.room, player, setPosition, setPlaying]);

  return {
    socket,
    position,
    playing,
    queue,
    host,
    setPosition,
    setPlaying,
    setQueue,
  };
}

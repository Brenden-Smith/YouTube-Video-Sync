import { useParams } from "next/navigation";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ReactPlayer from "react-player";
import { Socket, io } from "socket.io-client";

export default function useRoom(player: RefObject<ReactPlayer>): {
  socket: Socket | null;
  position: number;
  playing: boolean;
  url: string | undefined;
  host: boolean;
  setPosition: Dispatch<SetStateAction<number>>;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  setUrl: Dispatch<SetStateAction<string | undefined>>;
} {
  const [host, setHost] = useState(false);
  const [url, setUrl] = useState<string | undefined>();
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
      if (h !== s.id && Math.abs((player.current?.getCurrentTime() ?? 0) - value) > 0.3) {
        player.current?.seekTo(value);
        setPosition(value);
      }
    });
    s.on("play", () => setPlaying(true));
    s.on("pause", () => setPlaying(false));
    s.on("seek", (value: number) => {
      player.current?.seekTo(value);
      setPosition(value);
    });
    s.on("url", (value: string) => setUrl(value));
    s.on("host", (h: string) => setHost(h === s.id));
    s.on("connect_error", () => fetch("/api/socket"));

    // Set socket
    setSocket(s);

    // Disconnect socket on unmount
    return () => {
      s.disconnect();
    };
  }, [params.room, player, setPosition, setPlaying, setUrl]);

  return {
    socket,
    position,
    playing,
    url,
    host,
    setPosition,
    setPlaying,
    setUrl,
  };
}

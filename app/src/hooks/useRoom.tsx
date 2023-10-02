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

export default function useRoom(player: RefObject<ReactPlayer>): {
  socket: WebSocket | null;
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
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [position, setPosition] = useState(0);
  const [playing, setPlaying] = useState(true);

  const params = useParams();

  useEffect(() => {
    const s = new WebSocket(
      `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}?room=${params.room}`
    );
    s.addEventListener("open", () => {
      console.log("connected");
    });
    s.addEventListener("message", (event) => {
      const message: { event: string; data: any; user?: string } = JSON.parse(
        event.data
      );
      console.log(message);
      switch (message.event) {
        case "room":
          setHost(message.data?.users[0] === message.user);
          setQueue(message.data?.queue);
          break;
        case "position":
          if (
            message.data?.user !== "" &&
            Math.abs((player.current?.getCurrentTime() ?? 0) - message.data) >
              0.3
          ) {
            player.current?.seekTo(message.data);
            setPosition(message.data);
          }
          break;
        case "play":
          setPlaying(true);
          break;
        case "pause":
          setPlaying(false);
          break;
        case "seek":
          player.current?.seekTo(message.data);
          setPosition(message.data);
          break;
        case "queue_update":
          setQueue(message.data);
          break;
      }
    });

    setSocket(s as any);

    return () => {
      s.close();
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

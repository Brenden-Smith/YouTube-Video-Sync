import Drawer from "@/components/Drawer";
import IconButton from "@/components/IconButton";
import Video from "@/types/Video";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  PointerEvent,
  SetStateAction,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRoomContext } from "./content";
import Loading from "@/components/Loading";
import { DragControls, Reorder, useDragControls } from "framer-motion";

type QueueProps = {
  queue: Video[];
  setQueue: Dispatch<SetStateAction<Video[]>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Queue({ queue, open, setOpen, setQueue }: QueueProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { socket } = useRoomContext();

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value),
    []
  );

  const addToQueue = useCallback(async () => {
    setLoading(true);
    await fetch("/api/queue", {
      method: "POST",
      body: JSON.stringify({ url }),
    })
      .then(async (res) => {
        const json = await res.json();
        socket?.send(
          JSON.stringify({ event: "queue_update", data: [...queue, json] })
        );
      })
      .catch((err) => console.error(err));
    setLoading(false);
    setUrl("");
  }, [socket, queue, url]);

  const removeFromQueue = useCallback(
    (i: number) => {
      socket?.send(
        JSON.stringify({
          event: "queue_update",
          data: queue.filter((_, index) => index !== i),
        })
      );
    },
    [socket, queue]
  );

  const updateQueue = useCallback(
    (newQueue: Video[]) => {
      socket?.send(JSON.stringify({ event: "queue_update", data: newQueue }));
    },
    [socket]
  );

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoading(false);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [loading]);

  return (
    <Drawer
      open={open}
      setOpen={setOpen}
      position="left"
      title="Queue"
      topComponent={
        <div className="flex flex-row items-center justify-between w-full space-x-3">
          <input
            className="text-black text-md p-2 w-full bg-neutral-100 dark:bg-neutral-700 rounded-md dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:bg-opacity-20"
            value={url}
            onChange={onChange}
            placeholder="Video URL"
            disabled={loading}
          />
          <IconButton onClick={addToQueue} disabled={loading}>
            {loading ? (
              <Loading enabled />
            ) : (
              <Image
                src="/add.svg"
                alt="Add button"
                width={32}
                height={32}
                style={{
                  filter: "invert(1)",
                }}
              />
            )}
          </IconButton>
        </div>
      }
    >
      <Reorder.Group
        axis="y"
        values={queue}
        onReorder={updateQueue}
        layoutScroll
        className="space-y-3"
      >
        {queue?.map((video, index) => (
          <Card
            key={video.key}
            video={video}
            index={index}
            remove={removeFromQueue}
          />
        ))}
      </Reorder.Group>
    </Drawer>
  );
}

const Card = memo(
  ({
    video,
    index,
    remove,
  }: {
    video: Video;
    index: number;
    remove: (index: number) => void;
  }) => {
    const controls = useDragControls();
    const [grabbing, setGrabbing] = useState(false);
    const onPointerUp = useCallback(() => setGrabbing(false), []);
    const onPointerDown = useCallback(
      (e: PointerEvent<HTMLDivElement>) => {
        setGrabbing(true);
        controls.start(e);
      },
      [controls]
    );

    return (
      <Reorder.Item
        key={video.key}
        value={video}
        className="flex flex-col items-center justify-center bg-white dark:bg-black relative rounded-md w-full h-48"
        dragControls={controls}
        dragListener={false}
      >
        <Image
          src={video.videoThumbnail}
          alt={video.videoTitle}
          fill
          className="rounded-md opacity-30"
          draggable={false}
        />
        {index > 0 && (
          <div
            className={
              "absolute top-2 left-2 " +
              (grabbing ? "cursor-grabbing" : "cursor-grab")
            }
            onPointerUp={onPointerUp}
            onPointerDown={onPointerDown}
          >
            <Image
              src="/drag.svg"
              alt="Drag button"
              width={24}
              height={24}
              style={{
                filter: "invert(1)",
              }}
              draggable={false}
            />
          </div>
        )}

        {index > 0 && (
          <IconButton
            onClick={() => remove(index)}
            className="absolute top-2 right-2"
          >
            <Image
              src="/close.svg"
              alt="Close button"
              width={24}
              height={24}
              style={{
                filter: "invert(1)",
              }}
              draggable={false}
            />
          </IconButton>
        )}
        {index === 0 && (
          <div className="absolute top-2 right-2">
            <Image
              src="/play.svg"
              alt="Skip button"
              width={24}
              height={24}
              style={{
                filter: "invert(1)",
              }}
              draggable={false}
            />
          </div>
        )}
        <h5 className="text-black dark:text-white text-lg font-bold">
          {video.videoTitle}
        </h5>
        <h6 className="text-black dark:text-white text-md">
          {video.channelTitle}
        </h6>
      </Reorder.Item>
    );
  }
);

Card.displayName = "Card";

import IconButton from "@/components/IconButton";
import Video from "@/types/Video";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useRoomContext } from "./content";
import Queue from "./Queue";
import Chat from "./Chat";
type HUDProps = {
  hover: boolean;
  queue: Video[];
  setQueue: Dispatch<SetStateAction<Video[]>>;
};

export default function HUD({ hover, queue, setQueue }: HUDProps) {
  const { socket } = useRoomContext();
  const [showQueue, setShowQueue] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const copyUrl = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
  }, []);

  const toggleOpenChat = useCallback(() => setShowChat((o) => !o), []);
  const toggleOpenQueue = useCallback(() => setShowQueue((o) => !o), []);

  return (
    <>
      <Queue
        queue={queue}
        open={showQueue}
        setOpen={setShowQueue}
        setQueue={setQueue}
      />
      <Chat open={showChat} setOpen={setShowChat} />

      {hover && (
        <>
          <div className="flex flex-row items-center space-x-3 absolute top-2 left-2 px-3 py-1 z-3 backdrop-blur-2xl bg-black/30 rounded-2xl">
            <Link
              href={queue[0]?.channelUrl ?? "#"}
              target="_blank"
              aria-disabled={!queue[0]?.channelUrl}
            >
              <IconButton disabled={!queue[0]?.channelUrl}>
                <Image
                  src={queue[0]?.channelThumbnail ?? "/person.svg"}
                  alt="Channel thumbnail"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </IconButton>
            </Link>
            <div className="flex flex-col items-start">
              <h5 className="text-white text-center font-bold text-lg">
                <Link
                  href={queue[0]?.videoUrl ?? "#"}
                  target="_blank"
                  className="hover:underline"
                  aria-disabled={!queue[0]?.videoUrl}
                >
                  {queue[0]?.videoTitle ?? "No video"}
                </Link>
              </h5>
              <h6 className="text-white text-center text-md">
                <Link
                  href={queue[0]?.channelUrl ?? "#"}
                  target="_blank"
                  aria-disabled={!queue[0]?.channelUrl}
                  className="hover:underline"
                >
                  {queue[0]?.channelTitle ?? "No channel"}
                </Link>
              </h6>
            </div>
          </div>
          <div className="absolute top-2 right-2 z-3 backdrop-blur-2xl bg-black/30 p-3 rounded-2xl">
            <IconButton onClick={copyUrl}>
              <Image
                src="/share.svg"
                alt="Share button"
                width={32}
                height={32}
                style={{
                  filter: "invert(1)",
                }}
              />
            </IconButton>
          </div>
          <div className="absolute top-50 right-2 z-3 backdrop-blur-2xl bg-black/30 p-3 rounded-2xl">
            <IconButton onClick={toggleOpenChat}>
              <Image
                src="/chat.svg"
                alt="Chat button"
                width={32}
                height={32}
                style={{
                  filter: "invert(1)",
                }}
              />
            </IconButton>
          </div>
          <div className="absolute top-50 left-2 z-3 backdrop-blur-2xl bg-black/30 p-3 rounded-2xl">
            <IconButton onClick={toggleOpenQueue}>
              <Image
                src="/queue.svg"
                alt="Queue button"
                width={32}
                height={32}
                style={{
                  filter: "invert(1)",
                }}
              />
            </IconButton>
          </div>
        </>
      )}
    </>
  );
}

import IconButton from "@/components/IconButton";
import Slider from "@/components/Slider";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { useRoomContext } from "./content";

type ControlsProps = {
  duration: number;
  hover: boolean;
  muted: boolean;
  playing: boolean;
  position: number;
  setMuted: Dispatch<SetStateAction<boolean>>;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  setPosition: Dispatch<SetStateAction<number>>;
  setVolume: Dispatch<SetStateAction<number>>;
  url: string;
  volume: number;
};

export default function Footer({
  duration,
  hover,
  muted,
  playing,
  position,
  setMuted,
  setPlaying,
  setPosition,
  setVolume,
  url,
  volume,
}: ControlsProps) {
  const { socket, player } = useRoomContext();
  const changeVolume = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setVolume(parseFloat(e.target.value)),
    [setVolume]
  );
  const controlsConditions = useMemo(
    () =>
      hover &&
      (!url?.includes("twitch.tv") ||
        (url.includes("twitch.tv") && !url.includes("twitch.tv/videos"))),
    [hover, url]
  );
  const togglePlaying = useCallback(() => setPlaying((p) => !p), [setPlaying]);
  const toggleMute = useCallback(() => setMuted((m) => !m), [setMuted]);
  const onSeek = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPosition(parseInt(event.target.value));
      player.current?.seekTo(parseInt(event.target.value));
      socket?.send(
        JSON.stringify({ event: "seek", data: parseInt(event.target.value) })
      );
      playing && socket?.send(JSON.stringify({ event: "pause" }));
    },
    [socket, playing, player, setPosition]
  );
  const skip = useCallback(
    () => socket?.send(JSON.stringify({ event: "queue_next" })),
    [socket]
  );

  return (
    <>
      {controlsConditions && (
        <footer className="fixed bottom-0 flex items-center justify-center w-full h-24 flex-shrink-0 z-3">
          <div className="flex items-center pl-2 pr-5 backdrop-blur-2xl bg-black/30 rounded-full h-12 w-full mx-5 space-x-5">
            <IconButton onClick={togglePlaying}>
              <Image
                src={playing ? "/pause.svg" : "/play.svg"}
                alt="Pause play button"
                width={32}
                height={32}
                style={{
                  filter: "invert(1)",
                }}
              />
            </IconButton>
            <Slider value={position} max={duration} min={0} onChange={onSeek} />
            <div className="flex flex-row items-center justify-center h-full w-40 space-x-2">
              <IconButton onClick={toggleMute}>
                <Image
                  src={
                    muted
                      ? "/volume-mute.svg"
                      : volume > 0.6
                      ? "/volume-up.svg"
                      : volume > 0
                      ? "/volume-down.svg"
                      : "/volume-off.svg"
                  }
                  alt="Fullscreen button"
                  width={32}
                  height={32}
                  style={{
                    filter: "invert(1)",
                  }}
                />
              </IconButton>
              <Slider
                value={volume}
                max={1}
                min={0}
                step={0.01}
                onChange={changeVolume}
                disabled={muted}
              />
            </div>
            <IconButton onClick={skip}>
              <Image
                src="/skip.svg"
                alt="Skip button"
                width={32}
                height={32}
                style={{
                  filter: "invert(1)",
                }}
              />
            </IconButton>
          </div>
        </footer>
      )}
    </>
  );
}

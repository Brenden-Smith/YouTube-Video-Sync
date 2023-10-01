"use client";

import IconButton from "@/components/IconButton";
import Slider from "@/components/Slider";
import useRoom from "@/hooks/useRoom";
import Image from "next/image";
import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactPlayer from "react-player";

function Player() {
  const [mounted, setMounted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [hover, setHover] = useState(false);
  const player = useRef<ReactPlayer>(null);
  const { socket, playing, url, setUrl, setPlaying, position, setPosition, host } =
    useRoom(player);
  const togglePlaying = useCallback(() => setPlaying((p) => !p), [setPlaying]);
  const toggleMute = useCallback(() => setMuted((m) => !m), []);
  const onPlay = useCallback(() => socket?.emit("play"), [socket]);
  const onPause = useCallback(() => socket?.emit("pause"), [socket]);
  const onSeek = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPosition(parseInt(event.target.value));
      player.current?.seekTo(parseInt(event.target.value));
      socket?.emit("seek", parseInt(event.target.value));
      playing && socket?.emit("pause");
    },
    [socket, playing, player, setPosition]
  );
  const changeVolume = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setVolume(parseFloat(e.target.value)),
    []
  );
  const controlsConditions = useMemo(
    () =>
      hover &&
      (!url?.includes("twitch.tv") ||
        (url.includes("twitch.tv") && !url.includes("twitch.tv/videos"))),
    [hover, url]
  );
  const blockerConditions = useMemo(
    () => !url?.includes("twitch.tv") || url.includes("twitch.tv/videos"),
    [url]
  );
  const updateUrl = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setPosition(0);
    socket?.emit("url", e.target.value);
  }, [setPosition, setUrl, socket]);

  useEffect(() => {
    const interval = setInterval(() => {
      playing && setPosition(player.current?.getCurrentTime() ?? 0);
      host && socket?.emit("position", player.current?.getCurrentTime());
      setDuration(player.current?.getDuration() ?? 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [player, playing, setPosition, host, socket]);

  useEffect(() => {
    let timer: any = null;
    window.onmousemove = (e) => {
      clearTimeout(timer);
      setHover(true);
      timer = setTimeout(() => setHover(false), 3000);
    };
    setMounted(true);
  }, []);

  return (
    <>
      {blockerConditions && (
        <div
          className="absolute top-0 left-0 w-full h-full z-2"
          onClick={togglePlaying}
        />
      )}
      {controlsConditions && (
        <div className="absolute top-2 left-2 px-3 py-1 z-3 backdrop-blur-2xl bg-black/30 rounded-2xl">
          <h6 className="text-white text-center font-bold text-xl p-2">
            Title of the video
          </h6>
        </div>
      )}
      <div
        className={`absolute top-2 left-50 z-3 backdrop-blur-2xl bg-black/30 rounded-2xl ${
          !hover && "invisible"
        }`}
      >
        <input
          className="text-black text-center font-bold text-xl p-2"
          onBlur={updateUrl}
        />
      </div>
      <div className="flex flex-col items-center justify-center flex-grow w-full">
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
      {controlsConditions && (
        <footer className="fixed bottom-0 flex items-center justify-center w-full h-24 flex-shrink-0 z-3">
          <div className="flex items-center pl-2 pr-5 bg-gray-400 bg-opacity-50 rounded-full h-12 w-full mx-5 space-x-5">
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
          </div>
        </footer>
      )}
    </>
  );
}

export default memo(Player);

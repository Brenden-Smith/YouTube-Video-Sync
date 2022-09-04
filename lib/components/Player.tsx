import { getDatabase, ref, set } from "firebase/database";
import { useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { useRoom } from "../context";

export function Player() {
  const { setPlaying, setPlayer, setDuration, setTime, playing, player, data, id } = useRoom();
  const opts: YouTubeProps["opts"] = {
    height: window.innerHeight,
    width: window.innerWidth,
    playerVars: {
      start: 0,
      autoplay: 0,
      enablejsapi: 1,
      modestbranding: 1,
      controls: 0,
      disablekb: 1,
      rel: 0,
    },
  };
  const videoId = data?.child("video/videoId").val() || null;
  console.log(videoId);
  const action = data?.child("video/action").val() || "";

  /**
   * Handle video player tracking
   */
  useEffect(() => {
    let timer: any;
    if (videoId) {
      timer = setInterval(() => {
        playing && setTime(player?.getCurrentTime() as any);
      }, 100);
    } else {
      setTime(0);
    }
    return () => {
      clearInterval(timer);
    };
  }, [player, playing, setTime, videoId]);

  useEffect(() => {
    switch (action) {
      case "play":
        player?.playVideo();
        break;
      case "pause":
        player?.pauseVideo();
        break;
      case "set":
        setTimeout(() => {
          set(
            ref(getDatabase(), `rooms/${id}/video/time`),
            player?.getCurrentTime() || 0
          );
        }, 500);
        break;
      case "next":
        player?.pauseVideo();
        break;
    }
  }, [action, player, id]);

  return videoId ? (
    <YouTube
      id="player"
      videoId={videoId}
      onStateChange={(e) => {
        switch (e.data) {
          case YouTube.PlayerState.PLAYING:
            setPlaying(true);
            break;
          case YouTube.PlayerState.PAUSED:
            setPlaying(false);
            break;
        }
      }}
      onReady={(e) => {
        setPlayer(e.target);
        setDuration(e.target.getDuration() as any);
      }}
      opts={opts}
    />
  ) : (
    "No video"
  )
}

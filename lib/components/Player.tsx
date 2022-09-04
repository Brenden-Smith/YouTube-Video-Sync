import { CircularProgress } from "@mui/material";
import { getDatabase, ref, set } from "firebase/database";
import { useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { useRoom } from "../context";

export function Player() {
  const {
    setPlaying,
    setPlayer,
    setDuration,
    setTime,
    playing,
    player,
    data,
    id,
    changing,
    setChanging,
  } = useRoom();
  const opts: YouTubeProps["opts"] = {
    height: window.innerHeight,
    width: window.innerWidth,
    playerVars: {
      start: 0,
      autoplay: 1,
      enablejsapi: 1,
      modestbranding: 1,
      controls: 0,
      disablekb: 1,
      rel: 0,
    },
  };
  const video = data?.child("video").child("videoId").val();
  const action = data?.child("video").child("action").val();
  const time = data?.child("video").child("time").val();

  /**
   * Keep user in sync with database time
   */
  useEffect(() => {
    if (player && playing) {
      if (player.getCurrentTime() !== time) {
        player.seekTo(time, true);
      }
    }
  }, [time, player, playing]);

  /**
   * Listen for action changes in database
   */
  useEffect(() => {
    if (player) {
      try {
        switch (action) {
          case "play":
            !playing && player?.playVideo();
            setChanging(false);
            break;
          case "pause":
            playing && player?.pauseVideo();
            setChanging(false);
            break;
          case "set":
            setChanging(false);
            setTimeout(() => {
              set(
                ref(getDatabase(), `rooms/${id}/video/time`),
                player?.getCurrentTime() || 0
              );
            }, 500);
            break;
          case "next":
            player?.pauseVideo();
            setChanging(true);
            break;
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [player, id, action, playing]);

  /**
   * Handle video player tracking
   */
  useEffect(() => {
    let timer: any;
    if (video) {
      timer = setInterval(() => {
        playing && setTime(player?.getCurrentTime() as any);
      }, 100);
    } else {
      setTime(0);
    }
    return () => {
      clearInterval(timer);
    };
  }, [player, playing, setTime, video]);

  return video ? (
    changing ? (
      <div
        style={{
          backgroundColor: "black",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </div>
      </div>
    ) : (
      <YouTube
        id="video-player"
        videoId={video}
        onStateChange={(e) => {
          switch (e.data) {
            case YouTube.PlayerState.PLAYING:
              setPlaying(true);
              set(ref(getDatabase(), `rooms/${id}/video/action`), "play");
              break;
            case YouTube.PlayerState.PAUSED:
              setPlaying(false);
              set(ref(getDatabase(), `rooms/${id}/video/action`), "pause");
              break;
          }
        }}
        onEnd={() => {
          if (!changing) {
            set(ref(getDatabase(), `rooms/${id}/video/action`), "next");
          }
        }}
        onReady={(e) => {
          setPlayer(e.target);
          setDuration(e.target.getDuration() as any);
        }}
        opts={opts}
      />
    )
  ) : (
    <div>
      <h1>No videos in queue</h1>
    </div>
  );
}

import { CircularProgress } from "@mui/material";
import { getDatabase, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";
import { useRoom } from "../context";

export function Player() {
  const {
    setPlaying,
    setDuration,
    setTime,
    playing,
    data,
    id,
    changing,
    setChanging,
    volume,
    time,
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
  const dbTime = data?.child("video").child("time").val();
  const [player, setPlayer] = useState<YouTubePlayer>();

  useEffect(() => {
    if (player) {
      try {
        if (playing) player.playVideo();
        else player.pauseVideo();
      } catch (error) {
        console.log(error);
      }
    }
  }, [player, playing]);

  useEffect(() => {
    if (player && volume) {
      try {
        player.setVolume(volume);
      } catch (error) {
        console.log(error);
      }
    }
  }, [player, volume]);

  useEffect(() => {
    if (player && playing) {
      try {
        if (player.getCurrentTime() !== dbTime) {
          player.seekTo(dbTime, true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [dbTime, player, playing]);

  /**
   * Listen for action changes in database
   */
  useEffect(() => {
    switch (action) {
      case "play":
        setPlaying(true);
        setChanging(false);
        break;
      case "pause":
        setPlaying(false);
        setChanging(false);
        break;
      case "next":
        setPlaying(false);
        setChanging(true);
        break;
    }
  }, [id, action, playing, setChanging, setPlaying]);

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

  useEffect(() => {
    if (player && !playing) {
      try {
        player.seekTo(time, true);
      } catch (error) {
        console.log(error);
      }
    }
  }, [player, playing, time])

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
          <CircularProgress sx={{ color: "white" }} />
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
          e.target.setVolume(volume);
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

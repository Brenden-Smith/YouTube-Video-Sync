import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Slider,
} from "@mui/material";
import { off, onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import YouTube, { Options } from "react-youtube";
import { YouTubePlayer } from "youtube-player/dist/types";
import "../index.css";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { VideoDetails } from "../components";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { Video } from "../models";
import { db } from "../firebase/firebase";

const styles = {
  container: {
    position: "relative",
    width: "100%",
    // paddingTop: "56.25%"
  },
  iframe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
} as any;

export default function VideoPlayer(props: any) {
  const video: Video = props.video;
  const [player, setPlayer] = useState<YouTubePlayer>();
  const [volume, setVolume] = useState(0.5);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [holdState, setHoldState] = useState(false);
  const [changing, setChanging] = useState(false);
  const { room } = props;

  // Firebase useEffect
  useEffect(() => {

    /**
     * Keep user in sync with database time
     */
    const timeQuery = ref(db, `rooms/${room}/video/time`);
    onValue(timeQuery, (snapshot) => {
      if (player) {
        console.log(snapshot.val());
        if (player.getCurrentTime() !== snapshot.val()) {
          player.seekTo(snapshot.val(), true);
        }
      }
    });

    /**
     * Listen for actions from the database
     */
    const actionQuery = ref(db, `rooms/${room}/video/action`);
    onValue(actionQuery, (snapshot) => {
      switch (snapshot.val()) {
        case "play":
          player?.playVideo();
          setChanging(false);
          break;
        case "pause":
          player?.pauseVideo();
          setChanging(false);
          break;
        case "set":
          setChanging(false);
          setTimeout(() => {
            set(
              ref(db, `rooms/${room}/video/time`),
              player?.getCurrentTime() || 0
            );
          }, 500);
          break;
        case "next":
          player?.pauseVideo();
          setChanging(true);
          break;
      }
    });

    return () => {
      off(actionQuery, "value");
      off(timeQuery, "value");
    };
  }, [player, room]);

  /**
   * Handle video player tracking
   */
  useEffect(() => {
    let timer: any;
    if (player && isPlaying) {
      timer = setInterval(() => {
        setTime(player?.getCurrentTime() || 0);
      }, 100);
    } else {
      setTime(0);
    }
    return () => {
      clearInterval(timer);
    }
  }, [player, isPlaying])

  let opts: Options = {
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

  /**
   * Handle YouTube player state changes
   */
  async function onStateChange(e: { target: YouTubePlayer; data: number }) {
    switch (e.data) {
      case YouTube.PlayerState.PLAYING:
        setIsPlaying(true);
        set(ref(db, `rooms/${room}/video/action`), "play");
        break;
      case YouTube.PlayerState.PAUSED:
        setIsPlaying(false);
        set(ref(db, `rooms/${room}/video/action`), "pause");
        break;
    }
  }

  return (
    <>
      <div style={styles.container}>
        {video.videoId ? (
          <YouTube
            id="player"
            containerClassName="youtubeContainer"
            videoId={video.videoId}
            onEnd={() => {
              if (!changing) {
                set(ref(db, `rooms/${room}/video/action`), "next");
              }
            }}
            onStateChange={(e) => onStateChange(e)}
            onReady={(e) => {
              console.log("Ready");
              setChanging(false);
              setPlayer(e.target);
              e.target.setVolume(volume);
            }}
            opts={opts}
          />
        ) : (
          <div
            className="youtubeContainer"
            style={{ backgroundColor: "black" }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              No video selected
            </div>
          </div>
        )}
        {changing ? (
          <div
            className="youtubeContainer"
            style={{ backgroundColor: "black", position: "absolute", top: 0 }}
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
        ) : null}
        <div
          style={{
            position: "absolute",
            bottom: -20,
            width: "100%",
            zIndex: 10,
          }}
        >
          <Slider
            disabled={changing || !video.videoId}
            max={player?.getDuration()}
            value={time}
            size="small"
            onChange={(e, value) => {
              player?.seekTo(value as number, true);
              player?.pauseVideo();
              setTime(value as number);
            }}
            onChangeCommitted={async (event, value) => {
              player?.seekTo(value as number, true);
              await set(ref(db, `rooms/${room}/video/time`), value as number);
              holdState ? player?.playVideo() : player?.pauseVideo();
            }}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => {
              const minutes = Math.floor(value / 60);
              const seconds = Math.floor(value - minutes * 60).toLocaleString(
                undefined,
                { minimumIntegerDigits: 2, maximumSignificantDigits: 2 }
              );
              return `${minutes}:${seconds}`;
            }}
          />
        </div>
      </div>
      <div style={{ height: "15px" }} />
      <div style={{ marginRight: "15px", marginLeft: "15px" }}>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <VideoDetails video={video} />
          </Grid>
          <Grid item sx={{ textAlign: "right" }}>
            <Grid container spacing={5}>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <IconButton
                      disabled={changing || !video.videoId}
                      onClick={() => {
                        if (player?.getVolume() === 0) {
                          player?.unMute();
                        } else {
                          player?.mute();
                        }
                      }}
                    >
                      {player?.getVolume() !== 0 ? (
                        <VolumeUpIcon />
                      ) : (
                        <VolumeOffIcon />
                      )}
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <div style={{ width: "100px" }}>
                      <Slider
                        disabled={changing || !video.videoId}
                        max={100}
                        value={player?.getVolume() || 0}
                        onChange={(e, value) => {
                          player?.setVolume(value as number);
                          setVolume(value as number);
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  disabled={changing || !video.videoId}
                  variant="outlined"
                  color="primary"
                  onClick={
                    isPlaying
                      ? () => player?.pauseVideo()
                      : () => player?.playVideo()
                  }
                >
                  {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </Button>
                <Button
                  disabled={changing || !video.videoId}
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    set(ref(db, `rooms/${room}/video/action`), "next");
                  }}
                >
                  <SkipNextIcon />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div style={{ height: "15px" }} />
    </>
  );
}

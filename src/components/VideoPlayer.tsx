import { Button, Grid, IconButton, Slider } from "@mui/material"
import { getAuth } from "firebase/auth"
import { getDatabase, off, onValue, ref, set } from "firebase/database"
import React, { useEffect, useState } from "react"
import YouTube, { Options } from "react-youtube"
import { YouTubePlayer } from "youtube-player/dist/types"
import "../index.css"
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { VideoDetails } from "../components"
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { Video } from "../models"

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
    height: "100%"
  }
} as any

export default function VideoPlayer(props: any) {

  const [player, setPlayer] = useState<YouTubePlayer>()
  const [videoID, setVideoID] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [currentVolume, setCurrentVolume] = useState(0)
  const [prevVolume, setPrevVolume] = useState(0)
  const [changing, setChanging] = useState(false)
  const { room, host, users } = props
  const video: Video = props.video

  useEffect(() => {

    const videoQuery = ref(getDatabase(), `rooms/${room}/video/source`)
    onValue(
      videoQuery,
      (snapshot) => {
        setVideoID(snapshot.val())
      }
    )
    
    const timeQuery = ref(getDatabase(), `rooms/${room}/video/time`)
    onValue(
      timeQuery,
      (snapshot) => {
        if (player) {
          console.log(snapshot.val())
          if (player.getCurrentTime() !== snapshot.val()) {
            player.seekTo(snapshot.val(), true)
          }
        }
      }
    )

    const actionQuery = ref(getDatabase(), `rooms/${room}/video/action`) 
    onValue(actionQuery, (snapshot) => {
      if (player) {
        if (snapshot.val() === "play") {
          player.playVideo()
        } else if (snapshot.val() === "pause") {
          player.pauseVideo()
        }
      }
    })  

    return () => {
      off(actionQuery, "value")
      off(timeQuery, "value")
      off(videoQuery, "value")
    }
  }, [player, room])

  useEffect(() => {
    if (player) {
      set(ref(getDatabase(), `rooms/${room}/video/time`), player?.getCurrentTime())
    }
  }, [users])

  let timeCount: any;

  let opts: Options = {
    playerVars: {
      start: 0,
      autoplay: 1,
      enablejsapi: 1,
      modestbranding: 1,
      controls: 0,
      disablekb: 1,
      rel: 0,
    }
  }

  async function onStateChange(e: { target: YouTubePlayer, data: number }) {
    switch (e.data) {
      case YouTube.PlayerState.PLAYING:
        console.log("Playing")
        setIsPlaying(true)
        set(ref(getDatabase(), `rooms/${room}/video/action`), "play")
        timeCount = setInterval(() => {
          setCurrentTime(e.target.getCurrentTime())
        }, 100)
        break
      case YouTube.PlayerState.PAUSED:
        setIsPlaying(false)
        set(ref(getDatabase(), `rooms/${room}/video/action`), "pause")
        clearInterval(timeCount)
        break
      case YouTube.PlayerState.ENDED:
        break
    }
  }

  return (
    <>
      <div style={styles.container}>
        <YouTube
          id="player"
          containerClassName="youtubeContainer"
          videoId={video.videoId}
          onEnd={() => { }} // TODO: Call cloud function to update video
          onStateChange={(e) => onStateChange(e)}
          onReady={(e) => {
            console.log("Ready")
            setPlayer(e.target)
            setCurrentVolume(e.target.getVolume())
          }}
          opts={opts}
        />
        <div style={{ position: "absolute", bottom: -20, width: "100%", zIndex: 10 }}>
          <Slider max={player?.getDuration()} value={currentTime}
            size="small"
            onChange={(e, value) => setCurrentTime(value as number)}
            onChangeCommitted={(event, value) => {
              player?.seekTo(value as number, true)
              set(ref(getDatabase(), `rooms/${room}/video/time`), value as number)
            }}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => {
              const minutes = Math.floor(value / 60)
              const seconds = Math.floor(value - minutes * 60).toLocaleString(undefined, { minimumIntegerDigits: 2, maximumSignificantDigits: 2 })
              return `${minutes}:${seconds}`
            }}
          />
        </div>
      </div>
      <div style={{ height: "15px" }} />
        <div style={{ marginRight: "15px", marginLeft: "15px" }}>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <VideoDetails
                video={video}
              />
            </Grid>
            <Grid item sx={{ textAlign: "right" }}>
            <Grid container spacing={5}>
                <Grid item>
                  <Grid container direction="row" spacing={2} justifyContent="center" alignItems="center">
                  <Grid item>
                    <IconButton onClick={() => {
                      if (currentVolume === 0) {
                        setCurrentVolume(prevVolume)
                      } else {
                        setPrevVolume(currentVolume)
                        setCurrentVolume(0)
                      }
                    }}>
                      {currentVolume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <div style={{width: "100px"}}>
                        <Slider max={100}
                          value={currentVolume}
                          onChange={(e, value) => {
                            setCurrentVolume(value as number)
                            player?.setVolume(value as number)
                          }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={isPlaying ? () => player?.pauseVideo() : () => player?.playVideo()}
                  >
                    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                  </Button>
                  <Button variant="outlined" color="primary">
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

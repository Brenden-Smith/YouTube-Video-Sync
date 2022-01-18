import { getAuth } from "firebase/auth"
import { getDatabase, off, onValue, ref, set } from "firebase/database"
import React, { useEffect, useState } from "react"
import YouTube, { Options } from "react-youtube"
import { YouTubePlayer } from "youtube-player/dist/types"
import "../index.css"

const styles = {
  container: {
    position: "relative",
    overflow: "hidden",
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
  const { room, host } = props

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
          if (player.getCurrentTime() > snapshot.val() + 0.12 || player.getCurrentTime() < snapshot.val() - 0.12) {
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

  let timeCount: any;

  let opts: Options = {
    playerVars: {
      start: 0,
      autoplay: 1,
      enablejsapi: 1,
      modestbranding: 1,
    }
  }

  async function onStateChange(e: { target: YouTubePlayer, data: number }) {
    switch (e.data) {
      case YouTube.PlayerState.PLAYING:
        console.log("Playing")
        set(ref(getDatabase(), `rooms/${room}/video/action`), "play")
        if (host === getAuth().currentUser?.uid) {
          timeCount = setInterval(() => {
            set(ref(getDatabase(), `rooms/${room}/video/time`), e.target.getCurrentTime())
          }, 5000)
        }
        break
      case YouTube.PlayerState.PAUSED:
        set(ref(getDatabase(), `rooms/${room}/video/action`), "pause")
        if (host === getAuth().currentUser?.uid) {
          clearInterval(timeCount)
        }
        break
      case YouTube.PlayerState.ENDED:
        break
    }
  }

  return (
    <div style={styles.container}>
        <YouTube
          id="player"
          containerClassName="youtubeContainer"
          videoId="BO1EYEDdFPo"
          onEnd={() => { }} // TODO: Call cloud function to update video
          onStateChange={(e) => onStateChange(e)}
          onReady={(e) => {
            console.log("Ready")
            setPlayer(e.target)
          }}
          opts={opts}
        />
    </div>
  );
}

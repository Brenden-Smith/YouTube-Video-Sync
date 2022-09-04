import {
  Box,
  ButtonBase,
  Card,
  CircularProgress,
  IconButton,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { motion, AnimatePresence } from "framer-motion";
import PauseIcon from "@mui/icons-material/Pause";
import { useRoom } from "../context";
import { formatTime } from "../helper";
import { getDatabase, ref, set } from "firebase/database";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

export function Controls() {
  const {
    duration,
    time,
    visible,
    playing,
    player,
    setTime,
    id,
    data,
    changing,
    muted,
    setMuted,
    volume,
    setVolume,
  } = useRoom();

  const video = data?.child("video").val();

  return (
    <AnimatePresence>
      <Stack alignItems="flex-end">
        {video && duration - time < 15 && (
          <motion.div
            key="up-next"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <ButtonBase
              onClick={() => {
                set(ref(getDatabase(), `rooms/${id}/video/action`), "next");
              }}
            >
              <Card
                sx={{
                  height: "175px",
                  width: "300px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundImage: `url(${video?.videoThumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  marginRight: "15px",
                }}
              >
                <Stack
                  sx={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                  justifyContent="center"
                  alignItems="center"
                  padding="10px"
                >
                  <Box sx={{ position: "relative", display: "inline-flex" }}>
                    <CircularProgress
                      value={((duration - time) / 15) * 100}
                      variant="determinate"
                      sx={{ color: "white" }}
                    />
                    <IconButton
                      disableRipple
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <SkipNextIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="h6">{video?.videoTitle}</Typography>
                </Stack>
              </Card>
            </ButtonBase>
          </motion.div>
        )}

        {visible && (
          <motion.div
            key="controls"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              width: "100%",
              padding: "10px",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                onClick={() => {
                  playing ? player?.pauseVideo() : player?.playVideo();
                }}
              >
                {playing ? (
                  <PauseIcon fontSize="large" />
                ) : (
                  <PlayArrowIcon fontSize="large" />
                )}
              </IconButton>
              <p>{formatTime(time)}</p>
              <div style={{ width: "5px" }} />
              <Slider
                value={time}
                max={duration}
                onChange={(e, value) => {
                  player?.seekTo(value as number, true);
                  player?.pauseVideo();
                  setTime(value as number);
                }}
                onChangeCommitted={async (event, value) => {
                  player?.seekTo(value as number, true);
                  set(
                    ref(getDatabase(), `rooms/${id}/video/time`),
                    value as number
                  );
                }}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => formatTime(value)}
              />
              <IconButton
                disabled={changing || !video.videoId}
                onClick={() => {
                  if (muted) {
                    player?.unMute();
                    setMuted(false);
                  } else {
                    player?.mute();
                    setMuted(true);
                  }
                }}
              >
                {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </IconButton>
                <Slider
                  disabled={changing || !video.videoId || muted}
                  max={100}
                  value={volume}
                  onChange={(e, value) => {
                    player?.setVolume(value as number);
                    setVolume(value as number);
                  }}
                  sx={{ width: "100px" }}
                />
              <IconButton
                onClick={() => {
                  set(ref(getDatabase(), `rooms/${id}/video/action`), "next");
                }}
              >
                <SkipNextIcon fontSize="large" />
              </IconButton>
            </Stack>
          </motion.div>
        )}
      </Stack>
    </AnimatePresence>
  );
}

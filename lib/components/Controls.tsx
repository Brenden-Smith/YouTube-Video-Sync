import {
  Box,
  Card,
  CircularProgress,
  IconButton,
  Slider,
  Stack,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { motion, AnimatePresence } from "framer-motion";
import PauseIcon from "@mui/icons-material/Pause";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { useRoom } from "../context";
import { formatTime } from "../helper";



export function Controls() {

  const { duration, time, visible, playing, player, setTime, } = useRoom();
  return (
    <AnimatePresence>
      <Stack alignItems="flex-end">
        {duration - time < 15 && (
          <motion.div
            key="up-next"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <Card
              sx={{
                height: "175px",
                width: "300px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                  value={((duration - time) / 15) * 100}
                  variant="determinate"
                  sx={{ color: "white" }}
                />
                <IconButton
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
            </Card>
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
                  // await set(
                  //   ref(getDatabase(), `rooms/${id}/video/time`),
                  //   value as number
                  // );
                }}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => formatTime(value)}
              />
              <IconButton>
                <SkipNextIcon fontSize="large" />
              </IconButton>
              <IconButton>
                <FullscreenIcon fontSize="large" />
              </IconButton>
            </Stack>
          </motion.div>
        )}
      </Stack>
    </AnimatePresence>
  );
}

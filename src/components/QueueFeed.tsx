import React, { useEffect } from "react"
import {
  Box,
  Divider,
  Grid,
  List,
  Theme,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Video } from "../models";
import { useState } from "react";
import { useTheme } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import { getDatabase, off, onValue, ref } from "firebase/database";
import { getFunctions, httpsCallable } from "firebase/functions";

const useStyles = (theme: Theme) => ({
  thumbnail: {
    backgroundColor: "black",
    height: "36px",
    width: "64px",
  },
});

export default function QueueFeed(props: any) {

  const [queue, setQueue] = useState<Array<Video>>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const classes = useStyles(useTheme())
  const { room } = props;

  const addVideoToQueue = httpsCallable(getFunctions(), "addVideoToQueue");

  useEffect(() => {

    // Queue data listener
    const queueQuery = ref(getDatabase(), `rooms/${room}/queue/items`)
    onValue(queueQuery, (snapshot) => {
      let data: Array<Video> = [];
      if (snapshot.val()) {
        snapshot.forEach((video) => {
          data.push(video.val());
        }); 
      }
      setQueue([...data]);
    })

    return () => {
      off(queueQuery, "value");
    }

  }, []);

  async function handleAddToQueue() {
    if (input !== "") {
      setLoading(true)
      setError(null)
      var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = input.match(regExp);
      if (match && match[2].length === 11) {
        console.log(match[2])
        await addVideoToQueue({ id: match[2].toString(), room: room }).then((response: any) => {
          if (response === 500) {
            setError("Error adding video to queue");
          }
        });
      } else {
        setError("Invalid URL")
      }
    } else {
      setError("Input required")
    }
    setInput("")
    setLoading(false)
  }

  /**
   * Render a video queue item
   */
  function QueueCard(props: any) {
    const { index } = props
    const video: Video = props.video
    return (
      <Grid
        container
        direction="row"
        spacing={2}
        style={{ width: "100%", padding: 10 }}
        wrap="nowrap"
      >
        <Grid item alignItems="left">
          <Typography variant="h6">
            <Box color="text.primary">{index + 1}.</Box>
          </Typography>
        </Grid>
        <Grid item alignItems="left">
          <img
            src={video.videoThumbnail}
            style={classes.thumbnail}
            alt="thumbnail"
          />
        </Grid>
        <Grid item alignItems="left">
          <Grid container direction="column">
            <Grid item xs={12} alignItems="center">
              <Typography variant="subtitle2">
                <Box color="text.primary" fontWeight="bold">
                  {video.videoTitle}
                </Box>
              </Typography>
              <div style={{ width: "5px" }} />
              <Typography variant="caption">
                <Box color="text.secondary">{video.channelTitle}</Box>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  /**
   * Render a list of video queue items
   */
  return (
    <>
      <TextField
        error={error !== null}
        label="YouTube URL"
        fullWidth={true}
        helperText={error}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleAddToQueue} disabled={loading}>
                {loading ? <CircularProgress color="primary" size={24} /> : <AddIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <List>
        {queue.map((item: Video, index: number, key: any) => {
          return (
            <>
              <QueueCard index={index} video={item} key={key} />
              <Divider />
            </>
          );
        })}
      </List>
    </>
  );
}
